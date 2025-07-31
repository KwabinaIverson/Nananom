import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/auth'; // Import the register function

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(''); // For showing success message
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    setSuccess(''); // Clear previous success messages
    setLoading(true);

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    try {
      const userData = {
        name,
        email,
        password,
        confirm_password: confirmPassword, // Ensure this matches your backend's expected field name
        role: 'Customer', // Default role for registration, based on your backend API documentation
      };
      const data = await registerUser(userData);
      console.log('Registration successful:', data);
      setSuccess('Registration successful! Redirecting to login...');
      // Optionally, clear form fields after successful registration
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');

      // Redirect to login page after a short delay
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (err) {
      console.error('Registration error:', err.message);
      setError(err.message || 'An unexpected error occurred during registration.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F2F4F5] p-4 font-sans">
      <div className="w-full max-w-md bg-[#FFFFF0] p-8 rounded-xl shadow-lg border-2 border-[#EAA221] animate-popIn">
        <h1 className="text-4xl font-extrabold text-center text-[#4682B4] mb-8">Join Nananom Farms!</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-5 py-3 rounded-lg relative mb-6 shadow-md" role="alert">
            <strong className="font-bold mr-2">Registration Error:</strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-5 py-3 rounded-lg relative mb-6 shadow-md" role="alert">
            <strong className="font-bold mr-2">Success:</strong>
            <span className="block sm:inline">{success}</span>
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-base font-semibold text-[#2F4F4F] mb-2">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="mt-1 block w-full px-4 py-2 border border-[#4682B4] rounded-lg shadow-sm focus:ring-[#EAA221] focus:border-[#EAA221] text-[#2F4F4F] placeholder-[#4682B4] bg-white transition-all duration-300 ease-in-out hover:border-[#EAA221]"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-base font-semibold text-[#2F4F4F] mb-2">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full px-4 py-2 border border-[#4682B4] rounded-lg shadow-sm focus:ring-[#EAA221] focus:border-[#EAA221] text-[#2F4F4F] placeholder-[#4682B4] bg-white transition-all duration-300 ease-in-out hover:border-[#EAA221]"
              placeholder="you@nananomfarms.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-base font-semibold text-[#2F4F4F] mb-2">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 block w-full px-4 py-2 border border-[#4682B4] rounded-lg shadow-sm focus:ring-[#EAA221] focus:border-[#EAA221] text-[#2F4F4F] placeholder-[#4682B4] bg-white transition-all duration-300 ease-in-out hover:border-[#EAA221]"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-base font-semibold text-[#2F4F4F] mb-2">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="mt-1 block w-full px-4 py-2 border border-[#4682B4] rounded-lg shadow-sm focus:ring-[#EAA221] focus:border-[#EAA221] text-[#2F4F4F] placeholder-[#4682B4] bg-white transition-all duration-300 ease-in-out hover:border-[#EAA221]"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#EAA221] text-white p-3 rounded-lg font-bold text-lg hover:bg-[#8A3324] transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#EAA221] focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Registering...
              </span>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-base text-[#2F4F4F]">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-[#4682B4] hover:text-[#8A3324] hover:underline transition-colors duration-300">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;