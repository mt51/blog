const express = require('express');
const router = express.Router();
const LogModel = require('../model/log.js');

router.get('/', (req, res, next) => {
  const page = req.query.page || 1;
  const SIZE = 10;
  LogModel
  .find()
  .skip((page - 1) * SIZE)
  .limit(SIZE)
  .sort('-date')
  .exec()
  .then(data => {
    LogModel
    .count()
    .then(count => {
      res.status(200);
      res.json({
        code: 0,
        data: data,
        total: count,
        page: page
      });
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

module.exports = router;