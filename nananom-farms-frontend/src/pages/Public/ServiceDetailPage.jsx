// src/pages/Public/ServiceDetailPage.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';


const ServiceDetailPage = () => {
  const { id } = useParams(); // Get the service ID from the URL

  // In a real application, you would fetch service data based on 'id'
  // For now, we'll use placeholder content
  const serviceData = {
    'premium-palm-oil-products': {
      title: 'Premium Palm Oil Products',
      description: `At Nananom Farms, we pride ourselves on producing and supplying the finest palm oil. Our commitment to quality begins with sustainable farming practices, ensuring every palm fruit is harvested at its peak. We utilize advanced, eco-friendly processing techniques to extract pure, rich, and nutrient-dense palm oil. Our products meet rigorous international standards, making them ideal for various culinary and industrial applications. From farm to your table, we guarantee freshness, purity, and a taste that reflects the natural richness of Ghana's soil.`,
      icon: (
        <svg className="w-16 h-16 text-[#FFFFFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2-2m-2 2l-2 2M12 8l-2 2m2-2l2 2M12 18h.01M12 12h.01M12 6h.01M6 12h.01M18 12h.01"></path></svg>
      ),
      image: 'https://via.placeholder.com/800x400/25A244/FFFFFF?text=Premium+Palm+Oil' // Primary Green with Pure White text
    },
    'agricultural-consulting': {
      title: 'Agricultural Consulting',
      description: `Leverage the expertise of Nananom Farms' seasoned agronomists. Our consulting services are designed to empower farmers with the knowledge and strategies needed to optimize their yields and improve farm efficiency. We offer personalized advice on a wide range of topics, including effective crop rotation techniques, integrated pest management solutions, soil fertility enhancement, and the adoption of best practices in sustainable agriculture. Whether you're a small-scale farmer or a large agricultural enterprise, our tailored guidance will help you achieve greater productivity and profitability.`,
      icon: (
        <svg className="w-16 h-16 text-[#FFFFFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-1.25-3M15 10V5.729a2 2 0 00-2.14-1.956L12 3m-2 2.729V10m-2 2h8m-8 0v8a2 2 0 002 2h4a2 2 0 002-2v-8m-8 0h8"></path></svg>
      ),
      image: 'https://via.placeholder.com/800x400/FFB703/2F2F2F?text=Agri+Consulting' // Golden Wheat with Dark Charcoal text
    },
    'farm-equipment-rentals': {
      title: 'Farm Equipment Rentals',
      description: `Unlock your farm's full potential with Nananom Farms' comprehensive range of modern agricultural machinery available for rent. We understand that investing in heavy equipment can be a significant hurdle for many farmers. Our rental service provides cost-effective access to well-maintained tractors, planters, harvesters, irrigation systems, and more. This allows you to execute farming tasks efficiently, reduce manual labor, and enhance productivity without the burden of ownership. All our equipment is regularly serviced to ensure reliability and optimal performance.`,
      icon: (
        <svg className="w-16 h-16 text-[#FFFFFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V6m3 6v.01M18 18a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V6"></path></svg>
      ),
      image: 'https://via.placeholder.com/800x400/2F2F2F/FFFFFF?text=Farm+Equipment' // Dark Charcoal with Pure White text
    },
    'training-workshops': {
      title: 'Training Workshops',
      description: `Knowledge is power, especially in agriculture. Nananom Farms is dedicated to empowering local farmers through a series of engaging and practical training workshops. Our programs cover essential topics such as modern agricultural techniques, effective pest and disease control, efficient irrigation methods, and crucial post-harvest management strategies. Led by industry experts, these workshops provide hands-on learning experiences, enabling farmers to adopt innovative practices, increase their yields, and enhance the overall quality of their produce. Join us to grow your skills and your farm.`,
      icon: (
        <svg className="w-16 h-16 text-[#FFFFFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253M12 6.253c1.168.776 2.754 1.253 4.5 1.253S19.832 7.029 21 6.253m-18 13c1.168.776 2.754 1.253 4.5 1.253s3.332-.477 4.5-1.253m-18 0V9.5m0 0v1.11m0-1.11c0 2.667 3 3.75 3 3.75S7 9.5 7 9.5m7 3.5c0 2.667 3 3.75 3 3.75S17 9.5 17 9.5M3 12a2 2 0 110-4 2 2 0 010 4zm18 0a2 2 0 110-4 2 2 0 010 4zM4.5 19.253V18l.001-.001C5.333 19.012 6.5 20 7.5 20s2.167-.988 3-1.747L12 18v1.253c1.168.776 2.754 1.253 4.5 1.253s3.332-.477 4.5-1.253V18l.001-.001c.833.988 2 1.747 3 1.747s2.167-.988 3-1.747L21 18v1.253"></path></svg>
      ),
      image: 'https://via.placeholder.com/800x400/25A244/FFFFFF?text=Training+Workshop' // Primary Green with Pure White text
    },
    'logistics-distribution': {
      title: 'Logistics & Distribution',
      description: `At Nananom Farms, we understand that efficient logistics are crucial for delivering quality produce to market. Our integrated logistics and distribution network ensures the timely and secure transportation of our palm oil products from our farms directly to your facility or designated market. We meticulously manage every step of the supply chain, from careful packaging and cold storage (where applicable) to optimized routing and reliable delivery, ensuring that our products maintain their freshness and quality upon arrival. Trust us for seamless and dependable delivery solutions.`,
      icon: (
        <svg className="w-16 h-16 text-[#FFFFFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10v11m0 0h8m-8 0L9 17m-3 4V3m0 0h8m-8 0L9 7m-3 4v10m6-10V3m0 0h8m-8 0L15 7m-3 4v10m6-10V3m0 0h8m-8 0L21 7"></path></svg>
      ),
      image: 'https://via.placeholder.com/800x400/FFB703/2F2F2F?text=Logistics+Distribution' // Golden Wheat with Dark Charcoal text
    },
    'agricultural-research-support': {
      title: 'Agricultural Research Support',
      description: `Innovation is at the heart of sustainable agriculture. Nananom Farms actively supports and collaborates on cutting-edge agricultural research initiatives. We believe in fostering advancements that lead to more resilient crops, improved farming techniques, and enhanced ecological sustainability. Our involvement includes providing resources, land for field trials, and practical insights from our farming operations. By partnering with research institutions and experts, we contribute to developing innovative solutions that address current and future challenges in the agricultural sector, ultimately benefiting the entire farming community.`,
      icon: (
        <svg className="w-16 h-16 text-[#FFFFFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a2 2 0 100 4m-3.939 1.579a2 2 0 113.15 1.414L10 14l-1 1-3 3-1 1-3 3"></path></svg>
      ),
      image: 'https://via.placeholder.com/800x400/2F2F2F/FFFFFF?text=Agri+Research' // Dark Charcoal with Pure White text
    },
  };

  const service = serviceData[id] || {
    title: 'Service Not Found',
    description: 'The service you are looking for does not exist or has been removed. Please check our list of services.',
    icon: (
      <svg className="w-16 h-16 text-[#2F2F2F]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
    ),
    image: 'https://via.placeholder.com/800x400/DAD7CD/2F2F2F?text=Service+Not+Found' // Soft Clay with Dark Charcoal text
  };


  return (
    <div className="container mx-auto p-4 py-12 bg-[#DAD7CD] min-h-screen font-sans animate-fadeIn"> {/* Soft Clay background */}
      <div className="max-w-4xl mx-auto bg-[#FFFFFF] rounded-lg shadow-xl overflow-hidden border border-[#FFB703] animate-slideInUp"> {/* Pure White background, Golden Wheat border */}
        {/* Service Image */}
        <div className="relative h-64 sm:h-80 md:h-96 bg-cover bg-center" style={{ backgroundImage: `url('${service.image}')` }}>
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="p-4 rounded-full bg-[#25A244] shadow-lg animate-popIn"> {/* Primary Green background */}
              {service.icon}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-8 md:p-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#25A244] mb-4 animate-slideInDown"> {/* Primary Green heading */}
            {service.title}
          </h1>
          <p className="text-lg md:text-xl text-[#2F2F2F] leading-relaxed mb-6 animate-fadeIn" style={{ animationDelay: '0.2s' }}> {/* Dark Charcoal text */}
            Details for Service ID: <span className="font-semibold text-[#FFB703]">{id}</span> {/* Golden Wheat text */}
          </p>
          <p className="text-base md:text-lg text-[#2F2F2F] leading-relaxed mb-8 animate-fadeIn" style={{ animationDelay: '0.4s' }}> {/* Dark Charcoal text */}
            {service.description}
          </p>

          {/* Call to Action or Further Links */}
          <div className="mt-8 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link
              to="/enquiries"
              className="bg-[#FFB703] hover:bg-[#25A244] text-[#2F2F2F] hover:text-[#FFFFFF] font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 animate-bounceIn" style={{ animationDelay: '0.6s' }} // Golden Wheat button, Primary Green hover, Dark Charcoal text, Pure White hover text
            >
              Enquire About This Service
            </Link>
            <Link
              to="/services"
              className="bg-transparent border-2 border-[#25A244] text-[#25A244] hover:bg-[#25A244] hover:text-[#FFFFFF] font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 animate-fadeIn" style={{ animationDelay: '0.8s' }} // Transparent background, Primary Green border, Primary Green text, Primary Green hover background, Pure White hover text
            >
              View All Services
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailPage;