import puzzle from './puzzle.js'
import { readOxfordFile, readAZFile } from './util.js'

class Node {
    constructor(id, depth) {
        this.id = id;
        this.depth = depth;
        this.children = [];
    }
}

/**

 */

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
    if (source < -1 || source > 11) return false;
    if (-1 < source > 11) return false;
    if (source === -1) return true;
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
 * @returns 
 */
function buildTree(word, currentNode, depth) {

    // Termination
    if (depth >= word.length) {
        // The currentNode holds the last letter of the word
        return depth;
    }

    // Track all child trees
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


function findWords(words) {
    let foundWords = [];
    words.forEach(word => {
        let startingNode = new Node(-1, 0);
        let depth = buildTree(word, startingNode, 0);
        if (depth === word.length & word.length !== 0) {
            foundWords.push(word.toLowerCase())
        }
    });
    return foundWords;
}

const azFilename = 'az.txt';
const oxfordFilename = 'oxford_top3000.txt';
const azWords = readAZFile(azFilename);
const oxfordWords = readOxfordFile(oxfordFilename);
let azFoundWords = findWords(azWords)
let oxfordFoundWords = findWords(oxfordWords)

console.dir(azFoundWords, { 'maxArrayLength': null });
console.dir(oxfordFoundWords, { 'maxArrayLength': null });