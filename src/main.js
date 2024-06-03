import { readFile, writeSolutionsToFile } from './file/fileManager.js'
import { getValidWords } from './word/wordBuilder.js'
import { getSolutions } from './solution/solutionBuilder.js'
import { Config } from './config.js'
import { Log } from './logger.js'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

Log.programStart();

// Validate config
const config = new Config();
if (config.isInvalid()) { Log.programEnd(null) }

//TODO: Configure systems to remove their access to config

// Configure directory
Log.phaseStart("Configuration");
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
config.set_base_path(__dirname);
Log.phaseEnd(true);

// Prepare for solutions
Log.phaseStart("Input");
const allWordsFromDictionary = readFile(config.base_path, config.dict_path(), config.min_word_length, config.max_word_length);
const validPuzzleWords = getValidWords(allWordsFromDictionary);
Log.phaseEnd(true);

// Solve Puzzle
Log.phaseStart("Solutions");
const puzzleSolutions = getSolutions(validPuzzleWords, config.will_sort);
Log.phaseEnd(true);

// Output solutions
Log.phaseStart("Output");
writeSolutionsToFile(puzzleSolutions.allSolutions, config.base_path, config.solution_path);
Log.phaseEnd(true);
Log.programEnd(puzzleSolutions);