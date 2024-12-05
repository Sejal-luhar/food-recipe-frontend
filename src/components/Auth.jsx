import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axios';

const Auth = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin ? '/login' : '/register';
    const data = isLogin ? { username, password } : { username, email, password, name };

    try {
      const response = await axiosInstance.post(url, data, {
        withCredentials: true, // Ensure the cookie is sent
      });

      alert(response.data.message);

      if (isLogin) {
        // Save token and redirect to the profile page after successful login
        localStorage.setItem('token', response.data.token);
        navigate('/profile');
      } else {
        // Switch to login view after successful registration
        setIsLogin(true);
      }
    } catch (err) {
      alert(err.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-300 via-pink-300 to-red-300 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="w-96 h-96 bg-white opacity-10 rounded-full blur-xl animate-pulse absolute -top-10 -left-10"></div>
        <div className="w-72 h-72 bg-white opacity-20 rounded-full blur-2xl animate-spin-slow absolute bottom-10 right-10"></div>
      </div>

      <div className="z-10 bg-white p-8 rounded-lg shadow-2xl w-full max-w-md transform transition-all duration-500 hover:scale-105">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          {isLogin ? 'Welcome Back!' : 'Create an Account'}
        </h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-600 font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-purple-400 focus:outline-none focus:shadow-lg transition-all duration-300"
              />
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-600 font-medium mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-purple-400 focus:outline-none focus:shadow-lg transition-all duration-300"
            />
          </div>

          {!isLogin && (
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-600 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-purple-400 focus:outline-none focus:shadow-lg transition-all duration-300"
              />
            </div>
          )}

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-600 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-purple-400 focus:outline-none focus:shadow-lg transition-all duration-300"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-md font-medium hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
          </p>
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-purple-500 hover:text-pink-500 mt-2 font-medium transition-all duration-300"
          >
            {isLogin ? 'Switch to Register' : 'Switch to Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
