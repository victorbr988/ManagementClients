import { ClientDto } from '@/dtos/client.dto';

export interface IClientsModel {
  getAll(): Promise<ClientDto[]>;
  create(client: ClientDto): Promise<void>;
}