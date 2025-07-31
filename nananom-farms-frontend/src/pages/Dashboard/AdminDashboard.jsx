import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { getUserRole, getToken, logoutUser } from '../../services/auth';
import { getAdminDashboardStats } from '../../services/dashboardService';
import { getAllServices } from '../../src/config/serviceService';
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
      ${isActive ? 'bg-[#EAA221] text-[#2F4F4F] scale-100 shadow-inner' : 'hover:bg-[#EAA221] hover:text-[#2F4F4F] hover:scale-[1.02] hover:shadow-md'}`;

  // --- Loading State ---
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#F2F4F5] font-sans">
        <div className="text-center p-8 bg-[#FFFFF0] rounded-xl shadow-lg animate-popIn">
          <div className="w-20 h-20 border-6 border-t-[#4682B4] border-b-[#8A3324] border-l-[#4682B4] border-r-[#8A3324] rounded-full animate-spin-slow mx-auto mb-6"></div>
          <p className="text-2xl font-semibold text-[#2F4F4F] animate-pulse">Nananom Farms Admin Panel</p>
          <p className="text-lg text-[#2F4F4F] mt-2">Gathering fresh data for you...</p>
        </div>
      </div>
    );
  }

  // --- Error State ---
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#F2F4F5] font-sans">
        <div className="text-center p-8 bg-[#FFFFF0] rounded-xl shadow-lg border-2 border-[#EAA221] animate-popIn">
          <p className="text-2xl font-bold text-[#8A3324] mb-4">Oops! Dashboard Data Not Found.</p>
          <p className="text-lg text-[#2F4F4F] mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-[#EAA221] text-[#2F4F4F] rounded-lg hover:bg-[#4682B4] hover:text-white transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#EAA221] active:scale-95"
          >
            Try Again
          </button>
          <p className="text-sm text-[#2F4F4F] mt-4">If the problem persists, contact support or check backend status.</p>
        </div>
      </div>
    );
  }

  // --- Render Dashboard Content ---
  return (
    <div className="flex min-h-screen bg-[#F2F4F5] font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-[#4682B4] text-[#FFFFF0] shadow-xl flex flex-col p-4 animate-slideInLeft">
        <div className="p-6 border-b border-[#EAA221] mb-4">
          <h2 className="text-3xl font-extrabold text-[#FFFFF0] tracking-wide">Nananom Admin</h2>
          <p className="text-sm text-[#FFFFF0] opacity-90 mt-1">Harnessing Growth</p>
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
        <div className="p-4 border-t border-[#EAA221] mt-auto">
          <button
            onClick={handleLogout}
            className="flex items-center w-full p-3 rounded-lg hover:bg-[#8A3324] text-[#FFFFF0] text-left transition duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#EAA221] active:scale-95"
          >
            <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar / Header */}
        <header className="flex justify-between items-center p-6 bg-[#FFFFF0] border-b border-[#EAA221] shadow-md">
          <h1 className="text-3xl font-extrabold text-[#4682B4]">Admin Overview</h1>
          <div className="flex items-center">
            <span className="text-[#2F4F4F] text-lg mr-4">Welcome, <strong className="font-bold text-[#4682B4]">Admin User</strong>!</span>
            <div className="relative">
              <button className="flex items-center text-sm border-2 border-[#EAA221] rounded-full focus:outline-none focus:ring-2 focus:ring-[#4682B4] transition duration-150 ease-in-out transform hover:scale-105">
                <img className="h-10 w-10 rounded-full object-cover" src="https://via.placeholder.com/150/4682B4/FFFFFF?text=AD" alt="Admin Avatar" />
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#F2F4F5] p-6">
          <div className="container mx-auto">
            <p className="text-lg text-[#2F4F4F] mb-8 animate-fadeIn">
              You are logged in as <strong className="font-bold text-[#4682B4]">{roleName}</strong>. (User ID: {userId || 'N/A'})
            </p>

            {/* Admin Metric Cards */}
            <h2 className="text-2xl font-semibold text-[#4682B4] mb-6 animate-fadeIn" style={{ animationDelay: '0.1s' }}>Key Metrics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
              {/* Card 1: Total Users */}
              <div className="bg-[#FFFFF0] p-6 rounded-lg shadow-lg border border-[#EAA221] cursor-pointer transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl animate-fadeIn" style={{ animationDelay: '0.2s' }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-[#2F4F4F]">Total Users</h3>
                  <svg className="w-9 h-9 text-[#4682B4]" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 4a4 4 0 100 8 4 4 0 000-8zM18 19H6c-1.1 0-2 .9-2 2v1h16v-1c0-1.1-.9-2-2-2z"></path></svg>
                </div>
                <p className="text-5xl font-bold text-[#4682B4] animate-pulse">{dashboardStats.totalUsers}</p>
                <p className="text-base text-[#2F4F4F] opacity-80 mt-2">Registered users across all roles</p>
              </div>

              {/* Card 2: Active Services */}
              <div className="bg-[#FFFFF0] p-6 rounded-lg shadow-lg border border-[#EAA221] cursor-pointer transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl animate-fadeIn" style={{ animationDelay: '0.3s' }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-[#2F4F4F]">Active Services</h3>
                  <svg className="w-9 h-9 text-[#8A3324]" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM12 20c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7z"></path></svg>
                </div>
                <p className="text-5xl font-bold text-[#8A3324] animate-pulse">{dashboardStats.activeServices}</p>
                <p className="text-base text-[#2F4F4F] opacity-80 mt-2">Services currently offered or in progress</p>
              </div>

              {/* Card 3: Pending Appointments */}
              <div className="bg-[#FFFFF0] p-6 rounded-lg shadow-lg border border-[#EAA221] cursor-pointer transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl animate-fadeIn" style={{ animationDelay: '0.4s' }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-[#2F4F4F]">Pending Appointments</h3>
                  <svg className="w-9 h-9 text-[#EAA221]" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM17 10h-6V7h6v3z"></path></svg>
                </div>
                <p className="text-5xl font-bold text-[#EAA221] animate-pulse">{dashboardStats.pendingAppointments}</p>
                <p className="text-base text-[#2F4F4F] opacity-80 mt-2">Appointments awaiting approval or action</p>
              </div>

              {/* Card 4: New Enquiries */}
              <div className="bg-[#FFFFF0] p-6 rounded-lg shadow-lg border border-[#EAA221] cursor-pointer transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl animate-fadeIn" style={{ animationDelay: '0.5s' }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-[#2F4F4F]">New Enquiries</h3>
                  <svg className="w-9 h-9 text-[#4682B4]" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path></svg>
                </div>
                <p className="text-5xl font-bold text-[#4682B4] animate-pulse">{dashboardStats.newEnquiries}</p>
                <p className="text-base text-[#2F4F4F] opacity-80 mt-2">Unread or unaddressed customer queries</p>
              </div>
            </div>

            {/* Recent Services Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-[#FFFFF0] p-6 rounded-lg shadow-lg border border-[#EAA221] animate-fadeIn" style={{ animationDelay: '0.6s' }}>
                <h3 className="text-xl font-semibold text-[#4682B4] mb-4">Recent Services</h3>
                {recentServices.length === 0 ? (
                  <p className="text-[#2F4F4F] opacity-70">No recent services to display.</p>
                ) : (
                  <ul className="divide-y divide-[#EAA221]">
                    {recentServices.map((service) => (
                      <li key={service.ServiceID || service.id} className="py-3 flex justify-between items-center hover:bg-[#F2F4F5] rounded-md px-2 transition-colors duration-200">
                        <div>
                          <p className="text-[#2F4F4F] font-medium text-lg">{service.ServiceName || service.name}</p>
                          <p className="text-sm text-[#2F4F4F] opacity-70">Active: {service.IsActive ? 'Yes' : 'No'}</p>
                        </div>
                        <a href="#" className="text-[#4682B4] hover:underline text-sm font-medium transition-colors duration-200 hover:text-[#8A3324]">View &rarr;</a>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="text-center mt-6">
                  <a href="#" className="text-[#4682B4] hover:underline font-medium text-lg transition-colors duration-200 hover:text-[#8A3324]">View All Services &rarr;</a>
                </div>
              </div>

              {/* Recent Users Section */}
              <div className="bg-[#FFFFF0] p-6 rounded-lg shadow-lg border border-[#EAA221] animate-fadeIn" style={{ animationDelay: '0.7s' }}>
                <h3 className="text-xl font-semibold text-[#4682B4] mb-4">Recently Registered Users</h3>
                {recentUsers.length === 0 ? (
                  <p className="text-[#2F4F4F] opacity-70">No recent users to display.</p>
                ) : (
                  <ul className="divide-y divide-[#EAA221]">
                    {recentUsers.map((user) => (
                      <li key={user.UserID || user.id} className="py-3 flex justify-between items-center hover:bg-[#F2F4F5] rounded-md px-2 transition-colors duration-200">
                        <div>
                          <p className="text-[#2F4F4F] font-medium text-lg">{user.FirstName} {user.LastName}</p>
                          <p className="text-sm text-[#2F4F4F] opacity-70">Email: {user.Email} - Phone: {user.PhoneNumber || 'N/A'}</p>
                        </div>
                        <a href="#" className="text-[#4682B4] hover:underline text-sm font-medium transition-colors duration-200 hover:text-[#8A3324]">View &rarr;</a>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="text-center mt-6">
                  <a href="#" className="text-[#4682B4] hover:underline font-medium text-lg transition-colors duration-200 hover:text-[#8A3324]">View All Users &rarr;</a>
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