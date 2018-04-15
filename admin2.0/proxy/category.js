const { Category } = require('../models')

module.exports = class CategoryProxy {
  static async lists (type) {
    return Category.find({type: type}, 'name')
  }

  static async newAndSave (categoryData) {
    const category = new Category(categoryData)
    return category.save()
  }

  static async update (categoryId, data) {
    const category = new Category(data)
    return Category.update({
      '_id': categoryId
    }, {
      $set: data
    })
  }

  static async deleteById (categoryId) {
    return Category.remove({'_id': categoryId})
  }

  static async getCount (name) {
    return Category.count({name})
  }

  static async categoryCount () {
    const category = await Category.find({type: 'category'}, 'name').lean()
    const countList = []
    for (let i = 0, len = category.length; i < len; i++) {
      const item = category[i]
      const tempData = {
        name: item.name
      }
      const count = await this.getCount(item.name)
      tempData.count = count
      countList.push(tempData)
    }
    return countList
  }

}