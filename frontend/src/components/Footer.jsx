import React from 'react';
import FaInstagram from '../icons/FaInstagram.png';
import FaTwitter from '../icons/FaTwitter.png';
import FaPaperPlane from '../icons/FaPaperPlane.png';

const Footer = () => {
  return (
    <footer className="bg-[#f5f5fa] border-t border-gray mt-16 py-6">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">

        {/* Icons as images */}
        <div className="flex space-x-4 text-xl text-blue-900">
          <a href="#" aria-label="Instagram">
            <img src={FaInstagram} alt="Instagram" className="w-6 h-6" />
          </a>
          <a href="#" aria-label="PaperPlane">
            <img src={FaPaperPlane} alt="PaperPlane" className="w-6 h-6" />
          </a>
          <a href="#" aria-label="Twitter">
            <img src={FaTwitter} alt="Twitter" className="w-6 h-6" />
          </a>
        </div>

        {/* Links */}
        <div className="flex space-x-6 text-sm text-gray-600">
          <a href="#" className="hover:text-blue-600">Privacy</a>
          <a href="#" className="hover:text-blue-600">Terms</a>
          <a href="#" className="hover:text-blue-600">Cookie Policy</a>
        </div>

        {/* Copyright */}
        <div className="text-xs text-gray-500">
          © 2025 Group4 All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
