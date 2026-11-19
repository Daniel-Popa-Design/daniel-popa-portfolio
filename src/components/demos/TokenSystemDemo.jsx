// Case study 01: token-system demo (grey scale, layers, module sketches).

import { countdownDomains } from "./portalData.js";
import { ZoomIcon } from "../icons.jsx";

// Global grayscale shown in the token sketch (name = % black)
const grayScale = [
  ["--gr5", "#f2f2f2"],
  ["--gr20", "#cccccc"],
  ["--gr50", "#808080"],
  ["--gr80", "#333333"],
  ["--gr93", "#121212"],
];

const sketchVariants = [
  ["northstar", "light"],
  ["afterglow", "light"],
  ["northstar", "dark"],
  ["afterglow", "dark"],
];

// Connector between neighbouring screens: which part it links
const sketchLinks = ["tiles", "title", "button"];

// Countdown wireframe as a phone screen (mobile layout of the real module):
// image + release badge, tag, title, four digit tiles, button.
// Monochrome line style; tiles and button take the variant's token colour.
// `link` draws a connector to the same part on the next screen.
function MiniCountdown({ link }) {
  return (
    <div className="ds-cd">
      <span className="ds-cd__image">
        <span className="ds-cd__badge" />
      </span>
      <span className="ds-cd__tag" />
      <span className="ds-cd__title">
        <b />
        <b />
      </span>
      <span className="ds-cd__tiles">
        {[0, 1, 2, 3].map((tile) => (
          <span key={tile}>
            <i />
            <b />
          </span>
        ))}
      </span>
      <span className="ds-cd__button" />
      {link && <span className="ds-link" data-link={link} />}
    </div>
  );
}

// Case 01 sketch: the four token layers next to one module in four variants
export function TokenSystemDemo({ text, onPreview }) {
  const demo = text.tokenDemo;
  const north = countdownDomains.northstar;

  return (
    <div className="quality-layout-demo">
      <div className="cls-demo__panels" role="group" aria-label={demo.label}>
        <figure className="cls-demo ds-demo">
          <h5 className="cls-demo__title">{demo.layersTitle}</h5>
          <ol className="ds-layers">
            <li>
              <span className="ds-layers__name">{demo.gray}</span>
              <span className="ds-layers__chips">
                {grayScale.map(([token, value]) => (
                  <i key={token} style={{ background: value }} title={`${token} · ${value}`} />
                ))}
              </span>
              <code>--gr5 … --gr93</code>
              <p className="ds-layers__note">{demo.notes[0]}</p>
            </li>
            <li>
              <span className="ds-layers__name">{demo.brand}</span>
              <span className="ds-layers__chips">
                {Object.values(countdownDomains).map((portal) => (
                  <i
                    key={portal.name}
                    style={{ background: portal.cc25 }}
                    title={`${portal.name} · ${portal.cc25}`}
                  />
                ))}
              </span>
              <code>--PrCl1</code>
              <p className="ds-layers__note">{demo.notes[1]}</p>
            </li>
            <li>
              <span className="ds-layers__name">{demo.role}</span>
              <span className="ds-layers__pills">
                <span>
                  <i style={{ background: north.cc25 }} />
                  --lk → --PrCl1
                </span>
                <span>
                  <i style={{ background: "#333333" }} />
                  --modTtl → --gr80
                </span>
              </span>
              <p className="ds-layers__note">{demo.notes[2]}</p>
            </li>
            <li>
              <span className="ds-layers__name">{demo.palette}</span>
              <span className="ds-layers__chips">
                <i
                  className="ds-layers__split"
                  style={{ "--split-a": north.cc25, "--split-b": north.cc25Dark }}
                />
              </span>
              <code>
                --Cc25 · {text.light} / {text.dark}
              </code>
              <p className="ds-layers__note">{demo.notes[3]}</p>
            </li>
          </ol>
          <figcaption>{demo.layersCaption}</figcaption>
        </figure>

        <figure className="cls-demo ds-demo">
          <h5 className="cls-demo__title">{demo.modulesTitle}</h5>
          <div className="ds-variants" aria-hidden="true">
            {sketchVariants.map(([domain, theme], index) => (
              <div
                className="ds-mini"
                data-domain={domain}
                data-theme={theme}
                key={`${domain}-${theme}`}
              >
                <span className="ds-mini__label">
                  {countdownDomains[domain].name} · {theme === "light" ? text.light : text.dark}
                </span>
                <MiniCountdown link={sketchLinks[index]} />
              </div>
            ))}
          </div>
          <figcaption>{demo.modulesCaption}</figcaption>
        </figure>
      </div>

      <div className="ds-demo__cta">
        <button className="ds-demo__preview" onClick={onPreview} type="button">
          {demo.previewButton}
          <ZoomIcon />
        </button>
        <span>{demo.previewHint}</span>
      </div>
    </div>
  );
}
