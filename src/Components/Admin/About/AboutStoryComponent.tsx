import React, { useEffect, useState } from 'react';
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Box,
} from '@mui/material';

interface AboutStory {
  id?: number;
  title: string;
  storyTitle: string;
  StoryVideoUrl: string;
  foundingVision: string;
  growthMilestones: string;
  currentStance: string;
}

const AboutStoryComponent: React.FC = () => {
  const [story, setStory] = useState<AboutStory | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [formData, setFormData] = useState<AboutStory>({
    title: '',
    storyTitle: '',
    StoryVideoUrl: '',
    foundingVision: '',
    growthMilestones: '',
    currentStance: '',
  });

  // Fetch the single story
  const fetchStory = async () => {
    try {
      setLoading(true);
      const response = await axios.get<AboutStory>(`${API_BASE_URL}/api/about-story`);
      setStory(response.data || null);
    } catch (err: any) {
      setError('Failed to load story');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStory();
  }, []);

  // Open create modal
  const handleOpenCreate = () => {
    setFormData({ title: '', storyTitle: '', StoryVideoUrl: '', foundingVision: '', growthMilestones: '', currentStance: '' });
    setIsEdit(false);
    setModalOpen(true);
  };

  // Open edit modal
  const handleOpenEdit = () => {
    if (story) {
      setFormData(story);
      setIsEdit(true);
      setModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setError(null);
  };

  // Submit create or update
  const handleSubmit = async () => {
    try {
      if (isEdit && story && story.id) {
        // Update
        const res = await axios.put<AboutStory>(`${API_BASE_URL}/api/about-story/${story.id}`, formData);
        setStory(res.data);
      } else {
        // Create
        const res = await axios.post<AboutStory>(`${API_BASE_URL}/api/about-story`, formData);
        setStory(res.data);
      }
      setModalOpen(false);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Submission failed');
    }
  };

  // Delete
  const handleDelete = async () => {
    if (!story || !story.id) return;
    try {
      await axios.delete(`${API_BASE_URL}/api/about-story/${story.id}`);
      setStory(null);
    } catch (err) {
      setError('Deletion failed');
    }
  };

  return (
    <Box className="p-4">
      <Box className="flex items-center justify-between mb-4">
        <Typography variant="h4">About Story</Typography>
        {story ? (
          <Box>
            <Button variant="contained" color="primary" onClick={handleOpenEdit} className="mr-2">
              Edit
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleDelete}>
              Delete
            </Button>
          </Box>
        ) : (
          <Button variant="contained" color="primary" onClick={handleOpenCreate}>
            Create About Story
          </Button>
        )}
      </Box>

      {loading ? (
        <Typography>Loading...</Typography>
      ) : story ? (
        <TableContainer component={Paper} className="mb-4">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Field</TableCell>
                <TableCell>Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>{story.title}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Story Title</TableCell>
                <TableCell>{story.storyTitle}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Video URL</TableCell>
                <TableCell>
                  <a href={story.StoryVideoUrl} target="_blank" rel="noopener noreferrer">
                    {story.StoryVideoUrl}
                  </a>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Founding Vision</TableCell>
                <TableCell>{story.foundingVision}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Growth Milestones</TableCell>
                <TableCell>{story.growthMilestones}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Current Stance</TableCell>
                <TableCell>{story.currentStance}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      ) : null}

      {/* Modal for Create / Edit */}
      <Dialog open={modalOpen} onClose={handleCloseModal} fullWidth maxWidth="md">
        <DialogTitle>{isEdit ? 'Edit About Story' : 'Create About Story'}</DialogTitle>
        <DialogContent>
          {error && <Typography color="error">{error}</Typography>}
          <Box className="space-y-4 mt-2">
            <TextField
              fullWidth
              label="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            <TextField
              fullWidth
              label="Story Title"
              value={formData.storyTitle}
              onChange={(e) => setFormData({ ...formData, storyTitle: e.target.value })}
            />
            <TextField
              fullWidth
              label="Video URL"
              value={formData.StoryVideoUrl}
              onChange={(e) => setFormData({ ...formData, StoryVideoUrl: e.target.value })}
            />
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Founding Vision"
              value={formData.foundingVision}
              onChange={(e) => setFormData({ ...formData, foundingVision: e.target.value })}
            />
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Growth Milestones"
              value={formData.growthMilestones}
              onChange={(e) => setFormData({ ...formData, growthMilestones: e.target.value })}
            />
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Current Stance"
              value={formData.currentStance}
              onChange={(e) => setFormData({ ...formData, currentStance: e.target.value })}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            {isEdit ? 'Save Changes' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AboutStoryComponent;
