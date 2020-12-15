import { useState, useEffect } from 'react';
export const useWindowSize = () => {
  const isSSR = typeof window !== 'undefined';
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  useEffect(() => {
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      }, 250);
    });

    return () => {
      window.removeEventListener('resize', () => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      });
    };
  });
  return windowSize;
};
