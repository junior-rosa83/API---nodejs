const { Router } = require('express')

const UsersController = require('../controllers/usersController')

const usersRouter = Router()

const usersController = new UsersController()

usersRouter.post('/', usersController.create) 
usersRouter.put('/:id', usersController.update)

module.exports = usersRouter