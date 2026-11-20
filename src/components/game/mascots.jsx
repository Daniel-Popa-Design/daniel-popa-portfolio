// Win mascot (hero badge) renderer and the shield emblem of the memory game.

import { useId } from "react";
import { RARITIES, WIN_MASCOTS } from "./mascotData.jsx";

// Card-back emblem in the ring style of the number marks: a kite shield with
// a light red rim, a fine light edge and a white face, carrying a king's head
// as red line art (redrawn after the reference icon: crenellated crown with
// a heart, closed eyes, curled moustache, pointed beard).
const SHIELD_PATH =
  "M32 4 53 10.2q3.6 1.3 3.6 5.2L55.8 40Q53.8 53 32 67.4 10.2 53 8.2 40L7.4 15.4q0-3.9 3.6-5.2Z";

export function ShieldEmblem() {
  return (
    <svg className="win-mascot token-memory__mascot" viewBox="0 0 64 72" aria-hidden="true">
      <path className="shield__rim" d={SHIELD_PATH} />
      <path className="shield__edge" d={SHIELD_PATH} />
      <path className="shield__face" d={SHIELD_PATH} />
      {/* King — drawn on a 40 × 48 grid, centred on the face */}
      <g className="shield__king" transform="translate(14.8 15.6) scale(.86)">
        {/* Crown: three crenellated towers, band, heart */}
        <path d="M7 15V5h5v3h4V3h8v5h4V5h5v10Z" />
        <path d="M7 11h26" />
        <path d="M20 9.4l-1.9-1.9a1.15 1.15 0 0 1 1.9-1.3 1.15 1.15 0 0 1 1.9 1.3Z" />
        {/* Head: sides and jaw, hair tufts */}
        <path d="M8.5 15v12c0 4 1.6 7 4 9M31.5 15v12c0 4-1.6 7-4 9" />
        <path d="M8.5 18 6.3 21M31.5 18l2.2 3" />
        {/* Brows, closed eyes, nose */}
        <path d="M11.5 19.2q2.8-1.8 5.6 0M22.9 19.2q2.8-1.8 5.6 0" />
        <path d="M12 22.4q2.5 1.5 5 0M23 22.4q2.5 1.5 5 0" />
        <path d="M20 19.5V28q-1.2 1-2.6.4" />
        {/* Curled moustache, mouth */}
        <path d="M20 30.4c-2.2-1.9-5.6-1.6-7.4.8-.5.8.4 1.6 1.1.9M20 30.4c2.2-1.9 5.6-1.6 7.4.8.5.8-.4 1.6-1.1.9" />
        <path d="M17.8 33.4h4.4" />
        {/* Pointed beard with two curls */}
        <path d="M12.5 33c0 6.4 3.4 11 7.5 14 4.1-3 7.5-7.6 7.5-14" />
        <path d="M17 37.5q2 1.8 0 4M23 37.5q-2 1.8 0 4" />
      </g>
    </svg>
  );
}

// Hexagon helpers for the hero badge (pointy top, centre 60/70)
const hexPoints = (r, cx = 60, cy = 70) =>
  [0, 1, 2, 3, 4, 5].map((i) => {
    const a = -Math.PI / 2 + (i * Math.PI) / 3;
    return [+(cx + r * Math.cos(a)).toFixed(2), +(cy + r * Math.sin(a)).toFixed(2)];
  });
const join = (points) => points.map((p) => p.join(",")).join(" ");

const FRAME_OUTER = join(hexPoints(58));
const FRAME_BEVEL = join(hexPoints(55.6));
const FRAME_PANEL = join(hexPoints(52));
const INNER = hexPoints(47);
const GEM_BACK = join(hexPoints(12.5, 60, 12));
const GEM = hexPoints(10.5, 60, 12);
// Gem facets: right, bottom, left — all meeting in the gem's centre
const GEM_FACETS = [
  [GEM[0], GEM[1], GEM[2]],
  [GEM[2], GEM[3], GEM[4]],
  [GEM[4], GEM[5], GEM[0]],
].map((facet) => `${join(facet)} 60,12`);

// Ambient sparkles (x, y, size) and streaks around the hero
const SPARKLES = [[24, 58, 1.6], [96, 76, 1.4], [30, 86, 1.1], [92, 40, 1], [86, 92, 1.2]];
const STREAKS = ["M38 24L44 30", "M80 100L86 94", "M22 76L26 72"];

// Win mascot: a collectible hero in a hexagonal badge — dark rim, silver
// bevel, navy panel, rarity-coloured inner line and numbered gem crest
export function WinMascot({ name }) {
  const hero = WIN_MASCOTS[name];
  const rarity = RARITIES[hero.rarity];
  // Unique gradient ids per badge (sanitised: useId contains special chars)
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const panelId = `${uid}-panel`;
  const softId = `${uid}-soft`;

  return (
    <svg className="hero-badge" viewBox="0 0 120 138" aria-hidden="true">
      <defs>
        <linearGradient id={panelId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#596d90" />
          <stop offset="1" stopColor="#34425e" />
        </linearGradient>
        <radialGradient id={softId}>
          <stop offset="0" stopColor="#fff" stopOpacity=".9" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Frame */}
      <polygon points={FRAME_OUTER} fill="#1c2735" />
      <polygon points={FRAME_BEVEL} fill="#3a4a64" stroke="#b9c6d8" strokeWidth=".8" />
      <polygon points={FRAME_PANEL} fill={`url(#${panelId})`} />

      {/* Accent aura, sparkles, streaks */}
      <circle cx="60" cy="66" r="30" fill={hero.accent} opacity=".12" />
      <circle cx="60" cy="66" r="18" fill={hero.accent} opacity=".08" />
      {SPARKLES.map(([x, y, r]) => (
        <polygon
          key={`${x}-${y}`}
          fill="#dce6f2"
          opacity=".45"
          points={`${x},${y - r * 1.6} ${x + r},${y} ${x},${y + r * 1.6} ${x - r},${y}`}
        />
      ))}
      {STREAKS.map((d) => (
        <path key={d} d={d} stroke="#dce6f2" strokeWidth=".6" opacity=".35" />
      ))}

      {/* Inner line with corner dots in the rarity colour */}
      <polygon points={join(INNER)} fill="none" stroke={rarity.line} strokeWidth=".7" opacity=".7" />
      {[1, 2, 4, 5].map((i) => (
        <circle key={i} cx={INNER[i][0]} cy={INNER[i][1]} r="1.3" fill={rarity.line} />
      ))}

      {/* Floor disc */}
      <ellipse cx="60" cy="105.5" rx="31" ry="6" fill="none" stroke={hero.accent} strokeWidth=".6" opacity=".5" />
      <ellipse cx="60" cy="105.5" rx="24" ry="4.4" fill="#26324a" opacity=".85" />

      {/* Hero */}
      {hero.art.map((shape, i) => {
        const fill = shape.fill === "soft" ? `url(#${softId})` : shape.fill;
        if (shape.t === "c") {
          return <circle key={i} cx={shape.cx} cy={shape.cy} r={shape.r} fill={fill} opacity={shape.opacity} />;
        }
        if (shape.t === "path") {
          return (
            <path
              key={i}
              d={shape.d}
              fill="none"
              stroke={shape.stroke}
              strokeWidth=".7"
              strokeDasharray={shape.dash}
              opacity={shape.opacity}
            />
          );
        }
        return <polygon key={i} points={shape.points} fill={fill} opacity={shape.opacity} />;
      })}

      {/* Bottom ornament and numbered gem crest */}
      <polygon points="60,123 63,126.5 60,130 57,126.5" fill={rarity.gem[1]} />
      <polygon points={GEM_BACK} fill="#1c2735" />
      {GEM_FACETS.map((points, i) => (
        <polygon key={points} points={points} fill={rarity.gem[[1, 2, 0][i]]} />
      ))}
      <text className="hero-badge__number" x="60" y="16.2" textAnchor="middle">
        {hero.n}
      </text>
    </svg>
  );
}
