const mongoose = require('mongoose')
const config = require('config')

mongoose.Promise = global.Promise

mongoose.connect(config.get('db'), {
  poolSize: 20,
  user: 'blog',
  pass: 'blog123!@#*'
}, err => {
  if (err) {
    console.error('connect to %s error: ', config.get('db'), err.message)
    process.exit(1)
  }
})

module.exports = {
  User: require('./user'),
  Category: require('./category'),
  Links: require('./links'),
  Log: require('./log'),
  Article: require('./article')
}
