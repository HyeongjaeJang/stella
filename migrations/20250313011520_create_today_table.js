exports.up = function(knex) {
    return knex.schema.createTable('today', function(table) {
      table.increments('id').primary();
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
      table.integer('number'); // 숫자 값
      table.string('color', 50);
      table.string('item', 255);
      table.integer('total_score');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('today');
  };
  