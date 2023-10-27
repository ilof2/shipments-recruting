import { motion } from 'framer-motion';
import z, { ZodFormattedError } from 'zod';
import Button from '../components/form/Button';
import Input from '../components/form/Input';
import { Shipment } from '../lib/api/getShipments';
import { FormEvent, useState } from 'react';

const schema = z.object({
  number: z
    .string()
    .min(1, { message: 'Required' })
    .max(32, { message: 'Maximum length is 32' }),
  originAddress: z
    .string()
    .min(1, { message: 'Required' })
    .max(300, { message: 'Maximum length is 300' }),
  destinationAddress: z
    .string()
    .min(1, { message: 'Required' })
    .max(300, { message: 'Maximum length is 300' }),
});

export type ShipmentForm = z.infer<typeof schema>;

export interface ShipmentCardFormProps {
  shipment?: Shipment;
  className?: string;
  acceptLabel: string;
  onAccept: (data: ShipmentForm) => void;
  onCancel: () => void;
}

export default function ShipmentCardForm({
  shipment,
  className,
  acceptLabel,
  onAccept,
  onCancel,
}: ShipmentCardFormProps) {
  const [form, setForm] = useState<ShipmentForm>({
    number: shipment?.number ?? '',
    destinationAddress: shipment?.destinationAddress ?? '',
    originAddress: shipment?.originAddress ?? '',
  });
  const [formErrors, setFormErrors] = useState<
    ZodFormattedError<ShipmentForm> | undefined
  >();

  const onFormChange = (form: ShipmentForm) => {
    setForm(form);
    validate(form);
  };

  const validate = (shipmentForm?: ShipmentForm) => {
    const result = schema.safeParse(shipmentForm ?? form);

    if (!result.success) {
      setFormErrors(result.error.format());
    } else {
      setFormErrors(undefined);
    }

    return result.success;
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    onAccept(form);
  };

  return (
    <motion.form
      initial={{ opacity: 0.5, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-4 bg-zinc-700 rounded h-full flex flex-col justify-between min-h-[420px] ${className}`}
      onSubmit={onSubmit}
    >
      <div className="space-y-4 mb-4">
        <h2 className="text-lg mb-2">{acceptLabel} shipment</h2>
        <Input
          value={form.number}
          onChange={(e) => onFormChange({ ...form, number: e.target.value })}
          label="Number"
          error={formErrors?.number?._errors[0]}
        />
        <Input
          value={form.originAddress}
          onChange={(e) =>
            onFormChange({ ...form, originAddress: e.target.value })
          }
          label="Origin address"
          error={formErrors?.originAddress?._errors[0]}
        />
        <Input
          value={form.destinationAddress}
          onChange={(e) =>
            onFormChange({ ...form, destinationAddress: e.target.value })
          }
          label="Destination address"
          error={formErrors?.destinationAddress?._errors[0]}
        />
      </div>
      <div className="flex gap-4">
        <Button type="submit">{acceptLabel}</Button>
        <Button
          className="bg-zinc-200 text-black"
          type="reset"
          onClick={onCancel}
        >
          Cancel
        </Button>
      </div>
    </motion.form>
  );
}
