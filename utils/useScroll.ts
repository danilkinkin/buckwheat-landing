import { useEffect } from 'react';

export default function useScroll(callback: (scrollY: number, deltaTime: number, time: number) => void) {
  useEffect(() => {
    let isMounted = true;
    let lastScrollY = 0;
    let lastTime = 0;

    const frame = (time: number) => {
      if (!isMounted) return;

      const scrollY = lastScrollY + (window.scrollY - lastScrollY) * 0.05;

      lastScrollY = scrollY;

      callback(scrollY, time - lastTime, time);

      lastTime = time;

      requestAnimationFrame(frame);
    };

    frame(0);

    return () => {
      isMounted = false;
    };
  }, []);
}
