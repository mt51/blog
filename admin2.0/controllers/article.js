const { ArticleProxy } = require('../proxy')

module.exports = class ArticleController {
  static async lists(req, res, next) {
    const page = req.query.page || 1
    const size = req.query.size || 10
    const articleList = await ArticleProxy.getArticlesList(size, page)
    res.status(200)
    res.json({
      lists: articleList
    })
  }

  static async detail(req, res, next) {
    const articleId = req.params.id
    const artilceDetail = await ArticleProxy.getById(articleId)
    res.status(200)
    res.json({
      result: artilceDetail
    })
  }

  static async add (req, res, next) {
    const articleInfo = req.body
    articleInfo.date = Date.now()
    articleInfo.author = '胖先森'
    await ArticleProxy.newAndSave()
    res.status(200)
    res.end()
  }

  static async update (req, res, next) {
    const articleInfo = req.body
    const articleId = req.params.id
    const result = await Artilce.getById(articleId)
    if (result) {
      ArticleProxy.update(articleId, articleInfo)
    } else {
      res.status(400)
      res.json({ errMsg: '该文章不存在' })
    }
  }

  static async deleteById (req, res, next) {
    const articleId = req.params.id
    const result = ArticleProxy.getById(articleId)
    if (result) {
      await ArticleProxy.deleteById()
      res.status(200)
      res.json({
        result: '删除成功'
      })
    } else {
      res.status(400)
      res.json({ errMsg: '该文章不存在' })
    }
  }

  static async query (req, res, next) {
    const keyword = req.query.keyword
    const result = await ArticleProxy.query(keyword)
    res.status(200)
    res.json({
      result
    })
  }

}