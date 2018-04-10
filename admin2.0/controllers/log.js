const express = require('express')
const router = express.Router()
const baseUtil = require('../utils')
const { LogProxy } = require('../proxy')

module.exports = class LogController {
  static async lists (req, res, next) {
    const page = req.query.page || 1
    const size = req.query.size || 10
    const log = await LogProxy.getLogList(size, page)
    res.status(200)
    res.json({
      lists: log
    })
  }
}
