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

  const getUploadedImages = async (): Promise<Image[]> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/tusuka-lab/uploaded-images`);
      return response.data.images; 
    } catch (error) {
      console.error('Error in getUploadedImages:', error);
      throw error;
    }
  };

  const uploadImages = async (files: File[], type: 'header' | 'intro'): Promise<{ message: string; uploadedImages: Image[] }> => {
    try {
      const formData = new FormData();
      files.forEach(file => {
        formData.append('images[]', file);
      });
      formData.append('type', type);

      const response = await axios.post(`${API_BASE_URL}/api/tusuka-lab/upload-image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
          setUploadProgress(percentCompleted);
        },
      });
      return { message: response.data.message, uploadedImages: response.data.images };
    } catch (error) {
      console.error('Error in uploadImages:', error);
      setUploadProgress(0); // Reset progress on error
      throw error;
    }
  };

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const uploadedImages = await getUploadedImages();
      setImages(Array.isArray(uploadedImages) ? uploadedImages : []);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      try {
        // For intro, check that adding new images doesn't exceed 4
        if (selectedType === 'intro') {
          const currentIntroCount = images.filter(img => img.type === 'intro').length;
          const remainingSlots = 4 - currentIntroCount;
          const newFilesCount = e.target.files.length;

          if (remainingSlots <= 0) {
            alert('You already have 4 intro images. Please delete one to add new.');
            if (fileInputRef.current) fileInputRef.current.value = '';
            return;
          }
          if (newFilesCount > remainingSlots) {
            alert(`You can only add ${remainingSlots} more intro image${remainingSlots === 1 ? '' : 's'}.`);
            if (fileInputRef.current) fileInputRef.current.value = '';
            return;
          }
        }

        setLoading(true);
        setUploadProgress(0);

        const files = Array.from(e.target.files);
        const response = await uploadImages(files, selectedType);

        const newImages = Array.isArray(response.uploadedImages) ? response.uploadedImages : [];

        setImages(prevImages => [...prevImages, ...newImages]);
      } catch (error) {
        console.error('Error uploading images:', error);
      } finally {
        setLoading(false);
        setUploadProgress(0);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
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
    } finally {
      setLoading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // For intro: calculate how many more images can be uploaded
  const introImagesCount = images.filter(img => img.type === 'intro').length;
  const introImagesRemaining = 4 - introImagesCount;

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
            multiple={selectedType === 'header' || selectedType === 'intro'}
            accept="image/jpeg,image/png,image/jpg,image/gif,image/webp"
            className="hidden"
          />

          <Button
            variant="contained"
            color="primary"
            startIcon={<UploadIcon />}
            onClick={triggerFileInput}
            disabled={loading || (selectedType === 'intro' && introImagesRemaining === 0)}
          >
            Upload {selectedType === 'header' ? 'Images' : 'Image'}
          </Button>
        </div>

        {selectedType === 'intro' && (
          <p className="text-sm text-gray-500 mb-4">
            You can upload up to <b>4</b> intro images.
            {introImagesRemaining === 0 ?
              <span className="text-red-500 ml-2">Maximum reached.</span> :
              <span> You can add <b>{introImagesRemaining}</b> more.</span>
            }
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