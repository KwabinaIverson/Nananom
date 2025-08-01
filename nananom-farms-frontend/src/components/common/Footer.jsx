import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#2F2F2F] text-[#FFFFFF] p-6 mt-8 shadow-inner"> {/* Dark Charcoal background, Pure White text */}
      <div className="container mx-auto text-center">
        <p className="text-sm opacity-90">&copy; {new Date().getFullYear()} Nananom Farms. All rights reserved. For Academic Use Only.</p>
        <div className="flex justify-center space-x-4 mt-3">
          <a href="#" className="text-[#FFFFFF] hover:text-[#FFB703] transition-colors duration-200">Privacy Policy</a> {/* Pure White text, Golden Wheat on hover */}
          <a href="#" className="text-[#FFFFFF] hover:text-[#FFB703] transition-colors duration-200">Terms of Service</a> {/* Pure White text, Golden Wheat on hover */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;