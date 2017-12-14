const info = require('../util/info.js');

const add = async function (model, data, res) {
  const newData = new model(data)
  try {
    await newData.save()
    info.success(res);
  } catch (e) {
    info.wrong(res);
    throw new Error(e);
  }
} 

const deleteById = async function (model, id, res) {
  try {
    const result = await queryById(model, id);
    if (result) {
      await model.remove({'_id': id})
      info.success(res);
    } else {
      info.empty();
    }
  } catch (e) {
    info.wrong(res);
    throw new Error(e);
  }
}

const update = async function (model, id, data, res) {
  try {
    const result = await queryById(model, id);
    if (result) {
      await model.update({'_id': id}, {$set: data})
      info.success(res);
    } else {
      info.empty(res);
    }
  } catch (e) {
    info.wrong(res);
    throw new Error(e);
  }
}

const queryById = async function (model, id) {
  return model.findOne({'_id': id});
}

const queryDetailById = async function (model, id, res) {
  try {
    const result = await queryById(model, id);
    if (result) {
      res.status(200);
      res.json({
        code: 0,
        data: result
      })
    } else {
      info.empty(res);
    }
  } catch (e) {
    throw new Error(e)
    info.wrong(res);
  }
}

const query = async function (model, res) {
  try {
    const data = await model.find();
    res.status(200);
    res.json({
      code: 0,
      data
    })
  } catch (e) {
    throw new Error(e)
    info.wrong(res);
  }
}

module.exports = {
  deleteById,
  update,
  queryDetailById,
  add,
  query
}