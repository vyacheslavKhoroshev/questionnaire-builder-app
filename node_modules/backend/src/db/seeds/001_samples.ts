import type { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('samples').del();
  await knex('samples').insert([{ title: 'First sample' }, { title: 'Second sample' }]);
}




