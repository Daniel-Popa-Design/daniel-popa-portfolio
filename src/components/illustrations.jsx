// Decorative illustrations: hero badge, testimonial avatar.

import { useId } from "react";

// Hero experience badge — a flat rounded hexagon: lighter red rim, a fine
// light edge, the face in the main red, and a white "10+". The slanted glyphs
// are the previous badge's own (src/assets/Hero-Badge.backup.svg), now drawn
// as solid fills instead of outlines.
export function HeroBadge() {
  return (
    <svg className="hero-badge" viewBox="0 0 100 112" role="img" aria-label="10+">
      <path className="hero-badge__rim" d="M45.28 16.08 Q50.00 13.35 54.72 16.08 L82.22 31.95 Q86.94 34.68 86.94 40.13 L86.94 71.87 Q86.94 77.32 82.22 80.05 L54.72 95.92 Q50.00 98.65 45.28 95.92 L17.78 80.05 Q13.06 77.32 13.06 71.87 L13.06 40.13 Q13.06 34.67 17.78 31.95Z" />
      <path className="hero-badge__edge" d="M50.00 25.00 L76.85 40.50 L76.85 71.50 L50.00 87.00 L23.15 71.50 L23.15 40.50Z" />
      <path className="hero-badge__face" d="M50.00 25.00 L76.85 40.50 L76.85 71.50 L50.00 87.00 L23.15 71.50 L23.15 40.50Z" />
      {/* Glyphs scaled from the old 176 × 210 badge space, "10" centred */}
      <g transform="translate(17.3 21.2) scale(.36)">
        <path className="hero-badge__number" d="M52.29,61.77h15.23c.36,0,.64.12.86.38.21.25.29.55.21.91l-8.9,72.48c-.07.36-.23.66-.48.91-.25.25-.55.38-.91.38h-14.8c-.36,0-.64-.12-.86-.38-.21-.25-.29-.55-.21-.91l6.97-56.72c0-.14-.07-.29-.21-.43-.14-.14-.29-.18-.43-.11l-10.4,2.47-.43.11c-.72,0-1-.39-.86-1.18l1.18-11.26c.14-.71.54-1.21,1.18-1.5l11.26-4.83c.5-.21,1.04-.32,1.61-.32Z" />
        <path className="hero-badge__number" d="M76.47,132.38c-4.04-3.82-6.06-9.06-6.06-15.71,0-1.36.11-2.79.32-4.29l3.22-26.16c.93-7.79,3.98-13.96,9.17-18.5,5.18-4.54,11.74-6.81,19.68-6.81,7.22,0,12.87,1.89,16.94,5.68,4.08,3.79,6.11,9.01,6.11,15.66,0,.79-.07,2.11-.21,3.97l-3.22,26.16c-1,7.94-4.11,14.21-9.33,18.82-5.22,4.61-11.8,6.92-19.73,6.92-7.22,0-12.85-1.91-16.89-5.74ZM101.88,120.26c1.75-1.68,2.77-3.98,3.06-6.92l3.43-27.77c.07-.43.11-1,.11-1.72,0-2.43-.66-4.32-1.98-5.68-1.32-1.36-3.16-2.04-5.52-2.04-2.65,0-4.83.84-6.54,2.52s-2.75,3.98-3.11,6.92l-3.43,27.77c-.07.36-.11.89-.11,1.61,0,2.43.66,4.34,1.98,5.74,1.32,1.39,3.13,2.09,5.42,2.09,2.72,0,4.95-.84,6.7-2.52Z" />
        <path className="hero-badge__plus" d="M151.68,51.48c.13.16.18.35.13.57l-.81,6.51c-.04.22-.15.41-.3.57s-.35.23-.57.23h-8.93c-.18,0-.31.11-.4.34l-1.07,9.06c-.05.22-.15.41-.3.57s-.35.23-.57.23h-6.25c-.49,0-.74-.27-.74-.81l1.14-9.06c0-.22-.09-.34-.27-.34h-8.93c-.22,0-.4-.08-.54-.23-.13-.16-.18-.35-.13-.57l.81-6.51c0-.22.09-.41.27-.57.18-.16.38-.23.6-.23h8.93c.09,0,.17-.03.23-.1.07-.07.1-.14.1-.23l1.14-9.27c.04-.22.14-.41.3-.57.16-.16.35-.24.57-.24h6.24c.22,0,.4.08.54.24.13.16.18.35.13.57l-1.14,9.27c0,.22.11.34.34.34h8.93c.22,0,.4.08.54.23Z" />
      </g>
    </svg>
  );
}

// Avatar for the testimonial: a business-portrait illustration in flat greys:
// bald head with ears, dark rectangular glasses and a long full beard,
// shaded neck, white shirt with collar points, dark tie, grey jacket with
// lighter lapels, in a round frame like the hero portrait. The previous
// version (swept hair, no glasses) is kept in assets/TestimonialAvatar.backup.svg.
export function SilhouetteAvatar() {
  const clipId = useId();
  const neckId = useId();
  return (
    <svg className="testimonial__avatar" viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <clipPath id={clipId}>
          <circle cx="32" cy="32" r="31" />
        </clipPath>
        {/* Shadow under the chin */}
        <linearGradient id={neckId} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#d2d1cb" />
          <stop offset="0.55" stopColor="#ebeae5" />
        </linearGradient>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        <rect width="64" height="64" className="testimonial__avatar-bg" />
        {/* Jacket and lapels */}
        <path className="testimonial__avatar-jacket" d="M2 64c1-10 8-15.5 20-18l10 4 10-4c12 2.5 19 8 20 18Z" />
        <path className="testimonial__avatar-lapel" d="M21 46.5l9 5.5-3 12h-5l-6-13Z" />
        <path className="testimonial__avatar-lapel" d="M43 46.5l-9 5.5 3 12h5l6-13Z" />
        {/* Shirt, collar points, tie */}
        <path className="testimonial__avatar-shirt" d="M24.5 45 32 49l7.5-4 .5 19H24Z" />
        <path className="testimonial__avatar-collar" d="M24.5 45 32 49l-4 6.5Z" />
        <path className="testimonial__avatar-collar" d="M39.5 45 32 49l4 6.5Z" />
        <path className="testimonial__avatar-tie" d="M30 49h4l-.6 3h-2.8ZM30.6 52h2.8l1.6 12h-6Z" />
        {/* Neck, ears, face */}
        <path fill={`url(#${neckId})`} d="M27 35h10v10.5c0 2-2.2 3.5-5 3.5s-5-1.5-5-3.5Z" />
        <ellipse className="testimonial__avatar-ear" cx="20.8" cy="27.5" rx="2.6" ry="3.8" />
        <ellipse className="testimonial__avatar-ear" cx="43.2" cy="27.5" rx="2.6" ry="3.8" />
        {/* Bald head: a round dome, no hair, with a soft shine on top */}
        <path className="testimonial__avatar-face" d="M21 25c0-10.2 4.9-15.5 11-15.5S43 14.8 43 25c0 9.5-4.9 15-11 15s-11-5.5-11-15Z" />
        <path className="testimonial__avatar-shine" d="M26 14.5c1.6-1.9 3.6-2.8 6-2.8" />
        {/* Brows and eyes */}
        <path className="testimonial__avatar-brow" d="M24.4 21.2c1.6-.8 3.6-.9 5.2-.3M39.6 21.2c-1.6-.8-3.6-.9-5.2-.3" />
        <circle className="testimonial__avatar-eye" cx="27" cy="24.9" r=".8" />
        <circle className="testimonial__avatar-eye" cx="37" cy="24.9" r=".8" />
        {/* Nose */}
        <path className="testimonial__avatar-nose" d="M32.2 25.5v4.2l-1.4.4" />
        {/* Full beard with moustache, running long to a point below the chin */}
        <path
          className="testimonial__avatar-beard"
          d="M21.2 27.5c.2 7 2.8 12.6 6.6 16.2L32 48.5l4.2-4.8c3.8-3.6 6.4-9.2 6.6-16.2-1 2.4-2.4 3.9-4.2 4.6-2-1.6-4.2-2.1-6.6-1.6-2.4-.5-4.6 0-6.6 1.6-1.8-.7-3.2-2.2-4.2-4.6Z"
        />
        {/* Mouth: a gap in the beard showing the lower lip, with the
            moustache drawn over its top edge */}
        <path
          className="testimonial__avatar-lip"
          d="M28.7 33.9c1.1-.4 2.2-.5 3.3-.2 1.1-.3 2.2-.2 3.3.2-.5 1.7-1.8 2.6-3.3 2.6s-2.8-.9-3.3-2.6Z"
        />
        <path className="testimonial__avatar-mouth" d="M29 34c1 .4 2 .5 3 .3 1 .2 2 .1 3-.3" />
        <path
          className="testimonial__avatar-moustache"
          d="M26.8 33.9c1.4-1.6 3.2-2.2 5.2-1.5 2-.7 3.8-.1 5.2 1.5-1.5.3-2.8.1-3.9-.4-.5.2-.9.3-1.3.3s-.8-.1-1.3-.3c-1.1.5-2.4.7-3.9.4Z"
        />
        {/* Glasses: dark rectangular frames with temples to the ears */}
        <g className="testimonial__avatar-glasses">
          <rect x="23.2" y="22.4" width="7.4" height="5" rx="1.3" />
          <rect x="33.4" y="22.4" width="7.4" height="5" rx="1.3" />
          <path d="M30.6 24.2c.9-.5 1.9-.5 2.8 0M23.2 24H21.4M40.8 24h1.8" />
        </g>
      </g>
      <circle cx="32" cy="32" r="31" className="testimonial__avatar-ring" />
    </svg>
  );
}
