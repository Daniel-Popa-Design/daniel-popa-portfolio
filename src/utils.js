// Small shared helpers.

import { useSyncExternalStore } from "react";

export const copyrightYear = new Date().getFullYear();

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

// false during prerendering (no window); the browser answers on the client
export const prefersReducedMotion = () =>
  typeof window !== "undefined" && (window.matchMedia?.(REDUCED_MOTION).matches ?? false);

// Reduced-motion setting as React state: false in the prerendered HTML and
// during hydration, then the real value (and live updates if it changes)
export function useReducedMotion() {
  return useSyncExternalStore(
    (onChange) => {
      const query = window.matchMedia?.(REDUCED_MOTION);
      query?.addEventListener("change", onChange);
      return () => query?.removeEventListener("change", onChange);
    },
    prefersReducedMotion,
    () => false,
  );
}
