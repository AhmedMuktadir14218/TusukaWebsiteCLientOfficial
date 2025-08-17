// BankingPartnerModal.tsx
import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import type { BankingPartner } from '../types/AboutCompanyType';


interface Props {
  open: boolean;
  onClose: () => void;
  partner: BankingPartner | null;
  onSubmit: (data: FormData) => void;
}

interface FormValues {
  name: string;
  image?: FileList;
}

const BankingPartnerModal: React.FC<Props> = ({ open, onClose, partner, onSubmit }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (partner) {
      reset({
        name: partner.name
      });
      setImagePreview(partner.image_path);
    } else {
      reset({
        name: ''
      });
      setImagePreview(null);
    }
    setImageFile(null);
  }, [partner, reset]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmitForm = (data: FormValues) => {
    const formData = new FormData();
    formData.append('name', data.name);
    if (imageFile) {
      formData.append('image', imageFile);
    } else if (!partner && !imageFile) {
      // No image provided for new partner
      alert('Please upload an image');
      return;
    }

    onSubmit(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {partner ? 'Edit Banking Partner' : 'Add Banking Partner'}
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

            <div>
              <input
                type="file"
                accept="image/*"
                id="bank-logo"
                onChange={handleImageChange}
                className="hidden"
                // ref={register().ref}
              />
              <label htmlFor="bank-logo">
                <Button
                  variant="outlined"
                  component="span"
                  fullWidth
                >
                  {imagePreview ? 'Change Logo' : 'Upload Logo'}
                </Button>
              </label>
              {imagePreview && (
                <div className="mt-2">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-h-20 object-contain"
                  />
                </div>
              )}
              {!imagePreview && !partner && (
                <Typography variant="body2" color="error" className="mt-1">
                  Logo is required
                </Typography>
              )}
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            {partner ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default BankingPartnerModal;