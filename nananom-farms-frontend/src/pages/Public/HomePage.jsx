// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center bg-no-repeat py-20 md:py-32 lg:py-48 text-white flex items-center justify-center"
        style={{ backgroundImage: "url('https://via.placeholder.com/1920x1080?text=Nananom+Farms+Palm+Oil+Field')" }}
        // Replace with a real image URL of a palm oil field or farm
      >
        <div className="absolute inset-0 bg-black opacity-60"></div> {/* Overlay for readability */}
        <div className="relative container mx-auto p-4 text-center z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
            Nananom Farms: Empowering Sustainable Agriculture
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Your trusted partner for premium palm oil products and innovative agricultural solutions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link
              to="/services"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 text-lg"
            >
              Explore Our Services
            </Link>
            <Link
              to="/enquiries" // Changed from /contact to /enquiries based on Navbar
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 text-lg"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-green-800 mb-6">Our Mission & Values</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            At Nananom Farms, we are deeply committed to pioneering sustainable agricultural practices that not only yield
            high-quality palm oil but also foster a thriving farming community. Our mission extends beyond production;
            we strive to empower local farmers with knowledge and resources, ensuring food security and economic growth
            in the region. We believe in cultivating a future where agriculture flourishes in harmony with nature.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-12 mt-12">
            <div className="flex flex-col items-center text-center max-w-xs">
              <div className="bg-green-100 p-4 rounded-full mb-4">
                <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2-1.343-2-3-2zM9 12a3 3 0 00-3 3v1a2 2 0 002 2h8a2 2 0 002-2v-1a3 3 0 00-3-3m-6 0h6m-6 0h6m-6 0h6"></path></svg>
              </div>
              <h3 className="text-xl font-semibold text-green-700 mb-2">Sustainability</h3>
              <p className="text-gray-600">Committed to eco-friendly farming and responsible resource management.</p>
            </div>
            <div className="flex flex-col items-center text-center max-w-xs">
              <div className="bg-green-100 p-4 rounded-full mb-4">
                <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </div>
              <h3 className="text-xl font-semibold text-green-700 mb-2">Quality</h3>
              <p className="text-gray-600">Delivering only the finest palm oil products to our customers.</p>
            </div>
            <div className="flex flex-col items-center text-center max-w-xs">
              <div className="bg-green-100 p-4 rounded-full mb-4">
                <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H2v-2a3 3 0 015.356-1.857M17 20v-2c0-.653-.16-1.284-.46-1.84M5.356 18.143A3 3 0 015 20v-2m0 0H2m3.356 0h.473m-.473 0c-.57.34-.964.776-.964 1.357M2 12h18M2 12a4 4 0 014-4h8a4 4 0 014 4M4 16h16"></path></svg>
              </div>
              <h3 className="text-xl font-semibold text-green-700 mb-2">Community</h3>
              <p className="text-gray-600">Empowering local farmers and contributing to regional food security.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Services Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-green-800 text-center mb-12">
            Our Core Offerings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service Card 1: Premium Palm Oil Products */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-green-200 hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center">
              <div className="bg-green-100 p-3 rounded-full inline-block mb-4">
                <svg className="w-10 h-10 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2-2m-2 2l-2 2M12 8l-2 2m2-2l2 2M12 18h.01M12 12h.01M12 6h.01M6 12h.01M18 12h.01"></path></svg>
              </div>
              <h3 className="text-xl font-semibold text-green-800 mb-3">Premium Palm Oil Products</h3>
              <p className="text-gray-600">
                We produce and supply high-quality palm oil, extracted and processed using
                sustainable methods to ensure purity, richness, and compliance with global standards.
              </p>
            </div>

            {/* Service Card 2: Agricultural Consulting */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-green-200 hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center">
              <div className="bg-green-100 p-3 rounded-full inline-block mb-4">
                <svg className="w-10 h-10 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-1.25-3M15 10V5.729a2 2 0 00-2.14-1.956L12 3m-2 2.729V10m-2 2h8m-8 0v8a2 2 0 002 2h4a2 2 0 002-2v-8m-8 0h8"></path></svg>
              </div>
              <h3 className="text-xl font-semibold text-green-800 mb-3">Agricultural Consulting</h3>
              <p className="text-gray-600">
                Our team of experienced agronomists provides tailored advice on crop rotation,
                pest management, soil fertility, and best farming practices to maximize your yield.
              </p>
            </div>

            {/* Service Card 3: Farm Equipment Rentals */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-green-200 hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center">
              <div className="bg-green-100 p-3 rounded-full inline-block mb-4">
                <svg className="w-10 h-10 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V6m3 6v.01M18 18a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V6"></path></svg>
              </div>
              <h3 className="text-xl font-semibold text-green-800 mb-3">Farm Equipment Rentals</h3>
              <p className="text-gray-600">
                Access to a wide range of modern and well-maintained farm machinery,
                available for rent to help you execute farming tasks efficiently and cost-effectively.
              </p>
            </div>

            {/* Service Card 4: Training Workshops */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-green-200 hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center">
              <div className="bg-green-100 p-3 rounded-full inline-block mb-4">
                <svg className="w-10 h-10 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253M12 6.253c1.168.776 2.754 1.253 4.5 1.253S19.832 7.029 21 6.253m-18 13c1.168.776 2.754 1.253 4.5 1.253s3.332-.477 4.5-1.253m-18 0V9.5m0 0v1.11m0-1.11c0 2.667 3 3.75 3 3.75S7 9.5 7 9.5m7 3.5c0 2.667 3 3.75 3 3.75S17 9.5 17 9.5M3 12a2 2 0 110-4 2 2 0 010 4zm18 0a2 2 0 110-4 2 2 0 010 4zM4.5 19.253V18l.001-.001C5.333 19.012 6.5 20 7.5 20s2.167-.988 3-1.747L12 18v1.253c1.168.776 2.754 1.253 4.5 1.253s3.332-.477 4.5-1.253V18l.001-.001c.833.988 2 1.747 3 1.747s2.167-.988 3-1.747L21 18v1.253"></path></svg>
              </div>
              <h3 className="text-xl font-semibold text-green-800 mb-3">Training Workshops</h3>
              <p className="text-gray-600">
                We conduct regular workshops and seminars to educate farmers on modern agricultural
                techniques, pest control, irrigation, and post-harvest management.
              </p>
            </div>

            {/* Service Card 5: Logistics & Distribution */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-green-200 hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center">
              <div className="bg-green-100 p-3 rounded-full inline-block mb-4">
                <svg className="w-10 h-10 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10v11m0 0h8m-8 0L9 17m-3 4V3m0 0h8m-8 0L9 7m-3 4v10m6-10V3m0 0h8m-8 0L15 7m-3 4v10m6-10V3m0 0h8m-8 0L21 7"></path></svg>
              </div>
              <h3 className="text-xl font-semibold text-green-800 mb-3">Logistics & Distribution</h3>
              <p className="text-gray-600">
                Ensuring timely and efficient delivery of our palm oil products from the farm to your
                market or facility, maintaining quality throughout the supply chain.
              </p>
            </div>

            {/* Service Card 6: Agricultural Research Support */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-green-200 hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center">
              <div className="bg-green-100 p-3 rounded-full inline-block mb-4">
                <svg className="w-10 h-10 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a2 2 0 100 4m-3.939 1.579a2 2 0 113.15 1.414L10 14l-1 1-3 3-1 1-3 3"></path></svg>
              </div>
              <h3 className="text-xl font-semibold text-green-800 mb-3">Agricultural Research Support</h3>
              <p className="text-gray-600">
                We actively support and collaborate on agricultural research initiatives aimed at
                developing new crop varieties, improving farming techniques, and enhancing sustainability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial/Call to Action Section (Placeholder) */}
      <section className="py-16 md:py-24 bg-green-800 text-white">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Join the Nananom Farms Family</h2>
          <p className="text-lg leading-relaxed mb-8">
            Become a part of our growing community committed to quality, sustainability, and agricultural excellence.
          </p>
          {/* Add a placeholder for a compelling testimonial here if desired */}
          <Link
            to="/register"
            className="inline-block bg-white text-green-800 hover:bg-gray-100 font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 text-lg"
          >
            Register Today
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;