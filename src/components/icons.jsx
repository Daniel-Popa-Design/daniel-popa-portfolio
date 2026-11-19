// Inline SVG icons (decorative, aria-hidden).

// Zoom icon for the preview buttons: round lens with a plus, short handle
// pointing down-left (mirrored, so it leans towards the button text);
// one stroke weight with rounded ends (colour from the button text)
export function ZoomIcon() {
  return (
    <svg className="zoom-icon" aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <circle cx="13.5" cy="10.5" r="6.5" />
      <path d="m8.5 15.5-5 5M13.5 7.75v5.5M10.75 10.5h5.5" />
    </svg>
  );
}

// Paper plane for the e-mail button: outline + centre fold, two short motion
// lines trailing behind; same line weight and round ends as the zoom icon.
// On hover the plane lifts off up-right and the trail stretches (CSS).
export function PaperPlaneIcon() {
  return (
    <svg className="plane-icon" aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <g className="plane-icon__plane">
        <path d="M21 3 3.5 10.2l6.9 3.4 3.4 6.9L21 3Z" />
        <path d="m10.4 13.6 4.9-4.9" />
      </g>
      <path className="plane-icon__trail" d="m3.5 20.5 3-3M2.75 15.25l1.5-1.5" />
    </svg>
  );
}

export function ArrowIcon({ diagonal = false, down = false }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      {diagonal ? (
        <path d="M5 15 15 5M6 5h9v9" />
      ) : down ? (
        <path d="M10 3v13m-5-5 5 5 5-5" />
      ) : (
        <path d="M3 10h13m-5-5 5 5-5 5" />
      )}
    </svg>
  );
}

// "Back to top" hint next to the wordmark: an up arrow in a fine round coin,
// same line weight as the other icons. Header: appears once the page is
// scrolled past the first screen; footer: always shown.
export function ToTopIcon() {
  return (
    <span className="wordmark__top" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M12 18.5v-13M6.5 11 12 5.5l5.5 5.5" />
      </svg>
    </span>
  );
}

// Testimonial quote marks: two slanted, heavy strokes
export function QuoteMark() {
  return (
    <svg className="testimonial__mark" viewBox="0 0 64 56" aria-hidden="true">
      <path d="M16 0h14l-9 56H5Z" />
      <path d="M45 0h14l-9 56H34Z" />
    </svg>
  );
}
