// Win mascot renderer and the shield emblem of the memory game.

import { WIN_MASCOTS } from "./mascotData.jsx";

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

export function WinMascot({ name }) {
  return (
    <svg className="win-mascot" viewBox="0 0 64 64" aria-hidden="true">
      {WIN_MASCOTS[name]}
    </svg>
  );
}
