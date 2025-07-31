// src/pages/Public/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#F2F4F5] text-center p-8 animate-fadeIn">
      <h1 className="text-7xl sm:text-8xl font-extrabold text-[#8A3324] mb-6 animate-popIn">404</h1>
      <h2 className="text-4xl sm:text-5xl font-bold text-[#4682B4] mb-4 animate-slideInDown">Page Not Found</h2>
      <p className="text-xl text-[#2F4F4F] leading-relaxed mb-8 max-w-md animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
        Oops! It looks like you've ventured off the farm path. The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="bg-[#EAA221] hover:bg-[#4682B4] text-[#2F4F4F] hover:text-[#FFFFF0] font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 animate-bounceIn" style={{ animationDelay: '0.4s' }}
      >
        Return to Nananom Home
      </Link>
    </div>
  );
};

export default NotFound;