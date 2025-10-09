import React from 'react';

const PopcornFlavorsHero = () => {
  return (
    <section className="py-8 md:py-24 px-4 bg-[#8bc34a]">
      <div className="max-w-7xl mx-auto text-center">
        {/* Main Heading */}
        <h1 className="text-[42px] lg:text-[50px]  font-splash !text-white leading-tight tracking-tight uppercase mb-2 md:mb-6">
          Popcorn Flavors That Sell Themselves
        </h1>

        {/* Subheading */}
        <p className="text-sm md:text-2xl  text-white font-medium leading-relaxed max-w-5xl mx-auto">
          Popcorn World provides a true gourmet experience with hand coded popcorn.
        </p>
      </div>
    </section>
  );
};

export default PopcornFlavorsHero;