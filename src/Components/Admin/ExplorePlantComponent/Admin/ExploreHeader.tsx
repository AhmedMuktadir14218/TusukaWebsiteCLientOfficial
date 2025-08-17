import { useState, useRef, type ChangeEvent, useEffect } from 'react'; // Added useEffect
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
  const BASE_IMAGE_URL = import.meta.env.VITE_API_IMAGE_URL;

  // Function to get the full image URL
  const getFullImageUrl = (imagePath: string | null): string | null => {
    if (!imagePath) return null;
    if (imagePath.startsWith('http')) {
      return imagePath; // Already a full URL
    }
    // Remove leading slashes to prevent // in the URL
    return `${BASE_IMAGE_URL}/${imagePath.replace(/^\/+/, '')}`;
  };

  const [formData, setFormData] = useState({
    ...header,
    // Initialize formData.image as null or File for new uploads.
    // The string representation for existing images will be handled by imagePreview for display.
    image: null as File | string | null
  });

  // imagePreview should always store the full URL or null
  const [imagePreview, setImagePreview] = useState<string | null>(getFullImageUrl(header.image));
  
  const [isUploading, setIsUploading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error'
  });
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Use useEffect to update imagePreview when header.image changes (e.g., after a save operation)
  useEffect(() => {
    setImagePreview(getFullImageUrl(header.image));
    // Also reset formData to header.image on prop change if not in edit mode
    // or if the header.image truly changed from external source
    setFormData(prev => ({
        ...prev,
        image: header.image // This ensures formData correctly reflects the latest image path from props
    }));
  }, [header.image]);

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
      setImagePreview(event.target?.result as string); // FileReader result is a data URL, so it's a full URL
    };
    reader.readAsDataURL(file);

    // Update form data with the File object
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
      image: null // Set to null to indicate removal
    }));

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSave = async () => {
    setIsUploading(true);
    try {
      // Prepare form data for API
      // If formData.image is a File, it will be sent as a file upload.
      // If it's a string (existing path from DB), or null, it's sent as is.
      const dataToSend = {
        ...formData,
      };

      await onSave(dataToSend);
      
      setSnackbar({
        open: true,
        message: 'Header saved successfully!',
        severity: 'success'
      });
      setEditMode(false);
      // After successful save, ensure imagePreview reflects the potentially new or existing image path
      // This is now handled by the useEffect watching header.image
    } catch (err) {
      console.error("Save error:", err); // Log the error for debugging
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
    // Reset to original values received from props
    setFormData({
        ...header,
        image: header.image // Ensure image in formData also resets to original path
    });
    setImagePreview(getFullImageUrl(header.image)); // Ensure preview is original full URL
    setSelectedFileName(null); // Clear any selected file name
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Clear file input
    }
    setEditMode(false);
  };

  return (
    <Card className="mb-6 container mx-auto">
      <Box display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <Typography variant="h5" component="h2">
          Explore Header
        </Typography>
        {editMode ? (
          <Box display="flex" gap={2}>
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
              startIcon={isUploading ? <CircularProgress size={20} /> : <SaveIcon />}
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
          paddingBottom: '30%',
          overflow: 'hidden',
          bgcolor: 'grey.100'
        }}
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
              >
                <CloseIcon />
              </IconButton>
            )}
            <CardMedia
              component="img"
              image={imagePreview} // This should always be a full URL or data URL
              alt="Header preview"
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
              />
              <TextField
                fullWidth
                label="CTA Text"
                name="cta_text"
                value={formData.cta_text}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
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
                  }}>
                    <Typography variant="body2" color="text.secondary">
                      Selected: {selectedFileName}
                    </Typography>
                  </Box>
                )}

                <Typography variant="caption" color="textSecondary">
                  Max file size: 10MB (JPEG, PNG, GIF, WEBP)
                </Typography>
              </Box>
            </Grid>
          </Grid>
        ) : (
          <Box mt={0}>
            <Typography variant="h4" component="h1" gutterBottom>
              {header.title}
            </Typography>
            <Typography variant="body1" paragraph>
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