import React, { useState } from 'react';
import { Upload, Plus } from 'lucide-react';
import axios from 'axios';
import { useToast } from '../context/ToastContext';

function AdminUpload() {
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    model: '',
    rentPerDay: '',
    image: ''
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');

    try {
      const token = localStorage.getItem('token');

      await axios.post(
        'http://localhost:3000/api/cars',
        {
          name: formData.name,
          brand: formData.brand,
          model: formData.model,
          rentPerDay: Number(formData.rentPerDay),
          image: formData.image
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccessMessage('Car uploaded successfully!');
      showToast('Car uploaded successfully!', 'success');
      setFormData({
        name: '',
        brand: '',
        model: '',
        rentPerDay: '',
        image: ''
      });
    } catch (err) {
      console.error('Upload failed:', err);
      setSuccessMessage('Upload failed. Check console for details.');
      showToast('Upload failed. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-xl mx-auto">
        <div className="flex items-center space-x-4 mb-8">
          <Upload className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Upload New Car</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Car Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
              <input
                type="text"
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
              <input
                type="text"
                value={formData.model}
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Daily Rent (In Rupees)</label>
              <input
                type="number"
                value={formData.rentPerDay}
                onChange={(e) => setFormData({ ...formData, rentPerDay: e.target.value })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 shadow-sm"
            >
              <Plus className="h-5 w-5 mr-2" />
              {loading ? 'Uploading...' : 'Add Car'}
            </button>
          </div>

          {successMessage && (
            <p className="text-sm text-green-600 text-center mt-4">{successMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
}

export default AdminUpload;