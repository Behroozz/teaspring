const mongoose = require('mongoose')

const answerSchema = new mongoose.Schema({
  scenario_id: {
    type: String,
    required: true
  },
  answers: [
    {
      inks: [String]
    }
  ]
}, {
    timestamps: true
  })

module.exports = mongoose.model('Answer', answerSchema)
