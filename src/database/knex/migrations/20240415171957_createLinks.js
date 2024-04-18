exports.up = knex => knex.schema.createTable("links", table => {
  table.increments("id");
  table.integer("note_id").references("id").inTable("notes").onDelete("CASCADE"); 
  //Significa que não vai dar para criar uma nota se não existir o usuario//
  table.text("url").notNullable();
  table.timestamp("created_at").default(knex.fn.now())
  
});

exports.down = knex => knex.schema.dropTable("links");