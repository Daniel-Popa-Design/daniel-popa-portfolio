// Case study 02: layout-shift (CLS) demo.

import { useEffect, useState } from "react";
import { DemoBrowser } from "./QualityStory.jsx";

export function LayoutShiftDemo({ text, language }) {
  const [replay, setReplay] = useState(0);
  const [promoLoaded, setPromoLoaded] = useState(false);

  useEffect(() => {
    const timerId = window.setTimeout(() => setPromoLoaded(true), 1400);

    return () => window.clearTimeout(timerId);
  }, [replay]);

  const status = promoLoaded
    ? `${text.before}: ${text.loadedBefore} ${text.after}: ${text.loadedAfter}`
    : `${text.before}: ${text.loadingBefore} ${text.after}: ${text.loadingAfter}`;

  // Wireframe browser page: chrome, optional ad slot, heading, text lines, button.
  // `slot` is "none" | "reserved" | "ad"; the tap marker sits where the
  // button was before the ad loaded — it hits or misses depending on the panel.
  const frame = (slot, showTap) => (
    <DemoBrowser>
      <div className="cls-demo__page">
        <div className="cls-demo__slot" data-slot={slot}>
          {slot === "ad" && <span>{text.ad}</span>}
        </div>
        <span className="cls-demo__heading" />
        <span className="cls-demo__line" />
        <span className="cls-demo__line" />
        <span className="cls-demo__line cls-demo__line--short" />
        <span className="cls-demo__button">{text.read}</span>
        {showTap && <span className="cls-demo__tap" />}
      </div>
    </DemoBrowser>
  );

  // One comparison panel: title, "first state → ad arrives", caption
  const panel = (mode) => {
    const isBefore = mode === "before";

    return (
      <figure className="cls-demo" data-mode={mode} data-loaded={promoLoaded}>
        <h4 className="cls-demo__title">{isBefore ? text.before : text.after}</h4>
        <div className="cls-demo__stage">
          <div className="cls-demo__step">
            <span className="cls-demo__label">
              {isBefore ? text.stepTextLoads : text.stepReserved}
            </span>
            {frame(isBefore ? "none" : "reserved", false)}
          </div>
          <span className="cls-demo__arrow" aria-hidden="true" />
          <div className="cls-demo__step">
            <span className="cls-demo__label">{text.stepAdArrives}</span>
            {frame(
              promoLoaded ? "ad" : isBefore ? "none" : "reserved",
              promoLoaded,
            )}
          </div>
        </div>
        <figcaption>{isBefore ? text.captionBefore : text.captionAfter}</figcaption>
      </figure>
    );
  };

  return (
    <div className="quality-layout-demo" lang={language}>
      <div className="cls-demo__panels" role="group" aria-label={text.layoutLabel}>
        {panel("before")}
        {panel("after")}
      </div>

      <button
        className="cls-demo__replay"
        onClick={() => {
          setPromoLoaded(false);
          setReplay((current) => current + 1);
        }}
        type="button"
      >
        {text.replay}
      </button>

      <p
        className="quality-layout-demo__status"
        aria-live="polite"
        role="status"
      >
        {status}
      </p>
    </div>
  );
}
