import z from 'zod';
import camelize from '../camelize';

import { API_HOST } from '../env';

export enum ShipmentStatus {
  Added = 'Added',
  Shipping = 'Shipping',
  Shipped = 'Shipped',
}

const shipmentSchema = z
  .object({
    id: z.number(),
    number: z.string(),
    origin_address: z.string(),
    destination_address: z.string(),
    status: z.nativeEnum(ShipmentStatus),
    created_at: z.string(),
    updated_at: z.string(),
  })
  .transform(camelize);

export const schema = z.array(shipmentSchema);

export type Shipment = z.infer<typeof shipmentSchema>;
export type GetShipmentsResponse = z.infer<typeof schema>;

export default function getShipments() {
  return fetch(`${API_HOST}/shipments/`)
    .then((res) => res.json())
    .then((res) => schema.parse(res))
    .then((res) => res.reverse());
}
