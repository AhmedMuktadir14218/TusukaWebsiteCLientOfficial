// SecondaryStatModal.tsx
import React, { useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import type { SecondaryStat } from '../types/AboutCompanyType';

interface Props {
  open: boolean;
  onClose: () => void;
  stat: SecondaryStat | null;
  onSubmit: (stat: Omit<SecondaryStat, 'id' | 'created_at' | 'updated_at'> | SecondaryStat) => void;
}

interface FormData {
  label: string;
  value: string;
  icon: string;
  order: number;
  about_company_id?: number;
}

const SecondaryStatModal: React.FC<Props> = ({ open, onClose, stat, onSubmit }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

  useEffect(() => {
    if (stat) {
      reset(stat);
    } else {
      reset({
        label: '',
        value: '',
        icon: '',
        order: 0,
        about_company_id: 1
      });
    }
  }, [stat, reset]);

  const onSubmitForm = (data: FormData) => {
    onSubmit({
      ...data,
      about_company_id: stat?.about_company_id || 1,
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {stat ? 'Edit Secondary Stat' : 'Add Secondary Stat'}
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <DialogContent>
          <div className="space-y-4">
            <TextField
              fullWidth
              label="Label"
              {...register('label', { required: 'Label is required' })}
              error={!!errors.label}
              helperText={errors.label?.message as string}
            />
            <TextField
              fullWidth
              label="Value"
              {...register('value', { required: 'Value is required' })}
              error={!!errors.value}
              helperText={errors.value?.message as string}
            />
            <TextField
              fullWidth
              label="Icon"
              {...register('icon', { required: 'Icon is required' })}
              error={!!errors.icon}
              helperText={errors.icon?.message as string}
            />
            <TextField
              fullWidth
              label="Order"
              type="number"
              {...register('order', { 
                required: 'Order is required',
                valueAsNumber: true
              })}
              error={!!errors.order}
              helperText={errors.order?.message as string}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            {stat ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default SecondaryStatModal;