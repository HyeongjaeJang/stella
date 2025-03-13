exports.up = function(knex) {
    return knex.schema.createTable("todays_finance", function(table) {
      table.increments("id").primary();
      table.integer("user_id").unsigned().references("id").inTable("users").onDelete("CASCADE");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
      table.integer("income");
      table.integer("expense");
      table.integer("invest");
      table.text("text");
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable("todays_finance");
  };
  