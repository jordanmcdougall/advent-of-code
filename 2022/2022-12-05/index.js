const fs = require('fs')
let input = null

const arrangeCrates = (part, useSample=false) => {

let crates = []

if (useSample) {
    input = fs.readFileSync('input-sample.txt', { 'encoding': 'utf8' }).split('\r\n')
    crates = [['N', 'Z'], ['D', 'C', 'M'], ['P']]

} else {
    input = fs.readFileSync('input.txt', { 'encoding': 'utf8' }).split('\r\n')
    crates = [
        ['F', 'G', 'V', 'R', 'J', 'L', 'D'],
        ['S', 'J', 'H', 'V', 'B', 'M', 'P', 'T'],
        ['C', 'P', 'G', 'D', 'F', 'M', 'H', 'V'],
        ['Q', 'G', 'N', 'P', 'D', 'M'],
        ['F', 'N', 'H', 'L', 'J'],
        ['Z', 'T', 'G', 'D', 'Q', 'V', 'F', 'N'],
        ['L', 'B', 'D', 'F'],
        ['N', 'D', 'V', 'S', 'B', 'J', 'M'],
        ['D', 'L', 'G']]
}

    input.forEach(line => {

        let [count, from, to] = line.replace('move ', '').replace('from ', '').replace('to ', '').split(' ')

        if(part == 1) crates[to - 1].unshift(...crates[from - 1].splice(0, count).reverse())
        if(part == 2) crates[to - 1].unshift(...crates[from - 1].splice(0, count))

    })

    return crates.map(col => col[0]).join('');
}

console.log(arrangeCrates(1))
console.log(arrangeCrates(2))