// MetricModal.tsx
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
import type { Metric } from '../types/AboutCompanyType';

interface Props {
  open: boolean;
  onClose: () => void;
  metric: Metric | null;
  onSubmit: (metric: Metric | Omit<Metric, 'id' | 'created_at' | 'updated_at'>) => void;
}

interface FormData {
  label: string;
  value: string;
  icon: string;
  production_capacity_id?: number;
}

const MetricModal: React.FC<Props> = ({ open, onClose, metric, onSubmit }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

  useEffect(() => {
    if (metric) {
      reset(metric);
    } else {
      reset({
        label: '',
        value: '',
        icon: ''
      });
    }
  }, [metric, reset]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {metric ? 'Edit Metric' : 'Add Metric'}
      </DialogTitle>
      <form onSubmit={handleSubmit((data) => {
        // Convert form data to match the expected Metric type
        const metricData: Omit<Metric, 'id' | 'created_at' | 'updated_at'> = {
          production_capacity_id: Number(data.production_capacity_id),
          label: data.label,
          value: data.value,
          icon: data.icon
        };
        onSubmit(metricData);
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
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            {metric ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default MetricModal;