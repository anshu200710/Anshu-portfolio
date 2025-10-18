import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useSpring, useTransform, useMotionValue } from "framer-motion";
import { assets } from "../assets/assets";

function Work() {
  // --- Theme sync with localStorage ---
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      return localStorage.getItem("theme") || "dark";
    }
    return "dark";
  });

  useEffect(() => {
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");

    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  // --- Project Data ---
  const projects = [
    {
      id: 1,
      title: "E-Commerce App",
      subtitle: "Web and mobile experience",
      category: "MERN Stack",
      href: "https://forever-frontend-inky-chi.vercel.app/",
      imagePlaceholder: assets.forever,
    },
    {
      id: 2,
      title: "Job Portal",
      subtitle: "Responsive for all devices",
      category: "Full Stack",
      href: "https://job-portal-three-kappa.vercel.app/",
      imagePlaceholder: assets.job_portal,
    },
    {
      id: 3,
      title: "Full Stack LMS",
      subtitle: "Learning Management Platform",
      category: "Web Design",
      href: "https://lms-drab-pi.vercel.app/",
      imagePlaceholder: assets.lms,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  // --- Simplified tilt card (subtle + elegant) ---
  const TiltCard = ({ project }) => {
    const x = useMotionValue(0.5);
    const y = useMotionValue(0.5);

    const rotateX = useTransform(y, [0, 1], [6, -6]);
    const rotateY = useTransform(x, [0, 1], [-6, 6]);

    const handleMouseMove = (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      x.set((e.clientX - rect.left) / rect.width);
      y.set((e.clientY - rect.top) / rect.height);
    };

    const handleMouseLeave = () => {
      x.set(0.5);
      y.set(0.5);
    };

    const cardRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: cardRef, offset: ["start end", "end start"] });
    const yParallax = useTransform(scrollYProgress, [0, 1], [-40, 40]);
    const smoothY = useSpring(yParallax, { stiffness: 80, damping: 18 });

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
        whileHover={{
          scale: 1.03,
          boxShadow: "0 12px 40px rgba(109, 40, 217, 0.25)",
        }}
        className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700
                   bg-white dark:bg-[#1A1A2E] shadow-md hover:shadow-lg cursor-pointer transition-all duration-500"
      >
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 z-10"
        >
          <span className="sr-only">Visit {project.title}</span>
        </a>

        <motion.img
          src={project.imagePlaceholder}
          alt={project.title}
          className="w-full h-52 object-cover rounded-t-2xl transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.src = "https://placehold.co/400x250/1a202c/ffffff?text=Image+Error";
          }}
        />

        <div className="p-5 relative z-20">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
            {project.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">{project.subtitle}</p>
          <span className="inline-block mt-3 text-xs font-medium text-purple-600 dark:text-purple-400 tracking-wide">
            {project.category}
          </span>
        </div>
      </motion.div>
    );
  };

  return (
    <motion.section
      id="work"
      className="min-h-screen flex flex-col items-center justify-center px-6 sm:px-10 py-16 transition-colors duration-500 bg-white text-gray-900 dark:bg-[#0F011F] dark:text-gray-100"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Header */}
      <motion.header
        className="text-center mb-14"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-sm text-purple-600 dark:text-purple-400 font-medium mb-2">
          My Portfolio
        </p>
        <h2 className="text-4xl font-bold mb-3">My Latest Work</h2>
        <p className="text-md text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Explore a collection of my full-stack and front-end projects designed with precision and performance.
        </p>
      </motion.header>

      {/* Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl"
      >
        {projects.map((project) => (
          <TiltCard key={project.id} project={project} />
        ))}
      </motion.div>

      {/* Button */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-16 text-center"
      >
        <motion.button
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 14px rgba(109, 40, 217, 0.5)",
            backgroundColor: "#6d28d9",
          }}
          whileTap={{ scale: 0.96 }}
          className="bg-purple-700 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-md transition-all"
          onClick={() => alert("More projects coming soon!")}
        >
          Show More
        </motion.button>
      </motion.div>
    </motion.section>
  );
}

export default Work;
