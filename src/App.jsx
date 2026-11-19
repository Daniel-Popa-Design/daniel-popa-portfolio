// Page frame: language, document metadata, header, sections, footer.
// Copy lives in content/, the sections in components/sections/.

import { useEffect, useRef, useState } from "react";
import { AboutSection } from "./components/sections/AboutSection.jsx";
import { ContactSection } from "./components/sections/ContactSection.jsx";
import { ExpertiseSection } from "./components/sections/ExpertiseSection.jsx";
import { GameSection } from "./components/sections/GameSection.jsx";
import { Hero } from "./components/sections/Hero.jsx";
import { SiteFooter } from "./components/sections/SiteFooter.jsx";
import { SiteHeader } from "./components/sections/SiteHeader.jsx";
import { Testimonial } from "./components/sections/Testimonial.jsx";
import { WorkSection } from "./components/sections/WorkSection.jsx";
import { copy } from "./content/index.js";
import { absoluteUrlFor, languageFromPath, pathForLanguage } from "./language.js";

const setMeta = (id, attribute, value) => document.getElementById(id)?.setAttribute(attribute, value);

// initialLanguage is passed by the prerender step (no window there); in the
// browser the language comes from the URL path (/en/ = English).
function App({ initialLanguage }) {
  const [language, setLanguage] = useState(
    () => initialLanguage ?? (typeof window === "undefined" ? "de" : languageFromPath(window.location.pathname)),
  );
  const wordmarkRef = useRef(null);
  const text = copy[language];

  // Switching language updates the address (no reload), so the current
  // version can be shared or bookmarked; the #section stays in place.
  const changeLanguage = (next) => {
    setLanguage(next);
    window.history.replaceState(null, "", pathForLanguage(next) + window.location.hash);
  };

  // Wordmark in header and footer: back to the top of the page. Smooth via
  // the CSS scroll-behavior (instant when reduced motion is requested, see
  // _base.scss). No "#page-top" left in the URL; keyboard focus moves to the
  // header wordmark so the next Tab continues from the top. The href stays
  // as a fallback.
  const scrollToTop = (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0 });
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }
    wordmarkRef.current?.focus({ preventScroll: true });
  };

  // Document language, title and share tags follow the visible language
  useEffect(() => {
    const locale = copy[language];
    const url = absoluteUrlFor(language);
    document.documentElement.lang = language;
    document.title = locale.documentTitle;
    setMeta("meta-description", "content", locale.metaDescription);
    setMeta("og-title", "content", locale.documentTitle);
    setMeta("og-description", "content", locale.socialDescription);
    setMeta("og-url", "content", url);
    setMeta("og-locale", "content", language === "en" ? "en_US" : "de_DE");
    setMeta("canonical", "href", url);
  }, [language]);

  return (
    <>
      <a className="skip-link" href="#main">
        {text.skip}
      </a>

      <SiteHeader
        text={text}
        language={language}
        onLanguageChange={changeLanguage}
        wordmarkRef={wordmarkRef}
        onScrollToTop={scrollToTop}
      />

      <div className="portfolio-shell">
        {/* tabIndex -1: the skip link moves keyboard focus here reliably */}
        <main id="main" tabIndex={-1}>
          <Hero text={text} />
          <WorkSection text={text} language={language} />
          <AboutSection text={text} />
          <Testimonial text={text} />
          <ExpertiseSection text={text} />
          <GameSection text={text} language={language} />
          <ContactSection text={text} />
        </main>
      </div>

      <SiteFooter text={text} onScrollToTop={scrollToTop} />
    </>
  );
}

export default App;
