// // hooks/useApiData.ts





// hooks/useApiData.ts
import { useState, useEffect } from 'react';
import type { AboutPageData } from '../types/about';

export const useApiData = () => {
  const [data, setData] = useState<AboutPageData | null>(null);
  const [storyData, setStoryData] = useState<AboutPageData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Use import.meta.env to access environment variables, with a fallback
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

  // Effect for fetching aboutData.json
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/aboutData.json'); // This is a static file, usually served from the public folder
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        // Only set loading to false here if this is the ONLY data source
        // Since there are two fetches, we need to handle loading more carefully.
        // For now, keep it as is, but consider a combined loading state for multiple fetches.
      }
    };

    fetchData();
  }, []); // Empty dependency array means this runs once on mount

  // Effect for fetching about-story from API
  useEffect(() => {
    const fetchAboutStoryData = async () => {
      // It's good practice to ensure the base URL is defined
      if (!API_BASE_URL) {
        console.error('VITE_API_BASE_URL is not defined in your environment variables.');
        setError('API base URL is not configured.');
        setLoading(false); // Stop loading if configuration is missing
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/api/about-story`); // Use the environment variable
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();
        setStoryData(jsonData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false); // Set loading to false once this fetch completes
      }
    };

    fetchAboutStoryData();
  }, [API_BASE_URL]); // Add API_BASE_URL to dependencies

  // A small improvement: If both data fetches complete, and `loading` is still true
  // from the initial state, ensure it becomes false.
  // This hook has two independent fetch calls that both manage `setLoading(false)`.
  // This setup means `loading` will become `false` as soon as the *last* of the two
  // fetches completes. This might be fine for simple cases, but for more complex
  // scenarios with multiple API calls, you might want a more robust loading state
  // management (e.g., using a counter or Promise.all). For this direct change,
  // I'll keep the `finally` blocks as they are.

  return { data, loading, error, storyData };
};




// import { useState, useEffect } from 'react';
// import type { AboutPageData } from '../types/about';

// export const useApiData = () => {
//   const [data, setData] = useState<AboutPageData | null>(null);
//   const [storyData, setStoryData] = useState<AboutPageData | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('/aboutData.json');
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const jsonData = await response.json();
//         setData(jsonData);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : 'An unknown error occurred');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     const fetchAboutStoryData = async () => {
//       try {
//         const response = await fetch('http://localhost:8000/api/about-story');
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const jsonData = await response.json();
//         setStoryData(jsonData);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : 'An unknown error occurred');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAboutStoryData();
//   }, []);

//   return { data, loading, error,storyData };
// };