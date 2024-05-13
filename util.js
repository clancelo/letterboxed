
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

export { writeArrayToFile, readFile };