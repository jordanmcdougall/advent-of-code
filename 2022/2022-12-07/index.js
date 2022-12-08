// with help from https://www.youtube.com/watch?v=ZNLF2DavA6U&t=1259s
const fs = require('fs')

const lines = input = fs.readFileSync('input.txt', { 'encoding': 'utf8' }).replace(/\r/g, '').trim().split('\n')

const createTree = (lines) => {
    const tree = {
        name: '/',
        isDirectory: true,
        children: []
    }

    let currentNode = tree;
    let currentCommand = null

    for (const line of lines) {
        if (line[0] === '$') {
            const match = /^\$ (?<command>\w+)(?: (?<arg>.+))?$/.exec(line)
            currentCommand = match.groups.command

            if (currentCommand == 'cd') {
                const target = match.groups.arg
                switch (target) {
                    case '/':
                        currentNode = tree;
                        break;
                    case '..':
                        currentNode = currentNode.parent
                        break;
                    default:
                        currentNode = currentNode.children.find(
                            (folder) => folder.isDirectory && folder.name === target
                        );
                }
            }
        } else {
            // now a file from ls
            if (currentCommand === 'ls') {
                const fileMatch = /^(?<size>\d+) (?<name>.+)$/.exec(line)

                if (fileMatch) {
                    const node = {
                        name: fileMatch.groups.name,
                        size: parseInt(fileMatch.groups.size),
                        isDirectory: false,
                        parent: currentNode
                    }
                    currentNode.children.push(node)
                }
                const dirMatch = /^dir (?<name>.+)$/.exec(line)

                if (dirMatch) {
                    const node = {
                        name: dirMatch.groups.name,
                        isDirectory: true,
                        children: [],
                        parent: currentNode
                    }
                    currentNode.children.push(node)
                }

            }
        }

    }

    return tree
}

const getSize = (node, directoryCallback = () => { }) => {
    if (!node.isDirectory) {
        return node.size
    }

    const directorySize = node.children.map(child => getSize(child, directoryCallback)).reduce((a, b) => a + b, 0)

    directoryCallback(node.name, directorySize)

    return directorySize

}
const partOne = () => {
    const tree = createTree(lines)
  
    let sumSmallFolder = 0

    getSize(tree, (name, size) => {
        if (size < 100000) {
            sumSmallFolder += size
        }
    })

    console.log(sumSmallFolder);

}


const partTwo = () => {

    const totalDiskSpace = 70000000
    const requiredSpace = 30000000
    const tree = createTree(lines)

    usedSpace = getSize(tree)

    const availableSpace = totalDiskSpace - usedSpace
    if (availableSpace > requiredSpace) {
        throw new Error('There is already enough space')
    }
    const minimumFolderSize = requiredSpace - availableSpace
    const candidates = []

    getSize(tree, (name, size) => {
        if (size >= minimumFolderSize) {
            candidates.push({ name, size })
        }
    })

    candidates.sort((a, b) => a.size - b.size)
    console.log(candidates[0].size);

}

partOne()
partTwo()