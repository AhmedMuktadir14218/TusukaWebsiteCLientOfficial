import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
  Tab,
  Tabs,
  Box,
  Typography,
  CircularProgress
} from '@mui/material';
import { 
  Add, 
  Edit, 
  Delete, 
  Visibility,
  Close
} from '@mui/icons-material';

interface MVCItem {
  id: number;
  tab_id: string;
  title: string;
  content: string;
  image_url: string | null;
  order: number;
}

const MVCComponent: React.FC = () => {
  const [mvcData, setMvcData] = useState<MVCItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openViewModal, setOpenViewModal] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<MVCItem | null>(null);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [snackbar, setSnackbar] = useState({ 
    open: false, 
    message: '', 
    severity: 'success' as 'success' | 'error' | 'info' | 'warning' 
  });
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Function to transform the image URL by adding '/public'
  const transformImageUrl = (url: string | null) => {
    if (url) {
      const uploadIndex = url.indexOf('/upload/');
      if (uploadIndex !== -1) {
        return url.substring(0, uploadIndex) + '/public' + url.substring(uploadIndex);
      }
    }
    return url; // Return original URL if '/upload/' is not found or URL is null/empty
  };

  // Fetch all MVC data
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/about-mvc`);
      // Transform image_url for each item after fetching
      const transformedData = response.data.data.map((item: MVCItem) => ({
        ...item,
        image_url: transformImageUrl(item.image_url)
      }));
      setMvcData(transformedData);
    } catch (err) {
      setError('Failed to fetch MVC data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  // Open modal for adding new item
  const handleAddNew = () => {
    setCurrentItem({
      id: 0,
      tab_id: '',
      title: '',
      content: '',
      image_url: null,
      order: mvcData.length > 0 ? Math.max(...mvcData.map(item => item.order)) + 1 : 1
    });
    setIsEditMode(false);
    setOpenModal(true);
    setImageFile(null);
  };

  // Open modal for editing item
  const handleEdit = (item: MVCItem) => {
    // When editing, set the current item with the transformed URL
    setCurrentItem(item); 
    setIsEditMode(true);
    setOpenModal(true);
    setImageFile(null);
  };

  // Open modal for viewing item
  const handleView = (item: MVCItem) => {
    // When viewing, set the current item with the transformed URL
    setCurrentItem(item);
    setOpenViewModal(true);
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('tab_id', currentItem?.tab_id || '');
      formData.append('title', currentItem?.title || '');
      formData.append('content', currentItem?.content || '');
      formData.append('order', currentItem?.order.toString() || '0');
      
      if (imageFile) {
        formData.append('image', imageFile);
      }

      if (isEditMode && currentItem?.id) {
        await axios.post(`${API_BASE_URL}/api/about-mvc/${currentItem.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        setSnackbar({ open: true, message: 'Item updated successfully', severity: 'success' });
      } else {
        await axios.post('/api/about-mvc', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        setSnackbar({ open: true, message: 'Item added successfully', severity: 'success' });
      }

      fetchData();
      setOpenModal(false);
    } catch (err: any) {
      setSnackbar({ 
        open: true, 
        message: err.response?.data?.message || 'Error saving item', 
        severity: 'error' 
      });
      console.error(err);
    }
  };

  // Handle delete
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/about-mvc/${id}`);
      setSnackbar({ open: true, message: 'Item deleted successfully', severity: 'success' });
      fetchData();
    } catch (err) {
      setSnackbar({ open: true, message: 'Error deleting item', severity: 'error' });
      console.error(err);
    }
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentItem(prev => ({
      ...prev!,
      [name]: value
    }));
  };

  // Handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  // Close modal
  const handleCloseModal = () => {
    setOpenModal(false);
    setOpenViewModal(false);
  };

  // Close snackbar
  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <CircularProgress />
    </div>
  );

  if (error) return (
    <div className="p-4 text-red-500">
      {error}
    </div>
  );

  return (
    <div className="p-4">
      <Paper className="p-4 mb-6 shadow-md">
        <div className="flex justify-between items-center mb-4">
          <Typography variant="h5" component="h2" className="font-bold">
            MVC Management
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={handleAddNew}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Add New
          </Button>
        </div>

        {/* Tabs for viewing content */}
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange} 
          variant="scrollable"
          scrollButtons="auto"
          aria-label="MVC tabs"
        >
          {mvcData.map((item, index) => (
            <Tab key={item.id} label={item.title} />
          ))}
        </Tabs>

        {/* Tab content */}
        <Box className="mt-4">
          {mvcData.map((item, index) => (
            <div
              key={item.id}
              role="tabpanel"
              hidden={activeTab !== index}
              id={`tabpanel-${index}`}
              aria-labelledby={`tab-${index}`}
            >
              {activeTab === index && (
                <div className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                      <Typography variant="h6" className="font-semibold">
                        {item.title}
                      </Typography>
                      <Typography variant="body1" className="mt-2 text-gray-700">
                        {item.content}
                      </Typography>
                    </div>
                    {item.image_url && (
                      <div className="flex justify-center">
                        <img
                          src={item.image_url} // This will now use the transformed URL
                          alt={item.title}
                          className="max-h-48 rounded-lg shadow-md"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </Box>
      </Paper>

      {/* Data Table */}
      <Paper className="p-4 shadow-md">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow className="bg-gray-100">
                <TableCell className="font-bold">ID</TableCell>
                <TableCell className="font-bold">Title</TableCell>
                <TableCell className="font-bold">Tab ID</TableCell>
                <TableCell className="font-bold">Order</TableCell>
                <TableCell className="font-bold">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mvcData.map((item) => (
                <TableRow key={item.id} hover>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.tab_id}</TableCell>
                  <TableCell>{item.order}</TableCell>
                  <TableCell>
                    <IconButton 
                      color="primary" 
                      onClick={() => handleView(item)}
                      className="text-blue-600"
                    >
                      <Visibility />
                    </IconButton>
                    <IconButton 
                      color="secondary" 
                      onClick={() => handleEdit(item)}
                      className="text-green-600"
                    >
                      <Edit />
                    </IconButton>
                    <IconButton 
                      color="error" 
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600"
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Add/Edit Modal */}
      <Dialog 
        open={openModal} 
        onClose={handleCloseModal} 
        maxWidth="md" 
        fullWidth
      >
        <DialogTitle>
          {isEditMode ? 'Edit MVC Item' : 'Add New MVC Item'}
          <IconButton
            aria-label="close"
            onClick={handleCloseModal}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <div className="grid grid-cols-1 gap-4 mt-2">
            <TextField
              label="Tab ID"
              name="tab_id"
              value={currentItem?.tab_id || ''}
              onChange={handleInputChange}
              fullWidth
              required
              disabled={isEditMode}
              variant="outlined"
              margin="normal"
            />
            <TextField
              label="Title"
              name="title"
              value={currentItem?.title || ''}
              onChange={handleInputChange}
              fullWidth
              required
              variant="outlined"
              margin="normal"
            />
            <TextField
              label="Content"
              name="content"
              value={currentItem?.content || ''}
              onChange={handleInputChange}
              multiline
              rows={4}
              fullWidth
              required
              variant="outlined"
              margin="normal"
            />
            <TextField
              label="Order"
              name="order"
              type="number"
              value={currentItem?.order || 0}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              margin="normal"
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
              />
              {/* Display current image if exists and no new file selected */}
              {currentItem?.image_url && !imageFile && (
                <img
                  src={currentItem.image_url} // This will use the transformed URL
                  alt="Current"
                  className="mt-2 h-24 rounded"
                />
              )}
              {/* Display preview of newly selected image file */}
              {imageFile && (
                <img
                  src={URL.createObjectURL(imageFile)}
                  alt="New Image Preview"
                  className="mt-2 h-24 rounded"
                />
              )}
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="inherit">
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained" 
            color="primary"
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isEditMode ? 'Update' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Modal */}
      <Dialog 
        open={openViewModal} 
        onClose={handleCloseModal} 
        maxWidth="md" 
        fullWidth
      >
        <DialogTitle>
          View MVC Item
          <IconButton
            aria-label="close"
            onClick={handleCloseModal}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {currentItem && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Typography variant="h6" className="font-semibold mb-2">
                  Details
                </Typography>
                <div className="space-y-2">
                  <div>
                    <Typography variant="subtitle2" className="text-gray-500">
                      ID
                    </Typography>
                    <Typography>{currentItem.id}</Typography>
                  </div>
                  <div>
                    <Typography variant="subtitle2" className="text-gray-500">
                      Tab ID
                    </Typography>
                    <Typography>{currentItem.tab_id}</Typography>
                  </div>
                  <div>
                    <Typography variant="subtitle2" className="text-gray-500">
                      Title
                    </Typography>
                    <Typography>{currentItem.title}</Typography>
                  </div>
                  <div>
                    <Typography variant="subtitle2" className="text-gray-500">
                      Order
                    </Typography>
                    <Typography>{currentItem.order}</Typography>
                  </div>
                </div>
              </div>
              <div>
                <Typography variant="h6" className="font-semibold mb-2">
                  Content
                </Typography>
                <Typography className="whitespace-pre-line">
                  {currentItem.content}
                </Typography>
                {currentItem.image_url && (
                  <div className="mt-4">
                    <Typography variant="subtitle2" className="text-gray-500 mb-2">
                      Image
                    </Typography>
                    <img
                      src={currentItem.image_url} // This will use the transformed URL
                      alt={currentItem.title}
                      className="max-h-48 rounded-lg shadow-md"
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default MVCComponent;