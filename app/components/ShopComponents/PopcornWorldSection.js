import React from 'react';
import Image from 'next/image';
import dollar_support from '../../../public/dollar-supports-image.webp';
import Link from 'next/link';

const PopcornWorldSection = () => {
  return (
    <section className="bg-[#3333cb]  pt-32 pb-16 lg:pt-48 lg:pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Content Section */}
          <div className="text-white space-y-6 lg:space-y-8">
            {/* Main Heading */}
            <div className="space-y-2 lg:space-y-4">
              <h1 className="text-3xl pb-4  lg:text-5xl  font-splash !text-[#ffc222] leading-none">
                50%
              </h1>
              <h2 className="main_heading lg:!text-[30px] !text-[24px] !leading-10 font-splash uppercase  ">
                <span className="block">OF EVERY DOLLAR SUPPORTS</span>
                <span className="block">OUR POPCORN WORLD</span>
                <span className="block">COMMUNITIES AND</span>
                <span className="block">INNOVATORS</span>
              </h2>
            </div>

            {/* Description */}
            <p className="main_description leading-relaxed max-w-lg">
              Popcorn World always gives back, helping our communities 
              through experiences, education and supporting local needs.
            </p>

            {/* CTA Button */}
            <div className="pt-2">
              <Link href='/get-started' className="group btn-primary  transition-all duration-300 animate-fadeInUp">
                        Get Started
                       
                      </Link>
            </div>
          </div>

          {/* Image Section */}
          <div className="relative">
            <div className="relative aspect-[4/5] lg:aspect-[9/10] w-full max-w-md mx-auto lg:max-w-full">
             
              {/* Main Image Container */}
              <div className="relative rounded-2xl overflow-hidden h-full ">
                
                {/* Person Image */}
                <div className="absolute inset-0 flex items-center justify-center lg:p-6">

                  <div className="relative w-full h-full">
                    <Image
                      src={dollar_support}
                      alt="Happy person holding various popcorn products from Popcorn World"
                      fill
                      className="object-fill object-center rounded-lg"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority
                    />
                    
        
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopcornWorldSection;