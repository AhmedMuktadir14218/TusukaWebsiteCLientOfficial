import React, { useState } from 'react';
import { Plus, Search, Filter, Grid, List } from 'lucide-react';
import { useNewsMedia } from '../../../hooks/useNewsMedia';
import { NewsMediaForm } from '../../../Components/Admin/NewsMediaForm';
import { Loading } from '../../../Components/common/Loading';
import { ErrorMessage } from '../../../Components/common/ErrorMessage';
import { NewsMediaCard } from '../../../Components/Admin/NewsMediaCard';
import { NewsMediaViewModal } from '../../../Components/Admin/NewsMediaViewModal';
import { ConfirmationDialog } from '../../../Components/common/ConfirmationDialog';
import type { 
  NewsMedia, 
  CreateNewsMediaRequest, 
  UpdateNewsMediaRequest 
} from '../../../types/newsMedia';

type ViewMode = 'create' | 'edit' | 'list' | 'view';

export const NewsMediaPage: React.FC = () => {
  const {
    newsMedia,
    loading,
    error,
    fetchNewsMedia,
    createNewsMedia,
    updateNewsMedia,
    deleteNewsMedia,
    setError
  } = useNewsMedia();

  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedNewsMedia, setSelectedNewsMedia] = useState<NewsMedia | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    isOpen: boolean;
    id: number | null;
    title: string;
  }>({
    isOpen: false,
    id: null,
    title: ''
  });
  const [displayMode, setDisplayMode] = useState<'grid' | 'list'>('grid');

  // Filter news media based on search term
  const filteredNewsMedia = newsMedia.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.short_description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreate = () => {
    setSelectedNewsMedia(null);
    setViewMode('create');
    setError(null);
  };

  const handleEdit = (newsMediaItem: NewsMedia) => {
    setSelectedNewsMedia(newsMediaItem);
    setViewMode('edit');
    setError(null);
  };

  const handleView = (newsMediaItem: NewsMedia) => {
    setSelectedNewsMedia(newsMediaItem);
    setIsViewModalOpen(true);
  };

  const handleDelete = (id: number) => {
    const item = newsMedia.find(nm => nm.id === id);
    setDeleteConfirmation({
      isOpen: true,
      id,
      title: item?.title || 'Unknown'
    });
  };

  const confirmDelete = async () => {
    if (deleteConfirmation.id) {
      try {
        await deleteNewsMedia(deleteConfirmation.id);
        setDeleteConfirmation({ isOpen: false, id: null, title: '' });
      } catch (error) {
        // Error is handled by the hook
      }
    }
  };

// In your NewsMediaPage component, update the handleFormSubmit function:

const handleFormSubmit = async (formData: FormData) => {
  try {
    if (viewMode === 'create') {
      await createNewsMedia(formData);
    } else if (viewMode === 'edit' && selectedNewsMedia) {
      await updateNewsMedia(selectedNewsMedia.id, formData);
    }
    setViewMode('list');
    setSelectedNewsMedia(null);
  } catch (error) {
    console.error('Error submitting form:', error);
  }
};

  const handleCancel = () => {
    setViewMode('list');
    setSelectedNewsMedia(null);
    setError(null);
  };

  // Render form view
  if (viewMode === 'create' || viewMode === 'edit') {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <NewsMediaForm
            initialData={selectedNewsMedia || undefined}
            onSubmit={handleFormSubmit}
            onCancel={handleCancel}
            loading={loading}
          />
        </div>
      </div>
    );
  }

  // Render list view
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">News & Media</h1>
                <p className="text-gray-600 mt-1">Manage your news and media content</p>
              </div>
              <button
                onClick={handleCreate}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
              >
                <Plus size={20} />
                Create News
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search news and media..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Display Mode Toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setDisplayMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  displayMode === 'grid'
                    ? 'bg-blue-100 text-blue-600'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setDisplayMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  displayMode === 'list'
                    ? 'bg-blue-100 text-blue-600'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <List size={20} />
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Total: {newsMedia.length} items</span>
              {searchTerm && (
                <span>Showing: {filteredNewsMedia.length} filtered items</span>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <Loading />
        ) : error ? (
          <ErrorMessage message={error} onRetry={fetchNewsMedia} />
        ) : filteredNewsMedia.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="text-gray-400 mb-4">
              <Filter size={48} className="mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {searchTerm ? 'No results found' : 'No news media found'}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm 
                ? `No news media matches "${searchTerm}"`
                : 'Start by creating your first news media item'
              }
            </p>
            {!searchTerm && (
              <button
                onClick={handleCreate}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mx-auto"
              >
                <Plus size={20} />
                Create First News
              </button>
            )}
          </div>
        ) : (
          <div className={displayMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'space-y-4'
          }>
            {filteredNewsMedia.map((item) => (
              <NewsMediaCard
                key={item.id}
                newsMedia={item}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onView={handleView}
              />
            ))}
          </div>
        )}
      </div>

      {/* View Modal */}
      {selectedNewsMedia && (
        <NewsMediaViewModal
          newsMedia={selectedNewsMedia}
          isOpen={isViewModalOpen}
          onClose={() => {
            setIsViewModalOpen(false);
            setSelectedNewsMedia(null);
          }}
        />
      )}

      {/* Delete Confirmation */}
      <ConfirmationDialog
        isOpen={deleteConfirmation.isOpen}
        title="Delete News & Media"
        message={`Are you sure you want to delete "${deleteConfirmation.title}"? This action cannot be undone.`}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteConfirmation({ isOpen: false, id: null, title: '' })}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  );
};

export default NewsMediaPage;