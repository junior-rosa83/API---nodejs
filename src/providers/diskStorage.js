const fs = require("fs") //Módulo do Node.js usado para manipulação de arquivos no sistema.
const path = require("path")
const uploadConfig = require("../configs/upload")

class diskStorage { //Define uma classe que gerencia o armazenamento de arquivos no disco.
  async saveFile(file) { //Método assíncrono que salva um arquivo movendo-o do diretório temporário (TMP_FOLDER) para o diretório final (UPLOADS_FOLDER).
    await fs.promises.rename( //Move o arquivo do diretório temporário para o diretório de uploads.
      path.resolve(uploadConfig.TMP_FOLDER, file), //path.resolve: Concatena os caminhos dos diretórios com o nome do arquivo.
      path.resolve(uploadConfig.UPLOADS_FOLDER, file)
    )

    return file //Retorna o nome do arquivo apos move-lo
  }

  async deleteFile(file) {
    const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file) //Caminho completo do arquivo no diretório de uploads.

    try {
      await fs.promisses.stat(filePath) // Verifica se o arquivo existe no caminho especificado.
    } catch {
      return //Se o arquivo não existir (capturado pelo catch), a função retorna imediatamente sem tentar deletar o arquivo inexistente.
    }
    
    await fs.promisses.unLink(filePath) //Remove o arquivo.
  }
}

module.exports = diskStorage