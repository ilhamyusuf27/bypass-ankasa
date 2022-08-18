const asyncHandler = require('../middlewares/asyncHandler')
const { findAll, findById, update, destroy } = require('../models/user')
const cloudinary = require('../config/cloudinary')
const moment = require('moment')

const getAllUsers = asyncHandler(async (req, res, next) => {
  const result = await findAll()
  const users = result?.rows

  res.status(200).json(users)
})

const getUserById = asyncHandler(async (req, res, next) => {
  const id = req?.params?.id
  const user = await findById(id)

  res.status(200).json(user)
})

const updateUser = asyncHandler(async (req, res, next) => {
  const userId = req?.params?.id
  const userImage = req?.file?.path
  const user = await findById(userId)
  const updatedUser = { ...req.body, userId, role: 'user', updatedAt: moment().format() }
  let userImagePublicId

  if(user.user_image) {
    const userImageJSON = JSON.parse(user.user_image)
    const splitUserImage = userImageJSON.public_id.split('/')
    userImagePublicId = splitUserImage[splitUserImage.length - 1]
  }

  if (!userImage) {
    updatedUser.userImage = user.user_image
  } else {
    const uploaderConfig = { folder: 'ankasa-user' }

    if (userImagePublicId) {
      uploaderConfig.public_id = userImagePublicId
      uploaderConfig.overwrite = true
    }

    const imageUpload = await cloudinary.uploader.upload(userImage, uploaderConfig)
    const userImageObject = { public_id: imageUpload.public_id, secure_url: imageUpload.secure_url }
    updatedUser.userImage = JSON.stringify(userImageObject)
  }

  await update(updatedUser)  
  res.status(200).json({ message: 'Successfuly updated' })
})

const deleteUser = asyncHandler(async (req, res, next) => {
  const userId = req?.params?.id
  const user = await findById(userId)
  let userImagePublicId

  if(user.user_image) {
    const userImageJSON = JSON.parse(user.user_image)
    userImagePublicId = userImageJSON.public_id
  }

  if(userImagePublicId) await cloudinary.uploader.destroy(userImagePublicId)
  
  await destroy(userId)
  res.status(200).json({ message: 'Successfuly deleted' })
})

module.exports = { getAllUsers, getUserById, updateUser, deleteUser }