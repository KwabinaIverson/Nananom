// src/pages/Public/EnquiryPage.jsx
import React from 'react';

const EnquiryPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center bg-no-repeat py-20 md:py-32 lg:py-48 text-white flex items-center justify-center"
        style={{ backgroundImage: "url('https://via.placeholder.com/1920x1080?text=Modern+Farm+Landscape')" }}
        // Replace with a real, high-quality image of a modern farm landscape
      >
        <div className="absolute inset-0 bg-black opacity-60"></div> {/* Overlay for readability */}
        <div className="relative container mx-auto p-4 text-center z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
            Connect With Nananom Farms
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            We're here to answer your questions, discuss partnerships, or provide more information about our products and services.
          </p>
        </div>
      </section>

      {/* Main Content Section: Contact Info & Enquiry Form */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <div className="bg-green-50 p-8 rounded-lg shadow-md border border-green-200 h-full flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-green-800 mb-6">Reach Out to Us</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              We value your interest and look forward to hearing from you. Our team is dedicated to
              providing prompt and helpful responses.
            </p>

            <div className="space-y-6">
              <div className="flex items-center text-gray-700">
                <svg className="w-8 h-8 text-green-600 mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                <div>
                  <h4 className="font-semibold text-xl text-green-700">Our Location</h4>
                  <p>Accra, Greater Accra Region, Ghana</p>
                  <p>123 Palm Grove Avenue, Agribusiness Park</p>
                </div>
              </div>

              <div className="flex items-center text-gray-700">
                <svg className="w-8 h-8 text-green-600 mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                <div>
                  <h4 className="font-semibold text-xl text-green-700">Phone</h4>
                  <p>+233 24 123 4567</p>
                  <p>Mon - Fri: 8:00 AM - 5:00 PM (GMT)</p>
                </div>
              </div>

              <div className="flex items-center text-gray-700">
                <svg className="w-8 h-8 text-green-600 mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-1 13a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2h12a2 2 0 012 2v14z"></path></svg>
                <div>
                  <h4 className="font-semibold text-xl text-green-700">Email</h4>
                  <p>info@nananomfarms.com</p>
                  <p>support@nananomfarms.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Enquiry Form */}
          <div className="bg-white p-8 rounded-lg shadow-xl border border-green-200">
            <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">Send Us a Message</h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-left text-sm font-medium text-gray-800 mb-1">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500 transition duration-150 ease-in-out"
                  placeholder="John Doe"
                  aria-label="Your Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-left text-sm font-medium text-gray-800 mb-1">Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500 transition duration-150 ease-in-out"
                  placeholder="john.doe@example.com"
                  aria-label="Your Email"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-left text-sm font-medium text-gray-800 mb-1">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500 transition duration-150 ease-in-out"
                  placeholder="Inquiry about Palm Oil Products"
                  aria-label="Enquiry Subject"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-left text-sm font-medium text-gray-800 mb-1">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500 transition duration-150 ease-in-out resize-y"
                  placeholder="Type your detailed message here..."
                  aria-label="Your Message"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Submit Enquiry
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Optional: Map Section (Placeholder) */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-green-800 mb-6">Find Us on the Map</h2>
          <p className="text-lg text-gray-700 mb-8">Visit our location or view our farms.</p>
          <div className="bg-gray-200 rounded-lg overflow-hidden shadow-md" style={{ height: '400px' }}>
            {/* Placeholder for an embedded map (e.g., Google Maps iframe) */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.621245789178!2d-0.198363784534571!3d5.594732195945195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9a75220c3547%3A0x6b772c83c2e1766a!2sAccra%2C%20Ghana!5e0!3m2!1sen!2sus!4v1678901234567!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Nananom Farms Location Map"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EnquiryPage;