import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  const exists = await knex.schema.hasTable('samples');
  if (!exists) {
    await knex.schema.createTable('samples', (table) => {
      table.increments('id').primary();
      table.string('title', 255).notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('samples');
}




