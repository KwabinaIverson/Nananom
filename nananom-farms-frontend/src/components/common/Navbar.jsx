// src/components/common/Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-green-800 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo - Always visible */}
        <Link to="/" className="text-white text-2xl font-bold" onClick={closeMobileMenu}>
          Nananom Farms
        </Link>

        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="text-white focus:outline-none focus:ring-2 focus:ring-white">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12" // X icon
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16" // Hamburger icon
                />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop Navigation Links - Hidden on mobile, flex on md and up */}
        <div className="hidden md:flex space-x-4 items-center">
          <Link to="/" className="text-white hover:text-green-200 transition duration-200">Home</Link>
          <Link to="/services" className="text-white hover:text-green-200 transition duration-200">Services</Link>
          <Link to="/enquiries" className="text-white hover:text-green-200 transition duration-200">Contact</Link>
          <Link to="/login" className="text-white bg-green-600 px-4 py-2 rounded-md hover:bg-green-700 transition duration-200">Login</Link>
          <Link to="/register" className="text-white border border-white px-4 py-2 rounded-md hover:bg-white hover:text-green-800 transition duration-200">Register</Link>
        </div>
      </div>

      {/* Mobile Menu - Conditional display */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4">
          <div className="flex flex-col space-y-3 p-4 bg-green-700 rounded-md">
            <Link to="/" className="text-white hover:text-green-200 transition duration-200 text-lg" onClick={closeMobileMenu}>Home</Link>
            <Link to="/services" className="text-white hover:text-green-200 transition duration-200 text-lg" onClick={closeMobileMenu}>Services</Link>
            <Link to="/enquiries" className="text-white hover:text-green-200 transition duration-200 text-lg" onClick={closeMobileMenu}>Contact</Link>
            <Link to="/login" className="text-white bg-green-600 px-4 py-2 rounded-md hover:bg-green-700 transition duration-200 text-lg text-center" onClick={closeMobileMenu}>Login</Link>
            <Link to="/register" className="text-white border border-white px-4 py-2 rounded-md hover:bg-white hover:text-green-800 transition duration-200 text-lg text-center" onClick={closeMobileMenu}>Register</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;