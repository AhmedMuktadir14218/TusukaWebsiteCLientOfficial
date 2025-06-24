// hooks/useApiData.ts
import { useState, useEffect } from 'react';
import type { AboutPageData } from '../types/about';

export const useApiData = () => {
  const [data, setData] = useState<AboutPageData | null>(null);
  const [storyData, setStoryData] = useState<AboutPageData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/aboutData.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchAboutStoryData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/about-story');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();
        setStoryData(jsonData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchAboutStoryData();
  }, []);

  return { data, loading, error,storyData };
};