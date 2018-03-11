const express = require('express');
const router = express.Router();

const ArticleModel = require('../model/article');
const jwt = require('../util/auth.js');
const mongo = require('../mongo/mongo.js');
/* 获取文章列表 */
router.get('/', (req, res, next) => {
  const page = req.query.page || 1;
  const size = parseInt(req.query.size || 10);
  const type  = req.query.type;
  let search = {
    draft: false
  };
  if (type === 'draft' ) {
    search.draft = true
  }
  queryArticle(search, {size: size, page: page}, 'category', res);
})

router.get('/:type', (req, res, next) => {
  const page = req.query.page || 1;
  const size = parseInt(req.query.size || 10);
  const type = req.params.type
  
  queryArticle({draft: false, category: type}, {size: size, page: page}, '-date', res);
})

const queryArticle = async function (search, params, sort, res) {
  const readData = function () {
    return ArticleModel
    .find(search)
    .skip((params.page - 1) * params.size)
    .limit(params.size)
    .sort(sort)
    .exec()
  }

  const getCount = function () {
    return ArticleModel.count()
  }

  try {
    let [data, count] = await Promise.all([readData(), getCount()])
    const tempData = JSON.parse(JSON.stringify(data))
    tempData.forEach((item) => {
      item.date = new Date(item.date).getTime();
      delete item.mdcont
      delete item.htmlcont
    })

    res.json({
      code: 0,
      data: tempData,
      total: count,
      page: params.page - 0
    })
  } catch (e) {
    res.status(500);
    res.json({
      code: 5,
      verror: {
        msg: 'Something error'
      }
    })
    throw new Error(e);
  }
}

module.exports = router;