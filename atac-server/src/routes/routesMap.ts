import { RoutesMapController } from '@/controllers/routesMap.controller';
import { RoutesMapModel } from '@/models/routesMap.model';
import { RoutesMapService } from '@/services/routesMap.services';
import express, { Request, Response } from 'express';

// models
const routesMapModel = new RoutesMapModel();

// inject models
const routesMapService = new RoutesMapService(routesMapModel);

// inject Services
const routesMapController = new RoutesMapController(routesMapService);

export const routesMap = express.Router();
routesMap.get('/routes-calculation', (req: Request, res: Response) => routesMapController.getRoutesMap(req, res));
