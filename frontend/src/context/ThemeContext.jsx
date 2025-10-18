import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the Theme Context
export const ThemeContext = createContext();

// Create a custom hook to use the theme
export const useTheme = () => useContext(ThemeContext);

// Theme Provider component
export const ThemeProvider = ({ children }) => {
  // Initialize theme from localStorage or default to 'light'
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') { // Check if window is defined (for SSR compatibility)
      return localStorage.getItem('theme') || 'light';
    }
    return 'light'; // Default for server-side rendering
  });

  // Effect to apply/remove 'dark' class on the HTML element
  // and update localStorage whenever the theme changes
  useEffect(() => {
    const root = window.document.documentElement; // Get the root HTML element

    if (theme === 'dark') {
      root.classList.add('dark'); // Add 'dark' class
    } else {
      root.classList.remove('dark'); // Remove 'dark' class
    }

    localStorage.setItem('theme', theme); // Save theme preference to localStorage
  }, [theme]); // Rerun effect whenever 'theme' state changes

  // Function to toggle the theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Provide the theme state and toggle function to children components
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
