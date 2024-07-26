import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  knex.raw('CREATE SCHEMA IF NOT EXISTS extensions');
  knex.raw('CREATE EXTENSION IF NOT EXISTS postgis WITH SCHEMA extensions;');
}

export async function down(knex: Knex): Promise<void> {
  knex.raw('DROP SCHEMA IF EXISTS postgis');
  knex.raw('DROP EXTENSION IF EXISTS postgis');
}
