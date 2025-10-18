import React, { useEffect, useRef } from 'react';

const ScrollResponsiveText = () => {
  const textRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Use requestAnimationFrame for smoothness
      requestAnimationFrame(() => {
        if (textRef.current) {
          textRef.current.style.transform = `translateX(${scrollY * 0.5}px)`;
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-full bg-black text-white py-4 overflow-hidden">
      <div
        ref={textRef}
        className="whitespace-nowrap text-xl font-bold transition-transform duration-75"
      >
        {Array(10).fill('KEEP SCROLLING >> ').join('')}
      </div>
    </div>
  );
};

export default ScrollResponsiveText;
