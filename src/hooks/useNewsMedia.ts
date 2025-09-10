import { useState, useEffect } from 'react';
import { NewsMediaApi } from './newsMediaApi';
import type { NewsMedia } from '../types/newsMedia';

export const useNewsMedia = () => {
  const [newsMedia, setNewsMedia] = useState<NewsMedia[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNewsMedia = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await NewsMediaApi.getAll();
      if (response.success && response.data) {
        setNewsMedia(response.data);
      } else {
        setError(response.message);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch news media');
    } finally {
      setLoading(false);
    }
  };

  const createNewsMedia = async (formData: FormData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await NewsMediaApi.create(formData);
      if (response.success && response.data) {
        setNewsMedia(prev => [response.data!, ...prev]);
        return response.data;
      } else {
        throw new Error(response.message);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to create news media');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateNewsMedia = async (id: number, formData: FormData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await NewsMediaApi.update(id, formData);
      if (response.success && response.data) {
        setNewsMedia(prev => 
          prev.map(item => item.id === id ? response.data! : item)
        );
        return response.data;
      } else {
        throw new Error(response.message);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to update news media');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteNewsMedia = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await NewsMediaApi.delete(id);
      if (response.success) {
        setNewsMedia(prev => prev.filter(item => item.id !== id));
      } else {
        throw new Error(response.message);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to delete news media');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewsMedia();
  }, []);

  return {
    newsMedia,
    loading,
    error,
    fetchNewsMedia,
    createNewsMedia,
    updateNewsMedia,
    deleteNewsMedia,
    setError
  };
};