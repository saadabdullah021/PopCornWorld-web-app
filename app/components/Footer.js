import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaBehance,
  FaGooglePlusG,
  FaPhone,
  FaEnvelopeOpen,
  FaMapMarkerAlt,
  FaArrowRight,
} from "react-icons/fa";
import logo from '../../public/fundraiserLogo.png'
import Image from "next/image";
const Footer = ({ footerSolidBg }) => {
  return (
    <footer
      className={`relative ${
        footerSolidBg ? "bg-black" : "bg-black"
      } text-gray-400 overflow-hidden`}
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute w-96 h-96 rounded-full bg-primary animate-pulse -top-48 -left-48"></div>
        <div className="absolute w-64 h-64 rounded-full bg-primary animate-pulse -bottom-32 -right-32 animation-delay-2000"></div>
      </div>

      {/* CTA Section */}
      {/* {!footerSolidBg && (
        <div className="absolute top-0 left-0 w-full -translate-y-1/2 z-20">
          <div className="bg-primary relative px-6 py-12 text-center md:text-left md:flex md:items-center md:justify-between transform transition-all duration-700 hover:scale-[1.02] hover:shadow-2xl">
            <div className="transform transition-all duration-500">
              <span className="block text-white font-medium mb-2 opacity-90 hover:opacity-100 transition-opacity duration-300">
                25 Years Of Experience In Crowdfunding
              </span>
              <h3 className="text-2xl md:text-4xl font-bold text-white transition-all duration-300 hover:text-gray-100">
                Raise Hand to Promote Best Products
              </h3>
            </div>
            <div className="mt-6 md:mt-0">
              <Link
                href="/contact"
                className="group inline-flex items-center px-8 py-4 border-2 border-white text-white rounded-full hover:bg-white hover:text-primary transition-all duration-300 transform hover:scale-105 hover:shadow-lg relative overflow-hidden"
              >
                <span className="relative z-10">Promote Your Products</span>
                <FaArrowRight className="ml-3 transform group-hover:translate-x-1 transition-transform duration-300" />
                <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </Link>
            </div>
          </div>
        </div>
      )} */}

      {/* Footer Content */}
      <div className={`${footerSolidBg ? "pt-16" : "pt-20"} pb-8 relative z-10`}>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* About */}
            <div className="transform transition-all duration-500 ">
              <Image
                src={logo}
                alt="Funden"
                className="mb-6 transition-all duration-300 hover:scale-105"
              />
              <p className="text-white mb-6 leading-relaxed transition-colors duration-300 hover:text-gray-200">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              </p>
              <div>
                <h5 className="text-lg font-semibold text-white mb-4 relative">
                  Join Newsletters
                  <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-primary transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></div>
                </h5>
                <form className="relative group">
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full h-12 rounded-full border border-gray-700 bg-transparent px-5 pr-14 text-sm text-gray-300 focus:outline-none focus:border-primary focus:shadow-lg focus:shadow-primary/20 transition-all duration-300 placeholder:transition-colors placeholder:duration-300 focus:placeholder:text-gray-400"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1 h-10 w-10 flex items-center justify-center rounded-full bg-primary text-white hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 transform hover:scale-110 active:scale-95"
                  >
                    <FaArrowRight className="transform transition-transform duration-300 group-hover:translate-x-0.5" />
                  </button>
                </form>
              </div>
            </div>

            {/* Projects */}
            <div className="transform transition-all duration-500 ">
              <h4 className="text-lg font-semibold text-white mb-6 relative group">
                Our Projects
                <div className="absolute bottom-0 left-0 w-16 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </h4>
              <ul className="space-y-3">
                {[
                  "Medical & Health",
                  "Educations",
                  "Technology",
                  "Web Development",
                  "Food & Clothes",
                  "Video & Movies",
                ].map((item, idx) => (
                  <li key={idx} className="transform transition-all duration-200">
                    <Link
                      href="#"
                      className="group flex items-center text-gray-400 hover:text-primary transition-all duration-300 py-1 hover:translate-x-2"
                    >
                      <FaArrowRight className="mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-xs" />
                      <span className="transition-all duration-300">{item}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div className="transform transition-all duration-500 ">
              <h4 className="text-lg font-semibold text-white mb-6 relative group">
                Support
                <div className="absolute bottom-0 left-0 w-16 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </h4>
              <ul className="space-y-3">
                {[
                  "Privacy Policy",
                  "Conditions",
                  "Company",
                  "Faq & Terms",
                  "Contact Us",
                ].map((item, idx) => (
                  <li key={idx} className="transform transition-all duration-200">
                    <Link
                      href="#"
                      className="group flex items-center text-gray-400 hover:text-primary transition-all duration-300 py-1 hover:translate-x-2"
                    >
                      <FaArrowRight className="mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-xs" />
                      <span className="transition-all duration-300">{item}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="transform transition-all duration-500 ">
              <h4 className="text-lg font-semibold text-white mb-6 relative group">
                Contact Us
                <div className="absolute bottom-0 left-0 w-20 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </h4>
              <ul className="space-y-6">
                <li className="group flex items-center transform transition-all duration-300 hover:translate-x-2">
                  <span className="h-12 w-12 flex items-center justify-center rounded-full bg-primary text-white mr-4 transition-all duration-300  group-hover:shadow-lg group-hover:shadow-primary/30">
                    <FaPhone className="transform transition-transform duration-300 " />
                  </span>
                  <span>
                    <span className="block text-sm text-gray-400 mb-1 transition-colors duration-300 group-hover:text-gray-300">
                      Phone Number
                    </span>
                    <a 
                      href="tel:+01234578933" 
                      className="text-white hover:text-primary transition-colors duration-300 font-medium"
                    >
                      +012(345) 78 93
                    </a>
                  </span>
                </li>
                <li className="group flex items-center transform transition-all duration-300 hover:translate-x-2">
                  <span className="h-12 w-12 flex items-center justify-center rounded-full bg-primary text-white mr-4 transition-all duration-300  group-hover:shadow-lg group-hover:shadow-primary/30">
                    <FaEnvelopeOpen className="transform transition-transform duration-300 " />
                  </span>
                  <span>
                    <span className="block text-sm text-gray-400 mb-1 transition-colors duration-300 group-hover:text-gray-300">
                      Email Address
                    </span>
                    <a 
                      href="mailto:support@gmail.com" 
                      className="text-white hover:text-primary transition-colors duration-300 font-medium"
                    >
                      support@gmail.com
                    </a>
                  </span>
                </li>
                <li className="group flex items-center transform transition-all duration-300 hover:translate-x-2">
                  <span className="h-12 w-12 flex items-center justify-center rounded-full bg-primary text-white mr-4 transition-all duration-300  group-hover:shadow-lg group-hover:shadow-primary/30">
                    <FaMapMarkerAlt className="transform transition-transform duration-300 " />
                  </span>
                  <span>
                    <span className="block text-sm text-gray-400 mb-1 transition-colors duration-300 group-hover:text-gray-300">
                      Locations
                    </span>
                    <a 
                      href="https://maps.google.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-white hover:text-primary transition-colors duration-300 font-medium"
                    >
                      59 Main Street, USA
                    </a>
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Area */}
          <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm transition-colors duration-300 hover:text-gray-300">
              © {new Date().getFullYear()}{" "}
              <a 
                href="#" 
                className="text-primary hover:text-white transition-colors duration-300 font-semibold"
              >
                Funden
              </a>{" "}
              . All Rights Reserved
            </p>
            <div className="flex space-x-3 mt-6 md:mt-0">
              {[
                { icon: FaFacebookF, href: "#", label: "Facebook" },
                { icon: FaTwitter, href: "#", label: "Twitter" },
                { icon: FaYoutube, href: "#", label: "YouTube" },
                { icon: FaBehance, href: "#", label: "Behance" },
                { icon: FaGooglePlusG, href: "#", label: "Google Plus" },
              ].map(({ icon: Icon, href, label }, idx) => (
                <a
                  key={idx}
                  href={href}
                  aria-label={label}
                  className="group w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-white hover:bg-primary transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-1"
                >
                  <Icon className="transform transition-transform duration-300 group-hover:scale-110" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>


    </footer>
  );
};

export default Footer;