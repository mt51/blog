const express = require('express');
const router = express.Router();
const UserModel = require('../model/user.js');
const jwt = require('../util/auth.js')

/*登录*/
router.get('/', (req, res, next) => {
  const userInfo = {
    account: 'liuziyang',
    password: '123456'
  };
  UserModel
  .findOne()
  .then(user => {
    if (!user) {
      const newUser = new UserModel(userInfo);
      newUser
      .save()
      .then(() => {
        res.status(200);
        res.end();
      })
      .catch(e => {
        throw new Error(e);
        res.status(500);
        res.end();
      })
    }
  })
  .catch(e => {
    throw new Error(e);
    res.status(500);
    res.end()
  })
})

module.exports = router;
