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
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Close as CloseIcon,
  Image as ImageIcon,
  Add as AddIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import axios from 'axios';

interface IntroData {
  title: string;
  paragraphs: string[];
  image?: {
    path: string;
    filename: string;
  };
}

const IntroSection: React.FC = () => {
  const [introData, setIntroData] = useState<IntroData>({
    title: '',
    paragraphs: [''],
  });
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editField, setEditField] = useState<'title' | 'paragraphs' | null>(null);
  const [editValue, setEditValue] = useState<string>('');
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [paragraphDialogOpen, setParagraphDialogOpen] = useState(false);
  const [newParagraph, setNewParagraph] = useState('');
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


  // Modified getIntro to align with the expected IntroData structure
  const getIntro = async (): Promise<IntroData> => {
    const response = await axios.get(`${API_BASE_URL}/api/tusuka-lab/sections/intro`);
    return response.data;
  };

  // Modified updateIntro to accept FormData for a combined update (recommended if your backend handles it)
  // OR, if your backend expects JSON for text and separate endpoint for image,
  // then you'd have two separate update functions.
  const updateIntro = async (data: FormData | { title: string; paragraphs: string[] }): Promise<{ message: string }> => {
    if (data instanceof FormData) {
      // Assuming your backend can parse FormData for all fields
      const response = await axios.post(`${API_BASE_URL}/api/tusuka-lab/sections/intro`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } else {
      // This is for JSON update of text fields, if image is handled separately
      const response = await axios.post(`${API_BASE_URL}/api/tusuka-lab/sections/intro`, data);
      return response.data;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getIntro();
      setIntroData({
        title: response.title || '',
        paragraphs: response.paragraphs || [''],
        image: response.image || undefined // Ensure image is properly handled
      });
    } catch (error) {
      console.error('Error fetching intro data:', error);
      // Optionally set an error state here
    } finally {
      setLoading(false);
    }
  };

  // Paragraph Management Functions
  const handleAddParagraph = () => {
    setNewParagraph('');
    setParagraphDialogOpen(true);
  };

  const handleSaveNewParagraph = () => {
    if (newParagraph.trim()) {
      setIntroData(prev => ({
        ...prev,
        paragraphs: [...prev.paragraphs, newParagraph]
      }));
      setParagraphDialogOpen(false);
    }
  };

  const handleRemoveParagraph = (index: number) => {
    if (introData.paragraphs.length <= 1) return;
    setIntroData(prev => ({
      ...prev,
      paragraphs: prev.paragraphs.filter((_, i) => i !== index)
    }));
  };

  const handleEdit = (field: 'title' | 'paragraphs', index: number | null = null) => {
    setEditField(field);
    if (field === 'title') {
      setEditValue(introData.title);
      setEditIndex(null);
    } else {
      setEditValue(introData.paragraphs[index || 0]);
      setEditIndex(index);
    }
    setEditing(true);
  };

  // Corrected handleSave function
  const handleSave = async () => {
    try {
      setSaving(true);
      
      // Create a copy of introData to modify
      const updatedIntroData = { ...introData };

      // Update the relevant field based on editField and editValue
      if (editField === 'title') {
        updatedIntroData.title = editValue;
      } else if (editField === 'paragraphs' && editIndex !== null) {
        const newParagraphs = [...updatedIntroData.paragraphs];
        newParagraphs[editIndex] = editValue;
        updatedIntroData.paragraphs = newParagraphs;
      }

      // If an image file is selected, prepare FormData
      if (imageFile) {
        const formData = new FormData();
        formData.append('title', updatedIntroData.title);
        updatedIntroData.paragraphs.forEach((para, idx) => {
          formData.append(`paragraphs[${idx}]`, para);
        });
        formData.append('image', imageFile);

        await updateIntro(formData); // Send FormData with image
      } else {
        // If no new image, send text data as JSON (assuming your API can handle this)
        // Or if your API expects FormData always, you'd still create FormData here
        const textPayload = {
          title: updatedIntroData.title,
          paragraphs: updatedIntroData.paragraphs,
          // You might need to send a flag or existing image info if your API requires it
        };
        // It's more likely your backend expects paragraphs as an array within the main object,
        // so `description` in your `updateIntro` might be a placeholder for `paragraphs`.
        // Let's adjust `updateIntro` to expect `paragraphs` array.
        // For now, I'll send the whole updatedIntroData as JSON.
         await updateIntro(updatedIntroData); // Send text data as JSON
      }

      // Update the local state after successful API call
      setIntroData(updatedIntroData);

      await fetchData(); // Refresh data from server to ensure consistency
      setEditing(false); // Close the edit modal
      setImageFile(null); // Clear selected image file
    } catch (error) {
      console.error('Update failed:', error);
      alert(`Update failed: ${error.message || 'Unknown error'}`); // Provide more specific error message
    } finally {
      setSaving(false);
    }
  };


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
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
        Intro Section
      </Typography>

      <TableContainer component={Paper} className="mb-6">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Field</TableCell>
              <TableCell>Value</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Title Row */}
            <TableRow>
              <TableCell component="th" scope="row">
                Title
              </TableCell>
              <TableCell>{introData.title}</TableCell>
              <TableCell align="right">
                <IconButton onClick={() => handleEdit('title')}>
                  <EditIcon />
                </IconButton>
              </TableCell>
            </TableRow>

            {/* Paragraphs Section */}
            <TableRow>
              <TableCell component="th" scope="row">
                Paragraphs
              </TableCell>
              <TableCell>
                <List dense>
                  {introData.paragraphs.map((paragraph, index) => (
                    <React.Fragment key={index}>
                      <ListItem>
                        <ListItemText
                          primary={paragraph}
                          secondary={`Paragraph ${index + 1}`}
                        />
                        <div>
                          <IconButton onClick={() => handleEdit('paragraphs', index)}>
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            onClick={() => handleRemoveParagraph(index)}
                            disabled={introData.paragraphs.length <= 1}
                          >
                            <DeleteIcon fontSize="small" color={introData.paragraphs.length <= 1 ? "disabled" : "error"} />
                          </IconButton>
                        </div>
                      </ListItem>
                      {index < introData.paragraphs.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              </TableCell>
              <TableCell align="right">
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={handleAddParagraph}
                >
                  Add Paragraph
                </Button>
              </TableCell>
            </TableRow>

            {/* Image Row */}
            <TableRow>
              <TableCell component="th" scope="row">
                Featured Image
              </TableCell>
              <TableCell>
                {introData.image ? (
                  <div className="flex items-center space-x-4">
                    <img
                      src={`${API_BASE_URL}/${introData.image.path}`}
                      alt={introData.image.filename}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <span>{introData.image.filename}</span>
                  </div>
                ) : (
                  <span>No image selected</span>
                )}
              </TableCell>
              <TableCell align="right">
                <Button
                  startIcon={<ImageIcon />}
                  onClick={() => setImageDialogOpen(true)}
                >
                  {introData.image ? 'Change' : 'Upload'}
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Modal */}
      <Modal
        open={editing}
        onClose={() => setEditing(false)}
        aria-labelledby="edit-modal-title"
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
            <Typography id="edit-modal-title" variant="h6" component="h2">
              Edit {editField === 'title' ? 'Title' : `Paragraph ${editIndex !== null ? editIndex + 1 : ''}`}
            </Typography>
            <IconButton onClick={() => setEditing(false)}>
              <CloseIcon />
            </IconButton>
          </div>

          <TextField
            fullWidth
            multiline
            rows={editField === 'title' ? 2 : 4}
            variant="outlined"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="mb-4"
          />

          <div className="flex justify-end space-x-2">
            <Button
              variant="outlined"
              onClick={() => setEditing(false)}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSave} // This will now update the state and then call the API
              disabled={saving}
              startIcon={saving ? <CircularProgress size={20} /> : <SaveIcon />}
            >
              Save
            </Button>
          </div>
        </Box>
      </Modal>

      {/* Image Upload Dialog */}
      <Dialog open={imageDialogOpen} onClose={() => setImageDialogOpen(false)}>
        <DialogTitle>Upload Intro Image</DialogTitle>
        <DialogContent>
          <input
            type="file"
            accept="image/jpeg,image/png,image/jpg,image/gif,image/svg"
            onChange={handleImageChange}
          />
          {imageFile && (
            <div className="mt-4">
              <Typography variant="subtitle1">Selected Image:</Typography>
              <Typography>{imageFile.name}</Typography>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setImageDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={() => {
              setImageDialogOpen(false);
              // After selecting an image, we should trigger a save operation
              // This can be the "Save All Changes" button or you can call handleSave here
              // For simplicity, let's just close the dialog and rely on the "Save All Changes"
              // or the individual save within the edit modal.
              // If you want immediate save after image selection:
              handleSave();
            }}
            disabled={!imageFile}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Paragraph Dialog */}
      <Dialog open={paragraphDialogOpen} onClose={() => setParagraphDialogOpen(false)}>
        <DialogTitle>Add New Paragraph</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="New Paragraph"
            fullWidth
            variant="standard"
            multiline
            rows={4}
            value={newParagraph}
            onChange={(e) => setNewParagraph(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setParagraphDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleSaveNewParagraph}
            disabled={!newParagraph.trim()}
          >
            Add Paragraph
          </Button>
        </DialogActions>
      </Dialog>

      {/* Save All Changes Button */}
      <div className="flex justify-end mt-4">
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleSave} // This button also triggers the save
          disabled={saving}
          startIcon={saving ? <CircularProgress size={20} /> : <SaveIcon />}
        >
          Save All Changes
        </Button>
      </div>
    </div>
  );
};

export default IntroSection;