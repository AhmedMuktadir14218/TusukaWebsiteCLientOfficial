/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useRef, type ChangeEvent, useEffect } from 'react'; // Added useEffect
import { 
  Button, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle, 
  Grid, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  TextField,
  Box,
  IconButton,
  Typography,
  CircularProgress
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon, CloudUpload as CloudUploadIcon, Close as CloseIcon } from '@mui/icons-material';

interface UnitsTableProps {
  units: any[];
  onAdd: (unit: any) => Promise<void>;
  onEdit: (id: number, unit: any) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

export const UnitsTable = ({ units, onAdd, onEdit, onDelete }: UnitsTableProps) => {
  const [open, setOpen] = useState(false);
  const [currentUnit, setCurrentUnit] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Retrieve the base image URL from environment variables
  const BASE_IMAGE_URL = import.meta.env.VITE_API_IMAGE_URL;

  // Helper function to get the full image URL
  const getFullImageUrl = (imagePath: string | null | undefined): string | null => {
    if (!imagePath) return null;
    if (imagePath.startsWith('http')) {
      return imagePath; // Already a full URL
    }
    // Prepend the base URL and ensure no double slashes
    return `${BASE_IMAGE_URL}/${imagePath.replace(/^\/+/, '')}`;
  };

  // Log units to debug (can remove in production)
  // console.log("Units in Table:", units);

  const handleOpenAdd = () => {
    setCurrentUnit({
      title: '',
      background_image: null, // Initialize as null for new uploads
      description: '',
      order: units.length // Default order
    });
    setImagePreview(null);
    setSelectedFileName(null);
    setOpen(true);
  };

  const handleOpenEdit = (unit: any) => {
    setCurrentUnit({ ...unit });
    // When editing, set the image preview to the full URL of the existing image
    setImagePreview(getFullImageUrl(unit.background_image));
    setSelectedFileName(unit.background_image ? unit.background_image.split('/').pop() : null); // Show existing file name if available
    setOpen(true);
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setOpen(false);
      setCurrentUnit(null);
      setImagePreview(null);
      setSelectedFileName(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = ''; // Clear the file input
      }
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert('Image size must be less than 10MB'); // Consider using Snackbar/Alert for better UX
      return;
    }

    setSelectedFileName(file.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      const preview = event.target?.result as string;
      setImagePreview(preview); // FileReader result is a data URL, suitable for direct display
      setCurrentUnit(prev => ({ ...prev, background_image: file })); // Store the File object
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setSelectedFileName(null);
    setCurrentUnit(prev => ({ ...prev, background_image: null })); // Explicitly set to null for removal
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Clear the file input
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      
      // Append all text fields
      formData.append('title', currentUnit.title || '');
      formData.append('description', currentUnit.description || '');
      // Ensure order is sent as a number if your API expects it
      formData.append('order', currentUnit.order?.toString() || '0');
      
      // Handle background_image based on its type
      if (currentUnit.background_image instanceof File) {
        // A new file has been selected
        formData.append('background_image', currentUnit.background_image);
      } else if (currentUnit.background_image === null) {
        // Image was explicitly removed by the user
        // Send a specific flag to the backend to indicate removal
        formData.append('remove_background_image', 'true');
      }
      // If currentUnit.background_image is a string (existing path),
      // we don't append it to FormData. The backend should handle
      // the absence of 'background_image' or 'remove_background_image'
      // as meaning "keep the existing image".

      if (currentUnit.id) {
        // For Laravel PUT/PATCH, you might need to spoof the method
        formData.append('_method', 'PUT'); 
        await onEdit(currentUnit.id, formData);
      } else {
        await onAdd(formData);
      }
      
      handleClose(); // Close the dialog after successful submission
    } catch (error) {
      console.error('Operation failed:', error);
      // You might want to add a Snackbar/Alert here to inform the user
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this unit?')) {
      try {
        await onDelete(id);
      } catch (error) {
        console.error('Delete failed:', error);
        // You might want to add a Snackbar/Alert here to inform the user
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => { // Adjusted type for multiline TextField
    const { name, value } = e.target;
    setCurrentUnit((prev: any) => ({ ...prev, [name]: value }));
  };
    
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Units</h2>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenAdd}>
          Add Unit
        </Button>
      </div>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              {/* <TableCell>Background Image</TableCell> */}
              <TableCell>Order</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {units.map((unit) => (
              <TableRow key={unit.id}>
                <TableCell>{unit.title}</TableCell>
                <TableCell>{unit.description}</TableCell>
                {/* <TableCell>
                  {unit.background_image && (
                    <img 
                      src={getFullImageUrl(unit.background_image)} // Use helper function for table display
                      alt={unit.title} 
                      className="w-20 h-auto object-cover" 
                    />
                  )}
                </TableCell> */}
                <TableCell>{unit.order}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    startIcon={<EditIcon />}
                    onClick={() => handleOpenEdit(unit)}
                    className="mr-2"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDelete(unit.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog 
        open={open} 
        onClose={handleClose} 
        maxWidth="md" 
        fullWidth
        disableEscapeKeyDown={isSubmitting}
      >
        <DialogTitle>{currentUnit?.id ? 'Edit Unit' : 'Add Unit'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} className="mt-2">
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={currentUnit?.title || ''}
                onChange={handleChange}
                margin="normal"
                disabled={isSubmitting}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={currentUnit?.description || ''}
                onChange={handleChange}
                margin="normal"
                multiline
                rows={4}
                disabled={isSubmitting}
              />
            </Grid>
            <Grid item xs={12}>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                style={{ display: 'none' }}
                disabled={isSubmitting} // Disable file input during submission
              />
              <Button
                variant="outlined"
                startIcon={<CloudUploadIcon />}
                onClick={triggerFileInput}
                fullWidth
                sx={{ mb: 2 }}
                disabled={isSubmitting}
              >
                {selectedFileName ? 'Change Image' : 'Upload Background Image'}
              </Button>
              
              {selectedFileName && (
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1,
                  mb: 2,
                  p: 1,
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  borderRadius: 1
                }}>
                  <Typography variant="body2" color="text.secondary">
                    Selected: {selectedFileName}
                  </Typography>
                  <Button
                    size="small"
                    color="error"
                    onClick={handleRemoveImage}
                    disabled={isSubmitting}
                  >
                    Remove
                  </Button>
                </Box>
              )}
              
              <Typography variant="caption" color="textSecondary">
                Max file size: 10MB (JPEG, PNG, GIF, WEBP)
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: 0,
                  paddingBottom: '56.25%', // 16:9 aspect ratio
                  overflow: 'hidden',
                  borderRadius: 1,
                  bgcolor: 'grey.100'
                }}
              >
                {imagePreview ? (
                  <>
                    <IconButton
                      aria-label="remove image"
                      onClick={handleRemoveImage}
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        zIndex: 1,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        color: 'white',
                        '&:hover': {
                          backgroundColor: 'rgba(0,0,0,0.7)'
                        }
                      }}
                      disabled={isSubmitting}
                    >
                      <CloseIcon />
                    </IconButton>
                    <Box
                      component="img"
                      src={imagePreview} // This will be the full URL or data URL
                      alt="Background preview"
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </>
                ) : (
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    height="100%"
                    position="absolute"
                    width="100%"
                  >
                    <Typography color="textSecondary">
                      No image selected
                    </Typography>
                  </Box>
                )}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="number"
                label="Order"
                name="order"
                value={currentUnit?.order ?? 0} // Use nullish coalescing for better default handling
                onChange={handleChange}
                margin="normal"
                disabled={isSubmitting}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained"
            disabled={isSubmitting}
          >
            {isSubmitting ? <CircularProgress size={24} /> : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};