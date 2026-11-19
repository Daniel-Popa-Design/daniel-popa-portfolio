// Work: three case studies with demos and their two live-preview dialogs.

import { useState } from "react";
import { KeyboardPreview } from "../demos/KeyboardDemo.jsx";
import { LayoutShiftDemo } from "../demos/LayoutShiftDemo.jsx";
import { ModulePreview } from "../demos/ModulePreview.jsx";
import { QualityStory } from "../demos/QualityStory.jsx";
import { SkipLinkDemo } from "../demos/SkipLinkDemo.jsx";
import { TokenSystemDemo } from "../demos/TokenSystemDemo.jsx";
import { NoteCard, NumberMark, Takeaways } from "../ui.jsx";

export function WorkSection({ text, language }) {
  // The two live-preview dialogs of the case studies
  const [previewOpen, setPreviewOpen] = useState(false);
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  return (
    <section
      className="work section-wrap section-space"
      id="work"
      aria-labelledby="work-title"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">{text.work.eyebrow}</p>
          <h2 id="work-title">
            {text.work.title}
            <span>.</span>
          </h2>
        </div>
        <NoteCard
          label={text.work.noteLabel}
          tab={text.work.noteTab}
        >
          {text.work.aside}
        </NoteCard>
      </div>

      <Takeaways
        items={text.work.takeaways}
        lessLabel={text.experience.less}
        moreLabel={text.experience.more}
      />

      <div className="quality-case-study__grid">
        <article
          className="quality-card quality-card--wide badge-card"
          aria-labelledby="quality-system-title"
        >
          <NumberMark shape="ring" className="quality-card__number" hidden>
            01
          </NumberMark>
          <div className="quality-card__copy">
            <h3 id="quality-system-title">{text.quality.cards[0].title}</h3>
            <p>{text.quality.cards[0].description}</p>
          </div>
          <QualityStory story={text.quality.cards[0].story}>
            <TokenSystemDemo
              text={text.work}
              onPreview={() => setPreviewOpen(true)}
            />
          </QualityStory>
        </article>

        <article
          className="quality-card quality-card--wide badge-card"
          aria-labelledby="quality-cls-title"
        >
          <NumberMark shape="ring" className="quality-card__number" hidden>
            02
          </NumberMark>
          <div className="quality-card__copy">
            <h3 id="quality-cls-title">{text.quality.cards[1].title}</h3>
            <p>{text.quality.cards[1].description}</p>
          </div>
          <QualityStory
            story={text.quality.cards[1].story}
            metric={text.quality.cards[1].metric}
          >
            <LayoutShiftDemo text={text.demo} language={language} />
          </QualityStory>
        </article>

        <article
          className="quality-card quality-card--wide badge-card"
          aria-labelledby="quality-keyboard-title"
        >
          <NumberMark shape="ring" className="quality-card__number" hidden>
            03
          </NumberMark>
          <div className="quality-card__copy">
            <h3 id="quality-keyboard-title">{text.quality.cards[2].title}</h3>
            <p>{text.quality.cards[2].description}</p>
          </div>
          <QualityStory story={text.quality.cards[2].story}>
            <SkipLinkDemo
              text={text.demo}
              onPreview={() => setKeyboardOpen(true)}
            />
          </QualityStory>
        </article>
      </div>

      <ModulePreview
        language={language}
        onClose={() => setPreviewOpen(false)}
        open={previewOpen}
        text={text.work}
        timerText={text.timer}
      />

      <KeyboardPreview
        onClose={() => setKeyboardOpen(false)}
        open={keyboardOpen}
        text={text.demo}
      />
    </section>
  );
}
