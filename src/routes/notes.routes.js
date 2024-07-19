const { Router } = require('express')

const NotesController = require('../controllers/notesController')

const notesRouter = Router()

const notesController = new NotesController()

const ensureAthenticated = require("../middlewares/ensureAthenticated")

notesRouter.use(ensureAthenticated)

notesRouter.get("/", notesController.index)
notesRouter.post("/", notesController.create) 
notesRouter.get("/:id", notesController.show)
notesRouter.delete("/:id", notesController.delete)

module.exports = notesRouter