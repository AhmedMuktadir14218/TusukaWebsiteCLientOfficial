// ProductionCapacity.tsx
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Grid,
  Button,
  IconButton,
  Typography,
} from '@mui/material';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import type { ProductionCapacity, Dataset, Metric } from '../types/AboutCompanyType';
import DatasetModal from './DatasetModal';
import MetricModal from './MetricModal';

interface Props {
  capacity: ProductionCapacity;
  onUpdateDataset: (dataset: Dataset) => void;
  onDeleteDataset: (id: number) => void;
  onAddDataset: (dataset: Omit<Dataset, 'id' | 'created_at' | 'updated_at'>) => void;
  onUpdateMetric: (metric: Metric) => void;
  onDeleteMetric: (id: number) => void;
  onAddMetric: (metric: Omit<Metric, 'id' | 'created_at' | 'updated_at'>) => void;
}

const ProductionCapacityComponent: React.FC<Props> = ({
  capacity,
  onUpdateDataset,
  onDeleteDataset,
  onAddDataset,
  onUpdateMetric,
  onDeleteMetric,
  onAddMetric,
}) => {
  const [datasetModalOpen, setDatasetModalOpen] = useState(false);
  const [metricModalOpen, setMetricModalOpen] = useState(false);
  const [selectedDataset, setSelectedDataset] = useState<Dataset | null>(null);
  const [selectedMetric, setSelectedMetric] = useState<Metric | null>(null);

  const handleDeleteDataset = (id: number) => {
    if (window.confirm('Are you sure you want to delete this dataset?')) {
      onDeleteDataset(id);
    }
  };

  const handleDeleteMetric = (id: number) => {
    if (window.confirm('Are you sure you want to delete this metric?')) {
      onDeleteMetric(id);
    }
  };

  return (
    <div className="p-4">
      <Typography variant="h4" gutterBottom>
        {capacity.title}
      </Typography>

      {/* Datasets Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <Typography variant="h5">Datasets</Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<FaPlus />}
            onClick={() => setDatasetModalOpen(true)}
          >
            Add Dataset
          </Button>
        </div>

        {capacity.datasets.length === 0 ? (
          <Typography variant="body1" color="textSecondary">
            No datasets available
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {capacity.datasets.map((dataset) => (
              <Grid component="div" item xs={12} sm={6} md={4} key={dataset.id}>
                <Card>
                  <CardContent>
                    <div className="flex justify-between items-start">
                      <div>
                        <Typography variant="h6">{dataset.label}</Typography>
                        <Typography>Value: {dataset.data}</Typography>
                        <Typography>Order: {dataset.order}</Typography>
                      </div>
                      <div>
                        <IconButton
                          onClick={() => {
                            setSelectedDataset(dataset);
                            setDatasetModalOpen(true);
                          }}
                          size="small"
                        >
                          <FaEdit />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDeleteDataset(dataset.id)}
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
      </div>

      {/* Metrics Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <Typography variant="h5">Metrics</Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<FaPlus />}
            onClick={() => setMetricModalOpen(true)}
          >
            Add Metric
          </Button>
        </div>

        {capacity.metrics.length === 0 ? (
          <Typography variant="body1" color="textSecondary">
            No metrics available
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {capacity.metrics.map((metric) => (
              <Grid component="div" item xs={12} sm={6} md={4} key={metric.id}>
                <Card>
                  <CardContent>
                    <div className="flex justify-between items-start">
                      <div>
                        <Typography variant="h6">{metric.label}</Typography>
                        <Typography>Value: {metric.value}</Typography>
                        <Typography>Icon: {metric.icon}</Typography>
                      </div>
                      <div>
                        <IconButton
                          onClick={() => {
                            setSelectedMetric(metric);
                            setMetricModalOpen(true);
                          }}
                          size="small"
                        >
                          <FaEdit />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDeleteMetric(metric.id)}
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
      </div>

      {/* Modals */}
      <DatasetModal
        open={datasetModalOpen}
        onClose={() => {
          setDatasetModalOpen(false);
          setSelectedDataset(null);
        }}
        dataset={selectedDataset}
        onSubmit={(dataset) => {
          if (selectedDataset) {
            onUpdateDataset(dataset as Dataset);
          } else {
            onAddDataset(dataset);
          }
          setDatasetModalOpen(false);
          setSelectedDataset(null);
        }}
      />

      <MetricModal
        open={metricModalOpen}
        onClose={() => {
          setMetricModalOpen(false);
          setSelectedMetric(null);
        }}
        metric={selectedMetric}
        onSubmit={(metric) => {
          if (selectedMetric) {
            onUpdateMetric(metric as Metric);
          } else {
            onAddMetric(metric);
          }
          setMetricModalOpen(false);
          setSelectedMetric(null);
        }}
      />
    </div>
  );
};

export default ProductionCapacityComponent;