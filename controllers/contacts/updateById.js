const createError = require('http-errors')

const { Contact } = require('../../models')

const updateById = async (req, res) => {
  const { id } = req.params
  const { _id: userId } = req.user

  const result = await Contact.findOneAndUpdate(
    { _id: id, owner: userId },
    req.body,
    { new: true }
  ).populate('owner', '_id name email');
  if (!result) {
    throw createError(404, `Contact with id=${id} not found`)
  }
  res.json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  })
}

module.exports = updateById
