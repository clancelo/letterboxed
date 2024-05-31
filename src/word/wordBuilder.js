import { getPuzzle } from '../puzzle/puzzleManager.js'
import { LetterNode, WordSet } from './wordData.js'
import { PuzzleLetter } from '../puzzle/puzzleManager.js'

/**
 * Returns a WordSet containing all the words that can be spelled in the puzzle.
 * @param {array} allWords - an array of string representing all words being considered
 * @returns a WordSet containing all the words that can be spelled in the puzzle
 */
function getValidWords(allWords) {
    if (!(Array.isArray(allWords))) { return -1 }
    let validWords = new WordSet();
    for (let i = 0; i < allWords.length; i++) {
        let word = allWords[i];
        let startingNode = new LetterNode(-1, -1);
        let wordDepth = getWordDepth(word, startingNode);
        if (wordDepth === word.length) {
            validWords.addWord(word);
        }
    }
    return validWords;
}

/**
 * Gets the depth of the graph created for a word. This initial call to getDepth passes a depth of
 * 0 because the first node created under the starting node is the first letter and at depth 0.
 * @param {string} word - the word being spelled in the puzzle
 * @param {LetterNode} startingNode - the starting node for spelling a word in the puzzle
 * @returns the maximum depth reached while spelling the word
 */
function getWordDepth(word, startingNode) {
    if (!(startingNode instanceof LetterNode)) { return -1 }
    if (typeof word !== 'string') { return -1 }
    return getDepth(word, startingNode, 0);
}

/**
 * Gets the depth of the graph below a specific letter node
 * @param {string} word - the word being spelled in the puzzle
 * @param {LetterNode} currentNode - the current LetterNode 
 * @param {number} depth - how far into spelling the word the next letter will be
 * @returns the maximum depth reached below the currentNode
 */
function getDepth(word, currentNode, depth) {
    if (typeof word !== 'string') { return 0 }
    if (typeof depth !== 'number') { return 0 }
    if (!(currentNode instanceof LetterNode)) { return 0 }
    if (depth >= word.length) { return depth; }
    let puzzle = getPuzzle()
    let maxDepthReached = depth;
    for (let i = 0; i < puzzle.length; i++) {
        const letter = puzzle[i];
        if (letterIsValidMove(letter, word, depth, currentNode)) {
            let newLetterNode = new LetterNode(letter.id, depth, letter.value);
            currentNode.children.push(newLetterNode);
            let depthUnderNewLetterNode = getDepth(word, newLetterNode, depth + 1);
            maxDepthReached = Math.max(maxDepthReached, depthUnderNewLetterNode);
        }
    }
    return maxDepthReached;
}

/**
 * Determines if a letter is a valid next move in the puzzle.
 * 
 * @param {string} letter - a PuzzleLetter representing a possible next location
 * @param {string} word - the word being spelled in the puzzle
 * @param {number} depth - how far into spelling the word the next letter will be
 * @param {LetterNode} currentNode - the current LetterNode 
 * @returns true if the letter is a valid next move
 */
function letterIsValidMove(letter, word, depth, currentNode) {
    if (!(letter instanceof PuzzleLetter)) { return false }
    if (typeof letter !== 'object') { return false }
    if (typeof word !== 'string') { return false }
    if (typeof depth !== 'number') { return false }
    if (depth < 0) { return false }
    if (!(currentNode instanceof LetterNode)) { return false }
    return letter.value === word[depth] && isValidMove(currentNode.id, letter.id);
}

/**
 * Determines if two letters can follow each other in the puzzle. A source id of -1 represents the
 * first move, so it will always return true.
 * @param {number} source - the puzzle-id of the source location
 * @param {number} destination - the puzzle-id of the destination location
 * @returns true if the source and destination are not the same side of the puzzle or if source = -1
 */
function isValidMove(source, destination) {
    if (typeof source !== 'number' || typeof destination !== 'number') { return false }
    if (source < -1 || source > 11) { return false }
    if (destination < 0 || destination > 11) { return false }
    if (source === -1) { return true }
    const sourceGroup = Math.floor(source / 3);
    const destinationGroup = Math.floor(destination / 3);
    return sourceGroup !== destinationGroup;
}

export { getValidWords };