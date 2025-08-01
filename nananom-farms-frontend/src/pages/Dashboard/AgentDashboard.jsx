import React, { useState, useEffect } from 'react';
import { getUserRole, getToken, logoutUser } from '../../services/auth';
import { getAllAppointments } from '../../services/appointmentService';
import { getAllEnquiries } from '../../services/enquiryService';
import { NavLink } from 'react-router-dom'; // Import NavLink for sidebar

const AgentDashboard = () => {
  const userId = getToken();
  const roleName = getUserRole();

  // State for fetched data and UI status
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardStats, setDashboardStats] = useState({
    totalAppointments: 0,
    pendingAppointments: 0,
    confirmedAppointments: 0,
    totalEnquiries: 0,
    newEnquiries: 0,
    inProgressEnquiries: 0,
  });
  const [recentAppointments, setRecentAppointments] = useState([]);
  const [recentEnquiries, setRecentEnquiries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null); // Clear previous errors
      try {
        // Fetch all appointments and enquiries to calculate stats and populate recent lists
        const [appointmentsData, enquiriesData] = await Promise.all([
          getAllAppointments(),
          getAllEnquiries(),
        ]);

        // Calculate dashboard stats based on fetched data
        setDashboardStats({
          totalAppointments: appointmentsData.length,
          pendingAppointments: appointmentsData.filter(a => a.Status === 'Pending').length,
          confirmedAppointments: appointmentsData.filter(a => a.Status === 'Confirmed').length,
          totalEnquiries: enquiriesData.length,
          newEnquiries: enquiriesData.filter(e => e.Status === 'New').length,
          inProgressEnquiries: enquiriesData.filter(e => e.Status === 'In Progress').length,
        });

        // Set recent lists (e.g., top 5)
        setRecentAppointments(appointmentsData.slice(0, 5));
        setRecentEnquiries(enquiriesData.slice(0, 5));

      } catch (err) {
        setError("Failed to load dashboard data. Please ensure backend is running and you are authorized. Details: " + err.message);
        console.error("Dashboard data fetching error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this runs once on component mount

  const handleLogout = () => {
    logoutUser();
    window.location.href = '/login'; // Redirect to login page
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
          <p className="text-2xl font-semibold text-[#2F2F2F] animate-pulse">Nananom Farms Agent Panel</p> {/* Dark Charcoal text */}
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
          <h2 className="text-3xl font-extrabold text-[#FFFFFF] tracking-wide">Nananom Agent</h2> {/* Pure White text */}
          <p className="text-sm text-[#FFFFFF] opacity-90 mt-1">Efficient Support</p> {/* Pure White text */}
        </div>
        <nav className="flex-1 space-y-3">
          <NavLink to="/agent/dashboard" className={sidebarLinkClasses}>
            <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3 12l9-9 9 9v9a2 2 0 01-2 2H5a2 2 0 01-2-2v-9zM10 10v6a1 1 0 001 1h2a1 1 0 001-1v-6h-4z"></path></svg>
            Dashboard
          </NavLink>
          <NavLink to="/agent/appointments" className={sidebarLinkClasses}>
            <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM17 10h-6V7h6v3z"></path></svg>
            Manage Appointments
          </NavLink>
          <NavLink to="/agent/enquiries" className={sidebarLinkClasses}>
            <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path></svg>
            Manage Enquiries
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
          <h1 className="text-3xl font-extrabold text-[##086920]">Agent Dashboard</h1> {/* Primary Green text */}
          <div className="flex items-center">
            <span className="text-[#2F2F2F] text-lg mr-4">Welcome, <strong className="font-bold text-[##086920]">Agent User</strong>!</span> {/* Dark Charcoal text, Primary Green strong text */}
            <div className="relative">
              <button className="flex items-center text-sm border-2 border-[#FFB703] rounded-full focus:outline-none focus:ring-2 focus:ring-[##086920] transition duration-150 ease-in-out transform hover:scale-105"> {/* Golden Wheat border, Primary Green ring */}
                <img className="h-10 w-10 rounded-full object-cover" src="https://via.placeholder.com/150/25A244/FFFFFF?text=AG" alt="Agent Avatar" /> {/* Updated placeholder image background to Primary Green */}
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

            {/* Agent Metric Cards */}
            <h2 className="text-2xl font-semibold text-[##086920] mb-6 animate-fadeIn" style={{ animationDelay: '0.1s' }}>Overview Statistics</h2> {/* Primary Green heading */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 mb-8">
              {/* Card 1: Total Appointments */}
              <div className="bg-[#DAD7CD] p-6 rounded-lg shadow-lg border border-[#FFB703] cursor-pointer transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl animate-fadeIn" style={{ animationDelay: '0.2s' }}> {/* Soft Clay background, Golden Wheat border */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-[#2F2F2F]">Total Appointments</h3> {/* Dark Charcoal text */}
                  <svg className="w-9 h-9 text-[##086920]" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM17 10h-6V7h6v3z"></path></svg> {/* Primary Green icon */}
                </div>
                <p className="text-5xl font-bold text-[##086920] animate-pulse">{dashboardStats.totalAppointments}</p> {/* Primary Green count */}
                <p className="text-base text-[#2F2F2F] opacity-80 mt-2">All scheduled appointments</p> {/* Dark Charcoal text */}
              </div>

              {/* Card 2: Pending Appointments */}
              <div className="bg-[#DAD7CD] p-6 rounded-lg shadow-lg border border-[#FFB703] cursor-pointer transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl animate-fadeIn" style={{ animationDelay: '0.3s' }}> {/* Soft Clay background, Golden Wheat border */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-[#2F2F2F]">Pending Appointments</h3> {/* Dark Charcoal text */}
                  <svg className="w-9 h-9 text-[#FFB703]" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> {/* Golden Wheat icon */}
                </div>
                <p className="text-5xl font-bold text-[#FFB703] animate-pulse">{dashboardStats.pendingAppointments}</p> {/* Golden Wheat count */}
                <p className="text-base text-[#2F2F2F] opacity-80 mt-2">Appointments awaiting confirmation</p> {/* Dark Charcoal text */}
              </div>

              {/* Card 3: Confirmed Appointments */}
              <div className="bg-[#DAD7CD] p-6 rounded-lg shadow-lg border border-[#FFB703] cursor-pointer transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl animate-fadeIn" style={{ animationDelay: '0.4s' }}> {/* Soft Clay background, Golden Wheat border */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-[#2F2F2F]">Confirmed Appointments</h3> {/* Dark Charcoal text */}
                  <svg className="w-9 h-9 text-[#B7EFC5]" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> {/* Mint Green icon */}
                </div>
                <p className="text-5xl font-bold text-[#B7EFC5] animate-pulse">{dashboardStats.confirmedAppointments}</p> {/* Mint Green count */}
                <p className="text-base text-[#2F2F2F] opacity-80 mt-2">Appointments ready for service</p> {/* Dark Charcoal text */}
              </div>

              {/* Card 4: Total Enquiries */}
              <div className="bg-[#DAD7CD] p-6 rounded-lg shadow-lg border border-[#FFB703] cursor-pointer transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl animate-fadeIn" style={{ animationDelay: '0.5s' }}> {/* Soft Clay background, Golden Wheat border */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-[#2F2F2F]">Total Enquiries</h3> {/* Dark Charcoal text */}
                  <svg className="w-9 h-9 text-[##086920]" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path></svg> {/* Primary Green icon */}
                </div>
                <p className="text-5xl font-bold text-[##086920] animate-pulse">{dashboardStats.totalEnquiries}</p> {/* Primary Green count */}
                <p className="text-base text-[#2F2F2F] opacity-80 mt-2">All customer messages received</p> {/* Dark Charcoal text */}
              </div>

              {/* Card 5: New Enquiries */}
              <div className="bg-[#DAD7CD] p-6 rounded-lg shadow-lg border border-[#FFB703] cursor-pointer transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl animate-fadeIn" style={{ animationDelay: '0.6s' }}> {/* Soft Clay background, Golden Wheat border */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-[#2F2F2F]">New Enquiries</h3> {/* Dark Charcoal text */}
                  <svg className="w-9 h-9 text-[#FFB703]" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M7 8h10M7 12h10M7 16h10M4 21h16a2 2 0 002-2V5a2 2 0 00-2-2H4a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg> {/* Golden Wheat icon */}
                </div>
                <p className="text-5xl font-bold text-[#FFB703] animate-pulse">{dashboardStats.newEnquiries}</p> {/* Golden Wheat count */}
                <p className="text-base text-[#2F2F2F] opacity-80 mt-2">Unread or unassigned enquiries</p> {/* Dark Charcoal text */}
              </div>

              {/* Card 6: In Progress Enquiries */}
              <div className="bg-[#DAD7CD] p-6 rounded-lg shadow-lg border border-[#FFB703] cursor-pointer transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl animate-fadeIn" style={{ animationDelay: '0.7s' }}> {/* Soft Clay background, Golden Wheat border */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-[#2F2F2F]">In Progress Enquiries</h3> {/* Dark Charcoal text */}
                  <svg className="w-9 h-9 text-[#B7EFC5]" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg> {/* Mint Green icon */}
                </div>
                <p className="text-5xl font-bold text-[#B7EFC5] animate-pulse">{dashboardStats.inProgressEnquiries}</p> {/* Mint Green count */}
                <p className="text-base text-[#2F2F2F] opacity-80 mt-2">Enquiries currently being handled</p> {/* Dark Charcoal text */}
              </div>
            </div>

            {/* Recent Appointments Section */}
            <div className="bg-[#DAD7CD] p-6 rounded-lg shadow-lg border border-[#FFB703] mb-8 animate-fadeIn" style={{ animationDelay: '0.8s' }}> {/* Soft Clay background, Golden Wheat border */}
              <h3 className="text-xl font-semibold text-[##086920] mb-4">Recent Appointments</h3> {/* Primary Green heading */}
              {recentAppointments.length === 0 ? (
                <p className="text-[#2F2F2F] opacity-70">No recent appointments to display.</p> 
              ) : (
                <ul className="divide-y divide-[#FFB703]"> {/* Golden Wheat divider */}
                  {recentAppointments.map((appointment) => (
                    <li key={appointment.AppointmentID || appointment.id} className="py-3 flex justify-between items-center hover:bg-[#B7EFC5] rounded-md px-2 transition-colors duration-200"> {/* Mint Green hover background */}
                      <div>
                        <p className="text-[#2F2F2F] font-medium text-lg">
                          {appointment.AppointmentDate} at {appointment.AppointmentTime}
                        </p>
                        <p className="text-sm text-[#2F2F2F] opacity-70">
                          Status: {appointment.Status} - Service ID: {appointment.ServiceID?.substring(0, 8)}... {/* Added optional chaining for ServiceID */}
                        </p>
                      </div>
                      <a href="#" className="text-[##086920] hover:underline text-sm font-medium transition-colors duration-200 hover:text-[#FFB703]">View &rarr;</a> {/* Primary Green link, Golden Wheat on hover */}
                    </li>
                  ))}
                </ul>
              )}
              <div className="text-center mt-6">
                <a href="#" className="text-[##086920] hover:underline font-medium text-lg transition-colors duration-200 hover:text-[#FFB703]">View All Appointments &rarr;</a> {/* Primary Green link, Golden Wheat on hover */}
              </div>
            </div>

            {/* Recent Enquiries Section */}
            <div className="bg-[#DAD7CD] p-6 rounded-lg shadow-lg border border-[#FFB703] animate-fadeIn" style={{ animationDelay: '0.9s' }}> {/* Soft Clay background, Golden Wheat border */}
              <h3 className="text-xl font-semibold text-[##086920] mb-4">Recent Enquiries</h3> {/* Primary Green heading */}
              {recentEnquiries.length === 0 ? (
                <p className="text-[#2F2F2F] opacity-70">No recent enquiries to display.</p> 
              ) : (
                <ul className="divide-y divide-[#FFB703]"> {/* Golden Wheat divider */}
                  {recentEnquiries.map((enquiry) => (
                    <li key={enquiry.EnquiryID || enquiry.id} className="py-3 flex justify-between items-center hover:bg-[#B7EFC5] rounded-md px-2 transition-colors duration-200"> {/* Mint Green hover background */}
                      <div>
                        <p className="text-[#2F2F2F] font-medium text-lg">{enquiry.Subject || 'No Subject'}</p> {/* Dark Charcoal text */}
                        <p className="text-sm text-[#2F2F2F] opacity-70">
                          From: {enquiry.Name} ({enquiry.Email}) - Status: {enquiry.Status}
                        </p>
                      </div>
                      <a href="#" className="text-[#086920] hover:underline text-sm font-medium transition-colors duration-200 hover:text-[#FFB703]">View &rarr;</a> {/* Primary Green link, Golden Wheat on hover */}
                    </li>
                  ))}
                </ul>
              )}
              <div className="text-center mt-6">
                <a href="#" className="text-[#086920] hover:underline font-medium text-lg transition-colors duration-200 hover:text-[#FFB703]">View All Enquiries &rarr;</a> {/* Primary Green link, Golden Wheat on hover */}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AgentDashboard;