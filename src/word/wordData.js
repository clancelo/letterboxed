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