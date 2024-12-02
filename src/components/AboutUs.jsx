import React from 'react';
import Navbar from './Navbar';

const AboutUs = () => {
  return (
    <div className="bg-gray-100 min-h-screen ">
      <Navbar/>
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-4xl font-bold text-purple-700 text-center mb-6">About Us</h1>
        <p className="text-lg text-gray-600 text-center mb-8">
          Welcome to our recipe-sharing platform, where food enthusiasts come together to
          explore, create, and share the joy of cooking. Our mission is to build a community
          that celebrates the art of cuisine, bringing people closer through the flavors
          of the world.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-purple-600">Our Vision</h2>
            <p className="text-gray-600">
              We aim to create a space where everyone, from amateur cooks to seasoned
              chefs, can find inspiration. By sharing recipes, we hope to spark creativity
              and encourage people to try new culinary experiences.
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-purple-600">Our Values</h2>
            <p className="text-gray-600">
              - **Community**: Building a supportive and inclusive platform. <br />
              - **Creativity**: Inspiring unique and innovative recipes. <br />
              - **Quality**: Maintaining high standards in every recipe and interaction.
            </p>
          </div>
        </div>
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-purple-600 text-center mb-4">Meet the Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <img
                src="https://images.unsplash.com/photo-1505033575518-a36ea2ef75ae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHByb2ZpbGUlMjBpbWFnZXxlbnwwfHwwfHx8MA%3D%3D"
                alt="Team Member"
                className="rounded-full w-32 h-32 mx-auto"
              />
              <h3 className="text-lg font-bold text-gray-800">Sejal Luhar</h3>
              <p className="text-gray-600">Founder & Developer</p>
            </div>
            <div className="space-y-2">
              <img
                src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHByb2ZpbGUlMjBpbWFnZXxlbnwwfHwwfHx8MA%3D%3D"
                alt="Team Member"
                className="rounded-full w-32 h-32 mx-auto"
              />
              <h3 className="text-lg font-bold text-gray-800">John Doe</h3>
              <p className="text-gray-600">Content Strategist</p>
            </div>
            <div className="space-y-2">
              <img
                src="https://images.unsplash.com/photo-1669475535925-a011d7c31d45?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmlsZSUyMGltYWdlfGVufDB8fDB8fHww"
                alt="Team Member"
                className="rounded-full w-32 h-32 mx-auto"
              />
              <h3 className="text-lg font-bold text-gray-800">Jane Smith</h3>
              <p className="text-gray-600">Marketing Lead</p>
            </div>
          </div>
        </div>
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold text-purple-600">Contact Us</h2>
          <p className="text-gray-600 mt-4">
            Have questions or feedback? We'd love to hear from you! Reach out to us at{' '}
            <a href="mailto:support@recipesite.com" className="text-purple-700 underline">
              support@recipesite.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
