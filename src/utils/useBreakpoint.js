import { useState, useEffect } from "react";
import useWindowSize from "./useWindowSize";
import * as BREAKPOINTS from "./breakpoints";

const DEFAULT_BREAKPOINT = "";

function useBreakpoint() {
  const { width } = useWindowSize();

  const [currentBreakpoint, setCurrentBreakpoint] =
    useState(DEFAULT_BREAKPOINT);
  const isExtraSmall = width <= 575;
  const isMedium = width <= BREAKPOINTS.MD;
  const isMobile = width <= 767;
  const isTablet = width <= 1000;
  const isLarge = width <= 1279;
  const isSmallScreen = width <= 1600;
  const isExtremeSmall = width <= 370;

  useEffect(() => {
    function setBreakpoint(newBreakpoint) {
      if (currentBreakpoint !== newBreakpoint) {
        setCurrentBreakpoint(newBreakpoint);
      }
    }

    function getBreakpoint(breakpoints) {
      const keys = Object.keys(breakpoints);
      const values = Object.values(breakpoints);

      return keys.reduce((acc, curr, index) => {
        if (width > values[index]) {
          return curr.toUpperCase();
        }
        return acc.toUpperCase();
      }, "");
    }

    if (currentBreakpoint !== getBreakpoint(BREAKPOINTS)) {
      setBreakpoint(getBreakpoint(BREAKPOINTS));
    }

    return () => setBreakpoint(DEFAULT_BREAKPOINT);
  }, [width, currentBreakpoint]);

  return {
    breakpoint: currentBreakpoint,
    width,
    isMobile,
    isMedium,
    isExtraSmall,
    isTablet,
    isSmallScreen,
    isLarge,
    isExtremeSmall,
  };
}

export default useBreakpoint;
