import React from 'react';
import Image from 'next/image';
import heroFundraiser from '../../../public/pop_packet.png'
import danceFundraiser from '../../../public/dance_fundraiser.png'
const PopUpStoresSection = () => {
  const features = [
    {
      id: 1,
      title: "Simple",
      description: "Pop-Up Stores make it easy for teams to fundraise beyond their neighborhood without ever handling money or paperwork.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 2,
      title: "Social",
      description: "Each team member sells artisanal popcorn in their online Pop-Up Store by sharing their personal link with friends and family.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      id: 3,
      title: "Contactless",
      description: "Supporters simply follow the Pop-Up Store link and buy all the popcorn their hearts desire—delivered straight to their doorstep.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      )
    },
    {
      id: 4,
      title: "Fun",
      description: "Real-time leaderboards heat up some friendly competition by showing everyone just how much each seller has brought in.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-16 md:py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl  md:text-4xl lg:text-5xl font-bold text-black leading-tight tracking-tight uppercase mb-4">
            <span className="block mb-2">Pop-Up Stores: Hands-down The Easiest Way to Fundraise</span>
          </h2>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 py-12 lg:py-20 items-center">
          {/* Left Side - Image */}
          <div className="order-1 lg:order-1">
            <div className="relative w-full h-96 md:h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-green-100 to-blue-100">
              <Image
                src={heroFundraiser}
                alt="Mobile phone showing Pop-Up Store interface with colorful popcorn packages in background"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />
              
              {/* Optional overlay gradient for better visual appeal */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
            </div>
          </div>

          {/* Right Side - Features List */}
          <div className="order-2 lg:order-2 space-y-8">
            {features.map((feature) => (
              <div 
                key={feature.id}
                className="flex items-start space-x-4 group"
              >
                {/* Check Icon */}
                <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white group-hover:bg-green-600 transition-colors duration-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-bold text-black mb-3  transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      {/* Bottom Section with Team Image */}
      <div className="relative h-80 md:h-96 lg:h-[500px] xl:h-[600px]">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={danceFundraiser}
            alt="Popcorn World team members working together in colorful workspace"
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
        </div>

        {/* Gradient Overlay for better text readability if needed */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

        {/* Optional overlay content can be added here */}
        <div className="absolute inset-0 flex items-end justify-center pb-8">
          <div className="text-center text-white opacity-0 hover:opacity-100 transition-opacity duration-300">
            {/* Optional team caption or call-to-action */}
          </div>
        </div>
      </div>
      </div>
    </section>
  );
};

export default PopUpStoresSection;