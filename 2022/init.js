const fs = require('fs')

const folderName = new Date().toISOString().split('T')[0]

if(fs.existsSync(folderName)){
    console.log(`Folder already exists for ${folderName}`)
    return
}

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('What is the title of this challenge?\n\n', title => {
        
        fs.mkdirSync(folderName, 0744)
        
        fs.writeFileSync(`${folderName}/README.md`, `# ${title}\n\n## ${new Date().toDateString()}\n\n# Part One\n\n# Part Two\n`)
        fs.writeFileSync(`${folderName}/index.js`, ``)
        fs.writeFileSync(`${folderName}/input.txt`, ``)
        fs.writeFileSync(`${folderName}/input-sample.txt`, ``)

    rl.close()
})

