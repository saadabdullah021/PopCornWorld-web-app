'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
import ContactForm from '../components/ContactComponents/ContactForm';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  return (
    <section className="py-20 lg:pt-40 lg:pb-12 px-4 bg-white">
      <div className="max-w-7xl mx-auto">


        {/* Contact Form Section */}
<ContactForm/>

  
      

          {/* Right Info Boxes */}
          <div className=" py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-5">
              {/* Location Box */}
              <div className="text-center">
                <div className="relative mb-4">
                  <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-green-600/30 relative z-10">
                    <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="bg-green-50 pt-12 pb-6 px-8 -mt-10 rounded-2xl">
                    <h5 className="text-xl font-bold text-black mb-3">Our Location</h5>
                    <p className="text-gray-600">5075 Main Road, D- Block, 2nd Floor, New York</p>
                  </div>
                </div>
              </div>

              {/* Support Box */}
              <div className="text-center">
                <div className="relative mb-4">
                  <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-green-600/30 relative z-10">
                    <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <div className="bg-green-50 pt-12 pb-6 px-8 -mt-10 rounded-2xl">
                    <h5 className="text-xl font-bold text-black mb-3">Support 24/7</h5>
                    <p className="text-gray-600">
                      +012 (345) 689 37<br />
                      012345687
                    </p>
                  </div>
                </div>
              </div>

              {/* Email Box */}
              <div className="text-center md:col-span-1">
                <div className="relative mb-4">
                  <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-green-600/30 relative z-10">
                    <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <div className="bg-green-50 pt-12 pb-6 px-8 -mt-10 rounded-2xl">
                    <h5 className="text-xl font-bold text-black mb-3">Email Address</h5>
                    <p className="text-gray-600">
                      supportinfo@gmail.com<br />
                      www.funden.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  
    </section>
  );
};

export default ContactSection;