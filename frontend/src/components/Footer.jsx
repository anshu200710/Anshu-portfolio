import React from 'react';
import { Mail } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer
      className="
      bottom-0
      border-t-2
        font-sans py-12 px-4 sm:px-6 lg:px-8
        bg-white text-gray-950
        dark:bg-[#0f011f] dark:text-gray-100
        transition-colors duration-500
      "
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        {/* Brand Name */}
        <p className="text-4xl font-bold mb-2">
          Anshu<span className="text-purple-500">.</span>
        </p>

        {/* Email Address */}
        <a
          href="mailto:anshu2007.dev@gmail.com"
          aria-label="Email anshu2007.dev@gmail.com"
          className="
            flex items-center
            mb-12
            text-gray-800 dark:text-gray-400
            hover:text-purple-400
            transition-colors duration-200
          "
        >
          <Mail className="w-5 h-5 mr-2" />
          anshu2007.dev@gmail.com
        </a>

        {/* Separator Line */}
        <hr
          className="
            w-full max-w-2xl mb-12 border-t
            border-gray-700 dark:border-gray-600
            transition-colors duration-500
          "
        />

        {/* Copyright and Social Links */}
        <div
          className="
            w-full max-w-2xl
            flex flex-col sm:flex-row justify-between items-center
            text-sm
            text-gray-400 dark:text-gray-500
            transition-colors duration-500
          "
        >
          <p className="mb-4 sm:mb-0">© {new Date().getFullYear()} Anshu. All rights reserved.</p>
          <div className="flex space-x-6 text-2xl">
            <a
              href="https://github.com/anshu200710"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hover:text-purple-700 transition-colors duration-200"
            >
              <FaGithub />
            </a>
            <a
              href="https://linkedin.com/in/anshubadhgujjar"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-purple-700 transition-colors duration-200"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://twitter.com/anshu2007.dev"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="hover:text-purple-700 transition-colors duration-200"
            >
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
