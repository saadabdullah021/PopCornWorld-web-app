'use client';
import { useState, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const SITE_KEY = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'; // ← replace with your real key

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [captchaValue, setCaptchaValue] = useState(null);
  const captchaRef = useRef(null);

  // ----------  REAL-TIME VALIDATION  ----------
  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'name':
        if (!value.trim() || value.length < 3) error = 'Name must be at least 3 characters.';
        break;
      case 'phone':
        if (!/^\d{10}$/.test(value)) error = 'Enter a valid phone number (10 digits).';
        break;
      case 'email':
        if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) error = 'Enter a valid email address.';
        break;
      case 'subject':
        if (!value.trim()) error = 'Subject is required.';
        break;
      case 'message':
        if (!value.trim() || value.length < 10) error = 'Message must be at least 10 characters.';
        break;
      default:
        break;
    }
    return error;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // PHONE: strip everything except digits
    const cleanValue = name === 'phone' ? value.replace(/\D/g, '') : value;

    setFormData({ ...formData, [name]: cleanValue });
    setErrors({ ...errors, [name]: validateField(name, cleanValue) });
  };

  // ----------  FULL FORM + CAPTCHA VALIDATION  ----------
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // TODO: send to your endpoint with captcha token
    console.log('Form submitted', formData, captchaValue);
    alert('Form submitted successfully ✅');

    // reset
    setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
    setErrors({});
    captchaRef.current?.reset();
    setCaptchaValue(null);
  };

  return (
    <section className="py-0 lg:pt-4 lg:pb-12 px-0 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 shadow-2xl rounded-3xl overflow-hidden">
          {/* Map – unchanged */}
          <div className="bg-gray-200 min-h-[500px] relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2984.880867809696!2d-87.36162112542841!3d41.57182288453707!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8811c29fcc3b5f7b%3A0x3d8b6b427fcc1f41!2s2560%20Garfield%20St%2C%20Gary%2C%20IN%2046404%2C%20USA!5e0!3m2!1sen!2s!4v1761070923176!5m2!1sen!2s"
              className="w-full h-full min-h-[500px] border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Form – identical visuals, new logic */}
          <div className="bg-green-50 p-8 md:p-12 lg:p-16">
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <h3 className="main_heading font-splash lg:whitespace-nowrap text-black mb-8">Send Us Message</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Willie M. Stanley"
                    className={`w-full px-4 py-3 border border-green-500 bg-white outline-none ${
                      errors.name ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                {/* Phone – digits only */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="xxxxxxxxxx"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={10}
                    className={`w-full px-4 py-3 border border-green-500 bg-white outline-none ${
                      errors.phone ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Email */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="orders@doingtheworldaflavor.com"
                    className={`w-full px-4 py-3 border border-green-500 bg-white outline-none ${
                      errors.email ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="I would like to"
                    className={`w-full px-4 py-3 border border-green-500 bg-white outline-none ${
                      errors.subject ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Write Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  placeholder="Hello"
                  className={`w-full px-4 py-3 border border-green-500 bg-white outline-none resize-none ${
                    errors.message ? 'border-red-500' : ''
                  }`}
                />
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
              </div>

              {/* Free reCAPTCHA v2 */}
              <div>
                <ReCAPTCHA
                  ref={captchaRef}
                  sitekey={SITE_KEY}
                  onChange={setCaptchaValue}
                />
                {errors.captcha && <p className="text-red-500 text-sm mt-1">{errors.captcha}</p>}
              </div>

              {/* Submit – identical text */}
              <div>
                <button
                  type="submit"
                  className="group inline-flex items-center gap-3 px-6 py-3 text-white font-medium rounded-full bg-[#8BC34A] hover:border-transparent transition-all duration-300"
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






