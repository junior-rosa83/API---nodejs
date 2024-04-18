exports.up = knex => knex.schema.createTable("tags", table => {
  table.increments("id");
  table.integer("note_id").references("id").inTable("notes").onDelete("CASCADE"); 
  table.integer("user_id").references("id").inTable("users"); 
  //Significa que não vai dar para criar uma nota se não existir o usuario//

  table.text("name");
});

exports.down = knex => knex.schema.dropTable("tags");
