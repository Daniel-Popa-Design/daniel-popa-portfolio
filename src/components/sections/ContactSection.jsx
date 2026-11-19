// Contact: e-mail, LinkedIn and CV.

import { ArrowIcon, PaperPlaneIcon } from "../icons.jsx";

export function ContactSection({ text }) {
  return (
    <section
      className="contact section-space"
      id="contact"
      aria-labelledby="contact-title"
    >
      <div className="section-wrap contact__inner">
        <h2 id="contact-title">
          {text.contact.title}
          <span>.</span>
        </h2>
        <p className="contact__lead">{text.contact.lead}</p>
        {/* One clear action (round, dark), then two quiet text links */}
        <div className="contact__actions">
          <a className="contact__primary" href={`mailto:${text.contact.email}`}>
            {text.contact.emailCta}
            <PaperPlaneIcon />
          </a>
          <a
            className="text-link"
            href="https://www.linkedin.com/in/daniel-popa-office/"
            rel="noreferrer"
            target="_blank"
          >
            <span>{text.contact.linkedin}</span>
            <ArrowIcon diagonal />
          </a>
          <a
            className="text-link"
            href={`${import.meta.env.BASE_URL}Lebenslauf_Daniel_Popa.pdf`}
            download="Lebenslauf_Daniel_Popa.pdf"
          >
            <span>{text.hero.downloadCv}</span>
            <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
              <path d="M10 3v10m-4-4 4 4 4-4M4 16v2h12v-2"></path>
            </svg>
          </a>
        </div>
        <p className="contact__meta">
          {text.contact.email} · {text.contact.location}
        </p>
      </div>
    </section>
  );
}
