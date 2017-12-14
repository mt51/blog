const express = require('express');
const router = express.Router();
const UserModel = require('../model/user.js');
const jwt = require('../util/auth.js')
const LogModel = require('../model/log.js');

/*登录*/
router.post('/',  async (req, res, next) => {
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

  try {
    const user = await UserModel.findOne({account:userInfo.account})
    if (!user) {
      res.status(400);
      return res.json({
        code: 4,
        verror: {
          msg: '用户名不存在'
        }
      })
    }
    const isMatch = await user.comparePassword(userInfo.password)
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
    await UserModel.update({account: user.account}, {$set: {token: token}});

    saveLog(req, user.account);
    res.status(200);
    res.json({
      code: 0,
      data: {
        token: token
      }
    })

  } catch (e) {
    res.status(500);
    res.json({
      code: 5,
      verror: {
        msg: 'Something error'
      }
    })
    throw new Error(err);
  }
})

const saveLog = async (req, account) => {
  const ip = getIp(req);
  let log = {
    account: account,
    date: new Date().getTime(),
    ip: ip
  }
  const newLog = new LogModel(log);
  try {
    await newLog.save()
    const log = await LogModel
      .findOne({account: account})
      .skip(1)
      .sort('-date')
      .exec()
    if (log) {
      UserModel.update({account: account}, {$set: {lastTime: log.date, lastIp: log.ip}})
    }
  } catch (e) {
    throw new Error(e);
  }
}

const queryByKey = async params => UserModel.findOne(params)

const getIp = req => {
  const ipArr = req.headers['x-forwarded-for'] || req.connection.remoteAddress.split(':');
  return ipArr[ipArr.length - 1];
}
module.exports = router;
