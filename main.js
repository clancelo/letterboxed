import { readFileLimited, writeSolutionsToFile } from './fileManager.js'
import { DICTIONARY_AZ, DICTIONARY_OXFORD, SOLUTION_OUTPUT, findValidWords, findSolutions } from './puzzleManager.js'

// Read dictionary file for words between 3 and 8 characters
let allWords = readFileLimited(DICTIONARY_AZ, 3, 8);

// Generate valid words that can be spelled in the puzzle
let validWords = findValidWords(allWords);

// Generate a result set containing solutions to the puzzle
let solutionSet = findSolutions(validWords);
solutionSet.allSolutions.sort((solutionA, solutionB) => solutionA.rating - solutionB.rating)

// Write solutions to file
writeSolutionsToFile(solutionSet.allSolutions, SOLUTION_OUTPUT);