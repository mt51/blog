const { Log } = require('../models')

module.exports = class LogProxy {

  static getIp (req) {
    const ipArr = req.headers['x-forwarded-for'] || req.connection.remoteAddress.split(':');
    return ipArr[ipArr.length - 1];
  }

  static save (account, ip) {
    const log = new Log()
    log.account = account
    log.ip = ip
    log.date = Date.now()

    return log.save()
  }

  static getLogList (size, page) {
    return Log.find()
      .skip((page - 1) * size)
      .limit(size)
      .sort('-date')
      .exec()
  }
}