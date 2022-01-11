const express = require('express')

const {
  validation,
  ctrlWrapper,
  auth,
  validContactId,
} = require('../../middlewares');
const { joiSchema, favoriteJoiSchema } = require('../../models/contact')
const { contacts: ctrl } = require('../../controllers')

const router = express.Router()

router.get('/', auth, ctrlWrapper(ctrl.listContacts))

router.get('/:id', validContactId, ctrlWrapper(ctrl.getById))

router.post('/', auth, validation(joiSchema), ctrlWrapper(ctrl.add))

router.delete('/:id', validContactId, ctrlWrapper(ctrl.removeById))

router.put('/:id', validContactId, validation(joiSchema), ctrlWrapper(ctrl.updateById))

router.patch(
  '/:id/favorite',
  validContactId,
  validation(favoriteJoiSchema),
  ctrlWrapper(ctrl.updateStatusContact)
)

module.exports = router
