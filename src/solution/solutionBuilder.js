import { getPuzzleLetters } from '../puzzle/puzzleManager.js'
import { SolutionSet, Solution } from './solutionData.js'
// import { updateBreadthLimiter, isBreadthLimitReached } from './breadthLimiter.js'
import { breadthLimiter } from './breadthLimiter.js'
import { WordSet } from '../word/wordData.js'

const MAX_SOLUTION_LENGTH = 5;

/**
 * Finds and stores solutions to the puzzle starting with the provided word. Input validation is
 * performed in the calling function.
 * @param {string} word - the word being solved
 * @param {ResultSet} results - the ResultSet of the word search for the puzzle
 * @param {SolutionSet} solutionSet - the SolutionSet being populated
 * @param {array} requiredLetters - an array of required letters 
 * @returns true if there are no more required letters, false otherwise
 */
function solveWord(word, results, solutionSet, requiredLetters) {
    if (solutionSet.currentSolution.length > MAX_SOLUTION_LENGTH) { return false }
    if (requiredLetters.length === 0) { return true }
    const lastLetter = word[word.length - 1];
    const candidateWords = results.startsWith[lastLetter] || []; // default to empty [] if no key
    if (candidateWords.length === 0) { return false }
    for (let c = 0; c < candidateWords.length; c++) {
        let candidateWord = candidateWords[c];
        if (wordUsesRequiredLetter(candidateWord, requiredLetters)) {
            solutionSet.currentSolution.push(candidateWord);
            let newRequiredLetters = getNewRequiredLetters(candidateWord, requiredLetters);
            if (solveWord(candidateWord, results, solutionSet, newRequiredLetters)) {
                let solution = new Solution(solutionSet.currentSolution);
                solutionSet.add(solution);
                console.log(solution.solution);
                breadthLimiter.update(solutionSet);
            }
            solutionSet.currentSolution.pop();
        }
        if (breadthLimiter.hasReachedLimit()) {
            break;
        }
    }
    return false;
}


/**
 * Generates a SolutionSet for a given WordSet.
 * @param {WordSet} validWordSet - the collection of words that can be spelled for a given puzzle
 * @param {boolean} willSort - true if the solutions are to be sorted before return
 * @returns a SolutionSet of possible solutions for a given set of words
 */
function getSolutions(validWordSet, willSort) {
    if (!(validWordSet instanceof WordSet)) { return new SolutionSet() }
    if (typeof willSort !== 'boolean') { return new SolutionSet() }
    let allValidWords = validWordSet.getWords();
    let solutions = new SolutionSet();
    for (let i = 0; i < allValidWords.length; i++) {
        solutions.currentSolution.push(allValidWords[i]);
        let newRequiredLetters = getNewRequiredLetters(allValidWords[i], getPuzzleLetters());
        solveWord(allValidWords[i], validWordSet, solutions, newRequiredLetters);
        solutions.currentSolution.pop();
    }
    if (willSort) { solutions.sort() }
    return solutions;
}

/**
 * Returns whether the word contains at least 1 letter in requiredLetters
 * @param {string} word - the word to test
 * @param {array} requiredLetters - the current collection of required letters
 * @returns true if at least 1 letter in the provided array is present in the provided word
 */
function wordUsesRequiredLetter(word, requiredLetters) {
    if (typeof word !== 'string') { return false }
    if (!Array.isArray(requiredLetters)) { return false }
    const requiredLettersSet = new Set(requiredLetters);
    for (let character of word) {
        if (requiredLettersSet.has(character)) {
            return true;
        }
    }
    return false;
}

/**
 * Returns the letters in the provided array minus the letters in the provided word.
 * @param {string} word - the word to remove
 * @param {array} requiredLetters - the current collection of required letters
 * @returns the new array of required letters
 */
function getNewRequiredLetters(word, requiredLetters) {
    if (typeof word !== 'string') { return [] }
    if (!Array.isArray(requiredLetters)) { return [] }
    let newRequiredLetters = new Set();
    const wordAsSet = new Set(word);
    for (let letter of requiredLetters) {
        if (!wordAsSet.has(letter)) {
            newRequiredLetters.add(letter);
        }
    }
    return Array.from(newRequiredLetters);
}

export { getSolutions };