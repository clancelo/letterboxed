import { puzzle, puzzleToArray } from '../puzzle/puzzleArchive.js'
import { SolutionSet, Solution } from './solutionData.js'

let series = [];

function isBreadthLimitReached(solutionSet, currentSeries) {
    if (solutionSet.allSolutions.length === 0) {
    } else if (solutionSet.allSolutions.length > 18) {
        //console.log(currentSeries);
        let base = 2;
        let exponent = 10 - currentSeries.length;
        let numAllowedRepeats = Math.pow(base, exponent);
        let rangeEnd = solutionSet.allSolutions.length;
        let rangeStart = Math.max(0, (rangeEnd - numAllowedRepeats));
        let solutionRange = solutionSet.allSolutions.slice(rangeStart, rangeEnd)
        let y = 1;
        // do all values from currentSeries appear in solutionSet the maximum
        // number of times? return true;
        for (let i = 0; i < solutionRange.length - 1; i++) {
            let currentSolution = currentSeries[currentSeries.length - 1];
            // let currentSolution = solutionRange[i].solution[currentSeries.length - 1];
            let nextSolution = solutionRange[i].solution[currentSeries.length - 1];
            if (currentSolution !== nextSolution) {
                return false;
            }
        }
        return true;
    }
}

function solveWord(word, results, solutionSet, availableLetters) {
    if (series.length === 5 && availableLetters.length !== 0) {
        return false;
    }
    if (availableLetters.length === 0) {
        return true;
    }
    let lastLetter = word[word.length - 1];
    let candidateWords = results.startsWith[lastLetter] || [];
    if (candidateWords.length === 0) {
        return false;
    }
    for (let c = 0; c < candidateWords.length; c++) {

        let candidateWord = candidateWords[c];
        if (wordUsesRequiredLetter(candidateWord, availableLetters)) {
            if (isBreadthLimitReached(solutionSet, series.slice())) {
                break;
            }
            series.push(candidateWord);
            let newAvailableLetters = getNewRequiredLetters(candidateWord, availableLetters);
            if (solveWord(candidateWord, results, solutionSet, newAvailableLetters)) {
                if (newAvailableLetters.length === 0) {
                    let solution = new Solution(series.slice(), series.length, getCharacterCount(series));
                    solutionSet.add(solution);
                    console.log(series);
                }
            } else {
                // console.log(series)
            }
            series.pop();
        }
    }
    return false;
}

function findSolutions(validWordSet) {
    let words = validWordSet.getWords();
    let remainingLetters = puzzleToArray(puzzle);
    let solutionSet = new SolutionSet();
    for (let i = 0; i < words.length; i++) {
        let candidateWord = words[i];
        series.push(candidateWord);
        let newRemainingLetters = getNewRequiredLetters(candidateWord, remainingLetters);
        solveWord(candidateWord, validWordSet, solutionSet, newRemainingLetters);
        series.pop();
    }
    return solutionSet;
}

// Returns whether the word contains at least 1 letter in requiredLetters 
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

// Returns an array of the letters in requiredLetters minus the letters in word
function getNewRequiredLetters(word, requiredLetters) {
    if (typeof word !== 'string') { return }
    if (!Array.isArray(requiredLetters)) { return }
    let newRequiredLetters = new Set();
    const wordAsSet = new Set(word);
    for (let letter of requiredLetters) {
        if (!wordAsSet.has(letter)) {
            newRequiredLetters.add(letter);
        }
    }
    return Array.from(newRequiredLetters);
}

// Returns the number of characters in a solution
function getCharacterCount(solution) {
    if (!Array.isArray(solution)) { return 0 }
    return solution.join('').length;
}

export { findSolutions };