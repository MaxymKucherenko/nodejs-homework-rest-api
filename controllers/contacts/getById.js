const createError = require('http-errors')
const { Contact } = require('../../models')

const getById = async (req, res) => {
  const { id } = req.params
  const idContact = await Contact.findById(id)
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
