const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
  scenario_id: {
    type: String,
    required: true
  },
  questions: [
    {
      layers: [
        {
          color: {
            type: String,
            required: true
          },
          volume: {
            type: String,
            required: true
          },
        }
      ]
    }
  ]
}, {
    timestamps: true
  })

module.exports = mongoose.model('Question', questionSchema)
