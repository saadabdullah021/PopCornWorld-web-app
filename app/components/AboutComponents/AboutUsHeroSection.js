'use client'
import React, { useEffect } from 'react';
import Image from 'next/image';
import heroImage from '../../../public/about_us_hero.webp'
import { Sparkles, ChevronDown } from 'lucide-react';
import { useState } from 'react';
const AboutUsHeroSection = () => {
    const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);
  return (

     <section className="relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      {/* Main Content */}
      <div className="relative bg-gray-50 text-black pt-24 lg:pt-40  px-4">
        <div className="max-w-7xl mx-auto text-center">
          
          {/* Decorative About Us Badge */}
          <div className={`flex justify-center mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <Sparkles className="w-5 h-5 text-[#8bc34a] animate-pulse" />
              <span className="text-sm font-bold tracking-widest uppercase text-gray-800">
                About Us
              </span>
              <Sparkles className="w-5 h-5 text-[#8bc34a] animate-pulse" />
            </div>
          </div>

          {/* Main Heading with Staggered Animation */}
          <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="main_heading font-splash leading-tight tracking-tight uppercase mb-8 mt-5">
              <span className="inline-block animate-fadeInUp">Doing the World </span>
              <span className="inline-block animate-fadeInUp animation-delay-300">a Flavor</span>
            </h1>
          </div>

          {/* Description with Enhanced Styling */}
          <div className={`max-w-7xl mx-auto transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <p className="main_description leading-relaxed font-light text-gray-800">
              We believe fundraising should do more than raise money — it should bring people together. 
              That's why Popcorn World gives{' '}
              <span className="relative inline-block font-bold text-[#8bc34a]">
                50% of every sale
                <svg className="absolute -bottom-1 left-0 w-full" height="4" viewBox="0 0 100 4" preserveAspectRatio="none">
                  <path d="M0,2 Q25,0 50,2 T100,2" stroke="currentColor" strokeWidth="3" fill="none" className="text-[#8bc34a]" />
                </svg>
              </span>
              {' '}to schools and youth organizations building brighter futures.
            </p>
          </div>


          {/* Scroll Indicator */}
          <div className="mt-16 animate-bounce">
            <ChevronDown className="w-8 h-8 mx-auto text-[#8bc34a] opacity-70" />
          </div>
        </div>
      </div>

    </section>
  );
};

export default AboutUsHeroSection;