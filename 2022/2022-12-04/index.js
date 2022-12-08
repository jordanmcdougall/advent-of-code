const fs = require('fs')
const input = fs.readFileSync('input.txt', { 'encoding': 'utf8' }).split('\r\n')


const partOne = () => input.map(pair => {
    let [first, second] = pair.split(',')

    if (Math.min(...first.split('-')) >= Math.min(...second.split('-')) && Math.max(...first.split('-')) <= Math.max(...second.split('-'))) {
        return 1
    }

    if (Math.min(...second.split('-')) >= Math.min(...first.split('-')) && Math.max(...second.split('-')) <= Math.max(...first.split('-'))) {
        return 1
    }


    return 0

}).reduce((a, b) => a + b)

const partTwo = () => input.map(pair => {
    let [first, second] = pair.split(',')



    let arr1 = first.split('-')
    let arr2 = second.split('-')

    arr1 = arr1.map(val => parseInt(val))
    arr2 = arr2.map(val => parseInt(val))


    if (arr2[0] >= arr1[0] && arr2[0] <= arr1[1]) return 1;
    if (arr2[1] >= arr1[0] && arr2[1] <= arr1[1]) return 1;
    if (arr1[0] >= arr2[0] && arr1[0] <= arr2[1]) return 1;
    if (arr1[1] >= arr2[0] && arr1[1] <= arr2[1]) return 1;
    return 0


}).reduce((a, b) => a + b)

console.log(partOne());
console.log(partTwo());