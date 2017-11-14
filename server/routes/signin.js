const express = require('express');
const router = express.Router();
const UserModel = require('../model/user.js');
const jwt = require('../util/auth.js')

/*登录*/
router.post('/', (req, res, next) => {
  const userInfo = req.body;
  if (!userInfo.account) {
    res.status(400);
    return res.json({
      code: 4,
      verror: {
        msg: '用户名不能为空'
      }
    })
  }

  if (!userInfo.password) {
    res.status(400);
    return res.json({
      code: 4,
      verror: {
        msg: '密码不能为空'
      }
    })
  }

  UserModel
  .findOne({account:userInfo.account})
  .then(user => {
    if (!user) {
      res.status(400);
      return res.json({
        code: 4,
        verror: {
          msg: '用户名不存在'
        }
      })
    }
    user.comparePassword(userInfo.password)
    .then(isMatch => {
      if (!isMatch) {
        res.status(400);
        return res.json({
          code: 4,
          verror: {
            msg: '用户名密码不匹配'
          }
        })
      }
      delete userInfo.password
      const token = jwt.generateToken(userInfo);
      UserModel
      .update({account: user.account}, {$set: {token: token}})
      .then(() => {
        res.status(200);
        res.json({
          code: 0,
          data: {
            token: token
          }
        })
      })
      .catch(err => {
        throw new Error(err);
        res.json({
          code: 5,
          verror: {
            msg: 'Something error'
          }
        })
      })
    })
    .catch(err => {
      throw new Error(err);
      res.status(500);
      res.json({
        code: 5,
        verror: {
          msg: 'Something error'
        }
      })
    })
  })
  .catch(err => {
    throw new Error(err);
    res.status(500);
    res.json({
      code: 5,
      verror: {
        msg: 'Something error'
      }
    })
  })
})

module.exports = router;
