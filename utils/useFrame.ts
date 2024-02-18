import { useEffect } from 'react';

export default function useFrame(callback: (delta: number) => void) {
  useEffect(() => {
    let isMounted = true;
    let lastScrollY = 0;
    let lastTime = 0;

    const frame = (time: number) => {
      if (!isMounted) return;

      const scrollY = lastScrollY + (window.scrollY - lastScrollY) * 0.1;

      lastScrollY = scrollY;

      callback(time - lastTime);

      lastTime = time;

      requestAnimationFrame(frame);
    };

    frame(0);

    return () => {
      isMounted = false;
    };
  }, []);
}
