import { puzzle } from '../puzzle/puzzleArchive.js'
import { SolutionSet, Solution } from './solutionData.js'

let series = [];

function isBreadthLimitReached(solutionSet, currentSeries) {
    if (solutionSet.allSolutions.length === 0) {
    } else if (solutionSet.allSolutions.length > 18) {
        //console.log(currentSeries);
        let base = 2;
        let exponent = 5 - currentSeries.length;
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
    candidateWords = sortCandidateWords(candidateWords);
    for (let c = 0; c < candidateWords.length; c++) {

        let candidateWord = candidateWords[c];
        if (wordUsesAvailableLetter(candidateWord, availableLetters)) {
            if (isBreadthLimitReached(solutionSet, series.slice())) {
                break;
            }
            series.push(candidateWord);
            let newAvailableLetters = removeLetters(candidateWord, availableLetters);
            if (solveWord(candidateWord, results, solutionSet, newAvailableLetters)) {
                if (newAvailableLetters.length === 0) {
                    let solution = new Solution(series.slice(), series.length, countCharacters(series));
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
    let remainingLetters = puzzleToArray();
    let solutionSet = new SolutionSet();
    for (let i = 0; i < words.length; i++) {
        let candidateWord = words[i];
        series.push(candidateWord);
        let newRemainingLetters = removeLetters(candidateWord, remainingLetters);
        solveWord(candidateWord, validWordSet, solutionSet, newRemainingLetters);
        series.pop();
    }
    return solutionSet;
}

function puzzleToArray() {
    let puzzleArray = [];
    puzzle.forEach(letter => {
        puzzleArray.push(letter.value);
    });
    return puzzleArray;
}

function wordUsesAvailableLetter(word, availableLetters) {
    for (let letter = 0; letter < word.length; letter++) {
        if (availableLetters.some(item => item.toLowerCase() === word[letter].toLowerCase())) {
            return true;
        }
    }
    return false;

}

function sortCandidateWords(candidateWords) {
    //TODO: Complete this function
    return candidateWords;
}

function removeLetters(word, availableLetters) {
    let newAvailableLetters = [];
    availableLetters.forEach(letter => {
        if (!word.includes(letter)) {
            if (!newAvailableLetters.includes(letter)) {
                newAvailableLetters.push(letter);
            }
        }
    });
    return newAvailableLetters;
}

function countCharacters(series) {
    let count = 0;
    for (let word = 0; word < series.length; word++) {
        count += series[word].length;
    }
    return count;
}

export { findSolutions };