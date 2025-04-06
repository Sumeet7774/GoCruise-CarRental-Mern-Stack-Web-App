import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Car, User, LogIn, LogOut, Sticker, Menu, X } from 'lucide-react';
import { useAuth } from '../context/Authcontext';

const Navbar = () => {
  const { isAuthenticated, setIsAuthenticated, user, setUser } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (token && storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
    setMobileMenuOpen(false);
    navigate("/");
  };

  const getInitial = (name: string) => name?.charAt(0).toUpperCase();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowDropdown(false);
    };
    
    if (showDropdown) {
      document.addEventListener('click', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Car className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
            <span className="text-lg sm:text-xl font-bold text-gray-900 tracking-[2px] sm:tracking-[3px]">GO CRUSIE</span>
          </Link>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/cars" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
                  <Car className="h-5 w-5" />
                  <span>Cars</span>
                </Link>

                {user?.role === 'admin' ? (
                  <>
                    <Link to="/renterdetails" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
                      <Car className="h-5 w-5" />
                      <span>Renter Detail</span>
                    </Link>
                    <Link to="/admin/upload" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
                      <Car className="h-5 w-5" />
                      <span>Upload Car</span>
                    </Link>
                  </>
                ) : (
                  <Link to="/rentedcars" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
                    <Car className="h-5 w-5" />
                    <span>Rented Vehicles</span>
                  </Link>
                )}

                {/* User profile dropdown */}
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowDropdown(!showDropdown);
                    }}
                    className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold focus:outline-none"
                  >
                    {user?.name ? getInitial(user.name) : <User className="h-5 w-5" />}
                  </button>

                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                      <div className="px-4 py-2 text-sm text-gray-700 font-medium flex items-center gap-2 cursor-default">
                        <Sticker width={15} height={15} />
                        {user?.name}
                      </div>
                      <hr />
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        <LogOut className="inline-block w-4 h-4 mr-2" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
                  <LogIn className="h-5 w-5" />
                  <span>Login</span>
                </Link>
                <Link to="/signup" className="flex items-center space-x-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                  <User className="h-5 w-5" />
                  <span>Sign Up</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
            {isAuthenticated ? (
              <>
                <Link 
                  to="/cars" 
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Car className="h-5 w-5" />
                  <span>Cars</span>
                </Link>

                {user?.role === 'admin' ? (
                  <>
                    <Link 
                      to="/renterdetails" 
                      className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Car className="h-5 w-5" />
                      <span>Renter Detail</span>
                    </Link>
                    <Link 
                      to="/admin/upload" 
                      className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Car className="h-5 w-5" />
                      <span>Upload Car</span>
                    </Link>
                  </>
                ) : (
                  <Link 
                    to="/rentedcars" 
                    className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Car className="h-5 w-5" />
                    <span>Rented Vehicles</span>
                  </Link>
                )}

                <div className="flex items-center justify-between px-3 py-2">
                  <div className="flex items-center space-x-2 text-gray-700">
                    <Sticker className="h-5 w-5" />
                    <span>{user?.name}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 text-red-600"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <LogIn className="h-5 w-5" />
                  <span>Login</span>
                </Link>
                <Link 
                  to="/signup" 
                  className="flex items-center space-x-2 mx-3 my-2 bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User className="h-5 w-5" />
                  <span>Sign Up</span>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;