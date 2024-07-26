import { ClientDto } from '@/dtos/client.dto';
import { IClientsModel } from '@/models/interface/IClientsModel';
import { z } from 'zod';

const clientSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  coordinates: z.object({
    latitude: z.coerce.number(),
    longitude: z.coerce.number(),
  }),
  company_id: z.string(),
});

export class ClientsService {
  private readonly clientsModel: IClientsModel;
  
  constructor(clientsModel: IClientsModel) {
    this.clientsModel = clientsModel;
  }
  public async getAll(): Promise<ClientDto[]> {
    return await this.clientsModel.getAll();
  }
  
  public async create(client: ClientDto): Promise<void> {
    const clientDto = clientSchema.parse(client);
    try {
      await this.clientsModel.create(clientDto as ClientDto);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
