const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ArticleSchema = new Schema({
  title: String,
  mdcont: String,
  htmlcont: String,
  tag: String,
  category: String,
  date: Date,
  picurl: String,
  description: String,
  author: String,
  draft: Boolean
})

module.exports = mongoose.model('article', ArticleSchema);