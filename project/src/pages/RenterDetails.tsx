import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/Authcontext';
import { useNavigate } from 'react-router-dom';

interface Renter {
  userId: string;
  name: string;
  email: string;
  cars: {
    name: string;
    brand: string;
    model: string;
  }[];
}

const RenterDetails = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [renters, setRenters] = useState<Renter[]>([]);

  useEffect(() => {
    console.log("hello");
    
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }

    const fetchRenters = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/cars/renters', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },    
        });
        setRenters(res.data);
      } catch (err) {
        console.error('Error fetching renter details:', err);
      }
    };

    fetchRenters();
  }, [user, navigate]);

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Renter Details</h1>
      {renters.length === 0 ? (
        <p className="text-gray-500">No renters found.</p>
      ) : (
        renters.map((renter) => (
          <div key={renter.userId} className="mb-6 border p-4 rounded">
            <h2 className="text-lg font-semibold">{renter.name}</h2>
            <p className="text-sm text-gray-600">{renter.email}</p>
            <ul className="list-disc list-inside mt-2 text-sm text-gray-700">
              {renter.cars.map((car, i) => (
                <li key={i}>
                  {car.brand} {car.model} ({car.name})
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default RenterDetails;
