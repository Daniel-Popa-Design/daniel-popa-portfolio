// Token-Turnier: memory game with design tokens.

import { useEffect, useState } from "react";
import { WIN_MASCOT_KEYS } from "./mascotData.jsx";
import { ShieldEmblem, WinMascot } from "./mascots.jsx";
import { NumberMark } from "../ui.jsx";

// ---------------------------------------------------------------------------
// Token memory — small extra game (styles: _game.scss). Real colour tokens
// from a publishing system; the ad-module tokens (--obEnd…) are abstracted
// to a generic --adSrc. No saving: state lives only in this component.
// ---------------------------------------------------------------------------

const MEMORY_TOKENS = [
  { token: "--PrCl1", hex: "#134b7d", role: { de: "Primär · Dunkelblau", en: "Primary · dark blue" } },
  { token: "--PrCl2", hex: "#1f79c9", role: { de: "Primär · Blau", en: "Primary · blue" } },
  { token: "--PrCl4", hex: "#071a2a", role: { de: "Primär · Navy", en: "Primary · navy" } },
  { token: "--AcCl1", hex: "#ffdd00", role: { de: "Akzent · Gelb", en: "Accent · yellow" } },
  { token: "--AcCl2", hex: "#e90000", role: { de: "Akzent · Rot", en: "Accent · red" } },
  { token: "--AcCl5", hex: "#ff8d11", role: { de: "Akzent · Orange", en: "Accent · orange" } },
  { token: "--badgePltBg", hex: "#2b8701", role: { de: "Badge · 4,5:1", en: "Badge · 4.5:1" } },
  { token: "--adSrc", hex: "#575757", role: { de: "Werbemodul · Quelle", en: "Ad module · source" } },
];

// Pairs in order: the prerendered page and the first browser render must
// match, so the random shuffle happens right after mounting
const orderedDeck = () =>
  MEMORY_TOKENS.flatMap((card, pair) => [
    { ...card, pair, id: `${pair}a` },
    { ...card, pair, id: `${pair}b` },
  ]);

function shuffleDeck() {
  const deck = orderedDeck();
  for (let i = deck.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

export function TokenMemory({ text, language }) {
  const [deck, setDeck] = useState(orderedDeck);
  const [open, setOpen] = useState([]); // ids of the face-up, unmatched cards (max. 2)
  const [matched, setMatched] = useState([]); // matched pair indexes
  const [moves, setMoves] = useState(0);
  const [status, setStatus] = useState("");
  // Mascot for the current round + collection of unlocked mascots (no saving)
  const [mascot, setMascot] = useState(WIN_MASCOT_KEYS[0]);
  const [discovered, setDiscovered] = useState([]);
  const busy = open.length === 2;
  const won = matched.length === MEMORY_TOKENS.length;

  // Shuffle and pick the first mascot in the browser only (see orderedDeck)
  useEffect(() => {
    setDeck(shuffleDeck());
    setMascot(WIN_MASCOT_KEYS[Math.floor(Math.random() * WIN_MASCOT_KEYS.length)]);
  }, []);
  // All mascots collected: the next shuffle starts a fresh collection
  const complete = discovered.length === WIN_MASCOT_KEYS.length;

  // Second card turned: keep the pair, otherwise turn both back after a moment
  useEffect(() => {
    if (open.length !== 2) return undefined;
    const [a, b] = open.map((id) => deck.find((card) => card.id === id));
    if (a.pair === b.pair) {
      const next = [...matched, a.pair];
      setMatched(next);
      setOpen([]);
      if (next.length === MEMORY_TOKENS.length) {
        setDiscovered((current) =>
          current.includes(mascot) ? current : [...current, mascot],
        );
        setStatus(text.won(moves));
      } else {
        setStatus(text.found(a.token));
      }
      return undefined;
    }
    setStatus(text.miss);
    const timerId = window.setTimeout(() => setOpen([]), 900);
    return () => window.clearTimeout(timerId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const turn = (card) => {
    if (busy || open.includes(card.id) || matched.includes(card.pair)) return;
    if (open.length === 1) setMoves((current) => current + 1);
    setOpen((current) => [...current, card.id]);
  };

  const restart = () => {
    setDeck(shuffleDeck());
    setOpen([]);
    setMatched([]);
    setMoves(0);
    setStatus("");
    if (complete) setDiscovered([]);
    setMascot((current) => {
      const locked = complete
        ? WIN_MASCOT_KEYS.filter((key) => key !== current)
        : WIN_MASCOT_KEYS.filter((key) => !discovered.includes(key));
      return locked[Math.floor(Math.random() * locked.length)];
    });
  };

  return (
    <div className="token-memory badge-card">
      <div className="token-memory__bar">
        <div className="token-memory__stats">
          <span className="token-memory__stat">
            <NumberMark shape="ring" className="token-memory__count" hidden>
              {String(moves).padStart(2, "0")}
            </NumberMark>
            {text.moves}
          </span>
          <span className="token-memory__stat">
            <NumberMark shape="ring" className="token-memory__count" hidden>
              {matched.length}/{MEMORY_TOKENS.length}
            </NumberMark>
            {text.pairs}
          </span>
          <span className="token-memory__stat">
            <NumberMark shape="ring" className="token-memory__count" hidden>
              {discovered.length}/{WIN_MASCOT_KEYS.length}
            </NumberMark>
            {text.mascotCount}
          </span>
        </div>
        <button className="token-memory__restart" onClick={restart} type="button">
          {complete ? text.newCollection : text.restart}
        </button>
      </div>

      <div className="token-memory__board" role="group" aria-label={text.boardLabel}>
        {deck.map((card, index) => {
          const isMatched = matched.includes(card.pair);
          const isUp = isMatched || open.includes(card.id);
          return (
            <button
              aria-label={isUp ? `${card.token}, ${card.hex}` : text.hidden(index + 1)}
              aria-pressed={isUp}
              className={`token-memory__card${isUp ? " is-up" : ""}${isMatched ? " is-matched" : ""}`}
              disabled={isMatched}
              key={card.id}
              onClick={() => turn(card)}
              type="button"
            >
              <span className="token-memory__inner" aria-hidden="true">
                <span className="token-memory__face token-memory__face--back">
                  <ShieldEmblem />
                </span>
                <span className="token-memory__face token-memory__face--front">
                  <span className="token-memory__swatch" style={{ "--swatch": card.hex }} />
                  <code>{card.token}</code>
                  <small>{card.role[language]}</small>
                  <small className="token-memory__hex">{card.hex}</small>
                </span>
              </span>
            </button>
          );
        })}

        {won && (
          <div className="token-memory__win">
            <div className="token-memory__win-card">
              <WinMascot name={mascot} />
              <p className="token-memory__win-title">{text.wonTitle}</p>
              <p className="token-memory__win-text">{text.mascots[mascot]}</p>
              {discovered[discovered.length - 1] === mascot && (
                <p className="token-memory__win-unlock">
                  {complete
                    ? text.collectionDone
                    : text.newMascot(text.mascotNames[mascot])}
                </p>
              )}
              <button className="token-memory__restart" onClick={restart} type="button">
                {complete ? text.newCollection : text.restart}
              </button>
            </div>
          </div>
        )}
      </div>

      <p className="token-memory__status" aria-live="polite" role="status">
        {status}
      </p>

      <section className="token-memory__collection" aria-label={text.collectionLabel}>
        <div className="token-memory__collection-head">
          <p className="token-memory__collection-label">{text.collectionLabel}</p>
          <p className="token-memory__collection-hint">
            <svg className="token-memory__hint-icon" viewBox="0 0 20 20" aria-hidden="true">
              <circle cx="10" cy="10" r="8.75" />
              <path d="M10 9v5" />
              <circle className="token-memory__hint-dot" cx="10" cy="6.1" r=".95" />
            </svg>
            {complete
              ? text.collectionDone
              : text.collectionHint}
          </p>
        </div>
        <ul className="token-memory__collection-list">
          {WIN_MASCOT_KEYS.map((key) => {
            const found = discovered.includes(key);
            return (
              <li
                className={`token-memory__slot${found ? " is-found" : ""}`}
                key={key}
              >
                <span className="token-memory__slot-art">
                  {found ? (
                    <WinMascot name={key} />
                  ) : (
                    // Locked: a padlock in the ring style — light rim, fine
                    // edge, lemon body, ink keyhole; no hint at the mascot
                    <svg className="win-mascot token-memory__lock" viewBox="0 0 64 64" aria-hidden="true">
                      {/* Shackle: a light rim line with a lemon core */}
                      <path className="lock__shackle-rim" d="M22 31V22a10 10 0 0 1 20 0v9" />
                      <path className="lock__shackle" d="M22 31V22a10 10 0 0 1 20 0v9" />
                      {/* Body: rim, fine edge, lemon face — the ring style */}
                      <rect className="lock__rim" x="13" y="30" width="38" height="28" rx="6" />
                      <rect className="lock__edge" x="13" y="30" width="38" height="28" rx="6" />
                      <rect className="lock__face" x="13" y="30" width="38" height="28" rx="6" />
                      <path className="lock__key" d="M32 37.4a3.4 3.4 0 0 1 1.9 6.2l1.2 6h-6.2l1.2-6a3.4 3.4 0 0 1 1.9-6.2Z" />
                    </svg>
                  )}
                </span>
                <span className="token-memory__slot-name">
                  {found ? text.mascotNames[key] : text.locked}
                </span>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
