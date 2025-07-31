// src/pages/Public/ServicesPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-[#F2F4F5] font-sans">
      {/* Services Hero Section */}
      <section className="bg-[#4682B4] text-[#FFFFF0] py-16 md:py-24 text-center animate-fadeIn">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 leading-tight animate-popIn">
            Comprehensive Agricultural Services
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            Nananom Farms offers a diverse range of services designed to **empower farmers**,
            **optimize yields**, and ensure **sustainable agricultural growth** in Ghana.
          </p>
        </div>
      </section>

      {/* Main Services Grid (Overview) */}
      <section className="py-16 md:py-24 bg-[#FFFFF0]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#4682B4] text-center mb-12 animate-slideInDown">
            Our Core Offerings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service Card 1: Premium Palm Oil Products */}
            <Link to="/services/premium-palm-oil-products" className="block">
              <div className="bg-[#F2F4F5] p-6 rounded-lg shadow-md border border-[#EAA221] hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center h-full animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
                <div className="bg-[#4682B4] p-3 rounded-full inline-block mb-4">
                  <svg className="w-10 h-10 text-[#FFFFF0]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2-2m-2 2l-2 2M12 8l-2 2m2-2l2 2M12 18h.01M12 12h.01M12 6h.01M6 12h.01M18 12h.01"></path></svg>
                </div>
                <h3 className="text-xl font-semibold text-[#4682B4] mb-3">Premium Palm Oil Products</h3>
                <p className="text-[#2F4F4F]">
                  Sustainable sourcing and processing for the highest quality palm oil.
                </p>
                <span className="mt-4 text-[#EAA221] hover:underline flex items-center justify-center">
                  Learn More
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </span>
              </div>
            </Link>

            {/* Service Card 2: Agricultural Consulting */}
            <Link to="/services/agricultural-consulting" className="block">
              <div className="bg-[#F2F4F5] p-6 rounded-lg shadow-md border border-[#EAA221] hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center h-full animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
                <div className="bg-[#4682B4] p-3 rounded-full inline-block mb-4">
                  <svg className="w-10 h-10 text-[#FFFFF0]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-1.25-3M15 10V5.729a2 2 0 00-2.14-1.956L12 3m-2 2.729V10m-2 2h8m-8 0v8a2 2 0 002 2h4a2 2 0 002-2v-8m-8 0h8"></path></svg>
                </div>
                <h3 className="text-xl font-semibold text-[#4682B4] mb-3">Agricultural Consulting</h3>
                <p className="text-[#2F4F4F]">
                  Expert guidance on crop management, soil health, and farming best practices.
                </p>
                <span className="mt-4 text-[#EAA221] hover:underline flex items-center justify-center">
                  Learn More
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </span>
              </div>
            </Link>

            {/* Service Card 3: Farm Equipment Rentals */}
            <Link to="/services/farm-equipment-rentals" className="block">
              <div className="bg-[#F2F4F5] p-6 rounded-lg shadow-md border border-[#EAA221] hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center h-full animate-fadeInUp" style={{ animationDelay: '0.8s' }}>
                <div className="bg-[#4682B4] p-3 rounded-full inline-block mb-4">
                  <svg className="w-10 h-10 text-[#FFFFF0]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V6m3 6v.01M18 18a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V6"></path></svg>
                </div>
                <h3 className="text-xl font-semibold text-[#4682B4] mb-3">Farm Equipment Rentals</h3>
                <p className="text-[#2F4F4F]">
                  Access to modern farm machinery to boost efficiency and productivity.
                </p>
                <span className="mt-4 text-[#EAA221] hover:underline flex items-center justify-center">
                  Learn More
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </span>
              </div>
            </Link>

            {/* Service Card 4: Training Workshops */}
            <Link to="/services/training-workshops" className="block">
              <div className="bg-[#F2F4F5] p-6 rounded-lg shadow-md border border-[#EAA221] hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center h-full animate-fadeInUp" style={{ animationDelay: '1.0s' }}>
                <div className="bg-[#4682B4] p-3 rounded-full inline-block mb-4">
                  <svg className="w-10 h-10 text-[#FFFFF0]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253M12 6.253c1.168.776 2.754 1.253 4.5 1.253S19.832 7.029 21 6.253m-18 13c1.168.776 2.754 1.253 4.5 1.253s3.332-.477 4.5-1.253m-18 0V9.5m0 0v1.11m0-1.11c0 2.667 3 3.75 3 3.75S7 9.5 7 9.5m7 3.5c0 2.667 3 3.75 3 3.75S17 9.5 17 9.5M3 12a2 2 0 110-4 2 2 0 010 4zm18 0a2 2 0 110-4 2 2 0 010 4zM4.5 19.253V18l.001-.001C5.333 19.012 6.5 20 7.5 20s2.167-.988 3-1.747L12 18v1.253c1.168.776 2.754 1.253 4.5 1.253s3.332-.477 4.5-1.253V18l.001-.001c.833.988 2 1.747 3 1.747s2.167-.988 3-1.747L21 18v1.253"></path></svg>
                </div>
                <h3 className="text-xl font-semibold text-[#4682B4] mb-3">Training Workshops</h3>
                <p className="text-[#2F4F4F]">
                  Educational workshops for farmers on modern agricultural techniques.
                </p>
                <span className="mt-4 text-[#EAA221] hover:underline flex items-center justify-center">
                  Learn More
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </span>
              </div>
            </Link>

            {/* Service Card 5: Logistics & Distribution */}
            <Link to="/services/logistics-distribution" className="block">
              <div className="bg-[#F2F4F5] p-6 rounded-lg shadow-md border border-[#EAA221] hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center h-full animate-fadeInUp" style={{ animationDelay: '1.2s' }}>
                <div className="bg-[#4682B4] p-3 rounded-full inline-block mb-4">
                  <svg className="w-10 h-10 text-[#FFFFF0]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10v11m0 0h8m-8 0L9 17m-3 4V3m0 0h8m-8 0L9 7m-3 4v10m6-10V3m0 0h8m-8 0L15 7m-3 4v10m6-10V3m0 0h8m-8 0L21 7"></path></svg>
                </div>
                <h3 className="text-xl font-semibold text-[#4682B4] mb-3">Logistics & Distribution</h3>
                <p className="text-[#2F4F4F]">
                  Timely and efficient delivery of palm oil products maintaining quality.
                </p>
                <span className="mt-4 text-[#EAA221] hover:underline flex items-center justify-center">
                  Learn More
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </span>
              </div>
            </Link>

            {/* Service Card 6: Agricultural Research Support */}
            <Link to="/services/agricultural-research-support" className="block">
              <div className="bg-[#F2F4F5] p-6 rounded-lg shadow-md border border-[#EAA221] hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center h-full animate-fadeInUp" style={{ animationDelay: '1.4s' }}>
                <div className="bg-[#4682B4] p-3 rounded-full inline-block mb-4">
                  <svg className="w-10 h-10 text-[#FFFFF0]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a2 2 0 100 4m-3.939 1.579a2 2 0 113.15 1.414L10 14l-1 1-3 3-1 1-3 3"></path></svg>
                </div>
                <h3 className="text-xl font-semibold text-[#4682B4] mb-3">Agricultural Research Support</h3>
                <p className="text-[#2F4F4F]">
                  Collaboration on research for new varieties and improved farming techniques.
                </p>
                <span className="mt-4 text-[#EAA221] hover:underline flex items-center justify-center">
                  Learn More
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Detailed Service Sections - These link to ServiceDetailPage */}
      <section className="py-16 md:py-24 bg-[#FFFFF0]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#4682B4] text-center mb-12 animate-slideInDown" style={{ animationDelay: '1.6s' }}>
            In-Depth Service Details
          </h2>

          {/* Detailed Section: Premium Palm Oil Products */}
          <div id="palm-oil-products" className="bg-[#F2F4F5] p-8 rounded-lg shadow-md border border-[#EAA221] mb-12 animate-fadeInUp" style={{ animationDelay: '1.8s' }}>
            <h3 className="text-3xl font-bold text-[#4682B4] mb-4">Premium Palm Oil Products</h3>
            <p className="text-lg text-[#2F4F4F] leading-relaxed mb-4">
              At **Nananom Farms**, our commitment to quality begins at the source. We cultivate our oil palms
              using **sustainable and environmentally responsible practices**. Our rigorous harvesting and
              processing methods ensure that every drop of palm oil meets the **highest international
              standards for purity, freshness, and nutritional value**. From crude palm oil to refined
              products, we guarantee consistency and excellence, making us a reliable partner for
              food manufacturers, distributors, and consumers.
            </p>
            <ul className="list-disc list-inside text-[#2F4F4F] space-y-2 mb-4 ml-4">
              <li>Sourced from sustainably managed plantations</li>
              <li>Advanced extraction and refining processes</li>
              <li>Rich in natural antioxidants and vitamins</li>
              <li>Available in various grades and quantities</li>
              <li>Strict quality control at every stage</li>
            </ul>
            <Link to="/enquiries" className="text-[#EAA221] hover:text-[#4682B4] font-semibold flex items-center group">
              <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
              Inquire about Palm Oil Products
            </Link>
          </div>

          {/* Detailed Section: Agricultural Consulting */}
          <div id="agricultural-consulting" className="bg-[#F2F4F5] p-8 rounded-lg shadow-md border border-[#EAA221] mb-12 animate-fadeInUp" style={{ animationDelay: '2.0s' }}>
            <h3 className="text-3xl font-bold text-[#4682B4] mb-4">Agricultural Consulting</h3>
            <p className="text-lg text-[#2F4F4F] leading-relaxed mb-4">
              Our seasoned agricultural consultants offer personalized guidance to **farmers of all scales**.
              From soil analysis and crop selection to pest and disease management, we provide **data-driven
              recommendations** to optimize your farm's productivity and profitability. We focus on
              implementing **sustainable farming techniques** that preserve environmental health while
              ensuring robust yields and long-term viability for your agricultural ventures.
            </p>
            <ul className="list-disc list-inside text-[#2F4F4F] space-y-2 mb-4 ml-4">
              <li>Personalized farm assessments and planning</li>
              <li>Soil testing and nutrient management strategies</li>
              <li>Integrated Pest Management (IPM) solutions</li>
              <li>Crop rotation and diversification advice</li>
              <li>Sustainable and organic farming transitions</li>
            </ul>
            <Link to="/enquiries" className="text-[#EAA221] hover:text-[#4682B4] font-semibold flex items-center group">
              <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"></path></svg>
              Request Agricultural Consulting
            </Link>
          </div>

          {/* Detailed Section: Farm Equipment Rentals */}
          <div id="farm-equipment-rentals" className="bg-[#F2F4F5] p-8 rounded-lg shadow-md border border-[#EAA221] mb-12 animate-fadeInUp" style={{ animationDelay: '2.2s' }}>
            <h3 className="text-3xl font-bold text-[#4682B4] mb-4">Farm Equipment Rentals</h3>
            <p className="text-lg text-[#2F4F4F] leading-relaxed mb-4">
              **Nananom Farms** provides access to a comprehensive fleet of modern, **well-maintained
              agricultural machinery for rent**. Whether you need a tractor for plowing, harvesters
              for efficient crop collection, or specialized tools for specific tasks, our equipment
              rental service helps you **reduce overhead costs** and **improve operational efficiency**.
              All equipment is regularly serviced and delivered with full operational guidance.
            </p>
            <ul className="list-disc list-inside text-[#2F4F4F] space-y-2 mb-4 ml-4">
              <li>Wide range of tractors, plows, harvesters, and more</li>
              <li>Flexible rental periods (daily, weekly, monthly)</li>
              <li>Competitive pricing and transparent terms</li>
              <li>On-site delivery and pick-up available</li>
              <li>Maintenance and operational support provided</li>
            </ul>
            <Link to="/enquiries" className="text-[#EAA221] hover:text-[#4682B4] font-semibold flex items-center group">
              <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              Inquire about Equipment Rentals
            </Link>
          </div>

          {/* Detailed Section: Training Workshops */}
          <div id="training-workshops" className="bg-[#F2F4F5] p-8 rounded-lg shadow-md border border-[#EAA221] mb-12 animate-fadeInUp" style={{ animationDelay: '2.4s' }}>
            <h3 className="text-3xl font-bold text-[#4682B4] mb-4">Training Workshops</h3>
            <p className="text-lg text-[#2F4F4F] leading-relaxed mb-4">
              **Empowering the agricultural community through knowledge** is a core principle at Nananom Farms.
              We regularly host **practical training workshops and seminars** on a variety of topics, including
              modern irrigation techniques, organic farming methods, financial management for farmers,
              and advanced crop protection strategies. These workshops are designed to **enhance skills**,
              introduce **innovative practices**, and foster a network of informed and successful farmers.
            </p>
            <ul className="list-disc list-inside text-[#2F4F4F] space-y-2 mb-4 ml-4">
              <li>Hands-on practical training sessions</li>
              <li>Topics on modern farming, finance, and sustainability</li>
              <li>Expert instructors and guest speakers</li>
              <li>Networking opportunities with other farmers</li>
              <li>Certificates of participation for attendees</li>
            </ul>
            <Link to="/enquiries" className="text-[#EAA221] hover:text-[#4682B4] font-semibold flex items-center group">
              <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253M12 6.253c1.168.776 2.754 1.253 4.5 1.253S19.832 7.029 21 6.253m-18 13c1.168.776 2.754 1.253 4.5 1.253s3.332-.477 4.5-1.253m-18 0V9.5m0 0v1.11m0-1.11c0 2.667 3 3.75 3 3.75S7 9.5 7 9.5m7 3.5c0 2.667 3 3.75 3 3.75S17 9.5 17 9.5M3 12a2 2 0 110-4 2 2 0 010 4zm18 0a2 2 0 110-4 2 2 0 010 4zM4.5 19.253V18l.001-.001C5.333 19.012 6.5 20 7.5 20s2.167-.988 3-1.747L12 18v1.253c1.168.776 2.754 1.253 4.5 1.253s3.332-.477 4.5-1.253V18l.001-.001c.833.988 2 1.747 3 1.747s2.167-.988 3-1.747L21 18v1.253"></path></svg>
              Learn More about Workshops
            </Link>
          </div>

          {/* Detailed Section: Logistics & Distribution */}
          <div id="logistics-distribution" className="bg-[#F2F4F5] p-8 rounded-lg shadow-md border border-[#EAA221] mb-12 animate-fadeInUp" style={{ animationDelay: '2.6s' }}>
            <h3 className="text-3xl font-bold text-[#4682B4] mb-4">Logistics & Distribution</h3>
            <p className="text-lg text-[#2F4F4F] leading-relaxed mb-4">
              Our robust logistics and distribution network ensures that **Nananom Farms' premium
              palm oil products reach their destination efficiently and in optimal condition**.
              We manage the entire supply chain, from farm gate to market, utilizing modern
              transportation methods and warehousing solutions. Our commitment to **timely and
              reliable delivery** minimizes spoilage and ensures customer satisfaction.
            </p>
            <ul className="list-disc list-inside text-[#2F4F4F] space-y-2 mb-4 ml-4">
              <li>Efficient cold chain management (where applicable)</li>
              <li>Timely delivery to local and regional markets</li>
              <li>Secure warehousing facilities</li>
              <li>Scalable distribution solutions for various order sizes</li>
              <li>Dedicated logistics support team</li>
            </ul>
            <Link to="/enquiries" className="text-[#EAA221] hover:text-[#4682B4] font-semibold flex items-center group">
              <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10v11m0 0h8m-8 0L9 17m-3 4V3m0 0h8m-8 0L9 7m-3 4v10m6-10V3m0 0h8m-8 0L15 7m-3 4v10m6-10V3m0 0h8m-8 0L21 7"></path></svg>
              Discuss Distribution Needs
            </Link>
          </div>

          {/* Detailed Section: Agricultural Research Support */}
          <div id="agricultural-research-support" className="bg-[#F2F4F5] p-8 rounded-lg shadow-md border border-[#EAA221] mb-12 animate-fadeInUp" style={{ animationDelay: '2.8s' }}>
            <h3 className="text-3xl font-bold text-[#4682B4] mb-4">Agricultural Research Support</h3>
            <p className="text-lg text-[#2F4F4F] leading-relaxed mb-4">
              **Nananom Farms** is dedicated to advancing agricultural science. We actively
              **support and collaborate with research institutions**, universities, and individual
              researchers on projects focused on improving crop yields, developing
              disease-resistant varieties, enhancing sustainable farming practices, and
              innovating post-harvest technologies for palm oil. Our aim is to contribute
              to the global knowledge base and ensure a **resilient future for agriculture**.
            </p>
            <ul className="list-disc list-inside text-[#2F4F4F] space-y-2 mb-4 ml-4">
              <li>Partnerships with academic and research bodies</li>
              <li>Funding and resource allocation for key studies</li>
              <li>Field trials and data collection support</li>
              <li>Focus on sustainable and resilient agricultural systems</li>
              <li>Contributing to publications and industry best practices</li>
            </ul>
            <Link to="/enquiries" className="text-[#EAA221] hover:text-[#4682B4] font-semibold flex items-center group">
              <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a2 2 0 100 4m-3.939 1.579a2 2 0 113.15 1.414L10 14l-1 1-3 3-1 1-3 3"></path></svg>
              Explore Research Collaboration
            </Link>
          </div>

        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-[#8A3324] text-[#FFFFF0] py-16 md:py-24 text-center animate-fadeIn" style={{ animationDelay: '3.0s' }}>
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 animate-popIn">Ready to Partner With Nananom Farms?</h2>
          <p className="text-lg leading-relaxed mb-8 animate-fadeInUp" style={{ animationDelay: '3.2s' }}>
            Whether you're a farmer seeking expertise or a business looking for quality palm oil,
            we are here to support your needs.
          </p>
          <Link
            to="/enquiries"
            className="inline-block bg-[#EAA221] hover:bg-[#4682B4] text-[#2F4F4F] hover:text-[#FFFFF0] font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 text-lg animate-bounceIn" style={{ animationDelay: '3.4s' }}
          >
            Make an Enquiry
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;