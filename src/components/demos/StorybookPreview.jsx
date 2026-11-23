// Live demo dialog for case study 04: three tools from the real Storybook,
// simplified — UI editor (contrast check), test run (red/yellow per view,
// visual diff) and the deploy gate.

import { useEffect, useState } from "react";
import { PreviewDialog, PreviewSwitcher } from "./PreviewDialog.jsx";
import { countdownDomains } from "./portalData.js";
import { isFailingView } from "./storybookData.js";
import { useReducedMotion } from "../../utils.js";

// ---------------------------------------------------------------------------
// WCAG 2.2 contrast — the same formula the UI editor runs on the live CSS
// ---------------------------------------------------------------------------

const hexToRgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));

const channel = (value) => {
  const c = value / 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
};

const luminance = ([r, g, b]) => 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);

// Text colour with opacity, composited over the surface
const blend = (fg, bg, alpha) => fg.map((c, i) => Math.round(c * alpha + bg[i] * (1 - alpha)));

function contrastRatio(fgHex, bgHex, alpha = 1) {
  const bg = hexToRgb(bgHex);
  const fg = blend(hexToRgb(fgHex), bg, alpha);
  const [hi, lo] = [luminance(fg), luminance(bg)].sort((a, b) => b - a);
  return (hi + 0.05) / (lo + 0.05);
}

const SURFACES = {
  page: { bg: "#ffffff", link: "#285b78", linkHover: "#1b3f54" },
  dark: { bg: "#121212", link: "#a9ccdc", linkHover: "#d4e6ee" },
  brand: { bg: "#285b78", link: "#ffffff", linkHover: "#cfe1ea" },
};

const TEXT_TOKENS = [
  ["--gr80", "#333333"],
  ["--gr50", "#808080"],
  ["--gr5", "#f2f2f2"],
  ["--PrCl1", "#285b78"],
  ["--brand-soft", "#a9ccdc"],
];

const LEVELS = [4.5, 3, 7];

// 4.53 : 1 (English) / 4,53 : 1 (German)
function Ratio({ value, language }) {
  const number = value.toFixed(2);
  return <strong className="sbp-ratio">{language === "en" ? number : number.replace(".", ",")} : 1</strong>;
}

function EditorStory({ text, language }) {
  const [surface, setSurface] = useState("page");
  const [token, setToken] = useState("--gr80");
  const [alpha, setAlpha] = useState(1);
  const { bg, link, linkHover } = SURFACES[surface];
  const fg = TEXT_TOKENS.find(([name]) => name === token)[1];
  const ratio = contrastRatio(fg, bg, alpha);
  const linkRatio = contrastRatio(link, bg);
  const hoverRatio = contrastRatio(linkHover, bg);

  return (
    <div className="sbp-story">
      <p className="sbp-intro">{text.intro}</p>

      <div className="module-preview__toolbar">
        <PreviewSwitcher
          legend={text.surface}
          onChange={setSurface}
          options={Object.entries(text.surfaces)}
          value={surface}
        />
        <PreviewSwitcher
          legend={text.opacity}
          onChange={(value) => setAlpha(Number(value))}
          options={[
            ["1", "100 %"],
            ["0.6", "60 %"],
          ]}
          value={String(alpha)}
        />
      </div>

      <fieldset className="sbp-tokens">
        <legend>{text.text}</legend>
        <div>
          {TEXT_TOKENS.map(([name, hex]) => (
            <button
              aria-pressed={token === name}
              key={name}
              onClick={() => setToken(name)}
              type="button"
            >
              <i style={{ background: hex }} />
              {name}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="sbp-editor">
        <div className="sbp-editor__preview" style={{ background: bg }}>
          <p style={{ color: fg, opacity: alpha }}>{text.sample}</p>
          <p>
            <a href="#" onClick={(event) => event.preventDefault()} style={{ color: link }}>
              {text.link}
            </a>
          </p>
        </div>

        <dl className="sbp-editor__results">
          <div>
            <dt>
              {text.ratio} · {token}
              {alpha < 1 ? " · 60 %" : ""}
            </dt>
            <dd>
              <Ratio language={language} value={ratio} />
              <span className="sbp-levels">
                {LEVELS.map((min, index) => (
                  <span data-ok={ratio >= min} key={min}>
                    {text.levels[index]}
                  </span>
                ))}
              </span>
            </dd>
          </div>
          <div>
            <dt>{text.link}</dt>
            <dd>
              <Ratio language={language} value={linkRatio} />
              <span className="sbp-levels">
                <span data-ok={linkRatio >= 4.5}>{text.levels[0]}</span>
              </span>
            </dd>
          </div>
          <div>
            <dt>
              {text.link} · {text.hover}
            </dt>
            <dd>
              <Ratio language={language} value={hoverRatio} />
              <span className="sbp-levels">
                <span data-ok={hoverRatio >= 4.5}>{text.levels[0]}</span>
              </span>
            </dd>
          </div>
        </dl>
      </div>

      <div className="sbp-checks">
        <h3>{text.checksTitle}</h3>
        <dl>
          {text.checks.map(([term, detail]) => (
            <div key={term}>
              <dt>{term}</dt>
              <dd>{detail}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

// Mini module for the visual diff: a card whose button is 2px off in the
// current screenshot; the diff view marks it in orange
function DiffSketch({ mode }) {
  return (
    <div className="sbp-diff" data-mode={mode} aria-hidden="true">
      <span className="sbp-diff__image" />
      <span className="sbp-diff__line" />
      <span className="sbp-diff__line sbp-diff__line--short" />
      <span className="sbp-diff__button" />
    </div>
  );
}

function TestsStory({ text, demoText }) {
  const [portal, setPortal] = useState("northstar");
  const [theme, setTheme] = useState("light");
  const [viewport, setViewport] = useState("desktop");
  const [visualMode, setVisualMode] = useState("diff");
  const currentFails = isFailingView({ portal, theme, viewport });

  const rows = text.stories.map((name, index) => {
    if (index < 2) return { name, status: "green", note: text.statusOk };
    return currentFails
      ? { name, status: "red", note: text.statusRed }
      : { name, status: "yellow", note: text.statusYellow };
  });

  return (
    <div className="sbp-story">
      <p className="sbp-intro">{text.intro}</p>

      <div className="module-preview__toolbar">
        <PreviewSwitcher
          legend={demoText.portal}
          onChange={setPortal}
          options={Object.entries(countdownDomains).map(([key, item]) => [key, item.name])}
          value={portal}
        />
        <PreviewSwitcher
          legend={demoText.mode}
          onChange={setTheme}
          options={[
            ["light", demoText.light],
            ["dark", demoText.dark],
          ]}
          value={theme}
        />
        <PreviewSwitcher
          legend={demoText.viewport}
          onChange={setViewport}
          options={[
            ["desktop", demoText.desktop],
            ["mobile", demoText.mobile],
          ]}
          value={viewport}
        />
      </div>

      <ul className="sbp-results" aria-live="polite">
        {rows.map((row) => (
          <li data-status={row.status} key={row.name}>
            <span className="sbp-status" aria-hidden="true" />
            <strong>{row.name}</strong>
            <span>{row.note}</span>
          </li>
        ))}
      </ul>

      <ul className="sbp-legend">
        {text.legend.map(([status, label]) => (
          <li data-status={status} key={status}>
            <span className="sbp-status" aria-hidden="true" />
            {label}
          </li>
        ))}
      </ul>

      <div className="sbp-visual">
        <div className="sbp-visual__head">
          <h3>{text.visualTitle}</h3>
          <PreviewSwitcher
            legend={text.visualTitle}
            onChange={setVisualMode}
            options={Object.entries(text.visualModes)}
            value={visualMode}
          />
        </div>
        {/* Sketch + what the selected view means (works like a tooltip
            per switch option, but also on touch and for screen readers) */}
        <div className="sbp-visual__stage">
          <DiffSketch mode={visualMode} />
          <p className="sbp-visual__explain" data-mode={visualMode} aria-live="polite">
            <strong>{text.visualModes[visualMode]}</strong>
            {text.visualExplain[visualMode]}
          </p>
        </div>

        <div className="sbp-visual__flow">
          <h4>{text.visualFlowTitle}</h4>
          <ol>
            {text.visualFlow.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

const GATE_STEP_MS = 650;
const VISUAL_STEP = 2;

function GateStory({ text }) {
  const [simulate, setSimulate] = useState(false);
  // The run in progress: how far it goes and how it ends (fixed at start)
  const [run, setRun] = useState(null);
  const [step, setStep] = useState(-1);
  const [outcome, setOutcome] = useState(null);
  const reducedMotion = useReducedMotion();
  const steps = text.steps;

  const start = () => {
    const next = {
      id: (run?.id ?? 0) + 1,
      stopAt: simulate ? VISUAL_STEP : steps.length,
      result: simulate ? "blocked" : "done",
    };
    // Reduced motion: show the end state right away instead of animating
    setStep(reducedMotion ? next.stopAt : 0);
    setOutcome(reducedMotion ? next.result : null);
    setRun(next);
  };

  useEffect(() => {
    if (!run || reducedMotion) return undefined;
    let current = 0;
    const timerId = window.setInterval(() => {
      current += 1;
      setStep(current);
      if (current >= run.stopAt) {
        window.clearInterval(timerId);
        setOutcome(run.result);
      }
    }, GATE_STEP_MS);
    return () => window.clearInterval(timerId);
  }, [run, reducedMotion]);

  const running = run !== null && outcome === null;

  const statusOf = (index) => {
    if (run === null) return "idle";
    if (outcome === "blocked" && index === VISUAL_STEP) return "fail";
    if (outcome === "blocked" && index > VISUAL_STEP) return "skipped";
    if (index < step) return "ok";
    if (index === step && running) return "running";
    return "idle";
  };

  return (
    <div className="sbp-story">
      <p className="sbp-intro">{text.intro}</p>

      <div className="sbp-gate__controls">
        <button
          className="cls-demo__replay"
          disabled={running}
          onClick={start}
          type="button"
        >
          {text.start}
        </button>
        <label className="sbp-gate__toggle">
          <input
            checked={simulate}
            disabled={running}
            onChange={(event) => setSimulate(event.target.checked)}
            type="checkbox"
          />
          <span>{text.simulate}</span>
        </label>
      </div>

      <ol className="sbp-gate">
        {steps.map(([name, detail], index) => (
          <li data-status={statusOf(index)} key={name}>
            <span className="sbp-gate__num" aria-hidden="true">
              {index + 1}
            </span>
            <strong>{name}</strong>
            <span>{detail}</span>
          </li>
        ))}
      </ol>

      <p className="sbp-gate__outcome" data-outcome={outcome ?? "none"} aria-live="polite">
        {outcome === "done" ? text.done : outcome === "blocked" ? text.blocked : ""}
      </p>
    </div>
  );
}

const STORY_KEYS = ["editor", "tests", "gate"];
// Who built what (honest split): UI editor = mine, tests + gate = colleague
const OWNER = { editor: "mine", tests: "team", gate: "team" };

export function StorybookPreview({ open, onClose, text, demoText, language }) {
  const [story, setStory] = useState("editor");

  return (
    <PreviewDialog
      closeLabel={text.close}
      lead={text.lead}
      onClose={onClose}
      open={open}
      title={text.title}
    >
      <div className="sbp">
        <nav className="sbp-nav" aria-label={text.navLabel}>
          <ul>
            {STORY_KEYS.map((key) => (
              <li key={key}>
                <button
                  aria-current={story === key ? "true" : undefined}
                  onClick={() => setStory(key)}
                  type="button"
                >
                  <span>{text.stories[key]}</span>
                  <small data-owner={OWNER[key]}>
                    {OWNER[key] === "mine" ? text.mine : text.team}
                  </small>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sbp-body">
          {story === "editor" && <EditorStory language={language} text={text.editor} />}
          {story === "tests" && <TestsStory demoText={demoText} text={text.tests} />}
          {story === "gate" && <GateStory text={text.gate} />}
        </div>
      </div>
    </PreviewDialog>
  );
}
