import { apiClient } from "../../api";

export async function getDefaultMenu() {
  const r = await apiClient.get('/v2/default-restaurant/menu/DELIVERY');
  const { menu } = r.data;
  return { menu };
}
