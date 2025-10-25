import Link from 'next/link';
import React from 'react';


const PopcornStorySection = () => {
    return (
        <section className="pb-16 pt-6 md:pb-24 md:pt-12 px-4 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
     

                {/* Story Content */}
                <div className="max-w-7xl mx-auto space-y-8 md:space-y-10">
                    {/* Paragraph 1 */}
                    {/* Paragraph 1 */}
                    <div className="prose prose-lg md:prose-xl max-w-none">
                        <p className="text-gray-800 leading-relaxed text-lg main_description">
                          Popcorn World isn’t just about gourmet flavors (though that’s a huge part of what we do!). It’s a story of community, opportunity, and giving back — all wrapped in every gourmet, hand-crafted kernel.
                        </p>
                    </div>

                    {/* Paragraph 2 */}
                    <div className="prose prose-lg md:prose-xl max-w-none">
                        <p className="text-gray-800 leading-relaxed text-lg main_description">
                            Founded by two childhood friends as Popcorn Haven in 2008 and led by LeBarron Burton as Popcorn World after a strategic rebrand since 2018, Popcorn World has grown from a local favorite into a nationwide movement. With over 250 delicious popcorn flavors, LeBarron continues the mission of creating joy while turning popcorn into a powerful fundraising tool for schools, teams, and organizations.
                        </p>
                    </div>

                    {/* Paragraph 3 */}
                    <div className="prose prose-lg md:prose-xl max-w-none">
                        <p className="text-gray-800 leading-relaxed text-lg main_description">
                           What makes Popcorn World stand out is our purpose-driven fundraising program and our desire to provide a quality product. We make it easy for schools, youth groups, and nonprofits across the U.S. to raise money online with a simple, contactless system — powered by irresistible popcorn that supporters love.

                        </p>
                    </div>

                    {/* Paragraph 4 */}
                    <div className="prose prose-lg md:prose-xl max-w-none">
                        <p className="text-gray-800 leading-relaxed text-lg main_description">
                           This is more than just popcorn — it’s a movement for good. Join Popcorn World in building stronger, happier communities one fundraiser at a time. Start your Popcorn World fundraiser today and turn every handful of popcorn into a difference that lasts.
                        </p>
                    </div>

                </div>

                {/* Call to Action */}
                <div className="text-center mt-12 md:mt-16">
                    <Link href='/get-started' className="group btn-primary transition-all duration-300 animate-fadeInUp">
                        Get Started

                    </Link >
                </div>

            </div>
        </section>
    );
};

export default PopcornStorySection;