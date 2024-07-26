import { Request, Response } from 'express';

export interface IClientsController {
  getAll(req: Request, res: Response): Promise<Response<any>>;
  create(req: Request, res: Response): Promise<Response<any>>;
}