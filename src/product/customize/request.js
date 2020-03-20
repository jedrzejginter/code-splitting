import { apiClient } from "../../api";

export function requestNewProduct({ product, restaurantId }) {
  return apiClient.put(
    `/v1/product/configuration/details/${restaurantId}/DELIVERY`,
    { currentProduct: product, choosenModification: {} }
  );
}
