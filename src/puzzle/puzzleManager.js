import { configManager } from '../config/configManager.js'
/**
 * An encapsulation of a specifi location within the LetterBoxed puzzle. Each location has an id 
 * value (0-11, clockwise from the top left) and a letter associated with it. Both of these values
 * are contained in this object.
 */
class PuzzleLetter {

    /**
     * Builds a PuzzleLetter
     * @param {number} puzzleId - a value from 0-11 indicating the location in the puzzle
     * @param {string} letter - the letter at this object's id location
     */
    constructor(puzzleId, letter) {
        this.id = puzzleId;
        this.value = letter;
    }
}

/**
 * Returns an array of PuzzleLetter objects that hold puzzle-id and letter information. Each puzzle
 * must contain 12 letters, so this input validation is performed here.
 * @param {string} puzzleString - a string of 12 letters
 * @returns an array of PuzzleLetter objects or an empty array
 */
function buildPuzzle(puzzleString) {
    if (typeof puzzleString !== 'string') { return [] }
    if (puzzleString.length !== 12) { return [] }
    let array = [];
    for (let id = 0; id < puzzleString.length; id++) {
        array.push(new PuzzleLetter(id, puzzleString[id]));
    }
    return array
}

/**
 * Gets a puzzle array containing puzzle-id and letter information. The currentPuzzleIndex is used
 * to access the puzzle archive.
 * @returns an array of puzzle objects
 */
function getPuzzle() {
    return buildPuzzle(configManager.getPuzzles()[configManager.getPuzzleSelect()]);
}

/**
 * Returns the puzzle as an array of letters 
 * @returns an array of letters representing the puzzle
 */
function getPuzzleLetters() {
    return configManager.getPuzzles()[configManager.getPuzzleSelect()].split('');
}

export { getPuzzle, getPuzzleLetters, PuzzleLetter };