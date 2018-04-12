const { Article } = require('../models')

module.exports = class ArticleProxy {
  static async getArticlesList (size, page) {
    return Article.find({ draft: false }, '_id title description category date bg')
      .skip((page - 1) * size)
      .limit(size)
      .sort('-date')
      .exec()
  }

  static async getById (id) {
    this.gengrateBg()
    return Article.findById({'_id': id}, '_id title category htmlcont date bg')
  }

  static async gengrateBg () {
    const bgCount = config.get('bgCount')
    const bgList = await Article.find({},'bg', {limit: 10}).lean()
    const qiniuUrl = config.get('qiniuUrl')
    const randomNum = () => {
      const bgNum = Math.round(Math.random() * bgCount)
      if (tempData.indexOf(bgPath) > -1) {
        randomNum()
      }
      return `${qiniuUrl}/${bgNum}.jpg`
    }
  }

  static async newAddSave (articleData) {
    const article = new Article(articleData)
    const bgPath = await gengrateBg()
    article.bg = bgPath
    article.save()
  }

  static async update (articleId, data) {
    const article = new Article(data)
    Article.update({'_id': articleId}, {$set: data})
  }

  static async deleteById (articleId) {
    Article.remove({'_id': articleId})
  }
}