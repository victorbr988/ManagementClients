import type { Knex } from 'knex';


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('company', (table) => {
    table.specificType('id', 'char(24)').primary();
    table.string('name', 92).notNullable();
    table.string('email').notNullable();
    table.string('password').notNullable();

    table.index('id');
  });

  await knex.schema.createTable('clients', (table) => {
    table.specificType('id', 'char(24)').primary();
    table.string('name', 92).notNullable();
    table.string('email').notNullable();
    table.integer('phone').unsigned().defaultTo(0);
    table.specificType('coordenadas', 'geometry(Point, 4326)').notNullable();
    table.specificType('company_id', 'char(24)').notNullable();
    table.foreign('company_id').references('company.id');

    table.index('company_id');
    table.index('id');
  });
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('clients');
  await knex.schema.dropTable('company');
}

