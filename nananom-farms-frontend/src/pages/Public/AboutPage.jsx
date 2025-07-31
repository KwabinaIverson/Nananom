// src/pages/About.jsx
import React from 'react';

const AboutPage = () => {
  return (
    <div className="container mx-auto p-8 text-center mt-12 bg-[#F2F4F5] rounded-lg shadow-xl animate-fadeIn">
      <h1 className="text-5xl font-extrabold text-[#4682B4] mb-6 animate-popIn">About Nananom Farms</h1>
      <p className="text-xl text-[#2F4F4F] leading-relaxed mb-8 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
        Discover our history, core values, and unwavering commitment to sustainable agriculture in Ghana.
      </p>
      <div className="mt-8 max-w-3xl mx-auto text-left bg-[#FFFFF0] p-8 rounded-lg shadow-lg border border-[#EAA221] animate-slideInUp" style={{ animationDelay: '0.4s' }}>
        <h2 className="text-3xl font-bold text-[#8A3324] mb-4 border-b-2 border-[#EAA221] pb-2">Our Story</h2>
        <p className="text-[#2F4F4F] mb-6 leading-relaxed">
          Founded in <span className="font-semibold text-[#4682B4]">[Year]</span>, Nananom Farms began with a bold vision: to revolutionize sustainable palm oil production and agricultural services across Ghana. From our humble beginnings, we've grown into a leading enterprise, celebrated for our premium quality products and deep-rooted commitment to community development.
        </p>
        <h2 className="text-3xl font-bold text-[#8A3324] mb-4 border-b-2 border-[#EAA221] pb-2">Our Values</h2>
        <ul className="list-disc list-inside text-[#2F4F4F] space-y-3">
          <li>
            <strong className="text-[#4682B4]">Sustainability:</strong> We are deeply committed to environmentally responsible farming practices, ensuring a healthier planet for future generations.
          </li>
          <li>
            <strong className="text-[#4682B4]">Quality:</strong> We strive to deliver the highest quality palm oil and agricultural services, setting benchmarks for excellence in the industry.
          </li>
          <li>
            <strong className="text-[#4682B4]">Community Empowerment:</strong> We actively work to empower local farmers, fostering economic growth and contributing significantly to rural development.
          </li>
          <li>
            <strong className="text-[#4682B4]">Innovation:</strong> We continuously explore and adopt cutting-edge methods and technologies to enhance efficiency and productivity across our operations.
          </li>
        </ul>
        <div className="text-center mt-8">
          <p className="text-lg text-[#2F4F4F] italic">
            "Cultivating growth, nurturing communities."
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;