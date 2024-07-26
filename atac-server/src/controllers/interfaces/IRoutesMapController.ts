import { Request, Response } from 'express';

export interface IRoutesMapController {
  getRoutesMap(req: Request, res: Response): Promise<Response<any>>;
}