// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Sustainability from '../../assets/images/sustainabilty.jpeg'
import Quality from '../../assets/images/Quality.png';
import Community from '../../assets/images/Community.png'
import Hero from '../../assets/images/hero.jpeg';
import About from '../../assets/images/about.png'

// New imports for service images (replace with your actual image paths)
// Make sure these paths are correct relative to your Home.jsx file
import PalmOilProductImage from '../../assets/images/about.png'; // Placeholder - replace with a real image
import AgriculturalConsultingImage from '../../assets/images/about.png'; // Placeholder - replace with a real image
import FarmEquipmentRentalImage from '../../assets/images/about.png'; // Placeholder - replace with a real image
import TrainingWorkshopImage from '../../assets/images/about.png'; // Placeholder - replace with a real image
import LogisticsDistributionImage from '../../assets/images/about.png'; // Placeholder - replace with a real image
import ResearchSupportImage from '../../assets/images/about.png'; // Placeholder - replace with a real image


const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#F2F4F5] font-sans">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center bg-no-repeat py-20 md:py-32 lg:py-48 text-[#FFFFF0] flex items-center justify-center animate-fadeIn"
        style={{ backgroundImage: `url(${Hero})` }}

        // Replace with a real, high-quality image of a vibrant palm oil field or a broader farm landscape
      >
        <div className="absolute inset-0 bg-black opacity-60"></div> {/* Overlay for readability */}
        <div className="relative container mx-auto p-4 text-center z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 leading-tight animate-popIn">
            Nananom Farms: Empowering Sustainable Agriculture
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-8 max-w-3xl mx-auto animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            Your trusted partner for **premium palm oil products** and **innovative agricultural solutions** in Ghana.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
            <Link
              to="/services"
              className="bg-[#EAA221] hover:bg-[#4682B4] text-[#2F4F4F] hover:text-[#FFFFF0] font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 text-lg"
            >
              Explore Our Services
            </Link>
            <Link
              to="/enquiries"
              className="bg-[#4682B4] hover:bg-[#EAA221] text-[#FFFFF0] hover:text-[#2F4F4F] font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 text-lg"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </section>

      {/* About Us Section - Modified to match image layout */}
      <section className="py-16 md:py-24 bg-[#FFFFF0] animate-fadeIn" style={{ animationDelay: '0.6s' }}>
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center md:space-x-12 max-w-6xl">
          {/* Image Column */}
          <div className="md:w-1/2 mb-8 md:mb-0 animate-fadeInLeft">
            <img
              src={About}
              alt="Ghanaian farmer in a field"
              className="rounded-lg shadow-xl object-cover w-full h-auto"
              // Replace with a real, high-quality image of a Ghanaian farmer or agricultural scene
            />
          </div>

          {/* Content Column */}
          <div className="md:w-1/2 text-center md:text-left animate-fadeInRight">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#4682B4] mb-6">Our Mission & Values</h2>
            <p className="text-lg text-[#2F4F4F] leading-relaxed mb-8">
              At **Nananom Farms**, we're more than just a farm; we're a **commitment to sustainable agriculture** and **community empowerment** in Ghana. We cultivate high-quality palm oil products while nurturing local farming communities with knowledge and resources, driving both food security and economic growth. Our vision is a future where agriculture flourishes in harmony with nature, enriching lives and the land.
            </p>
            <Link
              to="/about"
              className="inline-block bg-[#EAA221] hover:bg-[#4682B4] text-[#2F4F4F] hover:text-[#FFFFF0] font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 text-lg"
            >
              Learn More About Us
            </Link>
          </div>
        </div>

        {/* New Blending Image Section for Values */}
        <div className="container mx-auto px-4 mt-16"> {/* Increased top margin for separation */}
          <h3 className="text-2xl sm:text-3xl font-bold text-[#4682B4] text-center mb-10 animate-slideInDown">
            Our Core Values
          </h3>
          <div className="flex flex-col md:flex-row justify-center items-stretch gap-4 md:gap-0 overflow-hidden"> {/* Use items-stretch for equal height */}

            {/* Value Image 1: Sustainability */}
            <div className="relative group w-full md:w-1/3 h-64 md:h-96 overflow-hidden animate-fadeIn" style={{ animationDelay: '1.0s' }}>
              <img
                src={Sustainability} // Replace with a relevant image
                alt="Sustainable Farming"
                className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:brightness-75"
              />
              <div className="absolute inset-0
              bg-black/70 backdrop-blur-sm backdrop-brightness-75
              opacity-0 group-hover:opacity-100
              transition-opacity duration-300
              flex items-center justify-center p-4">
                <p className="text-white text-xl font-semibold text-center leading-relaxed">
                  Committed to eco-friendly farming and responsible resource management.
                </p>
              </div>
              {/* Optional: Add a subtle overlay on hover for relief effect */}
              <div className="absolute inset-0 bg-[#EAA221] opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </div>

            {/* Value Image 2: Quality */}
            <div className="relative group w-full md:w-1/3 h-64 md:h-96 overflow-hidden animate-fadeIn" style={{ animationDelay: '1.2s' }}>
              <img
                src={Quality} // Replace with a relevant image
                alt="Premium Palm Oil Products"
                className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:brightness-75"
              />
              <div className="absolute inset-0
              bg-black/50 backdrop-blur-sm backdrop-brightness-75
              opacity-0 group-hover:opacity-100
              transition-opacity duration-300
              flex items-center justify-center p-4">
                <p className="text-white text-xl font-semibold text-center leading-relaxed">
                  Delivering only the finest palm oil products to our customers.
                </p>
              </div>
              <div className="absolute inset-0 bg-[#EAA221] opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </div>

            {/* Value Image 3: Community */}
            <div className="relative group w-full md:w-1/3 h-64 md:h-96 overflow-hidden animate-fadeIn" style={{ animationDelay: '1.4s' }}>
              <img
                src={Community} // Replace with a relevant image
                alt="Empowering Local Farmers"
                className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:brightness-75"
              />
              <div className="absolute inset-0
              bg-black/50 backdrop-blur-sm backdrop-brightness-75
              opacity-0 group-hover:opacity-100
              transition-opacity duration-300
              flex items-center justify-center p-4">
                <p className="text-white text-xl font-semibold text-center leading-relaxed">
                  Empowering local farmers and contributing to regional food security.
                </p>
              </div>
              <div className="absolute inset-0 bg-[#EAA221] opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Services Section - REVISED TO MATCH IMAGE_AF16A7.JPG LAYOUT */}
      <section className="py-16 md:py-24 bg-[#F2F4F5]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#4682B4] text-center mb-12 animate-slideInDown" style={{ animationDelay: '1.6s' }}>
            Our Core Offerings
          </h2>
          <div className="flex flex-col gap-10"> {/* Changed to flex column for stacking cards */}

            {/* Service Card 1: Premium Palm Oil Products */}
            <div className="bg-[#FFFFF0] rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row items-center animate-fadeInUp" style={{ animationDelay: '1.8s' }}>
              <div className="md:w-1/3 w-full h-60 md:h-auto overflow-hidden"> {/* Image container */}
                <img
                  src={PalmOilProductImage} // Use your actual image here
                  alt="Premium Palm Oil Products"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="md:w-2/3 w-full p-6 text-center md:text-left flex flex-col justify-center"> {/* Content container */}
                <h3 className="text-2xl font-bold text-[#4682B4] mb-3">Premium Palm Oil Products</h3>
                <p className="text-lg text-[#2F4F4F] leading-relaxed mb-4">
                  We produce and supply high-quality palm oil, extracted and processed using
                  sustainable methods to ensure purity, richness, and compliance with global standards.
                </p>
                <Link
                  to="/services/palm-oil-products"
                  className="inline-block self-center md:self-start bg-[#EAA221] hover:bg-[#4682B4] text-[#2F4F4F] hover:text-[#FFFFF0] font-bold py-2 px-6 rounded-full shadow transition duration-300 ease-in-out transform hover:scale-105 text-md"
                >
                  Learn More
                </Link>
              </div>
            </div>

            {/* Service Card 2: Agricultural Consulting */}
            <div className="bg-[#FFFFF0] rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row items-center animate-fadeInUp" style={{ animationDelay: '2.0s' }}>
              <div className="md:w-2/3 w-full p-6 text-center md:text-left flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-[#4682B4] mb-3">Agricultural Consulting</h3>
                <p className="text-lg text-[#2F4F4F] leading-relaxed mb-4">
                  Our experienced agronomists provide tailored advice on crop rotation,
                  pest management, soil fertility, and best farming practices to maximize your yield.
                </p>
                <Link
                  to="/services/agricultural-consulting"
                  className="inline-block self-center md:self-start bg-[#EAA221] hover:bg-[#4682B4] text-[#2F4F4F] hover:text-[#FFFFF0] font-bold py-2 px-6 rounded-full shadow transition duration-300 ease-in-out transform hover:scale-105 text-md"
                >
                  Learn More
                </Link>
              </div>
              <div className="md:w-1/3 w-full h-60 md:h-auto overflow-hidden">
                <img
                  src={AgriculturalConsultingImage} // Use your actual image here
                  alt="Agricultural Consulting"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Service Card 3: Farm Equipment Rentals */}
            <div className="bg-[#FFFFF0] rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row items-center animate-fadeInUp" style={{ animationDelay: '2.2s' }}>
              <div className="md:w-1/3 w-full h-60 md:h-auto overflow-hidden">
                <img
                  src={FarmEquipmentRentalImage} // Use your actual image here
                  alt="Farm Equipment Rentals"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="md:w-2/3 w-full p-6 text-center md:text-left flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-[#4682B4] mb-3">Farm Equipment Rentals</h3>
                <p className="text-lg text-[#2F4F4F] leading-relaxed mb-4">
                  Access a wide range of modern, well-maintained farm machinery,
                  available for rent to help you execute farming tasks efficiently and cost-effectively.
                </p>
                <Link
                  to="/services/equipment-rentals"
                  className="inline-block self-center md:self-start bg-[#EAA221] hover:bg-[#4682B4] text-[#2F4F4F] hover:text-[#FFFFF0] font-bold py-2 px-6 rounded-full shadow transition duration-300 ease-in-out transform hover:scale-105 text-md"
                >
                  Learn More
                </Link>
              </div>
            </div>

            {/* Service Card 4: Training Workshops */}
            <div className="bg-[#FFFFF0] rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row items-center animate-fadeInUp" style={{ animationDelay: '2.4s' }}>
              <div className="md:w-2/3 w-full p-6 text-center md:text-left flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-[#4682B4] mb-3">Training Workshops</h3>
                <p className="text-lg text-[#2F4F4F] leading-relaxed mb-4">
                  We conduct regular workshops and seminars to educate farmers on modern agricultural
                  techniques, pest control, irrigation, and post-harvest management.
                </p>
                <Link
                  to="/services/training-workshops"
                  className="inline-block self-center md:self-start bg-[#EAA221] hover:bg-[#4682B4] text-[#2F4F4F] hover:text-[#FFFFF0] font-bold py-2 px-6 rounded-full shadow transition duration-300 ease-in-out transform hover:scale-105 text-md"
                >
                  Learn More
                </Link>
              </div>
              <div className="md:w-1/3 w-full h-60 md:h-auto overflow-hidden">
                <img
                  src={TrainingWorkshopImage} // Use your actual image here
                  alt="Training Workshops"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Service Card 5: Logistics & Distribution */}
            <div className="bg-[#FFFFF0] rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row items-center animate-fadeInUp" style={{ animationDelay: '2.6s' }}>
              <div className="md:w-1/3 w-full h-60 md:h-auto overflow-hidden">
                <img
                  src={LogisticsDistributionImage} // Use your actual image here
                  alt="Logistics & Distribution"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="md:w-2/3 w-full p-6 text-center md:text-left flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-[#4682B4] mb-3">Logistics & Distribution</h3>
                <p className="text-lg text-[#2F4F4F] leading-relaxed mb-4">
                  Ensuring timely and efficient delivery of our palm oil products from the farm to your
                  market or facility, maintaining quality throughout the supply chain.
                </p>
                <Link
                  to="/services/logistics-distribution"
                  className="inline-block self-center md:self-start bg-[#EAA221] hover:bg-[#4682B4] text-[#2F4F4F] hover:text-[#FFFFF0] font-bold py-2 px-6 rounded-full shadow transition duration-300 ease-in-out transform hover:scale-105 text-md"
                >
                  Learn More
                </Link>
              </div>
            </div>

            {/* Service Card 6: Agricultural Research Support */}
            <div className="bg-[#FFFFF0] rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row items-center animate-fadeInUp" style={{ animationDelay: '2.8s' }}>
              <div className="md:w-2/3 w-full p-6 text-center md:text-left flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-[#4682B4] mb-3">Agricultural Research Support</h3>
                <p className="text-lg text-[#2F4F4F] leading-relaxed mb-4">
                  We actively support and collaborate on agricultural research initiatives aimed at
                  developing new crop varieties, improving farming techniques, and enhancing sustainability.
                </p>
                <Link
                  to="/services/research-support"
                  className="inline-block self-center md:self-start bg-[#EAA221] hover:bg-[#4682B4] text-[#2F4F4F] hover:text-[#FFFFF0] font-bold py-2 px-6 rounded-full shadow transition duration-300 ease-in-out transform hover:scale-105 text-md"
                >
                  Learn More
                </Link>
              </div>
              <div className="md:w-1/3 w-full h-60 md:h-auto overflow-hidden">
                <img
                  src={ResearchSupportImage} // Use your actual image here
                  alt="Agricultural Research Support"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Testimonial/Call to Action Section */}
      <section className="py-16 md:py-24 bg-[#8A3324] text-[#FFFFF0] animate-fadeIn" style={{ animationDelay: '3.0s' }}>
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 animate-popIn">Join the Nananom Farms Family</h2>
          <p className="text-lg leading-relaxed mb-8 animate-fadeInUp" style={{ animationDelay: '3.2s' }}>
            Become a part of our growing community committed to quality, sustainability, and agricultural excellence.
          </p>
          <Link
            to="/register"
            className="inline-block bg-[#FFFFF0] text-[#8A3324] hover:bg-[#F2F4F5] font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 text-lg animate-bounceIn" style={{ animationDelay: '3.4s' }}
          >
            Register Today
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;