export interface Vehicle {
  id: string;
  type: 'car' | 'truck';
  make: string;
  model: string;
  year: number;
  price: number;
  image: string;
  features: string[];
  capacity?: string;
  dimensions?: string;
  fuelType: string;
  available: boolean;
  featured?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  isAdmin: boolean;
}