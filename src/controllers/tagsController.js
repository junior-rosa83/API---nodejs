const knex = require("../database/knex")

class TagsController {
  async index(request, response) {
    const user_id = request.user.id
    
    const tags = await knex('tags').where({ user_id }).groupBy("name") //groupBy é uma técnica útil para organizar dados de forma que itens com características comuns sejam agrupados juntos, facilitando operações subsequentes como agregações, filtragens e análises.

    return response.json(tags)

  }
}

module.exports = TagsController