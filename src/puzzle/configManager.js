import { readConfigFile, readPuzzlesFile, readDictionaryDirectory } from '../file/fileManager.js'

/**
 * Class representing a configuration manager.
 */
class ConfigManager {
    constructor() {
        this.valid = false;
        this.willSort = false;
        this.willLimit = false;
        this.silenceAllOutput = false;
        this.silenceProgressOutput = false;
        this.minWordLength = 0;
        this.maxWordLength = 0;
        this.maxSolutionLength = 0;
        this.solutionBreadth = 0;
        this.puzzleSelect = 0;
        this.dictionarySelect = 0;
        this.puzzles = [];
        this.dictionary = [];
        this.basePath = '';
        this.configPath = './config.json';
        this.solutionPath = './output/solutions.txt';
        this.puzzlesPath = './puzzle/puzzles.json';
        this.dictDir = './dictionaries';
        this.configValidationMap = {
            willSort: this.setBoolean,
            willLimit: this.setBoolean,
            silenceAllOutput: this.setBoolean,
            silenceProgressOutput: this.setBoolean,
            minWordLength: this.setMinWordLength,
            maxWordLength: this.setMaxWordLength,
            maxSolutionLength: this.setMaxSolutionLength,
            solutionBreadth: this.setSolutionBreadth,
            puzzleSelect: this.setPuzzleSelect,
            dictionarySelect: this.setDictSelect
        }
    }

    /**
     * Initialize the configuration manager with the given base path.
     * @param {string} basePath - The base path for the configuration
     */
    initialize(basePath) {
        if (typeof basePath !== 'string') { return }
        this.setBasePath(basePath);
        this.configurePuzzles();
        this.configureDictionaries();
        this.initializeConfig();
    }

    /**
     * Initialize the configuration.
     */
    initializeConfig() {
        const configData = readConfigFile();
        if (typeof configData !== 'object') { return }
        const configEntries = Object.entries(configData);
        this.setConfigurableProperties(configEntries);
        this.valid = true;
    }

    /**
     * Reads the dictionaries directory for dictionary files and updated the configuration to include
     * name and path references to valid dictionaries.
     */
    configureDictionaries() {
        let dictionaryEntries = readDictionaryDirectory();
        this.dictionary = dictionaryEntries;
    }

    /**
     * Determines if the potential dictionary is an object with name and path strings.
     * @returns true if the potential dictionary has name and path strings
     */
    isInvalidDictionaryEntry(potentialDictionary) {
        if (typeof potentialDictionary !== 'object') { return true }
        if (!('name' in potentialDictionary)) { return true }
        if (!('path' in potentialDictionary)) { return true }
        if (typeof potentialDictionary.name !== 'string') { return true }
        if (typeof potentialDictionary['path'] !== 'string') { return true }
        return false;
    }

    /**
     * Reads the puzzle data stored in file and populates the current configuration with the valid
     * puzzles read from file.
     */
    configurePuzzles() {
        let puzzleFileData = readPuzzlesFile();
        let validatedPuzzleArray = this.extractValidPuzzles(puzzleFileData);
        this.puzzles = validatedPuzzleArray;
    }

    /**
     * Extracts the valid puzzles from an array of potential puzzles. The original array is not
     * mutated - a new array is returned.
     * @param {Array} puzzleFileData - an array holding the letters in a puzzle configuration
     * @returns an array of valid puzzle strings
     */
    extractValidPuzzles(puzzleFileData) {
        if (!(Array.isArray(puzzleFileData))) { return [] }
        let arrayOfValidPuzzles = [];
        for (let p = 0; p < puzzleFileData.length; p++) {
            if (this.isInvalidPuzzleString(puzzleFileData[p])) {
                continue;
            }
            arrayOfValidPuzzles.push(puzzleFileData[p]);
        }
        return arrayOfValidPuzzles;
    }

    /**
     * Determines if the potential puzzle is a string of length 12.
     * @returns true if the argument is a string of length 12
     */
    isInvalidPuzzleString(potentialPuzzle) {
        if (typeof potentialPuzzle !== 'string') { return true }
        if (potentialPuzzle.length !== 12) { return true }
        return false;
    }


    /**
     * Parses the provided configuration object and applies the appropriate setProperty() function
     * to ensure value validation is performed.
     * @param {Object}} configEntries - a configuration object to use as a source of new values
     */
    setConfigurableProperties(configEntries) {
        for (const [key, value] of configEntries) {
            const validationFunction = this.configValidationMap[key];
            if (validationFunction) {
                validationFunction.call(this, key, value);
            }
        }
    }

    /**
     * Check if the configuration is valid.
     * @returns {boolean} True if the configuration is valid, otherwise false
     */
    isValid() {
        return this.valid;
    }

    /**
     * Set the base path for the configuration.
     * @param {string} basePath - The base path for the configuration
     * @returns {boolean} True if the base path is set successfully, otherwise false
     */
    setBasePath(basePath) {
        if (typeof basePath !== 'string') { return false }
        this.basePath = basePath;
        return true;
    }

    /**
     * Set a boolean configuration property.
     * @param {string} key - The configuration property key
     * @param {boolean} value - The configuration property value
     * @returns true if the new value is accepted and set
     */
    setBoolean(key, value) {
        if (typeof value !== 'boolean') { return false }
        this[key] = value;
        return true;
    }

    /**
     * Set the minimum word length.
     * @param {string} key - The configuration property key
     * @param {number} value - The minimum word length
     * @returns true if the new value is accepted and set
     */
    setMinWordLength(key, value) {
        if (typeof value !== 'number') { return false }
        if (value < 3) { return false }
        this[key] = value;
        if (this.minWordLength > this.maxWordLength) {
            this.maxWordLength = this.minWordLength;
        }
        return true;
    }

    /**
     * Set the maximum word length.
     * @param {string} key - The configuration property key
     * @param {number} value - The maximum word length
     * @returns true if the new value is accepted and set
     */
    setMaxWordLength(key, value) {
        if (typeof value !== 'number') { return false }
        if (value < 3) { return false }
        this[key] = value;
        if (this.maxWordLength < this.minWordLength) {
            this.minWordLength = this.maxWordLength;
        }
        return true;
    }

    /**
     * Set the maximum solution length.
     * @param {string} key - The configuration property key
     * @param {number} value - The maximum solution length
     * @returns true if the new value is accepted and set
     */
    setMaxSolutionLength(key, value) {
        if (typeof value !== 'number') { return false }
        if (value < 1) { return false }
        this[key] = value;
        return true;
    }

    /**
     * Set the solution breadth.
     * @param {string} key - The configuration property key
     * @param {number} value - The solution breadth
     * @returns true if the new value is accepted and set
     */
    setSolutionBreadth(key, value) {
        if (typeof value !== 'number') { return false }
        this[key] = value;
        return true;
    }

    /**
     * Set the puzzle selector index.
     * @param {string} key - The configuration property key
     * @param {number} value - The selected puzzle index
     * @returns true if the new value is accepted and set
     */
    setPuzzleSelect(key, value) {
        if (typeof value !== 'number') { return false }
        if (value < 0 || value >= this.puzzles.length) { return false }
        this[key] = value;
        return true;
    }

    /**
     * Set the dictionary selector index.
     * @param {string} key - The configuration property key
     * @param {number} value - The selected dictionary index
     * @returns true if the new value is accepted and set
     */
    setDictSelect(key, value) {
        if (typeof value !== 'number') { return false }
        if (value < 0 || value >= this.dictionary.length) { return false }
        this[key] = value;
        return true;
    }

    /**
     * Get the selected puzzle index.
     * @returns {number} The selected puzzle index.
     */
    getPuzzleSelect() {
        return this.puzzleSelect;
    }

    /**
     * Get the path to the selected dictionary.
     * @returns {string} The path to the selected dictionary.
     */
    getDictPath() {
        return this.dictionary[this.dictionarySelect].path;
    }

    getDictDir() {
        return this.dictDir;
    }

    /**
     * Get the base path for the configuration.
     * @returns {string} The base path for the configuration.
     */
    getBasePath() {
        return this.basePath;
    }

    /**
     * Get the path to the configuration file.
     * @returns {string} The path to the configuration file.
     */
    getConfigPath() {
        return this.configPath;
    }

    /**
     * Get the path to the puzzles file.
     * @returns {string} The path to the puzzles file.
     */
    getPuzzlesPath() {
        return this.puzzlesPath;
    }

    /**
     * Get the maximum word length.
     * @returns {number} The maximum word length.
     */
    getMaxWordLength() {
        return this.maxWordLength;
    }

    /**
     * Get the minimum word length.
     * @returns {number} The minimum word length.
     */
    getMinWordLength() {
        return this.minWordLength;
    }

    /**
     * Get if sorting is enabled.
     * @returns {boolean} True if sorting is enabled, otherwise false.
     */
    getWillSort() {
        return this.willSort;
    }

    /**
     * Get if breadth limiting is enabled.
     * @returns {boolean} True if limiting is enabled, otherwise false.
     */
    getWillLimit() {
        return this.willLimit;
    }

    /**
     * Get the solution breadth.
     * @returns {number} The solution breadth.
     */
    getSolutionBreadth() {
        return this.solutionBreadth;
    }

    /**
     * Get the maximum solution length.
     * @returns {number} The maximum solution length.
     */
    getMaxSolutionLength() {
        return this.maxSolutionLength;
    }

    /**
     * Get if solution progress output is silenced.
     * @returns {boolean} True if progress output is silenced, otherwise false.
     */
    getSilenceProgressOutput() {
        return this.silenceProgressOutput;
    }

    /**
     * Get if all output is silenced.
     * @returns {boolean} True if all output is silenced, otherwise false.
     */
    getSilenceAllOutput() {
        return this.silenceAllOutput;
    }

    /**
     * Get the solution path.
     * @returns {string} The solution path.
     */
    getSolutionPath() {
        return this.solutionPath;
    }

    /**
     * Returns the array of puzzle strings.
     * @returns the array of puzzle strings
     */
    getPuzzles() {
        return this.puzzles;
    }

    /**
     * Creates a dictionary entry for a specific file.
     * @param {string} filename - the filename with extension
     * @param {string} name - the filename without extension
     * @returns a dictionary entry containing name and path keys
     */
    makeDictionaryEntry(filename, name) {
        return {
            name: name,
            path: this.dictDir + "/" + filename
        }
    }

}

const configManager = new ConfigManager();

export { configManager };