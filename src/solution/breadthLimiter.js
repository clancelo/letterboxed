import { SolutionSet } from './solutionData.js'
import { config } from '../config.js'
//TODO account for different length solutions (b can go out of bounds here)

let SOLUTION_BREADTH = 0;

class BreadthLimiter {
    constructor() {
        this.counts = new Array(config.max_solution_length).fill(1);
        this.limitLevel = 0;
    }
    incrementCount(wordIndex) {
        this.counts[wordIndex]++;
    }
    setLimit(limitLevel) {
        this.limitLevel = limitLevel;
    }
    decrementLimit() {
        this.limitLevel--;
    }
    clearCount(wordIndex) {
        this.counts[wordIndex] = 1;
    }
    clearAllCounts() {
        for (let i = 0; i < this.counts.length; i++) {
            this.counts[i] = 1;
        }
    }
    getLimit() {
        return this.limitLevel;
    }
    getCount(wordIndex) {
        return this.counts[wordIndex];
    }
    getLength() {
        return config.max_solution_length;
    }
}

/**
 * Determines if the SolutionSet has reached its limit for solutions based on the current state of
 * the solution.
 * // TODO detail this function
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

function update(solutionSet) {
    if (!config.will_limit) { return }
    if (solutionSet.count <= 1) { return }
    updateCounts(solutionSet);
    updateLimit(solutionSet);
    // for (let b = 0; b < limiter.getLength(); b++) {
    //     if (previousSolution[b] === currentSolution[b]) {
    //         limiter.incrementCount(b);
    //     }
    //     else {
    //         for (; b < limiter.getLength(); b++) {
    //             limiter.clearCount(b);
    //         }
    //     }
    // }
    // for (let b = 0; b < limiter.getLength(); b++) {
    //     if (limitExceededForIndex(b)) {
    //         limiter.setLimit((currentSolution.length - 1) - b);
    //         break;
    //     }
    // }

}

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

function updateLimit(solutionSet) {
    for (let b = 0; b < limiter.getLength(); b++) {
        if (limitExceededForIndex(b)) {
            limiter.setLimit((solutionSet.currentSolution.length - 1) - b);
            break;
        }
    }
}

function limitExceededForIndex(index) {
    return limiter.getCount(index) >= Math.pow(2, limiter.getLength() - index - config.solution_breadth)
}

let limiter = new BreadthLimiter();

let breadthLimiter = {
    update,
    hasReachedLimit
}

export { breadthLimiter };