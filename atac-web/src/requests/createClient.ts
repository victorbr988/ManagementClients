import { Client } from "@/interfaces/client";
import instance from "@/libs/axios";

export async function createClient(data: Pick<Client, 'name' | 'latitude' | 'longitude' | 'email' | 'phone'>) {
  const body = {
    name: data.name,
    coordinates: {
      latitude: data.latitude,
      longitude: data.longitude
    },
    email: data.email,
    phone: data.phone,
    company_id: "wdweguc4vaaobhx14hskk5uz"
  }
  await instance.post('/clients/create', body)
}