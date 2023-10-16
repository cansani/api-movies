const { Router } = require('express')

const multer = require('multer')
const uploadConfig = require('../configs/upload')

const userRoutes = Router()
const upload = multer(uploadConfig.MULTER)

const UsersController = require('../controllers/UsersController')
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')
const UsersAvatarController = require('../controllers/UsersAvatarController')

const usersController = new UsersController()
const usersAvatarController = new UsersAvatarController()

userRoutes.post('/', usersController.create)
userRoutes.put('/', ensureAuthenticated, usersController.update)
userRoutes.patch('/avatar', ensureAuthenticated, upload.single('avatar'), usersAvatarController.update)

module.exports = userRoutes