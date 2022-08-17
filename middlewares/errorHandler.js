const ErrorResponse = require('../utils/ErrorResponse')

const errorHandler = (err, req, res, next) => {
  let error = err

  console.log(error)

  if (error.status === 404) {
    error = new ErrorResponse(error.message || 'Resource Not Found', 404)
  }

  if (error.code === '42P01') {
    error = new ErrorResponse('Database Error')
  }

  if (error.code === '42703') {
    error = new ErrorResponse('Database Error: Insert data failed')
  }

  if (error.code === '23505') {
    error = new ErrorResponse(error.detail, 400)
  }

  if (error.code === 'LIMIT_UNEXPECTED_FILE') {
    error = new ErrorResponse('Too much content')
  }

  res.status(error.statusCode || 500).json({
    message: error.message || 'Internal Server Error'
  })
}

module.exports = errorHandler