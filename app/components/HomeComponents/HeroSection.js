import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import mainImage from '../../../public/mainImage.webp'
import leftImage from '../../../public/leftImage.webp'
import rightImage from '../../../public/rightImage.webp'

import logo from '../../../public/fundraiserLogo.webp'

const HeroSection = () => {
  return (
    <section className="relative  pb-2 pt-20 lg:pt-32 bg-white overflow-hidden">


      {/* Header Text Section */}
      <div
        className="relative text-center pt-32 lg:pt-56 lg:pb-56 2xl:pb-96 2xl:pt-96 pb-32  bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/hero-Image.webp')" }}
      >

        {/* Overlay (optional for dark shade on image) */}
        <div className="absolute inset-0 bg-black/10"></div>
        {/* Content */}

        <div className='absolute left-[25%] top-9   '>
          {/* <Link href="/" className="group flex items-center transform transition-all duration-300">
                                <Image
                                    src={logo}
                                    alt="popcorn world"
                                    className={`transition-all object-contain duration-300 w-full ease-in-out h-8 md:h-12 group-hover:brightness-110 bg-blend-overlay`}
                                />
                            </Link> */}
        </div>
        <div className="relative z-10">
          <h1 className="text-[42px]  uppercase leading-12 lg:leading-none  lg:text-[56px] font-splash text-white  mb-12 tracking-tight animate-fadeInUp">
            <span style={{ color: "oklch(85.2% 0.199 91.936)" }}> Fundraising </span>  <span className="text-white">
            HAS   never tasted
              <br />
              so good
            </span>
            {/* <span className="!text-white">Best Products</span> */}
          </h1>
          <Link href='/get-started' className="group inline-flex items-center capitalize gap-3 px-6 py-3 border-2   font-medium rounded-full bg-[#8BC34A] cursor-pointer text-white border-transparent transition-all duration-300 animate-fadeInUp">
            Start Fundraising
          </Link>
        </div>
      </div>


      <div className="container max-w-full mx-auto px-4 lg:px-0 relative z-20">



        {/* Images Section */}
        {/* <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-5 xl:gap-10 2xl:gap-6  mt-6 lg:mt-12 relative z-30">
        
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

          <div className=" group animate-fadeInUp">
            <div className="relative w-90 sm:w-[400px] lg:w-[500px] xl:w-[650px] xl:h-[460px] 2xl:w-[800px] h-84 2xl:h-[600px] rounded overflow-hidden shadow-2xl transform  transition-transform duration-500">
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

      
          <div className="relative group animate-fadeInRight">
            <div className=" w-62 h-80 lg:w-48 lg:h-60 xl:w-64 xl:h-80 2xl:w-85 2xl:h-120   rounded-br-full rounded-tr-full rounded-bl-full overflow-hidden shadow-2xl transform  transition-transform duration-500">
              <Image
                src={rightImage}
                alt="Happy team members"
                className="w-full h-full object-cover object-center"
              />
            </div>

          </div>
        </div> */}


      </div>


    </section>
  );
};

export default HeroSection;