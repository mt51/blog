const fs = require('fs');
const express = require('express');
const multer = require('multer');

const router = express.Router();
const jwt = require('../util/auth.js');

const upload = multer({dest: 'uploads/'})
const marked = require('../util/marked.js');


router.post('/', upload.array('file'),  (req, res) => {
  const files = req.files;
  files.forEach(item => {
    // fs.renameSync(item.path, 'uploads/' + item.originalname);
    readFile(item.path)
    .then((data) => {
      const markdown = marked(data)
      console.log(markdown)
    })
    .catch(err => {
      throw new Error(err);
    })
  })
})


const readFile = path => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (data, error) => {
      if (error) {
        return reject(error)
      }
      resolve(data)
    })
  })
}
module.exports = router;