const express = require('express');
const router = express.Router();

const CategoryModel = require('../model/category');

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

router.post('/', (req, res, next) => {
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

router.put('/:id', (req, res, next) => {
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

router.delete('/:id', (req, res, next) => {
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

module.exports = router;