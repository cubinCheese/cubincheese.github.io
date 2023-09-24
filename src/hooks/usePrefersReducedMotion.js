/**
 * https://www.joshwcomeau.com/snippets/react-hooks/use-prefers-reduced-motion/
 */

import { useState, useEffect } from 'react';

const QUERY = '(prefers-reduced-motion: no-preference)';
const isRenderingOnServer = typeof window === 'undefined';

const getInitialState = () => (isRenderingOnServer ? true : !window.matchMedia(QUERY).matches);

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(getInitialState);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(QUERY);

    const listener = event => {
      setPrefersReducedMotion(!event.matches);
    };

    // Use addEventListener instead of addListener
    mediaQueryList.addEventListener('change', listener);

    return () => {
      // Use removeEventListener instead of removeListener
      mediaQueryList.removeEventListener('change', listener);
    };
  }, []);

  return prefersReducedMotion;
}

export default usePrefersReducedMotion;
