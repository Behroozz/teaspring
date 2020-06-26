const Rainbow = require('rainbowvis.js')

const generateRandomInventory = (numberOfItems) => {
  let rainbow = new Rainbow()
  rainbow.setNumberRange(1, numberOfItems)
  rainbow.setSpectrum('blue', 'black')
  let result = []
  for (let i = 1; i <= numberOfItems; i++) {
    let hexColour = rainbow.colourAt(i)
    const obj = {
      "id": makeId(5),
      "color": '#' + hexColour,
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
  let rainbow = new Rainbow()
  rainbow.setNumberRange(1, numberOfQuestions * numberOfLayers)
  rainbow.setSpectrum('red', 'black')
  let result = {
    questions: []
  }
  for (let i = 1; i <= numberOfQuestions; i++) {
    const layers = { "layers": [] }
    for(let j=0; j< numberOfLayers; j++) {
      let hexColour = rainbow.colourAt(i)
      const obj = {
        "color": '#' + hexColour,
        "volume": (Math.random() * 20.00 + 1.00).toFixed(16)
      }
      layers.layers.push(obj)
    }
    result.questions.push(layers)
  }
  return result
}

// console.log(JSON.stringify(generateRandomInventory(100), null, 2))
// console.log(JSON.stringify(generateRandomQuestion(10, 10), null, 2))
