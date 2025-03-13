import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('users', function(table) {
      table.increments('id').primary(); // 자동 증가 ID
      table.string('name', 100).notNullable();
      table.string('email', 255).unique().notNullable();
      table.string('password', 255).notNullable();
      table.date('birth_date');
      table.time('birth_time');
      table.string('gender', 50);
      table.string('city_country', 255);
      table.string('z_sign', 50); // 별자리
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
  };
  
  export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('users');
  };
  