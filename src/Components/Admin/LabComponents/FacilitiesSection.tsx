// resources/js/components/LabComponents/FacilitiesSection.tsx
import React, { useState, useEffect } from 'react';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Typography
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Add as AddIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import axios from 'axios';

interface FacilityItem {
  iconType: string;
  title: string;
  items: string[];
}

interface FacilitiesData {
  SectionTitle: string;
  SectionDescription: string;
  colorFastness: FacilityItem;
  physical: FacilityItem;
  strength: FacilityItem;
}

const FacilitiesSection: React.FC = () => {
  const [facilitiesData, setFacilitiesData] = useState<FacilitiesData | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editField, setEditField] = useState<string | null>(null);
  const [editFacility, setEditFacility] = useState<FacilityItem | null>(null);
  const [editFacilityKey, setEditFacilityKey] = useState<string | null>(null);
  const [editItemIndex, setEditItemIndex] = useState<number | null>(null);
  const [newItem, setNewItem] = useState('');
  const [editSectionTitle, setEditSectionTitle] = useState('');
  const [editSectionDesc, setEditSectionDesc] = useState('');
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


    const getFacilities = async (): Promise<FacilityItem> => {
    const response = await axios.get(`${API_BASE_URL}/api/tusuka-lab/sections/facilities`);
    return response.data;
  };

  // Modified updateIntro to accept FormData for a combined update (recommended if your backend handles it)
  // OR, if your backend expects JSON for text and separate endpoint for image,
  // then you'd have two separate update functions.
  const updateFacilitiesSection = async (data: FacilitiesData | { title: string; paragraphs: string[] }): Promise<{ message: string }> => {
    if (data instanceof FormData) {
      // Assuming your backend can parse FormData for all fields
      const response = await axios.post(`${API_BASE_URL}/api/tusuka-lab/sections/facilities`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } else {
      // This is for JSON update of text fields, if image is handled separately
      const response = await axios.post(`${API_BASE_URL}/api/tusuka-lab/sections/facilities`, data);
      return response.data;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getFacilities();
      setFacilitiesData(data);
      setEditSectionTitle(data.SectionTitle);
      setEditSectionDesc(data.SectionDescription);
    } catch (error) {
      console.error('Error fetching facilities data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditSection = () => {
    if (!facilitiesData) return;
    setEditing(true);
    setEditField('section');
  };

  const handleEditFacility = (facilityKey: string) => {
    if (!facilitiesData) return;
    
    setEditFacilityKey(facilityKey);
    setEditFacility({...facilitiesData[facilityKey as keyof FacilitiesData] as FacilityItem});
    setEditing(true);
    setEditField('facility');
  };

  const handleEditItem = (facilityKey: string, itemIndex: number) => {
    if (!facilitiesData) return;
    
    const facility = facilitiesData[facilityKey as keyof FacilitiesData] as FacilityItem;
    setNewItem(facility.items[itemIndex]);
    setEditItemIndex(itemIndex);
    setEditFacilityKey(facilityKey);
    setEditing(true);
    setEditField('item');
  };

  const handleAddItem = (facilityKey: string) => {
    setNewItem('');
    setEditItemIndex(null);
    setEditFacilityKey(facilityKey);
    setEditing(true);
    setEditField('newItem');
  };

  const handleRemoveItem = async (facilityKey: string, itemIndex: number) => {
    if (!facilitiesData) return;
    
    const updatedData = {...facilitiesData};
    const facility = updatedData[facilityKey as keyof FacilitiesData] as FacilityItem;
    facility.items = facility.items.filter((_, index) => index !== itemIndex);
    
    await handleSave(updatedData);
  };

  const handleSave = async (data: FacilitiesData) => {
    try {
      setSaving(true);
      await updateFacilitiesSection(data);
      await fetchData(); // Refresh data
      setEditing(false);
    } catch (error) {
      console.error('Update failed:', error);
      alert(`Update failed: ${error.response?.data?.message || error.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleSaveChanges = () => {
    if (!facilitiesData) return;
    
    const updatedData = {...facilitiesData};

    if (editField === 'section') {
      updatedData.SectionTitle = editSectionTitle;
      updatedData.SectionDescription = editSectionDesc;
    } else if (editField === 'facility' && editFacility && editFacilityKey) {
      updatedData[editFacilityKey as keyof FacilitiesData] = editFacility;
    } else if ((editField === 'item' || editField === 'newItem') && editFacilityKey && newItem.trim()) {
      const facility = updatedData[editFacilityKey as keyof FacilitiesData] as FacilityItem;
      if (editItemIndex !== null) {
        // Update existing item
        facility.items[editItemIndex] = newItem;
      } else {
        // Add new item
        facility.items.push(newItem);
      }
    }

    handleSave(updatedData);
  };

  if (loading || !facilitiesData) {
    return (
      <div className="flex justify-center items-center h-64">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Typography variant="h4" gutterBottom>
        Facilities Section
      </Typography>

      {/* Section Header */}
      <Paper elevation={3} className="p-4 mb-6">
        <div className="flex justify-between items-center mb-4">
          <Typography variant="h5">{facilitiesData.SectionTitle}</Typography>
          <IconButton onClick={handleEditSection}>
            <EditIcon />
          </IconButton>
        </div>
        <Typography>{facilitiesData.SectionDescription}</Typography>
      </Paper>

      {/* Facilities Sections */}
      {(['colorFastness', 'physical', 'strength'] as const).map((facilityKey) => {
        const facility = facilitiesData[facilityKey];
        return (
          <Paper key={facilityKey} elevation={2} className="p-4 mb-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <span className="text-2xl mr-2">{facility.iconType}</span>
                <Typography variant="h6">{facility.title}</Typography>
              </div>
              <div>
                <IconButton onClick={() => handleEditFacility(facilityKey)}>
                  <EditIcon />
                </IconButton>
              </div>
            </div>

            <List>
              {facility.items.map((item, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemText primary={item} />
                    <div>
                      <IconButton onClick={() => handleEditItem(facilityKey, index)}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton onClick={() => handleRemoveItem(facilityKey, index)}>
                        <DeleteIcon fontSize="small" color="error" />
                      </IconButton>
                    </div>
                  </ListItem>
                  {index < facility.items.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>

            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={() => handleAddItem(facilityKey)}
              className="mt-2"
            >
              Add Item
            </Button>
          </Paper>
        );
      })}

      {/* Edit Dialog */}
      <Dialog open={editing} onClose={() => setEditing(false)} fullWidth maxWidth="sm">
        <DialogTitle>
          {editField === 'section' && 'Edit Section'}
          {editField === 'facility' && 'Edit Facility'}
          {(editField === 'item' || editField === 'newItem') && 'Edit Item'}
        </DialogTitle>
        <DialogContent>
          {editField === 'section' && (
            <Grid container spacing={2} className="mt-2">
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Section Title"
                  value={editSectionTitle}
                  onChange={(e) => setEditSectionTitle(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Section Description"
                  multiline
                  rows={4}
                  value={editSectionDesc}
                  onChange={(e) => setEditSectionDesc(e.target.value)}
                />
              </Grid>
            </Grid>
          )}

          {editField === 'facility' && editFacility && (
            <Grid container spacing={2} className="mt-2">
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Icon Type"
                  value={editFacility.iconType}
                  onChange={(e) => setEditFacility({
                    ...editFacility,
                    iconType: e.target.value
                  })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Title"
                  value={editFacility.title}
                  onChange={(e) => setEditFacility({
                    ...editFacility,
                    title: e.target.value
                  })}
                />
              </Grid>
            </Grid>
          )}

          {(editField === 'item' || editField === 'newItem') && (
            <TextField
              autoFocus
              fullWidth
              label="Item Content"
              multiline
              rows={3}
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              className="mt-2"
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditing(false)}>Cancel</Button>
          <Button
            onClick={handleSaveChanges}
            disabled={saving}
            startIcon={saving ? <CircularProgress size={20} /> : <SaveIcon />}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FacilitiesSection;