const cache = require('memory-cache')
const { get } = require('lodash')
const Inventory = require('../database/models/inventory')
const { kdTree } = require('../helpers/kdTree')
const { colorDistance3d, inventoryColorToHex, hexToRgbA, colorDistance2d } = require('../helpers/colorUtils')

module.exports.batchedColorFetching = async (colors) => {
  return new Promise(async (resolve, reject) => {
    const foundColors = []
    for (const color of colors) {
      try {
        const targetColorRgbA = hexToRgbA(color)

        let CachedKdTree = cache.get('CachedKdTree')
        if (!CachedKdTree) {
          console.log('kdTree do not exist store in cache!')
          const inventory = await Inventory.find({})

          const tree = new kdTree(inventoryColorToHex(inventory), colorDistance3d, ["red", "green", "blue"])
          cache.put('CachedKdTree', tree)
          CachedKdTree = cache.get('CachedKdTree')
        }
        const nearest = CachedKdTree.nearest(targetColorRgbA, 5)
        const sortedBaseOn3DDistance = nearest.sort(function (a, b) {
          return a.threeDDistance - b.threeDDistance
        })

        resultWithDistance = sortedBaseOn3DDistance.map(nearNode => {
          let selectedProps = {}
          selectedProps['red'] = get(nearNode, 'red')
          selectedProps['green'] = get(nearNode, 'green')
          selectedProps['blue'] = get(nearNode, 'blue')
          selectedProps['a'] = get(nearNode, 'a')
          selectedProps['id'] = get(nearNode, '_doc.id')
          selectedProps['color'] = get(nearNode, '_doc.color')
          selectedProps['cost'] = get(nearNode, '_doc.cost')
          // selectedProps['volume'] = volume
          selectedProps['threeDDistance'] = get(nearNode, 'threeDDistance')
          selectedProps['twoDDistance'] = colorDistance2d(nearNode.arrayColor, targetColorRgbA.arrayColor)
          // selectedProps['volumeCost'] = volume * get(nearNode, '_doc.cost')
          return selectedProps
        })
        foundColors.push(
          {
            questionColor: color,
            closestInventoryColorId: resultWithDistance[0].id,
            inventoryColorCost: resultWithDistance[0].cost
          }
        )
      } catch (ex) {
        console.log(ex)
        throw ex
      }
    }
    resolve(foundColors)
  })
}