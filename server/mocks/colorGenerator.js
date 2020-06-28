const Rainbow = require('rainbowvis.js')
const fs = require('fs')

const generateRandomColor = () => {
  let color = Math.floor((Math.random()*1000000)+1)
  let hexColor = "#" + ("000000" + color.toString(16)).slice(-6)
  return hexColor
}

const generateRandomInventory = (numberOfItems) => {
  // let rainbow = new Rainbow()
  // rainbow.setNumberRange(1, numberOfItems)
  // rainbow.setSpectrum('blue', 'black')
  let result = []
  for (let i = 1; i <= numberOfItems; i++) {
    // let hexColour = rainbow.colourAt(i)
    const obj = {
      "id": makeId(5),
      "color": generateRandomColor(),
      "cost": (Math.random() * 50.00 + 1.00).toFixed(2)
    }
    result.push(obj)
  }
  return result
}

function makeId(length) {
  var result = ""
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  var charactersLength = characters.length
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

const generateRandomQuestion = (numberOfQuestions, numberOfLayers) => {
  // let rainbow = new Rainbow()
  // rainbow.setNumberRange(1, numberOfQuestions * numberOfLayers)
  // rainbow.setSpectrum('red', 'black')
  let result = {
    questions: []
  }
  const allColors = []
  for (let i = 1; i <= numberOfQuestions; i++) {
    const layers = { "layers": [] }
    for(let j=0; j< numberOfLayers; j++) {
      // let hexColour = rainbow.colourAt(i)
      const color = generateRandomColor()
      allColors.push(JSON.stringify(color))
      const obj = {
        "color": color,
        "volume": (Math.random() * 20.00 + 1.00).toFixed(16)
      }
      layers.layers.push(obj)
    }
    result.questions.push(layers)
  }
  // console.log('allColors: ' , allColors)
  fs.writeFileSync('./sampleQuestionsIds.txt', allColors)
  fs.writeFileSync('./sampleQuestions.json', JSON.stringify(result, null, 2))
  return result
}

// console.log(JSON.stringify(generateRandomInventory(10000), null, 2))
// console.log(JSON.stringify(generateRandomQuestion(20, 10), null, 2))
