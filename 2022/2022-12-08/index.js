const fs = require('fs')
const input = fs.readFileSync('input.txt', { 'encoding': 'utf8' }).split('\r\n').map(line => line.split(''))



const isVisible = (currentTree, otherTrees) => {
    // is the current tree taller than the tallest in a given line
    return currentTree > Math.max(...otherTrees)
}


const checkAfterRow = (currentRow, currentCol) => {
    let otherTrees = []

    for (let i = currentCol; i < input[currentRow].length - 1; i++) {
        otherTrees.push(input[currentRow][i + 1])
    }

    // return number of trees to right
    return otherTrees
}


const checkAfterCol = (currentRow, currentCol) => {

    let otherTrees = []

    for (let i = currentRow + 1; i <= input.length - 1; i++) {
        otherTrees.push(input[i][currentCol])
    }

    // return number of trees below
    return otherTrees
}


const checkBeforeRow = (currentRow, currentCol) => {

    let otherTrees = []

    for (let i = currentCol; i >= 1; i--) {
        otherTrees.push(input[currentRow][i - 1])
    }

    // return number of trees to left
    return otherTrees
}


const checkBeforeCol = (currentRow, currentCol) => {

    let otherTrees = []

    for (let i = currentRow; i >= 1; i--) {
        otherTrees.push(input[currentRow - i][currentCol])
    }

    // return number of trees above
    return otherTrees
}


const partOne = () => {

    // counter to track how many trees are visible
    let counter = 0

    // loop through every tree
    for (let i = 0; i <= input.length - 1; i++) {
        for (let j = 0; j <= input.length - 1; j++) {
            // if the tree is at the edge add one to counter
            if (i == 0 || j == 0 || i == input.length - 1 || j == input.length - 1) {
                counter += 1
            } else {
                let currentTree = input[i][j]
                // if the tree is visible in any direction...
                if (isVisible(input[i][j], checkBeforeRow(i, j)) || isVisible(currentTree, checkAfterRow(i, j)) || isVisible(currentTree, checkBeforeCol(i, j)) || isVisible(currentTree, checkAfterCol(i, j))) {
                    //...add one to the counter
                    counter += 1
                } else {
                }
            }
        }
    }

    return counter

}

const getScenicScore = (currentTree, input) => {
    let counter = 0
    // if an edge; return 0
    if (input.length == 0) return 0

    for (const tree of input) {
        //if tree is same size
        if (currentTree <= tree) return counter += 1

        // if tree is bigger than tree
        if (currentTree > tree) {
            counter += 1
        }
    }

    return counter
}



const partTwo = () => {

    let scenicScore = 0

    for (let i = 0; i <= input.length - 1; i++) {
        for (let j = 0; j <= input.length - 1; j++) {

            let left = checkBeforeRow(i, j)
            let right = checkAfterRow(i, j)
            let top = checkBeforeCol(i, j)
            let bottom = checkAfterCol(i, j)


            let score = [left, right, top.reverse(), bottom].map(line => {
                return getScenicScore(input[i][j], line)
            })

            if (score.reduce((a, b) => a * b) > scenicScore) scenicScore = score.reduce((a, b) => a * b)
        }

    }

    return scenicScore
}


console.log(partOne());
console.log(partTwo());



