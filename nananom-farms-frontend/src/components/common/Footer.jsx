// src/components/common/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-green-900 text-white p-6 mt-8">
      <div className="container mx-auto text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} Nananom Farms. All rights reserved. For Academic Use Only.</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="#" className="text-white hover:text-green-300">Privacy Policy</a>
          <a href="#" className="text-white hover:text-green-300">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;