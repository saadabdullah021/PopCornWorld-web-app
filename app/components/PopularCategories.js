"use client"
import React from 'react';
import {
  GraduationCap,
  Heart,
  Shirt,
  Video,
  Cpu,
  Apple,
  ArrowRight
} from 'lucide-react';

const PopularCategories = () => {
  const categories = [
    {
      id: 1,
      title: 'Education',
      subtitle: 'School, College & University',
      icon: GraduationCap,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200'
    },
    {
      id: 2,
      title: 'Medical & Health',
      subtitle: 'School, College & University',
      icon: Heart,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-blue-200'
    },
    {
      id: 3,
      title: 'Clothes',
      subtitle: 'School, College & University',
      icon: Shirt,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200'
    },
    {
      id: 4,
      title: 'Video & Films',
      subtitle: 'School, College & University',
      icon: Video,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200'
    },
    {
      id: 5,
      title: 'Technology',
      subtitle: 'School, College & University',
      icon: Cpu,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-blue-200'
    },
    {
      id: 6,
      title: 'Organic Foods',
      subtitle: 'School, College & University',
      icon: Apple,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200'
    }
  ];

  const CategoryCard = ({ category, index }) => {
    const Icon = category.icon;

    return (
      <div
        className={`
        group relative p-6 bg-white 
        shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out
        hover:-translate-y-1 cursor-pointer
      `}
        style={{
          animationDelay: `${index * 0.1}s`,
        }}
      >
        {/* Icon Container */}
        <div
          className={`
          w-16 h-16 ${category.bgColor} rounded-xl flex items-center justify-center mb-4
           transition-transform duration-300
        `}
        >
          <Icon className={`w-8 h-8 ${category.color}`} strokeWidth={1.5} />
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-800 group-hover:text-black transition-colors">
            {category.title}
          </h3>
          <p className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors">
            {category.subtitle}
          </p>
        </div>

  

        {/* Border Effect (only bottom & right) */}
        <div
          className={`
          absolute bottom-0 right-0 w-0 h-0  
          border-r-4 border-b-4 border-[#8BC34A]
          group-hover:w-full group-hover:h-full 
          transition-all duration-300 ease-in-out
          pointer-events-none
        `}
        />
      </div>
    );
  };


  return (
    <section className="py-16 lg:py-24 bg-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-12 lg:mb-16">



          {/* Title */}
          <div className="flex-1 ">
            <h2 className="text-3xl lg:text-5xl font-splash text-black mb-2">
              Popular Categories
            </h2>
          </div>

          {/* Right Side - View All Button */}
          <div className="flex-shrink-0">
            <button className="
              inline-flex items-center gap-2 mt-8 sm:mt-0 px-6 py-3 
              bg-[#000]  cursor-pointer 
              text-white font-medium rounded-full
              transition-all duration-300 ease-in-out
              hover:shadow-lg
              focus:outline-none 
            ">
              View All Category
             
            </button>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((category, index) => (
            <CategoryCard
              key={category.id}
              category={category}
              index={index}
            />
          ))}
        </div>


      </div>


    </section>
  );
};

export default PopularCategories;