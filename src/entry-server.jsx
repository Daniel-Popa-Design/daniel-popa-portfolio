// Build-time rendering (scripts/prerender.mjs): the page as static HTML, so
// crawlers and link previews see the content without running JavaScript.
import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App from "./App.jsx";

export { copy } from "./content/index.js";

export function render(language) {
  return renderToString(
    <StrictMode>
      <App initialLanguage={language} />
    </StrictMode>,
  );
}
