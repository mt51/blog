const express = require('express');
const router = express.Router();
const auth = require('../util/auth.js');

router.get('/', auth.checkAuth);

module.exports = router;