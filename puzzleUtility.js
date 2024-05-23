import puzzle from './puzzleManager/puzzle.js'

let DICTIONARY_OXFORD = './dictionaries/oxford.txt';
let DICTIONARY_AZ = './dictionaries/az.txt';
let SOLUTION_OUTPUT = './solutions/solutionSet.txt';

// puzzleStructures
// wordManager

class Node {
    constructor(id, depth) {
        this.id = id;
        this.depth = depth;
        this.children = [];
    }
}

class WordSet {
    constructor() {
        this.allWords = {};
        this.startsWith = {};
        this.endsWith = {};
        this.rating = {};
    }
    getWords() {
        return Object.keys(this.allWords);
    }
}

class SolutionSet {
    constructor() {
        this.currentSolution = [];
        this.allSolutions = [];
    }
    add(solution) {
        this.allSolutions.push(solution);
        //this.allSolutions.sort((solutionA, solutionB) => solutionA.rating - solutionB.rating)
    }
}

class Solution {
    constructor(solution, wordCount, characterCount) {
        this.solution = solution;
        this.wordCount = wordCount;
        this.characterCount = characterCount;
        this.rating = wordCount * characterCount;
    }
}

function isValidMove(source, destination) {

    // Validate input
    if (source < -1 || source > 11) return false;
    if (-1 < source > 11) return false;
    if (source === -1) return true;

    // Identify which sides of the puzzle are being tested
    const sourceGroup = Math.floor(source / 3);
    const destinationGroup = Math.floor(destination / 3);

    return !(sourceGroup === destinationGroup);
}

function rateWord(word) {

    let i;
    let uniqueLetters = new Set();
    for (i = 0; i < word.length; i++) {
        uniqueLetters.add(word[i]);
    }
    return uniqueLetters.size;
}

function addValidWord(validWords, word) {

    // Populate startsWith
    const firstLetter = word[0];
    validWords.startsWith[firstLetter] = validWords.startsWith[firstLetter] ?? [];
    validWords.startsWith[firstLetter].push(word);

    // Populate endsWith
    const lastLetter = word[word.length - 1];
    validWords.endsWith[lastLetter] = validWords.endsWith[lastLetter] ?? [];
    validWords.endsWith[lastLetter].push(word);

    // Populate rating and allWords
    const wordRating = rateWord(word);
    validWords.rating[wordRating] = validWords.rating[wordRating] ?? [];
    validWords.rating[wordRating].push(word);
    validWords.allWords[word] = wordRating;

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

export {
    countCharacters, removeLetters, sortCandidateWords, wordUsesAvailableLetter, addValidWord, buildWordSequence, Node, WordSet, SolutionSet, Solution, SOLUTION_OUTPUT, DICTIONARY_OXFORD, DICTIONARY_AZ, puzzleToArray
};