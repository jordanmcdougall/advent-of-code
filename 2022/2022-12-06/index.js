const fs = require('fs')
input = fs.readFileSync('input.txt', { 'encoding': 'utf8' })

const findStartOfMessage = (length) => {

    for (i = 0; i < input.length - length - 1; i++) {

        let chunk = []
        for (j = 0; j <= length - 1; j++) {
            chunk.push(input[i + j])
        }

        let isRepeated = chunk.map((letter, idx) => {
            return chunk.indexOf(letter) === idx ? true : false
        }).includes(false)

        if (!isRepeated) {
            return i + length
        }

    }
}

console.log(findStartOfMessage(4));
console.log(findStartOfMessage(14));