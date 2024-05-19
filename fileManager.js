
import fs from 'fs';

/**
 * Writes an array to a specific filename.
 * @param {array} array 
 * @param {string} filePath 
 */
function writeArrayToFile(array, filePath) {
    const stringArray = array.map(item => item.toString());
    const content = stringArray.join('\n');
    fs.writeFileSync(filePath, content, { encoding: 'utf-8' });
}

function solutionToText(solution) {
    return solution.rating + ", " + solution.wordCount + ", " + solution.characterCount + ", " + solution.solution;
}

/**
 * Writes an array to a specific filename.
 * @param {array} array 
 * @param {string} filePath 
 */
function writeSolutionsToFile(array, filePath) {
    const stringArray = array.map(item =>
        solutionToText(item)
    );
    const content = stringArray.join('\n');
    fs.writeFileSync(filePath, content, { encoding: 'utf-8' });
}

/**
 * Reads a file of words and returns an array of the words in the file.
 * @param {string} filename 
 * @returns an array of the words in the file
 */
function readFile(filename) {
    try {
        const data = fs.readFileSync(filename, 'utf8');
        const rawWordArray = data.split('\n').filter(word => word.trim() !== '');
        const cleanedWordArray = rawWordArray.map(function (word) {
            return word.trimEnd("\r");
        });
        return cleanedWordArray;
    } catch (err) {
        console.error('Error reading file -> ', err);
        return [];
    }
}

/**
 * Reads a file of words and returns an array of the words in the file.
 * @param {string} filename 
 * @returns an array of the words in the file
 */
function readFileLimited(filename, minLength, maxLength) {
    try {
        const data = fs.readFileSync(filename, 'utf8');
        const rawWordArray = data.split('\n').filter(word => word.trim() !== '');
        const cleanedWordArray = rawWordArray.map(function (word) {
            return word.trimEnd("\r");
        });
        const finalArray1 = cleanedWordArray.filter(word => word.length <= maxLength);
        const finalArray2 = finalArray1.filter(word => word.length >= minLength);
        return finalArray2;
    } catch (err) {
        console.error('Error reading file -> ', err);
        return [];
    }
}

export { writeSolutionsToFile, readFileLimited, readFile, writeArrayToFile };