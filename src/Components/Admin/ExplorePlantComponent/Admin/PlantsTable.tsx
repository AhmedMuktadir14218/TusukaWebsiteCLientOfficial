// src/components/ExplorePlantComponent/Admin/PlantsTable.tsx
import { useState, type ChangeEvent, Fragment } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, IconButton, Grid, Alert, Stack
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ImageIcon from '@mui/icons-material/Image';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import type { Plant } from '../../types/explorePlants';

// import type { Plant } from '@/pages/ExplorePlants';

interface PlantImage {
  id: number;
  image_path: string;
}

interface ManagePayload {
  plant_id: number;
  plant_name: string;
  feature_image: string | null;
  detailed_images: PlantImage[];
}

type DetailEntry = { key: string; value: string };

interface PlantsTableProps {
  unitId: number;
  plants: Plant[];
  refresh: () => void;
}

// default detail fields for new plants
const defaultDetailKeys = [
  'employees',
  'wetCapacity',
  'dryCapacity',
  'space',
  'machines',
  'locationEmbed',
  'address',
];

export const PlantsTable = ({ unitId, plants, refresh }: PlantsTableProps) => {
  // Add/Edit form state
  const [isFormOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Plant | null>(null);
  const [plantId, setPlantId] = useState('');
  const [name, setName] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [detailEntries, setDetailEntries] = useState<DetailEntry[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [formErrors, setFormErrors] = useState<string[]>([]);
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const BASE_IMAGE_URL = import.meta.env.VITE_API_IMAGE_URL;
  // Manage Images state
  const [manageData, setManageData] = useState<ManagePayload | null>(null);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [manageError, setManageError] = useState<string | null>(null);

  // Open Add/Edit modal
  function openForm(plant?: Plant) {
    setFormErrors([]);
    if (plant) {
      setEditing(plant);
      setPlantId(plant.plant_id);
      setName(plant.name);
      setShortDesc(plant.short_description);
      // seed detailEntries from plant.details
      const det = plant.details || {};
      setDetailEntries(
        Object.entries(det).map(([k, v]) => ({ key: k, value: String(v) }))
      );
    } else {
      setEditing(null);
      setPlantId('');
      setName('');
      setShortDesc('');
      // pre-populate default detail fields
      setDetailEntries(
        defaultDetailKeys.map((key) => ({ key, value: '' }))
      );
    }
    setFiles([]);
    setFormOpen(true);
  }

  // Dynamic detail handlers
  const setDetailKey = (i: number, k: string) => {
    setDetailEntries((d) => {
      const c = [...d];
      c[i].key = k;
      return c;
    });
  };
  const setDetailValue = (i: number, v: string) => {
    setDetailEntries((d) => {
      const c = [...d];
      c[i].value = v;
      return c;
    });
  };
  const addDetailField = () =>
    setDetailEntries((d) => [...d, { key: '', value: '' }]);
  const removeDetailField = (i: number) =>
    setDetailEntries((d) => d.filter((_, j) => j !== i));

  // File inputs
  const onFilesSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFiles(Array.from(e.target.files));
  };

  // Submit create/update
  async function submitPlant() {
    setFormErrors([]);
    const fd = new FormData();
    fd.append('unit_id', String(unitId));
    fd.append('plant_id', plantId);
    fd.append('name', name);
    fd.append('short_description', shortDesc);
    detailEntries.forEach(({ key, value }) => {
      if (key.trim()) fd.append(`details[${key}]`, value);
    });
    files.forEach((f) => fd.append('images[]', f));

    let url = `${API_BASE_URL }/api/explore-plants/plants`;
    if (editing) {
      fd.append('_method', 'PUT');
      url = `${API_BASE_URL }/api/explore-plants/plants/${editing.id}`;
    }

    try {
      await axios.post(url, fd);
      setFormOpen(false);
      refresh();
    } catch (e: any) {
      if (e.response?.status === 422) {
        const msgs: string[] = [];
        for (const k in e.response.data) {
          const v = e.response.data[k];
          msgs.push(...(Array.isArray(v) ? v : [String(v)]));
        }
        setFormErrors(msgs);
      } else {
        setFormErrors([e.message]);
      }
    }
  }

  // Delete plant
  async function removePlant(id: number) {
    if (!confirm('Delete this plant?')) return;
    await axios.delete(`${API_BASE_URL }/api/explore-plants/plants/${id}`);
    refresh();
  }

  // Open Manage Images modal → fetch image list
  async function openManage(plant: Plant) {
    setManageError(null);
    try {
      const res = await axios.get<ManagePayload>(
        `${API_BASE_URL }/api/explore-plants/plants/${plant.id}/images`
      );
      setManageData(res.data);
    } catch (e: any) {
      setManageError('Could not load images');
      setManageData(null);
    }
  }

  const onNewFilesSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setNewFiles(Array.from(e.target.files));
  };

  // Upload extra images
  async function uploadImages() {
    if (!manageData) return;
    if (!newFiles.length) {
      setManageError('Please select at least one image');
      return;
    }
    const fd = new FormData();
    newFiles.forEach((f) => fd.append('images[]', f));
    try {
      const res = await axios.post(
        `${API_BASE_URL }/api/explore-plants/plants/${manageData.plant_id}/add-images`,
        fd
      );
      setManageData(res.data.plant as ManagePayload);
      refresh();
    } catch (e: any) {
      setManageError(e.response?.data?.message || e.message);
    }
  }

  // Delete one image
  async function deleteImage(id: number) {
    if (!manageData) return;
    await axios.delete(
      `${API_BASE_URL }/api/explore-plants/plants/${manageData.plant_id}/images/${id}`
    );
    setManageData((md) =>
      md
        ? {
            ...md,
            detailed_images: md.detailed_images.filter(
              (img) => img.id !== id
            ),
          }
        : md
    );
    refresh();
  }

  return (
    <Fragment>
      <Button
        variant="contained"
        className="mb-4"
        onClick={() => openForm()}
      >
        Add Plant
      </Button>

      <TableContainer component={Paper} className="shadow rounded">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Plant ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {plants.map((p) => (
              <TableRow key={p.id}>
                <TableCell>{p.plant_id}</TableCell>
                <TableCell>{p.name}</TableCell>
                <TableCell>{p.short_description}</TableCell>
                <TableCell align="right" className="space-x-2">
                  <IconButton onClick={() => openForm(p)} size="small">
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton onClick={() => openManage(p)} size="small">
                    <ImageIcon fontSize="small" />
                  </IconButton>
                  <IconButton onClick={() => removePlant(p.id)} size="small">
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Dialog */}
      <Dialog open={isFormOpen} onClose={() => setFormOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>{editing ? 'Edit Plant' : 'Add Plant'}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} className="mt-2">
            {formErrors.length > 0 && (
              <Alert severity="error">
                {formErrors.map((m, i) => (
                  <div key={i}>{m}</div>
                ))}
              </Alert>
            )}
            <TextField
              label="Plant ID" fullWidth
              value={plantId} onChange={e => setPlantId(e.target.value)}
            />
            <TextField
              label="Name" fullWidth
              value={name} onChange={e => setName(e.target.value)}
            />
            <TextField
              label="Short Description" fullWidth multiline
              value={shortDesc} onChange={e => setShortDesc(e.target.value)}
            />

            <div>
              <h4 className="font-medium mb-1">Details</h4>
              <Stack spacing={1}>
                {detailEntries.map((ent, idx) => (
                  <Stack direction="row" spacing={1} key={idx} alignItems="center">
                    <TextField
                      placeholder="Key"
                      value={ent.key}
                      size="small"
                      onChange={e => setDetailKey(idx, e.target.value)}
                    />
                    <TextField
                      placeholder="Value"
                      value={ent.value}
                      size="small"
                      onChange={e => setDetailValue(idx, e.target.value)}
                    />
                    <IconButton size="small" onClick={() => removeDetailField(idx)}>
                      <RemoveCircleOutlineIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                ))}
                <Button
                  size="small"
                  startIcon={<AddIcon />}
                  onClick={addDetailField}
                >
                  Add field
                </Button>
              </Stack>
            </div>

            <div>
              <h4 className="font-medium mb-1">Upload Images</h4>
              <input type="file" multiple accept="image/*" onChange={onFilesSelected} />
            </div>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFormOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={submitPlant}>
            {editing ? 'Save Changes' : 'Add Plant'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Manage Images Dialog */}
      <Dialog open={!!manageData} onClose={() => setManageData(null)} fullWidth maxWidth="md">
        <DialogTitle>Manage Images</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            {manageError && <Alert severity="error">{manageError}</Alert>}

            <Grid container spacing={2} className="pt-2 pb-4">
              {manageData?.detailed_images.map(img => {
                // Assuming VITE_API_IMAGE_URL is the base URL like http://localhost/TusukaWebServerV6/public
                

                // Construct the full image URL
                // Check if the image_path already includes the base URL or is an absolute URL
                const src = img.image_path.startsWith('http')
                  ? img.image_path // If it's already a full URL, use it as is
                  : `${BASE_IMAGE_URL}/${img.image_path.replace(/^\/+/, '')}`; // Prepend base URL for relative paths

                return (
                  <Grid item key={img.id}>
                    <div className="relative">
                      <img src={src} alt="Plant detailed image" className="w-24 h-24 object-cover rounded" />
                      <IconButton
                        size="small"
                        className="absolute top-0 right-0 bg-white"
                        onClick={() => deleteImage(img.id)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </div>
                  </Grid>
                );
              })}
            </Grid>

            <div>
              <h4 className="font-medium mb-1">Upload New Images</h4>
              <input type="file" multiple accept="image/*" onChange={onNewFilesSelected} />
            </div>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setManageData(null)}>Close</Button>
          <Button variant="contained" onClick={uploadImages}>Upload</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};


 