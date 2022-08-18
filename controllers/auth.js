const asyncHandler = require('../middlewares/asyncHandler')
const { create, findByEmail } = require('../models/user')

const register = asyncHandler(async (req, res, next) => {
  await create(req.body)
  res.status(201).json({ message: 'Successfuly created new user' })
})

const login = asyncHandler(async (req, res, next) => {
  const userEmail = req?.body?.email
  const user = await findByEmail(userEmail)

  req.user = user
  req.payload = {
    userId: user.user_id,
    email: user.email,
    fullName: user.full_name,
  }

  next()
})

module.exports = { register, login }
