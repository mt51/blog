'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const schema = new Schema({
  account: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  ip: {
    type: String,
    required: true
  },
  location: String
})

module.exports = mongoose.model('log', schema)
