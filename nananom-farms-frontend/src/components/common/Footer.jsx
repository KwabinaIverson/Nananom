import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#8A3324] text-[#FFFFF0] p-6 mt-8 shadow-inner">
      <div className="container mx-auto text-center">
        <p className="text-sm opacity-90">&copy; {new Date().getFullYear()} Nananom Farms. All rights reserved. For Academic Use Only.</p>
        <div className="flex justify-center space-x-4 mt-3">
          <a href="#" className="text-[#FFFFF0] hover:text-[#EAA221] transition-colors duration-200">Privacy Policy</a>
          <a href="#" className="text-[#FFFFF0] hover:text-[#EAA221] transition-colors duration-200">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;