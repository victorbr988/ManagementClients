interface ICordiantes {
  latitude: number;
  longitude: number;
}

export interface ClientDto {
  name: string;
  email: string;
  phone: string;
  coordinates: ICordiantes;
  company_id: string;
}