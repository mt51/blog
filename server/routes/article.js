const express = require('express');
const router = express.Router();

const ArticleModel = require('../model/article');

/* 获取文章列表 */
router.get('/', (req, res, next) => {

})

/*发布新文章*/
router.post('/', (req, res, next) => {
  const articleData = req.body;
  console.log(articleData)
  articleData.date = new Date().getTime();
  articleData.author = "刘子洋";
  console.log(articleData)
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
      msg: 'Error'
    })
  })
})

/*更新文章*/
router.put('/:id', (req, res, next) => {

})

/*删除文章*/
router.delete('/:id', (req, res, next) => {

})



module.exports = router;