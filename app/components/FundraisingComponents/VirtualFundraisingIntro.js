import React from 'react';
import Image from 'next/image';
import heroFundraiser from '../../../public/groupImage.webp'
const VirtualFundraisingIntro = () => {
  return (
    <section className="pb-16  pt-20 lg:pt-34 2xl:pt-35 lg:pb-0 lg:pl-4 bg-gradient-to-br from-yellow-100 via-yellow-50 to-white">
      <div className="w-full max-w-7xl mx-auto  ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="order-2 lg:order-1 px-4 lg:px-0 lg:pt-10">
            {/* Small Header */}
            <div className="mb-6">
              <p className="sub_heading text-black uppercase tracking-widest">
                What Is Virtual Fundraising
              </p>
            </div>

            {/* Main Heading */}
            <h1 className="main_heading font-splash text-black leading-tight tracking-tight uppercase mb-8">
              <span className="block mb-2">The Smart, Simple</span>
              <span className="block mb-2">and Most Profitable Way</span>
              <span className="block">to Fundraise Online</span>
            </h1>

            {/* Description */}
            <div className="mb-10">
              <p className="main_description text-black leading-relaxed font-normal">
                Popcorn World makes fundraising easier than ever. Our 100% virtual platform
                empowers schools, sports teams, and community groups to launch effortless
                online fundraisers that reach more supporters, raise more money, and deliver
                real results — all in just four days. No product handling, no fees, no stress —
                just fast, fun and high-profit fundraising.
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