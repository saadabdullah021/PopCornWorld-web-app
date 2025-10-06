import React from 'react';
import Image from 'next/image';
import heroFundraiser from '../../../public/groupImage.jpg'
const VirtualFundraisingIntro = () => {
  return (
    <section className="pb-16  pt-20 lg:pt-34 2xl:pt-35 lg:pb-0 lg:pl-4 bg-gradient-to-br from-yellow-100 via-yellow-50 to-white">
      <div className="w-full lg:pl-4 ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="order-2 lg:order-1 px-4 lg:px-0 lg:pt-10">
            {/* Small Header */}
            <div className="mb-6">
              <p className="sub_heading text-black uppercase tracking-widest">
                What is Virtual Fundraising
              </p>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl  md:text-4xl lg:text-5xl font-splash text-black leading-tight tracking-tight uppercase mb-8">
              <span className="block mb-2">Virtually the</span>
              <span className="block mb-2">easiest way to</span>
              <span className="block">fundraise—ever</span>
            </h1>

            {/* Description */}
            <div className="mb-10">
              <p className="text-lg  md:text-xl text-gray-700 leading-relaxed font-normal">
                The Popcorn World platform helps kids' teams, clubs, and other groups run hands-off digital fundraisers to make mind-blowing returns in just four days.
              </p>
            </div>

   


          </div>

          {/* Right Image */}
          <div className="order-1 lg:order-2">
            <div className="relative w-full h-80 md:h-96 lg:h-[450px] overflow-hidden shadow-2xl">
              <Image
                src={heroFundraiser}
                alt="Organized warehouse with shelves of various popcorn flavors and products for virtual fundraising"
                fill
                className="object-center object-fill"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />
              
              {/* Optional gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
              
          
            </div>
          </div>
        </div>

 
      </div>
    </section>
  );
};

export default VirtualFundraisingIntro;