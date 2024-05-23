// Collection of valid puzzles
const puzzleArchive = {
    "currentPuzzle": 1,
    "testPuzzle":
        [
            { "id": 0, "value": 'O' },
            { "id": 1, "value": 'E' },
            { "id": 2, "value": 'P' },
            { "id": 3, "value": 'B' },
            { "id": 4, "value": 'E' },
            { "id": 5, "value": 'Y' },
            { "id": 6, "value": 'K' },
            { "id": 7, "value": 'S' },
            { "id": 8, "value": 'R' },
            { "id": 9, "value": 'U' },
            { "id": 10, "value": 'C' },
            { "id": 11, "value": 'A' }
        ],
    "archive": [
        [
            { "id": 0, "value": 'Q' },
            { "id": 1, "value": 'K' },
            { "id": 2, "value": 'I' },
            { "id": 3, "value": 'H' },
            { "id": 4, "value": 'M' },
            { "id": 5, "value": 'U' },
            { "id": 6, "value": 'A' },
            { "id": 7, "value": 'O' },
            { "id": 8, "value": 'S' },
            { "id": 9, "value": 'F' },
            { "id": 10, "value": 'R' },
            { "id": 11, "value": 'E' }
        ],
        [
            { "id": 0, "value": 'O' },
            { "id": 1, "value": 'E' },
            { "id": 2, "value": 'P' },
            { "id": 3, "value": 'B' },
            { "id": 4, "value": 'H' },
            { "id": 5, "value": 'Y' },
            { "id": 6, "value": 'K' },
            { "id": 7, "value": 'S' },
            { "id": 8, "value": 'R' },
            { "id": 9, "value": 'U' },
            { "id": 10, "value": 'C' },
            { "id": 11, "value": 'A' }
        ],
        [
            { "id": 0, "value": 'O' },
            { "id": 1, "value": 'I' },
            { "id": 2, "value": 'V' },
            { "id": 3, "value": 'B' },
            { "id": 4, "value": 'G' },
            { "id": 5, "value": 'R' },
            { "id": 6, "value": 'P' },
            { "id": 7, "value": 'M' },
            { "id": 8, "value": 'D' },
            { "id": 9, "value": 'E' },
            { "id": 10, "value": 'A' },
            { "id": 11, "value": 'Y' }
        ],
        [
            { "id": 0, "value": 'Y' },
            { "id": 1, "value": 'H' },
            { "id": 2, "value": 'O' },
            { "id": 3, "value": 'L' },
            { "id": 4, "value": 'F' },
            { "id": 5, "value": 'V' },
            { "id": 6, "value": 'R' },
            { "id": 7, "value": 'T' },
            { "id": 8, "value": 'N' },
            { "id": 9, "value": 'I' },
            { "id": 10, "value": 'W' },
            { "id": 11, "value": 'G' }
        ]
    ]
}

const currentPuzzle = puzzleArchive.archive[puzzleArchive.currentPuzzle];
const textPuzzle = puzzleArchive.testPuzzle;

export { currentPuzzle as puzzle, textPuzzle };