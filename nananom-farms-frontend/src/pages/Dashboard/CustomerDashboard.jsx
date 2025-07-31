import React, { useState, useEffect } from 'react';
import { getUserRole, getToken, logoutUser } from '../../services/auth';
import { getAllAppointments } from '../../services/appointmentService'; // To get customer's appointments
import { getAllEnquiries } from '../../services/enquiryService';    // To get customer's enquiries
import { getAllServices } from '../../src/config/serviceService';// To show available services or subscribed ones
import { NavLink } from 'react-router-dom'; // Import NavLink for sidebar

const CustomerDashboard = () => {
  const userId = getToken(); // getToken usually returns the token itself, acting as a user identifier here
  const roleName = getUserRole();

  // State for fetched data and UI status
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardStats, setDashboardStats] = useState({
    totalBookedServices: 0,
    upcomingAppointments: 0,
    pendingEnquiries: 0,
  });
  const [myAppointments, setMyAppointments] = useState([]);
  const [myEnquiries, setMyEnquiries] = useState([]);
  const [availableServices, setAvailableServices] = useState([]); // For displaying public services

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null); // Clear previous errors
      try {
        // IMPORTANT ASSUMPTION:
        // When a Customer (with their JWT token) calls getAllAppointments() or getAllEnquiries(),
        // the backend should *automatically filter* and return ONLY the appointments/enquiries
        // belonging to that authenticated user.
        // If your backend does NOT do this, and instead returns ALL appointments/enquiries,
        // you would need to filter by `appointment.UserID === userId` and `enquiry.UserID === userId`
        // on the frontend here. Backend filtering is more secure and efficient.

        const [appointmentsData, enquiriesData, servicesData] = await Promise.all([
          getAllAppointments(), // Assuming this returns appointments for the logged-in user
          getAllEnquiries(),    // Assuming this returns enquiries for the logged-in user
          getAllServices(),     // Public services available to book
        ]);

        // Filter for upcoming appointments (e.g., date in future and not cancelled/completed)
        const now = new Date();
        const upcomingAppointments = appointmentsData.filter(app => {
          const appDateTime = new Date(`${app.AppointmentDate}T${app.AppointmentTime}`);
          return appDateTime > now && (app.Status === 'Pending' || app.Status === 'Confirmed');
        });

        // Filter for pending enquiries (e.g., 'New' or 'In Progress')
        const pendingEnquiries = enquiriesData.filter(enq =>
          enq.Status === 'New' || enq.Status === 'In Progress'
        );

        setDashboardStats({
          totalBookedServices: appointmentsData.length, // Total appointments can represent booked services
          upcomingAppointments: upcomingAppointments.length,
          pendingEnquiries: pendingEnquiries.length,
        });

        // Set customer-specific lists
        setMyAppointments(appointmentsData.slice(0, 5)); // Show most recent 5
        setMyEnquiries(enquiriesData.slice(0, 5));     // Show most recent 5
        setAvailableServices(servicesData.slice(0, 5)); // Show some available services

      } catch (err) {
        setError("Failed to load dashboard data. Please ensure backend is running and you are authorized. Details: " + err.message);
        console.error("Dashboard data fetching error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]); // Depend on userId to refetch if user changes (e.g., after login/logout, though usually page reload occurs)

  const handleLogout = () => {
    logoutUser();
    window.location.href = '/login'; // Redirect to login page
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
          <p className="text-2xl font-semibold text-[#2F4F4F] animate-pulse">Nananom Farms Customer Portal</p>
          <p className="text-lg text-[#2F4F4F] mt-2">Preparing your personalized dashboard...</p>
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
          <h2 className="text-3xl font-extrabold text-[#FFFFF0] tracking-wide">Nananom Customer</h2>
          <p className="text-sm text-[#FFFFF0] opacity-90 mt-1">Your Farming Journey</p>
        </div>
        <nav className="flex-1 space-y-3">
          <NavLink to="/customer/dashboard" className={sidebarLinkClasses}>
            <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3 12l9-9 9 9v9a2 2 0 01-2 2H5a2 2 0 01-2-2v-9zM10 10v6a1 1 0 001 1h2a1 1 0 001-1v-6h-4z"></path></svg>
            Dashboard
          </NavLink>
          <NavLink to="/customer/book-service" className={sidebarLinkClasses}>
            <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M9.75 17L9 20l-1 1h8l-1-1-1.25-3M15 10V5.729a2 2 0 00-2.14-1.956L12 3m-2 2.729V10m-2 2h8m-8 0v8a2 2 0 002 2h4a2 2 0 002-2v-8m-8 0h8"></path></svg>
            Book New Service
          </NavLink>
          <NavLink to="/customer/my-enquiries" className={sidebarLinkClasses}>
            <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path></svg>
            My Enquiries
          </NavLink>
          <NavLink to="/customer/my-appointments" className={sidebarLinkClasses}>
            <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM17 10h-6V7h6v3z"></path></svg>
            My Appointments
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
          <h1 className="text-3xl font-extrabold text-[#4682B4]">Customer Dashboard</h1>
          <div className="flex items-center">
            <span className="text-[#2F4F4F] text-lg mr-4">Welcome, <strong className="font-bold text-[#4682B4]">Customer User</strong>!</span>
            <div className="relative">
              <button className="flex items-center text-sm border-2 border-[#EAA221] rounded-full focus:outline-none focus:ring-2 focus:ring-[#4682B4] transition duration-150 ease-in-out transform hover:scale-105">
                <img className="h-10 w-10 rounded-full object-cover" src="https://via.placeholder.com/150/4682B4/FFFFFF?text=CS" alt="Customer Avatar" />
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

            {/* Customer Metric Cards */}
            <h2 className="text-2xl font-semibold text-[#4682B4] mb-6 animate-fadeIn" style={{ animationDelay: '0.1s' }}>Your Activity Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Card 1: Total Booked Services (represented by total appointments) */}
              <div className="bg-[#FFFFF0] p-6 rounded-lg shadow-lg border border-[#EAA221] cursor-pointer transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl animate-fadeIn" style={{ animationDelay: '0.2s' }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-[#2F4F4F]">Total Booked Services</h3>
                  <svg className="w-9 h-9 text-[#4682B4]" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M9.75 17L9 20l-1 1h8l-1-1-1.25-3M15 10V5.729a2 2 0 00-2.14-1.956L12 3m-2 2.729V10m-2 2h8m-8 0v8a2 2 0 002 2h4a2 2 0 002-2v-8m-8 0h8"></path></svg>
                </div>
                <p className="text-5xl font-bold text-[#4682B4] animate-pulse">{dashboardStats.totalBookedServices}</p>
                <p className="text-base text-[#2F4F4F] opacity-80 mt-2">All services you have booked</p>
              </div>

              {/* Card 2: Upcoming Appointments */}
              <div className="bg-[#FFFFF0] p-6 rounded-lg shadow-lg border border-[#EAA221] cursor-pointer transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl animate-fadeIn" style={{ animationDelay: '0.3s' }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-[#2F4F4F]">Upcoming Appointments</h3>
                  <svg className="w-9 h-9 text-[#8A3324]" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM17 10h-6V7h6v3z"></path></svg>
                </div>
                <p className="text-5xl font-bold text-[#8A3324] animate-pulse">{dashboardStats.upcomingAppointments}</p>
                <p className="text-base text-[#2F4F4F] opacity-80 mt-2">Appointments scheduled soon</p>
              </div>

              {/* Card 3: Pending Enquiries */}
              <div className="bg-[#FFFFF0] p-6 rounded-lg shadow-lg border border-[#EAA221] cursor-pointer transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl animate-fadeIn" style={{ animationDelay: '0.4s' }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-[#2F4F4F]">Pending Enquiries</h3>
                  <svg className="w-9 h-9 text-[#EAA221]" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path></svg>
                </div>
                <p className="text-5xl font-bold text-[#EAA221] animate-pulse">{dashboardStats.pendingEnquiries}</p>
                <p className="text-base text-[#2F4F4F] opacity-80 mt-2">Your enquiries awaiting response</p>
              </div>
            </div>

            {/* Your Appointments Section */}
            <div className="bg-[#FFFFF0] p-6 rounded-lg shadow-lg border border-[#EAA221] mb-8 animate-fadeIn" style={{ animationDelay: '0.5s' }}>
              <h3 className="text-xl font-semibold text-[#4682B4] mb-4">Your Recent Appointments</h3>
              {myAppointments.length === 0 ? (
                <p className="text-[#2F4F4F] opacity-70">You have no recent appointments to display.</p>
              ) : (
                <ul className="divide-y divide-[#EAA221]">
                  {myAppointments.map((appointment) => (
                    <li key={appointment.AppointmentID || appointment.id} className="py-3 flex justify-between items-center hover:bg-[#F2F4F5] rounded-md px-2 transition-colors duration-200">
                      <div>
                        <p className="text-[#2F4F4F] font-medium text-lg">
                          {appointment.AppointmentDate} at {appointment.AppointmentTime}
                        </p>
                        <p className="text-sm text-[#2F4F4F] opacity-70">
                          Status: {appointment.Status} - Service ID: {appointment.ServiceID.substring(0, 8)}...
                        </p>
                      </div>
                      <a href="#" className="text-[#4682B4] hover:underline text-sm font-medium transition-colors duration-200 hover:text-[#8A3324]">View &rarr;</a>
                    </li>
                  ))}
                </ul>
              )}
              <div className="text-center mt-6">
                <a href="/customer/my-appointments" className="text-[#4682B4] hover:underline font-medium text-lg transition-colors duration-200 hover:text-[#8A3324]">View All Your Appointments &rarr;</a>
              </div>
            </div>

            {/* Your Enquiries Section */}
            <div className="bg-[#FFFFF0] p-6 rounded-lg shadow-lg border border-[#EAA221] mb-8 animate-fadeIn" style={{ animationDelay: '0.6s' }}>
              <h3 className="text-xl font-semibold text-[#4682B4] mb-4">Your Recent Enquiries</h3>
              {myEnquiries.length === 0 ? (
                <p className="text-[#2F4F4F] opacity-70">You have no recent enquiries to display.</p>
              ) : (
                <ul className="divide-y divide-[#EAA221]">
                  {myEnquiries.map((enquiry) => (
                    <li key={enquiry.EnquiryID || enquiry.id} className="py-3 flex justify-between items-center hover:bg-[#F2F4F5] rounded-md px-2 transition-colors duration-200">
                      <div>
                        <p className="text-[#2F4F4F] font-medium text-lg">{enquiry.Subject || 'No Subject'}</p>
                        <p className="text-sm text-[#2F4F4F] opacity-70">
                          Status: {enquiry.Status} - Created: {new Date(enquiry.CreatedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <a href="#" className="text-[#4682B4] hover:underline text-sm font-medium transition-colors duration-200 hover:text-[#8A3324]">View &rarr;</a>
                    </li>
                  ))}
                </ul>
              )}
              <div className="text-center mt-6">
                <a href="/customer/my-enquiries" className="text-[#4682B4] hover:underline font-medium text-lg transition-colors duration-200 hover:text-[#8A3324]">View All Your Enquiries &rarr;</a>
              </div>
            </div>

            {/* Available Services Section (Example of fetching and displaying public data) */}
            <div className="bg-[#FFFFF0] p-6 rounded-lg shadow-lg border border-[#EAA221] animate-fadeIn" style={{ animationDelay: '0.7s' }}>
              <h3 className="text-xl font-semibold text-[#4682B4] mb-4">Discover Our Services</h3>
              {availableServices.length === 0 ? (
                <p className="text-[#2F4F4F] opacity-70">No services available at the moment. Please check back later!</p>
              ) : (
                <ul className="divide-y divide-[#EAA221]">
                  {availableServices.map((service) => (
                    <li key={service.ServiceID || service.id} className="py-3 flex justify-between items-center hover:bg-[#F2F4F5] rounded-md px-2 transition-colors duration-200">
                      <div>
                        <p className="text-[#2F4F4F] font-medium text-lg">{service.ServiceName || service.name}</p>
                        <p className="text-sm text-[#2F4F4F] opacity-70">{service.Description.substring(0, 70)}...</p>
                      </div>
                      <a href="/customer/book-service" className="text-[#4682B4] hover:underline text-sm font-medium transition-colors duration-200 hover:text-[#8A3324]">Learn More & Book &rarr;</a>
                    </li>
                  ))}
                </ul>
              )}
              <div className="text-center mt-6">
                <a href="/services" className="text-[#4682B4] hover:underline font-medium text-lg transition-colors duration-200 hover:text-[#8A3324]">View All Public Services &rarr;</a>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default CustomerDashboard;