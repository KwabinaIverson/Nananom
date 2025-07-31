// src/pages/Public/ContactPage.jsx
import React from 'react';

const ContactPage = () => {
  return (
    <div className="container mx-auto p-8 text-center mt-12 bg-[#F2F4F5] rounded-lg shadow-xl animate-fadeIn">
      <h1 className="text-5xl font-extrabold text-[#4682B4] mb-6 animate-popIn">Contact Nananom Farms</h1>
      <p className="text-xl text-[#2F4F4F] leading-relaxed mb-8 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
        Have questions, need assistance, or want to explore partnership opportunities? Reach out to us!
      </p>
      <div className="mt-8 max-w-xl mx-auto bg-[#FFFFF0] p-8 rounded-lg shadow-lg border border-[#EAA221] animate-slideInUp" style={{ animationDelay: '0.4s' }}>
        <form className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-left text-[#2F4F4F] font-semibold mb-2">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-4 py-2 border border-[#EAA221] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4682B4] focus:border-transparent transition duration-200 ease-in-out"
              placeholder="Your Name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-left text-[#2F4F4F] font-semibold mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 border border-[#EAA221] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4682B4] focus:border-transparent transition duration-200 ease-in-out"
              placeholder="your.email@example.com"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-left text-[#2F4F4F] font-semibold mb-2">Message</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              className="w-full px-4 py-2 border border-[#EAA221] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4682B4] focus:border-transparent transition duration-200 ease-in-out"
              placeholder="Your message..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-[#EAA221] hover:bg-[#4682B4] text-[#2F4F4F] hover:text-[#FFFFF0] font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#EAA221] active:scale-95"
          >
            Send Message
          </button>
        </form>
      </div>
      <div className="mt-8 text-center text-[#2F4F4F] text-lg animate-fadeIn" style={{ animationDelay: '0.6s' }}>
        <p className="mb-2">We typically respond within 24-48 business hours.</p>
        <p>You can also reach us directly at:</p>
        <p className="font-semibold text-[#4682B4]">
          Email: <a href="mailto:info@nananomfarms.com" className="hover:underline">info@nananomfarms.com</a>
        </p>
        <p className="font-semibold text-[#4682B4]">
          Phone: <a href="tel:+233201234567" className="hover:underline">+233 20 123 4567</a> (Available Mon-Fri, 9 AM - 5 PM GMT)
        </p>
        <p className="font-semibold text-[#4682B4]">
          Address: 123 Palm Grove Lane, Accra, Ghana
        </p>
      </div>
    </div>
  );
};

export default ContactPage;