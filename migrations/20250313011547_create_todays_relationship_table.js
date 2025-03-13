exports.up = function(knex) {
    return knex.schema.createTable("todays_relationship", function(table) {
      table.increments("id").primary();
      table.integer("user_id").unsigned().references("id").inTable("users").onDelete("CASCADE");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
      table.string("love", 100);
      table.string("work", 100);
      table.string("friend", 100);
      table.string("family", 100);
      table.text("text");
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable("todays_relationship");
  };
  