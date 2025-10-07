"use client";
import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Calendar, User } from "lucide-react";
import Image from "next/image";

const ExploreProjectsSlider = ({ campaigns, campaignsLoading, campaignsError, globalSettings }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sliderRef = useRef(null);

  console.log('ExploreProjectsSlider received:', { campaigns, campaignsLoading, campaignsError });

  // Get currency from global settings
  const getCurrency = () => {
    if (!globalSettings) return '$';
    const currencySetting = globalSettings.find(setting => setting.config_key === 'campaign_currency');
    return currencySetting?.config_value || '$';
  };

  const transformCampaigns = (campaignsData) => {
    if (!campaignsData) return [];
    
    const currency = getCurrency();
    
    return campaignsData.map(campaign => {
      const collectedAmount = parseFloat(campaign.collected_amount) || 0;
      const raiseAmount = parseFloat(campaign.raise_amount) || 1;
      const percentage = Math.round((collectedAmount / raiseAmount) * 100);
      
      return {
        id: campaign.id,
        slug: campaign.slug,
        title: campaign.campaign_title,
        author: campaign.fundraiser?.name || "Unknown",
        category: "Campaign",
        categoryColor: "bg-[#8bc34a]",
        image: `https://onebigmediacompany.online/storage/${campaign.campaign_image}`,
        raised: `${currency}${collectedAmount}`,
        goal: `${currency}${raiseAmount}`,
        percentage: Math.min(percentage, 100),
        date: new Date(campaign.campaign_time).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
      };
    });
  };

  const originalProjects = transformCampaigns(campaigns);
  const shouldShowSlider = originalProjects.length >= 4;

  // ✅ Check if mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // ✅ Items per view
  const itemsPerView = isMobile ? 1 : 7;

  // ✅ Clone projects for infinite loop (only if using slider)
  const projects = shouldShowSlider ? [
    ...originalProjects.slice(-itemsPerView), // Last items at start
    ...originalProjects,
    ...originalProjects.slice(0, itemsPerView), // First items at end
  ] : originalProjects;

  // ✅ Start from first real slide (after cloned items)
  useEffect(() => {
    if (shouldShowSlider) {
      setCurrentSlide(itemsPerView);
    } else {
      setCurrentSlide(0);
    }
  }, [itemsPerView, shouldShowSlider]);

  // ✅ Handle transition end for seamless loop
  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    // Jump to real start/end if at clones
    if (currentSlide === 0) {
      setCurrentSlide(originalProjects.length);
    } else if (currentSlide >= originalProjects.length + itemsPerView) {
      setCurrentSlide(itemsPerView);
    }
  };

  // ✅ Next Slide
  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => prev + 1);
  };

  // ✅ Previous Slide
  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => prev - 1);
  };


  const ProjectCard = ({ project }) => (
    <div 
      className="bg-white rounded shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
      onClick={() => window.location.href = `/campaigns/${project.slug}`}
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={project.image && typeof project.image === 'string' ? project.image : '/pop_packet.png'}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-101 transition-transform duration-500"
          onError={(e) => {
            e.target.src = '/pop_packet.png';
          }}
        />

      </div>

      <div className="p-6 relative">
                <div className="absolute -top-3  left-4">
          <span
            className={`px-4 shadow-2xl py-2 text-white text-sm font-medium  ${project.categoryColor}`}
          >
            {project.category}
          </span>
        </div>
        <div className="flex items-center gap-2 mt-6 mb-3">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-gray-500" />
          </div>
          <span className="text-sm text-gray-600">{project.author}</span>
        </div>

        <h3 className="text-lg mt-3 font-semibold text-gray-800 mb-4 line-clamp-2 group-hover:text-[#8bc34a] transition-colors">
          {project.title}
        </h3>

        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Raised of {project.raised}
            </span>
            <span className="text-sm font-bold text-gray-800">
              {project.percentage}%
            </span>
          </div>
          <div className="w-full bg-gray-200  h-1">
            <div
              className="bg-[#8bc34a] h-1  transition-all duration-300"
              style={{ width: `${project.percentage}%` }}
            ></div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Calendar className="w-4 h-4" />
          <span>{project.date}</span>
        </div>
      </div>
    </div>
  );

  // Shimmer component for loading state
  const ShimmerCard = () => (
    <div className="bg-white rounded shadow-lg overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-300"></div>
      <div className="p-6">
        <div className="absolute -top-3 left-4">
          <div className="w-20 h-8 bg-gray-300 rounded"></div>
        </div>
        <div className="flex items-center gap-2 mt-6 mb-3">
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          <div className="w-24 h-4 bg-gray-300 rounded"></div>
        </div>
        <div className="mt-3 space-y-2">
          <div className="w-full h-4 bg-gray-300 rounded"></div>
          <div className="w-3/4 h-4 bg-gray-300 rounded"></div>
        </div>
        <div className="mt-4 space-y-2">
          <div className="flex justify-between">
            <div className="w-20 h-4 bg-gray-300 rounded"></div>
            <div className="w-8 h-4 bg-gray-300 rounded"></div>
          </div>
          <div className="w-full h-1 bg-gray-300 rounded"></div>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <div className="w-4 h-4 bg-gray-300 rounded"></div>
          <div className="w-24 h-4 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );

  // Show loading state with shimmer
  if (campaignsLoading) {
    return (
      <section className="py-16 lg:py-24 bg-black relative overflow-hidden">
        <div className="container w-full mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop Shimmer */}
          <div className="hidden md:block container w-full mx-12 py-4">
            <div className="flex gap-6">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="w-1/4 flex-shrink-0">
                  <ShimmerCard />
                </div>
              ))}
            </div>
          </div>
          
          {/* Mobile Shimmer */}
          <div className="md:hidden relative">
            <div className="overflow-hidden pb-2">
              <div className="flex">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-2">
                    <ShimmerCard />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Show error state
  if (campaignsError) {
    return (
      <section className="py-16 lg:py-24 bg-black relative overflow-hidden">
        <div className="container w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-64">
            <div className="text-red-400 text-xl">Error loading campaigns: {campaignsError}</div>
          </div>
        </div>
      </section>
    );
  }

  // Show empty state only when not loading and no campaigns
  if (!campaignsLoading && !campaignsError && (!campaigns || campaigns.length === 0)) {
    return (
      <section className="py-16 lg:py-24 bg-black relative overflow-hidden">
        <div className="container w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-64">
            <div className="text-white text-xl">No campaigns available</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-24 bg-black relative overflow-hidden ">
      <div className="container w-full mx-auto px-4 sm:px-6 lg:px-8">
        {shouldShowSlider ? (
          <>
            {/* ✅ Desktop Infinite Slider */}
            <div className="hidden md:block container w-full mx-12 py-4">
              <div
                ref={sliderRef}
                className={`flex gap-6 ${isTransitioning ? 'transition-transform duration-500 ease-in-out' : ''}`}
                style={{ transform: `translateX(-${currentSlide * (100 / itemsPerView)}%)` }}
                onTransitionEnd={handleTransitionEnd}
      
              >
                {projects.map((project, index) => (
                  <div key={`${project.id}-${index}`} className="w-1/4 flex-shrink-0">
                    <ProjectCard project={project} />
                  </div>
                ))}
              </div>
            </div>

            {/* ✅ Mobile Infinite Slider */}
            <div className="md:hidden relative">
              <div className="overflow-hidden pb-2 ">
                <div
                  className={`flex ${isTransitioning ? 'transition-transform duration-500 ease-in-out' : ''}`}
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                  onTransitionEnd={handleTransitionEnd}
           
                >
                  {projects.map((project, index) => (
                    <div key={`${project.id}-${index}`} className="w-full flex-shrink-0 px-2">
                      <ProjectCard project={project} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={prevSlide}
                className="w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105"
                disabled={isTransitioning}
              >
                <ChevronLeft className="w-6 h-6 text-gray-700" />
              </button>
              <button
                onClick={nextSlide}
                className="w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105"
                disabled={isTransitioning}
              >
                <ChevronRight className="w-6 h-6 text-gray-700" />
              </button>
            </div>
          </>
        ) : (
          <>
            {/* ✅ Grid Layout for less than 4 campaigns */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {originalProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ExploreProjectsSlider;