const express = require('express');
const router = express.Router();
const auth = require('../util/auth');
const LinksModel = require('../model/links.js');
const ORM = require('../mongo/mongo.js');

router.get('/' ,(req, res, next) => {
  ORM.query(LinksModel, res);
})

router.post('/', auth.checkAuth, (req, res, next) => {
  const links = req.body;
  links.date = new Date().getTime();
  const newLinks = new LinksModel(links);
  ORM.add(LinksModel, newLinks, res)
})

router.put('/:id', auth.checkAuth, (req, res, next) => {
  const links = req.body;
  const linkId = req.params.id;
  links.date = new Date().getTime();
  ORM.update(LinksModel, linkId, links, res)
})

router.delete('/:id', auth.checkAuth, (req, res, next) => {
  const linkId = req.params.id;
  ORM.deleteById(LinksModel, linkId, res);
})

module.exports = router
