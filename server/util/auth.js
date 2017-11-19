const jwt = require('jsonwebtoken');
const config = require('../config');
const UserModel = require('../model/user.js');

const generateToken = data => {
  return jwt.sign(data, config.secret, { expiresIn: '1h' });
}

const checkAuth = (req, res, next) => {
  const token = req.headers.token;
  console.log(token)
  if (!token) {
    res.status(401);
    return res.json({
      code: 4,
      verror: '请先登录'
    })
  }
  jwt.verify(token, config.secret, (err, decode) => {
    if (err) {
      res.status(401);
      return res.json({
        code: 4,
        verror: '请先登录'
      })
    }
    UserModel
    .findOne({token: token})
    .then(user => {
      if (!user) {
        res.status(401);
        return res.json({
          code: 4,
          verror: '请先登录'
        })
      }
      next()
    })
    .catch(err => {
      throw new Error(e)
      res.json({
        code: 5,
        verror: {
          msg: 'Something error'
        }
      })
    })
  })
}

module.exports = {
  generateToken,
  checkAuth
}
