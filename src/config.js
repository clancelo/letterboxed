/**
 * Configuration object governing the various parameters for the program.
 * 
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
    min_word_length: 3,
    max_word_length: 20,
    puzzle_select: 0,
    dict_select: 2,
    will_sort: true,
    base_path: '',
    set_base_path: setBasePath,
    dict_path: getDictPath,
    solution_path: './output/solutions.txt',
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
    ]
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

export { config };