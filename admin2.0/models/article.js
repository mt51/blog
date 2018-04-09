'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const schema = new Schema({
  title: String,
  mdcont: String,
  htmlcont: String,
  tags: String,
  category: String,
  date: Date,
  description: String,
  author: String,
  draft: Boolean,
  origin: String,
  bg: String
})

module.exports = mongoose.model('article', schema)
