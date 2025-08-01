// src/pages/Public/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#DAD7CD] text-center p-8 animate-fadeIn"> {/* Soft Clay background */}
      <h1 className="text-7xl sm:text-8xl font-extrabold text-[#2F2F2F] mb-6 animate-popIn">404</h1> {/* Dark Charcoal */}
      <h2 className="text-4xl sm:text-5xl font-bold text-[#25A244] mb-4 animate-slideInDown">Page Not Found</h2> {/* Primary Green */}
      <p className="text-xl text-[#2F2F2F] leading-relaxed mb-8 max-w-md animate-fadeInUp" style={{ animationDelay: '0.2s' }}> {/* Dark Charcoal */}
        Oops! It looks like you've ventured off the farm path. The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="bg-[#FFB703] hover:bg-[#25A244] text-[#2F2F2F] hover:text-[#FFFFFF] font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 animate-bounceIn" style={{ animationDelay: '0.4s' }} // Golden Wheat background, Primary Green hover, Dark Charcoal text, Pure White hover text
      >
        Return to Nananom Home
      </Link>
    </div>
  );
};

export default NotFound;