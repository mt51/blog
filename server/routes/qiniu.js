const express = require('express');
const router = express.Router();
const config = require('../config.js');
const qiniu = require('qiniu');

const mac = new qiniu.auth.digest.Mac(config.AK, config.SK);

/*换取七牛云token*/
router.get('/token', (req, res, next) => {
  const key = 'avatar';
  const options = {
    scope: 'blog',
    returnBody: '{"key": "$(key)","hash": "${etag}"}',
    persistentOps: 'imageMogr2/format/webp|saveas/' + new Buffer('lzy1043:' + key).toString('base64')
  }
  const putPolicy = new qiniu.rs.PutPolicy(options);
  const uploadToken=putPolicy.uploadToken(mac);
  res.json({
    code: 0,
    data: {
      token: uploadToken,
      key
    }
  })
})

module.exports = router;