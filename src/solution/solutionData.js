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
    }

    /**
     * Adds a solution to the SolutionSet.
     * @param {Solution} solution - the solution to be added
     */
    add(solution) {
        this.allSolutions.push(solution);
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
     * @param {array} solution - an array of words representing a solution to the puzzle
     * @param {number} wordCount - the number of words in the solution
     * @param {number} characterCount - the number of characters in the solution
     */
    constructor(solution, wordCount, characterCount) {
        this.solution = solution;
        this.wordCount = wordCount;
        this.characterCount = characterCount;
        this.rating = wordCount * characterCount;
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

export { Solution, SolutionSet };