const path = require("path")
const multer = require("multer")
const crypto = require("crypto")

const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp") //Onde a imagem chega
const UPLOADS_FOLDER = path.resolve(TMP_FOLDER, "uploads") //Onde a imagem de fato vai ficar

const MULTER = {
  storage: multer.diskStorage({ //Configuração do armazenamento para o Multer, utilizando o sistema de arquivos (diskStorage).
    destination: TMP_FOLDER, //Desitino
    filename(request, file, callback) { //Função que define o nome dos arquivos
      const fileHash = crypto.randomBytes(10).toString("hex") //Uma string hexadecimal gerada randomicamente para evitar conflitos de nomes de arquivos.
      const fileName = `${fileHash}-${file.originalname}`//String gerada pelo fileName + o nome original do arquivo

      return callback(null, fileName)
    }
  })
}

module.exports = {
  TMP_FOLDER,
  UPLOADS_FOLDER,
  MULTER
}