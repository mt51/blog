const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const baseUtil = require('../utils')
const config = require('config')
const jwtSecret = config.get('jwt.secret')
const jwtExpire = config.get('jwt.expire')
const { UserProxy, LogProxy } = require('../proxy')

module.exports = class UserController {
  static async login (req, res, next) {
    const userInfo = req.body
    const account = userInfo.account
    const password = userInfo.password

    if (!userInfo || !account) {
      res.status(400)
      return res.json({errMsg: '用户名不能为空'})
    }

    if (!userInfo || !password) {
      res.status(400)
      return res.json({errMsg: '密码不能为空'})
    }

    const user = await UserProxy.getByAccount(account)

    if (!user) {
      res.status(400)
      return res.json({errMsg: '用户名或密码错误'})
    }

    const verifyPassword = baseUtil.bcomper(password, user.password)

    if (!verifyPassword) {
      res.status(400)
      return res.json({errMsg: '用户名或密码错误'})
    }

    user.token = jwt.sign({account: user.account}, jwtSecret, {expiresIn: jwtExpire})
    await UserProxy.updateToken(user)

    const ip = LogProxy.getIp(req)
    await LogProxy.save(user.account, ip)
    
    res.status(200)
    res.json({
      token: user.token
    })
  }
}
