const express = require('express')

const {
  validation,
  ctrlWrapper,
  validContactId,
} = require('../../middlewares');

const { joiSchema, favoriteJoiSchema } = require('../../models/contact')
const { contacts: ctrl } = require('../../controllers')

const router = express.Router()

router.get('/', ctrlWrapper(ctrl.listContacts))

router.get('/:id', validContactId, ctrlWrapper(ctrl.getById));

router.post('/', validation(joiSchema), ctrlWrapper(ctrl.add))

router.delete('/:id', validContactId, ctrlWrapper(ctrl.removeById))

router.put('/:id', validContactId, validation(joiSchema), ctrlWrapper(ctrl.updateById))

router.patch(
  '/:id/favorite',
  validContactId,
  validation(favoriteJoiSchema),
  ctrlWrapper(ctrl.updateStatusContact)
)

module.exports = router
