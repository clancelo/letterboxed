import { readFile, writeSolutionsToFile } from './io/fileManager.js'
import { getValidWords } from './word/wordBuilder.js'
import { getSolutions } from './solution/solutionBuilder.js'
import { configManager } from './config/configManager.js'
import { Log } from './io/logger.js'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Configure
configManager.initialize(dirname(fileURLToPath(import.meta.url)));
if (!(configManager.isValid())) { Log.programEnd(null) }

// Solve
const allWordsFromDictionary = readFile();
const validPuzzleWords = getValidWords(allWordsFromDictionary);

// TODO //
// Sort words by different rating and add rating to all collections in WordSet

const puzzleSolutions = getSolutions(validPuzzleWords);

// Output
writeSolutionsToFile(puzzleSolutions.allSolutions);
Log.programEnd(puzzleSolutions);