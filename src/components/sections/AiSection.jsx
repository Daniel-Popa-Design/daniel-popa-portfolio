// KI: AI in the workflow — the Storybook case and its live demo. First
// section after the hero, independent of the three classic case studies;
// phase 2 target of the hero AI badge (#ki).

import { useState } from "react";
import { QualityStory } from "../demos/QualityStory.jsx";
import { StorybookDemo } from "../demos/StorybookDemo.jsx";
import { StorybookPreview } from "../demos/StorybookPreview.jsx";
import { AiMark } from "../illustrations.jsx";
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
          {/* Not numbered: the hero badge's Ai/Ki mark in the red of the
              badge ties the case to the hero instead */}
          <NumberMark shape="ring" className="quality-card__number quality-card__number--ai" hidden>
            <AiMark mark={text.aiBadge.mark} />
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
