import { Log } from '../io/logger.js'

/**
 * An n-graph node that holds puzzle-id, letter, and graph depth. The id is the location within the
 * puzzle, the letter is the letter at that location, and the depth is the zero-indexed depth into
 * the spelling of a word.
 */
class LetterNode {

    /**
     * Builds a LetterNode. A default empty letter node is possible to initiate the graph.
     * @param {number} id - the puzzle-id of this node
     * @param {number} depth - the zero-indexed location into the word being spelled
     * @param {string} letter - the letter at this node
     */
    constructor(id, depth, letter = '') {
        this.id = id;
        this.letter = letter;
        this.depth = depth;
        this.children = [];
    }

    /**
     * Prints the letter graph below this Node.
     */
    print() {
        this.printIterative();
    }

    /**
     * Prints recursivelt the letter graph below this Node.
     */
    printRecursive(node, indentLevel) {
        Log.log(' '.repeat(indentLevel * 4) + node.letter);
        for (let i = 0; i < node.children.length; i++) {
            this.printRecursive(node.children[i], indentLevel + 1);
        }
    }

    /**
     * Prints iteratively the letter graph below this Node.
     */
    printIterative() {
        let stack = [this];
        while (stack.length > 0) {
            let currentNode = stack.pop();
            Log.log(currentNode.letter)
            for (let i = currentNode.children.length - 1; i >= 0; i--) {
                stack.push(currentNode.children[i]);
            }
        }
    }
}

/**
 * A collection of words and category collections to access the words from. The WordSet contains
 * 4 collection objects with the following key-value pairings:
 *  allWords - word:rating 
 *  startsWith - starting-letter:array-of-words 
 *  endsWith - ending-letter:array-of-words 
 *  rating - rating:array-of-words
 * 
 */
class WordSet {
    /**
     * Builds a WordSet object.
     */
    constructor() {
        this.allWords = {};
        this.startsWith = {};
        this.endsWith = {};
        this.rating = {};
    }

    /**
     * Generates a string array from the WordSet that contains all of the words.
     * @returns a string array containing all the words in the WordSet
     */
    getWords() {
        return Object.keys(this.allWords);
    }

    /**
     * Adds a word to the WordSet. The word is added to all four collection objects.
     * @param {string} word - the word to be added
     * @returns true if the word was addedd successfully, false otherwise
     */
    addWord(word) {
        if (typeof word !== 'string') { return false };
        if (word.length === 0) { return false };
        const firstLetter = word[0];
        const lastLetter = word[word.length - 1];
        const wordRating = this.getWordRating(word);
        //TODO begin changing the rating to new equation and store the rating with each collection, 
        // so they can be sorted by rating more easily
        this.allWords[word] = wordRating;
        this.addToCollection(this.startsWith, firstLetter, word);
        this.addToCollection(this.endsWith, lastLetter, word);
        this.addToCollection(this.rating, wordRating, word);
        return true;
    }

    /**
     * Adds a word to a collection within the WordSet
     * @param {object} collection - the collection object being modified
     * @param {string} key - the key to be added
     * @param {string} word - the value to be added
     * @returns true if the key-value pair is added to the collection object
     */
    addToCollection(collection, key, word) {
        if (typeof collection !== 'object') { return false }
        if (typeof key !== 'string' && typeof key !== 'number') { return false }
        if (typeof word !== 'string') { return false }
        collection[key] = collection[key] ?? [];
        collection[key].push(word);
        return true;
    }

    /**
     * Returns the number of unique characters in a word
     * @param {string} word - the word being rated
     * @returns the number of unique characters in the string
     */
    getWordRating(word) {
        if (typeof word !== 'string') { return 0 };
        return new Set(word).size;
    }

}

export { LetterNode, WordSet };