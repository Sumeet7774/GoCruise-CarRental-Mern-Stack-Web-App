import { Car as CarIcon } from 'lucide-react';
import { useAuth } from '../context/Authcontext';
import axios from 'axios';
import { useEffect } from 'react';
import { useToast } from '../context/ToastContext';
function RentedCars() {
    const { rentedCars, setRentedCars, user, setUser, RentedCars } = useAuth();
    const { showToast } = useToast();

    // Calculate total bill
    const totalBill = rentedCars.reduce((acc, car) => acc + car.rentPerDay, 0);

    // Return car handler
    const handleReturnCar = async (carId: string) => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(
                `https://gocruise-carrental-mern-stack-web-app.onrender.com/api/cars/return/${carId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            showToast("Car Returned successfully ", "success")

            // Update context after return
            const updatedRentedCars = rentedCars.filter((car) => car._id !== carId);
            setRentedCars(updatedRentedCars);

            // Also update user context
            if (user) {
                setUser({
                    ...user,
                    rentedCars: updatedRentedCars,
                });
            }

        } catch (error) {
            console.error('Failed to return car:', error);
        }
    };
    useEffect(() => {
        RentedCars();
    }, [])

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center space-x-4 mb-6">
                <CarIcon className="h-8 w-8 text-blue-600" />
                <h1 className="text-3xl font-bold text-gray-900">Your Rented Cars</h1>
            </div>

            {rentedCars.length === 0 ? (
                <p className="text-gray-600">You haven’t rented any cars yet.</p>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                        {rentedCars.map((car) => (
                            <div key={car._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                <div className="relative h-48">
                                    <img
                                        src={car.image}
                                        alt={car.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-4">
                                    <h2 className="text-xl font-semibold text-gray-900">{car.name}</h2>
                                    <p className="text-gray-600">Brand: {car.brand}</p>
                                    <p className="text-gray-600">Model: {car.model}</p>
                                    <div className="mt-2">
                                        <span className="text-2xl font-bold text-blue-600">${car.rentPerDay}</span>
                                        <span className="text-gray-600"> / day</span>
                                    </div>
                                    <button
                                        onClick={() => handleReturnCar(car._id)}
                                        className="mt-4 w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition-colors"
                                    >
                                        Return Car
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-right mt-4">
                        <p className="text-xl font-semibold text-gray-800">
                            Total Bill: <span className="text-blue-600">${totalBill}</span>
                        </p>
                    </div>
                </>
            )}
        </div>
    );
}

export default RentedCars;