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
  queryArticle(search, {size: size, page: page}, '-date', res);
})

/* 根据id获取文章 */
router.get('/:id', (req, res, next) => {
  const articleId = req.params.id;
  mongo.queryDetailById(ArticleModel, articleId, res);
})

/*发布新文章*/
router.post('/', jwt.checkAuth, (req, res, next) => {
  const articleData = req.body;
  articleData.date = new Date().getTime();
  articleData.author = "胖先森";
  mongo.add(ArticleModel, articleData, res);
})

/*更新文章*/
router.put('/:id', jwt.checkAuth, (req, res, next) => {
  const articleId = req.params.id;
  const articleData = req.body;
  mongo.update(ArticleModel, articleId, articleData, res);
})

/*删除文章*/
router.delete('/:id', (req, res, next) => {
  const articleId = req.params.id;
  mongo.deleteById(ArticleModel, articleId, res)
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
    throw new Error(e);
    res.status(500);
    res.json({
      code: 5,
      verror: {
        msg: 'Something error'
      }
    })
  }
}

module.exports = router;