const express = require('express');
const router = express.Router();
const ArticleModel = require('../model/article');

router.get('/', (req, res) => {
  const keyword = req.query.keyword;
  var reg = new RegExp(`${keyword}`)
  ArticleModel.find({'title': reg})
})

module.exports = router;