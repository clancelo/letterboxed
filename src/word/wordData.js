// An n-graph node that holds puzzle ID, letter, and graph depth information
class Node {
    constructor(id, depth, letter = '') {
        this.id = id;
        this.letter = letter;
        this.depth = depth;
        this.children = [];
    }

    // Prints the letter graph below this Node
    print() {
        this.#printIterative();
    }

    // Prints recursively the letter graph below this Node
    #printRecursive(node, indentLevel) {
        console.log(' '.repeat(indentLevel * 4) + node.letter);
        for (let i = 0; i < node.children.length; i++) {
            this.#printRecursive(node.children[i], indentLevel + 1);
        }
    }

    // Prints iteratively the letter graph below this Node
    #printIterative() {
        let stack = [this];
        while (stack.length > 0) {
            let currentNode = stack.pop();
            console.log(currentNode.letter)
            for (let i = currentNode.children.length - 1; i >= 0; i--) {
                stack.push(currentNode.children[i]);
            }
        }
    }
}

// A collection of words and category collections to access words from
class WordSet {
    constructor() {
        this.allWords = {};
        this.startsWith = {};
        this.endsWith = {};
        this.rating = {};
    }

    // Returns the words in the WordSet as an array
    getWords() {
        return Object.keys(this.allWords);
    }

    // Adds a word the WordSet
    addWord(word) {
        if (typeof word !== 'string') { return false };
        if (word.length === 0) { return false };
        if (this.#wordHasInvalidCharacters(word)) { return false };
        const firstLetter = word[0];
        const lastLetter = word[word.length - 1];
        const wordRating = this.#getWordRating(word);
        this.allWords[word] = wordRating;
        this.#addToCollection(this.startsWith, firstLetter, word);
        this.#addToCollection(this.endsWith, lastLetter, word);
        this.#addToCollection(this.rating, wordRating, word);
        return true;
    }

    // Adds a word to a collection within the WordSet
    #addToCollection(collection, key, word) {
        if (typeof collection !== 'object') { return false }
        if (typeof key !== 'string' && typeof key !== 'number') { return false }
        if (typeof word !== 'string') { return false }
        collection[key] = collection[key] ?? [];
        collection[key].push(word);
        return true;
    }

    // Returns the number of unique characters in a word
    #getWordRating(word) {
        if (typeof word !== 'string') { return 0 };
        return new Set(word).size;
    }

    // Returns whether a word has at least 1 invalid character
    #wordHasInvalidCharacters(word) {
        //TODO implement
        return false
    }

}

export { Node, WordSet };