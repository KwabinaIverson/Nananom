// src/pages/Auth/LoginPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // To redirect after login
import { loginUser } from '../../services/auth'; // Import the login function

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // For showing loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    setLoading(true);

    try {
      const data = await loginUser({ email, password });
      console.log('Login successful:', data);

      // Assuming your backend returns a token and user role upon successful login
      if (data.token) {
        localStorage.setItem('jwt_token', data.token);
      }
      if (data.user && data.user.role) { // Adjust 'user' and 'role' based on your actual backend response structure
        localStorage.setItem('user_role', data.user.role);
      } else {
        // Fallback or default role if not provided (e.g., 'customer')
        localStorage.setItem('user_role', 'customer');
      }

      // Redirect based on role or to a default dashboard/home
      // This is a basic redirection. We'll implement more robust role-based routing later.
      if (data.user && data.user.role === 'Admin') {
        navigate('/admin/dashboard');
      } else if (data.user && data.user.role === 'Support Agent') {
        navigate('/agent/dashboard'); // Create this path later
      } else {
        navigate('/customer/dashboard'); // Create this path later
      }

    } catch (err) {
      console.error('Login error:', err.message);
      setError(err.message || 'An unexpected error occurred during login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 flex items-center justify-center min-h-[calc(100vh-120px)]">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md border border-green-200">
        <h1 className="text-3xl font-bold text-center text-green-700 mb-6">Login</h1>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white p-3 rounded-md hover:bg-green-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? 'Logging In...' : 'Login'}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account? <Link to="/register" className="font-medium text-green-600 hover:text-green-500">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;