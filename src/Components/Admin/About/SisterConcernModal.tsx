// SisterConcernModal.tsx
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
import type { SisterConcern } from '../types/AboutCompanyType';

interface Props {
  open: boolean;
  onClose: () => void;
  concern: SisterConcern | null;
  onSubmit: (data: Omit<SisterConcern, 'id' | 'created_at' | 'updated_at'>) => void;
}

interface FormValues {
  name: string;
  description: string;
  icon: string;
  about_company_id?: number;
}

const SisterConcernModal: React.FC<Props> = ({ open, onClose, concern, onSubmit }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>();

  useEffect(() => {
    if (concern) {
      reset({
        name: concern.name,
        description: concern.description,
        icon: concern.icon
      });
    } else {
      reset({
        name: '',
        description: '',
        icon: '',
        about_company_id: 1
      });
    }
  }, [concern, reset]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {concern ? 'Edit Sister Concern' : 'Add Sister Concern'}
      </DialogTitle>
      <form onSubmit={handleSubmit((data) => {
        // Convert form data to match the expected SisterConcern type
        const concernData: Omit<SisterConcern, 'id' | 'created_at' | 'updated_at'> = {
          about_company_id: Number(data.about_company_id) || 1,
          name: data.name,
          description: data.description,
          icon: data.icon
        };
        onSubmit(concernData);
      })}>
        <DialogContent>
          <div className="space-y-4">
            <TextField
              fullWidth
              label="Name"
              {...register('name', { required: 'Name is required' })}
              error={!!errors.name}
              helperText={errors.name?.message as string}
            />
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={4}
              {...register('description', { required: 'Description is required' })}
              error={!!errors.description}
              helperText={errors.description?.message as string}
            />
            <TextField
              fullWidth
              label="Icon (Font Awesome class)"
              {...register('icon')}
              placeholder="e.g., fas fa-building"
              helperText="Enter Font Awesome icon class (optional)"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            {concern ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default SisterConcernModal;