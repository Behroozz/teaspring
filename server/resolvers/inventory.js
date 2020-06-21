const { get } = require('lodash')
const { inventory } = require('../mocks/mockData')
const Inventory = require('../database/models/inventory')

module.exports = {
  Query: {
    inventory: async (parent, _, { }) => {
      try {
        let dbInventory = await Inventory.find({})
        if (!dbInventory || dbInventory.length === 0) {
          dbInventory = await Inventory.insertMany(get(inventory, "inks"))
        }
        const response = {
          inks: dbInventory
        }

        return response
      } catch (ex) {
        console.log(ex)
        throw ex
      }
    }
  },
}
