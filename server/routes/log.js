const express = require('express');
const router = express.Router();
const LogModel = require('../model/log.js');

router.get('/', (req, res, next) => {
  const page = req.query.page || 1;
  const size = 10;
  queryLogLists(page, size, res);
})

async function queryLogLists (page, size, res) {
  try {
    const data = await LogModel
      .find()
      .skip((page - 1) * SIZE)
      .limit(size)
      .sort('-date')
      .exec()
  res.status(200);
  res.json({
    code: 0,
    data
  })
  } catch (e) {
    res.status(500);
    res.json({
      code: 5,
      verror: {
        msg: 'Something error'
      }
    })
    throw new Error(e)
  }
}

module.exports = router;