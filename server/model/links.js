const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const LinksSchema = new Schema({
  title: String,
  descp: String,
  link: String,
  avatar: String
})

module.exports = mongoose.model('link', LinksSchema);