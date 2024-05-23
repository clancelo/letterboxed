import puzzle from '../puzzle/puzzleArchive.js'
import { Node, WordSet } from './wordData.js'

function buildWordSequence(word, currentNode, depth) {
    if (depth >= word.length) { return depth; }
    let maxChildDepth = depth;
    puzzle.forEach(letter => {
        if (letter.value === word[depth] && isValidMove(currentNode.id, letter.id)) {
            let newLetterNode = new Node(letter.id, depth);
            currentNode.children.push(newLetterNode);
            let childDepth = buildWordSequence(word, newLetterNode, depth + 1);
            maxChildDepth = Math.max(maxChildDepth, childDepth);
        }
    });
    return maxChildDepth;
}

function getValidWords(allWords) {
    const startingDepth = 0;
    let validWords = new WordSet();
    for (let i = 0; i < allWords.length; i++) {
        let word = allWords[i];
        let startingNode = new Node(-1, 0);
        let wordDepth = buildWordSequence(word, startingNode, startingDepth);
        if (wordDepth === word.length) {
            validWords.addWord(word);
        }
    }
    return validWords;
}

function isValidMove(source, destination) {
    if (source < -1 || source > 11) return false;
    if (-1 < source > 11) return false;
    if (source === -1) return true;
    const sourceGroup = Math.floor(source / 3);
    const destinationGroup = Math.floor(destination / 3);
    return !(sourceGroup === destinationGroup);
}

function addValidWord(validWords, word) {
    const firstLetter = word[0];
    validWords.startsWith[firstLetter] = validWords.startsWith[firstLetter] ?? [];
    validWords.startsWith[firstLetter].push(word);
    const lastLetter = word[word.length - 1];
    validWords.endsWith[lastLetter] = validWords.endsWith[lastLetter] ?? [];
    validWords.endsWith[lastLetter].push(word);
    const wordRating = getWordRating(word);
    validWords.rating[wordRating] = validWords.rating[wordRating] ?? [];
    validWords.rating[wordRating].push(word);
    validWords.allWords[word] = wordRating;
}

export { getValidWords };