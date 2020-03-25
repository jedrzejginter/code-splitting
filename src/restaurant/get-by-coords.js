import { apiClient } from '@/api';

export function getRestaurantByGeolocation({ channel, lat, lng }) {
  return apiClient.get(`/v1/restaurants/by-coordinates/${lng}/${lat}/${channel}`);
}
