'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import girl_school from '../../public/Girls_team.jpg'
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { LuCrown } from "react-icons/lu";
const SuccessStoriesSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const successStories = [
    {
      id: 1,
      organization: "LAKE CENTRAL HIGH SCHOOL FOOTBALL",
      title: "Inflatable Tunnel",
      description: "Partnering with Double Good for the past 3 seasons has given us the ability to enhance many aspects of our program. This year's senior class decided on a tunnel for our pregame entrance. It has added to the Friday night atmosphere in ways we couldn't have anticipated. Underclassmen are already shopping for next year.",
      totalSales: "$56,586",
      sellers: "53",
      image: girl_school,
      alt: "Football team running through inflatable tunnel entrance"
    },
    {
      id: 2,
      organization: "RIVERSIDE ELEMENTARY SCHOOL",
      title: "New Playground Equipment",
      description: "Our fundraising campaign exceeded all expectations! The community came together to support our students, and we were able to purchase brand new playground equipment that will serve our children for years to come. The 4-day format kept everyone engaged.",
      totalSales: "$42,350",
      sellers: "87",
         image: girl_school,
      alt: "Children playing on new playground equipment"
    },
    {
      id: 3,
      organization: "WESTSIDE BASKETBALL TEAM",
      title: "Team Uniforms & Travel",
      description: "Thanks to our successful fundraising campaign, we were able to purchase new uniforms for the entire team and fund our travel expenses for the state tournament. The virtual format made it so easy for families to participate from anywhere.",
      totalSales: "$38,920",
      sellers: "34",
     image: girl_school,
      alt: "Basketball team in new uniforms"
    },
    {
      id: 4,
      organization: "HARMONY MIDDLE SCHOOL BAND",
      title: "New Musical Instruments",
      description: "Our band program was in desperate need of new instruments. Through this amazing fundraising platform, we raised enough money to purchase several new instruments and music stands. Our students are thriving with the new equipment.",
      totalSales: "$51,200",
      sellers: "76",
     image: girl_school,
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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-splash text-black mb-4 tracking-tight uppercase">
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
                        <p className="text-black text-lg leading-relaxed mb-8">
                          "{story.description}"
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-8">
                          {/* Total Sales */}
                          <div className="flex items-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                          <LuCrown size={30}/>
                            </div>
                            <div>
                              <div className="text-3xl font-black text-black">
                                {story.totalSales}
                              </div>
                              <div className="text-gray-500 font-medium">
                                Total Sales
                              </div>
                            </div>
                          </div>

                          {/* Sellers */}
                          <div className="flex items-center">
                            <div className="w-16 h-16 bg-[#ffb600] rounded-full flex items-center justify-center mr-4">
                              <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                              </svg>
                            </div>
                            <div>
                              <div className="text-3xl font-black text-black">
                                {story.sellers}
                              </div>
                              <div className="text-gray-500 font-medium">
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
                        src={story.image}
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