// Hero: name, role, intro, CTAs and the portrait with the experience badge.

import { Portrait } from "../Portrait.jsx";
import { ArrowIcon } from "../icons.jsx";
import { HeroBadge } from "../illustrations.jsx";

export function Hero({ text }) {
  return (
    <section
      className="hero section-wrap"
      id="top"
      aria-labelledby="hero-title"
    >
      <div className="hero__copy">
        {/* Name and role form one H1; they look like two lines.
            The "|" is decorative, so screen readers skip it. */}
        <h1 id="hero-title" className="hero__heading">
          <span className="hero__name">Daniel Popa</span>{" "}
          <span className="hero__role">
            <span>
              {text.hero.role[0]}
              {" "}
              <span className="hero__divider" aria-hidden="true">
                |
              </span>
            </span>{" "}
            <span>{text.hero.role[1]}</span>
          </span>
        </h1>
        <div className="hero__bottom">
          <p className="hero__intro">{text.hero.intro}</p>
          <div className="hero__actions">
            <a className="button button--blue" href="#work">
              {text.hero.work} <ArrowIcon down />
            </a>
            <a
              className="hero-cv"
              href={`${import.meta.env.BASE_URL}Lebenslauf_Daniel_Popa.pdf`}
              download="Lebenslauf_Daniel_Popa.pdf"
            >
              <span>{text.hero.downloadCv}</span>
              <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
                <path d="M10 3v10m-4-4 4 4 4-4M4 16v2h12v-2"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="hero-art">
        <div className="hero-art__profile">
          <div className="hero-art__badge__wrapper">
            <HeroBadge />

            <div className="hero-art__badge__text">
              <span>
                {text.heroBadge.exp1}
              </span>
              <span>
                {text.heroBadge.exp2}
              </span>
            </div>
          </div>
          <div className="hero-art__portrait__background" />

          <Portrait
            className="hero-art__portrait hero-art__portrait--inside"
            alt={text.hero.art}
          />
          {/* Same photo again, only for the head breaking out of the ring */}
          <Portrait
            className="hero-art__portrait hero-art__portrait--outside"
            alt=""
          />
        </div>
      </div>
    </section>
  );
}
