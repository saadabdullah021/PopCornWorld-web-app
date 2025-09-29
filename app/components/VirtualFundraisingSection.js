'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import girl_team from '../../public/Girls_team.jpg'
import VideoPlayer from './ui/VideoPlayer';
const VirtualFundraisingSection = () => {

  const features = [
    {
      id: 1,
      title: "100% virtual, 4 day fundraiser",
      description: "4 day fundraisers maximize engagement and let you fundraise from anywhere.",
      image: girl_team,
      alt: "Warehouse with organized inventory for virtual fundraising"
    },
    {
      id: 2,
      title: "Shipped directly to your supporters",
      description: "You never handle cash, never distribute product.",
      image: girl_team,
      alt: "Products being shipped directly to supporters"
    },
    {
      id: 3,
      title: "No fees or minimums, ever",
      description: "Keep 50% of what you sell, with payments sent to you.",
      image: girl_team,
      alt: "Colorful product display showing no fees policy"
    }
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-splash text-black mb-8 tracking-tight uppercase">
            Virtual Fundraising is Easy
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-20">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="group text-center"
            >
              {/* Image Container */}
              <div className="relative w-full h-48 md:h-56 lg:h-64 rounded-2xl overflow-hidden mb-6 shadow-lg group-hover:shadow-2xl transition-all duration-500 transform ">
                <Image
                  src={feature.image}
                  alt={feature.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  priority={feature.id === 1}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content */}
              <div className="text-center w-full">
                <h3 className="text-lg md:text-3xl font-semibold text-black mb-2  transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-900 text-sm md:text-[22px] font-medium ">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Content */}
          <div className="order-2 lg:order-1">
            <h3 className="text-3xl md:text-[40px] font-bold  text-black mb-6">
              Fundraising with Quality
            </h3>
            <p className="text-gray-900 font-medium text-[16px] mb-8 leading-relaxed">
              There are no set-up fees. No product handling fees. No extra fees ever. For
              every dollar you sell through the Popcorn World app, you keep 50%.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group btn-primary transition-all duration-300 animate-fadeInUp">
                Get Started
             
              </button>

            
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