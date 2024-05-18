import { readFile, writeSolutionsToFile } from './util.js'
import { DICTIONARY_FILENAME, findValidWords, findSolutions, series } from './puzzleManager.js'

// Read in dictionary file
let allWords = readFile(DICTIONARY_FILENAME);

// Generate valid words that can be spelled in the puzzle
let wordSet = findValidWords(allWords);

// Generate a result set containing solutions to the puzzle
let result = findSolutions(wordSet);
console.log(111)
//console.dir(result, { 'maxArrayLength': null });
// for (let i = 0; i < result.allSolutions.length; i++) {
//     // console.dir(result.allSolutions[i].solution, { 'maxArrayLength': null });
//     //console.log(result.allSolutions[i].wordCount + ", " + result.allSolutions[i].characterCount + ", " + result.allSolutions[i].solution)
//     // console.log(result.allSolutions[i].characterCount)
//     // console.log(result.allSolutions[i].solution)
// }
writeSolutionsToFile(result.allSolutions, './test.txt');
//console.log(series);