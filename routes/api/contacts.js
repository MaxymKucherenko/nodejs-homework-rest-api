const express = require('express')
const createError = require('http-errors')
const Joi = require('joi')

const contactsSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  phone: Joi.string().required(),
})

const contactsOperation = require('../../model')

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const contacts = await contactsOperation.listContacts()
    res.json({
      status: 'success',
      code: 200,
      data: {
        result: contacts,
      },
    })
  } catch (error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const idContact = await contactsOperation.getContactById(contactId)
    if (!idContact) {
      throw createError(404, `Contact with id=${contactId} not found`)
    }
    res.json({
      status: 'success',
      code: 200,
      data: {
        result: idContact,
      },
    })
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body)
    if (error) {
      error.status = 400
      throw error
    }
    const newContact = await contactsOperation.addContact(req.body)
    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        result: newContact,
      }
    })
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = await contactsOperation.removeContact(contactId)
    if (!result) {
      throw createError(404, `Contact with id=${contactId} not found`)
    }
    res.json({
      status: 'success',
      code: 200,
      message: `Contact with id=${contactId} deleted`,
      data: {
        result: result,
      },
    })
  } catch (error) {
    next(error)
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body)
    if (error) {
      error.status = 400
      throw error
    }
    const { contactId } = req.params
    const updateContact = await contactsOperation.updateContact(
      contactId,
      req.body
    )
    if (!updateContact) {
      throw createError(404, `Contact with id=${contactId} not found`)
    }
    res.json({
      status: 'success',
      code: 200,
      data: {
        result: updateContact,
      },
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router
