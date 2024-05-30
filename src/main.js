import { readFile, writeSolutionsToFile, setBasePath } from './file/fileManager.js'
import { getValidWords } from './word/wordBuilder.js'
import { findSolutions } from './solution/solutionBuilder.js'
import { DICTIONARY_AZ_LOCATION, DICTIONARY_OXFORD_LOCATION, SOLUTION_OUTPUT_LOCATION } from './puzzle/puzzleData.js'
import { setPuzzle } from './puzzle/puzzleArchive.js'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Configure directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
setBasePath(__dirname);

// Configure puzzle
const puzzleIndex = 1;
setPuzzle(puzzleIndex);

// Solve puzzle
const allWordsFromDictionary = readFile(DICTIONARY_OXFORD_LOCATION, 3, 20);
const validPuzzleWords = getValidWords(allWordsFromDictionary);
const puzzleSolutions = findSolutions(validPuzzleWords);
puzzleSolutions.sort();

// Output solutions
writeSolutionsToFile(puzzleSolutions.allSolutions, SOLUTION_OUTPUT_LOCATION);