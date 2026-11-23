// Views of the Storybook sketch (case 04), shared by the card and the dialog.

import { countdownDomains } from "./portalData.js";

export const PORTALS = Object.keys(countdownDomains);
export const THEMES = ["light", "dark"];
export const VIEWPORTS = ["desktop", "mobile"];

// Every view of one story: 2 portals × light/dark × desktop/mobile
export const SB_VIEWS = PORTALS.flatMap((portal) =>
  THEMES.flatMap((theme) => VIEWPORTS.map((viewport) => ({ portal, theme, viewport }))),
);

// The one view with a finding — like the real first mobile find: secondary
// button, dark mode, mobile only (2.53 : 1)
export const isFailingView = (view) =>
  view.portal === "afterglow" && view.theme === "dark" && view.viewport === "mobile";
