import { SolutionSet } from './solutionData.js'
import { config } from '../config.js'
//TODO account for different length solutions (b can go out of bounds here)

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
    if (limiter.getLimit() > 0) {
        limiter.decrementLimit();
        return true;
    }
    return false;
}

function update(solutionSet) {
    if (solutionSet.count <= 1) { return }
    let previousSolution = solutionSet.allSolutions[solutionSet.count - 2].solution;
    let currentSolution = solutionSet.allSolutions[solutionSet.count - 1].solution;
    for (let b = 0; b < limiter.getLength(); b++) {
        if (previousSolution[b] === currentSolution[b]) {
            limiter.incrementCount(b);
        }
        else {
            for (let c = b; c < limiter.getLength(); c++) {
                limiter.clearCount(c);
            }
        }
        if (limiter.getCount(b) >= Math.pow(2, limiter.getLength() - b)) {
            limiter.setLimit(limiter.getLength() - b - 1); // SOLUTION_BREADTH??
            break;
        }
    }
}

let limiter = new BreadthLimiter();

let breadthLimiter = {
    update,
    hasReachedLimit
}

export { breadthLimiter };