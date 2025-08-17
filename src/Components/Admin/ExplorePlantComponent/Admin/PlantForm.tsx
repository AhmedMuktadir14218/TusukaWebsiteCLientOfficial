import React, { useState } from 'react';
import type { Plant, Unit } from '../../types/explorePlants'; // Ensure this path is correct

interface PlantFormProps {
  units: Unit[];
  initialData?: Partial<Plant>;
  onSubmit: (data: Omit<Plant, 'id'>) => Promise<void>;
  onCancel: () => void;
}

const PlantForm: React.FC<PlantFormProps> = ({ units, initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<Omit<Plant, 'id'>>({
    plant_id: initialData?.plant_id || '',
    name: initialData?.name || '',
    short_description: initialData?.short_description || '',
    images: initialData?.images || [],
    details: initialData?.details || {},
    unit_id: initialData?.unit_id || units[0]?.id || 0
  });

  const [newImage, setNewImage] = useState('');
  const [newDetailKey, setNewDetailKey] = useState('');
  const [newDetailValue, setNewDetailValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddImage = () => {
    if (newImage.trim()) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, newImage.trim()]
      }));
      setNewImage('');
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      // TypeScript now knows prev.images is string[], so it infers _ as string and i as number
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleAddDetail = () => {
    if (newDetailKey.trim()) {
      setFormData(prev => ({
        ...prev,
        details: {
          ...prev.details,
          [newDetailKey.trim()]: newDetailValue.trim()
        }
      }));
      setNewDetailKey('');
      setNewDetailValue('');
    }
  };

  const handleRemoveDetail = (key: string) => {
    const newDetails = { ...formData.details };
    delete newDetails[key];
    setFormData(prev => ({
      ...prev,
      details: newDetails
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Unit</label>
        <select
          name="unit_id"
          value={formData.unit_id}
          onChange={handleChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
          {units.map(unit => (
            <option key={unit.id} value={unit.id}>{unit.title}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Plant ID</label>
        <input
          type="text"
          name="plant_id"
          value={formData.plant_id}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Short Description</label>
        <textarea
          name="short_description"
          value={formData.short_description}
          onChange={handleChange}
          rows={3}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Images</label>
        <div className="mt-1 flex">
          <input
            type="text"
            value={newImage}
            onChange={(e) => setNewImage(e.target.value)}
            placeholder="Image URL"
            className="block w-full border border-gray-300 rounded-l-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          <button
            type="button"
            onClick={handleAddImage}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add
          </button>
        </div>
        <div className="mt-2 space-y-2">
          {/* TypeScript now infers 'image' as string and 'index' as number */}
          {formData.images.map((image, index) => (
            <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
              <span className="truncate text-sm">{image}</span>
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Details</label>
        <div className="mt-1 grid grid-cols-3 gap-2">
          <input
            type="text"
            value={newDetailKey}
            onChange={(e) => setNewDetailKey(e.target.value)}
            placeholder="Key"
            className="col-span-1 block border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          <input
            type="text"
            value={newDetailValue}
            onChange={(e) => setNewDetailValue(e.target.value)}
            placeholder="Value"
            className="col-span-1 block border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          <button
            type="button"
            onClick={handleAddDetail}
            className="col-span-1 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add Detail
          </button>
        </div>
        <div className="mt-2 space-y-2">
          {Object.entries(formData.details).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between bg-gray-50 p-2 rounded">
              <span className="text-sm">
                <span className="font-medium">{key}:</span> {String(value)}
              </span>
              <button
                type="button"
                onClick={() => handleRemoveDetail(key)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default PlantForm;