// pages/campaigns.js
"use client";
import React, { useState, useEffect, useMemo } from "react";
import { Search, Calendar, User, Loader2, X } from "lucide-react";
import Image from "next/image";

const CampaignsPage = ({ initialCampaigns, globalSettings }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [displayCount, setDisplayCount] = useState(6);
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState(initialCampaigns || []);

  // Get currency from global settings
  const getCurrency = () => {
    if (!globalSettings) return "$";
    const currencySetting = globalSettings.find(
      (setting) => setting.config_key === "campaign_currency"
    );
    return currencySetting?.config_value || "$";
  };

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await fetch('YOUR_API_URL/campaigns');
        const data = await response.json();
        setCampaigns(data);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      }
    };

    fetchCampaigns();
  }, []);

  // ✅ Dummy campaigns data (static)
  const transformCampaigns = [
    {
      id: 1,
      slug: "help-children-education",
      title: "Help Children Get Quality Education",
      author: "John Doe",
      category: "Education",
      categoryColor: "bg-blue-500",
      image: "https://via.placeholder.com/400x250.png?text=Education+Campaign",
      raised: "$2,500",
      goal: "$5,000",
      percentage: 50,
      date: "September 20, 2025",
    },
    {
      id: 2,
      slug: "medical-support-fund",
      title: "Medical Support for Needy Families",
      author: "Jane Smith",
      category: "Medical",
      categoryColor: "bg-red-500",
      image: "https://via.placeholder.com/400x250.png?text=Medical+Campaign",
      raised: "$1,200",
      goal: "$3,000",
      percentage: 40,
      date: "September 22, 2025",
    },
    {
      id: 3,
      slug: "animal-shelter-fund",
      title: "Build a Shelter for Stray Animals",
      author: "Michael Johnson",
      category: "Animal Care",
      categoryColor: "bg-green-500",
      image: "https://via.placeholder.com/400x250.png?text=Animal+Care+Campaign",
      raised: "$3,400",
      goal: "$6,000",
      percentage: 57,
      date: "September 25, 2025",
    },
    {
      id: 4,
      slug: "animal-shelter-fund",
      title: "Build a Shelter for Stray Animals",
      author: "Michael Johnson",
      category: "Animal Care",
      categoryColor: "bg-green-500",
      image: "https://via.placeholder.com/400x250.png?text=Animal+Care+Campaign",
      raised: "$3,400",
      goal: "$6,000",
      percentage: 57,
      date: "September 25, 2025",
    },
    {
      id: 5,
      slug: "animal-shelter-fund",
      title: "Build a Shelter for Stray Animals",
      author: "Michael Johnson",
      category: "Animal Care",
      categoryColor: "bg-green-500",
      image: "https://via.placeholder.com/400x250.png?text=Animal+Care+Campaign",
      raised: "$3,400",
      goal: "$6,000",
      percentage: 57,
      date: "September 25, 2025",
    },
    {
      id: 6,
      slug: "animal-shelter-fund",
      title: "Build a Shelter for Stray Animals",
      author: "Michael Johnson",
      category: "Animal Care",
      categoryColor: "bg-green-500",
      image: "https://via.placeholder.com/400x250.png?text=Animal+Care+Campaign",
      raised: "$3,400",
      goal: "$6,000",
      percentage: 57,
      date: "September 25, 2025",
    },
    {
      id: 7,
      slug: "animal-shelter-fund",
      title: "Build a Shelter for Stray Animals",
      author: "Michael Johnson",
      category: "Animal Care",
      categoryColor: "bg-green-500",
      image: "https://via.placeholder.com/400x250.png?text=Animal+Care+Campaign",
      raised: "$3,400",
      goal: "$6,000",
      percentage: 57,
      date: "September 25, 2025",
    },
    {
      id: 8,
      slug: "animal-shelter-fund",
      title: "Build a Shelter for Stray Animals",
      author: "Michael Johnson",
      category: "Animal Care",
      categoryColor: "bg-green-500",
      image: "https://via.placeholder.com/400x250.png?text=Animal+Care+Campaign",
      raised: "$3,400",
      goal: "$6,000",
      percentage: 57,
      date: "September 25, 2025",
    },
    {
      id: 9,
      slug: "animal-shelter-fund",
      title: "Build a Shelter for Stray Animals",
      author: "Michael Johnson",
      category: "Animal Care",
      categoryColor: "bg-green-500",
      image: "https://via.placeholder.com/400x250.png?text=Animal+Care+Campaign",
      raised: "$3,400",
      goal: "$6,000",
      percentage: 57,
      date: "September 25, 2025",
    },
    {
      id: 10,
      slug: "animal-shelter-fund",
      title: "Build a Shelter for Stray Animals",
      author: "Michael Johnson",
      category: "Animal Care",
      categoryColor: "bg-green-500",
      image: "https://via.placeholder.com/400x250.png?text=Animal+Care+Campaign",
      raised: "$3,400",
      goal: "$6,000",
      percentage: 57,
      date: "September 25, 2025",
    },
    {
      id: 11,
      slug: "animal-shelter-fund",
      title: "Build a Shelter for Stray Animals",
      author: "Michael Johnson",
      category: "Animal Care",
      categoryColor: "bg-green-500",
      image: "https://via.placeholder.com/400x250.png?text=Animal+Care+Campaign",
      raised: "$3,400",
      goal: "$6,000",
      percentage: 57,
      date: "September 25, 2025",
    },
  ];


  const allProjects = useMemo(() => transformCampaigns, []);


  // Filter projects based on search query
  const filteredProjects = useMemo(() => {
    if (!searchQuery.trim()) return allProjects;

    const query = searchQuery.toLowerCase();
    return allProjects.filter(
      (project) =>
        project.title.toLowerCase().includes(query) ||
        project.author.toLowerCase().includes(query) ||
        project.category.toLowerCase().includes(query)
    );
  }, [allProjects, searchQuery]);

  // Projects to display based on displayCount
  const displayedProjects = filteredProjects.slice(0, displayCount);

  // Check if there are more projects to load
  const hasMore = displayCount < filteredProjects.length;

  // Handle load more
  const handleLoadMore = () => {
    setIsLoading(true);
    // Simulate loading delay
    setTimeout(() => {
      setDisplayCount((prev) => prev + 6);
      setIsLoading(false);
    }, 500);
  };

  // Reset display count when search changes
  useEffect(() => {
    setDisplayCount(6);
  }, [searchQuery]);

  // Clear search
  const handleClearSearch = () => {
    setSearchQuery("");
  };

  // Project Card Component
  const ProjectCard = ({ project }) => (
    <div
      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer h-full flex flex-col"
      onClick={() => window.location.href = `/campaigns/${project.slug}`}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>

      <div className="p-6 relative flex-1 flex flex-col">
        <div className="absolute -top-3 left-4">
          <span
            className={`px-4 shadow-2xl py-2 text-white text-sm font-medium ${project.categoryColor}`}
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

        <div className="mb-4 mt-auto">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Raised of {project.raised}
            </span>
            <span className="text-sm font-bold text-gray-800">
              {project.percentage}%
            </span>
          </div>
          <div className="w-full bg-gray-200 h-1 rounded-full">
            <div
              className="bg-[#8bc34a] h-1 rounded-full transition-all duration-300"
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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Search */}
      <section className="bg-[#3333cb] pt-32 pb-16 lg:pt-48 lg:pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="main_heading font-splash font-bold text-white mb-8">
              Explore Campaigns
            </h1>
            <p className="main_description text-white/90 max-w-2xl mx-auto">
              Discover amazing fundraising campaigns and support causes that
              matter
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search campaigns by title, author, or category..."
                className="block w-full pl-12 pr-12 py-4 text-base border-gray-200 rounded-full shadow-xl border focus:outline-none transition-all duration-300 placeholder:text-gray-400 text-white"
              />
              {searchQuery && (
                <button
                  onClick={handleClearSearch}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center hover:opacity-70 transition-opacity"
                >
                  <X className="h-5 w-5 text-gray-100" />
                </button>
              )}
            </div>

            {/* Search Results Info */}
            {searchQuery && (
              <div className="mt-4 text-center font-medium text-white/90">
                Found {filteredProjects.length} campaign
                {filteredProjects.length !== 1 ? "s" : ""} matching "
                {searchQuery}"
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Campaigns Grid Section */}
      <section className="py-12 lg:py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Results Count */}
          <div className="mb-8 lg:mb-16 flex items-center ">
            <h2 className="main_heading font-splash font-bold text-black">
              {searchQuery ? "Search Results" : "All Campaigns"}
            </h2>

          </div>

          {/* No Results */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto mb-4" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                No campaigns found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search to find what you're looking for
              </p>
              {searchQuery && (
                <button
                  onClick={handleClearSearch}
                  className="px-6 py-3 bg-[#8BC34A] text-white rounded-full  transition-colors duration-300"
                >
                  Clear Search
                </button>
              )}
            </div>
          )}

          {/* Campaigns Grid */}
          {filteredProjects.length > 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {displayedProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>

              {/* Load More Button */}
              {hasMore && (
                <div className="mt-12 text-center">
                  <button
                    onClick={handleLoadMore}
                    disabled={isLoading}
                    className="group relative inline-flex items-center justify-center px-8 py-4 bg-[#8BC34A] text-white font-semibold rounded-full  transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin " />
                      </>
                    ) : (
                      <>
                        Load More Campaigns
                      </>
                    )}
                  </button>

                </div>
              )}

              {/* End Message */}
              {!hasMore && filteredProjects.length > 6 && (
                <div className="mt-12 text-center">
                  <div className="inline-block px-6 py-3 bg-gray-100 rounded-full">
                    <p className="text-gray-600 font-medium">
                      You've seen all campaigns
                      {searchQuery ? " matching your search" : ""}
                    </p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>


    </div>
  );
};

export default CampaignsPage;

