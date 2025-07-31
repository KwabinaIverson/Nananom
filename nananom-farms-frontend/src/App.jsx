// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import Public Pages (assuming they are in src/pages/Public and named *Page.jsx)
import HomePage from './pages/Public/HomePage';
import AboutPage from './pages/Public/AboutPage';
import ServicesPage from './pages/Public/ServicesPage';
import ContactPage from './pages/Public/ContactPage';
import NotFound from './pages/Public/NotFound'; // Assuming your 404 page is also in Public

// Import Auth Pages (assuming they are in src/pages/Auth)
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';

// Import Dashboard Pages (assuming they are in src/pages/Dashboard)
import AdminDashboard from './pages/Dashboard/AdminDashboard';
import CustomerDashboard from './pages/Dashboard/CustomerDashboard';
import AgentDashboard from './pages/Dashboard/AgentDashboard';

// Import Components
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer';
import PrivateRoute from './components/PrivateRoute';
import EnquiryPage from './pages/Public/EnquiryPage';

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/enquiries" element={<EnquiryPage/>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected Routes */}
            {/* Admin Dashboard - only for Administrator role */}
            <Route element={<PrivateRoute roles={['Administrator']} />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Route>

            {/* Customer Dashboard - only for Customer role */}
            <Route element={<PrivateRoute roles={['Customer']} />}>
              <Route path="/customer/dashboard" element={<CustomerDashboard />} />
            </Route>

            {/* Support Agent Dashboard - only for Support Agent role */}
            <Route element={<PrivateRoute roles={['Support Agent']} />}>
              <Route path="/agent/dashboard" element={<AgentDashboard />} />
            </Route>

            {/* Catch-all for 404 Not Found */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;