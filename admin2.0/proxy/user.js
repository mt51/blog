const { User } = require('../models')

module.exports = class UserProxy {
  static getByAccount (account) {
    return User.findOne({account: account})
  }

  static updateToken (user) {
    return User.update({
      accoutn: user.account
    }, {
      $set: {
        token: user.token
      }
    })
  }
}