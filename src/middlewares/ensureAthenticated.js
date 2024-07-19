const { verify } = require("jsonwebtoken") 
const AppError = require("../utils/AppError")
const authConfig = require("../configs/auth")

function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers.authorization //authHeader: Obtém o valor do cabeçalho de autorização (Authorization) da requisição HTTP.

  if(!authHeader) {
    throw new AppError("JWT Token não identificado")
  }

  const [, token] = authHeader.split(" ") // Divide o valor do cabeçalho de autorização em duas partes usando o espaço como delimitador.O cabeçalho de autorização geralmente segue o formato Bearer {token}, onde Bearer é a primeira parte e {token} é a segunda parte.A sintaxe de desestruturação [, token] ignora a primeira parte (Bearer) e armazena a segunda parte (o token) na variável token.

  try {
    const { sub: user_id } = verify(token, authConfig.jwt.secret) //A função verify do jsonwebtoken é usada para verificar o token JWT. Se o token for válido, ele retorna o payload decodificado do token. O payload é um objeto que contém várias informações, sendo sub uma delas.sub é um campo padrão no payload de um JWT, geralmente usado para armazenar o identificador do usuário (user ID).

    request.user = {
      id: Number(user_id)
    }

    return next()
  } catch {
    throw new AppError("JWT Token inválido.")
  }
}

module.exports = ensureAuthenticated