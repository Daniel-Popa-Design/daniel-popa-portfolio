// Case-study story rows (situation, why, solution, result) and the wireframe browser frame.

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

// Practice case study: Situation, Why, What I did, demo, Result, details
export function QualityStory({ story, metric, children }) {
  return (
    <div className="quality-card__detail quality-story">
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

      <div className="quality-story__demo">{children}</div>

      <div className="quality-story__row">
        <h4>{story.resultLabel}</h4>
        <div>
          <p>{story.result}</p>
          {metric && <p className="quality-card__metric">{metric}</p>}
        </div>
      </div>

      <div className="quality-story__row quality-story__row--plain">
        <details className="quality-story__deeper">
          <summary>{story.deeperLabel}</summary>
          <p>{story.deeper}</p>
        </details>
      </div>
    </div>
  );
}
