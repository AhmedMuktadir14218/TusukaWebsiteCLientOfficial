// SecondaryStats.tsx
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
import type { SecondaryStat } from '../types/AboutCompanyType';
import SecondaryStatModal from './SecondaryStatModal';

interface Props {
  stats: SecondaryStat[];
  onDelete: (id: number) => void;
  onAdd: (stat: Omit<SecondaryStat, 'id' | 'created_at' | 'updated_at'>) => void;
  onUpdate: (stat: SecondaryStat) => void;
}

const SecondaryStats: React.FC<Props> = ({ stats, onDelete, onAdd, onUpdate }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStat, setSelectedStat] = useState<SecondaryStat | null>(null);

  const handleEdit = (stat: SecondaryStat) => {
    setSelectedStat(stat);
    setModalOpen(true);
  };

  const handleAddNew = () => {
    setSelectedStat(null);
    setModalOpen(true);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">Secondary Stats</h2>
        <Button
          variant="contained"
          color="primary"
          startIcon={<FaPlus />}
          onClick={handleAddNew}
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
                  <IconButton 
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete this stat?')) {
                        onDelete(stat.id);
                      }
                    }} 
                    color="error"
                  >
                    <FaTrash />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <SecondaryStatModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        stat={selectedStat}
        onSubmit={(stat) => {
          if (selectedStat) {
            onUpdate(stat as SecondaryStat);
          } else {
            onAdd(stat);
          }
          setModalOpen(false);
        }}
      />
    </div>
  );
};

export default SecondaryStats;