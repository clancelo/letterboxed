
import fs from 'fs';

function writeSetToFile(set, filePath) {

    // Convert set to array for easier manipulation
    const array = Array.from(set);

    // Convert array elements to strings
    const stringArray = array.map(item => item.toString());

    // Join array elements with newline character
    const content = stringArray.join('\n');

    // Write content to file
    fs.writeFileSync(filePath, content, { encoding: 'utf-8' });

    console.log(`Set written to ${filePath}`);
}

function writeArrayToFile(array, filePath) {

    // Convert array elements to strings
    const stringArray = array.map(item => item.toString());

    // Join array elements with newline character
    const content = stringArray.join('\n');

    // Write content to file
    fs.writeFileSync(filePath, content, { encoding: 'utf-8' });

    console.log(`Set written to ${filePath}`);
}

function readOxfordFile(filename) {
    try {
        const data = fs.readFileSync(filename, 'utf8');
        const wordsArray = data.split('\n');
        const filteredLines = wordsArray.filter(line => !/\(/.test(line));
        const cleanedArray = filteredLines.filter(word => word.trim() !== '').map(word => word.toLowerCase());
        return cleanedArray;
    } catch (err) {
        console.error('Error reading the file:', err);
        return [];
    }
}

function readAZFile(filename) {
    try {
        const data = fs.readFileSync(filename, 'utf8');
        const wordsArray = data.split('\r\n');
        const filteredLines = wordsArray.filter(line => !/\(/.test(line));
        const cleanedArray = filteredLines.filter(word => word.trim() !== '').map(word => word.toLowerCase());
        return cleanedArray;
    } catch (err) {
        console.error('Error reading the file:', err);
        return [];
    }
}

function removeDigits(wordsArray) {
    // Create a regular expression to match digits at the end of each word
    const regex = /\d+$/;

    // Iterate over each word in the array
    return wordsArray.map(word => {
        // Use the replace method to remove digits from the end of the word
        return word.replace(regex, '');
    });
}

function removeDetails(wordsArray) {

    let i = 0;
    for (i = 0; i < wordsArray.length; i++) {
        wordsArray[i] = wordsArray[i].split(' ')[0];
        wordsArray[i] = wordsArray[i].replace(',', '');
        wordsArray[i] = wordsArray[i].replace('.', '');
    }


}

export { writeSetToFile, writeArrayToFile, readAZFile, readOxfordFile };