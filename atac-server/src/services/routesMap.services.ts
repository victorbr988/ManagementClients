import { IRoutesMapModel } from '@/models/interface/IRoutesMapModel';
import { IRoutesMapService } from '@services/interfaces/IRoutesMapService';

export class RoutesMapService implements IRoutesMapService {
  private readonly routesMapModel: IRoutesMapModel;

  constructor(routesMapModel: IRoutesMapModel) {
    this.routesMapModel = routesMapModel;
  }

  public async getRoutes(): Promise<any> {
    return await this.routesMapModel.getRoutes();
  }
}