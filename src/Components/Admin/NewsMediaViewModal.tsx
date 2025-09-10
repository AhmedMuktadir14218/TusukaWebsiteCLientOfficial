import React from 'react';
import { X, Calendar, Image, AlertCircle } from 'lucide-react';
import type { NewsMedia } from '../../types/newsMedia'; 
import  { useState } from 'react';
 
 

interface NewsMediaViewModalProps {
  newsMedia: NewsMedia;
  isOpen: boolean;
  onClose: () => void;
}

// Simplified Image Component without CORS-dependent debugging
const NewsImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
  onClick?: () => void;
}> = ({ src, alt, className, onClick }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageLoad = () => {
    setImageLoading(false);
    setImageError(false);
    console.log('✅ Image loaded successfully:', src);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
    console.error('❌ Failed to load image:', src);
  };

  if (imageError) {
    return (
      <div className={`${className} bg-gray-200 flex flex-col items-center justify-center text-gray-500`}>
        <AlertCircle size={24} className="mb-2" />
        <p className="text-sm text-center px-2">Failed to load image</p>
        <button 
          onClick={() => window.open(src, '_blank')}
          className="text-xs text-blue-500 hover:text-blue-700 mt-1"
        >
          Try opening in new tab
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      {imageLoading && (
        <div className={`${className} bg-gray-200 flex items-center justify-center absolute inset-0 z-10`}>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={className}
        onLoad={handleImageLoad}
        onError={handleImageError}
        onClick={onClick}
        // Don't use crossOrigin for simple image display
      />
    </div>
  );
};
const getImageUrl = (path: string) => {
  if (!path) return '/api/placeholder/400/200'; // fallback
  return `${import.meta.env.VITE_API_IMAGE_URL}/${path}`;
};

export const NewsMediaViewModal: React.FC<NewsMediaViewModalProps> = ({
  newsMedia,
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div 
          className="fixed inset-0 bg-opacity-75 backdrop-blur-sm transition-opacity" 
          onClick={handleBackdropClick}
        />
        
        <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
            <h2 className="text-2xl font-bold text-gray-900">News & Media Details</h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Title */}
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                {newsMedia.title}
              </h3>
            </div>

            {/* Date */}
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar size={20} />
              <span className="text-lg">{formatDate(newsMedia.date_of_posting)}</span>
            </div>

            {/* Short Description */}
            {/* {newsMedia.short_description && (
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Summary</h4>
                <p className="text-gray-700 bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                  {newsMedia.short_description}
                </p>
              </div>
            )} */}

            {/* Images */}
{newsMedia.images && newsMedia.images.length > 0 && (
  <div>
    <div className="flex items-center gap-2 mb-4">
      <Image size={20} className="text-gray-600" />
      {/* <h4 className="text-lg font-semibold text-gray-900">
        Images ({newsMedia.images.length})
      </h4> */}
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {newsMedia.images.map((image, index) => {
        const imageUrl = getImageUrl(image.image_path);

        return (
          <div key={image.id} className="relative group">
            {/* Loader overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg animate-pulse">
              <span className="text-gray-400 text-xs">Loading...</span>
            </div>

            <img
              src={imageUrl}
              alt={`${newsMedia.title} - Image ${index + 1}`}
              className="w-full h-48 object-cover rounded-lg shadow-md group-hover:shadow-lg transition-all duration-300 cursor-pointer relative z-10"
              loading="lazy"
              onClick={() => window.open(imageUrl, '_blank')}
              onError={(e) => {
                e.currentTarget.src = '/api/placeholder/400/200';
              }}
            />

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300 rounded-lg flex items-center justify-center">
              <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-medium">
                Click to view full size
              </span>
            </div>
          </div>
        );
      })}
    </div>
  </div>
)}


            {/* Full Description */}
            {newsMedia.description && (
              <div>
                {/* <h4 className="text-lg font-semibold text-gray-900 mb-2">Full Description</h4> */}
                <div className="prose max-w-none">
                  <div className="text-gray-700 leading-relaxed whitespace-pre-wrap bg-gray-50 p-4 rounded-lg">
                    {newsMedia.description}
                  </div>
                </div>
              </div>
            )}

            {/* Meta Information */}
            {/* <div className="bg-gray-50 p-4 rounded-lg border">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Meta Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div>
                    <span className="font-medium text-gray-600">ID:</span>
                    <p className="text-gray-800">#{newsMedia.id}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Created At:</span>
                    <p className="text-gray-800">
                      {new Date(newsMedia.created_at).toLocaleString('en-US', {
                        dateStyle: 'medium',
                        timeStyle: 'short'
                      })}
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div>
                    <span className="font-medium text-gray-600">Total Images:</span>
                    <p className="text-gray-800">{newsMedia.images?.length || 0}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Last Updated:</span>
                    <p className="text-gray-800">
                      {new Date(newsMedia.updated_at).toLocaleString('en-US', {
                        dateStyle: 'medium',
                        timeStyle: 'short'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div> */}

 
          </div>

          {/* Footer */}
          <div className="flex justify-end p-6 border-t border-gray-200 bg-gray-50">
            <button
              onClick={onClose}
              className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};