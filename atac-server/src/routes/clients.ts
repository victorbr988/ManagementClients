import express from 'express';
import { Request, Response } from 'express';
import { ClientsService } from '@/services/clients.services';
import { ClientsModel } from '@/models/clients.models';
import { ClientsController } from '@/controllers/clients.controller';

// models
const clientsModel = new ClientsModel();

// inject models
const clientsService = new ClientsService(clientsModel);

// inject Services
const clientsController = new ClientsController(clientsService);

export const routerClients = express.Router();
routerClients.get('/', (req: Request, res: Response) => clientsController.getAll(req, res));

routerClients.post('/create', (req: Request, res: Response) => clientsController.create(req, res));
