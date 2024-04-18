const { hash, compare } = require('bcryptjs')

const AppError = require('../utils/AppError')

const sqliteConnection = require('../database/sqlite')

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body

    const database = await sqliteConnection()
    const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email])

    if (checkUserExists){
      throw new AppError("Este e-mail já está em uso.")
    }
    
    const hashPassword = await hash(password, 5)

    await database.run(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashPassword]
    )

    return response.status(201).json()
  }

  async update(request, response) {
    const { name, email, password, old_password } = request.body
    const { id } = request.params

    const database = await sqliteConnection()
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [id])

    if(!user) {
     throw new AppError("Usuário não encontrado")
    }

    const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email])

    if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
     throw new AppError("Este e-mail já está em uso.")
    }
    
    //O ?? funciona como um senão, se nao tiver nada no name usa o user.name
    user.name = name ?? user.name
    user.email= email ?? user.email
    
    if(!old_password) {
      throw new AppError('Informe sua senha para conseguir trocar.')
    }

    if(password && old_password) {
      const checkOldPassword = await compare(old_password, user.password)

      if(!checkOldPassword) {
        throw new AppError('Você digitou errado sua senha antiga.');
      }

      user.password = await hash(password, 8)
    }
    
    //O DATETIME('row') = é uma função do banco de dados para pegar a hora atual.
    await database.run(`
     UPDATE users SET
     name = ?,
     email = ?,
     password = ?,
     updated_at = DATETIME('now') 
     WHERE id = ?`, 
     [user.name, user.email,user.password, id]
   )

   return response.json()
 }
}

module.exports = UsersController

