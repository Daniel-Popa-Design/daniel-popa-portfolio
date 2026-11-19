// Language lives in the URL path: <base>/ is German, <base>/en/ is English.
// Each version has its own address (shareable, indexable, prerendered), and
// nothing is stored on the visitor's device.

const BASE = import.meta.env.BASE_URL; // "/daniel-popa-portfolio/" on GitHub Pages, "/" locally

export const SITE_URL = "https://daniel-popa-design.github.io/daniel-popa-portfolio/";

export const languageFromPath = (pathname) =>
  pathname === `${BASE}en` || pathname.startsWith(`${BASE}en/`) ? "en" : "de";

export const pathForLanguage = (language) => (language === "en" ? `${BASE}en/` : BASE);

export const absoluteUrlFor = (language) => (language === "en" ? `${SITE_URL}en/` : SITE_URL);
