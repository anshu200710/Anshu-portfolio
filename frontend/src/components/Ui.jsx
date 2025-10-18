import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { assets } from "../assets/assets";

const Ui = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y1 = useSpring(useTransform(scrollYProgress, [0, 1], [-40, 40]), {
    stiffness: 100,
    damping: 20,
  });
  const y2 = useSpring(useTransform(scrollYProgress, [0, 1], [-80, 80]), {
    stiffness: 100,
    damping: 20,
  });
  const y3 = useSpring(useTransform(scrollYProgress, [0, 1], [-40, 40]), {
    stiffness: 100,
    damping: 20,
  });

  return (
    <>
    <motion.div
    id="ui"
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="min-h-screen sm:min-h-[10vh] 
                 bg-[#f3f1ef] dark:bg-[#0F011F]
                 text-black dark:text-white
                 flex flex-col items-center justify-center py-24
                 transition-colors duration-500"
    >
        {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl lg:text-7xl font-serif italic 
                   text-[#5a3e2b] dark:text-[#e4d4c3] 
                   mb-14 text-center"
      >
        FIGMA DESIGN
      </motion.h1>

      {/* Overlapping Images */}
      <div className="relative flex items-center justify-center w-full max-w-[1800px] h-[320px]  sm:h-[400px] md:h-[620px] lg:h-[700px] mb-0">
        {/* Left Image */}
        <motion.img
          src={assets.p1}
          alt="Look 1"
          style={{ y: y1 }}
          whileHover={{ scale: 1.1, rotate: -10, zIndex: 20 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="absolute top-[12%] left-[7%] w-[32%] max-w-[500px] rotate-[-8deg] 
                     shadow-lg border-[12px] border-white dark:border-gray-700 
                     rounded-xl cursor-pointer z-0"
        />

        {/* Center Image */}
        <motion.img
          src={assets.p2}
          alt="Look 2"
          style={{ y: y2 }}
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="absolute top-0 transform -translate-x-1/2 w-[35%] max-w-[600px] z-10 
                     shadow-2xl border-[12px] border-white dark:border-gray-700 
                     rounded-xl cursor-pointer"
        />

        {/* Right Image */}
        <motion.img
          src={assets.p3}
          alt="Look 3"
          style={{ y: y3 }}
          whileHover={{ scale: 1.1, rotate: 10, zIndex: 20 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="absolute top-[12%] right-[7%] w-[32%] max-w-[500px] rotate-[8deg] 
                     shadow-lg border-[12px] border-white dark:border-gray-700 
                     rounded-xl cursor-pointer z-0"
        />
      </div>

{/* PHOTOSHOP DESIGNS  */}
       {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl lg:text-7xl font-serif italic 
                   text-[#5a3e2b] dark:text-[#e4d4c3] 
                   mb-14 text-center"
      >
        PHOTOSHOP DESIGN
      </motion.h1>

      {/* Overlapping Images */}
      <div className="relative flex items-center justify-center w-full max-w-[1800px] h-[220px] sm:h-[300px] md:h-[320px] lg:h-[300px] mb-20">
        {/* Left Image */}
        <motion.img
          src={assets.f1}
          alt="Look 1"
          style={{ y: y1 }}
          whileHover={{ scale: 1.1, rotate: -10, zIndex: 20 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="absolute top-[12%] left-[7%] w-[32%] max-w-[500px] rotate-[-8deg] 
                     shadow-lg border-[12px] border-white dark:border-gray-700 
                     rounded-xl cursor-pointer z-0"
        />

        {/* Center Image */}
        <motion.img
          src={assets.f2}
          alt="Look 2"
          style={{ y: y2 }}
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="absolute top-0 transform -translate-x-1/2 w-[35%] max-w-[600px] z-10 
                     shadow-2xl border-[12px] border-white dark:border-gray-700 
                     rounded-xl cursor-pointer"
        />

        {/* Right Image */}
        <motion.img
          src={assets.f3}
          alt="Look 3"
          style={{ y: y3 }}
          whileHover={{ scale: 1.1, rotate: 10, zIndex: 20 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="absolute top-[12%] right-[7%] w-[32%] max-w-[500px] rotate-[8deg] 
                     shadow-lg border-[12px] border-white dark:border-gray-700 
                     rounded-xl cursor-pointer z-0"
        />
      </div>

      {/* Subtitle
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-xl tracking-widest 
                   text-[#5a3e2b] dark:text-[#e4d4c3] 
                   uppercase"
      >
        NEW PROJECTS
      </motion.p> */}
    </motion.div>
    </>
  );
};

export default Ui;
