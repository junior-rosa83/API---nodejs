const knex = require("../database/knex")
const AppError = require("../utils/AppError")
const { compare } = require("bcryptjs")
const authConfig = require("../configs/auth")
const { sign } = require("jsonwebtoken") //A função sign é usada para gerar um token JWT

class SessionsController {
  async create(request, response) {
    const { email, password } = request.body
    
    const user = await knex("users").where({email}).first()

    if(!user) {
      throw new AppError("E-mail e/ou senha incorreta.", 401)
    }
    
    const matchPassword = await compare(password, user.password)

    if(!matchPassword) {
      throw new AppError('E-mail e/ou senha incorreta', 401)
    }
    
    const { secret, expiresIn } = authConfig.jwt 
    const token = sign({}, secret, {
      subject: String(user.id), //<- conteudo que eu quero inserir no token no caso o id do usuario, coloco em String() para ter certeza que vai ficar em string o id. 
      expiresIn
    })

    return response.json({ user, token })
  }
}

module.exports = SessionsController