const express = require('express');
const router = express.Router();

const signin = require('./signin.js');
const signout = require('./signout.js');
const article = require('./article.js');
const qiniu = require('./qiniu.js');
const category = require('./category.js')

router.use('/signin', signin);
router.use('/article', article);
router.use('/signout', signout);
router.use('/qiniu', qiniu);
router.use('/category', category);

module.exports = router;
