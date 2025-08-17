// DatasetModal.tsx
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
import type { Dataset } from '../types/AboutCompanyType';

interface Props {
  open: boolean;
  onClose: () => void;
  dataset: Dataset | null;
  onSubmit: (dataset: Dataset | Omit<Dataset, 'id' | 'created_at' | 'updated_at'>) => void;
}

interface FormData {
  label: string;
  data: number;
  background_color: string;
  border_color: string;
  border_width: number;
  order: number;
  production_capacity_id?: number;
}

const DatasetModal: React.FC<Props> = ({ open, onClose, dataset, onSubmit }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

  useEffect(() => {
    if (dataset) {
      reset(dataset);
    } else {
      reset({
        label: '',
        data: 0,
        background_color: '',
        border_color: '',
        border_width: 1,
        order: 0
      });
    }
  }, [dataset, reset]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {dataset ? 'Edit Dataset' : 'Add Dataset'}
      </DialogTitle>
      <form onSubmit={handleSubmit((data) => {
        // Convert form data to match the expected Dataset type
        const datasetData: Omit<Dataset, 'id' | 'created_at' | 'updated_at'> = {
          production_capacity_id: Number(data.production_capacity_id),
          label: data.label,
          data: Number(data.data),
          background_color: data.background_color,
          border_color: data.border_color,
          border_width: Number(data.border_width),
          order: Number(data.order)
        };
        onSubmit(datasetData);
      })}>
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
              label="Data"
              type="number"
              {...register('data', { 
                required: 'Data is required',
                valueAsNumber: true
              })}
              error={!!errors.data}
              helperText={errors.data?.message as string}
            />
            <TextField
              fullWidth
              label="Background Color"
              {...register('background_color', { required: 'Background color is required' })}
              error={!!errors.background_color}
              helperText={errors.background_color?.message as string}
            />
            <TextField
              fullWidth
              label="Border Color"
              {...register('border_color', { required: 'Border color is required' })}
              error={!!errors.border_color}
              helperText={errors.border_color?.message as string}
            />
            <TextField
              fullWidth
              label="Border Width"
              type="number"
              {...register('border_width', { 
                required: 'Border width is required',
                valueAsNumber: true
              })}
              error={!!errors.border_width}
              helperText={errors.border_width?.message as string}
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
            {dataset ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default DatasetModal;