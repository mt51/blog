const express = require('express');
const router = express.Router();

const CategoryModel = require('../model/category');
const ArticleModel = require('../model/article.js');
const mongo = require('../mongo/mongo.js');
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
      if (item.type) {
        tempData[item.type + 's'].push(item);
      }
    })
    res.status(200);
    res.json({
      code: 0,
      data: tempData
    })
  })
  .catch((e) => {
    res.status(500);
    res.json({
      code: 5,
      verror: {
        msg: 'Something error'
      }
    })
    throw new Error(e);
  })
})

router.post('/', jwt.checkAuth, checkUnique ,(req, res, next) => {
  const category = req.body;
  category.date = new Date().getTime();
  mongo.add(CategoryModel, category, res);
})

// router.put('/:id', jwt.checkAuth, (req, res, next) => {
//   const categoryData = req.body;
//   const categoryId = req.params.id;
//   mongo.update(CategoryModel, categoryId, categoryData, res);
// })

router.delete('/:id', jwt.checkAuth, (req, res, next) => {
  const categoryId = req.params.id;
  mongo.deleteById(CategoryModel, categoryId, res);
})


// 获取所有分类和分类对应的文章数
router.get('/info', (req, res, next) => {
  ArticleModel.getCategory()
    .then(async data => {
      let result = await getCategoryData(data);
      res.status(200);
      res.json({
      code: 1,
      data: result
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

// const getCategoryData = function (data) {
//   let promises = []
//   let tempData = []
//   data.forEach(item => {
//     const promise = ArticleModel.count({category: item.name}).then(count => {
//       tempData.push({
//         name: item.name,
//         count
//       });
//       return tempData;
//     })
//     promises.push(promise)
//   })
//   return promises;
// }

const getCategoryData = async function (data, res) {
  const getCount = function () {
    return new Promise(async (resolve, reject) => {
      let result = []
      for (let i = 0; i < data.length; i ++) {
        try {
          const count = await ArticleModel.count({category: data[i].name})
          result.push({
            name: data[i].name,
            count
          })
        } catch (e) {
          reject(e)
        }
      }
      resolve(result)
    })
  }
  try {
    const result = await getCount();
    return result
  } catch (e) {
    throw new Error(e)
  }
}

async function checkUnique (req, res, next) {
  const category = req.body;
  const name = category.name;
  const type = category.type;
  if (!type) {
    res.status(400)
    res.json({
      code: 4,
      verror: {
        msg: '参数错误'
      }
    })
  }
  const result = await CategoryModel.findOne({name, type})
  if (result) {
    res.status(400)
    res.json({
      code: 4,
      verror: {
        msg: '名称重复'
      }
    })
    return;
  }
  next();
}

module.exports = router;