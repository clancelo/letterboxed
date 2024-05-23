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
}

export { Node, WordSet };