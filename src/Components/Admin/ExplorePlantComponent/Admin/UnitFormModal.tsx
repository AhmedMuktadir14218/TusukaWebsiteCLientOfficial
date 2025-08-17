import React, { useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface UnitFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { 
    id?: number;
    title: string; 
    description: string; 
    background_image: string;
    order?: number;
  }) => Promise<void>;
  initialData?: {
    id?: number;
    title: string;
    description: string;
    background_image: string;
    order?: number;
  };
  isSubmitting?: boolean;
}

const UnitFormModal: React.FC<UnitFormModalProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  initialData,
  isSubmitting = false
}) => {
  const [formData, setFormData] = useState({
    id: undefined as number | undefined,
    title: '',
    description: '',
    background_image: '',
    order: 0
  });
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  // Reset form when opening/closing modal or when initialData changes
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({
          id: initialData.id,
          title: initialData.title,
          description: initialData.description,
          background_image: initialData.background_image,
          order: initialData.order || 0
        });
        setImagePreview(initialData.background_image);
      } else {
        setFormData({
          id: undefined,
          title: '',
          description: '',
          background_image: '',
          order: 0
        });
        setImagePreview('');
      }
      setError('');
    }
  }, [isOpen, initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'background_image') {
      setImagePreview(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await onSubmit(formData);
      // Don't close if submitting from parent (let parent handle success)
      if (!isSubmitting) {
        onClose();
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to save unit. Please try again.'
      );
    }
  };

  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog as="div" className="relative z-50" onClose={isSubmitting ? () => {} : onClose}>
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex justify-between items-center mb-4">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    {formData.id ? 'Edit Unit' : 'Add New Unit'}
                  </Dialog.Title>
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-500 focus:outline-none"
                    onClick={onClose}
                    disabled={isSubmitting}
                  >
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {error && (
                  <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md text-sm">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                      Title*
                    </label>
                    <input
                      id="title"
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      Description*
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label htmlFor="background_image" className="block text-sm font-medium text-gray-700">
                      Background Image URL*
                    </label>
                    <input
                      id="background_image"
                      type="url"
                      name="background_image"
                      value={formData.background_image}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                      required
                      disabled={isSubmitting}
                    />
                    {imagePreview && (
                      <div className="mt-2">
                        <p className="text-sm text-gray-500 mb-1">Image Preview:</p>
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          className="h-32 w-full object-cover rounded-md border"
                          onError={() => setImagePreview('')}
                        />
                      </div>
                    )}
                  </div>

                  {formData.id && (
                    <div>
                      <label htmlFor="order" className="block text-sm font-medium text-gray-700">
                        Order
                      </label>
                      <input
                        id="order"
                        type="number"
                        name="order"
                        value={formData.order}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                        disabled={isSubmitting}
                      />
                    </div>
                  )}

                  <div className="flex justify-end space-x-3 pt-4">
                    <button 
                      type="button" 
                      className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      onClick={onClose}
                      disabled={isSubmitting}
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Saving...
                        </span>
                      ) : (
                        formData.id ? 'Save Changes' : 'Create Unit'
                      )}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default UnitFormModal;