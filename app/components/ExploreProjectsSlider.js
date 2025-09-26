"use client";
import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Calendar, User } from "lucide-react";

const ExploreProjectsSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sliderRef = useRef(null);

  const originalProjects = [
    {
      id: 1,
      title: "Mobile First Is Just Not Goodies Enough Meet Journey",
      author: "James W. Barrows",
      category: "Business",
      categoryColor: "bg-[#8bc34a]",
      image:
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      raised: "$59,689",
      goal: "$75,000",
      percentage: 75,
      date: "25 February 2021",
    },
    {
      id: 2,
      title: "Best Romantic & Action English Movie Release In 2022",
      author: "James W. Barrows",
      category: "Video & Movies",
      categoryColor: "bg-[#8bc34a]",
      image:
        "https://images.unsplash.com/photo-1489599808-3e09666c8c0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      raised: "$59,689",
      goal: "$75,000",
      percentage: 79,
      date: "25 February 2021",
    },
    {
      id: 3,
      title: "Needs Close Up Students Class Room In University",
      author: "James W. Barrows",
      category: "Education",
      categoryColor: "bg-[#8bc34a]",
      image:
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      raised: "$59,689",
      goal: "$68,000",
      percentage: 87,
      date: "25 February 2021",
    },
    {
      id: 4,
      title: "Original Shinecon VR Pro Virtual Reality 3D Glasses VRBox",
      author: "James W. Barrows",
      category: "Technology",
      categoryColor: "bg-[#8bc34a]",
      image:
        "https://images.unsplash.com/photo-1592478411213-6153e4ebc696?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      raised: "$59,689",
      goal: "$70,000",
      percentage: 85,
      date: "25 February 2021",
    },
    {
      id: 5,
      title: "Fundraising For The People And Causes You Care About",
      author: "James W. Barrows",
      category: "Clothes",
      categoryColor: "bg-[#8bc34a]",
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      raised: "$59,689",
      goal: "$72,000",
      percentage: 83,
      date: "25 February 2021",
    },
    {
      id: 6,
      title: "Innovative Healthcare Solutions for Remote Communities",
      author: "Sarah Johnson",
      category: "Healthcare",
      categoryColor: "bg-[#8bc34a]",
      image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      raised: "$42,350",
      goal: "$60,000",
      percentage: 70,
      date: "20 February 2021",
    },
  ];

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

  // ✅ Clone projects for infinite loop
  const projects = [
    ...originalProjects.slice(-itemsPerView), // Last items at start
    ...originalProjects,
    ...originalProjects.slice(0, itemsPerView), // First items at end
  ];

  // ✅ Start from first real slide (after cloned items)
  useEffect(() => {
    setCurrentSlide(itemsPerView);
  }, [itemsPerView]);

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
    <div className="bg-white rounded shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-500"
          loading="lazy"
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

  return (
    <section className="py-16 lg:py-24 bg-black relative overflow-hidden ">
      <div className="container w-full mx-auto px-4 sm:px-6 lg:px-8">
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
      </div>
    </section>
  );
};

export default ExploreProjectsSlider;