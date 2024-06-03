import { SolutionSet } from './solutionData.js'
import { config } from '../config.js'

/**
 * Handles tracking the breadth of the solution space. Each index in the solution is monitored
 * according for repeated sequences and the solution space is truncated when necessary. 
 */
class BreadthLimiter {

    /**
     * Builds a BreadthLimiter. The counts array holds the number of times each index has repeated.
     * The limitLevel value represents how far into the current working solution the limiter needs
     * to effect.
     */
    constructor() {
        this.counts = new Array(config.max_solution_length).fill(1);
        this.limitLevel = 0;
    }

    /**
     * Increments the count for a specific index, indicating that the index has repeated.
     * @param {number} wordIndex - the index at which count needs to be incremented
     */
    incrementCount(wordIndex) {
        this.counts[wordIndex]++;
    }

    /**
     * Sets the limit level for the breadth limiter.
     * @param {number} limitLevel - the new limit level to be set
     */
    setLimit(limitLevel) {
        this.limitLevel = limitLevel;
    }

    /**
     * Decrements the limit level by one.
     */
    decrementLimit() {
        this.limitLevel--;
    }

    /**
     * Resets the count for a specific index to 1.
     * @param {number} wordIndex - the index at which count needs to be reset
     */
    clearCount(wordIndex) {
        this.counts[wordIndex] = 1;
    }

    /**
     * Gets the current limit level.
     * @returns {number} - the current limit level
     */
    getLimit() {
        return this.limitLevel;
    }

    /**
     * Gets the count for a specific index.
     * @param {number} wordIndex - the index for which to get the count
     * @returns {number} - the count at the specified index
     */
    getCount(wordIndex) {
        if (wordIndex < 0 || wordIndex >= this.counts.length) { return }
        return this.counts[wordIndex];
    }

    /**
     * Gets the maximum solution length from the configuration.
     * @returns {number} - the maximum solution length
     */
    getLength() {
        return config.max_solution_length;
    }
}

/**
 * Determines if the SolutionSet has reached its limit for solutions based on the current state of
 * the solution.
 * @param {SolutionSet} solutionSet - the SolutionSet being examined for a breadth limit
 * @param {array} currentSeries - an array of words representing the current state of the solution
 * @returns 
 */
function hasReachedLimit() {
    if (!config.will_limit) { return false }
    if (limiter.getLimit() > 0) {
        limiter.decrementLimit();
        return true;
    }
    return false;
}

/**
 * Updates the breadth limiter based on the current state of the solution set.
 * @param {SolutionSet} solutionSet - the SolutionSet being examined by the breadth limiter
 */
function update(solutionSet) {
    if (!config.will_limit) { return }
    if (solutionSet.count <= 1) { return }
    if (!(solutionSet instanceof SolutionSet)) { return }
    updateCounts(solutionSet);
    updateLimit(solutionSet);
}

/**
 * Updates the breadth limiter based on the current state of the solution set. Input is validated in
 * the calling function.
 * @param {SolutionSet} solutionSet - the SolutionSet being examined by the breadth limiter
 */
function updateCounts(solutionSet) {
    let previousSolution = solutionSet.allSolutions[solutionSet.count - 2].solution;
    let currentSolution = solutionSet.allSolutions[solutionSet.count - 1].solution;
    for (let b = 0; b < limiter.getLength(); b++) {
        if (previousSolution[b] === currentSolution[b]) {
            limiter.incrementCount(b);
        }
        else {
            for (; b < limiter.getLength(); b++) {
                limiter.clearCount(b);
            }
        }
    }
}

/**
 * Updates the limit level based on the current state of the solution set. Input is validated in the
 * calling function.
 * @param {SolutionSet} solutionSet - the SolutionSet being examined by the breadth limiter
 */
function updateLimit(solutionSet) {
    for (let b = 0; b < limiter.getLength(); b++) {
        if (limitExceededForIndex(b)) {
            limiter.setLimit((solutionSet.currentSolution.length - 1) - b);
            break;
        }
    }
}

/**
 * Determines if the limit has been exceeded for a specific index.
 * @param {number} index - the index to check
 * @returns {boolean} - true if the limit has been exceeded, false otherwise
 */
function limitExceededForIndex(index) {
    return limiter.getCount(index) >= Math.pow(2, limiter.getLength() - index - config.solution_breadth)
}

// This module holds state while the puzzle is solved.
let limiter = new BreadthLimiter();

// Provide access to update and check the state of the breadthlimiter
let breadthLimiter = {
    update,
    hasReachedLimit
}

export { breadthLimiter };