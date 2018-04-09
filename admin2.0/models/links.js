'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const schema = new Schema({
  title: String,
  descp: String,
  link: String,
  avatar: String
})

module.exports = mongoose.model('link', schema)
