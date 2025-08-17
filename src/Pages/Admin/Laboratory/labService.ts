// import { FacilitiesSection, HeaderSection, LabData, LabImage } from '../../../Components/Admin/types/labTypes';
import type { FacilitiesSection, HeaderSection, LabData, LabImage } from '../../../Components/Admin/types/labTypes';
import api from './api';

export const LabService = {
  // Main CRUD operations
  getLabData: async (): Promise<LabData> => {
    const response = await api.get('/tusuka-lab');
    return response.data;
  },

  saveLabData: async (data: LabData): Promise<LabData> => {
    const response = await api.put('/tusuka-lab', data);
    return response.data;
  },

  updateLabData: async (data: LabData): Promise<void> => {
    await api.put('/tusuka-lab', data);
  },

  // Sections
  getHeader: async (): Promise<HeaderSection> => {
    const response = await api.get('/tusuka-lab/sections/header');
    return response.data;
  },

  // Header section specific
  updateHeader: async (data: HeaderSection): Promise<HeaderSection> => {
    const response = await api.put('/tusuka-lab/header', data);
    return response.data;
  },

  getFacilities: async (): Promise<FacilitiesSection> => {
    const response = await api.get('/tusuka-lab/sections/facilities');
    return response.data;
  },

  updateFacilities: async (data: FacilitiesSection): Promise<void> => {
    await api.put('/tusuka-lab/sections/facilities', data);
  },

  // Image handling
  uploadImage: async (file: File, type: 'header' | 'intro'): Promise<LabImage> => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('type', type);

    const response = await api.post('/tusuka-lab/upload-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

  deleteImage: async (id: number): Promise<void> => {
    await api.delete(`/tusuka-lab/images/${id}`);
  },
};