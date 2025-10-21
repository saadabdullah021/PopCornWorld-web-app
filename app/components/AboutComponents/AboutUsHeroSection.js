import React from 'react';
import Image from 'next/image';
import heroImage from '../../../public/about_us_hero.webp'
const AboutUsHeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Top Section with Blue Background */}
      <div className="bg-gray-50 text-black pt-24 pb-4 lg:pt-40 lg:pb-4 px-4">
        <div className="max-w-7xl mx-auto text-center">
          {/* About Us Label */}
          {/* <div className="mb-8">
            <h2 className="sub_heading font-bold tracking-widest uppercase opacity-90 mb-4">
              About Us
            </h2>
          </div> */}

          {/* Main Heading */}
          <h1 className="main_heading font-splash  leading-tight tracking-tight uppercase mb-8 mt-5">
            Doing the World a Flavor
          </h1>

          {/* Description */}
          <div className="max-w-7xl mx-auto">
            <p className=" main_description leading-relaxed font-light opacity-95">
              We believe fundraising should do more than raise money — it should bring people together. That’s why Popcorn World gives 50% of every sale to schools and youth organizations building brighter futures.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Section with Team Image */}
      {/* <div className="relative h-72 md:h-96 lg:h-[500px] xl:h-[600px] 2xl:h-[888px]">
 
        <div className="absolute inset-0">
          <Image
            src={heroImage}
            alt="Popcorn World team members working together in colorful workspace"
            fill
            className="object-fill object-center"
            sizes="100vw"
            priority
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
        </div>

   
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />


      </div> */}


    </section>
  );
};

export default AboutUsHeroSection;