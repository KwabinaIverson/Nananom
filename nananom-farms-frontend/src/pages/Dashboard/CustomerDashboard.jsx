// src/pages/Dashboard/CustomerDashboard.jsx
import React from 'react';
import { getUserRole, getToken } from '../../services/auth'; // Corrected import names

const CustomerDashboard = () => {
  const userId = getToken(); // Use getToken to retrieve the token (often used as user ID representation in UI)
  const roleName = getUserRole(); // Use getUserRole to retrieve the role name

  // Placeholder for customer's name (in a real app, this would come from user data)
  const customerName = "John Doe";

  // Mock data for customer-specific metrics
  const customerMetrics = {
    activeServices: 2,
    upcomingAppointments: 1,
    totalOrders: 5,
  };

  // Mock data for upcoming appointments
  const upcomingAppointments = [
    { id: 301, service: "Agricultural Consultancy", date: "Aug 05, 2025", time: "11:00 AM", status: "Confirmed" },
  ];

  // Mock data for recent services/orders
  const recentServices = [
    { id: 401, name: "Palm Oil Supply", date: "Jul 20, 2025", status: "Completed", amount: "500 L" },
    { id: 400, name: "Farm Equipment Rental", date: "Jul 15, 2025", status: "Completed", amount: "Tractor (2 days)" },
    { id: 399, name: "Fertilizer Purchase", date: "Jun 28, 2025", status: "Completed", amount: "100 kg" },
  ];

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-green-700 text-white shadow-lg flex flex-col">
        <div className="p-6 border-b border-green-800">
          <h2 className="text-2xl font-bold">Nananom Client</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <a href="#" className="flex items-center p-3 rounded-lg hover:bg-green-800 transition duration-200 bg-green-800">
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m0 0l-7 7m7-7v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
            Dashboard
          </a>
          <a href="#" className="flex items-center p-3 rounded-lg hover:bg-green-800 transition duration-200">
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-1.25-3M15 10V5.729a2 2 0 00-2.14-1.956L12 3m-2 2.729V10m-2 2h8m-8 0v8a2 2 0 002 2h4a2 2 0 002-2v-8m-8 0h8"></path></svg>
            My Services
          </a>
          <a href="#" className="flex items-center p-3 rounded-lg hover:bg-green-800 transition duration-200">
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2zm0 0h14"></path></svg>
            Appointments
          </a>
          <a href="#" className="flex items-center p-3 rounded-lg hover:bg-green-800 transition duration-200">
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-1 13a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2h12a2 2 0 012 2v14z"></path></svg>
            My Enquiries
          </a>
          <a href="#" className="flex items-center p-3 rounded-lg hover:bg-green-800 transition duration-200">
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
            Profile
          </a>
        </nav>
        <div className="p-4 border-t border-green-800 mt-auto">
          <a href="#" className="flex items-center p-3 rounded-lg hover:bg-green-800 transition duration-200">
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            Logout
          </a>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar / Header */}
        <header className="flex justify-between items-center p-6 bg-white border-b border-gray-200 shadow-sm">
          <h1 className="text-3xl font-semibold text-green-800">Customer Dashboard</h1>
          <div className="flex items-center">
            <span className="text-gray-700 mr-4">Welcome, <strong className="font-bold">{customerName}</strong>!</span>
            <div className="relative">
              {/* User Avatar/Menu (Placeholder) */}
              <button className="flex items-center text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out">
                <img className="h-9 w-9 rounded-full object-cover" src="https://via.placeholder.com/150/66BB6A/FFFFFF?text=CD" alt="Customer Avatar" />
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <div className="container mx-auto">
            <p className="text-lg text-gray-700 mb-6">
              You are logged in as <strong className="font-bold text-green-700">{roleName}</strong>. (User ID: {userId || 'N/A'})
            </p>

            {/* Customer-Specific Metric Cards */}
            <h2 className="text-2xl font-semibold text-green-800 mb-4">Your Account Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {/* Card 1: Active Services */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-green-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-700">Active Services</h3>
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-1.25-3M15 10V5.729a2 2 0 00-2.14-1.956L12 3m-2 2.729V10m-2 2h8m-8 0v8a2 2 0 002 2h4a2 2 0 002-2v-8m-8 0h8"></path></svg>
                </div>
                <p className="text-4xl font-bold text-green-800">{customerMetrics.activeServices}</p>
                <p className="text-sm text-gray-500 mt-2">Currently active bookings</p>
              </div>

              {/* Card 2: Upcoming Appointments */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-blue-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-700">Upcoming Appointments</h3>
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2zm0 0h14"></path></svg>
                </div>
                <p className="text-4xl font-bold text-blue-800">{customerMetrics.upcomingAppointments}</p>
                <p className="text-sm text-gray-500 mt-2">Scheduled meetings/visits</p>
              </div>

              {/* Card 3: Total Orders */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-orange-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-700">Total Orders</h3>
                  <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0h10a2 2 0 002-2V7a2 2 0 00-2-2H9m10 0a2 2 0 012 2v2m-6-2H9"></path></svg>
                </div>
                <p className="text-4xl font-bold text-orange-800">{customerMetrics.totalOrders}</p>
                <p className="text-sm text-gray-500 mt-2">All past service/product orders</p>
              </div>
            </div>

            {/* Upcoming Appointments Section */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-8">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Your Upcoming Appointments</h3>
              {upcomingAppointments.length > 0 ? (
                <ul className="divide-y divide-gray-200">
                  {upcomingAppointments.map((appointment) => (
                    <li key={appointment.id} className="py-3 flex justify-between items-center">
                      <div>
                        <p className="text-gray-800 font-medium">{appointment.service}</p>
                        <p className="text-sm text-gray-600">
                          <span className="font-semibold">{appointment.date}</span> at {appointment.time}
                        </p>
                      </div>
                      <span className={`text-sm font-semibold px-2 py-1 rounded-full ${appointment.status === 'Confirmed' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                        {appointment.status}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No upcoming appointments.</p>
              )}
              <div className="text-center mt-4">
                <a href="#" className="text-green-600 hover:underline font-medium">View All Appointments &rarr;</a>
              </div>
            </div>

            {/* Recent Services/Orders Section */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-8">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Your Recent Services & Orders</h3>
              <ul className="divide-y divide-gray-200">
                {recentServices.map((service) => (
                  <li key={service.id} className="py-3 flex justify-between items-center">
                    <div>
                      <p className="text-gray-800 font-medium">{service.name}</p>
                      <p className="text-sm text-gray-600">Date: {service.date} - Amount: {service.amount}</p>
                    </div>
                    <span className={`text-sm font-semibold px-2 py-1 rounded-full ${service.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {service.status}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="text-center mt-4">
                <a href="#" className="text-green-600 hover:underline font-medium">View All Services & Orders &rarr;</a>
              </div>
            </div>

            {/* Quick Actions for Customer */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a href="#" className="flex items-center justify-center p-4 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition duration-200 shadow-sm">
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                  Book New Service
                </a>
                <a href="#" className="flex items-center justify-center p-4 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition duration-200 shadow-sm">
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-1 13a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2h12a2 2 0 012 2v14z"></path></svg>
                  Make an Enquiry
                </a>
                <a href="#" className="flex items-center justify-center p-4 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition duration-200 shadow-sm">
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  Update Profile
                </a>
                <a href="#" className="flex items-center justify-center p-4 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition duration-200 shadow-sm">
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.592.956a4.5 4.5 0 01-2.592-2.956z"></path></svg>
                  View Payment History
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CustomerDashboard;