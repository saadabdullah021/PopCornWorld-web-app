import Link from 'next/link';
import React from 'react';


const PopcornStorySection = () => {
    return (
        <section className="py-16 md:py-24 px-4 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="main_heading font-splash  text-black leading-tight tracking-tight uppercase mb-4">
                        <span className="block mb-2">About a Story Popped with Heart Popcorn World's Community Crunch
                        </span>
                    </h2>
                </div>

                {/* Story Content */}
                <div className="max-w-7xl mx-auto space-y-8 md:space-y-10">
                    {/* Paragraph 1 */}
                    <div className="prose prose-lg md:prose-xl max-w-none">
                        <p className="text-gray-800 leading-relaxed text-lg main_description">
                            Popcorn World isn't just about delicious flavors (although, let's be honest, that's a big part of it!). It's a story about community, opportunity, and giving back, all wrapped up in a warm, buttery kernel.
                        </p>
                    </div>

                    {/* Paragraph 2 */}
                    <div className="prose prose-lg md:prose-xl max-w-none">
                        <p className="text-gray-800 leading-relaxed text-lg main_description">
                            In 2018, LeBarron Burton took the reins of Popcorn World, a company started by two of his childhood friends. LeBarron knew he wanted to honor their legacy, not just by continuing the incredible variety of over 250 gourmet popcorn flavors, but by making Popcorn World a force for good.
                        </p>
                    </div>

                    {/* Paragraph 3 */}
                    <div className="prose prose-lg md:prose-xl max-w-none">
                        <p className="text-gray-800 leading-relaxed text-lg main_description">
                            Here's where the real magic happens. Popcorn World isn't satisfied with just offering delicious, hand-coated popcorn. They've built a strong fundraising program designed to empower communities across the US.
                        </p>
                    </div>

                    {/* Paragraph 4 */}
                    <div className="prose prose-lg md:prose-xl max-w-none">
                        <p className="text-gray-800 leading-relaxed text-lg main_description">
                            This is more than popcorn, it's a movement. Join Popcorn World in their mission to build a brighter future, one delicious kernel at a time. Start your fundraiser today and see how your sweet tooth can make a difference!
                        </p>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="text-center mt-12 md:mt-16">
                   <Link  href='/get-started' className="group btn-primary transition-all duration-300 animate-fadeInUp">
                               Get Started
                            
                             </Link >
                </div>

            </div>
        </section>
    );
};

export default PopcornStorySection;