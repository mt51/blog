const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const LogSchema = new Schema({
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

module.exports = mongoose.model('log', LogSchema);