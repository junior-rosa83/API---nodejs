const { Router } = require('express')

const UsersController = require('../controllers/usersController')
const UsersAvatarController = require("../controllers/userAvatarController")

const multer = require("multer")
const uploadConfig = require("../configs/upload")
const upload = multer(uploadConfig.MULTER)

const usersRouter = Router()

const usersController = new UsersController()
const usersAvatarController = new UsersAvatarController()

const ensureAthenticated = require("../middlewares/ensureAthenticated")

usersRouter.post('/', usersController.create) 
usersRouter.put('/', ensureAthenticated, usersController.update)
usersRouter.patch('/avatar', ensureAthenticated, upload.single("avatar"), usersAvatarController.update) //upload.single("avatar") esse nome avatar é onde no banco de dados eu quero colocar minha foto.

module.exports = usersRouter