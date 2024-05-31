import fs from 'fs';
import { resolve } from 'path';

/**
 * Reads a file of newline-seperated words and returns the words as an array. If
 * a file read error occurs, an empty array is returned.
 * @param {string} basePath - the complete path to the program directory
 * @param {string} filePath - the relative path to a source file
 * @param {string} minLength - the minimum word length to include
 * @param {string} maxLength - the maximum word length to include
 * @returns an array of words in the specified length range
 */
function readFile(basePath, filePath, minLength, maxLength) {
    if (typeof filePath !== 'string') { return [] }
    if (typeof minLength !== 'number') { return [] }
    if (typeof maxLength !== 'number') { return [] }
    try {
        const fileConent = fs.readFileSync(resolve(basePath, filePath), 'utf8');
        let wordList = fileConent.split('\n');
        wordList = wordList
            .filter(word => word.trim() !== '') // remove empty words
            .map(word => word.trim().toUpperCase()) // normalize words
            .filter(word => word.length <= maxLength) // enforce max length
            .filter(word => word.length >= minLength); // enforce min length
        return wordList;
    } catch (readFileError) {
        console.error(`Error reading file from path: ${filePath}`);
        return [];
    }
}

/**
 * Writes an array of Solutions to a specific file path.
 * @param {array} solutionsArray - the array of Solution objects
 * @param {string} basePath - the complete path to the program directory
 * @param {string} filePath - the relative path to a destination file
 * @returns true if the file was written successfully, false otherwise
 */
function writeSolutionsToFile(solutionsArray, basePath, filePath) {
    if (!(Array.isArray(solutionsArray))) { return false }
    if (typeof filePath !== 'string') { return false }
    const solutionsAsText = solutionsArray.map(solution => solution.toText());
    const fileContent = solutionsAsText.join('\n');
    try {
        fs.writeFileSync(resolve(basePath, filePath), fileContent, { encoding: 'utf-8' });
        return true;
    } catch (fileWriteError) {
        console.error(`Error writing file to path: ${filePath}`);
        return false;
    }
}

export { readFile, writeSolutionsToFile };