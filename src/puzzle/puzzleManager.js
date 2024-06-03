import { config } from '../config.js'

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
 * Puzzle management object governing which puzzle is to be solved.
 * 
 * currentPuzzleIndex - the index into the archive of the puzzle to be solved
 * archive - a collection of puzzle arrays
 */
const puzzleManager = {
    currentPuzzleIndex: 0,
    archive: [
        buildPuzzle('ARNPDCUIMTLO'),
        buildPuzzle('AERUCTSYIQLV'),
        buildPuzzle('TKLUAINYEBZH'),
        buildPuzzle('NEUICKWRPTAL'),
        buildPuzzle('AUEVCNRIOGLF'),
        buildPuzzle('QKIHMUAOSFRE'),
        buildPuzzle('OEPBHYKSRUCA'),
        buildPuzzle('OIVBGRPMDEAY'),
        buildPuzzle('YHOLFVRTNIWG'),
    ],
    puzzleCount: 9
}

function getPuzzleCount() {
    return puzzleManager.puzzleCount;
}

/**
 * Gets a puzzle array containing puzzle-id and letter information. The currentPuzzleIndex is used
 * to access the puzzle archive.
 * @returns an array of puzzle objects
 */
function getPuzzle() {
    return puzzleManager.archive[config.puzzle_select];
}

/**
 * Returns the puzzle as an array of letters 
 * @returns an array of letters representing the puzzle
 */
function getPuzzleLetters() {
    const puzzle = puzzleManager.archive[config.puzzle_select];
    return puzzle.map(letter => letter.value);
}

export { getPuzzle, getPuzzleLetters, PuzzleLetter, getPuzzleCount };