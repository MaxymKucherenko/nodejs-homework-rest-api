const createError = require('http-errors')

const { Contact } = require('../../models')

const removeById = async (req, res) => {
  const { id } = req.params
  const { _id: userId } = req.user

  const result = await Contact.findOneAndRemove({
    _id: id,
    owner: userId,
  })
  if (!result) {
    throw createError(404, `Contact with id=${id} not found`)
  }
  res.json({
    status: 'success',
    code: 200,
    message: 'contact deleted',
    data: {
      result,
    },
  })
}

module.exports = removeById
