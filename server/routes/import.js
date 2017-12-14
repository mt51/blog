const fs = require('fs');
const express = require('express');
const multer = require('multer');

const router = express.Router();
const jwt = require('../util/auth.js');

const upload = multer({dest: 'uploads/'})
const marked = require('../util/marked.js');

const ArticleModel = require('../model/article.js');


router.post('/', upload.array('file'),  (req, res) => {
  const files = req.files;
  files.forEach(async item => {
    try {
      let data = await readFile(item.path)
      data = data.toString('utf8');
      const result = marked.splitMarkdown(data);
      result.htmlcont = marked.render(result.mdcont);
      result.draft = false
      await saveArticke(result);
      res.status(200);
      res.json({
        code: 0,
        data: {
          msg: '保存成功'
        }
      })
    } catch(err) {
      res.status(500);
      res.json({
        code: 5,
        verror: {
          msg: 'Something error'
        }
      })
      throw new Error(err);
    }
  })
})

const saveArticke = (article) => {
  const newArticle = new ArticleModel(article)
  return newArticle.save()
}

const readFile = path => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (error, data) => {
      if (error) {
        reject(error)
      } else {
        resolve(data)
      }
    })
  })
}
module.exports = router;