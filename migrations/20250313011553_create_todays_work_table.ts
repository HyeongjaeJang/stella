import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("todays_work", function(table) {
      table.increments("id").primary();
      table.integer("user_id").unsigned().references("id").inTable("users").onDelete("CASCADE");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
      table.string("productivity", 100);
      table.string("creativity", 100);
      table.string("challenge", 100);
      table.text("text");
    });
  };
  
  export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("todays_work");
  };
  