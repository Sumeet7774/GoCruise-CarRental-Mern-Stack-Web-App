import { Vehicle } from '../types';

export const vehicles: Vehicle[] = [
  {
    id: '1',
    type: 'car',
    make: 'Tesla',
    model: 'Model 3',
    year: 2024,
    price: 89,
    image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    features: ['Autopilot', 'Premium Sound', 'Heated Seats', 'Glass Roof'],
    fuelType: 'Electric',
    available: true,
    featured: true
  },
  {
    id: '2',
    type: 'car',
    make: 'BMW',
    model: 'M4',
    year: 2024,
    price: 129,
    image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&q=80&w=2000',
    features: ['Sport Package', 'Leather Interior', 'Navigation', 'Harman Kardon Sound'],
    fuelType: 'Gasoline',
    available: true,
    featured: true
  },
  {
    id: '3',
    type: 'car',
    make: 'Porsche',
    model: '911',
    year: 2023,
    price: 199,
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=2000',
    features: ['Sport Chrono Package', 'Carbon Ceramic Brakes', 'Sport Exhaust', 'LED Matrix Headlights'],
    fuelType: 'Gasoline',
    available: true,
    featured: true
  },
  {
    id: '4',
    type: 'truck',
    make: 'Ford',
    model: 'F-150',
    year: 2024,
    price: 109,
    image: 'https://images.unsplash.com/photo-1605893477799-b99e3b8adb65?auto=format&fit=crop&q=80&w=2000',
    features: ['Pro Power Onboard', 'Trailer Tow Package', 'Bed Liner', 'Navigation'],
    capacity: '3,175 lbs',
    dimensions: '19.3\' x 6.7\' x 6.3\'',
    fuelType: 'Gasoline',
    available: true,
    featured: true
  },
  {
    id: '5',
    type: 'truck',
    make: 'RAM',
    model: '2500',
    year: 2024,
    price: 139,
    image: 'https://images.unsplash.com/photo-1609630875289-22852fa678ce?auto=format&fit=crop&q=80&w=2000',
    features: ['Cummins Diesel', 'Fifth Wheel Prep', 'Leather Interior', 'Premium Sound'],
    capacity: '3,990 lbs',
    dimensions: '20.1\' x 6.9\' x 6.5\'',
    fuelType: 'Diesel',
    available: true,
    featured: false
  },
  {
    id: '6',
    type: 'truck',
    make: 'GMC',
    model: 'Sierra 1500',
    year: 2024,
    price: 119,
    image: 'https://images.unsplash.com/photo-1609767768775-57b8fb8b344b?auto=format&fit=crop&q=80&w=2000',
    features: ['MultiPro Tailgate', 'Premium Package', 'Trailer Camera System', 'Head-Up Display'],
    capacity: '2,240 lbs',
    dimensions: '19.5\' x 6.8\' x 6.4\'',
    fuelType: 'Gasoline',
    available: true,
    featured: true
  }
];