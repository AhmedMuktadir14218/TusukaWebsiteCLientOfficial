// resources/js/components/LabComponents/ServicesSection.tsx
import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Modal,
  Box,
  TextField,
  Typography,
  IconButton,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
 
  Grid
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Close as CloseIcon,
  Add as AddIcon,
  Delete as DeleteIcon
} from '@mui/icons-material'; 
import axios from 'axios';

interface Service {
  iconType: string;
  title: string;
  description: string;
}

const ServicesSection: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editService, setEditService] = useState<Service>({
    iconType: '',
    title: '',
    description: ''
  });
  const [saving, setSaving] = useState(false);
  const [serviceDialogOpen, setServiceDialogOpen] = useState(false);
  const [newService, setNewService] = useState<Service>({
    iconType: '',
    title: '',
    description: ''
  });

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


  // Modified getIntro to align with the expected IntroData structure
  const getServices = async (): Promise<Service> => {
    const response = await axios.get(`${API_BASE_URL}/api/tusuka-lab/sections/services`);
    return response.data;
  };

  // Modified updateIntro to accept FormData for a combined update (recommended if your backend handles it)
  // OR, if your backend expects JSON for text and separate endpoint for image,
  // then you'd have two separate update functions.
  const updateServicesSection = async (data: FormData | { title: string; paragraphs: string[] }): Promise<{ message: string }> => {
    if (data instanceof FormData) {
      // Assuming your backend can parse FormData for all fields
      const response = await axios.post(`${API_BASE_URL}/api/tusuka-lab/sections/services`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } else {
      // This is for JSON update of text fields, if image is handled separately
      const response = await axios.post(`${API_BASE_URL}/api/tusuka-lab/sections/services`, data);
      return response.data;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getServices();
      setServices(data);
    } catch (error) {
      console.error('Error fetching services data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddService = () => {
    setNewService({
      iconType: '',
      title: '',
      description: ''
    });
    setServiceDialogOpen(true);
  };

  const handleSaveNewService = async () => {
    if (newService.title.trim() && newService.description.trim()) {
      const updatedServices = [...services, newService];
      await handleSaveServices(updatedServices);
      setServiceDialogOpen(false);
    }
  };

  const handleEditService = (index: number) => {
    setEditIndex(index);
    setEditService(services[index]);
    setEditing(true);
  };

  const handleRemoveService = async (index: number) => {
    const updatedServices = services.filter((_, i) => i !== index);
    await handleSaveServices(updatedServices);
  };

  const handleSaveServices = async (servicesToSave: Service[]) => {
    try {
      setSaving(true);
      await updateServicesSection(servicesToSave);
      await fetchData(); // Refresh data from server
      setEditing(false);
    } catch (error) {
      console.error('Update failed:', error);
      alert(`Update failed: ${error.response?.data?.message || error.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleSaveEditedService = async () => {
    if (editIndex !== null && editService.title.trim() && editService.description.trim()) {
      const updatedServices = [...services];
      updatedServices[editIndex] = editService;
      await handleSaveServices(updatedServices);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Typography variant="h4" gutterBottom>
        Services Section
      </Typography>

      <TableContainer component={Paper} className="mb-6">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Icon</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {services.map((service, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="text-xl">{service.iconType}</div>
                </TableCell>
                <TableCell>{service.title}</TableCell>
                <TableCell>{service.description}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleEditService(index)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleRemoveService(index)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="flex justify-end mb-4">
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddService}
        >
          Add Service
        </Button>
      </div>

      {/* Edit Service Modal */}
      <Modal
        open={editing}
        onClose={() => setEditing(false)}
        aria-labelledby="edit-service-modal"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}>
          <div className="flex justify-between items-center mb-4">
            <Typography id="edit-service-modal" variant="h6" component="h2">
              Edit Service
            </Typography>
            <IconButton onClick={() => setEditing(false)}>
              <CloseIcon />
            </IconButton>
          </div>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Icon Type"
                variant="outlined"
                value={editService.iconType}
                onChange={(e) => setEditService({...editService, iconType: e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Title"
                variant="outlined"
                value={editService.title}
                onChange={(e) => setEditService({...editService, title: e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                variant="outlined"
                multiline
                rows={4}
                value={editService.description}
                onChange={(e) => setEditService({...editService, description: e.target.value})}
              />
            </Grid>
          </Grid>

          <div className="flex justify-end space-x-2 mt-4">
            <Button
              variant="outlined"
              onClick={() => setEditing(false)}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSaveEditedService}
              disabled={saving}
              startIcon={saving ? <CircularProgress size={20} /> : <SaveIcon />}
            >
              Save Changes
            </Button>
          </div>
        </Box>
      </Modal>

      {/* Add Service Dialog */}
      <Dialog open={serviceDialogOpen} onClose={() => setServiceDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Add New Service</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                margin="dense"
                label="Icon Type"
                fullWidth
                variant="outlined"
                value={newService.iconType}
                onChange={(e) => setNewService({...newService, iconType: e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                label="Title"
                fullWidth
                variant="outlined"
                value={newService.title}
                onChange={(e) => setNewService({...newService, title: e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                label="Description"
                fullWidth
                variant="outlined"
                multiline
                rows={4}
                value={newService.description}
                onChange={(e) => setNewService({...newService, description: e.target.value})}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setServiceDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleSaveNewService}
            disabled={!newService.title.trim() || !newService.description.trim() || saving}
            startIcon={saving ? <CircularProgress size={20} /> : <SaveIcon />}
          >
            Add Service
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ServicesSection;