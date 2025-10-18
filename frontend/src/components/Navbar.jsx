import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Close menu on scroll or resize (optional UX polish)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header
      className={`w-full fixed top-0 left-0 z-50 transition-all duration-500 ${
        theme === "light"
          ? "bg-white text-black shadow-md"
          : "bg-gradient-to-r from-[#0F011F] to-[#1C0A3E] text-gray-100 shadow-lg"
      } font-['Plus_Jakarta_Sans']`}
    >
      <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <a
          onClick={scrollToTop}
          href="/"
          className="text-2xl font-extrabold tracking-tight cursor-pointer"
        >
          UX<span className="text-purple-500">Lab</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
          <a href="#header" className="hover:text-purple-400 transition">
            Home
          </a>
          <a href="#about" className="hover:text-purple-400 transition">
            About
          </a>
          <a href="#service" className="hover:text-purple-400 transition">
            Services
          </a>
          <a href="#work" className="hover:text-purple-400 transition">
            Work
          </a>
          <a href="#ui" className="hover:text-purple-400 transition">
            UI
          </a>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-purple-500 hover:scale-110 transition-transform duration-300"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </button>

          <a
            href="#contact"
            className="px-4 py-2 text-sm rounded-full border border-purple-400 hover:bg-purple-500 hover:text-white transition"
          >
            Contact
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-purple-500 hover:scale-110 transition-transform duration-300"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </button>

          {/* Animated Hamburger Icon */}
          <button
            className="relative w-6 h-5 flex flex-col justify-between items-center"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-full h-[2px] bg-current transform transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-[8px]" : ""
              }`}
            ></span>
            <span
              className={`block w-full h-[2px] bg-current transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`block w-full h-[2px] bg-current transform transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-[8px]" : ""
              }`}
            ></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-gradient-to-b from-[#0F011F] to-[#1C0A3E] text-white transform transition-transform duration-300 ease-in-out ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          } md:hidden shadow-lg z-50`}
        >
          <div className="p-6 space-y-6 text-lg font-medium">
            <a
              href="#header"
              onClick={() => setMenuOpen(false)}
              className="block hover:text-purple-400 transition"
            >
              Home
            </a>
            <a
              href="#about"
              onClick={() => setMenuOpen(false)}
              className="block hover:text-purple-400 transition"
            >
              About
            </a>
            <a
              href="#service"
              onClick={() => setMenuOpen(false)}
              className="block hover:text-purple-400 transition"
            >
              Services
            </a>
            <a
              href="#work"
              onClick={() => setMenuOpen(false)}
              className="block hover:text-purple-400 transition"
            >
              Work
            </a>
            <a
              href="#ui"
              onClick={() => setMenuOpen(false)}
              className="block hover:text-purple-400 transition"
            >
              UI
            </a>
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="block hover:text-purple-400 transition"
            >
              Contact
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
