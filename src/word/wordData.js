class Node {
    constructor(id, depth, letter = '') {
        this.id = id;
        this.letter = letter;
        this.depth = depth;
        this.children = [];
    }
    print() {
        this.#printIterativeDFS(this, 0);
    }
    #printRecursiveDFS(node, indentLevel) {
        console.log(' '.repeat(indentLevel * 4) + node.letter);
        for (let i = 0; i < node.children.length; i++) {
            this.#printRecursiveDFS(node.children[i], indentLevel + 1);
        }
    }
    #printIterativeBFS() {
        let output = [];
        let queue = [this];
        while (queue.length > 0) {
            let currentNode = queue.shift();
            if (currentNode.depth !== -1) {
                output.push(currentNode.letter);
            }
            queue.push(...currentNode.children);
        }
        console.log(output.join(''))
    }
    #printIterativeDFS() {
        let output = [];
        let stack = [this];
        while (stack.length > 0) {
            let currentNode = stack.pop();
            if (currentNode.depth !== -1) {
                output.push(currentNode.letter);
            }
            for (let i = currentNode.children.length - 1; i >= 0; i--) {
                stack.push(currentNode.children[i]);
            }
        }
        console.log(output.join(''))
    }
    #printIDIterativeDFS() {
        let output = [];
        let stack = [this];
        while (stack.length > 0) {
            let currentNode = stack.pop();
            if (currentNode.depth !== -1) {
                output.push(currentNode.id);
            }
            for (let i = currentNode.children.length - 1; i >= 0; i--) {
                stack.push(currentNode.children[i]);
            }
        }
        console.log(output.join(' '))
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
    addWord(word) {
        if (typeof word !== 'string') { return false };
        if (word.length === 0) { return false };
        if (this.#wordHasInvalidCharacters(word)) { return false };
        const firstLetter = word[0];
        const lastLetter = word[word.length - 1];
        const wordRating = this.#getWordRating(word);
        this.allWords[word] = wordRating;
        this.#addOrCreateWord(this.startsWith, firstLetter, word);
        this.#addOrCreateWord(this.endsWith, lastLetter, word);
        this.#addOrCreateWord(this.rating, wordRating, word);
        return true;
    }
    #addOrCreateWord(collection, key, word) {
        if (typeof collection !== 'object') { return false }
        if (typeof key !== 'string' && typeof key !== 'number') { return false }
        if (typeof word !== 'string') { return false }
        collection[key] = collection[key] ?? [];
        collection[key].push(word);
        return true;
    }
    #getWordRating(word) {
        if (typeof word !== 'string') { return 0 };
        return new Set(word).size;
    }
    #wordHasInvalidCharacters(word) {
        //TODO implement check (to stop relying on clean dictionaries)
        return false
    }
}

export { Node, WordSet };