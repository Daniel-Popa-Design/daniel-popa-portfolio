// About: intro note and the career timeline.

import { copyrightYear } from "../../utils.js";
import { ClampedText, NoteCard } from "../ui.jsx";

export function AboutSection({ text }) {
  return (
    <section
      className="about section-wrap section-space"
      id="about"
      aria-labelledby="about-title"
    >
      {/* Same heading pattern as the work section: eyebrow, title, note */}
      <div className="section-heading">
        <div>
          <p className="eyebrow">{text.about.eyebrow}</p>
          <h2 id="about-title">
            {text.about.title[0]}
            <br />
            {text.about.title[1]}
            <span>.</span>
          </h2>
        </div>
        <NoteCard
          label={text.about.noteLabel}
          tab={text.about.noteTab}
        >
          {text.about.intro}
        </NoteCard>
      </div>

      {/* Career timeline: oldest → today, one column per role */}
      <section className="career" id="experience" aria-labelledby="experience-title">
        <h3 id="experience-title">{text.experience.title}</h3>
        <ol className="career__list">
          {text.experience.entries.map((entry) => (
            <li className="career__item" key={entry.range}>
              <p className="career__range">{entry.range}</p>
              <span className="career__dot" aria-hidden="true" />
              <div className="career__body">
                <p className="career__duration">
                  {entry.since
                    ? `${copyrightYear - entry.since} ${text.experience.years}`
                    : entry.duration}
                </p>
                <h4>{entry.role}</h4>
                {entry.company && (
                  <p className="career__company">{entry.company}</p>
                )}
                <ClampedText
                  className="career__summary"
                  lessLabel={text.experience.less}
                  lines={4}
                  moreLabel={text.experience.more}
                  text={entry.description}
                />
              </div>
            </li>
          ))}
        </ol>
      </section>
    </section>
  );
}
