import axios from 'axios';
import type { 
  NewsMedia, 
  ApiResponse 
} from '../types/newsMedia';

// Create axios instance
const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
  headers: {
    'Accept': 'application/json',
  },
});

export class NewsMediaApi {
  // Get all news media
  static async getAll(): Promise<ApiResponse<NewsMedia[]>> {
    try {
      const response = await api.get('/news-media');
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { success: false, message: 'Network error' };
    }
  }

  // Get single news media by ID
  static async getById(id: number): Promise<ApiResponse<NewsMedia>> {
    try {
      const response = await api.get(`/news-media/${id}`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { success: false, message: 'Network error' };
    }
  }

  // Create new news media
  static async create(formData: FormData): Promise<ApiResponse<NewsMedia>> {
    try {
      const response = await api.post('/news-media', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { success: false, message: 'Network error' };
    }
  }

  // Update news media
  static async update(id: number, formData: FormData): Promise<ApiResponse<NewsMedia>> {
    try {
      // For updates, we might need to use POST with _method override
      formData.append('_method', 'PUT');
      const response = await api.post(`/news-media/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { success: false, message: 'Network error' };
    }
  }

  // Delete news media
  static async delete(id: number): Promise<ApiResponse<void>> {
    try {
      const response = await api.delete(`/news-media/${id}`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { success: false, message: 'Network error' };
    }
  }
}