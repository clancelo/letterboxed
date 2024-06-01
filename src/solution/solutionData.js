/**
 * A collection of sortable solutions. This object is populated as the program solves the puzzle.
 */
class SolutionSet {

    /**
     * Builds a SolutionSet.
     */
    constructor() {
        this.currentSolution = [];
        this.allSolutions = [];
        this.count = 0;
    }

    /**
     * Adds a solution to the SolutionSet.
     * @param {Solution} solution - the solution to be added
     */
    add(solution) {
        this.allSolutions.push(solution);
        this.count++;
    }

    /**
     * Sorts the Solutions contained in the SolutionSet.
     */
    sort() {
        this.allSolutions.sort(this.compare)
    }

    /**
     * Compares two solutions so that the collection of Solutions can be sorted.
     * @param {Solution} solution1 - the first Solution to compare
     * @param {Solution} solution2 - the second Solutionto compare
     * @returns 
     */
    compare(solution1, solution2) {
        return solution1.rating - solution2.rating;
    }
}

/**
 * Holds a single solution and meta data. The word count, character count, and rating, are all 
 * stored along with the array of words making up the solution.
 */
class Solution {

    /**
     * Builds a Solution.
     * //TODO input validation
     * @param {array} solution - an array of words representing a solution to the puzzle
     */
    constructor(solution) {
        this.solution = solution.slice();
        this.wordCount = solution.length;
        this.characterCount = getCharacterCount(solution);
        this.rating = this.wordCount * this.characterCount;
    }

    /**
     * Converts the solution to a string.
     * @returns a string with the solution and meta data.
     */
    toText() {
        return this.rating + ", " +
            this.wordCount + ", " +
            this.characterCount + ", " +
            this.solution;
    }

}

/**
 * Returns the number of characters in a solution.
 * TODO data type
 * @param {array} solution - the solution to count
 * @returns the number of characters in the solution
 */
function getCharacterCount(solution) {
    if (!Array.isArray(solution)) { return 0 }
    return solution.join('').length;
}

export { Solution, SolutionSet };