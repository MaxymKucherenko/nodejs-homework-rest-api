const express = require('express')

const { validation, ctrlWrapper } = require('../../middlewares')
const { joiSchema, favoriteJoiSchema } = require('../../models/contact')
const { contacts: ctrl } = require('../../controllers')

const router = express.Router()

router.get('/', ctrlWrapper(ctrl.listContacts))

router.get('/:id', ctrlWrapper(ctrl.getById))

router.post('/', validation(joiSchema), ctrlWrapper(ctrl.add))

router.delete('/:id', ctrlWrapper(ctrl.removeById))

router.put('/:id', validation(joiSchema), ctrlWrapper(ctrl.updateById))

router.patch(
  '/:id/favorite',
  validation(favoriteJoiSchema),
  ctrlWrapper(ctrl.updateStatusContact)
)

module.exports = router
