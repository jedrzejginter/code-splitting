import { apiClient } from "../../api";

export function getSingleString({ query }) {
  return apiClient.get('/v2/address/single-string', {
    params: { query },
  });
}
