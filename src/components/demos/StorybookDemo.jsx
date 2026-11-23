// Case study 04 (KI section): Storybook sketch — the workbench (one module,
// switched by portal, mode and viewport) and a test run across all views.

import { useEffect, useState } from "react";
import { countdownDomains } from "./portalData.js";
import { PORTALS, SB_VIEWS, THEMES, VIEWPORTS, isFailingView } from "./storybookData.js";
import { ZoomIcon } from "../icons.jsx";
import { useReducedMotion } from "../../utils.js";

const STEP_MS = 320;

// Compact segmented control of the sketch toolbar
function Segment({ label, options, value, onChange }) {
  return (
    <div className="sb-seg" role="group" aria-label={label}>
      {options.map(([key, optionLabel]) => (
        <button
          aria-pressed={value === key}
          key={key}
          onClick={() => onChange(key)}
          type="button"
        >
          {optionLabel}
        </button>
      ))}
    </div>
  );
}

// Countdown module as drawn in the canvas: image, tag, title, four tiles
function SbCountdown({ text, portal, theme }) {
  const brand = countdownDomains[portal];
  const tile = theme === "dark" ? brand.cc25Dark : brand.cc25;
  return (
    <div className="sb-cd" style={{ "--sb-tile": tile, "--sb-brand": brand.cc25 }}>
      <span className="sb-cd__image" />
      <div className="sb-cd__body">
        <span className="sb-cd__tag">{text.countdownTag}</span>
        <strong className="sb-cd__name">{text.countdownTitle}</strong>
        <span className="sb-cd__tiles">
          {["12", "08", "45", "30"].map((value, index) => (
            <span key={text.units[index]}>
              <b>{value}</b>
              <i>{text.units[index]}</i>
            </span>
          ))}
        </span>
      </div>
    </div>
  );
}

export function StorybookDemo({ text, onPreview }) {
  const [portal, setPortal] = useState("northstar");
  const [theme, setTheme] = useState("light");
  const [viewport, setViewport] = useState("desktop");

  // Test run: idle → running → found → (fix) running → passed
  const [phase, setPhase] = useState("idle");
  const [fixed, setFixed] = useState(false);
  const [step, setStep] = useState(0);
  const reducedMotion = useReducedMotion();

  // Steps through the views while running (reduced motion skips straight to
  // the end in onRun, so the phase is never "running" there)
  useEffect(() => {
    if (phase !== "running") return undefined;
    let current = 0;
    const timerId = window.setInterval(() => {
      current += 1;
      setStep(current);
      if (current >= SB_VIEWS.length) {
        window.clearInterval(timerId);
        setPhase(fixed ? "passed" : "found");
      }
    }, STEP_MS);
    return () => window.clearInterval(timerId);
  }, [phase, fixed]);

  const statusOf = (view, index) => {
    if (phase === "idle") return "idle";
    if (phase === "running" && index === step) return "running";
    if (phase === "running" && index > step) return "idle";
    return isFailingView(view) && !fixed ? "fail" : "ok";
  };

  const runLabel =
    phase === "running"
      ? text.running
      : phase === "found"
        ? text.fix
        : phase === "passed"
          ? text.again
          : text.run;

  const onRun = () => {
    if (phase === "running") return;
    // The second run (after "Fix übernehmen") tests the fixed button
    const nextFixed = fixed || phase === "found";
    setFixed(nextFixed);
    if (reducedMotion) {
      setStep(SB_VIEWS.length);
      setPhase(nextFixed ? "passed" : "found");
      return;
    }
    setStep(0);
    setPhase("running");
  };

  const summary =
    phase === "found" ? text.found : phase === "passed" ? text.passed : text.idle;

  return (
    <div className="quality-layout-demo">
      <div className="cls-demo__panels" role="group" aria-label={text.label}>
        <figure className="cls-demo sb-demo">
          <h4 className="cls-demo__title">{text.benchTitle}</h4>
          <div className="sb-window">
            <div className="sb-window__chrome" aria-hidden="true">
              <i />
              <i />
              <i />
              <b>Storybook</b>
            </div>
            <div className="sb-window__body">
              {/* Story tree: the active story is the countdown */}
              <ul className="sb-tree" aria-hidden="true">
                {text.tree.map(([group, items]) => (
                  <li key={group}>
                    <span className="sb-tree__group">{group}</span>
                    <ul>
                      {items.map((item, index) => (
                        <li
                          data-active={group === text.tree[0][0] && index === 0}
                          key={item}
                        >
                          <i />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>

              <div className="sb-main">
                <div className="sb-toolbar">
                  <Segment
                    label={text.portal}
                    onChange={setPortal}
                    options={PORTALS.map((key) => [key, countdownDomains[key].name])}
                    value={portal}
                  />
                  <Segment
                    label={text.mode}
                    onChange={setTheme}
                    options={[
                      ["light", text.light],
                      ["dark", text.dark],
                    ]}
                    value={theme}
                  />
                  <Segment
                    label={text.viewport}
                    onChange={setViewport}
                    options={[
                      ["desktop", text.desktop],
                      ["mobile", text.mobile],
                    ]}
                    value={viewport}
                  />
                </div>

                <div className="sb-canvas" data-theme={theme} data-viewport={viewport}>
                  <SbCountdown portal={portal} text={text} theme={theme} />
                </div>

                <ul className="sb-panel-tabs" aria-hidden="true">
                  {text.panelTabs.map((tab) => (
                    <li key={tab}>
                      <i />
                      {tab}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <figcaption>{text.benchCaption}</figcaption>
        </figure>

        <figure className="cls-demo sb-demo">
          <h4 className="cls-demo__title">{text.matrixTitle}</h4>
          <div className="sb-matrix">
            <div className="sb-matrix__head" aria-hidden="true">
              <span />
              <span>{text.light}</span>
              <span>{text.dark}</span>
            </div>
            {PORTALS.map((key) => (
              <div className="sb-matrix__row" key={key}>
                <span className="sb-matrix__portal">{countdownDomains[key].name}</span>
                {THEMES.map((rowTheme) => (
                  <div className="sb-matrix__pair" key={rowTheme}>
                    {VIEWPORTS.map((rowViewport) => {
                      const index = SB_VIEWS.findIndex(
                        (view) =>
                          view.portal === key &&
                          view.theme === rowTheme &&
                          view.viewport === rowViewport,
                      );
                      const status = statusOf(SB_VIEWS[index], index);
                      const viewLabel = `${countdownDomains[key].name} · ${
                        rowTheme === "light" ? text.light : text.dark
                      } · ${rowViewport === "desktop" ? text.desktop : text.mobile}`;
                      return (
                        <span
                          className="sb-view"
                          data-status={status}
                          data-viewport={rowViewport}
                          key={rowViewport}
                          title={`${viewLabel}: ${text.viewStatus[status]}`}
                        >
                          <span className="sb-view__device" aria-hidden="true" />
                          <span className="sb-view__label">
                            {rowViewport === "desktop" ? text.desktop : text.mobile}
                          </span>
                          <span className="sb-view__dot" aria-hidden="true" />
                        </span>
                      );
                    })}
                  </div>
                ))}
              </div>
            ))}

            <div className="sb-matrix__foot">
              <div
                className="sb-matrix__bar"
                style={{ "--sb-progress": phase === "idle" ? 0 : step / SB_VIEWS.length }}
                aria-hidden="true"
              />
              <p className="sb-matrix__summary" data-phase={phase} aria-live="polite">
                {summary}
              </p>
              <button
                className="cls-demo__replay"
                disabled={phase === "running"}
                onClick={onRun}
                type="button"
              >
                {runLabel}
              </button>
            </div>
          </div>
          <figcaption>{text.matrixCaption}</figcaption>
        </figure>
      </div>

      <div className="ds-demo__cta">
        <button className="ds-demo__preview" onClick={onPreview} type="button">
          {text.previewButton}
          <ZoomIcon />
        </button>
        <span>{text.previewHint}</span>
      </div>
    </div>
  );
}
