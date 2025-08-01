// src/pages/About.jsx
import React from 'react';

const AboutPage = () => {
  return (
    <div className="container mx-auto p-8 text-center mt-12 bg-[#DAD7CD] rounded-lg shadow-xl animate-fadeIn"> {/* Soft Clay background */}
      <h1 className="text-5xl font-extrabold text-[#25A244] mb-6 animate-popIn">About Nananom Farms</h1> {/* Primary Green heading */}
      <p className="text-xl text-[#2F2F2F] leading-relaxed mb-8 animate-fadeIn" style={{ animationDelay: '0.2s' }}> {/* Dark Charcoal text */}
        Discover our history, core values, and unwavering commitment to sustainable agriculture in Ghana.
      </p>
      <div className="mt-8 max-w-3xl mx-auto text-left bg-[#FFFFFF] p-8 rounded-lg shadow-lg border border-[#FFB703] animate-slideInUp" style={{ animationDelay: '0.4s' }}> {/* Pure White background, Golden Wheat border */}
        <h2 className="text-3xl font-bold text-[#2F2F2F] mb-4 border-b-2 border-[#FFB703] pb-2">Our Story</h2> {/* Dark Charcoal heading, Golden Wheat border */}
        <p className="text-[#2F2F2F] mb-6 leading-relaxed"> {/* Dark Charcoal text */}
          Founded in <span className="font-semibold text-[#25A244]">[Year]</span>, Nananom Farms began with a bold vision: to revolutionize sustainable palm oil production and agricultural services across Ghana. From our humble beginnings, we've grown into a leading enterprise, celebrated for our premium quality products and deep-rooted commitment to community development.
        </p>
        <h2 className="text-3xl font-bold text-[#2F2F2F] mb-4 border-b-2 border-[#FFB703] pb-2">Our Values</h2> {/* Dark Charcoal heading, Golden Wheat border */}
        <ul className="list-disc list-inside text-[#2F2F2F] space-y-3"> {/* Dark Charcoal text */}
          <li>
            <strong className="text-[#25A244]">Sustainability:</strong> We are deeply committed to environmentally responsible farming practices, ensuring a healthier planet for future generations.
          </li>
          <li>
            <strong className="text-[#25A244]">Quality:</strong> We strive to deliver the highest quality palm oil and agricultural services, setting benchmarks for excellence in the industry.
          </li>
          <li>
            <strong className="text-[#25A244]">Community Empowerment:</strong> We actively work to empower local farmers, fostering economic growth and contributing significantly to rural development.
          </li>
          <li>
            <strong className="text-[#25A244]">Innovation:</strong> We continuously explore and adopt cutting-edge methods and technologies to enhance efficiency and productivity across our operations.
          </li>
        </ul>
        <div className="text-center mt-8">
          <p className="text-lg text-[#2F2F2F] italic"> {/* Dark Charcoal text */}
            "Cultivating growth, nurturing communities."
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;