const express = require('express');
const router = express.Router();
const UserModel = require('../model/user.js');
const jwt = require('../util/auth.js')

/*登录*/
router.get('/', async (req, res, next) => {
  const userInfo = {
    account: 'liuziyang',
    password: '123456'
  };
  try {
    const user =  UserModel.findOne();
    if (!user) {
      const newUser = new UserModel(userInfo);
      await newUser.save()
      res.status(200);
      res.end();
    }
  } catch (e) {
    res.status(200);
    res.end();
  }
})

module.exports = router;
