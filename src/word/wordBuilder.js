import { getPuzzle } from '../puzzle/puzzleManager.js'
import { Node, WordSet } from './wordData.js'

// Returns a WordSet containing all the words that can be spelled in the puzzle
function getValidWords(allWords) {
    if (!(Array.isArray(allWords))) { return -1 }
    let validWords = new WordSet();
    for (let i = 0; i < allWords.length; i++) {
        let word = allWords[i];
        let startingNode = new Node(-1, -1);
        let wordDepth = getWordDepth(word, startingNode);
        if (wordDepth === word.length) {
            validWords.addWord(word);
        }
    }
    return validWords;
}

// Gets the depth of the graph created for a word
function getWordDepth(word, startingNode) {
    if (!(startingNode instanceof Node)) { return -1 }
    if (typeof word !== 'string') { return -1 }
    return getDepth(word, startingNode, 0);
}

// Gets the depth of the graph below a specific letter node
function getDepth(word, currentLetterNode, depth) {
    //TODO input validation
    if (depth >= word.length) { return depth; }
    let puzzle = getPuzzle() // importing a return function instead of the object itself
    let maxDepthReached = depth;
    for (let i = 0; i < puzzle.length; i++) {
        const letter = puzzle[i];
        if (letterIsValidMove(letter, word, depth, currentLetterNode)) {
            let newLetterNode = new Node(letter.id, depth, letter);
            currentLetterNode.children.push(newLetterNode);
            let depthUnderNewLetterNode = getDepth(word, newLetterNode, depth + 1);
            maxDepthReached = Math.max(maxDepthReached, depthUnderNewLetterNode);
        }
    }
    return maxDepthReached;
}

// Determines if a letter is a valid next move in the puzzle
function letterIsValidMove(letter, word, depth, currentNode) {
    if (typeof letter !== 'object') { return false }
    if (typeof word !== 'string') { return false }
    if (typeof depth !== 'number') { return false }
    if (depth < 0) { return false }
    if (!(currentNode instanceof Node)) { return false }
    return letter.value === word[depth] && isValidMove(currentNode.id, letter.id);
}

// Determines if two letters can follow each other in the puzzle
function isValidMove(source, destination) {
    if (source < -1 || source > 11) { return false }
    if (destination < 0 || destination > 11) { return false }
    if (source === -1) { return true }
    const sourceGroup = Math.floor(source / 3);
    const destinationGroup = Math.floor(destination / 3);
    return sourceGroup !== destinationGroup;
}

export { getValidWords };