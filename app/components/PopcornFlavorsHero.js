import React from 'react';

const PopcornFlavorsHero = () => {
  return (
    <section className="py-8 md:py-24 px-4 bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-400">
      <div className="max-w-7xl mx-auto text-center">
        {/* Main Heading */}
        <h1 className="text-xl md:text-4xl lg:text-5xl font-bold text-black leading-tight tracking-tight uppercase mb-2 md:mb-6">
          Popcorn Flavors That Sell Themselves
        </h1>

        {/* Subheading */}
        <p className="text-sm md:text-2xl  text-gray-800 font-medium leading-relaxed max-w-5xl mx-auto">
          Popcorn World provides a true gourmet experience with hand coded popcorn.
        </p>
      </div>
    </section>
  );
};

export default PopcornFlavorsHero;