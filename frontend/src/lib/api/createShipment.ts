import { API_HOST } from '../env';

export interface CreateShipmentRequest {
  number: string;
  originAddress: string;
  destinationAddress: string;
}

export default function createShipment(data: CreateShipmentRequest) {
  return fetch(`${API_HOST}/shipments/`, {
    method: 'POST',
    body: JSON.stringify({
      number: data.number,
      origin_address: data.originAddress,
      destination_address: data.destinationAddress,
    }),
    headers: { 'Content-type': 'application/json' },
  });
}
