
const { Router } = require('express')

const TagsController = require('../controllers/tagsController')

const tagsRouter = Router()

const tagsController = new TagsController()

const ensureAthenticated = require("../middlewares/ensureAthenticated")

tagsRouter.get("/", ensureAthenticated, tagsController.index)

module.exports = tagsRouter