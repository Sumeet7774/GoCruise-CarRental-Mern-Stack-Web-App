import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';



interface User {
    name: string;
    email: string;
    role: 'renter' | 'admin';
    rentedCars?: Car[];
}

interface AuthContextType {
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    cars: Car[];
    setCars: React.Dispatch<React.SetStateAction<Car[]>>;
    fetchCars: () => void;
    RentedCars: () => void;
    rentedCars: Car[];
    setRentedCars: React.Dispatch<React.SetStateAction<Car[]>>;
}

export interface Car {
    _id: string;
    name: string;
    brand: string;
    model: string;
    image: string;
    rentPerDay: number;
    available: boolean;
    rentedBy: string | null;
    createdAt: string;
    updatedAt: string;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [cars, setCars] = useState<Car[]>([]);
    const [rentedCars, setRentedCars] = useState<Car[]>([]);

    // Fetch all cars from the API
    const fetchCars = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/cars');
            setCars(response.data);
        } catch (error) {
            console.error('Error fetching cars:', error);
        }
    };

    const RentedCars = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/cars/rentedcars`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            setRentedCars(response.data.rentedCars);
        } catch (error) {
            console.error('Error fetching RentedCars:', error);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        if (token && storedUser) {
            setIsAuthenticated(true);
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                setIsAuthenticated,
                user,
                setUser,
                cars,
                setCars,
                fetchCars,
                RentedCars,
                rentedCars,
                setRentedCars,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
