import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaPhone,
  FaEnvelopeOpen,
  FaMapMarkerAlt,
  FaArrowRight,
  FaInstagram,
} from "react-icons/fa";
import logo from '../../public/fundraiserLogo.webp'
import Image from "next/image";
const Footer = ({ footerSolidBg }) => {
  return (
    <footer
      className={`relative ${footerSolidBg ? "bg-[#3333cc]" : "bg-[#3333cc]"
        } text-[#C8CED6] overflow-hidden`}
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute w-96 h-96 rounded-full bg-primary animate-pulse -top-48 -left-48"></div>
        <div className="absolute w-64 h-64 rounded-full bg-primary animate-pulse -bottom-32 -right-32 animation-delay-2000"></div>
      </div>


      {/* Footer Content */}
      <div className={`${footerSolidBg ? "pt-16" : "pt-20"} pb-8 relative z-10`}>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1  lg:grid-cols-4 gap-10">
            {/* About */}
            <div className="transform transition-all duration-500 ">
              <Image
                src={logo}
                alt="popcorn world"
                className="mb-6 transition-all duration-300 hover:scale-101"
              />
              <p className="text-white mb-6 leading-relaxed text-[16px] font-light transition-colors duration-300 hover:text-gray-200">
                We believe Popcorn should be more than just a snack.
                It's a journey of taste inspired by flavors from around the world. From sweet to savory, every bite tells a delicious story.
              </p>
              <div className="flex space-x-3 mt-6 md:mt-0">
                {[
                  { icon: FaFacebookF, href: "https://web.facebook.com/popcornworldoaklawn", label: "Facebook" },
                  { icon: FaInstagram, href: "https://www.instagram.com/doingtheworldaflavor/", label: "Instagram" },
                  { icon: FaTwitter, href: "https://x.com/Popcorn_World_", label: "Twitter" },

                ].map(({ icon: Icon, href, label }, idx) => (
                  <a
                    key={idx}
                    href={href}
                    aria-label={label}
                    className="group w-10 h-10 flex items-center justify-center rounded-full bg-[#8BC34A] text-white hover:bg-primary transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-1"
                  >
                    <Icon className="transform transition-transform duration-300 group-hover:scale-110" />
                  </a>
                ))}
              </div>

            </div>

            {/* Projects */}
            <div className="transform transition-all duration-500   lg:pl-12">
              <h4 className="text-[22px] capitalize font-semibold text-white mb-6 relative group">
                Our Projects
                <div className="absolute bottom-0 left-0 w-16 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </h4>
              <ul className="space-y-3">
                {[
                  { label: "Fundraising", href: "/fundraising" },
                  { label: "Shop Popcorn", href: "/shop" },
                  { label: "About", href: "/about-us" },
                  { label: "Track Order", href: "/track-an-order" },
                ].map(({ label, href }, idx) => (
                  <li key={idx} className="transform transition-all duration-200">
                    <Link
                      href={href}
                      className="group text-gray-100 hover:text-primary transition-all duration-300 py-1 hover:translate-x-2 inline-block"
                    >
                      <span className="relative inline-block after:content-[''] after:absolute after:left-0 after:-bottom-[2px] after:h-[2px] after:bg-[#ffc222] after:w-0 group-hover:after:w-full after:transition-all after:duration-300 after:origin-left">
                        <span className="text-[16px] font-light">{label}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

            </div>


            {/* Quick Links */}
            <div className="transform transition-all duration-500 ">
              <h4 className="text-[22px] capitalize font-semibold text-white mb-6 relative group">
                Quick Links
                <div className="absolute bottom-0 left-0 w-16 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </h4>
              <ul className="space-y-3">
                {[
                  { label: "Privacy Policy", href: "/privacy-policy" },
                  { label: "Conditions", href: "/terms-and-conditions" },
                  { label: "Contact Us", href: "/contact-us" },
                ].map(({ label, href }, idx) => (
                  <li key={idx} className="transform transition-all duration-200">
                    <Link
                      href={href}
                      className="group text-gray-100 hover:text-primary transition-all duration-300 py-1 hover:translate-x-2 inline-block"
                    >
                      <span className="relative inline-block after:content-[''] after:absolute after:left-0 after:-bottom-[2px] after:h-[2px] after:bg-[#ffc222] after:w-0 group-hover:after:w-full after:transition-all after:duration-300 after:origin-left">
                        <span className="text-[16px] font-light">{label}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>


            {/* Contact */}
            <div className="transform transition-all duration-500 ">
              <h4 className="text-[22px] capitalize font-semibold text-white mb-6 relative group">
                Contact Us
                <div className="absolute bottom-0 left-0 w-20 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-1 transition-transform duration-300"></div>
              </h4>
              <ul className="space-y-6">
                <li className="group flex items-center transform transition-all duration-300 hover:translate-x-2">
                  <span className="h-12 w-12 flex items-center justify-center rounded-full bg-primary text-white mr-4 transition-all duration-300  group-hover:shadow-lg group-hover:shadow-primary/30">
                    <FaPhone className="transform transition-transform duration-300 " />
                  </span>
                  <span>

                    <a
                      href="tel:01234578933"
                      className="text-white hover:text-primary transition-colors duration-300 font-medium"
                    >
                      219-427-1806
                    </a>
                  </span>
                </li>
                <li className="group flex items-start transform transition-all duration-300 hover:translate-x-2">
                  <span className="h-12 w-12 flex-shrink-0 flex items-center justify-center rounded-full bg-primary text-white mr-4 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/30">
                    <FaEnvelopeOpen className="transform transition-transform duration-300" />
                  </span>
                  <span className="min-w-0">

                    <a
                      href="mailto:orders@doingtheworldaflavor.com"
                      className="text-white hover:text-primary transition-colors duration-300 font-medium break-words"
                    >
                      orders@doingtheworldaflavor.com
                    </a>
                  </span>
                </li>
                <li className="group flex items-start transform transition-all duration-300 hover:translate-x-2">
                  <span className="h-12 w-12 flex-shrink-0 flex items-center justify-center rounded-full bg-primary text-white mr-4 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/30">
                    <FaMapMarkerAlt className="transform transition-transform duration-300" />
                  </span>
                  <span className="min-w-0">

                    <a
                      href="https://maps.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-primary transition-colors duration-300 font-medium break-words"
                    >
                      2560 Garfield St Suite 3, Gary, IN 46404
                    </a>
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Area */}
          <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-center items-center">
            <p className="text-gray-100 text-[16px] font-light transition-colors duration-300 hover:text-gray-300">
              © {new Date().getFullYear()}{" "}
              <a
                href="/"
                className="text-primary hover:text-white transition-colors duration-300 font-semibold"
              >
                Popcorn World
              </a>{" "}
              . All Rights Reserved
            </p>

          </div>
        </div>
      </div>


    </footer>
  );
};

export default Footer;