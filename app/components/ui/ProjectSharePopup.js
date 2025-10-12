'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import toast, { Toaster } from 'react-hot-toast';
import { FaFacebook, FaLinkedin, FaWhatsapp, FaInstagram, FaTelegram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

// ----------  QR  ----------
const QRCodeGenerator = ({ url, size = 100 }) => {
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(url)}`;
  return (
    <div className="flex justify-center">
      <Image src={qrUrl} alt="QR Code" width={120} height={120} className="rounded-lg" />
    </div>
  );
};

// ----------  POPUP  ----------
const ProjectSharePopup = ({ isOpen, onClose, project }) => {
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') setCurrentUrl(window.location.origin);
  }, []);

  /*  NEW:  build full URL once  */
  const shareUrl = `${currentUrl}/campaigns/${project?.slug}`;
  const shareTitle = project?.title || "Coach Kim's Pop-Up Store - Help Support Our Track Team!";

  /*  NEW:  share title + URL  */
  const shareNative = () =>
    navigator.share
      ? navigator.share({ title: shareTitle, url: shareUrl }).catch(() => { })
      : navigator.clipboard.writeText(shareUrl).then(() => toast.success('Link copied!'));

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success('Copied!', { position: 'top-center', duration: 1500 });
    } catch {
      toast.error('Failed to copy', { position: 'bottom-center' });
    }
  };

  const shareOptions = [
    {
      name: 'Facebook',
      icon: <FaFacebook size={20} />,
      color: 'bg-[#1877F2]',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'X',
      icon: <FaXTwitter size={18} />,
      color: 'bg-black',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'LinkedIn',
      icon: <FaLinkedin size={20} />,
      color: 'bg-[#0A66C2]',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'WhatsApp',
      icon: <FaWhatsapp size={20} />,
      color: 'bg-[#25D366]',
      url: `https://wa.me/?text=${encodeURIComponent(shareTitle + ' ' + shareUrl)}`
    },
    {
      name: 'Telegram',
      icon: <FaTelegram size={20} />,
      color: 'bg-[#0088CC]',
      url: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`
    },
    {
      name: 'Instagram',
      icon: <FaInstagram size={20} />,
      color: 'bg-gradient-to-r from-purple-500 to-pink-500',
      url: '#' // no direct share
    }
  ];

  const handleShare = (option) => {
    if (option.name === 'Instagram') {
      copyToClipboard();
      toast('Link copied! Open Instagram to share', { position: 'bottom-center', duration: 2000 });
      return;
    }
    window.open(option.url, '_blank', 'noopener,noreferrer');
  };

  if (!isOpen) return null;

  return (
    <>
      <Toaster />
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
        <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl transform animate-scaleIn">
          {/* ----  header  ---- */}
          <div className="relative p-6 pb-4">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-x-3 lg:mb-4 border-b pb-4 border-gray-200">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-black">Quick share options</h3>
                <p className="text-sm font-medium text-gray-700">Share this fundraiser and make a bigger impact by reaching more donors.</p>
              </div>
            </div>
          </div>

          {/* ----  body  ---- */}
          <div className="px-6 pb-6 flex items-center justify-between flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-6">
            <div className="w-full">
              {/*  URL + Copy  */}
              <div className="bg-gray-100 rounded-xl p-3">
                <div className="flex items-center space-x-3">
                  <input
                    type="text"
                    value={shareUrl}
                    readOnly
                    className="flex-1 text-sm text-gray-600 bg-transparent border-none outline-none font-mono"
                  />
                  <button
                    onClick={copyToClipboard}
                    className="bg-[#8bc34a] cursor-pointer text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span>Copy</span>
                  </button>
                </div>
              </div>

              {/*  Social Icons  */}
              <div className="flex justify-start flex-wrap sm:flex-nowrap space-y-4 space-x-4 py-4">
                {shareOptions.map((opt) => (
                  <button
                    key={opt.name}
                    onClick={() => handleShare(opt)}
                    className={`${opt.color} text-white cursor-pointer w-12 h-12 flex items-center justify-center rounded-full hover:shadow-xl transition-all duration-200 transform hover:scale-105 shadow-2xl focus:outline-none`}
                    title={opt.name}
                  >
                    {opt.icon}
                  </button>
                ))}

                {/*  Native share icon (title + URL)  */}
                <button
                  onClick={shareNative}
                  className="bg-gray-800 text-white w-12 h-12 flex items-center justify-center rounded-full hover:shadow-xl transition-all duration-200 transform hover:scale-105 shadow-2xl"
                  title="System share"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                </button>
              </div>
            </div>

            {/*  QR  */}
            <div className="text-center w-full lg:w-[40%]">
              <QRCodeGenerator url={shareUrl} size={120} />
              <p className="text-xs font-medium text-gray-500 mt-2">Scan to share</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectSharePopup;