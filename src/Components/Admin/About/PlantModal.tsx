// resources/js/components/PlantModal.tsx
import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  IconButton,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import type { Plant, PlantDetail } from '../types/AboutCompanyType';
import { FaPlus, FaTrash } from 'react-icons/fa';

interface Props {
  open: boolean;
  onClose: () => void;
  plant: Plant | null;
  onSubmit: (plant: Omit<Plant, 'id' | 'created_at' | 'updated_at'> | Plant) => void;
}

const PlantModal: React.FC<Props> = ({ open, onClose, plant, onSubmit }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [details, setDetails] = useState<Partial<PlantDetail>[]>([]);

  useEffect(() => {
    if (plant) {
      reset(plant);
      setDetails(plant.details);
    } else {
      reset({});
      setDetails([]);
    }
  }, [plant, reset]);

  const addDetail = () => {
    setDetails([...details, { key: '', value: '' }]);
  };

  const removeDetail = (index: number) => {
    setDetails(details.filter((_, i) => i !== index));
  };

  const updateDetail = (index: number, field: 'key' | 'value', value: string) => {
    const newDetails = [...details];
    newDetails[index] = { ...newDetails[index], [field]: value };
    setDetails(newDetails);
  };

  const onSubmitForm = (data: any) => {
    // Convert form data to match the expected Plant type
    const plantData: Omit<Plant, 'id' | 'created_at' | 'updated_at'> = {
      name: data.name,
      unit_id: Number(data.unit_id),
      image_path: null,
      details: details.map(detail => ({
        id: detail.id || 0,
        plant_id: detail.plant_id || 0,
        key: detail.key || '',
        value: detail.value || '',
        created_at: detail.created_at || '',
        updated_at: detail.updated_at || ''
      })) as PlantDetail[],
    };
    onSubmit(plantData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {plant ? 'Edit Plant' : 'Add Plant'}
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <DialogContent>
          <div className="space-y-4">
            <TextField
              fullWidth
              label="Name"
              {...register('name', { required: 'Name is required' })}
              error={!!errors.name}
              helperText={errors.name?.message as string}
            />

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Details</h3>
                <Button
                  startIcon={<FaPlus />}
                  onClick={addDetail}
                  variant="outlined"
                  size="small"
                >
                  Add Detail
                </Button>
              </div>

              {details.map((detail, index) => (
                <div key={index} className="flex gap-2 items-start">
                  <TextField
                    label="Key"
                    value={detail.key}
                    onChange={(e) => updateDetail(index, 'key', e.target.value)}
                    size="small"
                  />
                  <TextField
                    label="Value"
                    value={detail.value}
                    onChange={(e) => updateDetail(index, 'value', e.target.value)}
                    size="small"
                  />
                  <IconButton
                    onClick={() => removeDetail(index)}
                    color="error"
                    size="small"
                  >
                    <FaTrash />
                  </IconButton>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            {plant ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default PlantModal;