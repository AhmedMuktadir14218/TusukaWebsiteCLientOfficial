// resources/js/pages/Laboratory/useLabApi.ts
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL; 

export const getHeader = async () => {
  const response = await axios.get(`${API_BASE}/sections/header`);
  return response.data;
};

export const updateHeader = async (data: {
  title: string;
  description: string;
}) => {
  const response = await axios.put(`${API_BASE}/sections/header`, data);
  return response.data;
};


export const getUploadedImages = async () => {
  const response = await axios.get(`${API_BASE}/uploaded-images`);
  return response.data.images;
};

export const uploadImages = async (files: File[], type: 'header' | 'intro') => {
  const formData = new FormData();
  files.forEach(file => {
    formData.append('images[]', file);
  });
  formData.append('type', type);
  
  const response = await axios.post(`${API_BASE}/upload-image`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

export const deleteImage = async (id: number) => {
  const response = await axios.delete(`${API_BASE}/images/${id}`);
  return response.data;
};

export const getIntro = async () => {
  const response = await axios.get(`${API_BASE}/sections/intro`);
  return response.data;
};

// resources/js/pages/Laboratory/useLabApi.ts
export const updateIntro = async (formData: FormData) => {
  try {
    const response = await axios.post(`${API_BASE}/sections/intro`, formData, {
      headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    });
    return response.data;
  } catch (error) {
    console.error('API Error Details:');
    throw error;
  }
};

// resources/js/pages/Laboratory/useLabApi.ts

// ... existing imports and other API functions ...

// resources/js/pages/Laboratory/useLabApi.ts
// Define the Service type if not imported from elsewhere
export type Service = {
  id: number;
  name: string;
  description: string;
  // Add other fields as needed
};

export const getServices = async (): Promise<Service[]> => {
  const response = await axios.get(`${API_BASE}/sections/services`);
  return response.data;
};

export const updateServicesSection = async (services: Service[]) => {
  try {
    const response = await axios.post(`${API_BASE}/sections/services`, services, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('API Error Details:', {
      request: error.config?.data,
      response: error.response?.data
    });
    throw error;
  }
};

// resources/js/pages/Laboratory/useLabApi.ts

// ... existing imports and other API functions ...

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

export const getFacilities = async (): Promise<FacilitiesData> => {
  const response = await axios.get(`${API_BASE}/sections/facilities`);
  return response.data;
};

export const updateFacilitiesSection = async (data: FacilitiesData) => {
  try {
    const response = await axios.post(`${API_BASE}/sections/facilities`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('API Error Details:', {
      request: error.config?.data,
      response: error.response?.data
    });
    throw error;
  }
};

// resources/js/pages/Laboratory/useLabApi.ts

// ... existing imports and other API functions ...

interface Certification {
  iconType: string;
  title: string;
  description: string;
}

export const getCertifications = async (): Promise<Certification[]> => {
  const response = await axios.get(`${API_BASE}/sections/certifications`);
  return response.data;
};

export const updateCertificationsSection = async (certifications: Certification[]) => {
  try {
    const response = await axios.put(`${API_BASE}/sections/certifications`, certifications, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('API Error Details:', {
      request: error.config?.data,
      response: error.response?.data
    });
    throw error;
  }
};