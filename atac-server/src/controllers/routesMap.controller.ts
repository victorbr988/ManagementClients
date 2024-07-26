import { Request, Response } from 'express';
import { RoutesMapService } from '@services/routesMap.services';
import { IRoutesMapService } from '@/services/interfaces/IRoutesMapService';
import { IRoutesMapController } from '@controllers/interfaces/IRoutesMapController';

export class RoutesMapController implements IRoutesMapController {
  private readonly routesMapService: IRoutesMapService;

  constructor(routesMapService: RoutesMapService) {
    this.routesMapService = routesMapService;
  }

  public async getRoutesMap(_req: Request, res: Response) {
    try {
      const routesMap = await this.routesMapService.getRoutes();
      return res.status(200).json(routesMap);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}