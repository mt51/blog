const express = require('express');
const router = express.Router();

const signin = require('./signin.js');
const signout = require('./signout.js');
const signup = require('./signup.js');
const article = require('./article.js');
const qiniu = require('./qiniu.js');
const category = require('./category.js');
const user = require('./user.js');
const log = require('./log.js');
const impor = require('./import.js');

router.use('/signin', signin);
router.use('/article', article);
// router.use('/signout', signout);
router.use('/signup', signup);
router.use('/qiniu', qiniu);
router.use('/category', category);
router.use('/user', user);
router.use('/log', log);
router.use('/import', impor);

module.exports = router;
