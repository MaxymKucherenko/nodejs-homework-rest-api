const express = require('express')

const { validation, ctrlWrapper, auth } = require('../../middlewares')
const { joiSchema, favoriteJoiSchema } = require('../../models/contact')
const { contacts: ctrl } = require('../../controllers')

const router = express.Router()

router.get('/', auth, ctrlWrapper(ctrl.listContacts))

router.get('/:id', ctrlWrapper(ctrl.getById))

router.post('/', auth, validation(joiSchema), ctrlWrapper(ctrl.add))

router.delete('/:id', ctrlWrapper(ctrl.removeById))

router.put('/:id', validation(joiSchema), ctrlWrapper(ctrl.updateById))

router.patch(
  '/:id/favorite',
  validation(favoriteJoiSchema),
  ctrlWrapper(ctrl.updateStatusContact)
)

module.exports = router
