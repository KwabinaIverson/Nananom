// src/pages/Dashboard/AdminDashboard.jsx
import React, { useState } from 'react';
import { getUserRole, getToken } from '../../services/auth';

const AdminDashboard = () => {
  const userId = getToken();
  const roleName = getUserRole();
  const adminName = "Admin User"; // Placeholder for admin's name

  // State to manage sidebar visibility on mobile
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Mock data for analytics
  const analyticsData = {
    websiteVisits: "15,000",
    newUsers: "350",
    conversionRate: "4.5%",
    enquiriesByMonth: [
      { month: "Jan", count: 120 },
      { month: "Feb", count: 150 },
      { month: "Mar", count: 130 },
      { month: "Apr", count: 180 },
      { month: "May", count: 200 },
      { month: "Jun", count: 220 },
      { month: "Jul", count: 250 },
    ],
    topServices: [
      { name: "Palm Oil Supply", views: 1500 },
      { name: "Farm Equipment Rental", views: 980 },
      { name: "Agricultural Consultancy", views: 720 },
      { name: "Fertilizer Sales", views: 550 },
    ],
  };

  const maxEnquiryCount = Math.max(...analyticsData.enquiriesByMonth.map(item => item.count));

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-green-800 text-white shadow-lg flex flex-col z-40
          transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static transition-transform duration-300 ease-in-out`}
      >
        <div className="p-6 border-b border-green-700">
          <h2 className="text-2xl font-bold">Nananom Admin</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <a href="#" className="flex items-center p-3 rounded-lg hover:bg-green-700 transition duration-200 bg-green-700">
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m0 0l-7 7m7-7v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
            Dashboard
          </a>
          <a href="#" className="flex items-center p-3 rounded-lg hover:bg-green-700 transition duration-200">
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6a2 2 0 002-2V7a2 2 0 00-2-2h-6a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            Users
          </a>
          <a href="#" className="flex items-center p-3 rounded-lg hover:bg-green-700 transition duration-200">
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-1.25-3M15 10V5.729a2 2 0 00-2.14-1.956L12 3m-2 2.729V10m-2 2h8m-8 0v8a2 2 0 002 2h4a2 2 0 002-2v-8m-8 0h8"></path></svg>
            Services
          </a>
          <a href="#" className="flex items-center p-3 rounded-lg hover:bg-green-700 transition duration-200">
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-1 13a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2h12a2 2 0 012 2v14z"></path></svg>
            Enquiries
          </a>
          <a href="#" className="flex items-center p-3 rounded-lg hover:bg-green-700 transition duration-200">
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            Settings
          </a>
        </nav>
        <div className="p-4 border-t border-green-700 mt-auto">
          <a href="#" className="flex items-center p-3 rounded-lg hover:bg-green-700 transition duration-200">
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            Logout
          </a>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0"> {/* Adjusted for larger screens */}
        {/* Top Bar / Header */}
        <header className="flex justify-between items-center p-4 bg-white border-b border-gray-200 shadow-sm lg:p-6">
          {/* Hamburger menu for mobile */}
          <button
            className="lg:hidden text-gray-600 focus:outline-none focus:text-gray-900"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>

          <h1 className="text-xl font-semibold text-green-800 ml-4 lg:text-3xl lg:ml-0">Dashboard Overview</h1>
          <div className="flex items-center">
            <span className="text-gray-700 mr-2 text-sm lg:mr-4 lg:text-base">Welcome, <strong className="font-bold">{adminName}</strong>!</span>
            <div className="relative">
              <button className="flex items-center text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out">
                <img className="h-8 w-8 rounded-full object-cover lg:h-9 lg:w-9" src="https://via.placeholder.com/150/90EE90/FFFFFF?text=AD" alt="Admin Avatar" />
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 lg:p-6">
          <div className="container mx-auto">
            <p className="text-base text-gray-700 mb-6 lg:text-lg">
              You are logged in as <strong className="font-bold text-green-700">{roleName}</strong>. (User ID: {userId || 'N/A'})
            </p>

            {/* Overview Cards */}
            <h2 className="text-xl font-semibold text-green-800 mb-4 lg:text-2xl">Quick Stats</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {/* Card 1: Total Enquiries */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-green-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-700">Total Enquiries</h3>
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-1 13a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2h12a2 2 0 012 2v14z"></path></svg>
                </div>
                <p className="text-4xl font-bold text-green-800">1,245</p>
                <p className="text-sm text-gray-500 mt-2">Total since inception</p>
              </div>

              {/* Card 2: Active Users */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-green-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-700">Active Users</h3>
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6a2 2 0 002-2V7a2 2 0 00-2-2h-6a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                </div>
                <p className="text-4xl font-bold text-green-800">89</p>
                <p className="text-sm text-gray-500 mt-2">Currently logged in</p>
              </div>

              {/* Card 3: Services Offered */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-green-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-700">Services Offered</h3>
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-1.25-3M15 10V5.729a2 2 0 00-2.14-1.956L12 3m-2 2.729V10m-2 2h8m-8 0v8a2 2 0 002 2h4a2 2 0 002-2v-8m-8 0h8"></path></svg>
                </div>
                <p className="text-4xl font-bold text-green-800">6</p>
                <p className="text-sm text-gray-500 mt-2">Active service categories</p>
              </div>
            </div>

            {/* Analytics & Trends Section */}
            <h2 className="text-xl font-semibold text-green-800 mb-4 mt-8 lg:text-2xl">Analytics & Performance</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {/* Card: Website Visits */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-700">Website Visits</h3>
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                </div>
                <p className="text-4xl font-bold text-blue-800">{analyticsData.websiteVisits}</p>
                <p className="text-sm text-gray-500 mt-2">Total visits last 30 days</p>
              </div>

              {/* Card: New Users */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-700">New Users</h3>
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-6-3h2m-2 0h-2m2 0V9m0 3v3m-2.583-4.332a3.75 3.75 0 11-5.304 0 3.75 3.75 0 015.304 0zM17.5 16.5a3.75 3.75 0 100-5.304 3.75 3.75 0 000 5.304z"></path></svg>
                </div>
                <p className="text-4xl font-bold text-purple-800">{analyticsData.newUsers}</p>
                <p className="text-sm text-gray-500 mt-2">New registrations last 30 days</p>
              </div>

              {/* Card: Conversion Rate */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-700">Conversion Rate</h3>
                  <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.592.956a4.5 4.5 0 01-2.592-2.956z"></path></svg>
                </div>
                <p className="text-4xl font-bold text-yellow-800">{analyticsData.conversionRate}</p>
                <p className="text-sm text-gray-500 mt-2">Enquiry submissions / Visits</p>
              </div>
            </div>

            {/* Enquiries Over Time Chart */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-8">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Enquiries Over Time (Last 7 Months)</h3>
              <div className="flex items-end h-48 border-b border-l border-gray-300 pt-4">
                {analyticsData.enquiriesByMonth.map((data, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center justify-end h-full px-2">
                    <div
                      className="w-10 bg-green-500 rounded-t-md transition-all duration-300 ease-in-out hover:bg-green-600 group relative"
                      style={{ height: `${(data.count / maxEnquiryCount) * 90}%` }} // Scale to 90% of container height
                    >
                      <span className="absolute -top-6 text-xs text-gray-700 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        {data.count}
                      </span>
                    </div>
                    <span className="mt-2 text-xs text-gray-600">{data.month}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Performing Services */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-8">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Top Performing Services (Views)</h3>
              <ul className="divide-y divide-gray-200">
                {analyticsData.topServices.map((service, index) => (
                  <li key={index} className="py-3 flex justify-between items-center">
                    <p className="text-gray-600 font-medium">{service.name}</p>
                    <span className="text-green-700 font-bold">{service.views} views</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recent Activity / Notifications */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-8">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Recent Activity</h3>
              <ul className="divide-y divide-gray-200">
                <li className="py-3 flex justify-between items-center">
                  <p className="text-gray-600">New enquiry received from Jane Doe.</p>
                  <span className="text-sm text-gray-500">2 hours ago</span>
                </li>
                <li className="py-3 flex justify-between items-center">
                  <p className="text-gray-600">User John Smith updated profile.</p>
                  <span className="text-sm text-gray-500">Yesterday</span>
                </li>
                <li className="py-3 flex justify-between items-center">
                  <p className="text-gray-600">Service "Farm Equipment Rentals" updated.</p>
                  <span className="text-sm text-gray-500">3 days ago</span>
                </li>
              </ul>
            </div>

            {/* Quick Actions / Management Links */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a href="#" className="flex items-center justify-center p-4 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition duration-200 shadow-sm">
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-6-3h2m-2 0h-2m2 0V9m0 3v3m-2.583-4.332a3.75 3.75 0 11-5.304 0 3.75 3.75 0 015.304 0zM17.5 16.5a3.75 3.75 0 100-5.304 3.75 3.75 0 000 5.304z"></path></svg>
                  Add New User
                </a>
                <a href="#" className="flex items-center justify-center p-4 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition duration-200 shadow-sm">
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v2m-2 0h4m-4 0H5m4 0H7m4 0h2m-2 0v-2m-2 2h4m-4 0H7m4 0H9m-2 2h4m-4 0H5m4 0H7m4 0h2m-2 0v-2m-2 2h4m-4 0H7m4 0H9m-2 2h4m-4 0H5m4 0H7m4 0h2m-2 0v-2"></path></svg>
                  Process New Enquiry
                </a>
                <a href="#" className="flex items-center justify-center p-4 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition duration-200 shadow-sm">
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                  Edit Services
                </a>
                <a href="#" className="flex items-center justify-center p-4 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition duration-200 shadow-sm">
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0h10a2 2 0 002-2V7a2 2 0 00-2-2H9m10 0a2 2 0 012 2v2m-6-2H9"></path></svg>
                  View Reports
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;