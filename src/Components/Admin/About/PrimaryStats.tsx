// PrimaryStats.tsx
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
} from '@mui/material';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa'; 
import PrimaryStatModal from './PrimaryStatModal';
import type { PrimaryStat } from '../types/AboutCompanyType';

interface Props {
  stats: PrimaryStat[];
  onDelete: (id: number) => void;
  onAdd: (stat: Omit<PrimaryStat, 'id' | 'created_at' | 'updated_at'>) => void;
  onUpdate: (stat: PrimaryStat) => void;
}

const PrimaryStats: React.FC<Props> = ({ stats, onDelete, onAdd, onUpdate }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStat, setSelectedStat] = useState<PrimaryStat | null>(null);

  const handleEdit = (stat: PrimaryStat) => {
    setSelectedStat(stat);
    setModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedStat(null);
    setModalOpen(true);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">Primary Stats</h2>
        <Button
          variant="contained"
          color="primary"
          startIcon={<FaPlus />}
          onClick={handleAdd}
        >
          Add New Stat
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Label</TableCell>
              <TableCell>Value</TableCell>
              <TableCell>Icon</TableCell>
              <TableCell>Order</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stats.map((stat) => (
              <TableRow key={stat.id}>
                <TableCell>{stat.label}</TableCell>
                <TableCell>{stat.value}</TableCell>
                <TableCell>{stat.icon}</TableCell>
                <TableCell>{stat.order}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(stat)} color="primary">
                    <FaEdit />
                  </IconButton>
                  <IconButton onClick={() => onDelete(stat.id)} color="error">
                    <FaTrash />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <PrimaryStatModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        stat={selectedStat}
        onSubmit={(stat) => {
          if (selectedStat) {
            onUpdate(stat as PrimaryStat);
          } else {
            // Ensure all required fields are present
            onAdd({
              label: stat.label || '',
              value: stat.value || '',
              icon: stat.icon || '',
              order: stat.order || 0,
              about_company_id: 1 // Default about_company_id
            });
          }
          setModalOpen(false);
        }}
      />
    </div>
  );
};

export default PrimaryStats;