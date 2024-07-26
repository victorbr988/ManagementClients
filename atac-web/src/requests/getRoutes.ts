import instance from "@/libs/axios";

export async function getRoutes() {
  return await instance.get("/map/routes-calculation").then((routes) => routes.data);
}