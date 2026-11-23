// KI: AI in the workflow — case study 04 (Storybook) and its live demo.
// Phase 2 target of the hero AI badge (#ki).

import { useState } from "react";
import { QualityStory } from "../demos/QualityStory.jsx";
import { StorybookDemo } from "../demos/StorybookDemo.jsx";
import { StorybookPreview } from "../demos/StorybookPreview.jsx";
import { NoteCard, NumberMark } from "../ui.jsx";

export function AiSection({ text, language }) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const ai = text.ai;

  return (
    <section
      className="ai work section-wrap section-space"
      id="ki"
      aria-labelledby="ai-title"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">{ai.eyebrow}</p>
          <h2 id="ai-title">
            {ai.title}
            <span>.</span>
          </h2>
        </div>
        <NoteCard label={ai.noteLabel} tab={ai.noteTab}>
          {ai.aside}
        </NoteCard>
      </div>

      <div className="quality-case-study__grid">
        <article
          className="quality-card quality-card--wide badge-card"
          aria-labelledby="ai-storybook-title"
        >
          {/* Continues the numbering of the three case studies above */}
          <NumberMark shape="ring" className="quality-card__number" hidden>
            04
          </NumberMark>
          <div className="quality-card__copy">
            <h3 id="ai-storybook-title">{ai.card.title}</h3>
            <p>{ai.card.description}</p>
          </div>
          <QualityStory story={ai.card.story}>
            <StorybookDemo onPreview={() => setPreviewOpen(true)} text={ai.demo} />
          </QualityStory>
        </article>
      </div>

      <StorybookPreview
        demoText={ai.demo}
        language={language}
        onClose={() => setPreviewOpen(false)}
        open={previewOpen}
        text={ai.preview}
      />
    </section>
  );
}
