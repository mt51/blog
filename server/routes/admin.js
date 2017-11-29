const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.sendfile('./views/admin/index.html')
})

module.exports = router;