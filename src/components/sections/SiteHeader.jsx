// Sticky header: wordmark (back to top), main navigation with the current
// section highlighted, language switch and the mobile menu.

import { useEffect, useRef, useState } from "react";
import { LanguageSwitcher } from "../LanguageSwitcher.jsx";
import { ArrowIcon, ToTopIcon } from "../icons.jsx";

// Page sections → menu entry they belong to (null = no entry)
const NAV_SECTIONS = [
  ["#work", "work"],
  ["#about", "about"],
  [".testimonial", "about"],
  ["#expertise", "expertise"],
  ["#game", null],
  ["#contact", null],
];

const NAV_LINKS = ["work", "about", "expertise"];

export function SiteHeader({ text, language, onLanguageChange, wordmarkRef, onScrollToTop }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // Past the first screen: the header wordmark shows its "back to top" arrow
  const [awayFromTop, setAwayFromTop] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const headerRef = useRef(null);
  const menuToggleRef = useRef(null);
  const navRef = useRef(null);

  const closeMenu = () => setMenuOpen(false);

  // Mobile menu: when it opens, focus moves to the first link (the links come
  // before the toggle in the DOM, so Tab alone would skip them). Escape or a
  // click outside the header closes it; Escape returns focus to the toggle.
  useEffect(() => {
    if (!menuOpen) return undefined;
    navRef.current?.querySelector("a")?.focus();
    const onKeyDown = (event) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      menuToggleRef.current?.focus();
    };
    const onPointerDown = (event) => {
      if (!headerRef.current?.contains(event.target)) setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [menuOpen]);

  // Compact once the page is scrolled; the progress line under the header
  // shows how much of the page has been read (--scroll-progress, 0–1).
  // One update per frame; the line is set directly, without a re-render.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      headerRef.current?.style.setProperty("--scroll-progress", progress.toFixed(4));
      setScrolled(window.scrollY > 8);
      setAwayFromTop(window.scrollY > window.innerHeight * 0.6);
      // Current section for the menu: the last section whose top has passed
      // a line a third down the viewport. The hero has no menu entry, so at
      // the top nothing is highlighted; sections without an entry (the game,
      // the contact block with its own red button) highlight nothing either.
      const line = window.innerHeight / 3;
      let current = null;
      for (const [selector, key] of NAV_SECTIONS) {
        const element = document.querySelector(selector);
        if (element && element.getBoundingClientRect().top <= line) current = key;
      }
      setActiveSection(current);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <header
      className={`site-header${scrolled ? " is-scrolled" : ""}${awayFromTop ? " is-away" : ""}`}
      id="page-top"
      ref={headerRef}
    >
      <div className="site-header__inner">
        <a
          className="wordmark"
          href="#page-top"
          aria-label={awayFromTop ? text.footer.home : text.home}
          onClick={(event) => {
            closeMenu();
            onScrollToTop(event);
          }}
          ref={wordmarkRef}
        >
          <span className="wordmark__name">Daniel Popa</span>
          <ToTopIcon />
        </a>

        <nav
          className={`primary-navigation${menuOpen ? " is-open" : ""}`}
          id="primary-navigation"
          aria-label={text.nav.label}
          ref={navRef}
        >
          {NAV_LINKS.map((key) => (
            <a
              key={key}
              href={`#${key}`}
              className={activeSection === key ? "is-active" : undefined}
              aria-current={activeSection === key ? "location" : undefined}
              onClick={closeMenu}
            >
              {text.nav[key]}
            </a>
          ))}
          <a className="nav-contact" href="#contact" onClick={closeMenu}>
            {text.nav.talk} <ArrowIcon diagonal />
          </a>
        </nav>

        <div className="site-header__tools">
          <LanguageSwitcher language={language} onChange={onLanguageChange} label={text.language} />
          <button
            className={`menu-toggle${menuOpen ? " is-open" : ""}`}
            type="button"
            aria-controls="primary-navigation"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? text.nav.close : text.nav.open}
            onClick={() => setMenuOpen((open) => !open)}
            ref={menuToggleRef}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
      {/* Reading progress: a fine red line along the header's bottom edge */}
      <div className="scroll-progress" aria-hidden="true" />
    </header>
  );
}
