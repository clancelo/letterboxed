import puzzle from '../puzzle/puzzleArchive.js'
import { Node, WordSet } from './wordData.js'

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

export { findValidWords };