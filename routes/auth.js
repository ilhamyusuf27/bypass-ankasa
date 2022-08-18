const router = require('express').Router()
const { tokenSign } = require('../middlewares/jwt')
const { passwordHash, passwordCompare } = require('../middlewares/bcrypt')
const { register, login } = require('../controllers/auth')

router.post('/register', passwordHash, register)
router.post('/login', login, passwordCompare, tokenSign)

module.exports = router
