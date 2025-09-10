// src/components/FaviconManager.tsx
import React, { useState } from 'react';
import axios from 'axios';

const FaviconManager: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage('Please select a file');
      return;
    }

    setLoading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('favicon', selectedFile);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/favicon/update`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data.success) {
        setMessage('Favicon updated successfully!');
        // Reload the page to see the new favicon
        window.location.reload();
      } else {
        setMessage('Failed to update favicon: ' + response.data.message);
      }
    } catch (error: any) {
      setMessage('Error: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    setLoading(true);
    setMessage('');

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/favicon/reset`
      );

      if (response.data.success) {
        setMessage('Favicon reset to default!');
        window.location.reload();
      } else {
        setMessage('Failed to reset favicon: ' + response.data.message);
      }
    } catch (error: any) {
      setMessage('Error: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Favicon Management</h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Upload New Favicon:
        </label>
        <input
          type="file"
          accept=".png,.ico,.svg,.jpg,.jpeg"
          onChange={handleFileChange}
          className="border rounded p-2"
          disabled={loading}
        />
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleUpload}
          disabled={loading || !selectedFile}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          {loading ? 'Uploading...' : 'Upload Favicon'}
        </button>

        {/* <button
          onClick={handleReset}
          disabled={loading}
          className="bg-gray-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          {loading ? 'Resetting...' : 'Reset to Default'}
        </button> */}
      </div>

      {message && (
        <div className={`mt-4 p-2 rounded ${
          message.includes('Error') || message.includes('Failed') 
            ? 'bg-red-100 text-red-700' 
            : 'bg-green-100 text-green-700'
        }`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default FaviconManager;