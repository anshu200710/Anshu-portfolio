import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Decorate = () => {
  const [connected, setConnected] = useState(false);
  // We'll use more lines to create a better illusion, like 10 per side (20 total)
  const totalLines = 10;
  const [activeLines, setActiveLines] = useState(0); 

  // Sequential light up logic: 10 lines, 100ms apart
  useEffect(() => {
    let timers = [];
    if (connected) {
      // Light up from 1 to 10
      for (let i = 1; i <= totalLines; i++) {
        timers.push(setTimeout(() => setActiveLines(i), i * 100));
      }
    } else {
      // Unplug → lights off (optional: sequential dimming)
      // To simulate sequential dimming, we could reverse the logic, but for simplicity, we'll just turn them off.
      setActiveLines(0);
    }

    return () => timers.forEach(clearTimeout);
  }, [connected]);

  // 🔌 handle plug–socket detection
  const handleDrag = () => {
    const plug = document.getElementById("plug");
    const socket = document.getElementById("socket");
    if (!plug || !socket) return;

    // Get the current position and size of the plug and socket
    const plugRect = plug.getBoundingClientRect();
    const socketRect = socket.getBoundingClientRect();

    // Collision detection logic
    const isOverlapping = 
      plugRect.right > socketRect.left &&
      plugRect.left < socketRect.right &&
      plugRect.bottom > socketRect.top &&
      plugRect.top < socketRect.bottom;

    setConnected(isOverlapping);
  };

  // Helper component for a single light string/arch segment
  const LightString = ({ index, total, active }) => {
    const isLit = index <= active;
    
    // Scale and position based on index to create a perspective tunnel effect
    const scale = 1 - (total - index) * 0.05; // Lines further away are smaller
    const zIndex = total - index; // Lines further away are "behind"
    const opacity = isLit ? 1 : 0.05;
    const color = "#ffcc66"; // Soft warm glow color

    return (
      <motion.div
        className="absolute w-[800px] h-[700px] pointer-events-none"
        style={{
          zIndex: zIndex,
          top: '50%',
          left: '50%',
          x: '-50%',
          y: '-50%',
          // Use a CSS mask or clip-path to create the arch shape if we were using a single element.
          // For this example, we'll use rotation and transform to imply the tunnel.
        }}
      >
        <motion.div
          className="absolute inset-0 border-t-2 border-transparent"
          style={{
            scale: scale,
            borderRadius: '50%', // Helps create a rounded arch feel
            borderTopColor: isLit ? color : 'rgba(255, 255, 255, 0.05)',
            filter: isLit ? `drop-shadow(0 0 10px ${color}) drop-shadow(0 0 20px #ff6600)` : 'none',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: opacity }}
          transition={{ duration: 0.1, delay: isLit ? (index * 0.05) : 0 }}
        />
        {/* Simple vertical strings for the tunnel look */}
        <motion.div
            className="absolute left-1/4 h-[90%] w-[2px] bg-white transform -translate-x-1/2"
            style={{ 
                opacity: opacity * 0.5,
                scale: scale,
                filter: isLit ? `drop-shadow(0 0 5px ${color})` : 'none',
            }}
            animate={{ 
                background: isLit ? color : 'rgba(255, 255, 255, 0.05)'
            }}
            transition={{ duration: 0.1, delay: isLit ? (index * 0.05) : 0 }}
        />
        <motion.div
            className="absolute right-1/4 h-[90%] w-[2px] bg-white transform translate-x-1/2"
            style={{ 
                opacity: opacity * 0.5,
                scale: scale,
                filter: isLit ? `drop-shadow(0 0 5px ${color})` : 'none',
            }}
            animate={{ 
                background: isLit ? color : 'rgba(255, 255, 255, 0.05)'
            }}
            transition={{ duration: 0.1, delay: isLit ? (index * 0.05) : 0 }}
        />
      </motion.div>
    );
  };

  return (
    <motion.div
      className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-black"
      // Change background color dynamically to simulate the environment being lit
      animate={{
        backgroundColor: connected ? "#1a0d00" : "#000000",
      }}
      transition={{ duration: 1 }}
    >
      {/* Lights Tunnel Component */}
      <div className="absolute w-full h-full flex items-center justify-center perspective-tunnel">
        {[...Array(totalLines)].map((_, i) => (
          <LightString key={i} index={i + 1} total={totalLines} active={activeLines} />
        ))}

        {/* Path/Ground */}
        <div 
            className="absolute bottom-0 w-full h-1/2 bg-gray-900 z-10"
            style={{
                background: `linear-gradient(to top, #111 50%, #222 100%)`,
            }}
        >
            {/* The Green Carpet effect */}
            <motion.div
                className="absolute left-1/2 -translate-x-1/2 w-40 h-full rounded-t-full z-10"
                style={{
                    boxShadow: connected ? '0 0 50px 20px rgba(255, 153, 0, 0.5) inset' : 'none'
                }}
                animate={{
                    backgroundColor: connected ? "#006400" : "#222222", // Dark green when lit
                }}
                transition={{ duration: 1 }}
            />
        </div>

        {/* Silhouette of people in the distance */}
        <div className="absolute bottom-[35%] w-full h-10 flex justify-center z-20">
            <div className="w-16 h-full bg-black rounded-t-full opacity-80" />
            <div className="w-12 h-full bg-black rounded-t-full opacity-60 ml-4" />
        </div>
      </div>


      {/* --- UI ELEMENTS (Plug and Socket) --- */}

      {/* Socket (wall) */}
      <div
        id="socket"
        className="absolute bottom-28 left-1/3 w-20 h-20 bg-gray-700 rounded-lg shadow-inner border-4 border-gray-500 flex items-center justify-center z-30"
      >
        <div className="w-3 h-3 bg-black rounded-full mx-1"></div>
        <div className="w-3 h-3 bg-black rounded-full mx-1"></div>
      </div>

      {/* Plug (draggable) */}
      <motion.div
        id="plug"
        className={`absolute bottom-32 left-10 w-20 h-10 rounded-md flex items-center justify-center cursor-grab z-40 ${
          connected ? "bg-green-600" : "bg-gray-800"
        }`}
        drag
        // Adjusted constraints to ensure plug can reach the socket
        dragConstraints={{ left: 0, right: 800, top: 0, bottom: 600 }}
        onDrag={handleDrag}
      >
        <div className="flex space-x-2">
          <div className="w-2 h-6 bg-gray-300 rounded"></div>
          <div className="w-2 h-6 bg-gray-300 rounded"></div>
        </div>
      </motion.div>

      {/* Spark effect when connected (positioned near the socket) */}
      <AnimatePresence>
        {connected && (
          <motion.div
            className="absolute bottom-28 left-1/3 w-20 h-20 rounded-full bg-yellow-300 blur-3xl opacity-70 z-30"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, repeat: Infinity, repeatType: "mirror" }}
          />
        )}
      </AnimatePresence>

      

      {/* Unplug / Reset hint */}
      {connected && (
        <motion.p
          className="absolute bottom-10 text-yellow-200 text-lg italic z-50"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🔌 Unplug to turn off the lights
        </motion.p>
      )}
    </motion.div>
  );
};

export default Decorate;