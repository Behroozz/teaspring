const mongoose = require('mongoose')

const inventorySchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  cost: {
    type: Number,
    required: true
  }
}, {
    timestamps: true
  })

module.exports = mongoose.model('Inventory', inventorySchema)
