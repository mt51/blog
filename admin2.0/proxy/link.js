const { Link } = require('../models')

module.exports = class LinkProxy {
  static async lists () {
    return Link.find()
  }

  static async newAndSave (linkData) {
    let link = new Link(linkData)
    return link.save()
  }

  static async getById (id) {
    return Link.findById(id)
  }

  static async update (link) {
    return Link.update(
      {
        _id: link.id
      },
      {
        $set: {
          title: link.title,
          descp: link.descp,
          link: link.link,
          avatar: avatar
        }
      })
  }

  static async deleteById (id) {
    return Link.remove({_id: id})
  }
}