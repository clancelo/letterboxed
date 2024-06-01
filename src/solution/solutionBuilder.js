import { getPuzzleLetters } from '../puzzle/puzzleManager.js'
import { SolutionSet, Solution } from './solutionData.js'
import { WordSet } from '../word/wordData.js'

const MAX_SOLUTION_LENGTH = 5;
const SOLUTION_BREADTH = 6;

/**
 * Determines if the SolutionSet has reached its limit for solutions based on the current state of
 * the solution.
 * // TODO detail this function
 * @param {SolutionSet} solutionSet - the SolutionSet being examined for a breadth limit
 * @param {array} currentSeries - an array of words representing the current state of the solution
 * @returns 
 */
function isBreadthLimitReached(c, solutionSet, currentSeries) {
    if (solutionSet.allSolutions.length === 0) { return false }
    if (getNumAllowedRepeats(currentSeries) > solutionSet.allSolutions.length) { return false }
    let solutionsToExamine = getSolutionsToExamine(solutionSet, currentSeries);
    for (let sol = solutionsToExamine.length - 1; sol >= 0; sol--) {
        for (let word = 0; word < currentSeries.length; word++) {
            if (currentSeries[word] !== solutionsToExamine[sol].solution[word]) {
                return false;
            }
        }
    }
    return true;

    // if (solutionSet.allSolutions.length === 0) {
    // } else if (solutionSet.allSolutions.length > 18) { // TODO remove debug check
    //     let solutionsToExamine = getSolutionsToExamine(solutionSet, currentSeries);
    //     // do all values from currentSeries appear in solutionSet the maximum
    //     // number of times? return true;
    //     for (let i = 0; i < solutionsToExamine.length - 1; i++) {
    //         let currentSolution = currentSeries[currentSeries.length - 1];
    //         // let currentSolution = solutionRange[i].solution[currentSeries.length - 1];
    //         let nextSolution = solutionsToExamine[i].solution[currentSeries.length - 1];
    //         if (currentSolution !== nextSolution) {
    //             return false;
    //         }
    //     }
    //     return true;
    // }
}

function getSolutionsToExamine(solutionSet, currentSeries) {
    let exponent = Math.max(0, SOLUTION_BREADTH - currentSeries.length);
    let numAllowedRepeats = Math.pow(2, exponent);
    let rangeEnd = solutionSet.allSolutions.length;
    let rangeStart = Math.max(0, (rangeEnd - numAllowedRepeats));
    let solutionRange = solutionSet.allSolutions.slice(rangeStart, rangeEnd);
    return solutionRange;
}

function getNumAllowedRepeats(currentSeries) {
    const exponent = Math.max(0, SOLUTION_BREADTH - currentSeries.length);
    return Math.pow(2, exponent);
}

let solverConfig = {
    base: 0,
    exponent: 0,
    maxSolutionLength: 0,

}

function setBreadthLimits(breadth) {

}

let flagA = 0;
let flagB = 0;
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
    // At this point, the currentSolution is not beyond max, there are still required letters left
    // to be used, and the candidateWords list still has options.
    for (let c = 0; c < candidateWords.length; c++) {
        let candidateWord = candidateWords[c];
        if (wordUsesRequiredLetter(candidateWord, requiredLetters)) {
            // if (isBreadthLimitReached(c, solutionSet, solutionSet.currentSolution.slice())) {
            //     break;
            // }
            solutionSet.currentSolution.push(candidateWord);
            let newRequiredLetters = getNewRequiredLetters(candidateWord, requiredLetters);
            if (solveWord(candidateWord, results, solutionSet, newRequiredLetters)) {
                let solution = new Solution(solutionSet.currentSolution.slice(), solutionSet.currentSolution.length, getCharacterCount(solutionSet.currentSolution));
                solutionSet.add(solution);
                console.log(solution.solution);
                updateBreadthLimiter(solutionSet);
                if (solutionSet.allSolutions.length === 2) {
                    flagA++;
                }
                if (solutionSet.allSolutions.length === 5) {
                    flagA++;
                    flagA++;
                }
            }
            solutionSet.currentSolution.pop();
        }
        if (flagA > 0) {
            flagA--;
            break;
        }
        if (isBreadthLimitReached()) {
            break;
        }
    }
    return false;
}

function isBreadthLimitReached() {
    return false;
}

function isBreadthLimitReached() {
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

/**
 * Returns the number of characters in a solution.
 * TODO data type
 * @param {array} solution - the solution to count
 * @returns the number of characters in the solution
 */
function getCharacterCount(solution) {
    if (!Array.isArray(solution)) { return 0 }
    return solution.join('').length;
}

export { getSolutions, setBreadthLimits };