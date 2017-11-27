const express = require('express');
const router = express.Router();

const CategoryModel = require('../model/category');
const ArticleModel = require('../model/article.js');
const jwt = require('../util/auth.js');

router.get('/', (req, res, next) => {
  const type = req.query.type;
  let search = {};
  if (type) {
    search.type = type;
  } else {
    search = {}
  }

  CategoryModel
  .find(search)
  .then((data) => {
    let tempData = {
      tags: [],
      categorys: []
    };
    data.forEach(item => {
      tempData[item.type + 's'].push(item);
    })
    res.status(200);
    res.json({
      code: 0,
      data: tempData
    })
  })
  .catch((e) => {
    throw new Error(e);
  })
})

router.post('/', jwt.checkAuth, (req, res, next) => {
  const category = req.body;
  category.date = new Date().getTime();
  CategoryModel.findOne({name: category.name, type: category.type})
  .then((data) => {
    if (data) {
      res.status(400);
      res.json({
        code: 1,
        verror: {
          msg: '名称重复' 
        }
      })
      return;
    }
    const newCategory = new CategoryModel(category);
    newCategory
    .save()
    .then(() => {
      res.status(200);
      res.json({
        code: 0,
        data:{
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
          msg: 'something wrong'
        }
      })
    })
  })
})

router.put('/:id', jwt.checkAuth, (req, res, next) => {
  const categoryData = req.body;
  const categoryId = req.params.id;
  CategoryModel
  .find({'_id': categoryId})
  .then((category) => {
    if (!category.length) {
      res.status(400);
      res.json({
        code: 4,
        verror: {
          msg: '没有相关记录'
        }
      })
      return;
    }
    console.log(categoryData)
    CategoryModel
    .update({'_id': categoryId}, {$set: categoryData})
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
        verror: 'Something error'
      })
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

router.delete('/:id', jwt.checkAuth, (req, res, next) => {
  const categoryId = req.params.id;
  CategoryModel
  .find({'_id': categoryId})
  .then(() => {
    CategoryModel
    .remove({'_id': categoryId})
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
      rs.status(500);
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

// 将文章进行分类

router.get('/info', (req, res, next) => {
  ArticleModel.getCategory()
   .then(data => {
    let promise = getCategoryData(data);
    Promise.all(promise)
    .then(result => {
      res.status(200)
      res.json({
        code: 0,
        data: result[0]
      })
    })
    .catch(error => {
      throw new Error(error)
      res.status(500)
      res.json({
        code: 5,
        verror: {
          msg: 'Something error'
        }
      })
     })
   })
   .catch(error => {
    throw new Error(error)
    res.status(500)
    res.json({
      code: 5,
      verror: {
        msg: 'Something error'
      }
    })
   })
})

function getCategoryData (data) {
  let promises = []
  let tempData = []
  data.forEach(item => {
    const promise = ArticleModel.count({category: item.name}).then(count => {
      tempData.push({
        name: item.name,
        count
      });
      return tempData;
    })
    promises.push(promise)
  })
  return promises;
}

module.exports = router;