const mongoose = require('mongoose');
const Category = require('./category.js');
const Schema = mongoose.Schema;
const ArticleSchema = new Schema({
  title: String,
  mdcont: String,
  htmlcont: String,
  tags: String,
  category: String,
  date: Date,
  picurl: String,
  description: String,
  author: String,
  draft: Boolean,
  origin: String
})

ArticleSchema.statics = {
  getCategory () {
    return Category.find({type: 'category'}, 'name').exec();
  }
}

module.exports = mongoose.model('article', ArticleSchema);