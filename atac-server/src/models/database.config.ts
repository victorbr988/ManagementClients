import connection, { Knex } from 'knex';
import knexConfig from '../../knexfile';
import postgis from 'knex-postgis';
export const database: Knex = connection(knexConfig.development);
export const knexExtension = postgis(database);