import type { Knex } from 'knex';


export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('company', (table) => {
    table.specificType('coordinates', 'geometry(Point, 4326)').notNullable();
  });
  await knex.schema.alterTable('clients', (table) => {
    table.renameColumn('coordenadas', 'coordinates');
  });
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('company', (table) => {
    table.dropColumn('coordinates');
    table.renameColumn('coordinates', 'coordenadas');
  });
}
