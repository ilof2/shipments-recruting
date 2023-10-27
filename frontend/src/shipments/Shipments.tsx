import { useQuery, useMutation } from 'react-query';
import getShipments, { Shipment } from '../lib/api/getShipments';
import deleteShipment from '../lib/api/deleteShipment';
import { queryClient } from '../lib/queryClient';
import ShipmentCard from './ShipmentCard';
import ShipmentCardForm, { ShipmentForm } from './ShipmentCardForm';
import { useState } from 'react';
import Button from '../components/form/Button';
import createShipment, {
  CreateShipmentRequest,
} from '../lib/api/createShipment';
import updateShipment, {
  UpdateShipmentRequest,
} from '../lib/api/updateShipment';

export default function Shipments() {
  const [isCreateVisible, setIsCreateVisible] = useState(false);
  const [selectedCard, setSelectedCard] = useState<Shipment | undefined>();

  const { data: shipments } = useQuery({
    queryKey: ['shipments'],
    queryFn: getShipments,
  });

  const { mutate: deleteMutation } = useMutation({
    mutationFn: (id: number) => deleteShipment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shipments'] });
    },
  });

  const { mutate: createMutation } = useMutation({
    mutationFn: (data: CreateShipmentRequest) => createShipment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shipments'] });
    },
  });

  const { mutate: updateMutation } = useMutation({
    mutationFn: (data: UpdateShipmentRequest) => updateShipment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shipments'] });
    },
  });

  const onCreate = async (data: ShipmentForm) => {
    await createMutation(data);
    setIsCreateVisible(false);
  };

  const onUpdate = async (data: ShipmentForm) => {
    await updateMutation({ ...data, id: selectedCard!.id });
    setSelectedCard(undefined);
  };

  const onCreateCancel = () => {
    setIsCreateVisible(false);
  };

  const onUpdateCancel = () => {
    setSelectedCard(undefined);
  };

  if (!shipments) {
    return 'loading';
  }

  return (
    <div className="m-8">
      <div className="flex gap-4 items-center mb-8 ">
        <h1 className="text-xl">Shipments</h1>

        {!isCreateVisible && (
          <Button
            onClick={() => {
              setSelectedCard(undefined);
              setIsCreateVisible(true);
            }}
          >
            Add new
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-8">
        {isCreateVisible && (
          <ShipmentCardForm
            onAccept={onCreate}
            onCancel={onCreateCancel}
            acceptLabel="Create"
          />
        )}
        {shipments.map((shipment) =>
          selectedCard?.id === shipment.id ? (
            <ShipmentCardForm
              key={shipment.id}
              shipment={shipment}
              onAccept={onUpdate}
              onCancel={onUpdateCancel}
              acceptLabel="Update"
            />
          ) : (
            <ShipmentCard
              key={shipment.id}
              {...shipment}
              onDelete={() => deleteMutation(shipment.id)}
              onClick={() => {
                setSelectedCard(shipment);
                setIsCreateVisible(false);
              }}
            />
          )
        )}
      </div>
    </div>
  );
}
