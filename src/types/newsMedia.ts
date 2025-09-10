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