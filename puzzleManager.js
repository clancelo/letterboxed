import puzzle from './puzzle.js'

let series = [];
let DICTIONARY_OXFORD = './dictionaries/oxford.txt';
let DICTIONARY_AZ = './dictionaries/az.txt';
let SOLUTION_OUTPUT = './solutions/solutionSet.txt';

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
        this.allSolutions.sort((solutionA, solutionB) => solutionA.rating - solutionB.rating)
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

/**
 * Determines if a letter combination is a valid move. Source and destination
 * values range from -1 to 11. A source value of -1 indicates that the destination
 * node is the first letter of the word and thus any move is valid. Values 0, 1,
 * and 2 will map to the top of the puzzle and the remaining values continue 
 * clockwise until 11.
 * 
 * @param {number} source 
 * @param {number} destination 
 * @returns 
 */
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

/**
 * Builds the connection tree of a word for a specific puzzle. The word and a 
 * node along with the current depth are passed to this recursive function. All
 * possible ways of spelling the word within the puzzle are mapped and the
 * max depth reached is returned. If the returned value is equal to the length
 * of the word, the word CAN be spelled within the specific puzzle.
 * 
 *  // CLEAN UP
 * 
 * @param {string} word 
 * @param {Node} currentNode 
 * @param {number} depth 
 * @returns the max depth reached in the tree below this node
 */
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

/**
 * Generates an array of words that can be spelled in the puzzle. A tree is built
 * for each word but we only record whether the word can be spelled at least one
 * way.
 * 
 * TODO: Record the puzzle id sequence for each way to spell the word 
 * 
 * @param {array} words 
 * @returns an array of words that can be spelled in the puzzle
 */
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

function solveWord(word, results, solutionSet, availableLetters) {
    if (series.length > 5) {
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
            series.push(candidateWord);
            let newAvailableLetters = removeLetters(candidateWord, availableLetters);
            if (solveWord(candidateWord, results, solutionSet, newAvailableLetters)) {
                if (newAvailableLetters.length === 0) {
                    let solution = new Solution(series.slice(), series.length, countCharacters(series));
                    solutionSet.add(solution);
                    console.log(series);
                }
                //return true;
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

function countCharacters(series) {
    let count = 0;
    for (let word = 0; word < series.length; word++) {
        count += series[word].length;
    }
    return count;
}

export {
    SOLUTION_OUTPUT, DICTIONARY_OXFORD, DICTIONARY_AZ, findValidWords, puzzleToArray, findSolutions, series
};