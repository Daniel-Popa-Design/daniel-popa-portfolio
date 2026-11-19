// Prerender: fills dist/index.html (German) and dist/en/index.html (English)
// with the rendered page and language-specific head tags.
// Runs after `vite build` and `vite build --ssr` (see package.json "build").

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const ssrDir = path.join(root, "dist-ssr");
const SITE_URL = "https://daniel-popa-design.github.io/daniel-popa-portfolio/";

const { render, copy } = await import(pathToFileURL(path.join(ssrDir, "entry-server.js")).href);
const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");

const escapeAttr = (value) => value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");
const setById = (html, id, attribute, value) => {
  const tag = new RegExp(`(<[^>]*\\bid="${id}"[^>]*\\b${attribute}=")[^"]*(")`, "s");
  if (!tag.test(html)) throw new Error(`prerender: #${id} [${attribute}] not found in index.html`);
  return html.replace(tag, `$1${escapeAttr(value)}$2`);
};

for (const language of ["de", "en"]) {
  const text = copy[language];
  const url = language === "en" ? `${SITE_URL}en/` : SITE_URL;
  let html = template
    .replace('<html lang="de">', `<html lang="${language}">`)
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeAttr(text.documentTitle)}</title>`)
    .replace('<div id="root"></div>', `<div id="root">${render(language)}</div>`);
  html = setById(html, "meta-description", "content", text.metaDescription);
  html = setById(html, "og-title", "content", text.documentTitle);
  html = setById(html, "og-description", "content", text.socialDescription);
  html = setById(html, "og-url", "content", url);
  html = setById(html, "og-locale", "content", language === "en" ? "en_US" : "de_DE");
  html = setById(html, "canonical", "href", url);

  const out = language === "en" ? path.join(dist, "en", "index.html") : path.join(dist, "index.html");
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
  console.log(`prerendered ${path.relative(root, out)} (${Math.round(html.length / 1024)} kB)`);
}

fs.rmSync(ssrDir, { recursive: true, force: true });
