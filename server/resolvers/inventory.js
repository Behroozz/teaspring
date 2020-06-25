const { get } = require('lodash')
const axios = require('axios')
const Inventory = require('../database/models/inventory')
const { getHeaders } = require('../helpers/ApiHelpers')

module.exports = {
  Query: {
    inventory: async (parent, _, { }) => {
      try {
        const URI =  process.env.INVENTORY_ENDPOINT_TEMP
        const headers =  getHeaders(process.env.INVENTORY_AUTH_TOKEN)
        const inventory = await axios.get(URI, headers)
        let dbInventory = await Inventory.find({})
        if (!dbInventory || dbInventory.length === 0) {
          dbInventory = await Inventory.insertMany(get(inventory, "data.inks"))
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
