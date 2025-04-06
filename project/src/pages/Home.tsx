import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Truck, Clock, DollarSign, Star } from 'lucide-react';
import { useAuth } from '../context/Authcontext';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="space-y-8 md:space-y-16 pb-8 md:pb-16">
      {/* Hero Section */}
      <div
        className="relative h-[400px] sm:h-[500px] md:h-[600px] bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1485291571150-772bcfc10da5?auto=format&fit=crop&q=80&w=2000")',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="text-white space-y-4 md:space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">Your Journey Begins Here</h1>
            <p className="text-lg md:text-xl max-w-2xl">
              Experience the freedom of the road with our premium selection of cars and trucks.
              Affordable rates, reliable service, and endless possibilities.
            </p>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/cars"
                    className="inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    <Car className="mr-2 h-5 w-5" /> Rent a Car
                  </Link>
                  <Link
                    to="/trucks"
                    className="inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 bg-white text-blue-600 rounded-md hover:bg-gray-100"
                  >
                    <Truck className="mr-2 h-5 w-5" /> Explore Trucks
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    <Car className="mr-2 h-5 w-5" /> Rent a Car
                  </Link>
                  <Link
                    to="/login"
                    className="inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 bg-white text-blue-600 rounded-md hover:bg-gray-100"
                  >
                    <Truck className="mr-2 h-5 w-5" /> Explore Trucks
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
            <Clock className="h-10 w-10 md:h-12 md:w-12 text-blue-600 mb-3 md:mb-4" />
            <h3 className="text-lg md:text-xl font-semibold mb-2">Fast Rentals</h3>
            <p className="text-gray-600">
              Quick and easy booking process. Get your vehicle in minutes, not hours.
            </p>
          </div>
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
            <Car className="h-10 w-10 md:h-12 md:w-12 text-blue-600 mb-3 md:mb-4" />
            <h3 className="text-lg md:text-xl font-semibold mb-2">Wide Selection</h3>
            <p className="text-gray-600">
              Choose from our extensive fleet of cars and trucks for any occasion.
            </p>
          </div>
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
            <DollarSign className="h-10 w-10 md:h-12 md:w-12 text-blue-600 mb-3 md:mb-4" />
            <h3 className="text-lg md:text-xl font-semibold mb-2">Best Prices</h3>
            <p className="text-gray-600">
              Competitive rates and flexible rental periods to suit your budget.
            </p>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8">What Our Customers Say</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white p-4 md:p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-3 md:mb-4">
                <Star className="h-4 w-4 md:h-5 md:w-5 text-yellow-400" fill="currentColor" />
                <Star className="h-4 w-4 md:h-5 md:w-5 text-yellow-400" fill="currentColor" />
                <Star className="h-4 w-4 md:h-5 md:w-5 text-yellow-400" fill="currentColor" />
                <Star className="h-4 w-4 md:h-5 md:w-5 text-yellow-400" fill="currentColor" />
                <Star className="h-4 w-4 md:h-5 md:w-5 text-yellow-400" fill="currentColor" />
              </div>
              <p className="text-gray-600 mb-3 md:mb-4">
                "Amazing service! The car was in perfect condition and the rental process was smooth and easy."
              </p>
              <div className="font-semibold">John Doe</div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {[
            {
              q: "What documents do I need to rent a car?",
              a: "You'll need a valid driver's license, proof of insurance, and a credit card for the security deposit."
            },
            {
              q: "Can I modify or cancel my reservation?",
              a: "Yes, you can modify or cancel your reservation up to 24 hours before the pickup time."
            },
            {
              q: "Is insurance included in the rental price?",
              a: "Basic insurance is included. Additional coverage options are available at pickup."
            },
            {
              q: "What is your fuel policy?",
              a: "All vehicles are provided with a full tank and should be returned with a full tank."
            }
          ].map((faq, i) => (
            <div key={i} className="bg-white p-4 md:p-6 rounded-lg shadow-md">
              <h3 className="text-lg md:text-xl font-semibold mb-2">{faq.q}</h3>
              <p className="text-gray-600">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;