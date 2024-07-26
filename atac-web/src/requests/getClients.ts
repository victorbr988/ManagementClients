import instance from "@/libs/axios";

export async function getClients() {
  return await instance.get("/clients").then((clients) => clients.data);
}