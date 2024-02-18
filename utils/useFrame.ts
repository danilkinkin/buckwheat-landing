import { useEffect } from 'react';

export default function useFrame(callback: (delta: number) => void) {
  useEffect(() => {
    let isMounted = true;
    let lastScrollY = 0;

    const frame = (delta: number) => {
      if (!isMounted) return;

      const scrollY = lastScrollY + (window.scrollY - lastScrollY) * 0.1;

      lastScrollY = scrollY;

      callback(delta)

      requestAnimationFrame(frame);
    };

    frame(0);

    return () => {
      isMounted = false;
    };
  }, []);
}
