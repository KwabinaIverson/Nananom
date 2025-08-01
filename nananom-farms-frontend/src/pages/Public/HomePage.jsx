// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Sustainability from '../../assets/images/sustainabilty.jpeg'
import Quality from '../../assets/images/Quality.png';
import Community from '../../assets/images/Community.png'
import Hero from '../../assets/images/hero.jpeg';
import About from '../../assets/images/about.png'

const Home = () => {
  return (
    <div className="min-h-screen bg-[#DAD7CD] font-sans"> {/* Soft Clay background */}
      {/* Hero Section */}
<section
  className="relative bg-cover bg-center bg-no-repeat py-20 md:py-32 lg:py-48 text-white flex items-center justify-center animate-fadeIn"
  style={{ backgroundImage: `url(${Hero})` }}
>
  {/* Frosty Glass Overlay */}
  <div className="absolute inset-0 bg-black/30 backdrop-blur-md backdrop-saturate-150"></div>

  <div className="relative container mx-auto p-4 text-center z-10">
    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 leading-tight animate-popIn">
      Nananom Farms: Empowering Sustainable Agriculture
    </h1>
    <p className="text-lg sm:text-xl md:text-2xl mb-8 max-w-3xl mx-auto animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
      Your trusted partner for <strong>premium palm oil products</strong> and <strong>innovative agricultural solutions</strong> in Ghana.
    </p>
    <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
      <Link
        to="/services"
        className="bg-[#FFB703] hover:bg-[#25A244] text-[#2F2F2F] hover:text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 text-lg"
      >
        Explore Our Services
      </Link>
      <Link
        to="/enquiries"
        className="bg-[#25A244] hover:bg-[#FFB703] text-white hover:text-[#2F2F2F] font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 text-lg"
      >
        Get In Touch
      </Link>
    </div>
  </div>
</section>


{/* About Us Section - Modified to match image layout */}
<section className="py-16 md:py-24 bg-[#DAD7CD] animate-fadeIn" style={{ animationDelay: '0.6s' }}> {/* Soft Clay background */}
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
      <h2 className="text-3xl sm:text-4xl font-bold text-[#25A244] mb-6">Our Mission & Values</h2> {/* Primary Green heading */}
      <p className="text-lg text-[#2F2F2F] leading-relaxed mb-8"> {/* Dark Charcoal text */}
        At <strong>Nananom Farms</strong>, we're more than just a farm; we're a <strong>commitment to sustainable agriculture</strong> and <strong>community empowerment</strong> in Ghana. We cultivate high-quality palm oil products while nurturing local farming communities with knowledge and resources, driving both food security and economic growth. Our vision is a future where agriculture flourishes in harmony with nature, enriching lives and the land.
      </p>
      <Link
        to="/about"
        className="inline-block bg-[#FFB703] hover:bg-[#25A244] text-[#2F2F2F] hover:text-[#FFFFFF] font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 text-lg" // Golden Wheat button, Primary Green hover, Dark Charcoal text, Pure White hover text
      >
        Learn More About Us
      </Link>
    </div>
  </div>

  {/* New Blending Image Section for Values */}
  <div className="container mx-auto px-4 mt-16">
  <h3 className="text-2xl sm:text-3xl font-bold text-[#25A244] text-center mb-10 animate-slideInDown">
    Our Core Values
  </h3>
  <div className="flex flex-col md:flex-row justify-center items-stretch gap-4 md:gap-0 overflow-hidden">

    {/* Card Template */}
    {[
      {
        title: "Sustainability",
        image: Sustainability,
        description: "Committed to eco-friendly farming and responsible resource management.",
        delay: "1.0s",
      },
      {
        title: "Quality",
        image: Quality,
        description: "Delivering only the finest palm oil products to our customers.",
        delay: "1.2s",
      },
      {
        title: "Community",
        image: Community,
        description: "Empowering local farmers and contributing to regional food security.",
        delay: "1.4s",
      },
    ].map((value) => (
      <div
        key={value.title}
        className="relative group w-full md:w-1/3 h-64 md:h-96 overflow-hidden animate-fadeIn"
        style={{ animationDelay: value.delay }}
      >
        {/* Slightly Blurred Image */}
        <img
          src={value.image}
          alt={value.title}
          className="w-full h-full object-cover filter blur-[2px] brightness-95 transition-transform duration-500 ease-in-out group-hover:scale-105"
        />

        {/* Glassy Overlay */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm backdrop-saturate-150 flex flex-col justify-center items-center p-4">
          <h4 className="text-white text-2xl font-bold mb-2">{value.title}</h4>
          <p className="text-white text-lg text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {value.description}
          </p>
        </div>

        {/* Golden Wheat Accent */}
        <div className="absolute inset-0 bg-[#FFB703] opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
      </div>
    ))}
  </div>
</div>

</section>
      {/* Main Services Grid */}
      <section className="py-16 md:py-24 bg-[#DAD7CD]"> {/* Soft Clay background */}
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#086920] text-center mb-12 animate-slideInDown" style={{ animationDelay: '1.6s' }}> {/* Primary Green heading */}
            Our Core Offerings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service Card 1: Premium Palm Oil Products */}
            <div className="bg-[#FFFFFF] p-6 rounded-lg shadow-md border border-[#FFB703] hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center animate-fadeInUp" style={{ animationDelay: '1.8s' }}> {/* Pure White background, Golden Wheat border */}
              <div className="bg-[#086920] p-3 rounded-full inline-block mb-4"> {/* Primary Green background */}
                <svg className="w-10 h-10 text-[#FFFFFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2-2m-2 2l-2 2M12 8l-2 2m2-2l2 2M12 18h.01M12 12h.01M12 6h.01M6 12h.01M18 12h.01"></path></svg> {/* Pure White icon */}
              </div>
              <h3 className="text-xl font-semibold text-[#086920] mb-3">Premium Palm Oil Products</h3> {/* Primary Green heading */}
              <p className="text-[#2F2F2F]"> {/* Dark Charcoal text */}
                We produce and supply high-quality palm oil, extracted and processed using
                sustainable methods to ensure purity, richness, and compliance with global standards.
              </p>
            </div>

            {/* Service Card 2: Agricultural Consulting */}
            <div className="bg-[#FFFFFF] p-6 rounded-lg shadow-md border border-[#FFB703] hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center animate-fadeInUp" style={{ animationDelay: '2.0s' }}> {/* Pure White background, Golden Wheat border */}
              <div className="bg-[#086920] p-3 rounded-full inline-block mb-4"> {/* Primary Green background */}
                <svg className="w-10 h-10 text-[#FFFFFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-1.25-3M15 10V5.729a2 2 0 00-2.14-1.956L12 3m-2 2.729V10m-2 2h8m-8 0v8a2 2 0 002 2h4a2 2 0 002-2v-8m-8 0h8"></path></svg> {/* Pure White icon */}
              </div>
              <h3 className="text-xl font-semibold text-[#086920] mb-3">Agricultural Consulting</h3> {/* Primary Green heading */}
              <p className="text-[#2F2F2F]"> {/* Dark Charcoal text */}
                Our experienced agronomists provide tailored advice on crop rotation,
                pest management, soil fertility, and best farming practices to maximize your yield.
              </p>
            </div>

            {/* Service Card 3: Farm Equipment Rentals */}
            <div className="bg-[#FFFFFF] p-6 rounded-lg shadow-md border border-[#FFB703] hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center animate-fadeInUp" style={{ animationDelay: '2.2s' }}> {/* Pure White background, Golden Wheat border */}
              <div className="bg-[#086920] p-3 rounded-full inline-block mb-4"> {/* Primary Green background */}
                <svg className="w-10 h-10 text-[#FFFFFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V6m3 6v.01M18 18a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V6"></path></svg> {/* Pure White icon */}
              </div>
              <h3 className="text-xl font-semibold text-[#086920] mb-3">Farm Equipment Rentals</h3> {/* Primary Green heading */}
              <p className="text-[#2F2F2F]"> {/* Dark Charcoal text */}
                Access a wide range of modern, well-maintained farm machinery,
                available for rent to help you execute farming tasks efficiently and cost-effectively.
              </p>
            </div>

            {/* Service Card 4: Training Workshops */}
            <div className="bg-[#FFFFFF] p-6 rounded-lg shadow-md border border-[#FFB703] hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center animate-fadeInUp" style={{ animationDelay: '2.4s' }}> {/* Pure White background, Golden Wheat border */}
              <div className="bg-[#086920] p-3 rounded-full inline-block mb-4"> {/* Primary Green background */}
                <svg className="w-10 h-10 text-[#FFFFFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253M12 6.253c1.168.776 2.754 1.253 4.5 1.253S19.832 7.029 21 6.253m-18 13c1.168.776 2.754 1.253 4.5 1.253s3.332-.477 4.5-1.253m-18 0V9.5m0 0v1.11m0-1.11c0 2.667 3 3.75 3 3.75S7 9.5 7 9.5m7 3.5c0 2.667 3 3.75 3 3.75S17 9.5 17 9.5M3 12a2 2 0 110-4 2 2 0 010 4zm18 0a2 2 0 110-4 2 2 0 010 4zM4.5 19.253V18l.001-.001C5.333 19.012 6.5 20 7.5 20s2.167-.988 3-1.747L12 18v1.253c1.168.776 2.754 1.253 4.5 1.253s3.332-.477 4.5-1.253V18l.001-.001c.833.988 2 1.747 3 1.747s2.167-.988 3-1.747L21 18v1.253"></path></svg> {/* Pure White icon */}
              </div>
              <h3 className="text-xl font-semibold text-[#086920] mb-3">Training Workshops</h3> {/* Primary Green heading */}
              <p className="text-[#2F2F2F]"> {/* Dark Charcoal text */}
                We conduct regular workshops and seminars to educate farmers on modern agricultural
                techniques, pest control, irrigation, and post-harvest management.
              </p>
            </div>

            {/* Service Card 5: Logistics & Distribution */}
            <div className="bg-[#FFFFFF] p-6 rounded-lg shadow-md border border-[#FFB703] hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center animate-fadeInUp" style={{ animationDelay: '2.6s' }}> {/* Pure White background, Golden Wheat border */}
              <div className="bg-[#086920] p-3 rounded-full inline-block mb-4"> {/* Primary Green background */}
                <svg className="w-10 h-10 text-[#FFFFFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10v11m0 0h8m-8 0L9 17m-3 4V3m0 0h8m-8 0L9 7m-3 4v10m6-10V3m0 0h8m-8 0L15 7m-3 4v10m6-10V3m0 0h8m-8 0L21 7"></path></svg> {/* Pure White icon */}
              </div>
              <h3 className="text-xl font-semibold text-[#086920] mb-3">Logistics & Distribution</h3> {/* Primary Green heading */}
              <p className="text-[#2F2F2F]"> {/* Dark Charcoal text */}
                Ensuring timely and efficient delivery of our palm oil products from the farm to your
                market or facility, maintaining quality throughout the supply chain.
              </p>
            </div>

            {/* Service Card 6: Agricultural Research Support */}
            <div className="bg-[#FFFFFF] p-6 rounded-lg shadow-md border border-[#FFB703] hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center animate-fadeInUp" style={{ animationDelay: '2.8s' }}> {/* Pure White background, Golden Wheat border */}
              <div className="bg-[#086920] p-3 rounded-full inline-block mb-4"> {/* Primary Green background */}
                <svg className="w-10 h-10 text-[#FFFFFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a2 2 0 100 4m-3.939 1.579a2 2 0 113.15 1.414L10 14l-1 1-3 3-1 1-3 3"></path></svg> {/* Pure White icon */}
              </div>
              <h3 className="text-xl font-semibold text-[#086920] mb-3">Agricultural Research Support</h3> {/* Primary Green heading */}
              <p className="text-[#2F2F2F]"> {/* Dark Charcoal text */}
                We actively support and collaborate on agricultural research initiatives aimed at
                developing new crop varieties, improving farming techniques, and enhancing sustainability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial/Call to Action Section */}
      <section className="py-16 md:py-24 bg-[#2F2F2F] text-[#FFFFFF] animate-fadeIn" style={{ animationDelay: '3.0s' }}> {/* Dark Charcoal background, Pure White text */}
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 animate-popIn">Join the Nananom Farms Family</h2>
          <p className="text-lg leading-relaxed mb-8 animate-fadeInUp" style={{ animationDelay: '3.2s' }}>
            Become a part of our growing community committed to quality, sustainability, and agricultural excellence.
          </p>
          <Link
            to="/register"
            className="inline-block bg-[#FFFFFF] text-[#086920] hover:bg-[#B7EFC5] font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 text-lg animate-bounceIn" style={{ animationDelay: '3.4s' }} // Pure White button, Primary Green text, Mint Green hover
          >
            Register Today
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;