'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import leftImage from '../../../public/leftImage.webp'

import rightImage from '../../../public/rightImage.webp'
import threepersonImage from '../../../public/threepersonImage.webp'
import process1 from '../../../public/process1.webp'
import process2 from '../../../public/process2.webp'
import blackBoyImage from '../../../public/blackBoyImage.webp'
import blueImage from '../../../public/blueImage.webp'


import { ChevronLeft, ChevronRight } from 'lucide-react';
import { LuCrown } from "react-icons/lu";
const SuccessStoriesSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const successStories = [
    {
      id: 1,
      organization: "LAKE CENTRAL HIGH SCHOOL FOOTBALL",
      title: "Enhanced Game-Day Experience",
      description: "For the past three seasons, Popcorn World fundraising has helped us elevate our football program in countless ways. This year, our seniors chose to invest in a custom inflatable tunnel for our pregame entrance — it’s become a highlight of every Friday night game, creating unforgettable excitement for players and fans alike.",
      totalSales: "$56,586",
      sellers: "53",
      image: leftImage,
      alt: "Football team running through inflatable tunnel entrance"
    },
    {
      id: 2,
      organization: "RIVERSIDE ELEMENTARY SCHOOL",
      title: "Playground Transformation Project",
      description: "Our Popcorn World fundraiser brought the whole community together. With the incredible support of parents, teachers, and local businesses, we surpassed our goal and built a brand-new playground that our students will enjoy for years to come. The 4-day online format kept participation high and energy even higher.",
      totalSales: "$42,350",
      sellers: "87",
      image: rightImage,
      alt: "Children playing on new playground equipment"
    },
    {
      id: 3,
      organization: "WESTSIDE BASKETBALL TEAM",
      title: "New Gear and Tournament Travel",
      description: "Popcorn World’s virtual fundraiser made it easy for our basketball team to raise the funds needed for new uniforms and travel to the state championship. Families and supporters loved how effortless the process was — we reached our target faster than ever before.",
      totalSales: "$38,920",
      sellers: "34",
      image: threepersonImage,
      alt: "Basketball team in new uniforms"
    },
    {
      id: 4,
      organization: "HARMONY MIDDLE SCHOOL BAND",
      title: "Modernizing Our Music Program",
      description: "With help from Popcorn World, our band raised enough money to replace aging instruments and buy new music stands. The entire process was simple and stress-free, and the students are now performing better than ever with quality equipment that inspires them to practice and play with pride.",
      totalSales: "$51,200",
      sellers: "76",
      image: blueImage,
      alt: "Students with new musical instruments"
    }

  ];



  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000); // Resume auto-play after 10s
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % successStories.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + successStories.length) % successStories.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <section className="py-16 px-4 bg-yellow-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="main_heading font-splash text-black mb-4 tracking-tight uppercase">
            See what's possible in just 4 days
          </h2>
        </div>

        {/* Slider Container */}
        <div className="relative">
          {/* Main Slider */}
          <div className="relative overflow-hidden rounded-3xl bg-white shadow-2xl">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {successStories.map((story) => (
                <div key={story.id} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
                    {/* Left Content */}
                    <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center order-2 lg:order-1">
                      <div className="max-w-lg">
                        {/* Organization Badge */}
                        <div className="inline-block px-6 py-2 bg-yellow-100 text-black text-sm font-semibold rounded-full mb-6 uppercase tracking-wide">
                          {story.organization}
                        </div>

                        {/* Title */}
                        <h3 className="text-xl md:text-2xl lg:text-3xl font-black text-black mb-6 leading-tight">
                          {story.title}
                        </h3>

                        {/* Description */}
                        <p className="text-black main_description leading-relaxed mb-8">
                          "{story.description}"
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-8">
                          {/* Total Sales */}
                          <div className="flex items-start lg:items-center">
                            <div className="w-8 h-8 md:w-16 md:h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                              <LuCrown className='w-8 h-4 md:w-8 md:h-8' />
                            </div>
                            <div>
                              <div className="text-xl md:text-3xl font-black text-black">
                                {story.totalSales}
                              </div>
                              <div className="text-gray-500 font-semibold">
                                Total Sales
                              </div>
                            </div>
                          </div>

                          {/* Sellers */}
                          <div className="flex items-start lg:items-center">
                            <div className="w-8 h-8 md:w-16 md:h-16 bg-[#ffb600] rounded-full flex items-center justify-center mr-4">
                              <svg className="w-4 h-4 md:w-8 md:h-8 text-black" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            </div>
                            <div>
                              <div className="text-xl md:text-3xl font-black text-black">
                                {story.sellers}
                              </div>
                              <div className="text-gray-500 font-semibold">
                                Sellers
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Image */}
                    <div className="relative h-96 lg:h-full order-1 lg:order-2">
                      <Image
                        src={story.image || '/pop_packet.png'}
                        alt={story.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        priority={story.id === 1}
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                      />

                      {/* Image Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent lg:bg-gradient-to-l" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>


          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevSlide}
              className="w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105"
              aria-label="Next slide"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
            <button
              onClick={nextSlide}
              className="w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default SuccessStoriesSlider;