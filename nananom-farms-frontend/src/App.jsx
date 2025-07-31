// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Import Public Pages
import HomePage from './pages/Public/HomePage';
import AboutPage from './pages/Public/AboutPage';
import ServicesPage from './pages/Public/ServicesPage';
import ServiceDetailPage from './pages/Public/ServiceDetailPage';
import ContactPage from './pages/Public/ContactPage';
import EnquiryPage from './pages/Public/EnquiryPage';
import NotFound from './pages/Public/NotFound';

// Import Auth Pages
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';

// Import Dashboard Pages
import AdminDashboard from './pages/Dashboard/AdminDashboard';
import CustomerDashboard from './pages/Dashboard/CustomerDashboard';
import AgentDashboard from './pages/Dashboard/AgentDashboard';

// Import Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import PrivateRoute from './components/PrivateRoute';

// Create a functional component to handle conditional Navbar and Footer rendering
const AppContent = () => {
  const location = useLocation();

  // Define paths where the Navbar and Footer should NOT be shown
  const noHeaderFooterPaths = [
    '/login',
    '/register',
    '/admin/dashboard',
    '/customer/dashboard',
    '/agent/dashboard',
  ];

  // Check if the current path is in the noHeaderFooterPaths array
  const showHeaderFooter = !noHeaderFooterPaths.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      {showHeaderFooter && <Navbar />} {/* Conditionally render Navbar */}
      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:id" element={<ServiceDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/enquiries" element={<EnquiryPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Routes */}
          <Route element={<PrivateRoute roles={['Administrator']} />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Route>
          <Route element={<PrivateRoute roles={['Customer']} />}>
            <Route path="/customer/dashboard" element={<CustomerDashboard />} />
          </Route>
          <Route element={<PrivateRoute roles={['Support Agent']} />}>
            <Route path="/agent/dashboard" element={<AgentDashboard />} />
          </Route>

          {/* Catch-all for 404 Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {showHeaderFooter && <Footer />} {/* Conditionally render Footer */}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;