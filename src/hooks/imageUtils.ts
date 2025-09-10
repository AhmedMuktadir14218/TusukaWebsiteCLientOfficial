export const getImageUrl = (imagePath: string): string => {
  if (!imagePath) return '';
  
  // If it's already a full URL, return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  const baseImageUrl = import.meta.env.VITE_API_IMAGE_URL;
  // Remove leading slash from imagePath if it exists to avoid double slashes
  const cleanPath = imagePath.startsWith('/') ? imagePath.substring(1) : imagePath;
  
  return `${baseImageUrl}/${cleanPath}`;
};

export const getImageUrls = (images: Array<{ image_path: string }>): string[] => {
  return images.map(image => getImageUrl(image.image_path));
};