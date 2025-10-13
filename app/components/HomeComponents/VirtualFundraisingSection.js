'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import groupImage from '../../../public/groupImage.webp'
import threepersonImage from '../../../public/threepersonImage.webp'
import process1 from '../../../public/process1.webp'
import process2 from '../../../public/process2.webp'
import blackBoyImage from '../../../public/blackBoyImage.webp'
import blueImage from '../../../public/blueImage.webp'



import VideoPlayer from '../ui/VideoPlayer';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import Link from 'next/link';
const VirtualFundraisingSection = () => {

  const features = [
    {
      id: 1,
      title: "Host a 100% Virtual 4-Day Fundraiser",
      description: "Run a fully online, four-day fundraiser that drives more participation, saves time, and lets your supporters contribute from anywhere.",
      image: groupImage,
      alt: "Group planning a 100% virtual online fundraising event"
    },
    {
      id: 2,
      title: "Fast, Direct Shipping to Every Supporter",
      description: "Skip the stress of handling orders. We ship every product straight to your supporters — no cash collection or deliveries required.",
      image: process1,
      alt: "Fundraising products being packed for direct delivery to supporters"
    },
    {
      id: 3,
      title: "Earn 50% Profit — No Fees, No Minimums",
      description: "Enjoy a simple fundraising model with zero setup costs and no minimum sales required. Keep 50% of every sale you make — guaranteed.",
      image: blueImage,
      alt: "Fundraising product display highlighting 50% profit and no fees"
    },
    {
      id: 4,
      title: "Zero Fees. Unlimited Earnings.",
      description: "Maximize your fundraising success with zero fees, no limits, and instant payouts. Every sale supports your cause — effortlessly.",
      image: blackBoyImage,
      alt: "Supporter celebrating successful zero-fee fundraising campaign"
    }

  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="main_heading font-splash text-black mb-8 tracking-tight uppercase">
            Virtual Fundraising is Easy
          </h2>
        </div>


        {/* Swiper Slider */}
        <Swiper
          modules={[Autoplay, Pagination]}
          // Default mobile view (1 card)
          slidesPerView={1}
          spaceBetween={20}
          loop={true}
          speed={900}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          pagination={{ clickable: true }}

          // ✅ Responsive breakpoints
          breakpoints={{
            // Mobile: < 640px → 1 card (default already set above)
            640: { slidesPerView: 1 }, // ✅ small mobile screens

            // Tablet: ≥768px → 2 cards
            768: { slidesPerView: 2 }, // ✅ tablet screens

            // Desktop: ≥1024px → 4 cards
            1024: { slidesPerView: 3 }, // ✅ desktop screens
          }}
          className="py-14"
        >
          {features.map((feature) => (
            <SwiperSlide key={feature.id}>
              <div className="group text-center pb-12 px-2">
                {/* Image Container */}
                <div className="relative w-full h-48 md:h-56 lg:h-64 rounded-2xl overflow-hidden mb-6 shadow-lg group-hover:shadow-2xl transition-all duration-500 transform ">
                  <Image
                    src={feature.image || '/pop_packet.png'}
                    alt={feature.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                    className="object-fill object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                    priority={feature.id === 1}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/..."
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="text-center w-full">
                  <h3 className="sub_heading text-black mb-2 text-center transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-black main_description">
                    {feature.description}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* ✅ Pagination container outside swiper (below cards) */}
        <div className="custom-pagination mt-6 flex justify-center" />



        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Content */}
          <div className="order-2 lg:order-1">
            <h3 className="text-[22px] md:text-[30px] leading-9 lg:text-[36px]  font-splash text-black mb-6">
              Fundraising Made Simple and Rewarding
            </h3>
            <p className="text-black main_description mb-8 leading-relaxed">
              Enjoy effortless fundraising with zero setup costs, no hidden fees, and no product handling.
              Earn 50% profit on every sale through the Popcorn World app transparent, easy and rewarding.
            </p>


            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href='/get-started' className="group btn-primary transition-all text-center justify-center duration-300 animate-fadeInUp">
                Get Started
              </Link>
            </div>
          </div>

          {/* Right Video Section */}

          <div className="order-1 lg:order-2">
            <VideoPlayer />
          </div>
        </div>


      </div>
    </section>
  );
};

export default VirtualFundraisingSection;