// Units.tsx
import React, { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  IconButton,
  Card,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import { FaEdit, FaTrash, FaPlus, FaChevronDown } from 'react-icons/fa';
import type { Unit, Plant } from '../types/AboutCompanyType';
import UnitModal from './UnitModal';
import PlantModal from './PlantModal';

interface Props {
  units: Unit[];
  onAddUnit: (unit: Omit<Unit, 'id' | 'created_at' | 'updated_at' | 'plants'>) => void;
  onUpdateUnit: (unit: Unit) => void;
  onDeleteUnit: (id: number) => void;
  onAddPlant: (unitId: number, plant: Omit<Plant, 'id' | 'created_at' | 'updated_at' | 'details'>) => void;
  onUpdatePlant: (plant: Plant) => void;
  onDeletePlant: (id: number) => void;
}

const Units: React.FC<Props> = ({
  units,
  onAddUnit,
  onUpdateUnit,
  onDeleteUnit,
  onAddPlant,
  onUpdatePlant,
  onDeletePlant,
}) => {
  const [unitModalOpen, setUnitModalOpen] = useState(false);
  const [plantModalOpen, setPlantModalOpen] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [currentUnitId, setCurrentUnitId] = useState<number | null>(null);

  const handleDeleteUnit = (id: number) => {
    if (window.confirm('Are you sure you want to delete this unit and all its plants?')) {
      onDeleteUnit(id);
    }
  };

  const handleDeletePlant = (id: number) => {
    if (window.confirm('Are you sure you want to delete this plant?')) {
      onDeletePlant(id);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h4">Units</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<FaPlus />}
          onClick={() => {
            setSelectedUnit(null);
            setUnitModalOpen(true);
          }}
        >
          Add Unit
        </Button>
      </div>

      {units.length === 0 ? (
        <Typography variant="body1" color="textSecondary">
          No units available
        </Typography>
      ) : (
        units.map((unit) => (
          <Accordion key={unit.id} className="mb-4">
            <AccordionSummary expandIcon={<FaChevronDown />}>
              <div className="flex justify-between w-full items-center pr-8">
                <Typography variant="h6">{unit.title}</Typography>
                <div>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedUnit(unit);
                      setUnitModalOpen(true);
                    }}
                    size="small"
                  >
                    <FaEdit />
                  </IconButton>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteUnit(unit.id);
                    }}
                    size="small"
                    color="error"
                  >
                    <FaTrash />
                  </IconButton>
                </div>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <div className="mb-4">
                <Button
                  variant="outlined"
                  startIcon={<FaPlus />}
                  onClick={() => {
                    setCurrentUnitId(unit.id);
                    setSelectedPlant(null);
                    setPlantModalOpen(true);
                  }}
                >
                  Add Plant
                </Button>
              </div>
              {unit.plants.length === 0 ? (
                <Typography variant="body1" color="textSecondary">
                  No plants available for this unit
                </Typography>
              ) : (
                <Grid container spacing={3}>
                  {unit.plants.map((plant) => (
                    <Grid component="div" item xs={12} md={6} key={plant.id}>
                      <Card>
                        <CardContent>
                          <div className="flex justify-between mb-2">
                            <Typography variant="subtitle1">{plant.name}</Typography>
                            <div>
                              <IconButton
                                onClick={() => {
                                  setSelectedPlant(plant);
                                  setPlantModalOpen(true);
                                }}
                                size="small"
                              >
                                <FaEdit />
                              </IconButton>
                              <IconButton
                                onClick={() => handleDeletePlant(plant.id)}
                                size="small"
                                color="error"
                              >
                                <FaTrash />
                              </IconButton>
                            </div>
                          </div>
                          {plant.details.map((detail) => (
                            <Typography key={detail.id} variant="body2">
                              <span className="font-semibold">{detail.key}:</span> {detail.value}
                            </Typography>
                          ))}
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}
            </AccordionDetails>
          </Accordion>
        ))
      )}

      <UnitModal
        open={unitModalOpen}
        onClose={() => {
          setUnitModalOpen(false);
          setSelectedUnit(null);
        }}
        unit={selectedUnit}
        onSubmit={(unit) => {
          if (selectedUnit) {
            onUpdateUnit(unit as Unit);
          } else {
            onAddUnit(unit);
          }
          setUnitModalOpen(false);
          setSelectedUnit(null);
        }}
      />

      <PlantModal
        open={plantModalOpen}
        onClose={() => {
          setPlantModalOpen(false);
          setSelectedPlant(null);
          setCurrentUnitId(null);
        }}
        plant={selectedPlant}
        onSubmit={(plant) => {
          if (selectedPlant) {
            onUpdatePlant(plant as Plant);
          } else if (currentUnitId) {
            onAddPlant(currentUnitId, plant);
          }
          setPlantModalOpen(false);
          setSelectedPlant(null);
          setCurrentUnitId(null);
        }}
      />
    </div>
  );
};

export default Units;