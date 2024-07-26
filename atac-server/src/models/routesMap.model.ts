import { IRoutesMapModel } from './interface/IRoutesMapModel';
import { database } from '@models/database.config';
import { ClientsEntity } from './entities/clients.entity';

export class RoutesMapModel implements IRoutesMapModel {
  public async getRoutes(): Promise<any> {
    try {
      const clients = await database.raw(`
        SELECT 
          ST_X(coordinates::geometry) AS latitude,
          ST_Y(coordinates::geometry) AS longitude
        FROM clients
      `);
      const company = await database.raw(`
        SELECT 
          ST_X(coordinates::geometry) AS latitude,
          ST_Y(coordinates::geometry) AS longitude
        FROM company
      `);
      const companyCoords = {
        latitude: company.rows[0].latitude,
        longitude: company.rows[0].longitude
      };

      const coordinates = clients.rows.map((c: ClientsEntity) => [c.latitude, c.longitude]);
      coordinates.unshift([companyCoords.latitude, companyCoords.longitude]);

      const route = this.tspSolver(coordinates);

      return route;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  private calculateDistance(coord1: number[], coord2: number[]): number {
    const dx = coord1[0] - coord2[0];
    const dy = coord1[1] - coord2[1];
    return Math.sqrt(dx * dx + dy * dy);
  }
  private tspSolver(points: number[][]): number[][] {
    const n = points.length;
    const visited = new Array(n).fill(false);
    // eslint-disable-next-line prefer-const
    let route: number[][] = [];
    let currentIndex = 0;
  
    route.push(points[currentIndex]);
    visited[currentIndex] = true;
  
    while (route.length < n) {
      let nearestDistance = Infinity;
      let nearestIndex = -1;
  
      for (let i = 0; i < n; i++) {
        if (!visited[i]) {
          const distance = this.calculateDistance(points[currentIndex], points[i]);
          if (distance < nearestDistance) {
            nearestDistance = distance;
            nearestIndex = i;
          }
        }
      }
  
      route.push(points[nearestIndex]);
      visited[nearestIndex] = true;
      currentIndex = nearestIndex;
    }
  
    // Volta para o ponto inicial
    route.push(points[0]);
  
    return route;
  }
}
