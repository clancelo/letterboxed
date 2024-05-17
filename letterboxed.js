import puzzle from './puzzle.js'
import { readFile } from './util.js'

/**
 * Represents a location on the puzzle and the location with a word. The id
 * represents the location within the puzzle and the depth represents how far
 * into the word the letter is. The children array contains the nodes of all
 * child letters that follow the node in the course of spelling the word.
 */
class Node {
    constructor(id, depth) {
        this.id = id;
        this.depth = depth;
        this.children = [];
    }
}

class Fool {
    constructor(id, depth) {
        this.id = id;
        this.depth = depth;
        this.children = [];
    }
}

class Result {
    constructor() {
        this.allWords = {};
        this.startsWith = {};
        this.endsWith = {};
        this.rating = {};
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
 * TODO: Record the puzzle id sequence for each way to spell the word so that we
 * can
 * @param {array} words 
 * @returns an array of words that can be spelled in the puzzle
 */
function findWords(words) {
    let result = new Result();
    // Loop through each word and check if depth reached equals the word length
    words.forEach(word => {
        let startingNode = new Node(-1, 0);
        let depth = buildTree(word, startingNode, 0);
        // TODO: The startingNode is the fully formed node for the word
        // TODO: We can analyze the tree at this moment to yield all possible paths
        if (depth === word.length & word.length !== 0) {
            // Starts with
            if (!result.startsWith.hasOwnProperty(word[0])) {
                result.startsWith[word[0]] = [];
            }
            result.startsWith[word[0]].push(word);
            // Ends with
            if (!result.endsWith.hasOwnProperty(word[word.length - 1])) {
                result.endsWith[word[word.length - 1]] = [];
            }
            result.endsWith[word[word.length - 1]].push(word);
            // Rating
            let wordRating = rateWord(word);
            if (!result.rating.hasOwnProperty(wordRating)) {
                result.rating[wordRating] = [];
            }
            result.rating[wordRating].push(word);
            // All words
            result.allWords[word] = wordRating;
        }
    });
    return result;
}

const oxfordFilename = 'az.txt';
// const oxfordFilename = 'oxford_top3000.txt';
const oxfordWords = readFile(oxfordFilename);
let oxfordResults = findWords(oxfordWords);
console.dir(oxfordResults, { 'maxArrayLength': null });

let maxRating = 0;
for (let key in oxfordResults.rating) {
    let int = parseInt(key);
    if (parseInt(key) > maxRating) {
        maxRating = parseInt(key);
    }
}

let bestWords = oxfordResults.rating[maxRating];
let bestWord = bestWords[1];

recurse(bestWord, oxfordResults, removeLetters(bestWord, puzzleToArray()));

console.log(maxRating);

// get available letters
// if available = 0, done
// get last letter
// get all words starting with the last letter
// if no words remain, this word is wrong, go back and use second rated word
// sort them by rating
// select the highest rated word that removes at least 1 letter

function puzzleToArray() {
    let puzzleArray = [];
    puzzle.forEach(letterObj => {
        puzzleArray.push(letterObj.value);
    });
    return puzzleArray;
}

function recurse(word, results, availableLetters) {
    if (availableLetters.length === 0) {
        return 1;
    }
    let lastLetter = word[word.length - 1];
    let candidateWords = results.startsWith[lastLetter];
    if (candidateWords.length === 0) {
        return 0;
    }
    candidateWords = sortCandidateWords(candidateWords);
    candidateWords.forEach(word => {
        if (wordUsesAvailableLetter(word, availableLetters)) {
            let newAvailableLetters = removeLetters(word, newAvailableLetters);
            return recurse(word, results, availableLetters);
        }
        let y = 0;
    })
    return 0;
}

function wordUsesAvailableLetter(word, availableLetters) {
    for (let letter = 0; letter < word.length; letter++) {
        if (word.includes(letter)) {
            return true;
        }
    }
    return false;
}

function sortCandidateWords(candidateWords) {
    //TODO: Complete this function
    return candidateWords;
}




function removeLetters(word, newAvailableLetters) {
    let remainingLetters = [];
    newAvailableLetters.forEach(letter => {
        if (!word.toUpperCase().includes(letter)) {
            if (!remainingLetters.includes(letter)) {
                remainingLetters.push(letter);
            }
        }
    });
    return remainingLetters;
}

function removeLettersStart(word) {
    let remainingLetters = [];
    puzzle.forEach(letter => {
        if (!word.toUpperCase().includes(letter.value)) {
            if (!remainingLetters.includes(letter)) {
                remainingLetters.push(letter);
            }
        }
    });
    return remainingLetters;
}