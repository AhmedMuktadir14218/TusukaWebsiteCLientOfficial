// SisterConcerns.tsx
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Grid,
  IconButton,
  Button,
  Typography,
} from '@mui/material';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import type { SisterConcern } from '../types/AboutCompanyType';
import SisterConcernModal from './SisterConcernModal';

interface Props {
  concerns: SisterConcern[];
  onDelete: (id: number) => void;
  onAdd: (data: Omit<SisterConcern, 'id' | 'created_at' | 'updated_at'>) => void;
  onUpdate: (data: SisterConcern) => void;
}

const SisterConcerns: React.FC<Props> = ({ concerns, onDelete, onAdd, onUpdate }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedConcern, setSelectedConcern] = useState<SisterConcern | null>(null);

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this sister concern?')) {
      onDelete(id);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h4">Sister Concerns</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<FaPlus />}
          onClick={() => {
            setSelectedConcern(null);
            setModalOpen(true);
          }}
        >
          Add Sister Concern
        </Button>
      </div>

      {concerns.length === 0 ? (
        <Typography variant="body1" color="textSecondary">
          No sister concerns available
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {concerns.map((concern) => (
            <Grid component="div" item xs={12} sm={6} md={4} key={concern.id}>
              <Card>
                <CardContent>
                  <div className="flex justify-between items-start">
                    <div>
                      <Typography variant="h6">{concern.name}</Typography>
                      <Typography variant="body2" className="mt-2">
                        {concern.description}
                      </Typography>
                      {concern.icon && (
                        <div className="mt-2">
                          <Typography variant="caption">Icon:</Typography>
                          <Typography variant="body2">{concern.icon}</Typography>
                        </div>
                      )}
                    </div>
                    <div>
                      <IconButton
                        onClick={() => {
                          setSelectedConcern(concern);
                          setModalOpen(true);
                        }}
                        size="small"
                      >
                        <FaEdit />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDelete(concern.id)}
                        size="small"
                        color="error"
                      >
                        <FaTrash />
                      </IconButton>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <SisterConcernModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedConcern(null);
        }}
        concern={selectedConcern}
        onSubmit={(data) => {
          if (selectedConcern) {
            onUpdate({
              ...data,
              id: selectedConcern.id,
              about_company_id: selectedConcern.about_company_id
            } as SisterConcern);
          } else {
            onAdd(data);
          }
          setModalOpen(false);
          setSelectedConcern(null);
        }}
      />
    </div>
  );
};

export default SisterConcerns;