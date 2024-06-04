import { readFile, writeSolutionsToFile } from './file/fileManager.js'
import { getValidWords } from './word/wordBuilder.js'
import { getSolutions } from './solution/solutionBuilder.js'
import { configManager } from './puzzle/configManager.js'
import { Log } from './logger.js'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

Log.programStart();
Log.phaseStart("Configuration");
configManager.initialize(dirname(fileURLToPath(import.meta.url)));
if (!(configManager.isValid())) { Log.programEnd(null) }
Log.phaseEnd(true);

Log.phaseStart("Input");
const allWordsFromDictionary = readFile();
Log.phaseEnd(true);

Log.phaseStart("Solutions");
const validPuzzleWords = getValidWords(allWordsFromDictionary);
const puzzleSolutions = getSolutions(validPuzzleWords);
Log.phaseEnd(true);

Log.phaseStart("Output");
writeSolutionsToFile(puzzleSolutions.allSolutions);
Log.phaseEnd(true);
Log.programEnd(puzzleSolutions);