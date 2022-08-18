const db = require('../config/db')
const ErrorResponse = require('../utils/ErrorResponse')

const findAll = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM users', (err, result) => {
      if (err) return reject(err)
      resolve(result)
    })
  })
}

const findById = (id) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM users WHERE user_id = $1', [id], (err, result) => {
      if (err) return reject(err)
      if (result.rowCount) return resolve(result.rows[0])

      reject(new ErrorResponse('User not Found', 404))
    })
  })
}

const findByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT user_id, full_name, email, password FROM users WHERE email=$1',
      [email],
      (err, result) => {
        if (err) reject(err)
        if (result.rowCount) return resolve(result.rows[0])

        reject(new ErrorResponse('User not Registered', 404))
      }
    )
  })
}

const create = (user) => {
  const { fullName, email, password } = user
  return new Promise((resolve, reject) => {
    db.query(
      'INSERT INTO users (full_name, email, password) VALUES ($1, $2, $3)',
      [fullName, email, password],
      (err, result) => {
        if (err) return reject(err)
        resolve(result)
      }
    )
  })
}

const update = (user) => {
  const {
    userId,
    fullName,
    email,
    password,
    phone,
    userImage,
    gender,
    role,
    nationality,
    updatedAt,
  } = user
  const columns = [
    fullName,
    email,
    password,
    phone,
    userImage,
    gender,
    role,
    nationality,
    updatedAt,
    userId,
  ]

  return new Promise((resolve, reject) => {
    db.query(
      'UPDATE users SET full_name=$1, email=$2, password=$3, phone=$4, user_image=$5, gender=$6, role=$7, nationality=$8, updated_at=$9 WHERE user_id=$10',
      [...columns],
      (err, result) => {
        if (err) return reject(err)
        resolve(result)
      }
    )
  })
}

const destroy = (id) => {
  return new Promise((resolve, reject) => {
    db.query('DELETE FROM users WHERE user_id = $1', [id], (err, result) => {
      if (err) return reject(err)
      resolve(result)
    })
  })
}

module.exports = { findAll, findById, create, update, destroy, findByEmail }
