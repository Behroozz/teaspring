
const { get } = require('lodash')
const { performance } = require('perf_hooks');
const cache = require('memory-cache')
const fs = require('fs');
const Inventory = require('../database/models/inventory')
const Question = require('../database/models/question')
const { kdTree } = require('../helpers/kdTree')
const { generateAnswers, getHeaders } = require('../helpers/ApiHelpers')
const { colorDistance3d, inventoryColorToHex, hexToRgbA, colorDistance2d } = require('../helpers/colorUtils')

module.exports = {
  Mutation: {
    calculateNearestColors: async (_, { color, volume, limit }) => {
      try {
        const targetColorRgbA = hexToRgbA(color)

        let CachedKdTree = cache.get('CachedKdTree')
        if (!CachedKdTree) {
          console.log('kdTree do not exist store in cache!')
          const inventory = await Inventory.find({})

          // let data = JSON.stringify(inventoryColorToHex(inventory))
          // fs.writeFileSync('mocks/inventory.json', data)
          // fs.writeFileSync('mocks/target.json', JSON.stringify({ ...targetColorRgbA, color }))

          const tree = new kdTree(inventoryColorToHex(inventory), colorDistance3d, ["red", "green", "blue"])
          cache.put('CachedKdTree', tree)
          CachedKdTree = cache.get('CachedKdTree')
        }
        const nearest = CachedKdTree.nearest(targetColorRgbA, limit)
        const sortedBaseOn3DDistance = nearest.sort(function (a, b) {
          return a.threeDDistance - b.threeDDistance
        });

        resultWithDistance = sortedBaseOn3DDistance.map(nearNode => {
          let selectedProps = {}
          selectedProps['red'] = get(nearNode, 'red')
          selectedProps['green'] = get(nearNode, 'green')
          selectedProps['blue'] = get(nearNode, 'blue')
          selectedProps['a'] = get(nearNode, 'a')
          selectedProps['id'] = get(nearNode, '_doc.id')
          selectedProps['color'] = get(nearNode, '_doc.color')
          selectedProps['cost'] = get(nearNode, '_doc.cost')
          selectedProps['volume'] = volume
          selectedProps['threeDDistance'] = get(nearNode, 'threeDDistance')
          selectedProps['twoDDistance'] = colorDistance2d(nearNode.arrayColor, targetColorRgbA.arrayColor)
          selectedProps['volumeCost'] = volume * get(nearNode, '_doc.cost')
          return selectedProps
        })
        return {
          nearest: resultWithDistance,
          kdTree: JSON.stringify(CachedKdTree)
        }
      } catch (ex) {
        console.log(ex)
        throw ex
      }
    },
    postAnswers: async (parent, { scenario_id, method = '3d', limit = 5 }, context, info) => {
      try {
        var t0 = performance.now()

        let CachedKdTree = cache.get('CachedKdTree')
        if (!CachedKdTree) {
          console.log('kdTree do not exist store in cache!')
          const inventory = await Inventory.find({})
          const tree = new kdTree(inventoryColorToHex(inventory), colorDistance3d, ["red", "green", "blue"])
          cache.put('CachedKdTree', tree)
          CachedKdTree = cache.get('CachedKdTree')
        }

        const question = await Question.findOne({ scenario_id: scenario_id })

        const questions = get(question, 'questions', [])
        const payload = generateAnswers(questions, scenario_id, limit, CachedKdTree, method)

        // const URI =  process.env.ANSWER_PRACTICE_ENDPOINT
        // const headers =  getHeaders(process.env.ANSWER_AUTH_TOKEN)
        // const answer = await axios.post(URI, payload, headers)
        // console.log('answer', answer)

        var t1 = performance.now()
        console.log("Call to get answer took " + (t1 - t0) + " milliseconds.")

        return payload
      } catch (ex) {
        console.log(ex)
        throw ex
      }
    }
  },
}
