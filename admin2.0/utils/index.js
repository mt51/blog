const bcrypt = require('bcryptjs')

module.exports = class BaseUtil {
  static bhash (str) {
    return bcrypt.hashSync(str, 8)
  }

  static bcomper (str, hash) {
    return bcrypt.compareSync(str, hash)
  }
}
