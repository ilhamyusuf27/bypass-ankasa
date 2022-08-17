const asyncHandler = require('../middlewares/asyncHandler')
const ErrorResponse = require('../utils/ErrorResponse')

const notFound = asyncHandler((req, res, next) => {
  throw new ErrorResponse('Resource not Found', 404)
})

module.exports = notFound
