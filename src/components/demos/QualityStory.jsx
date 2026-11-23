// Case-study story (demo, result, folded approach) and the wireframe browser frame.

import { GlossaryText } from "../ui.jsx";

// Wireframe browser window used by the practice demos (decorative)
export function DemoBrowser({ children }) {
  return (
    <div className="cls-demo__frame" aria-hidden="true">
      <div className="cls-demo__chrome">
        <i />
        <i />
        <i />
        <b />
      </div>
      {children}
    </div>
  );
}

// Practice case study. Always visible (with the title and short description
// above it): the demo and the one-line result. Folded, closed by default:
// how I got there — Situation, Why, What I did, technical details.
export function QualityStory({ story, metric, children }) {
  return (
    <div className="quality-card__detail quality-story">
      <div className="quality-story__demo">{children}</div>

      <div className="quality-story__row">
        <h4>{story.resultLabel}</h4>
        <p>{story.result}</p>
      </div>

      <details className="quality-story__more">
        <summary>
          <span>{story.moreLabel}</span>
        </summary>

        <div className="quality-story__row">
          <h4>{story.situationLabel}</h4>
          <p>{story.situation}</p>
        </div>

        <div className="quality-story__row">
          <h4>{story.whyLabel}</h4>
          <ul className="quality-story__why">
            {story.why.map((item) => (
              <li key={item.term}>
                <strong>{item.term}:</strong> {item.text}
              </li>
            ))}
          </ul>
        </div>

        <div className="quality-story__row">
          <h4>{story.solutionLabel}</h4>
          <div>
            <p>{story.solutionLead}</p>
            <ol className="quality-story__steps">
              {story.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
        </div>

        <div className="quality-story__row">
          <h4>{story.deeperLabel}</h4>
          <div>
            <p>
              <GlossaryText glossary={story.glossary} text={story.deeper} />
            </p>
            {metric && <p className="quality-card__metric">{metric}</p>}
          </div>
        </div>
      </details>
    </div>
  );
}
