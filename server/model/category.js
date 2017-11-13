const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CategorSchema = new Schema({
  name: String,
  type: String,
  description: String,
  date: Date
})

module.exports = mongoose.model('category', CategorSchema);