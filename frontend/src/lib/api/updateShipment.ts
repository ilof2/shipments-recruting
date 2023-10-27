import { API_HOST } from '../env';

export interface UpdateShipmentRequest {
  id: number;
  number?: string;
  originAddress?: string;
  destinationAddress?: string;
}

export default function updateShipment(data: UpdateShipmentRequest) {
  return fetch(`${API_HOST}/shipments/${data.id}/`, {
    method: 'PUT',
    body: JSON.stringify({
      number: data.number,
      origin_address: data.originAddress,
      destination_address: data.destinationAddress,
    }),
    headers: { 'Content-type': 'application/json' },
  });
}
