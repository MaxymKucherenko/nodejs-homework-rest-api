const createError = require('http-errors')
const { Contact } = require('../../models')

const getById = async (req, res) => {
  const { id } = req.params
  const { _id: userId } = req.user

  const idContact = await Contact.find({
    _id: id,
    owner: userId,
  }).populate('owner', '_id name email')
  if (!idContact) {
    throw createError(404, `Contact with id=${id} not found`)
  }
  res.json({
    status: 'success',
    code: 200,
    data: {
      result: idContact,
    },
  })
}

module.exports = getById
