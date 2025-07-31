// src/pages/Public/ContactPage.jsx
import React from 'react';

const ContactPage = () => {
  return (
    <div className="container mx-auto p-8 text-center mt-12">
      <h1 className="text-5xl font-bold text-green-700 mb-6">Contact Us</h1>
      <p className="text-xl text-gray-700 leading-relaxed">
        Have questions or need assistance? Reach out to Nananom Farms.
      </p>
      <div className="mt-8 max-w-xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <form className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-left text-gray-800 font-semibold mb-2">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Your Name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-left text-gray-800 font-semibold mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="your.email@example.com"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-left text-gray-800 font-semibold mb-2">Message</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Your message..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;