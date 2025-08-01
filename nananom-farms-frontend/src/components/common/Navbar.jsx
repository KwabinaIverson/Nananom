import React, { useState } from 'react';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import { isAuthenticated, getUserRole, logoutUser } from '../../services/auth';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const authenticated = isAuthenticated();
  const userRole = getUserRole();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logoutUser();
    closeMobileMenu();
    navigate('/login');
  };

  // Determine dashboard link based on user role
  const getDashboardLink = () => {
    if (!authenticated || !userRole) return '/login';

    switch (userRole) {
      case 'Administrator':
        return '/admin/dashboard';
      case 'Support Agent':
        return '/agent/dashboard';
      case 'Customer':
        return '/customer/dashboard';
      default:
        return '/login';
    }
  };

  // Reusable Tailwind classes for common link/button styles
  // UPDATED TO STRICTLY USE THE NEW COLOR PALETTE
  const baseLinkClasses = "relative text-[#086920] font-medium text-lg px-3 py-2 rounded-md transition-all duration-300 ease-in-out"; // Pure White
  const hoverLinkClasses = "hover:text-[#086920] hover:scale-105 transform after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-0.5 after:bg-[#086920] after:transition-all after:duration-300 after:ease-in-out hover:after:w-full hover:after:left-0"; // Golden Wheat
  const activeLinkClasses = ({ isActive }) =>
    isActive
      ? `${baseLinkClasses} text-[#086920] scale-105 after:w-full after:left-0 after:h-1 after:bg-[#FFC533] after:absolute after:bottom-0 after:rounded-t-sm` // Golden Wheat
      : `${baseLinkClasses} ${hoverLinkClasses}`;

  const buttonClasses = "px-5 py-2 rounded-lg font-semibold text-lg transition-all duration-300 ease-in-out transform";
  const primaryButtonClasses = "bg-[#FFC533] text-[#2F2F2F] hover:bg-[#086920] hover:text-white hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"; // Golden Wheat background, Dark Charcoal text. Hover to Primary Green.
  const secondaryButtonClasses = "border border-[#FFC533] text-[#FFC533] hover:bg-[#FFC533] hover:text-[#2F2F2F] hover:scale-105 active:scale-95"; // Golden Wheat border/text. Hover to Golden Wheat background, Dark Charcoal text.
  const dashboardButtonClasses = "bg-[#086920] text-[#FFFFFF] hover:bg-[#FFC533] hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"; // Primary Green background, Pure White text. Hover to Golden Wheat.

  return (
    <nav className="bg-[#DAD7CD] p-4 shadow-xl relative z-50"> {/* Primary Green for Navbar background */}
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo - Always visible */}
        <Link to="/" className="text-[#086920] text-3xl font-extrabold tracking-wide hover:scale-105 transition-transform duration-300 flex items-center gap-2" onClick={closeMobileMenu}> {/* Pure White text */}
          🌾 Nananom Farms
        </Link>

        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="text-[#086920] focus:outline-none   rounded-md p-2 transition-transform duration-300 hover:scale-110 active:scale-90"> {/* Pure White text, Golden Wheat ring */}
            <svg
              className="w-8 h-8"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop Navigation Links - Hidden on mobile, flex on md and up */}
        <div className="hidden md:flex space-x-6 items-center">
          <NavLink to="/" className={activeLinkClasses} onClick={closeMobileMenu}>Home</NavLink>
          <NavLink to="/services" className={activeLinkClasses} onClick={closeMobileMenu}>Services</NavLink>
          <NavLink to="/enquiries" className={activeLinkClasses} onClick={closeMobileMenu}>Contact</NavLink>
          <NavLink to="/about" className={activeLinkClasses} onClick={closeMobileMenu}>About Us</NavLink>

          {authenticated ? (
            <>
              {/* Dashboard Link for logged-in users */}
              <Link to={getDashboardLink()} className={`${buttonClasses} ${dashboardButtonClasses}`} onClick={closeMobileMenu}>
                Dashboard
              </Link>
              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className={`${buttonClasses} ${secondaryButtonClasses}`}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* Login/Register for logged-out users */}
              <Link to="/login" className={`${buttonClasses} ${primaryButtonClasses}`} onClick={closeMobileMenu}>Login</Link>
              <Link to="/register" className={`${buttonClasses} ${secondaryButtonClasses}`} onClick={closeMobileMenu}>Register</Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu - Conditional display with animation */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 animate-slideInDown">
          <div className="flex flex-col space-y-4 p-4 bg-[#DAD7CD] rounded-lg shadow-inner"> {/* Primary Green background */}
            <NavLink to="/" className={`${baseLinkClasses.replace('text-[#FFFFFF]', 'text-[#FFFFFF]')} text-lg`} onClick={closeMobileMenu}>Home</NavLink>
            <NavLink to="/services" className={`${baseLinkClasses.replace('text-[#FFFFFF]', 'text-[#FFFFFF]')} text-lg`} onClick={closeMobileMenu}>Services</NavLink>
            <NavLink to="/enquiries" className={`${baseLinkClasses.replace('text-[#FFFFFF]', 'text-[#FFFFFF]')} text-lg`} onClick={closeMobileMenu}>Contact</NavLink>
            <NavLink to="/about" className={`${baseLinkClasses.replace('text-[#FFFFFF]', 'text-[#FFFFFF]')} text-lg`} onClick={closeMobileMenu}>About Us</NavLink>

            {authenticated ? (
              <>
                <Link to={getDashboardLink()} className={`${buttonClasses} ${dashboardButtonClasses} text-lg text-center`} onClick={closeMobileMenu}>
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className={`${buttonClasses} ${secondaryButtonClasses} text-lg text-center`}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className={`${buttonClasses} ${primaryButtonClasses} text-lg text-center`} onClick={closeMobileMenu}>Login</Link>
                <Link to="/register" className={`${buttonClasses} ${secondaryButtonClasses} text-lg text-center`} onClick={closeMobileMenu}>Register</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;