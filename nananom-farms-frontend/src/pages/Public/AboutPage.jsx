// src/pages/About.jsx
import React from 'react';

const AboutPage = () => {
  return (
    <div className="container mx-auto p-8 text-center mt-12">
      <h1 className="text-5xl font-bold text-green-700 mb-6">About Nananom Farms</h1>
      <p className="text-xl text-gray-700 leading-relaxed">
        Learn more about our history, values, and commitment to sustainable agriculture.
      </p>
      <div className="mt-8 max-w-2xl mx-auto text-left">
        <h2 className="text-3xl font-semibold text-green-800 mb-4">Our Story</h2>
        <p className="text-gray-700 mb-4">
          Founded in [Year], Nananom Farms started with a vision to revolutionize palm oil production in Ghana.
          From humble beginnings, we have grown into a leading agricultural enterprise, known for our quality products
          and community-focused initiatives.
        </p>
        <h2 className="text-3xl font-semibold text-green-800 mb-4">Our Values</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>**Sustainability:** Committed to environmentally friendly farming practices.</li>
          <li>**Quality:** Delivering the highest quality palm oil and agricultural services.</li>
          <li>**Community:** Empowering local farmers and contributing to rural development.</li>
          <li>**Innovation:** Continuously seeking new methods and technologies to improve efficiency.</li>
        </ul>
      </div>
    </div>
  );
};

export default AboutPage;