function isValidNextWord(currentWord, nextWord, usedLetters, square) {
    const newUsedLetters = new Set(nextWord.split('').filter(letter => !usedLetters.has(letter)));
    if (newUsedLetters.size === 0) return false;

    const sides = getSides(square);
    let prevSide = null;

    for (let letter of nextWord) {
        for (let i = 0; i < 4; i++) {
            if (sides[i].includes(letter)) {
                if (prevSide !== null && prevSide === i) return false;
                prevSide = i;
                break;
            }
        }
    }

    return true;
}

function getSides(square) {
    return [
        [square[0], square[1], square[2]], // top
        [square[2], square[5], square[8]], // right
        [square[8], square[7], square[6]], // bottom
        [square[6], square[3], square[0]]  // left
    ];
}

function findWordSeries(square, wordList) {
    const letterToWords = {};
    wordList.forEach(word => {
        const firstLetter = word[0];
        if (!letterToWords[firstLetter]) {
            letterToWords[firstLetter] = [];
        }
        letterToWords[firstLetter].push(word);
    });

    let usedLetters = new Set();
    let series = [];

    function dfs(currentWord) {
        if (usedLetters.size === 9) {  // All letters are used
            return true;
        }

        const lastLetter = currentWord[currentWord.length - 1];
        const nextWords = letterToWords[lastLetter] || [];

        for (let nextWord of nextWords) {
            if (isValidNextWord(currentWord, nextWord, usedLetters, square)) {
                series.push(nextWord);
                const newUsedLetters = new Set(nextWord.split('').filter(letter => !usedLetters.has(letter)));
                newUsedLetters.forEach(letter => usedLetters.add(letter));

                if (dfs(nextWord)) {
                    return true;
                }

                // Backtrack
                series.pop();
                newUsedLetters.forEach(letter => usedLetters.delete(letter));
            }
        }

        return false;
    }

    for (let word of wordList) {
        if (new Set(word).size === word.length && word.split('').every(letter => square.includes(letter))) {
            series.push(word);
            word.split('').forEach(letter => usedLetters.add(letter));
            if (dfs(word)) {
                return series;
            }
            series.pop();
            word.split('').forEach(letter => usedLetters.delete(letter));
        }
    }

    return [];
}

// Example usage
const square = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
const wordList = ["ABC", "DEF", "GHI"];  // Add appropriate words here

const resultSeries = findWordSeries(square, wordList);
console.log(resultSeries);