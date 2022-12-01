const fs = require('fs')
const input = fs.readFileSync('./2022-12-01/input.txt', {'encoding': 'utf8'})

const elves = input.split('\r\n\r\n')

    const calories = elves.map(elf => 
        elf.split('\r\n').reduce((a,b) => 
            parseInt(a) + parseInt(b))).sort((a,b) => 
                parseInt(parseInt(b) - parseInt(a)))

const topElf = calories[0]

const topThreeElves = parseInt(calories[0]) + parseInt(calories[1])  + parseInt(calories[2]) 

console.log(topElf, topThreeElves);