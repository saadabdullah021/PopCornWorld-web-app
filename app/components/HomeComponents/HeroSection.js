import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import mainImage from '../../../public/mainImage.jpg'
import leftImage from '../../../public/leftImage.jpg'
import rightImage from '../../../public/rightImage.jpg'


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
            Shop Now

          </Link>
        </div>
      </div>


      <div className="container max-w-full mx-auto px-4 lg:px-0 relative z-20">



        {/* Images Section */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-5 xl:gap-10 2xl:gap-6  mt-6 lg:mt-12 relative z-30">
          {/* Left Image */}
          <div className="relative group animate-fadeInLeft">
            <div className=" w-62 h-80  lg:w-48 lg:h-60 xl:w-64 xl:h-80 2xl:w-85 2xl:h-120  rounded-bl-full rounded-tr-full rounded-tl-full   overflow-hidden shadow-2xl transform  transition-transform duration-500">
              <Image
                src={leftImage}
                alt="Professional working"

                loading='lazy'
                className="w-full h-full object-cover object-center"
              />
            </div>

          </div>

          {/* Center Main Image */}
          <div className=" group animate-fadeInUp">
            <div className="relative w-full lg:w-[500px] xl:w-[650px] xl:h-[460px] 2xl:w-[800px] h-84 2xl:h-[600px] rounded overflow-hidden shadow-2xl transform  transition-transform duration-500">
              <Image
                src={mainImage}
                alt="Team collaboration"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 650px"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
            </div>

          </div>

          {/* Right Image */}
          <div className="relative group animate-fadeInRight">
            <div className=" w-62 h-80 lg:w-48 lg:h-60 xl:w-64 xl:h-80 2xl:w-85 2xl:h-120   rounded-br-full rounded-tr-full rounded-bl-full overflow-hidden shadow-2xl transform  transition-transform duration-500">
              <Image
                src={rightImage}
                alt="Happy team members"
                className="w-full h-full object-cover object-center"
              />
            </div>

          </div>
        </div>


      </div>


    </section>
  );
};

export default HeroSection;