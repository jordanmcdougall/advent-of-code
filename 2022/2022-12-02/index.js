const fs = require('fs')
const input = fs.readFileSync('input.txt', { 'encoding': 'utf8' }).split('\r\n')

const obj = {
    "X": {
        1: {
            "A": 3,
            "B": 0,
            "C": 6,
            "S": 1
        },
        2: {
            "A": 3,
            "B": 1,
            "C": 2,
            "S": 0
        }
    },
    "Y": {
        1: {
            "A": 6,
            "B": 3,
            "C": 0,
            "S": 2
        },
        2: {
            "A": 1,
            "B": 2,
            "C": 3,
            "S": 3
        }
    },
    "Z": {
        1: {
            "A": 0,
            "B": 6,
            "C": 3,
            "S": 3
        },
        2: {
            "A": 2,
            "B": 3,
            "C": 1,
            "S": 6
        }
    }
}

const getScore = (input, part) => {
    const score = input.map(round => {
        let [opponent, response] = round.split(' ')
        return obj[response][part][opponent] + obj[response][part]["S"];
    }).reduce((a, b) => a + b)

    return score
}

console.log(getScore(input, 1))
console.log(getScore(input, 2))
