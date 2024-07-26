import { ClientDto } from '@/dtos/client.dto';
import { IClientsService } from '@/services/interfaces/IClientsService';
import { Request, Response } from 'express';
import { IClientsController } from './interfaces/IClientsController';

export class ClientsController implements IClientsController {
  private readonly clientsService: IClientsService;

  constructor(clientsService: IClientsService) {
    this.clientsService = clientsService;
  }

  public async create(req: Request, res: Response) {
    const client: ClientDto = req.body;
    try {
      await this.clientsService.create(client);
      return res.status(201).json(client);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  public async getAll(_req: Request, res: Response) {
    try {
      const clients = await this.clientsService.getAll();
      return res.status(200).json(clients);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}