const express = require('express');
const router = express.Router();

const ArticleModel = require('../model/article');

/* 获取文章列表 */
router.get('/', (req, res, next) => {
  const page = req.query.page || 1;
  const type  = req.query.type;
  let search = {
    draft: false
  };
  if (type === 'draft' ) {
    search.draft = true
  }
  ArticleModel
  .find(search)
  .skip((page - 1) * 10)
  .limit(10)
  .sort('-date')
  .exec()
  .then(data => {
    let tempData = JSON.parse(JSON.stringify(data))
    tempData.forEach((item) => {
      item.date = new Date(item.date).getTime();
      delete item.mdcont
    })
    ArticleModel.count().then((count) => {
      res.status(200);
      res.json({
        code: 0,
        data: tempData,
        total: count,
        page: page
      })
    })
    .catch((e) => {
      throw new Error(e);
    })
  })
  .catch(e => {
    throw new Error(e);
    res.status(500);
    res.json({
      code: 5,
      verror: {
        msg: 'Something error'
      }
    })
  })
})

router.get('/:id', (req, res, next) => {
  const articleId = req.params.id;
  ArticleModel
  .findOne({'_id': articleId})
  .then(data => {
    console.log('文章数据： ', data)
    if (!data) {
      res.status(400);
      res.json({
        code: 4,
        verror: {
          msg: '未查找到相关记录'
        }
      })
      return;
    }
    res.status(200);
    res.json({
      code: 0,
      data: data
    })
  })
  .catch(error => {
    throw new Error(error);
    res.status(500);
    res.json({
      code: 5,
      data: {
        msg: 'success'
      }
    })
  })
})

/*发布新文章*/
router.post('/', (req, res, next) => {
  const articleData = req.body;
  articleData.date = new Date().getTime();
  articleData.author = "刘子洋";
  const newArticle = new ArticleModel(articleData);
  newArticle.save().then(() =>{
    res.status(200);
    res.json({
      code: 0,
      msg: '保存成功'
    })
  }).catch(e => {
    throw new Error(e);
    res.status(500);
    res.json({
      code: 5,
      verror: {
        msg: 'Something error'
      }
    })
  })
})

/*更新文章*/
router.put('/:id', (req, res, next) => {
  const articleId = req.params.id;
  const articleData = req.body;
  ArticleModel
  .findOne({'_id': articleId})
  .then((article) => {
    if (!article) {
      res.status('400');
      res.json({
        code: 4,
        verror: {
          msg: '未查找到相关记录'
        }
      })
      return;
    }
    ArticleModel
    .update({'_id': articleId}, {$set: articleData})
    .then(() => {
      res.status(200);
      res.json({
        code: 0,
        data: {
          msg: 'success'
        }
      })
    })
    .catch(e => {
      throw new Error(e);
      res.status(500);
      res.json({
        code: 5,
        verror: {
          msg: 'Something error'
        }
      })
    })
  })
  .catch(e => {
    throw new Error(e);
    res.status(500);
    res.json({
      code: 5,
      verror: {
        msg: 'Something error'
      }
    })
  })
})

/*删除文章*/
router.delete('/:id', (req, res, next) => {
  const articleId = req.params.id;
  console.log(articleId)
  ArticleModel
  .findOne({'_id': articleId})
  .then((article) => {
    console.log(article)
    if (!article) {
      res.status('400');
      res.json({
        code: 4,
        verror: {
          msg: '未查找到相关记录'
        }
      })
      return;
    }
    ArticleModel
    .remove({'_id': articleId})
    .then(() => {
      res.status(200);
      res.json({
        code: 0,
        data: {
          msg: 'success'
        }
      })
    })
    .catch(e => {
      throw new Error(e);
      res.status(500);
      res.json({
        code: 5,
        verror: {
          msg: 'Something error'
        }
      })
    })
  })
})



module.exports = router;