import { ClientDto } from '@/dtos/client.dto';
import { database } from './database.config';
import { IClientsModel } from './interface/IClientsModel';
import { createId } from '@paralleldrive/cuid2';

export class ClientsModel implements IClientsModel {
  public async getAll(): Promise<any> {
    const clients = await database.raw(
      `SELECT 
        id,
        name,
        email,
        phone,
        ST_X(coordinates::geometry) AS longitude,
        ST_Y(coordinates::geometry) AS latitude,
        company_id
      FROM clients;`
    );
    return clients.rows;
  }
  public async create(clientDto: ClientDto): Promise<any> {
    const { name, email, phone, coordinates, company_id } = clientDto;
    return await database('clients').insert({ 
      id: createId(),
      name,
      email,
      phone, 
      coordinates: database.raw('ST_SetSRID(ST_MakePoint(?, ?), 4326)', [coordinates.latitude, coordinates.longitude]),
      company_id,
    });
  }
}