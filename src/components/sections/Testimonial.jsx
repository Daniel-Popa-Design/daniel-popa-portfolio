// Testimonial quote.

import { QuoteMark } from "../icons.jsx";
import { SilhouetteAvatar } from "../illustrations.jsx";

export function Testimonial({ text }) {
  return (
    <section
      className="testimonial section-wrap section-space"
      aria-labelledby="testimonial-title"
    >
      <h2 className="eyebrow" id="testimonial-title">
        {text.testimonial.eyebrow}
      </h2>
      <figure className="testimonial__figure">
        <QuoteMark />
        <blockquote className="testimonial__quote">
          <p>{text.testimonial.quote}</p>
        </blockquote>
        <figcaption className="testimonial__author">
          <SilhouetteAvatar />
          <span className="testimonial__who">
            {/* Name set in a handwriting face — a typographic sign-off,
                not a reproduction of the real signature. It is the only
                place the name appears, so screen readers read it too. */}
            <span className="testimonial__signature">
              {text.testimonial.name}
            </span>
            <span>{text.testimonial.role}</span>
          </span>
        </figcaption>
      </figure>
    </section>
  );
}
