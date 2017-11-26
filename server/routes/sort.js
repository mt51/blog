const express = require('express');
const router = express.Router();

const ArticleModel = require('../model/article');

/* 根据category获取文章列表 */

router.get('/:category', (req, res, next) => {
  const page = req.query.page || 1;
  const type = req.params.category
  ArticleModel.find({category: type, draft: false})
  .skip((page - 1) * 10)
  .limit(10)
  .sort('-date')
  .exec()
  .then(data => {
    ArticleModel.count({category: type, draft: false})
    .then(count =>{
      res.status(200);
      res.json({
        code: 0,
        data: data,
        page: page - 0,
        total: count
      })
    })
    .catch(e => {
      throw new Error(e)
      res.status(500)
      res.json({
        code: 5,
        verror: {
          msg: 'Something error'
        }
      })
    })
  })
  .catch(e => {
    throw new Error(e)
    res.status(500)
    res.json({
      code: 5,
      verror: {
        msg: 'Something error'
      }
    })
  })
})


module.exports = router;