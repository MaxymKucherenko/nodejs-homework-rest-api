const { Schema, model } = require('mongoose')
const Joi = require('joi')

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionkey: false, timestammps: true }
)

const joiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  phone: Joi.string().required(),
  favorite: Joi.bool(),
})

const favoriteJoiSchema = Joi.object({
  favorite: Joi.bool().required().messages({
    'any.required': 'missing field favorite',
  }),
})

const Contact = model('contact', contactSchema)

module.exports = {
  Contact,
  joiSchema,
  favoriteJoiSchema,
}
