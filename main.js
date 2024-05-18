import { readFile } from './util.js'
import { DICTIONARY_FILENAME, findValidWords, findSolutions, series } from './puzzleManager.js'

// Read in dictionary file
let allWords = readFile(DICTIONARY_FILENAME);

// Generate valid words that can be spelled in the puzzle
let wordSet = findValidWords(allWords);

// Generate a result set containing solutions to the puzzle
let result = findSolutions(wordSet);

console.log(result);
console.log(series);