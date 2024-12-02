import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axios';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axiosInstance.get('/logout'); // Change POST to GET
      localStorage.removeItem('user'); // Optional: clear user data from storage
      alert(' You Logged out successfully')
      navigate('/'); // Redirect to login page
    } catch (err) {
      console.error('Error during logout:', err.response?.data || err.message);
      alert('Failed to log out. Please try again.');
    }
  };
  

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-pink-500 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <img src="/public/1404945.png" alt=""  className='h-10 w-10 '/>
            <Link to="/" className="text-2xl font-bold hover:opacity-90 text-yellow-300">
              KhanaKHAJANA
            </Link>
            <div className="hidden md:flex space-x-4 ml-10">
              <Link
                to="/profile"
                className="text-lg hover:underline transition duration-300"
              >
                Profile
              </Link>
              <Link
                to="/allrecipes"
                className="text-lg hover:underline transition duration-300"
              >
                Recipes
              </Link>
              <Link
                to="/about"
                className="text-lg hover:underline transition duration-300"
              >
                About Us
              </Link>
            </div>
          </div>
          <div>
            <button
              onClick={handleLogout}
              className="bg-white text-purple-600 py-2 px-4 rounded-md font-medium hover:bg-purple-700 hover:text-white transition duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
