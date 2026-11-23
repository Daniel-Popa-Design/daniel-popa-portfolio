// Modal dialog shell and the portal / theme switchers of the previews.

import { useEffect, useId, useRef } from "react";
import { countdownDomains } from "./portalData.js";

export function PreviewSwitcher({ legend, options, value, onChange }) {
  return (
    <fieldset className="module-preview__switcher">
      <legend>{legend}</legend>
      <div>
        {options.map(([key, label]) => (
          <button
            aria-pressed={value === key}
            key={key}
            onClick={() => onChange(key)}
            type="button"
          >
            {label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

// Modal window with the real poll + countdown, switched by portal and mode
// Modal shell shared by the live previews: header, close, toolbar, body.
// The body only mounts while open (timers, focus, counters start fresh).
export function PreviewDialog({ open, onClose, title, lead, closeLabel, toolbar, children }) {
  const dialogRef = useRef(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      aria-labelledby={titleId}
      className="module-preview"
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose();
      }}
      onClose={onClose}
      ref={dialogRef}
    >
      {open && (
        <div className="module-preview__inner">
          <header className="module-preview__header">
            <div>
              <h2 id={titleId}>{title}</h2>
              <p>{lead}</p>
            </div>
            <button
              aria-label={closeLabel}
              className="module-preview__close"
              onClick={onClose}
              type="button"
            >
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path d="M3.5 3.5l9 9m0-9l-9 9" />
              </svg>
            </button>
          </header>
          {toolbar && <div className="module-preview__toolbar">{toolbar}</div>}
          {children}
        </div>
      )}
    </dialog>
  );
}

// Portal + mode switchers used by both previews
export function PortalThemeSwitchers({ text, domain, theme, onDomain, onTheme }) {
  return (
    <>
      <PreviewSwitcher
        legend={text.portal}
        onChange={onDomain}
        options={Object.entries(countdownDomains).map(([key, item]) => [key, item.name])}
        value={domain}
      />
      <PreviewSwitcher
        legend={text.appearance}
        onChange={onTheme}
        options={[
          ["light", text.light],
          ["dark", text.dark],
        ]}
        value={theme}
      />
    </>
  );
}
