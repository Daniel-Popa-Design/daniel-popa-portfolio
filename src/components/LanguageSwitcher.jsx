// DE / EN switch in the header.

import { Fragment } from "react";

// Language switch: "DE / EN" as plain text. The active language is ink with
// an accent underline; the other one is muted and darkens on hover.
export function LanguageSwitcher({ language, onChange, label }) {
  const options = [
    ["de", "DE", "Deutsch"],
    ["en", "EN", "English"],
  ];

  return (
    <div className="language-switch" role="group" aria-label={label}>
      {options.map(([code, short, name], index) => (
        <Fragment key={code}>
          {index > 0 && (
            <span className="language-switch__divider" aria-hidden="true">
              /
            </span>
          )}
          <button
            aria-label={`${short} – ${name}`}
            aria-pressed={language === code}
            className="language-switch__option"
            lang={code}
            onClick={() => onChange(code)}
            type="button"
          >
            {short}
          </button>
        </Fragment>
      ))}
    </div>
  );
}
