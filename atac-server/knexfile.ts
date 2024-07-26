import type { Knex } from 'knex';
import path from 'path';
import 'dotenv/config';

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: path.resolve(__dirname, './src/models/migrations'),
      extension: 'ts'
    },
    seeds: {
      directory: path.resolve(__dirname, './src/models/seeds'),
      extension: 'ts'
    }
  }
};

export default config;
