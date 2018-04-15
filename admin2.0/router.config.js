const express = require('express')
const router = express.Router()
const { user , log, article, link, category } = require('./controllers')

router
  .post('/u/login', user.login)
  .get('/log/list', log.lists)

  // article
  .get('/article/list', article.lists)
  .get('/article/query', article.query)
  .post('/article/add', article.add)
  .get('/article/:id', article.detail)
  .put('/article/:id', article.update)
  .delete('/article/:id', article.deleteById)

  // link
  .get('/link/list', link.lists)
  .post('/link/add', link.add)
  .put('link/:id', link.update)
  .delete('link/:id', link.deleteById)

  // category
  .get('/category/list', category.lists)
  .get('/category/count', category.count)
  .post('/category/add', category.add)
  .put('/category/:id', category.update)
  .delete('/category/:id', category.deleteById)

module.exports = router 

