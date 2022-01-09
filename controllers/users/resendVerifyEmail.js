const { User } = require('../../models')
const { sendEmail } = require('../../helpers')

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body
  const user = await User.findOne({ email })

  if (user.verify) {
    throw new Error('Verification has already been passed')
  }

  const verificationToken = user.verificationToken

  const mail = {
    to: email,
    subject: 'Confirm email',
    html: `<a target='_blank' href='http://localhost:3000/api/users/verify/${verificationToken}'>Click for email confirmation</a>`,
  }

  await sendEmail(mail)

  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      user: {
        email,
      },
    },
    message: 'Verification email sent',
  })
}

module.exports = resendVerifyEmail
