// pages/terms-and-conditions.js
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const TermsAndConditions = () => {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: "By accessing and using Popcorn World's website and services, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our services. These terms apply to all visitors, users, and others who access or use our services."
    },
    {
      title: "2. Use of Services",
      content: "Popcorn World provides a platform for fundraising activities and gourmet popcorn sales. You agree to use our services only for lawful purposes and in accordance with these Terms. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account."
    },
    {
      title: "3. Fundraising Programs",
      content: "Our fundraising program allows communities, schools, and organizations to raise funds through popcorn sales. 50% of each purchase goes directly to support the registered fundraiser. Fundraisers must be registered and approved before launching campaigns. All fundraising activities must comply with local, state, and federal regulations."
    },
    {
      title: "4. Product Information and Pricing",
      content: "We strive to provide accurate product descriptions and pricing information. However, we reserve the right to correct any errors, inaccuracies, or omissions and to change or update information at any time without prior notice. All prices are subject to change without notice. We reserve the right to limit quantities of any products or services offered."
    },
    {
      title: "5. Orders and Payment",
      content: "All orders are subject to acceptance and availability. We reserve the right to refuse any order at our discretion. Payment must be received in full before orders are processed. We accept various payment methods as displayed on our website. You agree to provide current, complete, and accurate purchase and account information for all purchases."
    },
    {
      title: "6. Shipping and Delivery",
      content: "We ship to addresses within the United States. Shipping times may vary based on location and product availability. Risk of loss and title for products purchased pass to you upon delivery to the carrier. We are not responsible for delays caused by shipping carriers or circumstances beyond our control."
    },
    {
      title: "7. Returns and Refunds",
      content: "Due to the food nature of our products, we have specific return policies. Products must be unopened and in original condition for returns. Refund requests must be submitted within 14 days of receipt. Fundraising purchases may have different return policies. Please contact customer service for specific return instructions."
    },
    {
      title: "8. Intellectual Property",
      content: "All content on this website, including text, graphics, logos, images, and software, is the property of Popcorn World and protected by intellectual property laws. You may not reproduce, distribute, modify, or create derivative works from any content without our express written permission."
    },
    {
      title: "9. User Conduct",
      content: "You agree not to use our services to transmit any unlawful, harassing, defamatory, abusive, threatening, harmful, vulgar, obscene, or otherwise objectionable material. You will not interfere with or disrupt our services or servers. You will not attempt to gain unauthorized access to any portion of our website or systems."
    },
    {
      title: "10. Limitation of Liability",
      content: "Popcorn World shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use our services. Our total liability shall not exceed the amount paid by you for products or services. Some jurisdictions do not allow the limitation of liability, so these limitations may not apply to you."
    },
    {
      title: "11. Indemnification",
      content: "You agree to indemnify, defend, and hold harmless Popcorn World, its officers, directors, employees, and agents from any claims, liabilities, damages, losses, and expenses arising from your violation of these Terms or your use of our services."
    },
    {
      title: "12. Changes to Terms",
      content: "We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting to the website. Your continued use of our services after changes are posted constitutes acceptance of the modified terms. We encourage you to review these terms periodically."
    },
    {
      title: "13. Governing Law",
      content: "These Terms and Conditions are governed by and construed in accordance with the laws of the United States and the state in which Popcorn World operates, without regard to conflict of law principles. Any disputes arising from these terms shall be resolved in the appropriate courts of that jurisdiction."
    },
    {
      title: "14. Contact Information",
      content: "If you have any questions about these Terms and Conditions, please contact us at support@popcornworld.com or through the contact information provided on our website. We are committed to addressing your concerns and providing excellent customer service."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="bg-[#3333cb] text-white pt-32 pb-12 lg:pt-52 lg:pb-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <div className="mb-8">
              <h2 className="text-xl md:text-2xl font-bold tracking-widest uppercase opacity-90 mb-4">
                Legal
              </h2>
            </div>

            <h1 className="main_heading font-splash font-bold leading-tight tracking-tight uppercase mb-8">
              Terms & Conditions
            </h1>

            <div className="max-w-4xl mx-auto">
              <p className="main_description leading-relaxed font-light opacity-95">
                Please read these terms and conditions carefully before using our services
              </p>
            </div>

            <div className="mt-8 text-sm md:text-base opacity-80">
              Last Updated: September 30, 2025
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-24 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          {/* Introduction */}
          <div className="bg-white rounded-lg shadow-sm p-8 md:p-12 mb-8">
            <p className="text-gray-800 leading-relaxed text-lg mb-6">
              Welcome to Popcorn World. These Terms and Conditions outline the rules and regulations for the use of Popcorn World's website and services. By accessing this website and using our services, you accept these terms and conditions in full.
            </p>
            <p className="text-gray-800 leading-relaxed text-lg">
              Do not continue to use Popcorn World if you do not accept all of the terms and conditions stated on this page.
            </p>
          </div>

          {/* Terms Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => (
              <div 
                key={index}
                className="bg-white rounded-lg shadow-sm p-8 md:p-10 hover:shadow-md transition-shadow duration-300"
              >
                <h2 className="sub_heading font-bold text-[#3333cb] mb-6">
                  {section.title}
                </h2>
                <p className="text-gray-700 main_description leading-relaxed text-base md:text-lg">
                  {section.content}
                </p>
              </div>
            ))}
          </div>

          {/* Footer Note */}
          <div className="bg-[#3333cb] text-white rounded-lg p-8 md:p-12 mt-12 text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Questions About Our Terms?
            </h3>
            <p className="main_description leading-relaxed font-light opacity-95 mb-6">
              We're here to help. If you have any questions or concerns about our Terms and Conditions, please don't hesitate to reach out.
            </p>
            <Link href='/contact-us' className="bg-[#8BC34A] text-[#fff] px-8 py-3 rounded-full font-semibold text-lg  transition-all duration-300 transform hover:scale-105">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsAndConditions;