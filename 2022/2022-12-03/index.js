const fs = require('fs')
const input = fs.readFileSync('input.txt', { 'encoding': 'utf8' }).split('\r\n')

// returns common elements in 2 given arrays
const findCommonElement = (arr1, arr2) => {
    return priorityCharacter = [...new Set(arr1.filter(item => {
        return arr2.includes(item)
    }))]
}

// returns the correct 'score' for a given character
const getScore = (char) => char.charCodeAt(0) > 97 ? char.charCodeAt(0) - 96 : char.charCodeAt(0) - 38

const partOne = (input) =>
    input.map(backpack =>
        getScore(findCommonElement(backpack.split('').slice(0, backpack.length / 2), 
        backpack.split('').slice(backpack.length / 2, backpack.length))[0])
    ).reduce((a, b) => a + b)

const partTwo = (input) => {
    const score = []
    for (i = 0; i <= input.length - 1; i += 3) {
        // find common elements between bags 1 & 2, then common elements with result and bag 3
        score.push(getScore(...findCommonElement(findCommonElement(input[i].split(''), 
        input[i + 1].split('')), input[i + 2].split(''))));
    }
    return score.reduce((a, b) => a + b)
}

console.log(partOne(input));
console.log(partTwo(input));