const { Router } = require('express')

const NotesController = require('../controllers/notesController')

const notesRouter = Router()

const notesController = new NotesController()

notesRouter.get("/", notesController.index)
notesRouter.post("/:user_id", notesController.create) 
notesRouter.get("/:id", notesController.show)
notesRouter.delete("/:id", notesController.delete)

module.exports = notesRouter