exports.up = function(knex) {
    return knex.schema.createTable("todays_health", function(table) {
      table.increments("id").primary();
      table.integer("user_id").unsigned().references("id").inTable("users").onDelete("CASCADE");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
      table.string("state", 100);
      table.string("activity", 100);
      table.string("warning", 100);
      table.text("text");
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable("todays_health");
  };
  