class SolutionSet {
    constructor() {
        this.currentSolution = [];
        this.allSolutions = [];
    }
    add(solution) {
        this.allSolutions.push(solution);
    }
}

class Solution {
    constructor(solution, wordCount, characterCount) {
        this.solution = solution;
        this.wordCount = wordCount;
        this.characterCount = characterCount;
        this.rating = wordCount * characterCount;
    }
}

export { Solution, SolutionSet };