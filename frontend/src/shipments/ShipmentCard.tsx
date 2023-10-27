import { motion } from 'framer-motion';
import Button from '../components/form/Button';
import { Shipment } from '../lib/api/getShipments';

export interface ShipmentCardProps extends Shipment {
  onDelete: () => void;
  onClick: () => void;
}

export default function ShipmentCard({
  number,
  destinationAddress,
  originAddress,
  onDelete,
  onClick,
}: ShipmentCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      className="bg-zinc-800 p-4 space-y-4 rounded min-h-[420px] flex flex-col justify-between"
      onClick={onClick}
    >
      <div className="space-y-4">
        <h3 className="text-lg">Shipment #{number}</h3>

        <div>
          <div>Origin</div>
          <div>{originAddress}</div>
        </div>

        <div>
          <div>Destination</div>
          <div>{destinationAddress}</div>
        </div>
      </div>

      <div>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="bg-red-600"
        >
          Delete
        </Button>
      </div>
    </motion.div>
  );
}
