const fs = require('fs')
const sharp = require('sharp')

const baseImage = 'img/wolvesit.jpeg'
const fileMap = { 'base': [baseImage] }

function addToMap(path) {
    fileMap[path] = []
    for (const file of fs.readdirSync(`img/${path}`))
    {
        fileMap[path].push(`img/${path}/${file}`)
    }
}

function randomize() {
    const randomizedFiles = {}
    for (const [key, fileNames] of Object.entries(fileMap)) {
        randomizedFiles[key] = fileNames[Math.floor(Math.random()*fileNames.length)]
    }
    return randomizedFiles
}

function composeAndSave(randomizedFiles, outputPath) {
    var compositeImages = []
    for (const [key, file] of Object.entries(randomizedFiles)) {
        if (key == 'base') {
            continue
        }

        compositeImages.push({input: file})
    }
    var baseImage = sharp(randomizedFiles['base'])
        .composite(compositeImages)
        .toFile(outputPath)
}

var numImages = 5
if (process.argv.length > 2)
{
    // node index.js 10 will make 10 images. if you don't specify, it makes 5.
    numImages = process.argv[2]
}

// add more calls to addToMap for each trait folder
addToMap('eyes')
addToMap('hat')

// uncomment this if you think the files aren't being detected
// console.log('found files:')
// console.log(fileMap)


if (!fs.existsSync('output')) {
    fs.mkdirSync('output')
} else {
    for (const file of fs.readdirSync('output'))
    {
        fs.unlinkSync(`output/${file}`)
    }
}

for (var i = 0; i < numImages; i++)
{
    composeAndSave(randomize(), `output/test${i+1}.jpg`)
}