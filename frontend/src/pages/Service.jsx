import React, { useRef } from "react";
import { FiGlobe } from "react-icons/fi";
import { FaMobileAlt, FaPaintBrush } from "react-icons/fa";
import { SiBehance } from "react-icons/si";
import {
  motion,
  useMotionValue,
  useTransform,
  useScroll,
  useSpring,
  useInView,
} from "framer-motion";
import { assets } from "../assets/assets";

const services = [
  {
    title: "Web Design",
    bg: assets.web,
    description:
      "Designing visually appealing, accessible, and high-performing websites that engage users and drive results.",
    icon: <FiGlobe className="text-purple-600 dark:text-white text-2xl" />,
  },
  {
    title: "Mobile Apps",
    bg: assets.mobile,
    description:
      "Building high-performance mobile applications that deliver seamless experiences on both iOS and Android.",
    icon: <FaMobileAlt className="text-purple-600 dark:text-white text-2xl" />,
  },
  {
    title: "UI / UX Design",
    bg: assets.ux,
    description:
      "Designing intuitive interfaces and human-centered experiences that balance beauty and functionality.",
    icon: <SiBehance className="text-purple-600 dark:text-white text-2xl" />,
  },
  {
    title: "Graphic Design",
    bg: assets.graphic,
    description:
      "Creating impactful visual assets and branding materials that communicate identity and purpose.",
    icon: <FaPaintBrush className="text-purple-600 dark:text-white text-2xl" />,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const iconFloat = {
  animate: {
    y: [0, -8, 0],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
  },
};

const TiltCard = ({ service }) => {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useTransform(y, [0, 1], [8, -8]);
  const rotateY = useTransform(x, [0, 1], [-8, 8]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  // Smooth parallax
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const smoothY = useSpring(yParallax, { stiffness: 60, damping: 20 });

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        y: smoothY,
        transformStyle: "preserve-3d",
        perspective: 800,
      }}
      whileHover={{ scale: 1.03 }}
      className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700
                 bg-white dark:bg-[#1A1A2E] shadow-md cursor-default transition-all duration-500
                 hover:shadow-lg"
    >
      {/* Background Image - light/dark opacity balanced */}
      <div
        className="absolute inset-0 z-0 rounded-2xl"
        style={{
          backgroundImage: `url(${service.bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.1, // lighter opacity for light mode
        }}
      ></div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-gray-100/90 via-white/40 to-transparent dark:from-black/60 dark:via-transparent dark:to-transparent z-10"></div>

      {/* Card content */}
      <div className="relative z-20 p-6 flex flex-col justify-between h-full">
        <motion.div variants={iconFloat} animate="animate" className="mb-4">
          {service.icon}
        </motion.div>
        <div>
          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
            {service.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            {service.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const Service = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      id="service"
      ref={ref}
      className="min-h-screen bg-white dark:bg-[#0F011F] text-gray-900 dark:text-gray-100 px-8 py-20 flex flex-col items-center transition-colors duration-500"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Section Header */}
      <motion.div
        className="text-center mb-14 max-w-3xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <p className="text-sm text-purple-600 dark:text-purple-400 mb-2 font-medium tracking-wide">
          What I Offer
        </p>
        <h2 className="text-4xl font-extrabold mb-3 leading-tight">
          My Services
        </h2>
        <p className="text-md text-gray-600 dark:text-gray-300">
          I help businesses and individuals craft digital products that are fast,
          beautiful, and user-friendly.
        </p>
      </motion.div>

      {/* Services Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {services.map((service, index) => (
          <TiltCard key={index} service={service} />
        ))}
      </motion.div>
    </motion.section>
  );
};

export default Service;
