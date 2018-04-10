const express = require('express')
const router = express.Router()
const { user , log } = require('./controllers')

router
  .post('/u/login', user.login)
  .get('/log/list', log.lists)

router.get('/server', (req, res) => {
  res.json({
    code: 0
  })
})

module.exports = router

