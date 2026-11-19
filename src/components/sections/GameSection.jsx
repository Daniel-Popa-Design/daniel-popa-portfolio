// Game: the Token-Turnier memory game.

import { TokenMemory } from "../game/TokenMemory.jsx";
import { NoteCard } from "../ui.jsx";

export function GameSection({ text, language }) {
  return (
    <section
      className="game section-wrap section-space"
      id="game"
      aria-labelledby="game-title"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">{text.game.eyebrow}</p>
          <h2 id="game-title">
            {text.game.title}
            <span>.</span>
          </h2>
        </div>
        <NoteCard
          label={text.game.noteLabel}
          tab={text.game.noteTab}
        >
          {text.game.aside}
        </NoteCard>
      </div>
      <TokenMemory text={text.game} language={language} />
    </section>
  );
}
