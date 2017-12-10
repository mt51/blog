const express = require('express');
const router = express.Router();
const auth = require('../util/auth');
const LinksModel = require('../model/links.js');

router.get('/' ,(req, res, next) => {
  LinksModel
  .find()
  .then(data => {
    res.json({
      code: 0,
      data
    })
  })
  .catch(error => {
    throw new Error(error)
    res.status(500);
    res.json({
      code: 5,
      verror: {
        msg: 'Something error'
      }
    })
  })
})

router.post('/', auth.checkAuth, (req, res, next) => {
  const links = req.body;
  links.date = new Date().getTime();
  const newLinks = new LinksModel(links);
  newLinks
    .save()
    .then(data => {
      res.status(200)
      res.json({
        code: 0,
        data: {
          msg: '保存成功'
        }
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

router.put('/:id', auth.checkAuth, (req, res, next) => {
  const links = req.body;
  const linkId = req.params.id;
  links.date = new Date().getTime();
  LinksModel
    .findOne({'_id': linkId})
    .then(link => {
      if (!link) {
        res.status(400)
        res.json({
          code: 4,
          verror: {
            msg: '没有相关记录'
          }
        })
        return;
      }
      LinksModel
        .update({'_id': linkId}, {$set: links})
        .then(() => {
          res.json({
            code: 0,
            data: {
              msg: 'success'
            }
          })
        })
        .catch(error => {
          throw new Error(error)
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

router.delete('/:id', auth.checkAuth, (req, res, next) => {
  const linkId = req.params.id;
  LinksModel
    .findOne({'_id': linkId})
    .then(link => {
      if (!link) {
        res.status(400);
        res.json({
          code:4,
          verror: {
            msg: '未查到相关记录'
          }
        });
        return;
      }
      LinksModel
        .remove({'_id': linkId})
        .then(() => {
          res.json({
            code: 0,
            data: {
              msg: 'success'
            }
          })
        })
        .catch(error => {
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

module.exports = router
