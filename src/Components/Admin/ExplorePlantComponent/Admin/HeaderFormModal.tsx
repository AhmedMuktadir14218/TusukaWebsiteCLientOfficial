import { useState, useRef, type ChangeEvent } from 'react';

import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  TextField,
  Typography,
  Box,
  CircularProgress,
  IconButton,
  Snackbar,
  Alert
} from '@mui/material';
import { Edit as EditIcon, Save as SaveIcon, CloudUpload as CloudUploadIcon, Close as CloseIcon } from '@mui/icons-material';

interface ExploreHeaderProps {
  header: {
    id: number;
    title: string;
    description: string;
    cta_text: string;
    image: string | null;
  };
  onSave: (header: any) => Promise<void>;
}

export const ExploreHeader = ({ header, onSave }: ExploreHeaderProps) => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    ...header,
    image: null as File | string | null // Can be File (new upload), string (existing URL), or null (removed)
  });
  const [imagePreview, setImagePreview] = useState<string | null>(header.image);
  const [isUploading, setIsUploading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error'
  });
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file
    if (file.size > 10 * 1024 * 1024) {
      setSnackbar({
        open: true,
        message: 'Image size must be less than 10MB',
        severity: 'error'
      });
      return;
    }

    setSelectedFileName(file.name);

    // Create preview
    const reader = new FileReader();
    reader.onload = (event) => {
      setImagePreview(event.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Update form data
    setFormData(prev => ({
      ...prev,
      image: file
    }));
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setSelectedFileName(null);
    setFormData(prev => ({
      ...prev,
      image: null
    }));

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSave = async () => {
    setIsUploading(true);
    try {
      // Prepare form data for API
      const dataToSend = {
        ...formData,
        // If image is a File object, it will be handled by FormData
        // If it's a string (existing URL), it will be sent as is
        // If it's null, it will be sent as null
      };

      await onSave(dataToSend);
      
      setSnackbar({
        open: true,
        message: 'Header saved successfully!',
        severity: 'success'
      });
      setEditMode(false);
    } catch (err) {
      setSnackbar({
        open: true,
        message: 'Failed to save header. Please try again.',
        severity: 'error'
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancelEdit = () => {
    // Reset to original values
    setFormData(header);
    setImagePreview(header.image);
    setSelectedFileName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setEditMode(false);
  };

  return (
    <Card className="mb-6 container mx-auto shadow-lg rounded-lg"> {/* Added Tailwind classes */}
      <Box className="flex justify-between items-center p-6"> {/* Added Tailwind classes */}
        <Typography variant="h5" component="h2" className="font-semibold"> {/* Added Tailwind classes */}
          Explore Header
        </Typography>
        {editMode ? (
          <Box className="flex gap-4"> {/* Added Tailwind classes */}
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleCancelEdit}
              disabled={isUploading}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              startIcon={isUploading ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
              onClick={handleSave}
              disabled={isUploading}
            >
              Save
            </Button>
          </Box>
        ) : (
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            onClick={() => setEditMode(true)}
          >
            Edit
          </Button>
        )}
      </Box>

      {/* Image Section */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: 0,
          paddingBottom: '30%', // Controls aspect ratio
          overflow: 'hidden',
          bgcolor: 'grey.100'
        }}
        className="relative w-full overflow-hidden bg-gray-100" // Added Tailwind classes
        style={{ paddingBottom: '30%' }} // Keep for aspect ratio if not using Tailwind's aspect-ratio plugin
      >
        {imagePreview ? (
          <>
            {editMode && (
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
                className="absolute top-2 right-2 z-10 bg-black bg-opacity-50 text-white hover:bg-opacity-70" // Added Tailwind classes
              >
                <CloseIcon />
              </IconButton>
            )}
            <CardMedia
              component="img"
              image={imagePreview}
              alt="Header preview"
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
              className="absolute top-0 left-0 w-full h-full object-cover" // Added Tailwind classes
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
            className="flex items-center justify-center h-full absolute w-full" // Added Tailwind classes
          >
            <Typography color="textSecondary">
              No header image
            </Typography>
          </Box>
        )}
      </Box>

      {/* Content Section */}
      <CardContent>
        {editMode ? (
          <Grid container spacing={3}>
            <Grid component="div" item xs={12}>
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                className="mb-4" // Added Tailwind class
              />
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                margin="normal"
                multiline
                rows={4}
                variant="outlined"
                className="mb-4" // Added Tailwind class
              />
              <TextField
                fullWidth
                label="CTA Text"
                name="cta_text"
                value={formData.cta_text}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                className="mb-4" // Added Tailwind class
              />

              <Box mt={2}>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  style={{ display: 'none' }}
                />
                <Button
                  variant="outlined"
                  startIcon={<CloudUploadIcon />}
                  onClick={() => fileInputRef.current?.click()}
                  fullWidth
                  sx={{ mb: 2 }}
                  className="w-full mb-4" // Added Tailwind classes
                >
                  {imagePreview ? 'Change Image' : 'Upload Header Image'}
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
                  }}
                  className="flex items-center gap-2 mb-4 p-2 bg-gray-50 rounded" // Added Tailwind classes
                  >
                    <Typography variant="body2" color="text.secondary">
                      Selected: {selectedFileName}
                    </Typography>
                  </Box>
                )}

                <Typography variant="caption" color="textSecondary" className="block text-sm text-gray-500"> {/* Added Tailwind classes */}
                  Max file size: 10MB (JPEG, PNG, GIF, WEBP)
                </Typography>
              </Box>
            </Grid>
          </Grid>
        ) : (
          <Box mt={0}>
            <Typography variant="h4" component="h1" gutterBottom className="font-bold text-3xl mb-2"> {/* Added Tailwind classes */}
              {header.title}
            </Typography>
            <Typography variant="body1" paragraph className="text-gray-700 mb-4"> {/* Added Tailwind classes */}
              {header.description}
            </Typography>
            <Button variant="contained" color="primary">
              {header.cta_text}
            </Button>
          </Box>
        )}
      </CardContent>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Card>
  );
};