import React from 'react';
import { FaArrowRight } from "react-icons/fa";


const HeroSection = () => {
  return (
    <section className="relative min-h-screen py-12 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-12 w-32 h-32 border-2 border-gray-400 rounded-full"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border-2 border-gray-400 rounded-full"></div>
        <div className="absolute bottom-32 left-1/4 w-16 h-16 border-2 border-gray-400 rounded-full"></div>
      </div>

      {/* Decorative Dots */}
      <div className="hidden md:absolute top-1/3 left-1/4 w-6 h-6 border-4 border-green-400 rounded-full bg-transparent z-10"></div>
      <div className="hidden md:absolute top-1/4 right-1/4 w-6 h-6 border-4 border-gray-400 rounded-full bg-transparent z-10"></div>

      <div className="container mx-auto px-4 relative z-20">
 {/* Header Text Section */}
<div
  className="relative text-center pt-32 pb-20 bg-cover bg-center bg-no-repeat"
  style={{ backgroundImage: "url('/heroImage.jpeg')" }} 
>

  {/* Overlay (optional for dark shade on image) */}
  <div className="absolute inset-0 bg-black/30"></div>
  {/* Content */}
  <div className="relative z-10">
    <span className="inline-block text-lg font-bold text-[#ffc222] mb-6 animate-fadeInUp">
      Crowdfunding Agency
    </span>

    <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white leading-none mb-12 tracking-tight animate-fadeInUp">
      Raise Hand to Promote <br />
      <span className="text-gray-200">Best Products</span>
    </h1>

    <button className="group inline-flex items-center gap-3 px-8 py-4 border-2 border-[#8BC34A] bg-transparent hover:text-white font-semibold rounded-full hover:bg-[#8BC34A] text-white hover:border-transparent transition-all duration-300 animate-fadeInUp">
      Explore Projects
      <FaArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
    </button>
  </div>
</div>


        {/* Images Section */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 px-8 mt-6 lg:mt-12 relative z-30">
          {/* Left Image */}
          <div className="relative group animate-fadeInLeft">
            <div className="w-64 h-80 rounded-r-full overflow-hidden shadow-2xl transform rotate-3 group-hover:rotate-2 transition-transform duration-500">
              <img
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Professional working"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Custom corner cut for left image */}
            <div className="absolute bottom-0 right-0 w-12 h-12 bg-gray-200 rounded-tl-full"></div>
          </div>

          {/* Center Main Image */}
          <div className="relative group animate-fadeInUp">
            <div className="w-[500px] h-72 rounded overflow-hidden shadow-2xl transform  transition-transform duration-500">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Team collaboration"
                className="w-full h-full object-cover"
              />
            </div>
            
          </div>

          {/* Right Image */}
          <div className="relative group animate-fadeInRight">
            <div className="w-64 h-80 rounded-l-full overflow-hidden shadow-2xl transform -rotate-2 group-hover:-rotate-3 transition-transform duration-500">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Happy team members"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Custom corner cut for right image */}
            <div className="absolute top-0 left-0 w-12 h-12 bg-gray-200 rounded-br-full"></div>
          </div>
        </div>

    
      </div>

     
    </section>
  );
};

export default HeroSection;