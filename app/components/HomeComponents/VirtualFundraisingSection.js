'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import groupImage from '../../../public/groupImage.jpg'
import threepersonImage from '../../../public/threepersonImage.jpg'
import process1 from '../../../public/process1.jpg'
import process2 from '../../../public/process2.jpg'
import blackBoyImage from '../../../public/blackBoyImage.jpg'
import blueImage from '../../../public/blueImage.jpg'



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
      title: "100% virtual, 4 day fundraiser",
      description: "4 day fundraisers maximize engagement and let you fundraise from anywhere.",
      image: groupImage,
      alt: "Warehouse with organized inventory for virtual fundraising"
    },
    {
      id: 2,
      title: "Shipped directly to your supporters",
      description: "You never handle cash, never distribute product.",
      image: process1,
      alt: "Products being shipped directly to supporters"
    },
    {
      id: 3,
      title: "No fees or minimums, ever",
      description: "Keep 50% of what you sell, with payments sent to you.",
      image: process2,
      alt: "Colorful product display showing no fees policy"
    },
    {
      id: 4,
      title: "No fees or minimums, ever",
      description: "Keep 50% of what you sell, with payments sent to you.",
      image: threepersonImage,
      alt: "Colorful product display showing no fees policy"
    }
    , {
      id: 5,
      title: "No fees or minimums, ever",
      description: "Keep 50% of what you sell, with payments sent to you.",
      image: blackBoyImage,
      alt: "Colorful product display showing no fees policy"
    }
    , {
      id: 6,
      title: "No fees or minimums, ever",
      description: "Keep 50% of what you sell, with payments sent to you.",
      image: blueImage,
      alt: "Colorful product display showing no fees policy"
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
                    src={feature.image ||'/pop_packet.png'}
                    alt={feature.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                    className="object-fill object-center group-hover:scale-101 transition-transform duration-700 ease-out"
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
            <h3 className="text-3xl md:text-[36px] font-bold font-splash  text-black mb-6">
              Fundraising with Quality
            </h3>
            <p className="text-black main_description mb-8 leading-relaxed">
              There are no set-up fees. No product handling fees. No extra fees ever. For
              every dollar you sell through the Popcorn World app, you keep 50%.
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