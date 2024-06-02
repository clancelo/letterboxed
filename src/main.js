import { readFile, writeSolutionsToFile } from './file/fileManager.js'
import { getValidWords } from './word/wordBuilder.js'
import { getSolutions } from './solution/solutionBuilder.js'
import { config } from './config.js'
import { setPuzzle } from './puzzle/puzzleManager.js'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

//TODO: validate config

// Configure directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
config.set_base_path(__dirname);

// Configure puzzle
setPuzzle(config.puzzle_select);

// Configure solver


// Read dictionary
const allWordsFromDictionary = readFile(config.base_path, config.dict_path(), config.min_word_length, config.max_word_length);

// Solve Puzzle
const validPuzzleWords = getValidWords(allWordsFromDictionary);
const puzzleSolutions = getSolutions(validPuzzleWords, config.will_sort);

// Output solutions
writeSolutionsToFile(puzzleSolutions.allSolutions, config.base_path, config.solution_path);