const deleteById = async function (model, id, res) {
  try {
    const result = await model.findOne({'_id', id});
    if (result) {
      await model.remove({'_id': id})
      res.status(200);
      res.json({
        code: 0,
        data: {
          msg: 'success'
        }
      })
    } else {
      res.status(400);
      res.json({
        code: 4,
        verror: {
          msg: '未查找到相关记录'
        }
      })
    }
  } catch (e) {
    throw new Error(e);
    res.status(500);
    res.json({
      code: 5,
      verror: {
        msg: 'Something error'
      }
    })
  }
}
