import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Diwali = () => {
  const [isLit, setIsLit] = useState(false);
  const [diyaLit, setDiyaLit] = useState(false);
  const [glowLevel, setGlowLevel] = useState(0); // 0 = dark → 1 = full glow
  const [showImage, setShowImage] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const navigate = useNavigate(); // ✅ Correctly call useNavigate()

  const handleMatchClick = () => setIsLit(true);

  const handleDrag = (event, info) => {
    const matchRect = info.point;
    const diya = document.getElementById("diya");
    const diyaRect = diya.getBoundingClientRect();

    if (
      matchRect.x > diyaRect.left &&
      matchRect.x < diyaRect.right &&
      matchRect.y > diyaRect.top &&
      matchRect.y < diyaRect.bottom &&
      isLit
    ) {
      setDiyaLit(true);
    }
  };

  // 🌟 Sequence timing after diya lights
  useEffect(() => {
    if (diyaLit) {
      setGlowLevel(0.1);

      // Step-by-step glow spread
      const glowIntervals = [0.3, 0.6, 0.8, 1];
      glowIntervals.forEach((level, i) => {
        setTimeout(() => setGlowLevel(level), 700 * (i + 1));
      });

      // Show image and button sequentially
      setTimeout(() => setShowImage(true), 3200);
      setTimeout(() => setShowButton(true), 4500);
    }
  }, [diyaLit]);

  // Dynamic background as glow spreads
  const backgroundGradient = {
    0: "linear-gradient(to bottom, #000, #111)",
    0.1: "radial-gradient(circle at 80% 80%, #442200 5%, #000 90%)",
    0.3: "radial-gradient(circle at 80% 80%, #663300 10%, #220000 100%)",
    0.6: "radial-gradient(circle at 80% 80%, #ffb84d 20%, #441100 120%)",
    0.8: "radial-gradient(circle at 80% 80%, #ffcc66 40%, #552200 130%)",
    1: "radial-gradient(circle at center, #ffe6a3 50%, #ff9933 100%, #330000 150%)",
  };

  const getBackground = () => {
    const keys = Object.keys(backgroundGradient).map(Number);
    const closest = keys.reduce((prev, curr) =>
      Math.abs(curr - glowLevel) < Math.abs(prev - glowLevel) ? curr : prev
    );
    return backgroundGradient[closest];
  };

  return (
    <motion.div
      className="h-[80vh] w-full flex items-center justify-center relative overflow-hidden transition-all"
      animate={{
        background: getBackground(),
      }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    >
      {/* Matchstick */}
      <motion.div
        className="absolute w-3 h-40 bg-amber-800 rounded-md cursor-grab z-30"
        drag
        dragConstraints={{ left: 0, right: 1000, top: 0, bottom: 600 }}
        onDrag={handleDrag}
        onClick={handleMatchClick}
        style={{ bottom: 100, left: 100 }}
      >
        {isLit && <Flame size="small" />}
      </motion.div>

      {/* Diya */}
      <div
        id="diya"
        className="absolute bottom-20 right-40 w-24 h-12 bg-amber-900 rounded-b-full flex justify-center items-start shadow-[0_0_40px_#ff9900] z-10"
      >
        {diyaLit && <Flame size="large" />}
      </div>

      {/* Lakshmi–Ganesh Image (No scaling or opacity animation now) */}
      <AnimatePresence>
        {showImage && (
          <motion.img
            src={assets.laxmi}
            alt="Lakshmi and Ganesh"
            className="absolute bottom-24 w-80 md:w-[400px] brightness-110 drop-shadow-[0_0_40px_#ffd966]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
          />
        )}
      </AnimatePresence>

      {/* Title */}
      <motion.div
        className="absolute top-8 text-white text-xl md:text-2xl font-semibold text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: showImage ? 1 : 0.6 }}
        transition={{ duration: 1.5 }}
      >
        🪔 Match & Diya Simulation – Lakshmi & Ganesh Blessings ✨
      </motion.div>

      {/* “Let’s Decorate the House” Button (No animation loop) */}
      <AnimatePresence>
        {showButton && (
          <motion.button
            className="absolute bottom-10 px-6 py-3 bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 text-white font-bold rounded-full shadow-lg hover:shadow-[0_0_20px_#ffcc66] hover:scale-105 transition-all"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            onClick={() => navigate("/decorate")} // ✅ Correct navigation
          >
            🌸 Let’s Decorate Our House & Area 🏡✨
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// 🔥 Flame Component
function Flame({ size }) {
  const flameSize = size === "large" ? "w-8 h-14" : "w-4 h-8";
  return (
    <motion.div
      className={`${flameSize} rounded-full absolute bottom-full bg-gradient-to-t from-orange-600 via-yellow-400 to-transparent`}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.8, 1, 0.9],
        y: [0, -4, 0],
      }}
      transition={{
        duration: 0.3,
        repeat: Infinity,
        repeatType: "mirror",
      }}
    />
  );
}

export default Diwali;
