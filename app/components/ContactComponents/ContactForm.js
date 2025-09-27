'use client'
import React, { useState } from 'react';


const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});

  // Validation rules
  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'name':
        if (!value.trim() || value.length < 3) {
          error = 'Name must be at least 3 characters.';
        }
        break;

      case 'phone':
        if (!/^\d{10,15}$/.test(value)) {
          error = 'Enter a valid phone number (10–15 digits).';
        }
        break;

      case 'email':
        if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
          error = 'Enter a valid email address.';
        }
        break;

      case 'subject':
        if (!value.trim()) {
          error = 'Subject is required.';
        }
        break;

      case 'message':
        if (!value.trim() || value.length < 10) {
          error = 'Message must be at least 10 characters.';
        }
        break;

      default:
        break;
    }

    return error;
  };

  // On change with real-time validation
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    // Validate this specific field
    setErrors({
      ...errors,
      [name]: validateField(name, value),
    });
  };

  // Full form validation on submit
  const validateForm = () => {
    let newErrors = {};
    Object.keys(formData).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      alert('Form submitted successfully ✅');
      setFormData({
        name: '',
        phone: '',
        email: '',
        subject: '',
        message: '',
      });
      setErrors({});
    }
  };

  return (
    <section className="py-0 lg:pt-4 lg:pb-12 px-0  bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Contact Form Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 shadow-2xl rounded-3xl overflow-hidden">
          {/* Map */}
          <div className="bg-gray-200 min-h-[500px] relative">
        
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19798554.33307197!2d-25.368250748785513!3d52.71747136828894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x25a3b1142c791a9%3A0xc4f8a0433288257a!2sUnited%20Kingdom!5e0!3m2!1sen!2s!4v1758829670262!5m2!1sen!2s" 
                  className="w-full h-full min-h-[500px] border-0" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>

          {/* Contact Form */}
          <div className="bg-green-50 p-8 md:p-12 lg:p-16">
            <form onSubmit={handleSubmit} className="space-y-6">
              <h3 className="text-3xl md:text-4xl font-splash  text-black mb-8">
                Send Us Message
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Willie M. Stanley"
                    className={`w-full px-4 py-3 border border-green-500  bg-white outline-none ${
                      errors.name ? 'border-red-500 focus:ring-red-500' : ''
                    }`}
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 234 567 8900"
                    className={`w-full px-4 py-3 border border-green-500 bg-white outline-none ${
                      errors.phone ? 'border-red-500 focus:ring-red-500' : ''
                    }`}
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Email */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="support@gmail.com"
                    className={`w-full px-4 py-3 border border-green-500 bg-white outline-none ${
                      errors.email ? 'border-red-500 focus:ring-red-500' : ''
                    }`}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="I would like to"
                    className={`w-full px-4 py-3 border border-green-500 bg-white outline-none ${
                      errors.subject ? 'border-red-500 focus:ring-red-500' : ''
                    }`}
                  />
                  {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Write Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  placeholder="Hello"
                  className={`w-full px-4 py-3 border border-green-500 bg-white outline-none resize-none ${
                    errors.message ? 'border-red-500 focus:ring-red-500' : ''
                  }`}
                />
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
              </div>

              {/* Submit */}
              <div>
                <button
                  type="submit"
                  className="group inline-flex items-center gap-3 px-6 py-3 text-white font-medium rounded-full bg-[#000] hover:border-transparent transition-all duration-300"
                >
                  Send Us Message
              
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
