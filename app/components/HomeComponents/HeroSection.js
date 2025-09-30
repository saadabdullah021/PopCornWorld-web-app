import Link from 'next/link';
import React from 'react';
import { FaArrowRight } from "react-icons/fa";


const HeroSection = () => {
  return (
    <section className="relative min-h-screen pb-12 pt-20 lg:pt-32 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">


             {/* Header Text Section */}
        <div
          className="relative text-center pt-24 lg:pt-36 lg:pb-36 2xl:pb-48 2xl:pt-72 pb-20 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/heroImage.jpeg')" }}
        >

          {/* Overlay (optional for dark shade on image) */}
          <div className="absolute inset-0 bg-black/30"></div>
          {/* Content */}
          <div className="relative z-10">
            <span className="inline-block text-lg font-bold text-[#ffc222] mb-6 animate-fadeInUp">
              Crowdfunding Agency
            </span>

            <h1 className="main_heading font-splash text-white leading-none mb-12 tracking-tight animate-fadeInUp">
              Raise Hand to Promote <br />
              <span className="text-gray-200">Best Products</span>
            </h1>

            <Link href='/shop' className="group inline-flex items-center gap-3 px-6 py-3 border-2   font-medium rounded-full bg-[#8BC34A] cursor-pointer text-white border-transparent transition-all duration-300 animate-fadeInUp">
         Order Now
            
            </Link>
          </div>
        </div>
      

      <div className="container max-w-full mx-auto px-4 lg:px-0 relative z-20">
 


        {/* Images Section */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-5 xl:gap-10 2xl:gap-6  mt-6 lg:mt-12 relative z-30">
          {/* Left Image */}
          <div className="relative group animate-fadeInLeft">
            <div className=" w-62 h-80  lg:w-48 lg:h-60 xl:w-64 xl:h-80 2xl:w-85 2xl:h-120  rounded-bl-full rounded-tr-full rounded-tl-full   overflow-hidden shadow-2xl transform  transition-transform duration-500">
              <img
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Professional working"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Custom corner cut for left image */}
            <div className="absolute bottom-0 right-0 w-12 h-12 bg-yellow-200 rounded-tl-full"></div>
          </div>

          {/* Center Main Image */}
          <div className="relative group animate-fadeInUp">
            <div className="w-full lg:w-[500px] xl:w-[650px] xl:h-[460px] 2xl:w-[800px] h-84 2xl:h-[600px] rounded overflow-hidden shadow-2xl transform  transition-transform duration-500">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Team collaboration"
                className="w-full h-full object-cover object-center"
              />
            </div>

          </div>

          {/* Right Image */}
          <div className="relative group animate-fadeInRight">
            <div className=" w-62 h-80 lg:w-48 lg:h-60 xl:w-64 xl:h-80 2xl:w-85 2xl:h-120   rounded-br-full rounded-tr-full rounded-bl-full overflow-hidden shadow-2xl transform  transition-transform duration-500">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Happy team members"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Custom corner cut for right image */}
            <div className="absolute top-0 left-0 w-12 h-12 bg-yellow-200 rounded-br-full"></div>
          </div>
        </div>


      </div>


    </section>
  );
};

export default HeroSection;