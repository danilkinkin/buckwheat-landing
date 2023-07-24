import { useState, useEffect } from 'react';
import useIsServer from './isServer';

interface window {
  matchMedia: any;
}

function useIsDarkMode() {
  const isServer = useIsServer();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (isServer) return false;

    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (isServer) return;

    const onChange = (event: any) => {
      setIsDarkMode(event.matches);
    };

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', onChange);

    return () => {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener('change', onChange);
    };
  }, []);

  return isDarkMode;
}

export default useIsDarkMode;
