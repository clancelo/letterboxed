// Configuration object
const config = {
    min_word_length: 3,
    max_word_length: 20,
    puzzle_index: 0,
    will_sort: true,
    base_path: '',
    set_base_path: setBasePath, // set when program launches
    dict_path: getDictPath, // dictated by dict_select
    solution_path: './output/solutions.txt',
    dict_select: '2',
    dict: [
        {
            name: "default",
            value: './dictionaries/oxford.txt'
        },
        {
            name: "ox",
            value: './dictionaries/oxford.txt'
        },
        {
            name: "az",
            value: './dictionaries/az.txt'
        }
    ]
}

/**
 * Sets the base path for this instance of the program
 * @param {string} basePath - the base path of the program
 */
function setBasePath(basePath) {
    if (typeof basePath !== 'string') { return false }
    config.base_path = basePath;
    return true;
}

/**
 * Returns the relative path to a dictionary file in the config or the default dictionary path.
 * @returns the relative path to a dictionary file
 */
function getDictPath() {
    if (config.dict_select < 0 || config.dict_select >= config.dict.length) {
        return config.dict[0].value
    }
    return config.dict[config.dict_select].value;
}

export { config };