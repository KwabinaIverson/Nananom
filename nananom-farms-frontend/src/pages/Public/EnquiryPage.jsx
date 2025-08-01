// src/pages/Public/EnquiryPage.jsx
import React from 'react';
import Contact from '../../assets/images/contact.png'

const EnquiryPage = () => {
  return (
    <div className="min-h-screen bg-[#DAD7CD] font-sans"> {/* Soft Clay background */}
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center bg-no-repeat py-20 md:py-32 lg:py-48 text-[#FFFFFF] flex items-center justify-center animate-fadeIn" // Pure White text
        style={{ backgroundImage: `url(${Contact})` }} // Primary Green placeholder background, Pure White text
        // Ideally, replace with a high-quality image of a modern farm landscape relevant to Nananom Farms
      >
        <div className="absolute inset-0 bg-black opacity-60"></div> {/* Overlay for readability */}
        <div className="relative container mx-auto p-4 text-center z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 leading-tight animate-popIn">
            Connect With Nananom Farms
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-8 max-w-3xl mx-auto animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            We're here to answer your questions, discuss partnerships, or provide more information about our products and services.
          </p>
        </div>
      </section>

      {/* Main Content Section: Contact Info & Enquiry Form */}
      <section className="py-16 md:py-24 bg-[#DAD7CD]"> {/* Soft Clay background */}
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <div className="bg-[#FFFFFF] p-8 rounded-lg shadow-lg border border-[#FFB703] h-full flex flex-col justify-center animate-slideInLeft" style={{ animationDelay: '0.4s' }}> {/* Pure White background, Golden Wheat border */}
            <h2 className="text-3xl font-bold text-[#086920] mb-6">Reach Out to Us</h2> {/* Primary Green heading */}
            <p className="text-lg text-[#2F2F2F] leading-relaxed mb-8"> {/* Dark Charcoal text */}
              We value your interest and look forward to hearing from you. Our team is dedicated to
              providing prompt and helpful responses.
            </p>

            <div className="space-y-6">
              <div className="flex items-center text-[#2F2F2F]"> {/* Dark Charcoal text */}
                <svg className="w-8 h-8 text-[#086920] mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg> {/* Primary Green icon */}
                <div>
                  <h4 className="font-semibold text-xl text-[#086920">Our Location</h4> {/* Primary Green heading */}
                  <p>Accra, Greater Accra Region, Ghana</p>
                  <p>123 Palm Grove Avenue, Agribusiness Park</p>
                </div>
              </div>

              <div className="flex items-center text-[#2F2F2F]"> {/* Dark Charcoal text */}
                <svg className="w-8 h-8 text-[#086920] mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg> {/* Primary Green icon */}
                <div>
                  <h4 className="font-semibold text-xl text-[#086920]">Phone</h4> {/* Primary Green heading */}
                  <p>+233 24 123 4567</p>
                  <p>Mon - Fri: 8:00 AM - 5:00 PM (GMT)</p>
                </div>
              </div>

              <div className="flex items-center text-[#2F2F2F]"> {/* Dark Charcoal text */}
                <svg className="w-8 h-8 text-[#086920] mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-1 13a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2h12a2 2 0 012 2v14z"></path></svg> {/* Primary Green icon */}
                <div>
                  <h4 className="font-semibold text-xl text-[#086920]">Email</h4> {/* Primary Green heading */}
                  <p>info@nananomfarms.com</p>
                  <p>support@nananomfarms.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Enquiry Form */}
          <div className="bg-[#FFFFFF] p-8 rounded-lg shadow-xl border border-[#FFB703] animate-slideInRight" style={{ animationDelay: '0.5s' }}> {/* Pure White background, Golden Wheat border */}
            <h2 className="text-3xl font-bold text-[#086920] mb-6 text-center">Send Us a Message</h2> {/* Primary Green heading */}
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-left text-sm font-medium text-[#2F2F2F] mb-1">Your Name</label> {/* Dark Charcoal text */}
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 block w-full px-4 py-2 border border-[#FFB703] rounded-lg shadow-sm focus:ring-2 focus:ring-[#086920] focus:border-transparent transition duration-150 ease-in-out" // Golden Wheat border, Primary Green focus ring
                  placeholder="John Doe"
                  aria-label="Your Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-left text-sm font-medium text-[#2F2F2F] mb-1">Your Email</label> {/* Dark Charcoal text */}
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 block w-full px-4 py-2 border border-[#FFB703] rounded-lg shadow-sm focus:ring-2 focus:ring-[#086920] focus:border-transparent transition duration-150 ease-in-out" // Golden Wheat border, Primary Green focus ring
                  placeholder="john.doe@example.com"
                  aria-label="Your Email"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-left text-sm font-medium text-[#2F2F2F] mb-1">Subject</label> {/* Dark Charcoal text */}
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="mt-1 block w-full px-4 py-2 border border-[#FFB703] rounded-lg shadow-sm focus:ring-2 focus:ring-[#086920] focus:border-transparent transition duration-150 ease-in-out" // Golden Wheat border, Primary Green focus ring
                  placeholder="Inquiry about Palm Oil Products"
                  aria-label="Enquiry Subject"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-left text-sm font-medium text-[#2F2F2F] mb-1">Your Message</label> {/* Dark Charcoal text */}
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  className="mt-1 block w-full px-4 py-2 border border-[#FFB703] rounded-lg shadow-sm focus:ring-2 focus:ring-[#086920] focus:border-transparent transition duration-150 ease-in-out resize-y" // Golden Wheat border, Primary Green focus ring
                  placeholder="Type your detailed message here..."
                  aria-label="Your Message"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-[#FFB703] text-[#2F2F2F] font-bold py-3 px-6 rounded-lg shadow-md hover:bg-[#086920] hover:text-[#FFFFFF] transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FFB703]" // Golden Wheat button, Dark Charcoal text, Primary Green hover, Pure White hover text, Golden Wheat focus ring
              >
                Submit Enquiry
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Optional: Map Section */}
      <section className="py-16 bg-[#DAD7CD]"> {/* Soft Clay background */}
        <div className="container mx-auto px-4 text-center animate-fadeIn" style={{ animationDelay: '0.7s' }}>
          <h2 className="text-3xl font-bold text-[#086920] mb-6">Find Us on the Map</h2> {/* Primary Green heading */}
          <p className="text-lg text-[#2F2F2F] mb-8">Visit our location or view our farms.</p> {/* Dark Charcoal text */}
          <div className="bg-[#FFFFFF] rounded-lg overflow-hidden shadow-md border border-[#FFB703]" style={{ height: '400px' }}> {/* Pure White background, Golden Wheat border */}
            {/* Embedded Google Maps iframe - replace 'your-map-embed-url' with your actual embed URL */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15443.344445582998!2d-0.20302305!3d5.59976425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9a7e6b8a8b13%3A0x6b6d5f7b0f0a4f5d!2sAccra%2C%20Ghana!5e0!3m2!1sen!2sus!4v1708453488795!5m2!1sen!2sus"
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