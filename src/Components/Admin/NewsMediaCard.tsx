import React from 'react';
import { Edit, Trash2, Eye, Calendar, Image } from 'lucide-react';
export interface NewsMediaImage {
  id: number;
  news_media_id: number;
  image_path: string;
  created_at: string;
  updated_at: string;
}

export interface NewsMedia {
  id: number;
  title: string;
  short_description: string;
  description: string;
  date_of_posting: string;
  created_at: string;
  updated_at: string;
  images: NewsMediaImage[];
}

export interface CreateNewsMediaRequest {
  title: string;
  short_description: string;
  description: string;
  date_of_posting: string;
  images: string[];
}

export interface UpdateNewsMediaRequest {
  title?: string;
  short_description?: string;
  description?: string;
  date_of_posting?: string;
  images?: string[];
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string[]>;
  error?: string;
} 

interface NewsMediaCardProps {
  newsMedia: NewsMedia;
  onEdit: (newsMedia: NewsMedia) => void;
  onDelete: (id: number) => void;
  onView: (newsMedia: NewsMedia) => void;
}

export const NewsMediaCard: React.FC<NewsMediaCardProps> = ({
  newsMedia,
  onEdit,
  onDelete,
  onView
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {/* Header with first image if available */}
      {newsMedia.images && newsMedia.images.length > 0 ? (
        <div className="h-48 bg-gray-200 overflow-hidden">
        <img
  src={`${import.meta.env.VITE_API_IMAGE_URL}/${newsMedia.images[0].image_path}`}
  alt={newsMedia.title}
  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
 
/>

        </div>
      ) : (
        <div className="h-48 bg-gray-100 flex items-center justify-center">
          <Image className="text-gray-400" size={48} />
        </div>
      )}

      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {newsMedia.title}
        </h3>

        {/* Short Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {newsMedia.short_description}
        </p>

        {/* Date */}
        <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
          <Calendar size={16} />
          <span>{formatDate(newsMedia.date_of_posting)}</span>
        </div>

        {/* Images Count */}
        {newsMedia.images && newsMedia.images.length > 0 && (
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
            <Image size={16} />
            <span>{newsMedia.images.length} image{newsMedia.images.length > 1 ? 's' : ''}</span>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <button
            onClick={() => onView(newsMedia)}
            className="flex items-center gap-2 px-3 py-1 text-sm text-blue-600 hover:text-blue-800 transition-colors"
          >
            <Eye size={16} />
            View
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onEdit(newsMedia)}
              className="flex items-center gap-2 px-3 py-1 text-sm text-green-600 hover:text-green-800 transition-colors"
            >
              <Edit size={16} />
              Edit
            </button>
            <button
              onClick={() => onDelete(newsMedia.id)}
              className="flex items-center gap-2 px-3 py-1 text-sm text-red-600 hover:text-red-800 transition-colors"
            >
              <Trash2 size={16} />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};