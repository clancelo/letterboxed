import fs from 'fs';
import { resolve } from 'path';
import { configManager } from '../puzzle/configManager.js'

/**
 * Reads a file of newline-seperated words and returns the words as an array. If
 * a file read error occurs, an empty array is returned.
 * @returns an array of words in the specified length range
 */
function readFile() {
    try {
        const fileConent = fs.readFileSync(resolve(configManager.getBasePath(), configManager.getDictPath()), 'utf8');
        let wordList = fileConent.split('\n');
        wordList = wordList
            .filter(word => word.trim() !== '') // remove empty words
            .map(word => word.trim().toUpperCase()) // normalize words
            .filter(word => word.length <= configManager.getMaxWordLength()) // enforce max length
            .filter(word => word.length >= configManager.getMinWordLength()); // enforce min length
        return wordList;
    } catch (readFileError) {
        console.error(`Error reading file from path: ${configManager.getDictPath()}`);
        return [];
    }
}

/**
 * Writes an array of Solutions to a specific file path.
 * @param {array} solutionsArray - the array of Solution objects
 * @returns true if the file was written successfully, false otherwise
 */
function writeSolutionsToFile(solutionsArray) {
    if (!(Array.isArray(solutionsArray))) { return false }
    const solutionsAsText = solutionsArray.map(solution => solution.toText());
    const fileContent = solutionsAsText.join('\n');
    try {
        fs.writeFileSync(resolve(configManager.getBasePath(), configManager.getSolutionPath()), fileContent, { encoding: 'utf-8' });
        return true;
    } catch (fileWriteError) {
        console.error(`Error writing file to path: ${configManager.getDictPath()}`);
        return false;
    }
}

/**
 * Reads the config file and returns the contents as an object.
 * @returns an object holding config data
 */
function readConfigFile() {
    let config = {};
    try {
        const data = fs.readFileSync(resolve(configManager.getBasePath(), configManager.getConfigPath()), 'utf8');
        config = JSON.parse(data);
    } catch (err) {
        console.error('Error reading config');
    }
    return config;
}

export { readFile, writeSolutionsToFile, readConfigFile };