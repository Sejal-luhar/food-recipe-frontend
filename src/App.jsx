import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Auth from './components/Auth';
import Profile from './components/Profile';
import AllRecipes from './components/AllRecipes';
import AboutUs from './components/AboutUs';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/allrecipes" element={<AllRecipes />} />
        <Route path="/about" element={<AboutUs />} />

        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </div>
  );
};

export default App;
