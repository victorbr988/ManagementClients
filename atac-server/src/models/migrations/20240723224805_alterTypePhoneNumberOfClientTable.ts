import type { Knex } from 'knex';


export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('clients', (table) => {
    table.string('phone').notNullable().alter();
  });
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('clients', (table) => {
    table.integer('phone').unsigned().defaultTo(0).alter();
  });
}
