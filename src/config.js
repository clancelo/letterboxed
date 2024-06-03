import { getPuzzleCount } from './puzzle/puzzleManager.js'
/**
 * Configuration object governing the various parameters for the program.
 * //TODO add comments for additional keys
 * min_word_length - the smallest word length accepted from the dictionary file
 * max_word_length - the largest word length accepted from the dictionary file
 * puzzle_select - an index in the puzzle archive, indicating which puzzle is to be solved
 * dict_select - an index in the config.dict collection, indicating which dictionary is to be used
 * will_sort - a flag for sorting the solutions before outputting to file
 * base_path - the complete path to the directory the program was executed from
 * set_base_path - a function for setting the base_path at program start
 * dict_path - the complete path to the target dictionary
 * solution_path - the relative path for file output
 * dict - an array of dictionary objects that contain relative paths to the dictionary files
 */
const config = {
    will_sort: true,
    will_limit: true,
    silence_all_output: false,
    silence_progress_output: false,
    min_word_length: 3,
    max_word_length: 20,
    max_solution_length: 5,
    solution_breadth: 0,
    puzzle_select: 1,
    dict_select: 2,
    dict: [
        {
            name: 'default',
            value: './dictionaries/oxford.txt'
        },
        {
            name: 'ox',
            value: './dictionaries/oxford.txt'
        },
        {
            name: 'az',
            value: './dictionaries/az.txt'
        },
        {
            name: 'debug',
            value: './dictionaries/debug.txt'
        }
    ],
    solution_path: './output/solutions.txt',
    base_path: '',
    set_base_path: setBasePath,
    dict_path: getDictPath
}

class Config {
    constructor(basePath) {
        this.valid = false;
        this.will_sort = false;
        this.will_limit = false;
        this.silence_all_output = false;
        this.silence_progress_output = false;
        this.min_word_length = 0;
        this.max_word_length = 0;
        this.max_solution_length = 0;
        this.solution_breadth = 0;
        this.puzzle_select = 0;
        this.dict_select = 0;
        this.dict = [
            {
                name: 'default',
                value: './dictionaries/oxford.txt'
            },
            {
                name: 'ox',
                value: './dictionaries/oxford.txt'
            },
            {
                name: 'az',
                value: './dictionaries/az.txt'
            },
            {
                name: 'debug',
                value: './dictionaries/debug.txt'
            }
        ];
        this.solution_path = './output/solutions.txt';
        this.base_path = '';
        this.initialize(basePath);
    }
    initialize(basePath) {
        if (typeof basePath !== 'string') { return }
        this.initializeConfig(basePath);
    }
    initializeConfig(basePath) {
        const configData = this.readConfigFile();
        if (typeof configData !== 'object') { return }
        const configEntries = Object.entries(configData);
        for (const [key, value] of configEntries) {
            switch (key) {
                case 'will_sort':
                    this.setBoolean(key, value);
                    break;
                case 'will_limit':
                    this.setBoolean(key, value);
                    break;
                case 'silence_all_output':
                    this.setBoolean(key, value);
                    break;
                case 'silence_progress_output':
                    this.setBoolean(key, value);
                    break;
                case 'min_word_length':
                    this.setMinWordLength(key, value);
                    break;
                case 'max_word_length':
                    this.setMaxWordLength(key, value);
                    break;
                case 'solution_breadth':
                    this.setSolutionBreadth(key, value);
                    break;
                case 'puzzle_select':
                    this.setPuzzleSelect(key, value);
                    break;
                case 'dict_select':
                    this.setDictSelect(key, value);
                    break;
                case 'solution_path':
                    this.setSolutionPath(key, value);
                    break;
                default:
                    break;
            }
        }
        this.setBasePath(basePath);
        this.valid = true;
    }

    setBasePath(basePath) {
        if (typeof basePath !== 'string') { return false }
        config.base_path = basePath;
        return true;
    }

    setBoolean(key, value) {
        if (typeof value !== 'boolean') { return }
        this[key] = value;
    }
    setMinWordLength(key, value) {
        if (typeof value !== 'number') { return }
        if (value < 3 || value > this.max_word_length) { return }
        this[key] = value;
    }
    setMaxWordLength(key, value) {
        if (typeof value !== 'number') { return }
        if (value < 3 || value < this.min_word_length) { return }
        this[key] = value;
    }
    setSolutionBreadth(key, value) {
        if (typeof value !== 'number') { return }
        this[key] = value;
    }
    setPuzzleSelect(key, value) {
        if (typeof value !== 'number') { return }
        if (value < 0 || value >= getPuzzleCount()) { return }
        this[key] = value;
    }
    setDictSelect(key, value) {
        if (typeof value !== 'number') { return }
        if (value < 0 || value >= this.dict.length) { return }
        this[key] = value;
    }
    setSolutionPath(key, value) {
        if (typeof value !== 'string') { return }
        this[key] = value;
    }
    getDictPath() {
        return
    }
    isInvalid() {
        return !this.valid;
    }
}



/**
 * Sets the base path for this instance of the program
 * @param {string} basePath - the base path of the program
 * @returns true if the basePath string can be set, false otherwise
 */
function setBasePath(basePath) {
    if (typeof basePath !== 'string') { return false }
    config.base_path = basePath;
    return true;
}

/**
 * Returns the relative path to a dictionary file in the config or the default dictionary path.
 * @returns the relative path to a dictionary file or path to default dictionary
 */
function getDictPath() {
    if (config.dict_select < 0 || config.dict_select >= config.dict.length) {
        return config.dict[0].value // default dictionary
    }
    return config.dict[config.dict_select].value;
}

export { Config, config };