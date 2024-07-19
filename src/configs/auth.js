module.exports = {
  jwt: {
    secret: process.env.AUTH_SECRET || "default", // <- é utilizado para gerar um token
    expiresIn: "1d" // <- é o tempo de duração desse token
  }
}

//aqui nessa pasta fica as configuraçoes de autentyicação da nossa aplicação.