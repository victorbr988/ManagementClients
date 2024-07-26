import { ClientDto } from '@/dtos/client.dto';

export interface IClientsService {
  getAll(): Promise<ClientDto[]>;
  create(client: ClientDto): Promise<void>;
}