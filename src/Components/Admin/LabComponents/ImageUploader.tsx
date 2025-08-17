// resources/js/components/LabComponents/ImageUploader.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Delete as DeleteIcon, CloudUpload as UploadIcon } from '@mui/icons-material';
import { IconButton, Button, CircularProgress } from '@mui/material';
import axios from 'axios';

interface Image {
  id: number;
  path: string;
  filename: string;
  type: 'header' | 'intro';
  // Assuming 'order' is also part of the image structure as seen in your response
  order?: number; 
}

const ImageUploader: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedType, setSelectedType] = useState<'header' | 'intro'>('header');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const API_IMAGE_URL = import.meta.env.VITE_API_IMAGE_URL || API_BASE_URL;

  // --- API Functions ---

  /**
   * Fetches the list of all uploaded images.
   * @returns {Promise<Image[]>} A promise that resolves to an array of Image objects.
   */
  const getUploadedImages = async (): Promise<Image[]> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/tusuka-lab/uploaded-images`);
      // **FIXED**: Access the 'images' property from the response data
      return response.data.images; 
    } catch (error) {
      console.error('Error in getUploadedImages:', error);
      throw error;
    }
  };

  /**
   * Uploads one or more images of a specific type.
   * @param {File[]} files - An array of File objects to upload.
   * @param {'header' | 'intro'} type - The type of image ('header' or 'intro').
   * @returns {Promise<{ message: string; uploadedImages: Image[] }>} A promise that resolves to an object with a message and uploaded images.
   */
  const uploadImages = async (files: File[], type: 'header' | 'intro'): Promise<{ message: string; uploadedImages: Image[] }> => {
    try {
      const formData = new FormData();
      files.forEach(file => {
        formData.append('images[]', file); // 'images[]' for multiple files
      });
      formData.append('type', type); // Append the image type

      const response = await axios.post(`${API_BASE_URL}/api/tusuka-lab/upload-image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
          setUploadProgress(percentCompleted);
        },
      });
      // Assuming the API response for upload also has an 'images' property for uploaded files
      return { message: response.data.message, uploadedImages: response.data.images }; 
    } catch (error) {
      console.error('Error in uploadImages:', error);
      setUploadProgress(0); // Reset progress on error
      throw error;
    }
  };

  /**
   * Deletes an image by its ID.
   * @param {number} id - The ID of the image to delete.
   * @returns {Promise<{ message: string }>} A promise that resolves to an object with a success message.
   */
  const deleteImage = async (id: number): Promise<{ message: string }> => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/api/tusuka-lab/images/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error in deleteImage:', error);
      throw error;
    }
  };

  // --- Component Logic ---

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const uploadedImages = await getUploadedImages();
      // Added a defensive check to ensure 'uploadedImages' is an array
      setImages(Array.isArray(uploadedImages) ? uploadedImages : []);
    } catch (error) {
      console.error('Error fetching images:', error);
      // Optionally, show a user-friendly error message
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      try {
        setLoading(true);
        setUploadProgress(0);

        const files = Array.from(e.target.files);
        const response = await uploadImages(files, selectedType);
        
        // Added a defensive check to ensure 'response.uploadedImages' is an array
        const newImages = Array.isArray(response.uploadedImages) ? response.uploadedImages : [];

        setImages(prevImages => {
          if (selectedType === 'intro') {
            // For intro, replace existing intro image(s) if any
            return [...prevImages.filter(img => img.type !== 'intro'), ...newImages];
          }
          // For header, just add new images
          return [...prevImages, ...newImages];
        });

      } catch (error) {
        console.error('Error uploading images:', error);
        // Optionally, show a user-friendly error message
      } finally {
        setLoading(false);
        setUploadProgress(0);
        if (fileInputRef.current) {
          fileInputRef.current.value = ''; // Clear the file input
        }
      }
    }
  };

  const handleDelete = async (id: number) => {
    try {
      setLoading(true);
      await deleteImage(id);
      setImages(prevImages => prevImages.filter(img => img.id !== id));
    } catch (error) {
      console.error('Error deleting image:', error);
      // Optionally, show a user-friendly error message
    } finally {
      setLoading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Image Uploader</h2>

        <div className="flex items-center space-x-4 mb-4">
          <div>
            <label className="mr-2">Image Type:</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as 'header' | 'intro')}
              className="border rounded px-3 py-1"
            >
              <option value="header">Header</option>
              <option value="intro">Intro</option>
            </select>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            multiple={selectedType === 'header'}
            accept="image/jpeg,image/png,image/jpg,image/gif,image/webp"
            className="hidden"
          />

          <Button
            variant="contained"
            color="primary"
            startIcon={<UploadIcon />}
            onClick={triggerFileInput}
            disabled={loading}
          >
            Upload {selectedType === 'header' ? 'Images' : 'Image'}
          </Button>
        </div>

        {selectedType === 'intro' && (
          <p className="text-sm text-gray-500 mb-4">
            Note: Only one intro image is allowed. Uploading a new one will replace the existing.
          </p>
        )}
      </div>

      {loading && uploadProgress > 0 && (
        <div className="mb-4 flex items-center">
          <CircularProgress variant="determinate" value={uploadProgress} />
          <span className="ml-2">{uploadProgress}%</span>
        </div>
      )}

      {loading && !uploadProgress && (
        <div className="flex justify-center my-8">
          <CircularProgress />
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Added Array.isArray check for robustness */}
        {Array.isArray(images) && images.map((image) => (
          <div key={image.id} className="relative group rounded-lg overflow-hidden border border-gray-200">
            <img
              src={`${API_IMAGE_URL}/${image.path}`}
              alt={image.filename}
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <IconButton
                color="error"
                onClick={() => handleDelete(image.id)}
                className="bg-white hover:bg-red-50"
              >
                <DeleteIcon />
              </IconButton>
            </div>
            <div className="p-2 bg-white">
              <p className="text-sm font-medium truncate">{image.filename}</p>
              <span className={`text-xs px-2 py-1 rounded-full ${
                image.type === 'header' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
              }`}>
                {image.type}
              </span>
            </div>
          </div>
        ))}
      </div>

      {!loading && images.length === 0 && (
        <div className="text-center py-12 border-2 border-dashed rounded-lg">
          <UploadIcon className="text-gray-400 text-4xl mb-2" />
          <p className="text-gray-500">No images uploaded yet</p>
          <Button
            variant="outlined"
            color="primary"
            className="mt-4"
            onClick={triggerFileInput}
          >
            Upload Images
          </Button>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;