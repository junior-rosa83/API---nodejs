exports.up = knex => knex.schema.createTable("notes", table => {
  table.increments("id");
  table.text("tittle");
  table.text("description");
  
  table.integer("user_id").references("id").inTable("users"); 
  //Significa que não vai dar para criar uma nota se não existir o usuario//

  table.timestamp("created_at").default(knex.fn.now())
  table.timestamp("updated_at").default(knex.fn.now())
});

exports.down = knex => knex.schema.dropTable("notes");
