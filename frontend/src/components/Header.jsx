import React from "react";
import { motion } from "framer-motion";
import { assets } from "../assets/assets";

const Header = () => {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delayChildren: 0.3, staggerChildren: 0.25 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <motion.header
      id="header"
      className="relative w-full min-h-screen flex flex-col items-center justify-center text-center overflow-hidden pt-28
                bg-white text-black dark:bg-[#0F011F] dark:text-white transition-colors duration-500 font-['Plus_Jakarta_Sans']"
      initial="hidden"
      animate="visible"
      variants={container}
    >
      {/* Background gradient motion effect */}
      <motion.div
        className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-900/30 via-indigo-900/10 to-transparent blur-3xl opacity-40 dark:opacity-60"
        animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
        transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
      />

      {/* Floating Image */}
      <motion.div
        className="relative mb-10"
        variants={item}
        animate={{
          y: [0, -12, 0],
          transition: { repeat: Infinity, duration: 4, ease: "easeInOut" },
        }}
      >
        <div className="relative w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 p-[3px] shadow-lg shadow-purple-600/40">
          <div className="rounded-full w-full h-full overflow-hidden bg-white dark:bg-gray-800">
            <img
              src={assets.profile}
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>
        {/* Glow effect behind image */}
        <div className="absolute inset-0 rounded-full blur-2xl bg-purple-500/30 -z-10"></div>
      </motion.div>

      {/* Subheading */}
      <motion.p
        className="text-lg sm:text-xl font-medium text-gray-700 dark:text-gray-300 tracking-wide"
        variants={item}
      >
        Hi 👋 I'm <span className="text-purple-500 font-semibold">Anshu</span>
      </motion.p>

      {/* Big Gradient Title */}
      <motion.h1
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold my-4 leading-tight
                   bg-gradient-to-r from-purple-500 via-pink-400 to-orange-400 text-transparent bg-clip-text"
        variants={item}
      >
        Crafting Digital Experiences
        <br />
        That Feel Effortless ✨
      </motion.h1>

      {/* Description */}
      <motion.p
        className="max-w-2xl text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-10 opacity-90"
        variants={item}
      >
        I’m a passionate <span className="text-purple-400 font-medium">Full Stack Developer</span> 
        creating clean, functional, and aesthetic web experiences. I blend design and code to make 
        products that people love to use.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center"
        variants={container}
      >
        <motion.a
          href="#contact"
          whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(168,85,247,0.5)" }}
          className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-orange-500 text-white font-semibold shadow-md hover:shadow-xl transition-all duration-300"
          variants={item}
        >
          Let’s Work Together 🚀
        </motion.a>

        <motion.a
          href={assets.resume}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          className="px-8 py-3 rounded-full border border-purple-400 text-purple-500 dark:text-purple-300 dark:border-purple-500 font-semibold hover:bg-purple-500 hover:text-white transition-all duration-300"
          variants={item}
        >
          View Resume
        </motion.a>
      </motion.div>
    </motion.header>
  );
};

export default Header;
