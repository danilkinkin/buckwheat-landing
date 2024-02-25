import { useState, useEffect } from "react"

export default function useMediaQuery(mediaQuery: string): boolean {
  const [isMatch, setIsMatch] = useState(
    typeof window !== 'undefined' ? window.matchMedia(mediaQuery).matches : false
  );

  useEffect(() => {
    const onChange = (event: MediaQueryListEvent) => {
      setIsMatch(event.matches);
    };

    window
      .matchMedia(mediaQuery)
      .addEventListener("change", onChange);

    return () => {
      window
        .matchMedia(mediaQuery)
        .removeEventListener("change", onChange);
    };
  }, []);

  return isMatch;
}
