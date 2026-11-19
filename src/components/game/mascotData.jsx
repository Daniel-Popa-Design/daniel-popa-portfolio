// Win mascots of the memory game (drawings and keys).

// Win mascots — medieval characters in the icon style (white faces, ink
// outline, teal/gold accents, no shadow). One is picked at random
// for every won game; the caption comes from text.game.mascots[key].
export const WIN_MASCOTS = {
  // Knight helmet: googly eyes peek through the visor slit, gold plume
  knight: (
    <>
      <path className="is-gold" d="M32 12c1.5-6.5 8-10 15-8.6-3.2 1.8-4.3 4.9-4 8.3-3.6-2.3-7.6-2.2-11 .3Z" />
      <path d="M15 56V30c0-11 7.6-18.5 17-18.5S49 19 49 30v26Z" />
      <path className="is-line" d="M32 12v14" />
      <rect className="is-ink" x="18" y="28" width="28" height="10" rx="5" />
      <circle cx="26" cy="33" r="4" />
      <circle cx="38" cy="33" r="4" />
      <circle className="is-ink" cx="27.4" cy="34" r="1.8" />
      <circle className="is-ink" cx="36.7" cy="31.9" r="1.8" />
      <circle className="is-ink" cx="26" cy="44" r="1.2" />
      <circle className="is-ink" cx="32" cy="44" r="1.2" />
      <circle className="is-ink" cx="38" cy="44" r="1.2" />
      <path className="is-teal" d="M15 50h34v6H15Z" />
    </>
  ),
  // Little dragon: curved gold horns, back spikes, nostrils, two fangs, smoke
  dragon: (
    <>
      <path className="is-gold" d="M18 27c-3.5-5-3.8-11.5.4-16 0 4.4 2.2 7.6 5.6 9.6Z" />
      <path className="is-gold" d="M46 27c3.5-5 3.8-11.5-.4-16 0 4.4-2.2 7.6-5.6 9.6Z" />
      <path className="is-gold" d="m25.5 22 3-7.5 3 7.5Zm7 0 3-7.5 3 7.5Z" />
      <path className="is-teal" d="M9 38c0-10.5 10.3-18.5 23-18.5S55 27.5 55 38c0 9.5-7.5 16-23 16S9 47.5 9 38Z" />
      <path className="is-line" d="M18 26.5 27 29M46 26.5 37 29" />
      <circle cx="23" cy="33" r="5.2" />
      <circle cx="41" cy="33" r="5.2" />
      <circle className="is-ink" cx="24.3" cy="32.2" r="2.2" />
      <circle className="is-ink" cx="42.3" cy="32.2" r="2.2" />
      <circle className="is-ink" cx="28.5" cy="41.5" r="1.3" />
      <circle className="is-ink" cx="35.5" cy="41.5" r="1.3" />
      <path className="is-line" d="M20 46.5c7.5 4.5 16.5 4.5 24 0" />
      <path d="m24 47.6 1.8 4.2 1.8-3.4Z" />
      <path d="m36.4 48.4 1.8 3.4 1.8-4.2Z" />
      <circle cx="53" cy="23" r="3" />
      <circle cx="57.5" cy="16.5" r="2.2" />
      <circle cx="60.5" cy="11" r="1.5" />
    </>
  ),
  // Frog king: crown between the eye bumps, rosy cheeks, huge grin
  frog: (
    <>
      <circle className="is-teal" cx="20" cy="28" r="9" />
      <circle className="is-teal" cx="44" cy="28" r="9" />
      <ellipse className="is-teal" cx="32" cy="42" rx="24" ry="15" />
      <circle cx="20" cy="27" r="5.5" />
      <circle cx="44" cy="27" r="5.5" />
      <circle className="is-ink" cx="21" cy="28" r="2.4" />
      <circle className="is-ink" cx="43" cy="28" r="2.4" />
      <path className="is-gold" d="M24.5 22V10l4.2 4.6L32 7.5l3.3 7.1 4.2-4.6v12Z" />
      <circle className="is-gold" cx="15" cy="45" r="3" />
      <circle className="is-gold" cx="49" cy="45" r="3" />
      <path className="is-line" d="M17 40c7.5 9 22.5 9 30 0" />
    </>
  ),
  // Wise owl in a starry wizard hat
  owl: (
    <>
      <circle cx="32" cy="41" r="19" />
      <path className="is-teal" d="M17 27 32 2l15 25Z" />
      <circle className="is-gold" cx="29" cy="15" r="1.6" />
      <circle className="is-gold" cx="35" cy="21" r="1.3" />
      <ellipse className="is-teal" cx="32" cy="27.5" rx="21" ry="3.6" />
      <path className="is-line" d="M17.5 32.5 25 35M46.5 32.5 39 35" />
      <circle cx="24.5" cy="40" r="6.5" />
      <circle cx="39.5" cy="40" r="6.5" />
      <circle className="is-gold" cx="24.5" cy="40" r="3.6" />
      <circle className="is-gold" cx="39.5" cy="40" r="3.6" />
      <circle className="is-ink" cx="24.5" cy="40" r="1.7" />
      <circle className="is-ink" cx="39.5" cy="40" r="1.7" />
      <path className="is-gold" d="m29 47 3 5.5 3-5.5Z" />
    </>
  ),
  // Goblin jester: pointy ears, two-tip hat with bells, odd eyes, one tooth
  goblin: (
    <>
      <path className="is-teal" d="M19 37 3 28l14 15Z" />
      <path className="is-teal" d="m45 37 16-9-14 15Z" />
      <ellipse className="is-teal" cx="32" cy="40" rx="15" ry="16" />
      <path d="M16.5 30c2-9.5 8.5-15 15.5-15s13.5 5.5 15.5 15Z" />
      <path className="is-gold" d="M19 27 9 11l12 7Z" />
      <path className="is-gold" d="m45 27 10-16-12 7Z" />
      <circle className="is-gold" cx="9" cy="11" r="2.4" />
      <circle className="is-gold" cx="55" cy="11" r="2.4" />
      <circle cx="26" cy="37" r="5" />
      <circle cx="39" cy="38" r="3.4" />
      <circle className="is-ink" cx="26.8" cy="37.8" r="2.1" />
      <circle className="is-ink" cx="38.6" cy="38.4" r="1.4" />
      <ellipse className="is-teal" cx="32.5" cy="43" rx="3" ry="2.4" />
      <path className="is-line" d="M24 48c5 4 11 4 16 0" />
      <path d="M30.5 49.6h3v3.2h-3Z" />
    </>
  ),
};

export const WIN_MASCOT_KEYS = Object.keys(WIN_MASCOTS);
