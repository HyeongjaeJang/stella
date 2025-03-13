import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("todays_mood", function(table) {
      table.increments("id").primary();
      table.integer("user_id").unsigned().references("id").inTable("users").onDelete("CASCADE");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
      table.string("mood", 100);
      table.string("energy", 100);
      table.string("stress", 100);
      table.text("text");
    });
  };
  
  export async function down(knex: Knex): Promise<void>{
    return knex.schema.dropTable("todays_mood");
  };
  