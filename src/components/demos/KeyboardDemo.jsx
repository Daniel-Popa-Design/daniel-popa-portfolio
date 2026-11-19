// Live demo dialog for case study 03: keyboard path before / after.

import { useEffect, useId, useRef, useState } from "react";
import { PreviewDialog } from "./PreviewDialog.jsx";
import { countdownDomains } from "./portalData.js";
import { useReducedMotion } from "../../utils.js";

// Case 03 live demo — the sketch made playable. Each step is one key press:
// before: Tab through 8 menu items, the 9th Tab reaches the article
// after:  Tab focuses the skip link, Enter jumps to the article
const KEY_PATHS = {
  before: [
    ...Array.from({ length: 8 }, (_, index) => ["Tab", `m${index}`]),
    ["Tab", "article"],
  ],
  after: [
    ["Tab", "skip"],
    ["Enter", "article"],
  ],
};

const KEY_PATH_STEPS = KEY_PATHS.before.length;

const idleKeyboardPanel = { pos: null, keys: [], active: false };

// One page of the comparison: mini site, key path, checklist, "try it"
function KeyboardPanel({ variant, text, label, caption, brand, view, onTry, onKey, onPos }) {
  const startRef = useRef(null);
  const articleRef = useRef(null);
  const articleId = useId();
  const isAfter = variant === "after";
  const path = KEY_PATHS[variant];
  const reached = view.pos === "article";
  const slots = Math.max(path.length, view.keys.length);
  // Where a key press lands: a menu item, the skip link or the article
  const targetLabel = (target) =>
    target === "skip"
      ? text.skip
      : target === "article"
        ? text.article
        : text.nav[Number(target.slice(1))];
  // The drawn focus always follows real focus — the native ring is replaced
  const focusTo = (target) => () => onPos(target);

  return (
    <section className="kbdRace__panel" data-variant={variant} aria-label={label}>
      <header className="kbdRace__head">
        <h3>{label}</h3>
        <p className="kbdRace__count" aria-live="polite">
          <strong>{view.keys.length}</strong>
          <span>{text.presses}</span>
        </p>
      </header>

      <div
        className="kbdRace__page"
        onKeyDown={(event) => {
          if (view.active && !reached && (event.key === "Tab" || event.key === "Enter")) {
            onKey(event.key);
          }
        }}
      >
        <span className="kbdRace__start" ref={startRef} tabIndex={-1} />
        <div className="kbdRace__bar">
          <b>{brand}</b>
          <span className="kbdRace__live">{text.live}</span>
        </div>

        {isAfter && (
          <a
            className="kbdRace__skip"
            data-current={view.pos === "skip"}
            href={`#${articleId}`}
            onClick={(event) => {
              event.preventDefault();
              articleRef.current?.focus();
            }}
            onFocus={focusTo("skip")}
          >
            {text.skip}
          </a>
        )}

        {/* The same main navigation in both versions */}
        <nav aria-label={`${text.navLabel} (${label})`} className="kbdRace__nav" data-skipped={isAfter && reached}>
          <ul className="kbdRace__menu">
            {text.nav.map((item, index) => (
              <li key={item}>
                <a
                  data-current={view.pos === `m${index}`}
                  href="#"
                  onClick={(event) => event.preventDefault()}
                  onFocus={focusTo(`m${index}`)}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        {isAfter && reached && (
          <span className="kbdRace__skipped">↓ {text.skipped}</span>
        )}

        <article
          className="kbdRace__article"
          data-current={reached}
          id={articleId}
          onFocus={focusTo("article")}
          ref={articleRef}
          // before: the 9th Tab stop (like the article's first link);
          // after: reached through the skip link only
          tabIndex={isAfter ? -1 : 0}
        >
          {reached && <span className="kbdRace__badge">{view.keys.length}</span>}
          <strong>{text.articleTitle}</strong>
          <i />
          <i />
          <i />
        </article>
      </div>

      <div className="kbdRace__path">
        <span>{text.path}</span>
        <ol>
          {Array.from({ length: slots }, (_, index) => (
            <li data-filled={index < view.keys.length} key={index}>
              <b>{view.keys[index] ?? path[index]?.[0]}</b>
              {path[index] && <span>{targetLabel(path[index][1])}</span>}
            </li>
          ))}
        </ol>
      </div>

      <ul className="kbdRace__checks">
        {text.checks[variant].map((item) => (
          <li data-ok={isAfter} key={item}>
            {/* SVG instead of ✕/✓ glyphs: centres exactly, independent of the font */}
            <span aria-hidden="true">
              <svg viewBox="0 0 16 16">
                <path d={isAfter ? "M3.5 8.4l3 3 6-6.6" : "M4.5 4.5l7 7m0-7l-7 7"} />
              </svg>
            </span>
            {item}
          </li>
        ))}
      </ul>

      <footer className="kbdRace__foot">
        <p>{caption}</p>
        <button
          onClick={() => {
            onTry();
            startRef.current?.focus();
          }}
          type="button"
        >
          {text.try}
        </button>
      </footer>
    </section>
  );
}

// Case 03 preview — no portal/mode switches: this case is about the key path,
// not about theming, so it always shows one portal in light mode
export function KeyboardPreview({ open, onClose, text }) {
  const keyboard = text.keyboard;

  return (
    <PreviewDialog
      closeLabel={keyboard.close}
      lead={keyboard.lead}
      onClose={onClose}
      open={open}
      title={keyboard.title}
    >
      <KeyboardRace
        brand={countdownDomains.northstar.name}
        domain="northstar"
        text={text}
        theme="light"
      />
    </PreviewDialog>
  );
}

// Plays both key paths side by side, or follows the visitor's real focus
function KeyboardRace({ text, domain, theme, brand }) {
  const keyboard = text.keyboard;
  const [mode, setMode] = useState("play");
  const [playId, setPlayId] = useState(0);
  const [playedTick, setTick] = useState(0);
  // Reduced motion: no autoplay on open, the result shows at once; a click
  // on ▶ (playId > 0) still plays the path step by step
  const reducedMotion = useReducedMotion();
  const tick = reducedMotion && playId === 0 ? KEY_PATH_STEPS : playedTick;
  const [manual, setManual] = useState({
    before: idleKeyboardPanel,
    after: idleKeyboardPanel,
  });
  // Was the last input a Tab? Then focus entering a page came from a key
  // press outside it (e.g. the play button) and counts as press no. 1.
  const lastKeyWasTab = useRef(false);

  useEffect(() => {
    const onKeyDown = (event) => {
      lastKeyWasTab.current = event.key === "Tab";
    };
    const onPointerDown = () => {
      lastKeyWasTab.current = false;
    };
    window.addEventListener("keydown", onKeyDown, true);
    window.addEventListener("pointerdown", onPointerDown, true);
    return () => {
      window.removeEventListener("keydown", onKeyDown, true);
      window.removeEventListener("pointerdown", onPointerDown, true);
    };
  }, []);

  // Autoplay on open is skipped for reduced motion (the result shows at
  // once), but a click on ▶ (playId > 0) always plays the path step by step:
  // the visitor asked for it, and it is a counter, not a moving animation.
  useEffect(() => {
    if (mode !== "play") return undefined;
    if (reducedMotion && playId === 0) return undefined;
    let current = 0;
    const timerId = window.setInterval(() => {
      current += 1;
      setTick(current);
      if (current >= KEY_PATH_STEPS) window.clearInterval(timerId);
    }, 550);
    return () => window.clearInterval(timerId);
  }, [mode, playId, reducedMotion]);

  const viewOf = (variant) => {
    if (mode === "manual") return manual[variant];
    const steps = KEY_PATHS[variant].slice(0, tick);
    return {
      pos: steps.at(-1)?.[1] ?? null,
      keys: steps.map(([key]) => key),
      active: false,
    };
  };

  const updatePanel = (variant, change) =>
    setManual((current) => ({
      ...current,
      [variant]: { ...current[variant], ...change(current[variant]) },
    }));

  const panel = (variant) => (
    <KeyboardPanel
      brand={brand}
      caption={variant === "before" ? text.skipCaptionBefore : text.skipCaptionAfter}
      label={variant === "before" ? text.before : text.after}
      onKey={(key) => updatePanel(variant, (state) => ({ keys: [...state.keys, key] }))}
      onPos={(pos) => {
        // Focus moved inside a page: stop the animation and follow the visitor.
        // Entering a page that isn't mid-run starts a fresh run.
        setMode("manual");
        updatePanel(variant, (state) => ({
          pos,
          keys: state.active ? state.keys : lastKeyWasTab.current ? ["Tab"] : [],
          active: pos !== "article",
        }));
      }}
      onTry={() => {
        setMode("manual");
        setManual({
          before: idleKeyboardPanel,
          after: idleKeyboardPanel,
          [variant]: { pos: null, keys: [], active: true },
        });
      }}
      text={keyboard}
      variant={variant}
      view={viewOf(variant)}
    />
  );

  return (
    <div className="kbdRace" data-domain={domain} data-theme={theme}>
      <div className="kbdRace__controls">
        <button
          className="ds-demo__preview"
          onClick={() => {
            setMode("play");
            setTick(0);
            setPlayId((current) => current + 1);
          }}
          type="button"
        >
          {keyboard.play}
          <span aria-hidden="true">▶</span>
        </button>
        <span>{keyboard.playHint}</span>
      </div>

      <div className="kbdRace__panels">
        {panel("before")}
        {panel("after")}
      </div>

      <div className="kbdRace__summary">
        <strong>{keyboard.summaryValue}</strong>
        <p>{keyboard.summary}</p>
      </div>
    </div>
  );
}
