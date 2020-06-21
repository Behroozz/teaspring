
const mongoose = require('mongoose')

module.exports.connection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    console.log('Database connected successfully')
  } catch (ex) {
    console.log('Database connected failed', ex)
  }
}

module.exports.isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id)
}