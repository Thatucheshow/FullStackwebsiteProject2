const mongoose = require('mongoose')

const staffSchema = new mongoose.Schema({
  name: String,
  position: String,
  age: Number,
  yearsAtCompany: Number,
  hometown: String
})

const staffCollection = mongoose.model('Staff', staffSchema)

module.exports = staffCollection