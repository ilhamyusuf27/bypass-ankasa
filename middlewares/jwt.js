const jwt = require('jsonwebtoken')
const ErrorResponse = require('../utils/ErrorResponse')
const asyncHandler = require('./asyncHandler')

const tokenVerify = asyncHandler(async (req, res, next) => {
  const bearerToken = req?.headers?.authorization
  if (!bearerToken) throw new ErrorResponse('Unauthorized', 401)

  const token = bearerToken.split(' ')[1]

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err) => {
    if (err) throw new ErrorResponse(err.message, 401)
    next()
  })
})

const tokenSign = asyncHandler(async (req, res, next) => {
  const payload = req?.payload

  jwt.sign(
    payload,
    process.env.JWT_SECRET_KEY,
    { expiresIn: '7d' },
    (err, token) => {
      if (err) throw new ErrorResponse(err.message, 401)
      res.status(200).json({ token })
    }
  )
})

module.exports = { tokenVerify, tokenSign }
