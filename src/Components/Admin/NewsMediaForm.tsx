import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { X, Plus,   Save, ArrowLeft, Upload } from 'lucide-react';
import type { NewsMedia } from './NewsMediaCard';

// Keep your existing interfaces
export interface CreateNewsMediaRequest {
  title: string;
  short_description: string;
  description: string;
  date_of_posting: string;
  images?: File[];
}

export interface UpdateNewsMediaRequest {
  title?: string;
  short_description?: string;
  description?: string;
  date_of_posting?: string;
  images?: File[];
}

interface NewsMediaFormProps {
  initialData?: NewsMedia | null;
  onSubmit: (data: FormData) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

export const NewsMediaForm: React.FC<NewsMediaFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  loading = false
}) => {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  
  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      title: initialData?.title || '',
      short_description: initialData?.short_description || '',
      description: initialData?.description || '',
      date_of_posting: initialData?.date_of_posting || new Date().toISOString().split('T')[0],
    }
  });

  useEffect(() => {
    if (initialData) {
      reset({
        title: initialData.title,
        short_description: initialData.short_description,
        description: initialData.description,
        date_of_posting: initialData.date_of_posting,
      });
      setImageFiles([]);
    }
  }, [initialData, reset]);

  // Handle adding new files to existing ones
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files);
      
      // Filter out duplicates based on file name and size
      const filteredNewFiles = newFiles.filter(newFile => 
        !imageFiles.some(existingFile => 
          existingFile.name === newFile.name && 
          existingFile.size === newFile.size
        )
      );
      
      setImageFiles(prev => [...prev, ...filteredNewFiles]);
      
      // Clear the input so the same file can be selected again if needed
      e.target.value = '';
    }
  };

  // Remove individual image
  const removeImage = (index: number) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index));
  };

  // Clear all images
  const clearAllImages = () => {
    setImageFiles([]);
  };

  // Handle drag and drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = Array.from(e.dataTransfer.files).filter(file => 
      file.type.startsWith('image/')
    );
    
    if (files.length > 0) {
      // Filter out duplicates
      const filteredNewFiles = files.filter(newFile => 
        !imageFiles.some(existingFile => 
          existingFile.name === newFile.name && 
          existingFile.size === newFile.size
        )
      );
      
      setImageFiles(prev => [...prev, ...filteredNewFiles]);
    }
  };

  const handleFormSubmit = async (formData: any) => {
    const submitData = new FormData();
    
    // Append text fields
    submitData.append('title', formData.title);
    submitData.append('short_description', formData.short_description);
    submitData.append('description', formData.description);
    submitData.append('date_of_posting', formData.date_of_posting);
    
    // Append images in the format your controller expects: images[]
    imageFiles.forEach((file) => {
      submitData.append('images[]', file);
    });

    // Debug log
    console.log('Form data being sent:');
    console.log('Number of images:', imageFiles.length);
    for (let [key, value] of submitData.entries()) {
      console.log(key, value);
    }
    
    await onSubmit(submitData);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            {initialData ? 'Edit News & Media' : 'Create News & Media'}
          </h2>
          <button
            onClick={onCancel}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title *
          </label>
          <Controller
            name="title"
            control={control}
            rules={{ required: 'Title is required' }}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter news title"
              />
            )}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        {/* Short Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Short Description *
          </label>
          <Controller
            name="short_description"
            control={control}
            rules={{ required: 'Short description is required' }}
            render={({ field }) => (
              <textarea
                {...field}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter short description"
              />
            )}
          />
          {errors.short_description && (
            <p className="mt-1 text-sm text-red-600">{errors.short_description.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description  
                      </label>
          <Controller
            name="description"
            control={control}
            rules={{ required: 'Description is required' }}
            render={({ field }) => (
              <textarea
                {...field}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter full description"
              />
            )}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
          )}
        </div>

        {/* Date of Posting */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date of Posting *
          </label>
          <Controller
            name="date_of_posting"
            control={control}
            rules={{ required: 'Date is required' }}
            render={({ field }) => (
              <input
                {...field}
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            )}
          />
          {errors.date_of_posting && (
            <p className="mt-1 text-sm text-red-600">{errors.date_of_posting.message}</p>
          )}
        </div>

        {/* Images */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Images {imageFiles.length > 0 && `(${imageFiles.length} selected)`}
            </label>
            {imageFiles.length > 0 && (
              <button
                type="button"
                onClick={clearAllImages}
                className="text-sm text-red-600 hover:text-red-800 transition-colors"
              >
                Clear All
              </button>
            )}
          </div>

          {/* File Input */}
          <div className="mb-4">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-sm text-gray-500 mt-1">
              You can select multiple images at once or add them one by one. Supported formats: JPEG, PNG, JPG, GIF, WebP (Max: 2MB each)
            </p>
          </div>

          {/* Drag and Drop Area */}
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
              Drag and drop images here, or use the file input above
            </p>
            <p className="text-xs text-gray-500">
              Images will be added to your current selection
            </p>
          </div>
          
          {/* Preview selected images */}
          {imageFiles.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Selected Images:</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {imageFiles.map((file, index) => (
                  <div key={`${file.name}-${index}`} className="relative group">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-24 object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <X size={12} />
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 rounded-b-md opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="truncate">{file.name}</p>
                      <p>{(file.size / 1024).toFixed(1)} KB</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Add more button */}
              <div className="mt-3">
                <label className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 transition-colors cursor-pointer">
                  <Plus size={16} />
                  Add More Images
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          )}

          {/* Show existing images if editing */}
          {initialData?.images && initialData.images.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Current Images:</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {initialData.images.map((image, index) => (
                  <div key={image.id} className="relative">
                    <img
                      src={`http://192.168.105.71/TusukaWebServerV6/${image.image_path}`}
                      alt={`Current ${index + 1}`}
                      className="w-full h-24 object-cover rounded-md"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Im0xNSAxMy0zIDMtMy0zIiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Im05IDktMyAzIDMtMyIgc3Ryb2tlPSIjOUNBM0FGIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K';
                      }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 rounded-b-md">
                      <p>Existing image</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                <p className="text-sm text-yellow-700">
                  <strong>Note:</strong> Uploading new images will replace all existing images. 
                  If you want to keep existing images, don't upload any new files.
                </p>
              </div>
            </div>
          )}

          {/* Image guidelines */}
          <div className="mt-4 p-3 bg-gray-50 rounded-md">
            <h5 className="text-sm font-medium text-gray-700 mb-2">Image Guidelines:</h5>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Maximum file size: 2MB per image</li>
              <li>• Supported formats: JPEG, PNG, JPG, GIF, WebP</li>
              <li>• You can select multiple images at once or add them individually</li>
              <li>• Drag and drop images directly onto the upload area</li>
              <li>• Duplicate images (same name and size) will be automatically filtered out</li>
            </ul>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            <ArrowLeft size={16} />
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            <Save size={16} />
            {loading ? 'Saving...' : initialData ? 'Update' : 'Create'}
            {imageFiles.length > 0 && ` (${imageFiles.length} images)`}
          </button>
        </div>
      </form>
    </div>
  );
};