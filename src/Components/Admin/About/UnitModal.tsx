// UnitModal.tsx
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
import type { Unit } from '../types/AboutCompanyType';

interface Props {
  open: boolean;
  onClose: () => void;
  unit: Unit | null;
  onSubmit: (unit: Omit<Unit, 'id' | 'created_at' | 'updated_at' | 'plants'> | Unit) => void;
}

interface FormData {
  title: string;
  about_company_id?: number;
}

const UnitModal: React.FC<Props> = ({ open, onClose, unit, onSubmit }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

  useEffect(() => {
    if (unit) {
      reset({
        title: unit.title
      });
    } else {
      reset({
        title: '',
        about_company_id: 1
      });
    }
  }, [unit, reset]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {unit ? 'Edit Unit' : 'Add Unit'}
      </DialogTitle>
      <form onSubmit={handleSubmit((data) => {
        // Convert form data to match the expected Unit type
        const unitData: Omit<Unit, 'id' | 'plants' | 'created_at' | 'updated_at'> = {
          about_company_id: Number(data.about_company_id) || 1,
          title: data.title
        };
        onSubmit(unitData);
      })}>
        <DialogContent>
          <div className="space-y-4">
            <TextField
              fullWidth
              label="Title"
              {...register('title', { required: 'Title is required' })}
              error={!!errors.title}
              helperText={errors.title?.message as string}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            {unit ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default UnitModal;