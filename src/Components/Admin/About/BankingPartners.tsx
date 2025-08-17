// BankingPartners.tsx
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
import type { BankingPartner } from '../types/AboutCompanyType';
import BankingPartnerModal from './BankingPartnerModal';

interface Props {
  partners: BankingPartner[];
  onDelete: (id: number) => void;
  onAdd: (data: FormData) => void;
  onUpdate: (id: number, data: FormData) => void;
}

const BankingPartners: React.FC<Props> = ({ partners, onDelete, onAdd, onUpdate }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<BankingPartner | null>(null);

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this banking partner?')) {
      onDelete(id);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h4">Banking Partners</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<FaPlus />}
          onClick={() => {
            setSelectedPartner(null);
            setModalOpen(true);
          }}
        >
          Add Partner
        </Button>
      </div>

      {partners.length === 0 ? (
        <Typography variant="body1" color="textSecondary">
          No banking partners available
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {partners.map((partner) => (
            <Grid component="div" item xs={12} sm={6} md={4} key={partner.id}>
              <Card>
                <CardContent>
                  <div className="flex justify-between items-start">
                    <div>
                      <Typography variant="h6">{partner.name}</Typography>
                      {partner.image_path && (
                        <img
                          src={partner.image_path}
                          alt={partner.name}
                          className="mt-2 max-h-20 object-contain"
                        />
                      )}
                    </div>
                    <div>
                      <IconButton
                        onClick={() => {
                          setSelectedPartner(partner);
                          setModalOpen(true);
                        }}
                        size="small"
                      >
                        <FaEdit />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDelete(partner.id)}
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

      <BankingPartnerModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedPartner(null);
        }}
        partner={selectedPartner}
        onSubmit={(data) => {
          if (selectedPartner) {
            onUpdate(selectedPartner.id, data);
          } else {
            onAdd(data);
          }
          setModalOpen(false);
          setSelectedPartner(null);
        }}
      />
    </div>
  );
};

export default BankingPartners;