import React from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { BsYoutube } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-pink-500 via-purple-600 to-blue-500 text-white pt-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
        {/* Products */}
        <div className="text-center md:text-start">
          <h2 className="text-lg font-semibold mb-4">Products</h2>
          <ul className="space-y-2">
            {["Flutter", "React", "Android", "iOS"].map((item) => (
              <li key={item}>
                <a className="text-gray-200 hover:text-yellow-300 transition-colors duration-300" href="#">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Design to Code */}
        <div className="text-center md:text-start">
          <h2 className="text-lg font-semibold mb-4">Design to Code</h2>
          <ul className="space-y-2">
            {["Figma plugin", "Templates"].map((item) => (
              <li key={item}>
                <a className="text-gray-200 hover:text-green-300 transition-colors duration-300" href="#">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Comparison */}
        <div className="text-center md:text-start">
          <h2 className="text-lg font-semibold mb-4">Comparison</h2>
          <ul className="space-y-2">
            {[
              "DhiWise vs Anima",
              "DhiWise vs Appsmith",
              "DhiWise vs FlutterFlow",
              "DhiWise vs Monday Hero",
              "DhiWise vs Retool",
              "DhiWise vs Bubble",
              "DhiWise vs Figma Dev Mode",
            ].map((item) => (
              <li key={item}>
                <a className="text-gray-200 hover:text-pink-300 transition-colors duration-300" href="#">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div className="text-center md:text-start">
          <h2 className="text-lg font-semibold mb-4">Company</h2>
          <ul className="space-y-2">
            {["About Us", "Contact Us", "Career", "Terms of Service", "Privacy Policy"].map((item) => (
              <li key={item}>
                <a className="text-gray-200 hover:text-cyan-300 transition-colors duration-300" href="#">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-12 border-t border-white/20 py-6 px-6 flex flex-col md:flex-row justify-between items-center">
        <div className="text-2xl font-bold mb-4 md:mb-0">
          Cilli<span className="text-yellow-400">Blog</span>
        </div>
        <div className="text-gray-200 text-sm mb-4 md:mb-0">
          &copy; 2024 CilliBlog. All rights reserved
        </div>
        <div className="flex space-x-6 text-white">
          <a href="#" className="hover:text-gray-800 transition-colors duration-300">
            <FaGithub size={24} />
          </a>
          <a href="#" className="hover:text-red-500 transition-colors duration-300">
            <BsYoutube size={24} />
          </a>
          <a href="#" className="hover:text-blue-400 transition-colors duration-300">
            <FaLinkedin size={24} />
          </a>
          <a href="#" className="hover:text-sky-400 transition-colors duration-300">
            <FaTwitter size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
