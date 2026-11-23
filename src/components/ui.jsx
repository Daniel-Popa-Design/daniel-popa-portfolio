// Shared UI building blocks: number marks, note cards, clamped text, takeaways.

import { useEffect, useId, useRef, useState } from "react";

// Number in a mark: filled face with a thin ink outline, no shadow. "bubble" points left (towards the text it belongs to,
// tail vertically centred); "circle" is a plain disc.
const NUMBER_MARK_SHAPES = {
  bubble: {
    // Body x 6–30, y 3–18 (24 × 15) + a triangular pointer on the left.
    // Flat: one dark face, white number (see _expertise.scss)
    viewBox: "0 0 32 21",
    d: "M8.5 3h19A2.5 2.5 0 0 1 30 5.5v10a2.5 2.5 0 0 1-2.5 2.5h-19A2.5 2.5 0 0 1 6 15.5v-2L.8 10.5 6 7.5v-2A2.5 2.5 0 0 1 8.5 3Z",
  },
  circle: {
    viewBox: "0 0 24 24",
    d: "M12 2.6a9.4 9.4 0 1 1 0 18.8 9.4 9.4 0 0 1 0-18.8Z",
  },
  // Hero-badge style in yellow, round: a wide light rim, a fine light edge
  // and the lemon face (100 × 100 space, rendered at 40px: rim ≈ 4.6px)
  ring: {
    viewBox: "0 0 100 100",
    layers: [
      ["rim", "M50 2a48 48 0 1 1 0 96 48 48 0 0 1 0-96Z"],
      ["edge", "M50 13.5a36.5 36.5 0 1 1 0 73 36.5 36.5 0 0 1 0-73Z"],
      ["face", "M50 13.5a36.5 36.5 0 1 1 0 73 36.5 36.5 0 0 1 0-73Z"],
    ],
  },
};

export function NumberMark({ shape, className = "", hidden = false, children }) {
  const { viewBox, d, layers } = NUMBER_MARK_SHAPES[shape];
  return (
    <span
      className={`number-mark number-mark--${shape} ${className}`}
      aria-hidden={hidden || undefined}
    >
      <svg viewBox={viewBox} fill="none" aria-hidden="true">
        {layers ? (
          layers.map(([part, path]) => (
            <path className={`number-mark__${part}`} d={path} key={part} />
          ))
        ) : (
          <path className="number-mark__face" d={d} />
        )}
      </svg>
      <span className="number-mark__text">{children}</span>
    </span>
  );
}

export function NoteCard({ label, tab, children }) {
  return (
    <div className="note-card badge-card">
      <span className="badge-tags">
        <span className="badge-tag">{label}</span>
        <span className="badge-tag badge-tag--fact">{tab}</span>
      </span>
      <p className="note-card__text">{children}</p>
    </div>
  );
}

// Text clamped to `lines` lines; a Read more / Show less toggle appears only
// when the full text is longer. Re-measured on resize (ResizeObserver).
// Text clamped to N lines with a "read more" toggle (only when it overflows)
// Toggletip for a technical term in running text: dotted term + ⓘ.
// Opens on click/tap and keyboard (Enter/Space), and on hover where a mouse
// exists; Escape or a click outside closes it. A plain tooltip (or title="")
// would be invisible on touch screens.
export function InfoTerm({ term, title, children }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const bubbleId = useId();

  useEffect(() => {
    if (!open) return undefined;
    const onPointer = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false);
    };
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <span className="info-term" data-open={open} ref={rootRef}>
      <button
        aria-controls={bubbleId}
        aria-expanded={open}
        className="info-term__trigger"
        onClick={() => setOpen((current) => !current)}
        type="button"
      >
        {term}
        <svg aria-hidden="true" viewBox="0 0 16 16">
          <circle cx="8" cy="8" r="6.6" />
          <path d="M8 7.2v4M8 4.9v.1" />
        </svg>
      </button>
      <span className="info-term__bubble" id={bubbleId} role="note">
        <strong>{title}</strong>
        {children}
      </span>
    </span>
  );
}

// Running text with glossary terms: each { term, title, text } found in the
// text becomes an InfoTerm (first occurrence only)
export function GlossaryText({ text, glossary = [] }) {
  let parts = [text];
  for (const entry of glossary) {
    parts = parts.flatMap((part) => {
      if (typeof part !== "string") return [part];
      const index = part.indexOf(entry.term);
      if (index === -1) return [part];
      return [
        part.slice(0, index),
        <InfoTerm key={entry.term} term={entry.term} title={entry.title}>
          {entry.text}
        </InfoTerm>,
        part.slice(index + entry.term.length),
      ];
    });
  }
  return parts;
}

export function ClampedText({ text, lines = 4, className = "", moreLabel, lessLabel }) {
  const textRef = useRef(null);
  const [overflows, setOverflows] = useState(false);
  const [open, setOpen] = useState(false);
  const id = useId();

  useEffect(() => {
    const el = textRef.current;
    if (!el) return undefined;
    const measure = () => {
      // While open the text is unclamped; keep the toggle so it can collapse
      if (el.classList.contains("is-clamped")) {
        setOverflows(el.scrollHeight > el.clientHeight + 1);
      }
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [text]);

  return (
    <>
      <p
        ref={textRef}
        id={id}
        className={`${className} clamped-text${open ? "" : " is-clamped"}`}
        style={{ "--clamp-lines": lines }}
      >
        {text}
      </p>
      {overflows && (
        <button
          type="button"
          className="clamped-text__toggle"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? lessLabel : moreLabel}
          {/* Chevron: down = closed, rotates up when open (via aria-expanded) */}
          <svg viewBox="0 0 12 12" aria-hidden="true">
            <path d="M3 4.5 6 7.5l3-3" />
          </svg>
        </button>
      )}
    </>
  );
}

// Takeaways: one wide box, four columns divided by fine dotted lines
// (label, text clamped to 3 lines with "Mehr lesen")
export function Takeaways({ items, moreLabel, lessLabel }) {
  return (
    <div className="takeaways">
      {items.map((item) => (
        <div className="takeaway" key={item.icon}>
          <span className="badge-tag badge-tag--ghost">{item.label}</span>
          <ClampedText
            className="takeaway__text"
            lessLabel={lessLabel}
            lines={3}
            moreLabel={moreLabel}
            text={item.text}
          />
        </div>
      ))}
    </div>
  );
}
