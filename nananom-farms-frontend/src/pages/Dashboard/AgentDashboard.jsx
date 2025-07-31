// src/pages/Dashboard/AgentDashboard.jsx
import React from 'react';
import { getUserRole, getToken } from '../../services/auth'; // Corrected import names

const AgentDashboard = () => {
  const userId = getToken(); // Use getToken to retrieve the token (often used as user ID representation in UI)
  const roleName = getUserRole(); // Use getUserRole to retrieve the role name

  // Placeholder for agent's name (in a real app, this would come from user data)
  const agentName = "Sophia Mensah";

  // Mock data for agent-specific metrics
  const agentMetrics = {
    newEnquiriesToday: 7,
    pendingAppointments: 3,
    resolvedTicketsThisWeek: 28,
  };

  // Mock data for recent enquiries
  const recentEnquiries = [
    { id: 101, customer: "Kwame Nkrumah", subject: "Palm oil bulk order inquiry", status: "New", time: "10 mins ago" },
    { id: 100, customer: "Ama Serwaa", subject: "Question about delivery times", status: "Open", time: "2 hours ago" },
    { id: 99, customer: "John Boadu", subject: "Fertilizer product details", status: "Resolved", time: "Yesterday" },
  ];

  // Mock data for upcoming appointments
  const upcomingAppointments = [
    { id: 201, customer: "Kwame Nkrumah", type: "Sales Call", date: "Jul 31, 2025", time: "2:00 PM" },
    { id: 200, customer: "Grace Osei", type: "Consultation", date: "Aug 01, 2025", time: "10:00 AM" },
  ];

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-yellow-700 text-white shadow-lg flex flex-col">
        <div className="p-6 border-b border-yellow-800">
          <h2 className="text-2xl font-bold">Agent Panel</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <a href="#" className="flex items-center p-3 rounded-lg hover:bg-yellow-800 transition duration-200 bg-yellow-800">
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m0 0l-7 7m7-7v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
            Dashboard
          </a>
          <a href="#" className="flex items-center p-3 rounded-lg hover:bg-yellow-800 transition duration-200">
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-1 13a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2h12a2 2 0 012 2v14z"></path></svg>
            Enquiries
          </a>
          <a href="#" className="flex items-center p-3 rounded-lg hover:bg-yellow-800 transition duration-200">
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2zm0 0h14"></path></svg>
            Appointments
          </a>
          <a href="#" className="flex items-center p-3 rounded-lg hover:bg-yellow-800 transition duration-200">
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h2a2 2 0 002-2V7a2 2 0 00-2-2h-3M7 13v2m0 0v2m0-2H5m0 0h-2m2 0H3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2z"></path></svg>
            Customers
          </a>
          <a href="#" className="flex items-center p-3 rounded-lg hover:bg-yellow-800 transition duration-200">
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0h10a2 2 0 002-2V7a2 2 0 00-2-2H9m10 0a2 2 0 012 2v2m-6-2H9"></path></svg>
            Reports
          </a>
        </nav>
        <div className="p-4 border-t border-yellow-800 mt-auto">
          <a href="#" className="flex items-center p-3 rounded-lg hover:bg-yellow-800 transition duration-200">
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            Logout
          </a>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar / Header */}
        <header className="flex justify-between items-center p-6 bg-white border-b border-gray-200 shadow-sm">
          <h1 className="text-3xl font-semibold text-yellow-800">Agent Dashboard</h1>
          <div className="flex items-center">
            <span className="text-gray-700 mr-4">Welcome, <strong className="font-bold">{agentName}</strong>!</span>
            <div className="relative">
              {/* User Avatar/Menu (Placeholder) */}
              <button className="flex items-center text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out">
                <img className="h-9 w-9 rounded-full object-cover" src="https://via.placeholder.com/150/FFD700/FFFFFF?text=SA" alt="Agent Avatar" />
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <div className="container mx-auto">
            <p className="text-lg text-gray-700 mb-6">
              You are logged in as <strong className="font-bold text-yellow-700">{roleName}</strong>. (User ID: {userId || 'N/A'})
            </p>

            {/* Agent-Specific Metric Cards */}
            <h2 className="text-2xl font-semibold text-yellow-800 mb-4">Your Performance at a Glance</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {/* Card 1: New Enquiries Today */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-yellow-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-700">New Enquiries Today</h3>
                  <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                </div>
                <p className="text-4xl font-bold text-yellow-800">{agentMetrics.newEnquiriesToday}</p>
                <p className="text-sm text-gray-500 mt-2">New incoming messages</p>
              </div>

              {/* Card 2: Pending Appointments */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-yellow-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-700">Pending Appointments</h3>
                  <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2zm0 0h14"></path></svg>
                </div>
                <p className="text-4xl font-bold text-orange-800">{agentMetrics.pendingAppointments}</p>
                <p className="text-sm text-gray-500 mt-2">Meetings awaiting your action</p>
              </div>

              {/* Card 3: Resolved Tickets This Week */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-yellow-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-700">Resolved Tickets (This Week)</h3>
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <p className="text-4xl font-bold text-green-800">{agentMetrics.resolvedTicketsThisWeek}</p>
                <p className="text-sm text-gray-500 mt-2">Enquiries successfully closed</p>
              </div>
            </div>

            {/* Recent Enquiries Section */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-8">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Recent Enquiries</h3>
              <ul className="divide-y divide-gray-200">
                {recentEnquiries.map((enquiry) => (
                  <li key={enquiry.id} className="py-3 flex justify-between items-center">
                    <div>
                      <p className="text-gray-800 font-medium">{enquiry.subject}</p>
                      <p className="text-sm text-gray-600">From: {enquiry.customer}</p>
                    </div>
                    <div className="text-right">
                      <span className={`text-sm font-semibold px-2 py-1 rounded-full ${enquiry.status === 'New' ? 'bg-blue-100 text-blue-800' : enquiry.status === 'Open' ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'}`}>
                        {enquiry.status}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">{enquiry.time}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="text-center mt-4">
                <a href="#" className="text-yellow-600 hover:underline font-medium">View All Enquiries &rarr;</a>
              </div>
            </div>

            {/* Upcoming Appointments Section */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-8">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Upcoming Appointments</h3>
              <ul className="divide-y divide-gray-200">
                {upcomingAppointments.map((appointment) => (
                  <li key={appointment.id} className="py-3 flex justify-between items-center">
                    <div>
                      <p className="text-gray-800 font-medium">{appointment.type} with {appointment.customer}</p>
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">{appointment.date}</span> at {appointment.time}
                      </p>
                    </div>
                    <button className="bg-blue-500 text-white text-sm px-3 py-1 rounded-md hover:bg-blue-600 transition-colors">
                      View Details
                    </button>
                  </li>
                ))}
              </ul>
              <div className="text-center mt-4">
                <a href="#" className="text-yellow-600 hover:underline font-medium">View All Appointments &rarr;</a>
              </div>
            </div>

            {/* Quick Actions for Agent */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a href="#" className="flex items-center justify-center p-4 bg-yellow-100 text-yellow-800 rounded-lg hover:bg-yellow-200 transition duration-200 shadow-sm">
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                  Create New Enquiry
                </a>
                <a href="#" className="flex items-center justify-center p-4 bg-yellow-100 text-yellow-800 rounded-lg hover:bg-yellow-200 transition duration-200 shadow-sm">
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2zm0 0h14"></path></svg>
                  Schedule Appointment
                </a>
                <a href="#" className="flex items-center justify-center p-4 bg-yellow-100 text-yellow-800 rounded-lg hover:bg-yellow-200 transition duration-200 shadow-sm">
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                  View Customer List
                </a>
                <a href="#" className="flex items-center justify-center p-4 bg-yellow-100 text-yellow-800 rounded-lg hover:bg-yellow-200 transition duration-200 shadow-sm">
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  Send Broadcast Message
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AgentDashboard;