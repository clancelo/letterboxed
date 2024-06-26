import { getPuzzleLetters } from '../puzzle/puzzleManager.js'
import { SolutionSet, Solution } from './solutionData.js'
import { breadthLimiter } from './breadthLimiter.js'
import { WordSet } from '../word/wordData.js'
import { configManager } from '../config/configManager.js'
import { Log } from '../io/logger.js'

/**
 * Finds and stores solutions to the puzzle starting with the provided word. Input validation is
 * performed in the calling function.
 * @param {string} word - the word being solved
 * @param {WordSet} wordSet - the WordSet of the word search for the puzzle
 * @param {SolutionSet} solutionSet - the SolutionSet being populated
 * @param {array} requiredLetters - an array of required letters 
 * @returns true if there are no more required letters, false otherwise
 */
function solveWord(word, wordSet, solutionSet, requiredLetters) {
    if (solutionSet.currentSolution.length > configManager.getMaxSolutionLength()) { return false }
    if (requiredLetters.length === 0) { return true }
    const lastLetter = word[word.length - 1];
    const candidateWords = wordSet.startsWith[lastLetter] ?? []; // default to empty [] if no key
    if (candidateWords.length === 0) { return false }
    for (let c = 0; c < candidateWords.length; c++) {
        processCandidateWord(candidateWords[c], wordSet, solutionSet, requiredLetters);
        if (breadthLimiter.hasReachedLimit()) {
            break;
        }
    }
    return false;
}

/**
 * Processes a candidate word by checking if it uses any required letters and updating the solution
 * set. This function is called recursively by solveWord to explore possible solutions.
 * @param {string} candidateWord - the candidate word to be processed
 * @param {WordSet} wordSet - the WordSet containing words for the puzzle
 * @param {SolutionSet} solutionSet - the SolutionSet being populated
 * @param {array} requiredLetters - an array of required letters
 */
function processCandidateWord(candidateWord, wordSet, solutionSet, requiredLetters) {
    if (wordUsesRequiredLetter(candidateWord, requiredLetters)) {
        solutionSet.currentSolution.push(candidateWord);
        let newRequiredLetters = getNewRequiredLetters(candidateWord, requiredLetters);
        if (solveWord(candidateWord, wordSet, solutionSet, newRequiredLetters)) {
            let solution = new Solution(solutionSet.currentSolution);
            solutionSet.add(solution);
            breadthLimiter.update(solutionSet);
        }
        solutionSet.currentSolution.pop();
    }
}

/**
 * Generates a SolutionSet for a given WordSet.
 * @param {WordSet} validWordSet - the collection of words that can be spelled for a given puzzle
 * @returns a SolutionSet of possible solutions for a given set of words
 */
function getSolutions(validWordSet) {
    if (!(validWordSet instanceof WordSet)) { return new SolutionSet() }
    let allValidWords = validWordSet.getWords();
    let solutions = new SolutionSet();
    for (let i = 0; i < allValidWords.length; i++) {
        Log.outputProgress(i, allValidWords.length);
        solutions.currentSolution.push(allValidWords[i]);
        let newRequiredLetters = getNewRequiredLetters(allValidWords[i], getPuzzleLetters());
        solveWord(allValidWords[i], validWordSet, solutions, newRequiredLetters);
        solutions.currentSolution.pop();
    }
    if (configManager.getWillSort()) { solutions.sort() }
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