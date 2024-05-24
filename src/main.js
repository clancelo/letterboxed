import { readFileLimited, writeSolutionsToFile } from './file/fileManager.js'
import { getValidWords } from './word/wordBuilder.js'
import { findSolutions } from './solution/solutionBuilder.js'
import { DICTIONARY_AZ_LOCATION, DICTIONARY_OXFORD_LOCATION, SOLUTION_OUTPUT_LOCATION } from './puzzle/puzzleData.js'

const allWordsFromDictionary = readFileLimited(DICTIONARY_AZ_LOCATION, 3, 8);
const validPuzzleWords = getValidWords(allWordsFromDictionary);
const puzzleSolutions = findSolutions(validPuzzleWords);

puzzleSolutions.allSolutions.sort((solutionA, solutionB) => solutionA.rating - solutionB.rating)
writeSolutionsToFile(puzzleSolutions.allSolutions, SOLUTION_OUTPUT_LOCATION);