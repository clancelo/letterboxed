
let puzzleArchive = {
    currentPuzzleIndex: 0,
    testPuzzle:
        [
            { id: 0, value: 'O' },
            { id: 1, value: 'E' },
            { id: 2, value: 'P' },
            { id: 3, value: 'B' },
            { id: 4, value: 'E' },
            { id: 5, value: 'Y' },
            { id: 6, value: 'K' },
            { id: 7, value: 'S' },
            { id: 8, value: 'R' },
            { id: 9, value: 'U' },
            { id: 10, value: 'C' },
            { id: 11, value: 'A' }
        ],
    archive: [
        [
            { id: 0, value: 'N' },
            { id: 1, value: 'E' },
            { id: 2, value: 'U' },
            { id: 3, value: 'I' },
            { id: 4, value: 'C' },
            { id: 5, value: 'K' },
            { id: 6, value: 'W' },
            { id: 7, value: 'R' },
            { id: 8, value: 'P' },
            { id: 9, value: 'T' },
            { id: 10, value: 'A' },
            { id: 11, value: 'L' }
        ],
        [
            { id: 0, value: 'A' },
            { id: 1, value: 'U' },
            { id: 2, value: 'E' },
            { id: 3, value: 'V' },
            { id: 4, value: 'C' },
            { id: 5, value: 'N' },
            { id: 6, value: 'R' },
            { id: 7, value: 'I' },
            { id: 8, value: 'O' },
            { id: 9, value: 'G' },
            { id: 10, value: 'L' },
            { id: 11, value: 'F' }
        ],
        [
            { id: 0, value: 'Q' },
            { id: 1, value: 'K' },
            { id: 2, value: 'I' },
            { id: 3, value: 'H' },
            { id: 4, value: 'M' },
            { id: 5, value: 'U' },
            { id: 6, value: 'A' },
            { id: 7, value: 'O' },
            { id: 8, value: 'S' },
            { id: 9, value: 'F' },
            { id: 10, value: 'R' },
            { id: 11, value: 'E' }
        ],
        [
            { id: 0, value: 'O' },
            { id: 1, value: 'E' },
            { id: 2, value: 'P' },
            { id: 3, value: 'B' },
            { id: 4, value: 'H' },
            { id: 5, value: 'Y' },
            { id: 6, value: 'K' },
            { id: 7, value: 'S' },
            { id: 8, value: 'R' },
            { id: 9, value: 'U' },
            { id: 10, value: 'C' },
            { id: 11, value: 'A' }
        ],
        [
            { id: 0, value: 'O' },
            { id: 1, value: 'I' },
            { id: 2, value: 'V' },
            { id: 3, value: 'B' },
            { id: 4, value: 'G' },
            { id: 5, value: 'R' },
            { id: 6, value: 'P' },
            { id: 7, value: 'M' },
            { id: 8, value: 'D' },
            { id: 9, value: 'E' },
            { id: 10, value: 'A' },
            { id: 11, value: 'Y' }
        ],
        [
            { id: 0, value: 'Y' },
            { id: 1, value: 'H' },
            { id: 2, value: 'O' },
            { id: 3, value: 'L' },
            { id: 4, value: 'F' },
            { id: 5, value: 'V' },
            { id: 6, value: 'R' },
            { id: 7, value: 'T' },
            { id: 8, value: 'N' },
            { id: 9, value: 'I' },
            { id: 10, value: 'W' },
            { id: 11, value: 'G' }
        ]
    ]
}

function setPuzzle(puzzleIndex) {
    // if (typeof archiveIndex !== 'number') { return [] }
    // if (archiveIndex < 0 || archiveIndex >= puzzleArchive.archive.length) { return [] }
    puzzleArchive.currentPuzzleIndex = puzzleIndex;
}

function getPuzzle() {
    return puzzleArchive.archive[puzzleArchive.currentPuzzleIndex]
}

/**
 * Returns the puzzle as an array of letters
 * @param {number} archiveIndex - the puzzle index in the archive to retrieve 
 * @returns an array of letters representing the puzzle
 */
function getPuzzleLetters() {
    const puzzle = puzzleArchive.archive[puzzleArchive.currentPuzzleIndex];
    return puzzle.map(letter => letter.value);
}

export { setPuzzle, getPuzzle, getPuzzleLetters };