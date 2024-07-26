import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
    await knex('company').del();

    await knex('company').insert([
        { 
            id: 'wdweguc4vaaobhx14hskk5uz',
            name: 'Atac',
            email: 'atac@atac.com',
            password: 'atac123',
            coordinates: 'POINT(-8.277550724908538 -35.97184501776442)'
        }
    ]);
};
