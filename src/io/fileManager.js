import fs from 'fs';
import { resolve, join, extname, parse } from 'path';
import { configManager } from '../config/configManager.js'

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
        let t = resolve(configManager.getBasePath(), configManager.getConfigPath())
        const data = fs.readFileSync(resolve(configManager.getBasePath(), configManager.getConfigPath()), 'utf8');
        config = JSON.parse(data);
    } catch (err) {
        console.error('Error reading config');
    }
    return config;
}

/**
 * Returns a collection of puzzle strings from the puzzle file.
 * @returns a collection of puzzle strings
 */
function readPuzzlesFile() {
    let puzzles = [];
    try {
        const data = fs.readFileSync(resolve(configManager.getBasePath(), configManager.getPuzzlesPath()), 'utf8');;
        puzzles = JSON.parse(data);
    } catch (err) {
        console.error('Error reading puzzles file');
    }
    return puzzles;
}

/**
 * Processes all files in the dictionary directory and returns a collection of dictionary
 * entries that the program can access.
 * @returns a collection of dictionary entries
 */
function readDictionaryDirectory() {
    const basePath = resolve(configManager.getBasePath(), configManager.getDictDir());
    const dictionaryFiles = [];
    try {
        const allFiles = fs.readdirSync(basePath);
        for (let f = 0; f < allFiles.length; f++) {
            processDictionaryFile(dictionaryFiles, basePath, allFiles[f])
        }
    } catch (err) {
        console.error('Error reading dictionary directory');
    }
    return dictionaryFiles;
}

/**
 * Processes a dictionary file and adds it to the collection if the file is a text file
 * and not a directory. This function uses the configManager's makeDictionEntry() function
 * to form the entries.
 * @param {array} dictionaryFiles - the collection of dictionary entries to populate
 * @param {string} basePath - the base path for the program
 * @param {string} filename - the dictionary filename with extension
 */
function processDictionaryFile(dictionaryFiles, basePath, filename) {
    if (extname(filename) !== '.txt') { return }
    const filePath = join(basePath, filename);
    try {
        const fileData = fs.statSync(filePath);
        if (fileData.isDirectory()) { return }
    } catch (err) {
        console.error('Error reading dictionary directory');
    }
    dictionaryFiles.push(configManager.makeDictionaryEntry(filename, parse(filename).name));
}

export { readFile, writeSolutionsToFile, readConfigFile, readPuzzlesFile, readDictionaryDirectory };