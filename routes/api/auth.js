const express = require('express')

const { auth, validation, ctrlWrapper } = require('../../middlewares')
const { auth: ctrl } = require('../../controllers')
const { joiSignUpSchema, joiSignInSchema } = require('../../models/user')

const router = express.Router()

router.post('/signup', validation(joiSignUpSchema), ctrlWrapper(ctrl.signup))
router.post('/login', validation(joiSignInSchema), ctrlWrapper(ctrl.login))
router.get('/logout', auth, ctrlWrapper(ctrl.logout))

module.exports = router
