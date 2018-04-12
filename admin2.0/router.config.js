const express = require('express')
const router = express.Router()
const { user , log, article, link } = require('./controllers')

router
  .post('/u/login', user.login)
  .get('/log/list', log.lists)

  // article
  .get('/article/list', article.lists)
  .post('/article/add', article.add)
  .get('/article/:id', article.detail)
  .put('article/:id', article.update)
  .delete('article/:id', article.deleteById)

  // link
  .get('/link/list', link.lists)
  .post('/link/add', link.add)
  .put('link/:id', link.update)
  .delete('link/:id', link.deleteById)

router.get('/server', (req, res) => {
  res.json({
    code: 0
  })
})

module.exports = router

