import { SolutionSet } from '../solution/solutionData.js'
import { configManager } from '../config/configManager.js'

/**
 * Logs a message to the console.
 * @param {string} string - The message to be logged
 */
function log(string) {
    if (configManager.getSilenceAllOutput()) { return }
    console.log(string);
}

/**
 * Outputs the progress of solution generation.
 * @param {number} currentWord - The index of the current word being solved for
 * @param {number} maxWords - The number of possible words for a puzzle
 */
function outputProgress(wordIndex, maxWords) {
    if (configManager.getSilenceAllOutput()) { return }
    if (configManager.getSilenceProgressOutput()) { return }
    if (wordIndex % Math.max(0, Math.floor(maxWords / 10)) === 0 && wordIndex !== 0) {
        process.stdout.write("| ");
    }
}

/**
 * Logs the start of a processing phase.
 * @param {string} string - The phase description to be logged
 */
function phaseStart(string) {
    if (configManager.getSilenceAllOutput()) { return }
    process.stdout.write(string + ", ");
}

/**
 * Logs the end and result of a processing phase.
 * @param {boolean} phaseStatus - Success or failure of the phase
 */
function phaseEnd(phaseStatus) {
    if (configManager.getSilenceAllOutput()) { return }
    console.log(phaseStatus ? "Success" : "Failure");
}

/**
 * Logs the end of the program and the total number of solutions found to the console. Can't be
 * silenced.
 * @param {object} puzzleSolutions - The object containing all the puzzle solutions
 */
function programEnd(puzzleSolutions) {
    if (!(puzzleSolutions instanceof SolutionSet)) { return }
    console.log(`Solutions Count: ${puzzleSolutions.allSolutions.length}`);
    console.log("Program End");
}

/**
 * Logs the start of the program to the console. Can't be silenced.
 */
function programStart() {
    console.log("Program Start");
}

// Exposed logger object
let Log = {
    log,
    programStart,
    outputProgress,
    phaseStart,
    phaseEnd,
    programEnd
}

export { Log };