// pages/privacy-policy.js
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const PrivacyPolicy = () => {
  const sections = [
    {
      title: "1. Information We Collect",
      subsections: [
        {
          subtitle: "Personal Information",
          content: "We collect personal information that you voluntarily provide to us when you register for an account, make a purchase, start a fundraiser, or contact us. This may include your name, email address, mailing address, phone number, payment information, and fundraising organization details."
        },
        {
          subtitle: "Automatic Information",
          content: "When you visit our website, we automatically collect certain information about your device, including your IP address, browser type, operating system, referring URLs, and browsing behavior. We use cookies and similar tracking technologies to collect this information."
        }
      ]
    },
    {
      title: "2. How We Use Your Information",
      content: "We use the information we collect to process your orders and manage your fundraising campaigns, communicate with you about your orders, fundraisers, and our services, improve our website and services, personalize your experience, send you marketing communications (with your consent), prevent fraud and enhance security, comply with legal obligations, and analyze usage patterns to improve our offerings."
    },
    {
      title: "3. Sharing Your Information",
      subsections: [
        {
          subtitle: "With Fundraising Organizations",
          content: "If you make a purchase supporting a fundraiser, we share relevant information with the fundraising organization, including your name and purchase details, to facilitate the fundraising process and proper attribution of funds."
        },
        {
          subtitle: "With Service Providers",
          content: "We share information with third-party service providers who perform services on our behalf, such as payment processing, shipping, email delivery, and website analytics. These providers are contractually obligated to protect your information."
        },
        {
          subtitle: "Legal Requirements",
          content: "We may disclose your information if required by law, legal process, or government request, or if we believe disclosure is necessary to protect our rights, your safety, or the safety of others."
        }
      ]
    },
    {
      title: "4. Cookies and Tracking Technologies",
      content: "We use cookies, web beacons, and similar technologies to enhance your browsing experience, analyze site traffic, and understand user behavior. Cookies are small data files stored on your device. You can control cookie settings through your browser, but disabling cookies may limit your ability to use certain features of our website."
    },
    {
      title: "5. Data Security",
      content: "We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is completely secure. While we strive to protect your information, we cannot guarantee absolute security."
    },
    {
      title: "6. Your Privacy Rights",
      subsections: [
        {
          subtitle: "Access and Correction",
          content: "You have the right to access, update, or correct your personal information. You can do this by logging into your account or contacting us directly."
        },
        {
          subtitle: "Deletion",
          content: "You may request deletion of your personal information, subject to certain legal exceptions. We may retain certain information as required by law or for legitimate business purposes."
        },
        {
          subtitle: "Marketing Communications",
          content: "You can opt out of receiving marketing emails by clicking the unsubscribe link in any marketing email or by contacting us. Note that you will still receive transactional emails related to your orders or account."
        },
        {
          subtitle: "California Privacy Rights",
          content: "California residents have additional rights under the California Consumer Privacy Act (CCPA), including the right to know what personal information is collected, the right to delete personal information, and the right to opt-out of the sale of personal information."
        }
      ]
    },
    {
      title: "7. Children's Privacy",
      content: "Our services are not directed to children under the age of 13, and we do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us, and we will delete such information from our systems."
    },
    {
      title: "8. Third-Party Links",
      content: "Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to read the privacy policies of any third-party sites you visit."
    },
    {
      title: "9. Data Retention",
      content: "We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When we no longer need your information, we will securely delete or anonymize it."
    },
    {
      title: "10. International Data Transfers",
      content: "Your information may be transferred to and processed in countries other than your country of residence. These countries may have different data protection laws. By using our services, you consent to the transfer of your information to the United States and other countries where we operate."
    },
    {
      title: "11. Changes to This Privacy Policy",
      content: "We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the 'Last Updated' date. Your continued use of our services after changes are posted constitutes acceptance of the updated policy."
    },
    {
      title: "12. Contact Us",
      content: "If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at: orders@doingtheworldaflavor.com. We are committed to addressing your privacy concerns and will respond to your inquiries in a timely manner."
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
                Your Privacy Matters
              </h2>
            </div>

            <h1 className="main_heading font-splash  leading-tight tracking-tight uppercase mb-8">
              Privacy Policy
            </h1>

            <div className="max-w-4xl mx-auto">
              <p className="main_description leading-relaxed font-light opacity-95">
                At Popcorn World, we are committed to protecting your privacy and ensuring the security of your personal information
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
            <h2 className="text-3xl md:text-4xl font-bold text-[#8ac24a] mb-6">
              Our Commitment to You
            </h2>
            <p className="text-gray-800 leading-relaxed text-lg mb-6">
              This Privacy Policy describes how Popcorn World collects, uses, shares, and protects your personal information when you use our website, make purchases, or participate in our fundraising programs.
            </p>
            <p className="text-gray-800 leading-relaxed text-lg">
              By using our services, you agree to the collection and use of information in accordance with this policy. We encourage you to read this policy carefully to understand our practices regarding your personal information.
            </p>
          </div>

          {/* Privacy Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => (
              <div 
                key={index}
                className="bg-white rounded-lg shadow-sm p-8 md:p-10 hover:shadow-md transition-shadow duration-300"
              >
                <h2 className="text-2xl md:text-3xl font-bold text-[#8ac24a] mb-6">
                  {section.title}
                </h2>
                
                {section.content && (
                  <p className="text-gray-700 leading-relaxed text-base md:text-lg mb-4">
                    {section.content}
                  </p>
                )}

                {section.subsections && (
                  <div className="space-y-6 mt-6">
                    {section.subsections.map((subsection, subIndex) => (
                      <div key={subIndex} className="pl-6 border-l-4 border-[#8bc34a]">
                        <h3 className="sub_heading font-semibold text-gray-800 mb-3">
                          {subsection.subtitle}
                        </h3>
                        <p className="text-gray-700 main_description leading-relaxed text-base md:text-lg">
                          {subsection.content}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Key Highlights Box */}
          <div className="bg-gradient-to-r from-[#3333cb] to-[#4444db] text-white rounded-lg p-8 md:p-12 mt-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center">
              Your Privacy Rights at a Glance
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                <div className="text-4xl mb-3">🔒</div>
                <h4 className="text-xl font-semibold mb-2">Secure Data</h4>
                <p className="text-sm md:text-base opacity-90">
                  Your information is protected with industry-standard security measures
                </p>
              </div>
              <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                <div className="text-4xl mb-3">✓</div>
                <h4 className="text-xl font-semibold mb-2">Your Control</h4>
                <p className="text-sm md:text-base opacity-90">
                  Access, update, or delete your personal information at any time
                </p>
              </div>
              <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                <div className="text-4xl mb-3">📧</div>
                <h4 className="text-xl font-semibold mb-2">Email Preferences</h4>
                <p className="text-sm md:text-base opacity-90">
                  Opt out of marketing emails while staying informed about your orders
                </p>
              </div>
              <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                <div className="text-4xl mb-3">🤝</div>
                <h4 className="text-xl font-semibold mb-2">Transparency</h4>
                <p className="text-sm md:text-base opacity-90">
                  Clear information about how we collect and use your data
                </p>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-white rounded-lg shadow-sm p-8 md:p-12 mt-8 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-[#8ac24a] mb-4">
              Questions About Your Privacy?
            </h3>
            <p className="main_description leading-relaxed text-gray-700 mb-6">
              We're committed to transparency and protecting your personal information. If you have any questions or concerns, we're here to help.
            </p>
            <Link href='/contact-us' className="bg-[#8BC34A] text-white px-8 py-3 rounded-full font-semibold text-lg  transition-all duration-300 transform hover:scale-105 shadow-lg">
              Contact Privacy Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;