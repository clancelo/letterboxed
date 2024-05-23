import { Node, WordSet, SolutionSet, Solution } from './puzzleUtility.js'
import { puzzleToArray, countCharacters, removeLetters, sortCandidateWords, wordUsesAvailableLetter, addValidWord, buildWordSequence } from './puzzleUtility.js'

let series = [];

function buildWordSequence(word, currentNode, depth) {

    // The currentNode holds the last letter of the word
    if (depth >= word.length) { return depth; }

    // Track the depths child trees
    let maxChildDepth = depth;

    // Loop through puzzle and create nodes at this depth
    puzzle.forEach(letter => {

        // The puzzle character matches the current letter in the word and is a
        // valid connection according to the puzzle rules.
        if (letter.value === word[depth] && isValidMove(currentNode.id, letter.id)) {

            // Create new node as child of currentNode
            let newLetterNode = new Node(letter.id, depth);
            currentNode.children.push(newLetterNode);

            // Recurse on the child node at an incremented depth
            let childDepth = buildWordSequence(word, newLetterNode, depth + 1);

            // Update maxChildDepth
            maxChildDepth = Math.max(maxChildDepth, childDepth);

        }
    });

    // Return the max depth reached under this node
    return maxChildDepth;
}

function findValidWords(allWords) {
    const startingDepth = 0;
    let validWords = new WordSet();
    allWords.forEach(word => {
        let startingNode = new Node(-1, 0);
        let wordDepth = buildWordSequence(word, startingNode, startingDepth);
        if (wordDepth === word.length) {
            addValidWord(validWords, word);
        }
    });
    return validWords;
}

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

export { findValidWords, findSolutions };