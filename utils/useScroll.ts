import { useEffect } from 'react';

export default function useScroll(callback: (scrollY: number) => void) {
  useEffect(() => {
    let isMounted = true;
    let lastScrollY = 0;

    const frame = (delta: number) => {
      if (!isMounted) return;

      const scrollY = lastScrollY + (window.scrollY - lastScrollY) * 0.05;

      lastScrollY = scrollY;

      callback(scrollY);

      requestAnimationFrame(frame);
    };

    frame(0);

    return () => {
      isMounted = false;
    };
  }, []);
}
