// Recreated portal modules for the live preview: poll and release countdown.

import { useEffect, useId, useState } from "react";
import { countdownDomains } from "./portalData.js";

// Fictional release, always the same distance ahead (12 days, 6 h after the
// page loads), so the demo never runs out like a fixed date would
const DEMO_RELEASE_OFFSET = ((12 * 24 + 6) * 60 + 0) * 60 * 1000;

function CountdownTimer({ text }) {
  const [now, setNow] = useState(null);
  const [releaseTimestamp] = useState(() => Date.now() + DEMO_RELEASE_OFFSET);
  const secondsRemaining =
    now === null
      ? null
      : Math.max(0, Math.floor((releaseTimestamp - now) / 1000));
  const countdown =
    secondsRemaining === null
      ? null
      : {
          days: Math.floor(secondsRemaining / 86400),
          hours: Math.floor((secondsRemaining % 86400) / 3600),
          minutes: Math.floor((secondsRemaining % 3600) / 60),
          seconds: secondsRemaining % 60,
        };

  useEffect(() => {
    let timerId;
    const startId = window.setTimeout(() => {
      setNow(Date.now());
      timerId = window.setInterval(() => setNow(Date.now()), 1000);
    }, 0);
    return () => {
      window.clearTimeout(startId);
      window.clearInterval(timerId);
    };
  }, []);

  return (
    <>
      <div
        aria-label={
          countdown
            ? text.until(
                countdown.days,
                countdown.hours,
                countdown.minutes,
                countdown.seconds,
              )
            : text.loading
        }
        className="countdownTimer"
        role="timer"
      >
        <div className="countdownUnit">
          <span className="countdownValue fw700">
            {countdown?.days ?? "--"}
          </span>
          <span className="countdownLabel txtUp txtMuted">{text.days}</span>
        </div>
        <div className="countdownUnit">
          <span className="countdownValue fw700">
            {countdown ? String(countdown.hours).padStart(2, "0") : "--"}
          </span>
          <span className="countdownLabel txtUp txtMuted">{text.hours}</span>
        </div>
        <div className="countdownUnit">
          <span className="countdownValue fw700">
            {countdown ? String(countdown.minutes).padStart(2, "0") : "--"}
          </span>
          <span className="countdownLabel txtUp txtMuted">{text.minutes}</span>
        </div>
        <div className="countdownUnit">
          <span className="countdownValue fw700">
            {countdown ? String(countdown.seconds).padStart(2, "0") : "--"}
          </span>
          <span className="countdownLabel txtUp txtMuted">{text.seconds}</span>
        </div>
      </div>

      {secondsRemaining === 0 && (
        <div className="countdownExpired">
          <span className="countdownStatus fw700 txtCc1">{text.expired}</span>
        </div>
      )}
    </>
  );
}

// Poll marks (? and !) — thin outlines; the tinted offset fills are hidden
// (no shadows on the page, see _poll.scss). The glyph
// sits inside a circle drawn the same way. The ? is a stroked curve, so its
// outline is cut out with a mask (wide stroke minus narrow stroke).
function PollMark({ type, className }) {
  const maskId = useId();
  const curve = "M8.4 8.3a3.7 3.7 0 1 1 6 2.9c-1.3 1-2.4 1.8-2.4 3.5v.5";
  const bar =
    "M9.4 2.4h5.2c.8 0 1.3.6 1.2 1.4l-1.7 10.4c-.1.6-.5.9-1.1.9h-2c-.6 0-1-.3-1.1-.9L8.2 3.8c-.1-.8.4-1.4 1.2-1.4Z";

  if (type === "comment") {
    const bubble =
      "M5 3.8h14a2.5 2.5 0 0 1 2.5 2.5v9.2a2.5 2.5 0 0 1-2.5 2.5h-8.3l-5.2 3.6v-3.6H5a2.5 2.5 0 0 1-2.5-2.5V6.3A2.5 2.5 0 0 1 5 3.8Z";
    return (
      <span className={className} aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none">
          <path className="poll-mark__fill" d={bubble} transform="translate(1.1 1)" />
          <path className="poll-mark__outline poll-mark__disc" d={bubble} />
          <g className="poll-mark__dots">
            <circle cx="8" cy="10.9" r="1.15" />
            <circle cx="12" cy="10.9" r="1.15" />
            <circle cx="16" cy="10.9" r="1.15" />
          </g>
        </svg>
      </span>
    );
  }

  return (
    <span className={className} aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none">
        {/* Circle */}
        <circle className="poll-mark__fill" cx="12.9" cy="12.8" r="10.4" />
        <circle className="poll-mark__outline poll-mark__disc" cx="12" cy="12" r="10.4" />

        {/* Glyph, scaled into the circle */}
        <g
          className="poll-mark__glyph"
          transform="translate(12 12.2) scale(.56) translate(-12 -12.6)"
        >
          {type === "question" ? (
            <>
              <defs>
                <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                  <path d={curve} stroke="#fff" strokeWidth="4.6" strokeLinecap="round" />
                  <path d={curve} stroke="#000" strokeWidth="2.2" strokeLinecap="round" />
                </mask>
              </defs>
              <g className="poll-mark__fill" transform="translate(1.4 1.2)">
                <path d={curve} strokeWidth="4.6" strokeLinecap="round" />
                <circle cx="12" cy="19.6" r="2.2" />
              </g>
              <rect className="poll-mark__outline-fill" width="24" height="24" mask={`url(#${maskId})`} />
              <circle className="poll-mark__outline" cx="12" cy="19.6" r="2.2" />
            </>
          ) : (
            <>
              <g className="poll-mark__fill" transform="translate(1.4 1.2)">
                <path d={bar} />
                <circle cx="12" cy="19.6" r="2.2" />
              </g>
              <path className="poll-mark__outline" d={bar} />
              <circle className="poll-mark__outline" cx="12" cy="19.6" r="2.2" />
            </>
          )}
        </g>
      </svg>
    </span>
  );
}

export function PollModule({ text, domain, theme }) {
  const participants = 25;

  return (
    <div className="pollModuleShell" data-domain={domain} data-theme={theme}>
      <div className="pollModule">
        <header className="pollModule__header">
          <h3>{text.pollTitle}</h3>
        </header>

        <div className="pollModule__question">
          <PollMark type="question" className="pollModule__question-mark" />
          <h4>{text.pollQuestion}</h4>
        </div>

        <ul className="pollModule__options" aria-label={text.pollLabel}>
          {text.pollOptions.slice(0, 5).map((label, index) => {
            const votes = [9, 12, 2, 5, 3, 7, 6][index];
            const percentage = Math.round((votes / participants) * 100);

            return (
              <li className="pollModule__option" key={label}>
                <span className="pollModule__option-label">{label}</span>
                <span className="pollModule__percentage">{percentage}%</span>
                <span className="pollModule__track" aria-hidden="true">
                  <span
                    className="pollModule__bar"
                    style={{ width: `${percentage}%` }}
                  />
                </span>
              </li>
            );
          })}
        </ul>

        <footer className="pollModule__footer">
          <p className="pollModule__meta">
            <PollMark type="exclamation" className="pollModule__info-mark" />
            <span>
              <strong>
                {participants} {text.participants}
              </strong>
              <span className="pollModule__meta-divider" aria-hidden="true">
                /
              </span>
              <time dateTime="2023-06-01T13:45">{text.pollStart}</time>
              <span>{text.until}</span>
              <time dateTime="2023-08-02T13:45">{text.pollEnd}</time>
              <span className="pollModule__meta-divider" aria-hidden="true">
                /
              </span>
              <span>{text.multiple}</span>
            </span>
          </p>
          <div className="pollModule__actions">
            <button className="pollModule__login" type="button">
              {text.vote}
            </button>
            <a
              aria-label={text.commentLabel}
              className="pollModule__comment"
              href="mailto:popadaniel.office@gmail.com?subject=Kommentar%20zur%20Umfrage"
            >
              <span>{text.comment}</span>
              <span aria-hidden="true">·</span>
              <PollMark type="comment" className="pollModule__comment-mark" />
              <span>87</span>
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}

export function CountdownModule({ text, timerText, language, domain, theme }) {
  return (
    <section
      aria-label={`${countdownDomains[domain].name}: ${text.countdownLabel}`}
      className="CountdownModule posRel"
      data-domain={domain}
      data-theme={theme}
    >
      <div className="countdownContent flx flxDirCol flxJustBtw p-5">
        <div className="countdownHead">
          <h3 className="countdownTitle txtCc1">
            <span className="countdownTitleGame">Shadowstone:</span>
            <span className="countdownReleaseTitle">
              {language === "de" ? "Der Release-Countdown" : "Release countdown"}
            </span>
          </h3>
        </div>
        <div className="countdownBottom">
          <CountdownTimer text={timerText} />
          {/* Mock-up of the portal button: shown, not clickable (there is no
              Shadowstone page to go to, and a link would only change the URL) */}
          <span className="countdownButton countdownButton--static btn txtUp fw700">
            {text.countdownButton}
            <span className="countdownArrow" aria-hidden="true">
              →
            </span>
          </span>
        </div>
      </div>
      <div className="countdownStage posRel ovHidd">
        {/* AVIF (47 KB) with WebP fallback (55 KB); was a 931 KB PNG */}
        <picture>
          <source
            srcSet={`${import.meta.env.BASE_URL}images/shadowstone-countdown.avif`}
            type="image/avif"
          />
          <img
            alt=""
            className="countdownImage posAbs top0 left0 w100 h100"
            decoding="async"
            height="562"
            loading="lazy"
            src={`${import.meta.env.BASE_URL}images/shadowstone-countdown.webp`}
            width="999"
          />
        </picture>
      </div>
      <time className="countdownBadge flx flxDirCol fw700" dateTime="2026-11-19">
        <span className="countdownBadgeLabel txtUp">{text.release}</span>
        <span className="countdownBadgeDate">{text.releaseDate}</span>
        <span className="countdownBadgeYear">2026</span>
      </time>
    </section>
  );
}
