import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { assets } from "../assets/assets";

// Reusable Tilt Card with subtle professional hover tilt
const TiltCard = ({ children, variants }) => {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useTransform(y, [0, 1], [10, -10]);
  const rotateY = useTransform(x, [0, 1], [-10, 10]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      className="border border-gray-300 dark:border-gray-700 rounded-xl p-5 bg-white/70 dark:bg-[#1A1A2E]/70
                 backdrop-blur-md shadow-md hover:shadow-lg transition-all duration-500 ease-out"
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

const About = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const yImage = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const smoothYImage = useSpring(yImage, { stiffness: 60, damping: 20 });

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <motion.section
      ref={sectionRef}
      id="about"
      className="min-h-screen px-6 py-20 flex flex-col md:flex-row items-center justify-center gap-12
                 bg-white text-black dark:bg-[#0F011F] dark:text-white
                 transition-colors duration-500 font-['Plus_Jakarta_Sans']"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
    >
      {/* Image with soft floating animation */}
      <motion.div
        style={{ y: smoothYImage }}
        className="relative w-72 h-96 rounded-2xl overflow-hidden shadow-xl"
        variants={itemVariants}
      >
        <img
          src={assets.profile}
          alt="Profile"
          className="w-full h-full object-cover rounded-2xl"
        />
        {/* Subtle gradient overlay for professional look */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-2xl"></div>
      </motion.div>

      {/* Text Section */}
      <motion.div
        className="max-w-xl space-y-6"
        variants={containerVariants}
      >
        <motion.p
          className="text-sm uppercase tracking-wide text-purple-600 dark:text-purple-400"
          variants={itemVariants}
        >
          Introduction
        </motion.p>

        <motion.h2
          className="text-4xl font-extrabold leading-tight text-gray-900 dark:text-white"
          variants={itemVariants}
        >
          About Me
        </motion.h2>

        <motion.p
          className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed"
          variants={itemVariants}
        >
          I’m a dedicated <span className="text-purple-500 font-medium">Full Stack Developer</span> 
          with a strong passion for crafting high-quality, scalable, and user-centered web solutions.
          My mission is to merge design and technology to create seamless digital experiences.
        </motion.p>

        {/* Skills Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4"
          variants={containerVariants}
        >
          {[
            { title: "Languages", desc: "HTML, CSS, JavaScript, React, Python" },
            { title: "Database", desc: "MongoDB, SQL" },
            { title: "Design", desc: "Figma, Photoshop, Canva" },
            { title: "Projects", desc: "Over 5+ Web Applications" },
          ].map((card, i) => (
            <TiltCard key={i} variants={itemVariants}>
              <h3 className="font-semibold text-lg text-purple-600 dark:text-purple-400 mb-1">
                {card.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{card.desc}</p>
            </TiltCard>
          ))}
        </motion.div>

        {/* Tools Section */}
        <motion.div className="pt-8" variants={itemVariants}>
          <h3 className="font-semibold text-lg mb-4 dark:text-white">Tools I Use</h3>
          <div className="flex flex-wrap gap-4">
            {[assets.vscode, assets.postman, assets.mongo, assets.figma, assets.git].map((tool, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="p-3 rounded-lg bg-white/60 dark:bg-[#1A1A2E]/60 backdrop-blur-md border border-gray-300 dark:border-gray-700 shadow-sm transition-all"
              >
                <img src={tool} alt={`Tool ${idx}`} className="h-7 w-7 object-contain" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default About;
