import { useEffect } from 'react';

type configType = {
  accelerator?: number;
};

export default function useScroll(callback: (scrollY: number, deltaTime: number, time: number) => void, config: configType = {}, deps: any[] = []) {
  useEffect(() => {
    let isMounted = true;
    let lastScrollY = 0;
    let lastTime = 0;
    let currentScrollY = 0;

    const frame = (time: number) => {
      if (!isMounted) return;

      if (Math.abs(window.scrollY - lastScrollY) < 0.0001) {
        currentScrollY = window.scrollY;
      } else {
        currentScrollY = lastScrollY + (window.scrollY - lastScrollY) * (config.accelerator || 0.05);
      }

      lastScrollY = currentScrollY;

      callback(currentScrollY, time - lastTime, time);

      lastTime = time;

      requestAnimationFrame(frame);
    };

    frame(0);

    return () => {
      isMounted = false;
    };
  }, deps);
}
