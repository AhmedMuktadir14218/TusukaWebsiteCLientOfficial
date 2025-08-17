 
 
import React, { useEffect, useState } from 'react';
import { FaEdit, FaSave, FaTimes } from 'react-icons/fa';
  import axios from 'axios'


function HeaderSection() {
  const [data, setData] = useState<{ title: string; description: string }>({ title: '', description: '' });
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);



const BASE_URL = import.meta.env.VITE_API_BASE_URL

 const getHeader = async (): Promise<{ title: string; description: string }> => {
  const response = await axios.get(`${BASE_URL}/api/tusuka-lab/sections/header`)
  return response.data
}

  const updateHeader = async (data: { title: string; description: string }): Promise<{ message: string }> => {
  const response = await axios.put(`${BASE_URL}/api/tusuka-lab/sections/header`, data)
  return response.data
}


  useEffect(() => {
    const fetchHeader = async () => {
      try {
        const response = await getHeader();
        setData(response);
      } catch (error) {
        console.error('Failed to load header data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHeader();
  }, []);

  const handleEditClick = () => {
    setFormData(data);
    setEditMode(true);
    setMessage('');
  };

  const handleCancel = () => {
    setEditMode(false);
    setMessage('');
  };

  const handleSave = async () => {
    try {
      const res = await updateHeader(formData);
      setData(formData);
      setEditMode(false);
      setMessage(res.message || 'Updated successfully!');
    } catch (error: any) {
      setMessage(error.response?.data?.message || 'Failed to update.');
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-gray-800 to-black-600 p-6">
          <h2 className="text-3xl font-bold text-white">Laboratory Header Section</h2>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                {editMode ? (
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                ) : (
                  <p className="text-lg text-gray-800 bg-gray-100 p-2 rounded-md">{data.title}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                {editMode ? (
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  ></textarea>
                ) : (
                  <p className="text-gray-600 bg-gray-100 p-2 rounded-md min-h-[100px]">{data.description}</p>
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-4">
              {editMode ? (
                <>
                  <button 
                    onClick={handleSave} 
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition flex items-center gap-2"
                  >
                    <FaSave /> Save
                  </button>
                  <button 
                    onClick={handleCancel} 
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition flex items-center gap-2"
                  >
                    <FaTimes /> Cancel
                  </button>
                </>
              ) : (
                <button 
                  onClick={handleEditClick} 
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition flex items-center gap-2"
                >
                  <FaEdit /> Edit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {message && (
        <div className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
          {message}
        </div>
      )}
    </div>
  );
}

export default HeaderSection;