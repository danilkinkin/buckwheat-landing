import { useEffect } from 'react';

type callbackType = (delta: number, time: number) => void;

const subscribers = new Set<callbackType>();
let isMounted = true;
let lastScrollY = 0;
let lastTime = 0;

const frame = (time: number) => {
  if (!isMounted) return;

  const scrollY = lastScrollY + (window.scrollY - lastScrollY) * 0.1;

  lastScrollY = scrollY;

  subscribers.forEach((subscriber) => subscriber(time - lastTime, time));

  lastTime = time;

  requestAnimationFrame(frame);
};

if (typeof window !== 'undefined') requestAnimationFrame(frame);

export default function useFrame(callback: callbackType) {
  useEffect(() => {
    subscribers.add(callback);

    return () => {
      subscribers.delete(callback);
    };
  }, []);
}
