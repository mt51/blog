module.exports = {
  empty (res) {
    res.status(400);
    res.json({
      code: 4,
      verror: {
        msg: '未查找到相关记录'
      }
    })
  },
  wrong (res) {
    res.status(500);
    res.json({
      code: 5,
      verror: {
        msg: 'Something error'
      }
    })
  },
  success (res) {
    res.status(200);
    res.json({
      code: 0,
      data: {
        msg: 'success'
      }
    })
  }
}