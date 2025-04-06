import { useEffect, useState } from 'react';
import { Car as CarIcon, Pencil, Trash2, IndianRupee } from 'lucide-react';
import { useAuth } from '../context/Authcontext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useToast } from '../context/ToastContext';

function Cars() {
  const { cars, fetchCars, user } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();

  useEffect(() => {
    fetchCars();
  }, []);

  const handleRentCar = async (carId: string) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `http://localhost:3000/api/cars/rent/${carId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      showToast('Car rented successfully!', 'success');
      fetchCars();
    } catch (error: any) {
      console.error('Rent car error:', error);
      showToast(error.response?.data?.message || 'Failed to rent car', 'error');
    }
  };

  const handleDeleteCar = async (carId: string) => {
    const confirm = window.confirm('Are you sure you want to delete this car?');
    if (!confirm) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3000/api/cars/${carId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      showToast('Car deleted successfully!', 'success');
      fetchCars();
    } catch (error: any) {
      console.error('Delete car error:', error);
      showToast(error.response?.data?.message || 'Failed to delete car', 'error');
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-10">
        <CarIcon className="h-8 w-8 text-blue-600" />
        <h1 className="text-3xl font-bold text-gray-900">Available Cars</h1>
      </div>

      {/* Car Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cars
          .filter((car) => car.available)
          .map((car) => (
            <div
              key={car._id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              <div className="relative h-52">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-5">
                <h2 className="text-xl font-bold text-gray-800 mb-1">{car.name}</h2>
                <p className="text-gray-600 mb-1">Brand: {car.brand}</p>
                <p className="text-gray-600 mb-3">Model: {car.model}</p>

                <div className="text-blue-600 text-xl font-semibold mb-4">
                  <div className="pric flex items-center">   
                    <IndianRupee width={20} height={20} />
                    {car.rentPerDay} <span className="text-sm text-gray-600">/day</span>
                  </div>
                </div>

                {user?.role === 'admin' ? (
                  <div className="flex space-x-3">
                    <button
                      onClick={() => navigate(`/editcar/${car._id}`)}
                      className="flex-1 flex items-center justify-center gap-1 bg-blue-400 hover:bg-yellow-500 text-white py-2 rounded-lg transition-all duration-200"
                    >
                      <Pencil className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteCar(car._id)}
                      className="flex-1 flex items-center justify-center gap-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition-all duration-200"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleRentCar(car._id)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-all duration-200"
                  >
                    Rent Now
                  </button>
                )}
              </div>
            </div>
          ))}
      </div>

      {cars.filter(car => car.available).length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500 text-lg">No cars available at the moment.</p>
        </div>
      )}
    </div>
  );
}

export default Cars;