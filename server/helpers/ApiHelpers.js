const { get, head } = require('lodash')
const { performance } = require('perf_hooks');
const { hexToRgbA, colorDistance2d } = require('./ColorUtils')

const getHeaders = (authToken) => {
  return {
    headers: {
      "Auth-Token": authToken,
      "Content-Type": "application/json"
    }
  }
}

const generateAnswers = (questions, scenario_id, limit, CachedKdTree, method) => {
  const finalAnswer = {
    scenario_id: scenario_id,
    answers: []
  }

  questions.forEach(question => {
    const layers = get(question, 'layers', [])
    const answer = { inks: [] }
    layers.forEach((layer, index) => {
      const targetColor = hexToRgbA(get(layer, 'color'))
      const volume = get(layer, 'volume')

      // console.log(`Layer ${index}--start-----------------------------------`)
      const laterAnswer = getLayerAnswer(targetColor, volume, CachedKdTree, limit, method)
      answer.inks.push(laterAnswer)
      // console.log(`Layer ${index}--end-------------------------------------`)
    })
    finalAnswer.answers.push(answer)
  })
  return finalAnswer
}

const getLayerAnswer = (targetColor, volume, CachedKdTree, limit, method) => {
  // Get the nearest neighbors of the target color  
  const nearest = CachedKdTree.nearest(targetColor, limit)
  const sortedBaseDistance = nearest.sort(function (a, b) {
    return a.threeDDistance - b.threeDDistance
  })
  // Map the nearest neighbors to set of required response attributes  
  const resultWithDistance = sortedBaseDistance.map(nearNode => {
    let selectedProps = {}
    selectedProps['id'] = get(nearNode, '_doc.id')
    selectedProps['color'] = get(nearNode, '_doc.color')
    selectedProps['cost'] = get(nearNode, '_doc.cost')
    selectedProps['volume'] = volume
    selectedProps['threeDDistance'] = get(nearNode, 'threeDDistance')
    selectedProps['twoDDistance'] = colorDistance2d(nearNode.arrayColor, targetColor.arrayColor)
    selectedProps['volumeCost'] = volume * get(nearNode, '_doc.cost')
    return selectedProps
  })

  // Filter the nearest neighbors base on acceptable threshold 
  const threshold = method === '3d' ? process.env.THREE_D_COLOR_DIFF_THRESHOLD : process.env.TWO_D_COLOR_DIFF_THRESHOLD
  const thresholdList = resultWithDistance.filter(item => {
    if (method === '3d') {
      return item.threeDDistance < threshold
    } else {
      return item.twoDDistance < threshold
    }
  })

  let layerChoice = {}
  // If every neighbor is above threshold, grab the nearest item, otherwise the least volume cost
  if (thresholdList.length === 0) {
    layerChoice = head(resultWithDistance.sort((a, b) =>
      method === '3d' ? a.threeDDistance - b.threeDDistance : a.twoDDistance - b.twoDDistance
    ))
  } else {
    layerChoice = head(thresholdList.sort((a, b) =>
      a.volumeCost - b.volumeCost
    ))
  }
  // return the id of the selected color
  return get(layerChoice, 'id')
}

module.exports = {
  getHeaders,
  generateAnswers
}
