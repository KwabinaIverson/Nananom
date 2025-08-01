import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { getUserRole, getToken, logoutUser } from '../../services/auth';
import { getAdminDashboardStats } from '../../services/dashboardService';
import { getAllServices } from '../../src/config/serviceService'; // This path might need re-checking if 'src' is directly under root
import { getAllUsers } from '../../services/userService';


const AdminDashboard = () => {
  const navigate = useNavigate();

  const userId = getToken();
  const roleName = getUserRole();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardStats, setDashboardStats] = useState({
    totalUsers: 0,
    activeServices: 0,
    pendingAppointments: 0,
    newEnquiries: 0,
  });
  const [recentServices, setRecentServices] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [stats, servicesData, usersData] = await Promise.all([
          getAdminDashboardStats(),
          getAllServices(),
          getAllUsers(),
        ]);

        setDashboardStats(stats);
        setRecentServices(servicesData.slice(0, 5));
        setRecentUsers(usersData.slice(0, 5));

      } catch (err) {
        setError("Failed to load dashboard data. Please ensure backend is running and you are authorized. Details: " + err.message);
        console.error("Dashboard data fetching error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  // Common classes for sidebar links
  const sidebarLinkClasses = ({ isActive }) =>
    `flex items-center p-3 rounded-lg transition duration-200 ease-in-out transform
      ${isActive ? 'bg-[#FFB703] text-[#2F2F2F] scale-100 shadow-inner' : 'hover:bg-[#FFB703] hover:text-[#2F2F2F] hover:scale-[1.02] hover:shadow-md'}`; // Golden Wheat for active/hover background, Dark Charcoal for text

  // --- Loading State ---
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#DAD7CD] font-sans"> {/* Soft Clay background */}
        <div className="text-center p-8 bg-[#DAD7CD] rounded-xl shadow-lg animate-popIn"> {/* Soft Clay card background */}
          <div className="w-20 h-20 border-6 border-t-[##086920] border-b-[#FFB703] border-l-[##086920] border-r-[#FFB703] rounded-full animate-spin-slow mx-auto mb-6"></div> {/* Primary Green and Golden Wheat spinner */}
          <p className="text-2xl font-semibold text-[#2F2F2F] animate-pulse">Nananom Farms Admin Panel</p> {/* Dark Charcoal text */}
          <p className="text-lg text-[#2F2F2F] mt-2">Gathering fresh data for you...</p> {/* Dark Charcoal text */}
        </div>
      </div>
    );
  }

  // --- Error State ---
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#DAD7CD] font-sans"> {/* Soft Clay background */}
        <div className="text-center p-8 bg-[#DAD7CD] rounded-xl shadow-lg border-2 border-[#FFB703] animate-popIn"> {/* Soft Clay card background, Golden Wheat border */}
          <p className="text-2xl font-bold text-[##086920] mb-4">Oops! Dashboard Data Not Found.</p> {/* Primary Green text */}
          <p className="text-lg text-[#2F2F2F] mb-6">{error}</p> {/* Dark Charcoal text */}
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-[#FFB703] text-[#2F2F2F] rounded-lg hover:bg-[##086920] hover:text-[#FFFFFF] transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#FFB703] active:scale-95" // Golden Wheat button, Dark Charcoal text. Hover to Primary Green, Pure White text. Golden Wheat ring.
          >
            Try Again
          </button>
          <p className="text-sm text-[#2F2F2F] mt-4">If the problem persists, contact support or check backend status.</p> {/* Dark Charcoal text */}
        </div>
      </div>
    );
  }

  // --- Render Dashboard Content ---
  return (
    <div className="flex min-h-screen bg-[#DAD7CD] font-sans"> {/* Soft Clay background */}
      {/* Sidebar */}
      <aside className="w-64 bg-[##086920] text-[#FFFFFF] shadow-xl flex flex-col p-4 animate-slideInLeft"> {/* Primary Green background, Pure White text */}
        <div className="p-6 border-b border-[#FFB703] mb-4"> {/* Golden Wheat border */}
          <h2 className="text-3xl font-extrabold text-[#FFFFFF] tracking-wide">Nananom Admin</h2> {/* Pure White text */}
          <p className="text-sm text-[#FFFFFF] opacity-90 mt-1">Harnessing Growth</p> {/* Pure White text */}
        </div>
        <nav className="flex-1 space-y-3">
          <NavLink to="/admin/dashboard" className={sidebarLinkClasses}>
            <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3 12l9-9 9 9v9a2 2 0 01-2 2H5a2 2 0 01-2-2v-9zM10 10v6a1 1 0 001 1h2a1 1 0 001-1v-6h-4z"></path></svg>
            Dashboard
          </NavLink>
          <NavLink to="/admin/users" className={sidebarLinkClasses}>
            <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 4a4 4 0 100 8 4 4 0 000-8zM18 19H6c-1.1 0-2 .9-2 2v1h16v-1c0-1.1-.9-2-2-2z"></path></svg>
            Manage Users
          </NavLink>
          <NavLink to="/admin/services" className={sidebarLinkClasses}>
            <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM12 20c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7z"></path></svg>
            Manage Services
          </NavLink>
          <NavLink to="/admin/appointments" className={sidebarLinkClasses}>
            <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM17 10h-6V7h6v3z"></path></svg>
            Appointments
          </NavLink>
          <NavLink to="/admin/enquiries" className={sidebarLinkClasses}>
            <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path></svg>
            Enquiries
          </NavLink>
        </nav>
        <div className="p-4 border-t border-[#FFB703] mt-auto"> {/* Golden Wheat border */}
          <button
            onClick={handleLogout}
            className="flex items-center w-full p-3 rounded-lg hover:bg-[#FFB703] text-[#FFFFFF] text-left transition duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#FFB703] active:scale-95" // Golden Wheat hover, Pure White text, Golden Wheat ring
          >
            <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar / Header */}
        <header className="flex justify-between items-center p-6 bg-[#FFFFFF] border-b border-[#FFB703] shadow-md"> {/* Pure White background, Golden Wheat border */}
          <h1 className="text-3xl font-extrabold text-[##086920]">Admin Overview</h1> {/* Primary Green text */}
          <div className="flex items-center">
            <span className="text-[#2F2F2F] text-lg mr-4">Welcome, <strong className="font-bold text-[##086920]">Admin User</strong>!</span> {/* Dark Charcoal text, Primary Green strong text */}
            <div className="relative">
              <button className="flex items-center text-sm border-2 border-[#FFB703] rounded-full focus:outline-none focus:ring-2 focus:ring-[##086920] transition duration-150 ease-in-out transform hover:scale-105"> {/* Golden Wheat border, Primary Green ring */}
                <img className="h-10 w-10 rounded-full object-cover" src="https://via.placeholder.com/150/25A244/FFFFFF?text=AD" alt="Admin Avatar" /> {/* Updated placeholder image background to Primary Green */}
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#DAD7CD] p-6"> {/* Soft Clay background */}
          <div className="container mx-auto">
            <p className="text-lg text-[#2F2F2F] mb-8 animate-fadeIn"> {/* Dark Charcoal text */}
              You are logged in as <strong className="font-bold text-[##086920]">{roleName}</strong>. (User ID: {userId || 'N/A'}) {/* Primary Green strong text */}
            </p>

            {/* Admin Metric Cards */}
            <h2 className="text-2xl font-semibold text-[##086920] mb-6 animate-fadeIn" style={{ animationDelay: '0.1s' }}>Key Metrics</h2> {/* Primary Green heading */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
              {/* Card 1: Total Users */}
              <div className="bg-[#DAD7CD] p-6 rounded-lg shadow-lg border border-[#FFB703] cursor-pointer transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl animate-fadeIn" style={{ animationDelay: '0.2s' }}> {/* Soft Clay background, Golden Wheat border */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-[#2F2F2F]">Total Users</h3> {/* Dark Charcoal text */}
                  <svg className="w-9 h-9 text-[##086920]" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 4a4 4 0 100 8 4 4 0 000-8zM18 19H6c-1.1 0-2 .9-2 2v1h16v-1c0-1.1-.9-2-2-2z"></path></svg> {/* Primary Green icon */}
                </div>
                <p className="text-5xl font-bold text-[##086920] animate-pulse">{dashboardStats.totalUsers}</p> {/* Primary Green count */}
                <p className="text-base text-[#2F2F2F] opacity-80 mt-2">Registered users across all roles</p> {/* Dark Charcoal text */}
              </div>

              {/* Card 2: Active Services */}
              <div className="bg-[#DAD7CD] p-6 rounded-lg shadow-lg border border-[#FFB703] cursor-pointer transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl animate-fadeIn" style={{ animationDelay: '0.3s' }}> {/* Soft Clay background, Golden Wheat border */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-[#2F2F2F]">Active Services</h3> {/* Dark Charcoal text */}
                  <svg className="w-9 h-9 text-[#FFB703]" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM12 20c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7z"></path></svg> {/* Golden Wheat icon */}
                </div>
                <p className="text-5xl font-bold text-[#FFB703] animate-pulse">{dashboardStats.activeServices}</p> {/* Golden Wheat count */}
                <p className="text-base text-[#2F2F2F] opacity-80 mt-2">Services currently offered or in progress</p> {/* Dark Charcoal text */}
              </div>

              {/* Card 3: Pending Appointments */}
              <div className="bg-[#DAD7CD] p-6 rounded-lg shadow-lg border border-[#FFB703] cursor-pointer transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl animate-fadeIn" style={{ animationDelay: '0.4s' }}> {/* Soft Clay background, Golden Wheat border */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-[#2F2F2F]">Pending Appointments</h3> {/* Dark Charcoal text */}
                  <svg className="w-9 h-9 text-[#B7EFC5]" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM17 10h-6V7h6v3z"></path></svg> {/* Mint Green icon */}
                </div>
                <p className="text-5xl font-bold text-[#B7EFC5] animate-pulse">{dashboardStats.pendingAppointments}</p> {/* Mint Green count */}
                <p className="text-base text-[#2F2F2F] opacity-80 mt-2">Appointments awaiting approval or action</p> {/* Dark Charcoal text */}
              </div>

              {/* Card 4: New Enquiries */}
              <div className="bg-[#DAD7CD] p-6 rounded-lg shadow-lg border border-[#FFB703] cursor-pointer transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl animate-fadeIn" style={{ animationDelay: '0.5s' }}> {/* Soft Clay background, Golden Wheat border */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-[#2F2F2F]">New Enquiries</h3> {/* Dark Charcoal text */}
                  <svg className="w-9 h-9 text-[##086920]" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path></svg> {/* Primary Green icon */}
                </div>
                <p className="text-5xl font-bold text-[##086920] animate-pulse">{dashboardStats.newEnquiries}</p> {/* Primary Green count */}
                <p className="text-base text-[#2F2F2F] opacity-80 mt-2">Unread or unaddressed customer queries</p> {/* Dark Charcoal text */}
              </div>
            </div>

            {/* Recent Services Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-[#DAD7CD] p-6 rounded-lg shadow-lg border border-[#FFB703] animate-fadeIn" style={{ animationDelay: '0.6s' }}> {/* Soft Clay background, Golden Wheat border */}
                <h3 className="text-xl font-semibold text-[##086920] mb-4">Recent Services</h3> 
                {recentServices.length === 0 ? (
                  <p className="text-[#2F2F2F] opacity-70">No recent services to display.</p> 
                ) : (
                  <ul className="divide-y divide-[#FFB703]"> 
                    {recentServices.map((service) => (
                      <li key={service.ServiceID || service.id} className="py-3 flex justify-between items-center hover:bg-[#B7EFC5] rounded-md px-2 transition-colors duration-200"> {/* Mint Green hover background */}
                        <div>
                          <p className="text-[#2F2F2F] font-medium text-lg">{service.ServiceName || service.name}</p> {/* Dark Charcoal text */}
                          <p className="text-sm text-[#2F2F2F] opacity-70">Active: {service.IsActive ? 'Yes' : 'No'}</p> {/* Dark Charcoal text */}
                        </div>
                        <a href="#" className="text-[##086920] hover:underline text-sm font-medium transition-colors duration-200 hover:text-[#FFB703]">View &rarr;</a> {/* Primary Green link, Golden Wheat on hover */}
                      </li>
                    ))}
                  </ul>
                )}
                <div className="text-center mt-6">
                  <a href="#" className="text-[##086920] hover:underline font-medium text-lg transition-colors duration-200 hover:text-[#FFB703]">View All Services &rarr;</a> {/* Primary Green link, Golden Wheat on hover */}
                </div>
              </div>

              {/* Recent Users Section */}
              <div className="bg-[#DAD7CD] p-6 rounded-lg shadow-lg border border-[#FFB703] animate-fadeIn" style={{ animationDelay: '0.7s' }}> {/* Soft Clay background, Golden Wheat border */}
                <h3 className="text-xl font-semibold text-[##086920] mb-4">Recently Registered Users</h3> {/* Primary Green heading */}
                {recentUsers.length === 0 ? (
                  <p className="text-[#2F2F2F] opacity-70">No recent users to display.</p> 
                ) : (
                  <ul className="divide-y divide-[#FFB703]"> 
                    {recentUsers.map((user) => (
                      <li key={user.UserID || user.id} className="py-3 flex justify-between items-center hover:bg-[#B7EFC5] rounded-md px-2 transition-colors duration-200"> {/* Mint Green hover background */}
                        <div>
                          <p className="text-[#2F2F2F] font-medium text-lg">{user.FirstName} {user.LastName}</p> {/* Dark Charcoal text */}
                          <p className="text-sm text-[#2F2F2F] opacity-70">Email: {user.Email} - Phone: {user.PhoneNumber || 'N/A'}</p> {/* Dark Charcoal text */}
                        </div>
                        <a href="#" className="text-[##086920] hover:underline text-sm font-medium transition-colors duration-200 hover:text-[#FFB703]">View &rarr;</a> {/* Primary Green link, Golden Wheat on hover */}
                      </li>
                    ))}
                  </ul>
                )}
                <div className="text-center mt-6">
                  <a href="#" className="text-[##086920] hover:underline font-medium text-lg transition-colors duration-200 hover:text-[#FFB703]">View All Users &rarr;</a> {/* Primary Green link, Golden Wheat on hover */}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;