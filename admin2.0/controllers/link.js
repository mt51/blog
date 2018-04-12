const { LinkProxy } = require('../proxy')

module.exports = class UserController {
  static async lists (req, res, next) {
    const links = await LinkProxy.lists()
    res.status(200)
    res.json({
      lists: links
    })
  }

  static async add (req, res, next) {
    let linkData = req.body
    linkData.date = Date.now()
    LinkProxy.newAdnSave(linkData)
  }

  static async update (req, res, next) {
    const linkId = req.params.id
    let LinkData = req.body
    linkData.id = linkId
    await LinkProxy.update(linkData)
    res.status(200)
    res.json({
      result: '更新成功'
    })
  }

  static async deleteById (req, res, next) {
    const linkId = req.params.id
    await LinkProxy.deleteById(linkId)
    res.status(200)
    res.json({
      result: '删除成功'
    })
  }
}
