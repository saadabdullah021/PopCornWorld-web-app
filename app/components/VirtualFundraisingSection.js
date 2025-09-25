'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import girl_team from '../../public/Girls_team.jpg'
import ReactPlayer from "react-player";
import { FaArrowRight } from 'react-icons/fa';
const VirtualFundraisingSection = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-8 tracking-tight uppercase">
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
              <div className="max-w-xs mx-auto">
                <h3 className="text-lg md:text-xl font-semibold text-black mb-4  transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-700 text-sm md:text-base leading-relaxed">
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
            <h3 className="text-3xl md:text-4xl font-bold text-black mb-6">
              Fundraising with Quality
            </h3>
            <p className="text-gray-700 text-lg mb-8 leading-relaxed">
              There are no set-up fees. No product handling fees. No extra fees ever. For
              every dollar you sell through the Popcorn World app, you keep 50%.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group inline-flex items-center gap-3 px-8 py-4  text-white font-medium rounded-full bg-[#8BC34A]  hover:border-transparent transition-all duration-300 animate-fadeInUp">
                Get Started
                <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button className="inline-flex items-center justify-center px-8 py-4 bg-transparent hover:bg-white/50 text-black font-semibold rounded-full border-2 border-[#ffc222] transition-all duration-300 hover:shadow-lg">
                Learn More
              </button>
            </div>
          </div>

          {/* Right Video Section */}
          {/* Right Video Section */}
          <div className="order-1 lg:order-2">
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl bg-gray-900">

              {/* Agar video load ho gaya to YouTube player */}
              {isVideoLoaded ? (
                <ReactPlayer
                  url="https://www.youtube.com/watch?v=dQw4w9WgXcQ" // ✅ Apni YouTube link yahan dal do
                  width="100%"
                  height="100%"
                  controls={true}
                  playing={true}
                  className="absolute top-0 left-0 rounded-2xl overflow-hidden"
                />
              ) : (
                // Thumbnail + Play Button Overlay
                <div
                  className="absolute inset-0 cursor-pointer group"
                  onClick={() => setIsVideoLoaded(true)}
                >
                  <Image
                    src="/images/popcorn-video-thumbnail.jpg"
                    alt="Gourmet popcorn video thumbnail"
                    fill
                    className="object-cover"
                  />

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300 backdrop-blur-sm">
                      <svg className="w-8 h-8 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>

                  {/* Video Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <h4 className="text-white font-bold text-lg mb-1">
                      50 Flavors of Gourmet Popcorn
                    </h4>
                    <p className="text-white/80 text-sm flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                      Watch on YouTube
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>


      </div>
    </section>
  );
};

export default VirtualFundraisingSection;