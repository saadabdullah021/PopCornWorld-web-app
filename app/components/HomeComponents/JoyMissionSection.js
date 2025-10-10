import React from 'react';
import Image from 'next/image';
import footballImage from '../../../public/footballImage.webp'
import blackBoyImage from '../../../public/blackBoyImage.webp'
import blueImage from '../../../public/blueImage.webp'



const JoyMissionSection = () => {
  const services = [
    {
      id: 1,
      title: "Virtual Fundraising",
      description: "Empower your community and support great causes through our simple and effective virtual fundraising platform.",
      image: blackBoyImage,
      alt: "People joining an online fundraising event to support community causes"
    },
    {
      id: 2,
      title: "Popcorn World Kids Foundation",
      description: "Bringing joy and hope to children with special needs through heartfelt programs, community support and every bag of popcorn you buy.",
      image: footballImage,
      alt: "Popcorn World Kids Foundation charity program helping children with special needs"
    },
    {
      id: 3,
      title: "Premium Popcorn",
      description: "Enjoy handcrafted, gourmet popcorn made with the finest ingredients—bursting with irresistible flavors and loved by popcorn fans everywhere.",
      image: blueImage,
      alt: "Assortment of gourmet popcorn flavors from Popcorn World"
    }

  ];

  return (
    <section className="py-16 px-4 bg-white">
      {/* Container */}
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="main_heading font-splash text-black mb-4 tracking-tight uppercase">
            We're on a mission to spread joy
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {services.map((service) => (
            <div
              key={service.id}
              className="group cursor-pointer transition-all duration-300 hover:transform "
            >
              {/* Image Container */}
              <div className="relative w-full h-80 md:h-96 rounded-2xl overflow-hidden mb-6 shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
                <Image
                  src={service.image || '/pop_packet.png'}
                  alt={service.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  priority={service.id === 1}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />

                {/* Overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content */}
              <div className="text-left px-2 ">
                <h3 className="sub_heading text-black mb-1  text-center  transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-black main_description text-center leading-relaxed ">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>


      </div>
    </section>
  );
};

export default JoyMissionSection;