// Live preview dialog for case study 01: portal modules with switchable tokens.

import { useState } from "react";
import { CountdownModule, PollModule } from "./PortalModules.jsx";
import { PortalThemeSwitchers, PreviewDialog } from "./PreviewDialog.jsx";
import { countdownDomains } from "./portalData.js";

export function ModulePreview({ open, onClose, text, timerText, language }) {
  const [domain, setDomain] = useState("northstar");
  const [theme, setTheme] = useState("light");
  const portal = countdownDomains[domain];
  const preview = text.preview;

  const isLight = theme === "light";
  // What drives the modules right now: [token, value, where it is used]
  const tokens = [
    ["--PrCl1", portal.cc25, preview.uses.brand],
    [
      isLight ? "--modTtl → --gr80" : "--modTtl → --gr5",
      isLight ? "#333333" : "#f2f2f2",
      preview.uses.title,
    ],
    ["--Cc25", isLight ? portal.cc25 : "#020202", preview.uses.tile],
  ];

  return (
    <PreviewDialog
      closeLabel={preview.close}
      lead={preview.lead}
      onClose={onClose}
      open={open}
      title={preview.title}
      toolbar={
        <PortalThemeSwitchers
          domain={domain}
          onDomain={setDomain}
          onTheme={setTheme}
          text={text}
          theme={theme}
        />
      }
    >
      <div className="module-preview__stage" data-theme={theme}>
        <div className="module-preview__countdown">
          <CountdownModule
            domain={domain}
            language={language}
            text={text}
            theme={theme}
            timerText={timerText}
          />
        </div>
        <div className="module-preview__poll">
          <PollModule text={text} domain={domain} theme={theme} />
        </div>
        <aside className="module-preview__tokens" aria-label={preview.tokens}>
          <h3>{preview.tokens}</h3>
          <dl>
            {tokens.map(([token, value, use]) => (
              <div key={use}>
                <i style={{ background: value }} aria-hidden="true" />
                <dt>
                  <code>{token}</code>
                  <span>{use}</span>
                </dt>
                <dd>
                  <code>{value}</code>
                </dd>
              </div>
            ))}
          </dl>
          <p>{preview.tokensNote}</p>
        </aside>
      </div>
    </PreviewDialog>
  );
}
