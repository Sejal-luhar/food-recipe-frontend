import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axios';
import Navbar from './Navbar';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [newRecipe, setNewRecipe] = useState({ title: '', ingredients: '', instructions: '', image: null });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAddingRecipe, setIsAddingRecipe] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axiosInstance.get('/profile');
        setUser(data.user);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching profile. Please log in again.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleAddRecipe = async (e) => {
    e.preventDefault();
    if (!newRecipe.title || !newRecipe.ingredients || !newRecipe.instructions) {
      alert('Please fill in all the fields.');
      return;
    }

    const formData = new FormData();
    formData.append('title', newRecipe.title);
    formData.append('ingredients', newRecipe.ingredients);
    formData.append('instructions', newRecipe.instructions);
    if (newRecipe.image) formData.append('image', newRecipe.image);

    setIsSubmitting(true);
    try {
      const { data } = await axiosInstance.post('/recipes', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      setUser((prev) => ({ ...prev, recipes: [...(prev.recipes || []), data] }));
      setNewRecipe({ title: '', ingredients: '', instructions: '', image: null });
      setIsAddingRecipe(false);
    } catch (err) {
      setError('Error adding recipe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto py-8 px-4">
        {/* Profile Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center space-x-4">
            <img
              src={user.profileImage || '/path-to-default-placeholder.png'}
              alt={user.username}
              className="w-24 h-24 rounded-full"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Welcome, {user.username}!</h1>
              <p className="text-gray-600">Email: {user.email}</p>
            </div>
          </div>
        </div>

        {/* Add Recipe Form */}
        {isAddingRecipe && (
          <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add a New Recipe</h2>
            <form onSubmit={handleAddRecipe}>
              <div className="space-y-4">
                <input type="text" placeholder="Recipe Title" value={newRecipe.title} onChange={(e) => setNewRecipe({ ...newRecipe, title: e.target.value })} className="w-full p-4 border border-gray-300 rounded-md" />
                <textarea placeholder="Ingredients" value={newRecipe.ingredients} onChange={(e) => setNewRecipe({ ...newRecipe, ingredients: e.target.value })} className="w-full p-4 border border-gray-300 rounded-md" />
                <textarea placeholder="Instructions" value={newRecipe.instructions} onChange={(e) => setNewRecipe({ ...newRecipe, instructions: e.target.value })} className="w-full p-4 border border-gray-300 rounded-md" />
                <input type="file" onChange={(e) => handleFileChange(e)} className="w-full p-4 border border-gray-300 rounded-md" />
              </div>
              <button type="submit" disabled={isSubmitting} className="mt-4 w-full bg-purple-500 text-white py-2 rounded-md">
                {isSubmitting ? 'Submitting...' : 'Submit Recipe'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
