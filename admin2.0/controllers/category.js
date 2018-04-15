const { CategoryProxy } = require('../proxy')

module.exports = class CategoryController {
  static async lists (req, res) {
    const type = req.query.type
    const categories = CategoryProxy.lists(type)
    res.status(200)
    res.json({
      lists: categories
    })
  }

  static async add (req, res, next) {
    const categoryData = req.body
    categoryData.date = Date.now()
    CategoryProxy.newAndSave(categoryData)
    res.status(200)
    res.json({
      result: '新增成功'
    })
  }

  static async update (req, res) {
    const categoryData = req.body
    const categoryId = req.params.id
    CategoryProxy.update(categoryId, categoryData)
    res.status(200)
    res.json({
      result: '更新成功'
    })
  }

  static async deleteById (req, res) {
    const categoryId = req.params.id
    await CategoryProxy.deleteById(categoryId)
    res.status(200)
    res.json({
      result: '删除成功'
    })
  }

  static async count (req, res) {
    const lists = await CategoryProxy.categoryCount()
    res.status(200)
    res.json({
      lists
    })
  }

}