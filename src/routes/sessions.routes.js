const { Router } = require("express")
const sessionsRouter = Router()

const SessionsController = require("../controllers/sessionsController")
const sessionsController = new SessionsController()

sessionsRouter.post("/", sessionsController.create)

module.exports = sessionsRouter

