import { getPuzzleCount } from './puzzleManager.js'
import { readConfigFile } from '../file/fileManager.js'

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
        this.dictionary = [
            {
                name: 'default',
                path: './dictionaries/oxford.txt'
            },
            {
                name: 'ox',
                path: './dictionaries/oxford.txt'
            },
            {
                name: 'az',
                path: './dictionaries/az.txt'
            },
            {
                name: 'debug',
                path: './dictionaries/debug.txt'
            }
        ];
        this.configPath = './config.json';
        this.solutionPath = './output/solutions.txt';
        this.basePath = '';
    }

    /**
     * Initialize the configuration manager with the given base path.
     * @param {string} basePath - The base path for the configuration
     */
    initialize(basePath) {
        if (typeof basePath !== 'string') { return }
        //TODO all this
        //this.readPuzzles
        //this.readDictionaries
        this.initializeConfig(basePath);
        //this.adjust indices to account for puzzles and dictionaries lengths
    }

    /**
     * Initialize the configuration using the given base path.
     * @param {string} basePath - The base path for the configuration
     */
    initializeConfig(basePath) {
        const configData = readConfigFile();
        if (typeof configData !== 'object') { return }
        const configEntries = Object.entries(configData);
        for (const [key, value] of configEntries) {
            switch (key) {
                case 'willSort':
                    this.setBoolean(key, value);
                    break;
                case 'willLimit':
                    this.setBoolean(key, value);
                    break;
                case 'silenceAllOutput':
                    this.setBoolean(key, value);
                    break;
                case 'silenceProgressOutput':
                    this.setBoolean(key, value);
                    break;
                case 'minWordLength':
                    this.setMinWordLength(key, value);
                    break;
                case 'maxWordLength':
                    this.setMaxWordLength(key, value);
                    break;
                case 'maxSolutionLength':
                    this.setMaxSolutionLength(key, value);
                    break;
                case 'solutionBreadth':
                    this.setSolutionBreadth(key, value);
                    break;
                case 'puzzleSelect':
                    this.setPuzzleSelect(key, value);
                    break;
                case 'dictionarySelect':
                    this.setDictSelect(key, value);
                    break;
                case 'solutionPath':
                    this.setSolutionPath(key, value);
                    break;
                default:
                    break;
            }
        }
        this.setBasePath(basePath);
        this.valid = true;
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
     */
    setBoolean(key, value) {
        if (typeof value !== 'boolean') { return }
        this[key] = value;
    }

    /**
     * Set the minimum word length.
     * @param {string} key - The configuration property key
     * @param {number} value - The minimum word length
     */
    setMinWordLength(key, value) {
        if (typeof value !== 'number') { return }
        if (value < 3) { return }
        this[key] = value;
        if (this.minWordLength > this.maxWordLength) {
            this.maxWordLength = this.minWordLength;
        }
    }

    /**
     * Set the maximum word length.
     * @param {string} key - The configuration property key
     * @param {number} value - The maximum word length
     */
    setMaxWordLength(key, value) {
        if (typeof value !== 'number') { return }
        if (value < 3) { return }
        this[key] = value;
        if (this.maxWordLength < this.minWordLength) {
            this.minWordLength = this.maxWordLength;
        }
    }

    /**
     * Set the maximum solution length.
     * @param {string} key - The configuration property key
     * @param {number} value - The maximum solution length
     */
    setMaxSolutionLength(key, value) {
        if (typeof value !== 'number') { return }
        if (value < 1) { return }
        this[key] = value;
    }

    /**
     * Set the solution breadth.
     * @param {string} key - The configuration property key
     * @param {number} value - The solution breadth
     */
    setSolutionBreadth(key, value) {
        if (typeof value !== 'number') { return }
        this[key] = value;
    }

    /**
     * Set the puzzle selector index.
     * @param {string} key - The configuration property key
     * @param {number} value - The selected puzzle index
     */
    setPuzzleSelect(key, value) {
        if (typeof value !== 'number') { return }
        if (value < 0 || value >= getPuzzleCount()) { return }
        this[key] = value;
    }

    /**
     * Set the dictionary selector index.
     * @param {string} key - The configuration property key
     * @param {number} value - The selected dictionary index
     */
    setDictSelect(key, value) {
        if (typeof value !== 'number') { return }
        if (value < 0 || value >= this.dictionary.length) { return }
        this[key] = value;
    }

    /**
     * Set the solution path.
     * @param {string} key - The configuration property key.
     * @param {string} value - The solution path.
     */
    setSolutionPath(key, value) {
        if (typeof value !== 'string') { return }
        this[key] = value;
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

}

const configManager = new ConfigManager();

export { configManager };