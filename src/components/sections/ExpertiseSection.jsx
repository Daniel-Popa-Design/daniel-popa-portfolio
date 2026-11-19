// Expertise: skill groups with honest levels.

import { NoteCard, NumberMark } from "../ui.jsx";

export function ExpertiseSection({ text }) {
  return (
    <section
      className="expertise section-wrap section-space"
      id="expertise"
      aria-labelledby="expertise-title"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">{text.expertise.eyebrow}</p>
          <h2 id="expertise-title">
            {text.expertise.title}
            <span>.</span>
          </h2>
        </div>
        <NoteCard
          label={text.expertise.noteLabel}
          tab={`${text.expertise.groups.length} ${text.expertise.areaUnit} · ${text.expertise.groups.reduce((total, group) => total + group.skills.length, 0)} ${text.expertise.skillUnit}`}
        >
          {text.expertise.aside}
        </NoteCard>
      </div>
      <div className="expertise-board">
        <div className="expertise-grid">
          {text.expertise.groups.map((group) => (
            <article className="expertise-card" key={group.title}>
              <div className="expertise-card__content">
                {/* The last word and the count never break apart, so a long
                    title wraps onto two rows with the count after it */}
                <h3 className="expertise-card__heading">
                  {group.title.split(" ").slice(0, -1).join(" ")}{" "}
                  <span className="expertise-card__title-end">
                    {group.title.split(" ").at(-1)}
                    <NumberMark shape="bubble" className="expertise-card__count" hidden>
                      {String(group.skills.length).padStart(2, "0")}
                    </NumberMark>
                  </span>
                </h3>
                <p>{group.description}</p>
              </div>
              <ul aria-label={group.title}>
                {group.skills.map((skill) => {
                  // Plain string, or { name, level } with the level from the CV
                  const { name, level } =
                    typeof skill === "string" ? { name: skill } : skill;
                  return (
                    <li key={name}>
                      {name}
                      {level && (
                        <span className="expertise-card__level">
                          ({level})
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
