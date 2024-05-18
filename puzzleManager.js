import puzzle from './puzzle.js'

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
}

class SolutionSet {
    constructor() {
        this.currentSolution = [];
        this.allSolutions = [];
    }
}

class Solution {
    constructor(solution, wordCount, characterCount) {
        this.solution = solution;
        this.wordCount = wordCount;
        this.characterCount = characterCount;
    }
}

let series = [];
let DICTIONARY_FILENAME = 'oxford.txt';

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
 * @param {string} word 
 * @param {Node} currentNode 
 * @param {number} depth 
 * @returns the max depth reached in the tree below this node
 */
function buildTree(word, currentNode, depth) {
    // The currentNode holds the last letter of the word
    if (depth >= word.length) { return depth; }
    // Track the depths child trees
    let maxChildDepth = depth;
    // Loop through puzzle and create nodes at this depth
    puzzle.forEach(letter => {
        // The puzzle character matches the current letter in the word and is a
        // valid connection according to the puzzle rules.
        if (letter.value === word[depth].toUpperCase() && isValidMove(currentNode.id, letter.id)) {
            // Create new node as child of currentNode
            let newNode = new Node(letter.id, depth);
            currentNode.children.push(newNode);
            // Recurse on the child node at an incremented depth
            let childDepth = buildTree(word, newNode, depth + 1);
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
function findValidWords(words) {
    let wordSet = new WordSet();
    // Loop through each word and check if depth reached equals the word length
    words.forEach(word => {
        if (word.length <= 2) {
            return;
        }
        let startingNode = new Node(-1, 0);
        let depth = buildTree(word, startingNode, 0);
        // TODO: The startingNode is the fully formed node for the word
        // TODO: We can analyze the tree at this moment to yield all possible paths
        if (depth === word.length & word.length !== 0) {
            // Starts with
            if (!wordSet.startsWith.hasOwnProperty(word[0])) {
                wordSet.startsWith[word[0]] = [];
            }
            wordSet.startsWith[word[0]].push(word);
            // Ends with
            if (!wordSet.endsWith.hasOwnProperty(word[word.length - 1])) {
                wordSet.endsWith[word[word.length - 1]] = [];
            }
            wordSet.endsWith[word[word.length - 1]].push(word);
            // Rating
            let wordRating = rateWord(word);
            if (!wordSet.rating.hasOwnProperty(wordRating)) {
                wordSet.rating[wordRating] = [];
            }
            wordSet.rating[wordRating].push(word);
            // All words
            wordSet.allWords[word] = wordRating;
        }
    });
    return wordSet;
}

function puzzleToArray() {
    let puzzleArray = [];
    puzzle.forEach(letterObj => {
        puzzleArray.push(letterObj.value);
    });
    return puzzleArray;
}

function recurse(word, results, availableLetters) {
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
            if (recurse(candidateWord, results, newAvailableLetters)) {
                return true;
            }
            series.pop();
        }
    }
    return false;
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
        if (!word.toUpperCase().includes(letter)) {
            if (!newAvailableLetters.includes(letter)) {
                newAvailableLetters.push(letter);
            }
        }
    });
    return newAvailableLetters;
}

function getMaxRating(resultSet) {
    let maxRating = 0;
    for (let key in resultSet.rating) {
        const rating = parseInt(key);
        if (rating > maxRating) {
            maxRating = rating;
        }
    }
    return maxRating;
}

function findSolutions(wordSet) {
    let words = Object.keys(wordSet.allWords);
    let availableLetters = puzzleToArray();
    let solutionSet = new SolutionSet();

    for (let i = 0; i < words.length; i++) {
        let candidateWord = words[i];
        series.push(candidateWord);
        let newAvailableLetters = removeLetters(candidateWord, availableLetters);
        if (recurse(candidateWord, wordSet, newAvailableLetters)) {
            let solution = new Solution(series, series.length, countCharacters(series));
            solutionSet.allSolutions.push(solution);
            //return solutionSet;
            series = [];
        }
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
    DICTIONARY_FILENAME, findValidWords, puzzleToArray, findSolutions, series
};