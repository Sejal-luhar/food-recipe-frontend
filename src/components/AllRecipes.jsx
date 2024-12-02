import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axios';
import Navbar from './Navbar';

const AllRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null); // Store the clicked recipe details
  const [updatedRecipe, setUpdatedRecipe] = useState({
    title: '',
    ingredients: '',
    instructions: '',
    image: null,
  }); // For updating recipe
  const [isUpdating, setIsUpdating] = useState(false); // Track whether we are in update mode

  // Fetch recipes from API
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const { data } = await axiosInstance.get('/recipes');
        setRecipes(data);
      } catch (err) {
        setError('Failed to load recipes. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  // Delete recipe
  const handleDelete = async (recipeId) => {
    if (!window.confirm('Are you sure you want to delete this recipe?')) return;
    try {
      await axiosInstance.delete(`/recipes/${recipeId}`);
      setRecipes(recipes.filter((recipe) => recipe._id !== recipeId)); // Remove deleted recipe from state
    } catch (err) {
      setError('Failed to delete the recipe. Please try again.');
    }
  };

  // Handle updating the recipe
  const handleUpdate = (recipe) => {
    setSelectedRecipe(recipe);
    setUpdatedRecipe({
      title: recipe.title,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      image: null,
    });
    setIsUpdating(true); // Switch to update mode
  };

  // Submit the updated recipe
  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', updatedRecipe.title);
    formData.append('ingredients', updatedRecipe.ingredients);
    formData.append('instructions', updatedRecipe.instructions);
    if (updatedRecipe.image) formData.append('image', updatedRecipe.image);
    try {
      const { data } = await axiosInstance.put(`/recipes/${selectedRecipe._id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
       
      // Update the state with the updated recipe
      setRecipes((prevRecipes) =>
        prevRecipes.map((recipe) =>
          recipe._id === selectedRecipe._id ? { ...recipe, ...data } : recipe
        )
      );

      setIsUpdating(false); // Exit update mode
      
      alert('Recipe updated successfully')
      setSelectedRecipe(null); // Close the modal
    } catch (err) {
      setError('Failed to update the recipe. Please try again.');
    }
  };

  if (loading) return <div className="text-center text-lg">Loading recipes...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">All Recipes</h1>
        {recipes.length === 0 ? (
          <div className="text-center text-lg text-gray-600">No recipes available.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <div
                key={recipe._id}
                className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                {recipe.image && (
                  <img
                    src={`http://localhost:8080/uploads/${recipe.image}`}
                    alt={recipe.title}
                    className="h-48 w-full object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800">{recipe.title}</h3>
                  <p className="text-gray-600 truncate">{recipe.ingredients}</p>
                  <button
                    className="mt-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-4 rounded-md"
                    onClick={() => setSelectedRecipe(recipe)}
                  >
                    View Details
                  </button>

                  <div className="mt-4 flex justify-between items-center text-sm">
                    <button
                      onClick={() => handleUpdate(recipe)} // Handle update action
                      className="text-blue-600 hover:underline"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(recipe._id)} // Handle delete action
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal for displaying recipe details */}
      {selectedRecipe && !isUpdating && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
            {/* Close button */}
            <button
              className="absolute top-2 right-2 text-gray-500 text-lg"
              onClick={() => setSelectedRecipe(null)} // Close modal
            >
              &#x2715;
            </button>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{selectedRecipe.title}</h2>
            <p className="text-gray-700 mb-4">
              <strong>Ingredients:</strong> {selectedRecipe.ingredients}
            </p>
            <p className="text-gray-700">
              <strong>Instructions:</strong> {selectedRecipe.instructions}
            </p>
          </div>
        </div>
      )}

      {/* Modal for updating recipe */}
      {isUpdating && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
            {/* Close button */}
            <button
              className="absolute top-2 right-2 text-gray-500 text-lg"
              onClick={() => setIsUpdating(false)} // Exit update mode
            >
              &#x2715;
            </button>

            {/* Update form */}
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Update Recipe</h2>
            <form onSubmit={handleSubmitUpdate}>
              <div className="space-y-4">
                <input
                  type="text"
                  value={updatedRecipe.title}
                  onChange={(e) => setUpdatedRecipe({ ...updatedRecipe, title: e.target.value })}
                  className="w-full p-4 border rounded-md"
                  placeholder="Recipe Title"
                />
                <textarea
                  value={updatedRecipe.ingredients}
                  onChange={(e) =>
                    setUpdatedRecipe({ ...updatedRecipe, ingredients: e.target.value })
                  }
                  className="w-full p-4 border rounded-md"
                  placeholder="Ingredients"
                />
                <textarea
                  value={updatedRecipe.instructions}
                  onChange={(e) =>
                    setUpdatedRecipe({ ...updatedRecipe, instructions: e.target.value })
                  }
                  className="w-full p-4 border rounded-md"
                  placeholder="Instructions"
                />
                <input
                  type="file"
                  onChange={(e) => setUpdatedRecipe({ ...updatedRecipe, image: e.target.files[0] })}
                  className="w-full p-4 border rounded-md"
                />
              </div>
              <button
                type="submit"
                className="mt-4 w-full bg-purple-500 text-white py-2 rounded-md"
              >
                Update Recipe
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllRecipes;
