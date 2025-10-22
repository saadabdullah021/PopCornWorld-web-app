"use client";
import React, { useState } from "react";
import { User, Phone, Mail, FileText, MessageSquare } from "lucide-react";
import { sendContactForm } from "@/app/services/api";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // ----------  REAL-TIME VALIDATION  ----------
  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "name":
        if (!value.trim() || value.length < 3) {
          error = "Name must be at least 3 characters.";
        }
        break;
      case "phone":
        if (!/^\d{10,15}$/.test(value)) {
          error = "Enter a valid phone number (10–15 digits).";
        }
        break;
      case "email":
        if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
          error = "Enter a valid email address.";
        }
        break;
      case "subject":
        if (!value.trim()) {
          error = "Subject is required.";
        }
        break;
      case "message":
        if (!value.trim() || value.length < 10) {
          error = "Message must be at least 10 characters.";
        }
        break;
      default:
        break;
    }
    return error;
  };

  // Handle input changes with validation
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: validateField(name, value),
    });
  };

  // Validate all fields
  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      const err = validateField(field, formData[field]);
      if (err) newErrors[field] = err;
    });
    if (!captchaValue) newErrors.captcha = 'Please complete the reCAPTCHA.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      await sendContactForm(
        formData,
        (res) => {
          alert(res.message || "Message sent successfully ✅");
          setFormData({
            name: "",
            phone: "",
            email: "",
            subject: "",
            message: "",
          });
          setErrors({});
        },
        (errMsg) => {
          alert(errMsg || "Failed to send message ❌");
        }
      );
    } catch (error) {
      alert("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/30 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl border border-gray-100 bg-white">
          {/* Map */}
          <div className="relative min-h-[400px] lg:min-h-[600px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19798554.33307197!2d-25.368250748785513!3d52.71747136828894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x25a3b1142c791a9%3A0xc4f8a0433288257a!2sUnited%20Kingdom!5e0!3m2!1sen!2s!4v1758829670262!5m2!1sen!2s"
              className="w-full h-full border-0"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* Contact Form */}
          <div className="bg-green-50 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-8">
              <MessageSquare size={28} className="text-[#8BC34A]" />
              <h3 className="main_heading font-splash lg:whitespace-nowrap text-black mb-8">
                Send Us Message
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Name */}
              <FormField
                icon={<User size={18} className="text-gray-500" />}
                label="Your Name *"
                name="name"
                type="text"
                placeholder="Willie M. Stanley"
                value={formData.name}
                error={errors.name}
                onChange={handleInputChange}
              />

              {/* Phone */}
              <FormField
                icon={<Phone size={18} className="text-gray-500" />}
                label="Phone Number *"
                name="phone"
                type="tel"
                placeholder="+1 234 567 8900"
                value={formData.phone}
                error={errors.phone}
                onChange={handleInputChange}
              />

              {/* Email */}
              <FormField
                icon={<Mail size={18} className="text-gray-500" />}
                label="Email Address *"
                name="email"
                type="email"
                placeholder="orders@doingtheworldaflavor.com"
                value={formData.email}
                error={errors.email}
                onChange={handleInputChange}
              />

              {/* Subject */}
              <FormField
                icon={<FileText size={18} className="text-gray-500" />}
                label="Subject *"
                name="subject"
                type="text"
                placeholder="I would like to..."
                value={formData.subject}
                error={errors.subject}
                onChange={handleInputChange}
              />

              {/* Message */}
              <div>
                <label className="text-sm font-semibold text-black mb-3 flex items-center gap-2">
                  <MessageSquare size={18} className="text-gray-500" />
                  Write Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  placeholder="Write your message here..."
                  className={`w-full px-5 py-4 border rounded-xl bg-white transition-all duration-300 placeholder-gray-500 focus:ring-0 outline-none text-black font-medium text-lg shadow-sm hover:shadow-md resize-none ${
                    errors.message
                      ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                      : "border-gray-200 hover:border-[#8BC34A]"
                  }`}
                />
                {errors.message && (
                  <p className="text-red-500 text-sm font-semibold mt-2">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className={`group inline-flex items-center gap-3 px-8 py-4 text-white font-semibold rounded-full transition-all duration-300 transform active:scale-95 shadow-lg hover:shadow-xl text-lg ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#8BC34A] hover:bg-[#7CB342]"
                  }`}
                >
                  <MessageSquare size={20} />
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

// Small helper component for repeated fields
const FormField = ({ icon, label, name, type, placeholder, value, error, onChange }) => (
  <div>
    <label className="text-sm font-semibold text-black mb-3 flex items-center gap-2">
      {icon}
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full px-5 py-4 border rounded-xl bg-white transition-all duration-300 placeholder-gray-500 focus:ring-0 outline-none text-black font-medium text-lg shadow-sm hover:shadow-md ${
        error
          ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-100"
          : "border-gray-200 hover:border-[#8BC34A]"
      }`}
    />
    {error && (
      <p className="text-red-500 text-sm font-semibold mt-2 flex items-center gap-1">
        <span className="w-1 h-1 bg-red-500 rounded-full"></span>
        {error}
      </p>
    )}
  </div>
);

export default ContactForm;
