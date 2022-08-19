const router = require('express').Router()
const { getAllUsers, getUserById, updateUser, deleteUser } = require('../controllers/user')
const upload = require('../middlewares/upload')
const { passwordHash } = require('../middlewares/bcrypt')

router.route('/').get(getAllUsers)
router.route('/:id')
  .get(getUserById)
  .patch(upload.single('userImage'), passwordHash, updateUser)
  .delete(deleteUser)

module.exports = router
