'use strict'

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const schema = new Schema({
  account: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  token: String,
  lastTime: Date,
  lastIp: String,
  avatar: String
})

module.exports = mongoose.model('user', schema);
