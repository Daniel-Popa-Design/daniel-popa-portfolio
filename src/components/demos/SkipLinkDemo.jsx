// Case study 03: skip-link teaser demo on the page.

import { useEffect, useState } from "react";
import { DemoBrowser } from "./QualityStory.jsx";
import { ZoomIcon } from "../icons.jsx";
import { useReducedMotion } from "../../utils.js";

// Keyboard path to the article. Each tick is one key press:
// Before: Tab walks through 8 menu items, the 9th press reaches the article.
// After: Tab focuses the skip link, Enter jumps straight to the article.
const SKIP_DEMO_STEPS = 9;

export function SkipLinkDemo({ text, onPreview }) {
  const [replay, setReplay] = useState(0);
  const [playedStep, setStep] = useState(0);
  // With reduced motion the demo shows its final state instead of autoplaying;
  // "Erneut abspielen" (replay > 0) still plays it step by step on request
  const reducedMotion = useReducedMotion();
  const step = reducedMotion && replay === 0 ? SKIP_DEMO_STEPS : playedStep;

  useEffect(() => {
    if (reducedMotion && replay === 0) return undefined;

    let current = 0;
    const timerId = window.setInterval(() => {
      current += 1;
      setStep(current);
      if (current >= SKIP_DEMO_STEPS) window.clearInterval(timerId);
    }, 450);

    return () => window.clearInterval(timerId);
  }, [replay, reducedMotion]);

  const articleBody = (
    <>
      <span className="skip-demo__heading" />
      <span className="cls-demo__line" />
      <span className="cls-demo__line" />
      <span className="cls-demo__line cls-demo__line--short" />
    </>
  );

  return (
    <div className="quality-layout-demo">
      <div className="cls-demo__panels" role="group" aria-label={text.skipLabel}>
        <figure className="cls-demo skip-demo">
          <h5 className="cls-demo__title">{text.before}</h5>
          <DemoBrowser>
            <div className="skip-demo__page">
              {/* Same labelled menu as the live demo; focus walks through it */}
              <ul className="skip-demo__menu">
                {text.keyboard.nav.map((item, index) => (
                  <li key={item} data-focused={step === index + 1}>
                    {item}
                  </li>
                ))}
              </ul>
              <div
                className="skip-demo__article"
                data-focused={step >= SKIP_DEMO_STEPS}
              >
                {step >= SKIP_DEMO_STEPS && (
                  <span className="skip-demo__count">{SKIP_DEMO_STEPS}</span>
                )}
                {articleBody}
              </div>
            </div>
          </DemoBrowser>
          <figcaption>{text.skipCaptionBefore}</figcaption>
        </figure>

        <figure className="cls-demo skip-demo">
          <h5 className="cls-demo__title">{text.after}</h5>
          <DemoBrowser>
            <div className="skip-demo__page">
              <span className="skip-demo__skip" data-focused={step === 1}>
                {text.skipLink}
              </span>
              {step >= 2 && <span className="skip-demo__jump" />}
              {/* The same menu, larger targets; fades once it has been skipped */}
              <ul
                className="skip-demo__menu skip-demo__menu--after"
                data-skipped={step >= 2}
              >
                {text.keyboard.nav.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="skip-demo__article" data-focused={step >= 2}>
                {articleBody}
              </div>
            </div>
          </DemoBrowser>
          <figcaption>{text.skipCaptionAfter}</figcaption>
        </figure>
      </div>

      <div className="ds-demo__cta">
        <button
          className="cls-demo__replay"
          onClick={() => {
            setStep(0);
            setReplay((current) => current + 1);
          }}
          type="button"
        >
          {text.replay}
        </button>
        <button className="ds-demo__preview" onClick={onPreview} type="button">
          {text.keyboard.button}
          <ZoomIcon />
        </button>
        <span>{text.keyboard.hint}</span>
      </div>
    </div>
  );
}
