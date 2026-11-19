// Footer: wordmark (back to top), credit line, privacy link and copyright.

import { ToTopIcon } from "../icons.jsx";
import { copyrightYear } from "../../utils.js";

export function SiteFooter({ text, onScrollToTop }) {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <a className="wordmark" href="#page-top" aria-label={text.footer.home} onClick={onScrollToTop}>
          <span className="wordmark__name">Daniel Popa</span>
          <ToTopIcon />
        </a>
        <p>{text.footer.description}</p>
        <div className="site-footer__meta">
          {/* Separate German page; the EN label points to the same page */}
          <nav aria-label={text.footer.legalLabel}>
            <ul className="site-footer__legal">
              <li>
                <a href={`${import.meta.env.BASE_URL}datenschutz/`} hrefLang="de">
                  {text.footer.privacy}
                </a>
              </li>
            </ul>
          </nav>
          <span className="site-footer__copyright">© {copyrightYear} Daniel Popa</span>
        </div>
      </div>
    </footer>
  );
}
