// resources/js/components/LabComponents/CertificationsSection.tsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  
  Grid,
  IconButton,
   
  Modal,
   
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Add as AddIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { ShieldCloseIcon } from 'lucide-react';
import axios from 'axios';

interface Certification {
  iconType: string;
  title: string;
  description: string;
}

const CertificationsSection: React.FC = () => {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editCertification, setEditCertification] = useState<Certification>({
    iconType: '',
    title: '',
    description: ''
  });
  const [certificationDialogOpen, setCertificationDialogOpen] = useState(false);
  const [newCertification, setNewCertification] = useState<Certification>({
    iconType: '',
    title: '',
    description: ''
  });

      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


    const getCertifications = async (): Promise<Certification> => {
    const response = await axios.get(`${API_BASE_URL}/api/tusuka-lab/sections/certifications`);
    return response.data;
  };
 
  const updateCertificationsSection = async (data: Certification | { title: string; paragraphs: string[] }): Promise<{ message: string }> => {
    if (data instanceof FormData) {
      // Assuming your backend can parse FormData for all fields
      const response = await axios.put(`${API_BASE_URL}/api/tusuka-lab/sections/certifications`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } else {
      // This is for JSON update of text fields, if image is handled separately
      const response = await axios.put(`${API_BASE_URL}/api/tusuka-lab/sections/certifications`, data);
      return response.data;
    }
  };



  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getCertifications();
      setCertifications(data);
    } catch (error) {
      console.error('Error fetching certifications data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCertification = () => {
    setNewCertification({
      iconType: '',
      title: '',
      description: ''
    });
    setCertificationDialogOpen(true);
  };

  const handleSaveNewCertification = async () => {
    if (newCertification.title.trim() && newCertification.description.trim()) {
      const updatedCertifications = [...certifications, newCertification];
      await handleSaveCertifications(updatedCertifications);
      setCertificationDialogOpen(false);
    }
  };

  const handleEditCertification = (index: number) => {
    setEditIndex(index);
    setEditCertification(certifications[index]);
    setEditing(true);
  };

  const handleRemoveCertification = async (index: number) => {
    const updatedCertifications = certifications.filter((_, i) => i !== index);
    await handleSaveCertifications(updatedCertifications);
  };

  const handleSaveCertifications = async (certsToSave: Certification[]) => {
    try {
      setSaving(true);
      await updateCertificationsSection(certsToSave);
      await fetchData(); // Refresh data from server
      setEditing(false);
    } catch (error) {
      console.error('Update failed:', error);
      alert(`Update failed:  `);
    } finally {
      setSaving(false);
    }
  };

  const handleSaveEditedCertification = async () => {
    if (editIndex !== null && 
        editCertification.title.trim() && 
        editCertification.description.trim()) {
      const updatedCertifications = [...certifications];
      updatedCertifications[editIndex] = editCertification;
      await handleSaveCertifications(updatedCertifications);
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
        Certifications Section
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
            {certifications.map((certification, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="text-xl">{certification.iconType}</div>
                </TableCell>
                <TableCell>{certification.title}</TableCell>
                <TableCell>{certification.description}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleEditCertification(index)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleRemoveCertification(index)}>
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
          onClick={handleAddCertification}
        >
          Add Certification
        </Button>
      </div>

      {/* Edit Certification Modal */}
      <Modal
        open={editing}
        onClose={() => setEditing(false)}
        aria-labelledby="edit-certification-modal"
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
            <Typography id="edit-certification-modal" variant="h6" component="h2">
              Edit Certification
            </Typography>
            <IconButton onClick={() => setEditing(false)}>
              <ShieldCloseIcon />
            </IconButton>
          </div>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Icon Type"
                variant="outlined"
                value={editCertification.iconType}
                onChange={(e) => setEditCertification({
                  ...editCertification,
                  iconType: e.target.value
                })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Title"
                variant="outlined"
                value={editCertification.title}
                onChange={(e) => setEditCertification({
                  ...editCertification,
                  title: e.target.value
                })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                variant="outlined"
                multiline
                rows={4}
                value={editCertification.description}
                onChange={(e) => setEditCertification({
                  ...editCertification,
                  description: e.target.value
                })}
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
              onClick={handleSaveEditedCertification}
              disabled={saving}
              startIcon={saving ? <CircularProgress size={20} /> : <SaveIcon />}
            >
              Save Changes
            </Button>
          </div>
        </Box>
      </Modal>

      {/* Add Certification Dialog */}
      <Dialog 
        open={certificationDialogOpen} 
        onClose={() => setCertificationDialogOpen(false)} 
        fullWidth 
        maxWidth="sm"
      >
        <DialogTitle>Add New Certification</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                margin="dense"
                label="Icon Type"
                fullWidth
                variant="outlined"
                value={newCertification.iconType}
                onChange={(e) => setNewCertification({
                  ...newCertification,
                  iconType: e.target.value
                })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                label="Title"
                fullWidth
                variant="outlined"
                value={newCertification.title}
                onChange={(e) => setNewCertification({
                  ...newCertification,
                  title: e.target.value
                })}
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
                value={newCertification.description}
                onChange={(e) => setNewCertification({
                  ...newCertification,
                  description: e.target.value
                })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCertificationDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleSaveNewCertification}
            disabled={
              !newCertification.title.trim() || 
              !newCertification.description.trim() || 
              saving
            }
            startIcon={saving ? <CircularProgress size={20} /> : <SaveIcon />}
          >
            Add Certification
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CertificationsSection;