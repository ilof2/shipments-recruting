import { API_HOST } from '../env';

export default function deleteShipment(id: number) {
  return fetch(`${API_HOST}/shipments/${id}`, {method: "DELETE"})
}