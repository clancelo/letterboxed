class SolutionSet {
    constructor() {
        this.currentSolution = [];
        this.allSolutions = [];
    }
    add(solution) {
        this.allSolutions.push(solution);
    }
    sort() {
        this.allSolutions.sort(this.compare)
    }
    compare(solution1, solution2) {
        return solution1.rating - solution2.rating;
    }
}

class Solution {
    constructor(solution, wordCount, characterCount) {
        this.solution = solution;
        this.wordCount = wordCount;
        this.characterCount = characterCount;
        this.rating = wordCount * characterCount;
    }
    toText() {
        return this.rating + ", " + this.wordCount + ", " + this.characterCount + ", " + this.solution;
    }

}

export { Solution, SolutionSet };