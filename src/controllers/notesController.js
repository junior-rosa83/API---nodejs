const knex = require("../database/knex")

class NotesController {
  async create(request, response) {
    const { tittle, description, tags, links } = request.body
    const user_id  = request.user.id
    
    //Pelo que eu entendi esse [note_id] é para gerar uma variavel com o id da nota.
    const [note_id] = await knex("notes").insert({
      tittle,
      description,
      user_id
    })

    const linksInsert = links.map(link => {
      return {
        note_id,
        url: link
      }
    })

    await knex("links").insert(linksInsert)

    const tagsInsert = tags.map(name => {
      return {
        note_id,
        name,
        user_id
      }
    })

    await knex("tags").insert(tagsInsert)

    response.json()
  }

  async show(request, response) {
    const { id } = request.params
    
    //where serve para pegar onde o id for igual o id informado.
    //note_id: id = é para dizer que o note_id tem que ser igual o id
    //orderBy é para dizer a ordem como eles vão aparecer.
    const note = await knex('notes').where({ id }).first()
    const tags = await knex('tags').where({ note_id: id }).orderBy("name")
    const links = await knex('links').where({ note_id: id}).orderBy("created_at")

    return response.json({
      ...note,
      tags,
      links
    })
  }

  async delete(request, response) {
    const { id } = request.params

    await knex('notes').where({ id }).delete()

    return response.json()
  }

  async index(request, response) {
    const { tittle, tags } = request.query
    const user_id = request.user.id
    
    let notes;

    if(tags) {
      // A string de tags é dividida em um array usando split(','), onde cada tag é separada por uma vírgula. Em seguida, map(tag => tag.trim()) é usado para percorrer cada elemento do array resultante e remover espaços em branco extras ao redor das tags usando trim().
      const filterTags = tags.split(',').map(tag => tag.trim())
      
      notes = await knex('tags')
        .select([
          "notes.id",
          "notes.tittle",
          "notes.user_id"
        ])
        .where("notes.user_id", user_id)
        .whereLike("tittle", `%${tittle}%`)
      //Por exemplo, se você tem uma lista de IDs de usuário e deseja selecionar apenas os usuários com esses IDs, você pode usar whereIn('id', [1, 2, 3]). Isso criará uma cláusula SQL que seleciona apenas as linhas onde o ID está na lista [1, 2, 3].
        .whereIn("name", filterTags)
        .innerJoin("notes", "notes.id", "tags.note_id")
        .groupBy("notes.id")
        .orderBy("notes.tittle")
    } else {
      notes = await knex('notes')
        .where({ user_id })
      //.whereLike() para fazer uma busca por registros em um banco de dados onde o campo "tittle" (título) contém uma parte específica de texto representada pela variável tittle. O % é usado como um caractere curinga que indica que pode haver qualquer texto antes e depois do texto da variável tittle.
        .whereLike("tittle", `%${tittle}%`)
        .orderBy("tittle")
    } 
    
    //Serve para colocar as tags junto com a nota.
    const userTags = await knex("tags").where({ user_id }) //Só de quando colocar nome igual ja entende para procurar igual o user_ir. Ex.: user_id.
    const notesWhithTags = notes.map(note => {
      const noteTags = userTags.filter(tag => tag.note_id === note.id)

      return {
        ...note,
        tags: noteTags
      }
    })

    return response.json(notesWhithTags) 
  }
}

module.exports = NotesController