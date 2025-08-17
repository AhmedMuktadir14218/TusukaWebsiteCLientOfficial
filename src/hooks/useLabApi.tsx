// hooks/useLabApi.tsx
import { useState, useEffect } from 'react';

interface LaboratoryData {
  pageHeader: {
    images: Array<{
      id: number;
      path: string;
      filename: string;
    }>;
    title: string;
    description: string;
  };
  introSection: {
    image: {
      id: number;
      path: string;
      filename: string;
    };
    title: string;
    paragraphs: string[];
  };
  services: Array<{
    iconType: string;
    title: string;
    description: string;
  }>;
  facilities: {
    SectionTitle: string;
    SectionDescription: string;
    colorFastness: {
      iconType: string;
      title: string;
      items: string[];
    };
    physical: {
      iconType: string;
      title: string;
      items: string[];
    };
    strength: {
      iconType: string;
      title: string;
      items: string[];
    };
  };
  certifications: Array<{
    iconType: string;
    title: string;
    description: string;
  }>;
}

const useLabApi = () => {
  const [labData, setLabData] = useState<LaboratoryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
  useEffect(() => {
    const fetchLabData = async () => {
      try {
        // First try to fetch from API endpoint
        const apiResponse = await fetch(`${API_BASE_URL}/api/tusuka-lab`);
        
        if (apiResponse.ok) {
          const data = await apiResponse.json();
          setLabData(data);
          return;
        }
        
        // If API fails, try to fetch from local JSON file
        const jsonResponse = await fetch('/laboratoryData.json');
        if (!jsonResponse.ok) {
          throw new Error('Failed to fetch laboratory data from both API and local file');
        }
        const jsonData = await jsonResponse.json();
        setLabData(jsonData);
      } catch (err) {
        console.error("Error fetching laboratory data:", err);
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchLabData();
  }, []);

  return { labData, loading, error };
};

export default useLabApi;