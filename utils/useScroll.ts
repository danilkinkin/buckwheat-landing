import { useEffect } from 'react';

type callbackType = (scrollY: number, deltaTime: number, time: number) => void;

type configType = {
  accelerator?: number;
};

const subscribers = new Set<callbackType>();
let isMounted = true;
let lastScrollY = 0;
let lastTime = 0;
let currentScrollY = 0;

const scrollChecker = (time: number) => {
  if (!isMounted) return;

  if (Math.abs(window.scrollY - lastScrollY) < 0.0001) {
    currentScrollY = window.scrollY;
  } else {
    currentScrollY = lastScrollY + (window.scrollY - lastScrollY) * 0.1;
  }

  lastScrollY = currentScrollY;

  subscribers.forEach((subscriber) => {
    subscriber(currentScrollY, time - lastTime, time);
  });

  lastTime = time;

  requestAnimationFrame(scrollChecker);
};

if (typeof window !== 'undefined') requestAnimationFrame(scrollChecker);

export default function useScroll(callback: callbackType, config: configType = {}, deps: any[] = []) {
  useEffect(() => {
    subscribers.add(callback);

    return () => {
      subscribers.delete(callback);
    };
  }, deps);
}
