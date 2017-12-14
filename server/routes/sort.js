const express = require('express');
const router = express.Router();

const ArticleModel = require('../model/article');

/* 根据category获取文章列表 */

router.get('/:category', (req, res, next) => {
  const page = req.query.page || 1;
  const type = req.params.category
  queryArticleByCategory(page, type, res)
})

const queryArticleByCategory = async function (page, type, res) {
  console.log(type)
  try {
    const data = await ArticleModel.find({category: type, draft: false})
      .skip((page - 1) * 10)
      .limit(10)
      .sort('-date')
      .exec()
    res.status(200);
    res.json({
      code: 0,
      data
    })
  } catch (e) {
    res.status(500);
    res.json({
      code: 5,
      verror: {
        msg: 'Something error'
      }
    })
    throw new Error(e)
  }
}


module.exports = router;