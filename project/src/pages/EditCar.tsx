import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useToast } from '../context/ToastContext';

function EditCar() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [car, setCar] = useState({
    name: '',
    brand: '',
    model: '',
    rentPerDay: '',
    image: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`https://gocruise-carrental-mern-stack-web-app.onrender.com/api/cars/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCar(res.data);
      } catch (err) {
        console.error('Error fetching car:', err);
        showToast('Failed to load car details', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id, showToast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCar({ ...car, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `https://gocruise-carrental-mern-stack-web-app.onrender.com/api/cars/${id}`,
        { ...car },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      showToast('Details updated successfully!', 'success');
      navigate('/cars');
    } catch (err) {
      console.error('Error updating car:', err);
      showToast('Failed to update car', 'error');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Edit Car</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Car Name"
          value={car.name}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded-lg"
          required
        />
        <input
          type="text"
          name="brand"
          placeholder="Brand"
          value={car.brand}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded-lg"
          required
        />
        <input
          type="text"
          name="model"
          placeholder="Model"
          value={car.model}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded-lg"
          required
        />
        <input
          type="number"
          name="rentPerDay"
          placeholder="Rent per Day"
          value={car.rentPerDay}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded-lg"
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={car.image}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded-lg"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all duration-200"
        >
          Update Car
        </button>
      </form>
    </div>
  );
}

export default EditCar;