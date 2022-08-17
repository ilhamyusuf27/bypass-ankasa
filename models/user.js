const db = require('../config/db')

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
      resolve(result)
    })
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
      'UPDATE users SET full_name=$1, email=s2, password=$3, phone=s4, user_image=$5, gender=$6, role=$7, nationality=$8, updated_at=$9 WHERE user_id=$10',
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

module.exports = { findAll, findById, create, update, destroy }
