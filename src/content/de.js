// German copy for the whole page.

const de = {
  documentTitle: "Daniel Popa — Senior Webdesigner | Frontend-Entwicklung",
  metaDescription:
    "Daniel Popa ist Senior Webdesigner und Frontend-Entwickler aus Nürnberg mit über 10 Jahren Erfahrung in UI/UX, CSS/SCSS, WordPress, Webperformance und Barrierefreiheit.",
  socialDescription:
    "Durchdachtes Design, das funktioniert. Entdecke die Arbeit und Erfahrung von Daniel Popa.",
  language: "Sprache auswählen",
  skip: "Zum Inhalt springen",
  home: "Daniel Popa, Startseite",
  timer: {
    days: "Tage",
    hours: "Std.",
    minutes: "Min.",
    seconds: "Sek.",
    expired: "Jetzt erhältlich",
    loading: "Der Countdown wird geladen",
    until: (days, hours, minutes, seconds) =>
      `Noch ${days} Tage, ${hours} Stunden, ${minutes} Minuten und ${seconds} Sekunden bis zum Release`,
  },
  nav: {
    label: "Hauptnavigation",
    work: "Arbeiten",
    about: "Über mich",
    expertise: "Kompetenzen",
    contact: "Kontakt",
    talk: "Lass uns sprechen",
    open: "Navigation öffnen",
    close: "Navigation schließen",
  },
  hero: {
    role: ["Senior Webdesigner", "Frontend-Entwicklung"],
    intro:
      "Seit über 10 Jahren gestalte und optimiere ich Websites und digitale Anwendungen. Dabei verbinde ich UI/UX Design mit praktischer Frontend-Erfahrung, verbessere bestehende Lösungen und nutze KI-Tools gezielt, um Design- und Entwicklungsprozesse effizienter zu gestalten.",
    work: "Meine Arbeiten ansehen",
    downloadCv: "Lebenslauf herunterladen",
    about: "Über mich",
    art: "Porträt von Daniel Popa im hellblauen Hemd",
    location: "Standort",
    country: "Nürnberg, Deutschland",
    available: "VERFÜGBAR",
    worldwide: "Remote · Hybrid",
  },
  heroBadge: {
    exp1: "Jahre Erfahrung",
    exp2: "in UX/UI & Frontend",
  },
  // Counterpart to the 10+ badge. Phase 2: link to the KI section (#ki).
  aiBadge: {
    mark: "ki", // "Ki" mark in the badge (illustrations.jsx)
    title: "KI-gestützt",
    text: "Design & Entwicklung",
  },
  work: {
    eyebrow: "Was hinter der Oberfläche steckt",
    title: "Kleine Details, bessere Erlebnisse",
    aside:
      "Drei Fallstudien aus einem Multi-Brand-Publishing-System: ein Farbsystem, das alle Marken trägt, eine Seite, die beim Laden nicht springt, und ein Portal, das ohne Maus funktioniert. Portal- und Inhaltsnamen sind fiktiv – Struktur, Tokens und Farblogik stammen aus dem echten System. Die Skizzen sind nachgebaute Konzeptbeispiele, keine gemessenen Projektergebnisse.",
    noteLabel: "Kontext",
    noteTab: "3 Fallstudien",
    // Four takeaways under the heading (icon, label, text clamped to 3 lines)
    takeaways: [
      {
        icon: "target",
        label: "Der Ansatz",
        text:
          "Palettenwerte kontextunabhängig wiederverwenden; etablierte Rollen wie Links und Artikeltitel über semantische Aliase abbilden.",
      },
      {
        icon: "bulb",
        label: "Warum das wichtig ist",
        text:
          "Ein Komponenten-Stylesheet bedient alle sieben Marken: Ein Rebranding ändert nur die lokale Farbdatei, der Dunkelmodus belegt lediglich Variablen unter [data-theme=\"dark\"] neu, und rund 4.800 Grau-Referenzen bleiben überall konsistent – ohne ausufernde Sammlung einzelner semantischer Namen.",
      },
      {
        icon: "puzzle",
        label: "Mein Beitrag",
        text:
          "Eine Farbstrategie in vier Ebenen: eine globale Graustufen-Skala (--gr5 bis --gr93, benannt nach % Schwarz) für alle Marken, Marken-Basiswerte je Portal (--PrCl, --AcCl), wenige semantische Rollen für Text, Titel, Links, Hintergründe und Buttons sowie nummerierte Hell/Dunkel-Paare wie --Cc25 für alles Übrige – Marke für Marke ausgerollt.",
      },
      {
        icon: "unsemantic",
        label: "Unsemantische Farben",
        text:
          "--Cc25 benennt eine Farbe, keine Rolle. Es hält je einen Wert für Hell- und Dunkelmodus und wird direkt in Komponenten wie dem Countdown eingesetzt – überall dort, wo die Markenfarbe ohne globale Bedeutung gebraucht wird, ganz ohne neues semantisches Alias.",
      },
    ],
    tokenDemo: {
      label: "Skizze: Farbsystem in vier Ebenen",
      layersTitle: "Vier Ebenen",
      modulesTitle: "Ein Modul, vier Varianten",
      gray: "Graustufen",
      brand: "Marke",
      role: "Rolle",
      palette: "Palette",
      notes: [
        "Für alle Marken gleich – benannt nach % Schwarz",
        "Ein Wert je Portal – nur hier ändert ein Rebranding etwas",
        "Wiederkehrende Aufgaben bekommen einen Namen",
        "Eine Farbe, keine Rolle – je ein Wert für Hell und Dunkel",
      ],
      layersCaption: "Jede Ebene baut auf der vorherigen auf – von allgemein zu spezifisch",
      modulesCaption: "Gleiche Struktur – nur die Tokens wechseln",
      previewButton: "Live-Module ansehen",
      previewHint: "Umfrage und Countdown mit Portal- und Modus-Umschalter",
    },
    preview: {
      title: "Live-Vorschau",
      lead: "Echte Komponenten aus dem System: ein Stylesheet für alle Portale, umgeschaltet nur über Tokens.",
      close: "Vorschau schließen",
      tokens: "Aktive Tokens",
      uses: {
        brand: "Markenfarbe – Button und Kommentar-Link der Umfrage",
        title: "Semantische Rolle – Titel des Countdowns",
        tile: "Palettenwert – Ziffern-Kacheln des Countdowns",
      },
      tokensNote:
        "Gleiche Komponenten, gleiches CSS – beim Umschalten ändern sich nur diese Werte.",
    },
    pollQuestion: "Welche Artikel der Ausgabe 07/2023 haben dir zugesagt?",
    pollTitle: "Leserlieblinge",
    pollLabel: "Umfrageergebnisse",
    participants: "Teilnehmende",
    pollStart: "01.06.2023, 13:45 Uhr",
    pollEnd: "02.08.2023, 13:45 Uhr",
    until: "bis",
    multiple: "Mehrfachauswahl: Ja",
    vote: "Jetzt einloggen zum Abstimmen",
    comment: "Jetzt kommentieren",
    portal: "Portal",
    appearance: "Darstellung",
    light: "Hell",
    dark: "Dunkel",
    pollOptions: [
      "Praxis: Gaming unter Linux mit Nobara",
      "Praxis: Radeon 6000 mit MPT und MCT optimieren – Treibergrenzen sprengen",
      "Sonstiges (bitte kurz im Thread schreiben)",
      "Test: 5× Z790-Mainboards",
      "Test: 6× Notebooks mit RTX 4000",
    ],
    countdownLabel: "Shadowstone-Release-Countdown",
    countdownButton: "Alle Shadowstone-Infos",
    release: "Release",
    releaseDate: "19.11.",
  },
  quality: {
    cards: [
      {
        title: "Ein Farbsystem für sieben Marken",
        description:
          "Gemeinsame Komponenten, die sich über Tokens an jede Marke und jeden Modus anpassen.",
        story: {
          situationLabel: "Situation",
          situation:
            "Ein Publishing-System betreibt sieben Portale mit eigener Markenidentität – aber mit denselben Komponenten, etwa Umfrage oder Release-Countdown. Jede Marke braucht ihre Farben, jedes Modul einen Hell- und einen Dunkelmodus.",
          whyLabel: "Warum es zählt",
          why: [
            {
              term: "Wartung",
              text: "Ohne System entsteht pro Marke ein eigenes Stylesheet – jede Änderung müsste siebenmal umgesetzt werden.",
            },
            {
              term: "Konsistenz",
              text: "Grautöne, Links und Titel sollen auf allen Portalen gleich funktionieren.",
            },
            {
              term: "Übersicht",
              text: "Ein eigenes semantisches Token für jede Farbanwendung führt zu einer endlosen Liste von Variablen mit denselben Werten.",
            },
          ],
          solutionLabel: "Umsetzung",
          solutionLead:
            "Nicht jede Farbanwendung braucht ein eigenes semantisches Token. Ich habe die Farben in vier Ebenen geordnet – von allgemein zu spezifisch – und Marke für Marke ausgerollt:",
          steps: [
            "Globale Graustufen von --gr5 bis --gr93, benannt nach % Schwarz – für alle Marken gleich.",
            "Marken-Basiswerte je Portal (--PrCl1, --AcCl) – die einzige Datei, die ein Rebranding ändert.",
            "Wenige semantische Rollen für Wiederkehrendes: Text, Titel, Links, Hintergründe und Buttons (z. B. --lk → --PrCl1).",
            "Nummerierte Hell/Dunkel-Paare wie --Cc25 für alles Übrige – eine Farbe, keine Rolle, direkt in Komponenten nutzbar.",
          ],
          resultLabel: "Ergebnis",
          result:
            "Ein Komponenten-Stylesheet bedient alle sieben Marken. Ein Rebranding ändert nur die lokale Farbdatei, der Dunkelmodus belegt lediglich Variablen neu.",
          moreLabel: "So bin ich vorgegangen",
          deeperLabel: "Technische Details",
          deeper:
            "Der Dunkelmodus setzt die Variablen unter [data-theme=\"dark\"] neu – die Komponenten selbst bleiben unverändert. Rund 4.800 Grau-Referenzen nutzen dieselbe Skala und bleiben überall konsistent. Beispiel Countdown: Der Titel nutzt die semantische Rolle --modTtl (hell → --gr80 · #333333, dunkel → --gr5 · #f2f2f2), die Ziffern-Kacheln den unsemantischen Wert --Cc25 (Northstar: #285b78 hell, #020202 dunkel). Gern erkläre ich die Details im Gespräch.",
        },
      },
      {
        title: "Eine Seite, die beim Lesen nicht springt",
        description:
          "Die Seite bleibt ruhig, während Werbung und Bilder laden.",
        story: {
          situationLabel: "Situation",
          situation:
            "Artikelseiten finanzieren sich über Werbung. Die Anzeigen kommen aus externen Ad-Systemen und laden erst nach dem Text – zu unvorhersehbaren Zeiten und in wechselnden Größen. Jede Anzeige schiebt den Inhalt darunter weg.",
          whyLabel: "Warum es zählt",
          why: [
            {
              term: "Lesende",
              text: "verlieren die Zeile oder tippen daneben.",
            },
            {
              term: "Barrierefreiheit",
              text: "Mit Bildschirmlupe oder eingeschränkter Handmotorik ist eine springende Seite eine Barriere, kein Ärgernis.",
            },
            {
              term: "Business",
              text: "Seit Juni 2025 verlangt der European Accessibility Act für viele kommerzielle Websites Barrierefreiheit. Google wertet Verschiebungen zudem als Qualitätssignal.",
            },
          ],
          solutionLabel: "Umsetzung",
          solutionLead:
            "Entscheidend ist das richtige Maß: zu wenig Platz und die Seite springt trotzdem, zu viel und es bleiben leere Lücken.",
          steps: [
            "Platz für jeden Werbeplatz reservieren – nach den Größen, die tatsächlich ausgeliefert werden.",
            "Bildgrößen vorab festlegen, damit der Browser den Platz kennt.",
            "Auf Smartphone und Desktop prüfen, denn Formate und Ladezeiten unterscheiden sich.",
          ],
          resultLabel: "Ergebnis",
          result:
            "Der Inhalt steht, bevor die Werbung kommt – die Seite bleibt beim Lesen still.",
          moreLabel: "So bin ich vorgegangen",
          deeperLabel: "Technische Details",
          deeper:
            "Die Kennzahl heißt Cumulative Layout Shift (CLS) und gehört zu Googles Core Web Vitals; das Ziel liegt bei 0,1 oder weniger für die meisten Besuche. Werbeplätze und Bilder erhalten feste Maße (min-height, aspect-ratio, width/height), sodass der Browser den Platz von Anfang an freihält. Der European Accessibility Act verweist auf die Norm EN 301 549, die auf WCAG 2.1 Level AA aufbaut. Gern erkläre ich die Details im Gespräch.",
        },
        metric:
          "CLS-Ziel: ≤ 0,1 am 75. Perzentil; für dieses Konzept nicht gemessen.",
      },
      {
        title: "Ein Gaming-Portal, das ohne Maus funktioniert",
        description:
          "Gestaltet für Lesende, die per Tastatur, Schalter oder Sprachsteuerung navigieren.",
        story: {
          situationLabel: "Situation",
          situation:
            "Wer Spiele liebt, liest auch Gaming-Seiten – darunter Menschen, die mit eingeschränkter Handmotorik oder ganz ohne Hände spielen. Seiten, die für Maus und Touch gebaut sind, lassen sie zurück.",
          whyLabel: "Warum es zählt",
          why: [
            {
              term: "Eingeschränkte Handmotorik",
              text: "Inhalte werden Schritt für Schritt erreicht. Ein langes Menü vor jedem Artikel macht das langsam und ermüdend – und man verliert leicht die Position.",
            },
            {
              term: "Business",
              text: "Seit Juni 2025 verlangt der European Accessibility Act für viele kommerzielle Websites Barrierefreiheit.",
            },
          ],
          solutionLabel: "Umsetzung",
          solutionLead:
            "Seiten für Maus und Touch verstecken ihre Probleme: ein langes Menü vor jedem Artikel, unsichtbarer Fokus, kleine Klickziele und Animationen ohne Ende. Die Lösung verändert Design und Code gemeinsam.",
          steps: [
            "Skip-Link ergänzen – ein Tastendruck springt am Menü vorbei direkt zum Artikel.",
            "Fokus deutlich sichtbar machen, damit jederzeit klar ist, wo man sich befindet.",
            "Kleine Klickziele vergrößern und unnötige Bewegung entfernen.",
          ],
          resultLabel: "Ergebnis",
          result:
            "Der Artikel ist einen Schritt entfernt, und Lesende sehen jederzeit, wo sie sich befinden.",
          moreLabel: "So bin ich vorgegangen",
          deeperLabel: "Technische Details",
          deeper:
            "Relevante WCAG-2.2-Kriterien: 2.4.1 Blöcke umgehen (Skip-Link), 2.4.7 Fokus sichtbar und 2.5.8 Zielgröße (Minimum). Klickziele sind 44 px groß – deutlich über dem Minimum von 24 px. Animationen werden abgeschaltet, wenn das Gerät reduzierte Bewegung anfordert (prefers-reduced-motion). Gern erkläre ich die Details im Gespräch.",
        },
      },
    ],
  },
  demo: {
    layoutLabel: "Beispiel für Layout-Verschiebungen",
    before: "Vorher",
    after: "Nachher",
    replay: "Erneut abspielen",
    loadingBefore: "Artikelinhalt geladen. Werbung wird geladen.",
    loadingAfter: "Werbeplatz reserviert. Werbung wird geladen.",
    loadedBefore:
      "Werbung geladen. Der Inhalt darunter ist nach unten gerückt.",
    loadedAfter:
      "Werbung geladen. Der reservierte Platz hält den Inhalt an seiner Position.",
    stepTextLoads: "Text lädt",
    stepReserved: "Platz reserviert",
    stepAdArrives: "Werbung kommt",
    captionBefore: "Der Text springt, sobald die Werbung lädt",
    captionAfter: "Nichts bewegt sich, wenn die Werbung lädt",
    ad: "Anzeige",
    read: "Lesen",
    skipLabel: "Beispiel: Tastaturweg zum Artikel",
    skipLink: "Zum Artikel",
    skipCaptionBefore: "Beispiel: 9 Tastendrücke bis zum Artikel",
    skipCaptionAfter: "2 Tastendrücke: Tab, dann Enter",
    keyboard: {
      button: "Live-Demo ansehen",
      hint: "Vorher und Nachher nebeneinander – abspielen oder selbst testen",
      title: "Live-Demo: Ohne Maus zum Artikel",
      lead: "Die drei Änderungen im direkten Vergleich: Skip-Link, sichtbarer Fokus, große Klickziele ohne Dauer-Animation.",
      close: "Demo schließen",
      play: "Tastenweg abspielen",
      playHint: "▶ spielt beide Wege automatisch ab – oder einfach Tab drücken und selbst durchgehen",
      try: "Selbst testen",
      presses: "Tastendrücke",
      path: "Tastenweg",
      live: "Live",
      navLabel: "Hauptnavigation",
      nav: ["News", "Tests", "Tipps", "Hardware", "Videos", "Specials", "Forum", "Abo"],
      article: "Artikel",
      skip: "Zum Artikel springen",
      skipped: "8 Menüpunkte übersprungen",
      articleTitle: "Shadowstone im Test",
      checks: {
        before: [
          "Kein Skip-Link – 9 Tastendrücke bis zum Artikel",
          "Fokus kaum sichtbar – wo bin ich gerade?",
          "Kleine Klickziele, Animation ohne Ende",
        ],
        after: [
          "Skip-Link – Tab, dann Enter",
          "Deutlicher Fokusrahmen an jeder Stelle",
          "Große Klickziele, keine Dauer-Animation",
        ],
      },
      summaryValue: "9 → 2",
      summary:
        "Pro Artikel 7 Tastendrücke weniger. Bei Schaltersteuerung ist jeder davon ein eigener Druck – und der Fokusrahmen zeigt jederzeit die Position.",
    },
  },
  // KI section. Facts follow the Storybook branches of the publishing system
  // (storybook_implementation / storybook_pcgh / storybook_static).
  ai: {
    eyebrow: "KI im Workflow",
    title: "Schneller zur geprüften Komponente",
    noteLabel: "Kontext",
    noteTab: "1 Fallstudie",
    aside:
      "Wie ich KI im Alltag einsetze: als Pair-Programmer für Werkzeuge, die Design und Entwicklung zusammenbringen. Ich entscheide, was gebaut wird und wie es aussieht – die KI schreibt Gerüst und Prüflogik mit, ich prüfe jeden Schritt. Portal- und Inhaltsnamen sind fiktiv, die Skizzen nachgebaute Konzeptbeispiele.",
    card: {
      title: "Storybook: Module prüfen, bevor sie live gehen",
      description:
        "Ein Prüfstand für das Seiten-CSS aller Marken – mit KI-Unterstützung (Claude Code) im Team aufgebaut.",
      story: {
        situationLabel: "Situation",
        situation:
          "Sieben Marken teilen sich ein CSS-System, doch neue Module ließen sich nur auf der Live- oder Testseite ansehen. Wie ein Modul auf einer anderen Marke, im Dunkelmodus oder mobil wirkt, zeigte sich oft erst spät – Kontrastfehler fielen meist gar nicht auf.",
        whyLabel: "Warum es zählt",
        why: [
          {
            term: "Design",
            text: "Varianten ohne Backend vergleichen – Marke, Hell/Dunkel und Mobil per Klick.",
          },
          {
            term: "Qualität",
            text: "Kontrast und Barrierefreiheit gehören in den Entwurf, nicht in die Nachkontrolle.",
          },
          {
            term: "Team",
            text: "Design, Entwicklung, Redaktion und Produkt sehen dasselbe Modul im selben Zustand.",
          },
        ],
        solutionLabel: "Umsetzung",
        solutionLead:
          "Storybook haben wir zu zweit aufgebaut, mit Claude Code als Pair-Programmer. Mein Teil – die Seite von Design und Frontend:",
        steps: [
          "Das echte Seiten-CSS in Storybook gebracht: gemeinsames CSS-Paket für alle Stories, Basis-Styles und Schriften – jede Story zeigt das Modul wie auf der Seite.",
          "Landingpage-Module als Stories aus echtem Live-Markup (Desktop und Mobil), Buttons mit WCAG-2.2-Kontrastprüfung und kopierbarem Markup.",
          "Den UI-Editor gebaut: eigenes HTML eingeben und live mit dem Seiten-CSS sehen – mit Kontrast inklusive Hover, Klassen ohne CSS-Regel und der SCSS-Datei, aus der eine Regel kommt.",
          "Das Countdown-Modul in Storybook entworfen: sieben Varianten, Läuft/Abgelaufen, Hell/Dunkel, Desktop/Mobil – danach als Produktionsmodul live gebracht.",
        ],
        resultLabel: "Ergebnis",
        result:
          "Neue Module entstehen und werden geprüft, bevor sie die Seite erreichen: Das Countdown-Modul ging in unter zwei Wochen von der ersten Story in Produktion, und der Kontrast-Audit über drei Kernmarken sank im Team von 1.708 Befunden auf 0.",
        moreLabel: "So bin ich vorgegangen",
        deeperLabel: "Technische Details",
        // Toggletip on the first mention in the technical details
        glossary: [
          {
            term: "Storybook 10",
            title: "Was ist Storybook?",
            text: "Eine Open-Source-Werkstatt für die Bausteine einer Website: Jedes Modul wird dort einzeln entwickelt, in allen Varianten getestet und dokumentiert – außerhalb der echten Seite. Besucher sehen sie nie; „10“ ist die Versionsnummer. Bei uns läuft sie mit Vite, demselben Build-Tool wie die Website, direkt auf dem bestehenden SCSS – was dort stimmt, stimmt auch auf der Seite.",
          },
        ],
        deeper:
          "Storybook 10 mit Vite auf dem bestehenden SCSS – kein Nachbau in React: Jede Story nutzt echtes Markup aus Seiten-Snapshots. Der Theme-Wechsel setzt nur data-theme, ein Markenwechsel lädt die lokalen Farb- und Schriftdateien neu. Darauf setzen automatische Tests auf: Interaktionstests (Vitest), Accessibility mit axe, visuelle Regression gegen Golden Masters (Playwright, Pixel und berechnete Styles) und ein Deploy-Gate, das nur bei grünen Tests ausliefert.",
      },
    },
    demo: {
      label: "Skizze: Storybook als Werkbank und Prüfstand",
      benchTitle: "Die Werkbank",
      benchCaption: "Ein Modul, jede Marke und jeder Modus – ohne Backend",
      matrixTitle: "Ein Klick, alle Ansichten",
      matrixCaption: "Gefunden, bevor es live geht",
      tree: [
        ["Module", ["Countdown", "Umfrage"]],
        ["Guideline", ["UI-Editor", "Buttons"]],
      ],
      portal: "Portal",
      mode: "Modus",
      viewport: "Viewport",
      light: "Hell",
      dark: "Dunkel",
      desktop: "Desktop",
      mobile: "Mobil",
      panelTabs: ["Accessibility", "Visual", "Interactions"],
      countdownTag: "Release",
      countdownTitle: "Shadowstone",
      units: ["Tage", "Std.", "Min.", "Sek."],
      run: "Tests starten",
      running: "Tests laufen …",
      fix: "Fix übernehmen und neu prüfen",
      again: "Erneut prüfen",
      idle: "8 Ansichten: 2 Portale × Hell/Dunkel × Desktop/Mobil",
      found: "1 Befund: Button Sekundär · 2,53 : 1 (mindestens 4,5 : 1)",
      passed: "8 von 8 Ansichten grün",
      viewStatus: { idle: "nicht geprüft", running: "läuft", ok: "bestanden", fail: "Befund" },
      previewButton: "Storybook-Demo öffnen",
      previewHint: "UI-Editor, Testlauf und Deploy-Gate zum Ausprobieren",
    },
    preview: {
      title: "Live-Demo: Storybook nachgebaut",
      lead: "Drei Werkzeuge aus dem echten Setup, vereinfacht zum Ausprobieren. Links eine Story wählen.",
      close: "Demo schließen",
      navLabel: "Stories",
      stories: {
        editor: "UI-Editor",
        tests: "Testlauf",
        gate: "Deploy-Gate",
      },
      mine: "Mein Teil",
      team: "Team",
      editor: {
        intro:
          "Im echten UI-Editor schreibt man HTML und sieht es live mit dem Seiten-CSS. Die Prüfungen laufen nach jedem Speichern einer SCSS-Datei automatisch neu. Hier: der Kontrast-Check zum Ausprobieren.",
        surface: "Fläche",
        text: "Textfarbe",
        opacity: "Deckkraft",
        surfaces: { page: "Seite hell", dark: "Seite dunkel", brand: "Markenfläche" },
        sample: "Fließtext auf der Fläche",
        link: "Ein Link im Text",
        ratio: "Kontrast",
        levels: ["AA Text", "AA groß", "AAA Text"],
        hover: "Hover",
        checksTitle: "Was der UI-Editor außerdem prüft",
        checks: [
          ["Klassen ohne CSS-Regel", ".newCard · .newCardTitle – Regel in einer SCSS-Datei anlegen, die Vorschau übernimmt sie ohne Neuladen."],
          ["Herkunft einer Regel", ".btn.btnPrim → buttons.scss · Farbe --PrCl1 aus colorsLocal.scss"],
          ["Hover-Zustände", "Kontrast wird auch für :hover berechnet – Links und Buttons fallen sonst oft durch."],
        ],
      },
      tests: {
        intro:
          "„Aktuelle Ansicht“ = Portal + Modus + Viewport der Toolbar. Rot heißt: in dieser Ansicht betroffen. Gelb: nur in einer anderen Ansicht. Stell die Toolbar auf die betroffene Ansicht – aus Gelb wird Rot.",
        current: "Aktuelle Ansicht",
        stories: ["Countdown", "Umfrage", "Button Sekundär"],
        statusOk: "Alle Ansichten bestanden",
        statusRed: "Befund in dieser Ansicht: .btnSec 2,53 : 1",
        statusYellow: "Nur in anderer Ansicht: AFTERGLOW · Dunkel · Mobil (.btnSec 2,53 : 1)",
        visualTitle: "Visual Regression",
        visualModes: { baseline: "Golden Master", current: "Aktuell", diff: "Diff" },
        // Explanation next to the sketch, follows the selected view
        visualExplain: {
          baseline:
            "Die freigegebene Referenz: Jemand hat das Modul geprüft und gesagt „so soll es aussehen“. Dieser Screenshot liegt im Git.",
          current:
            "Der neue Screenshot aus diesem Testlauf, nach einer CSS-Änderung. Hier ist der Button um 2 px verrutscht – mit bloßem Auge kaum zu sehen.",
          diff:
            "Beide Bilder übereinander: Orange ist jeder Pixel, der abweicht. Hier genau der Button.",
        },
        visualFlowTitle: "So läuft der Vergleich",
        visualFlow: [
          "Eine SCSS-Datei ändert sich – gewollt oder aus Versehen.",
          "Der Test macht neue Screenshots und vergleicht sie mit dem Golden Master. Dazu die berechneten Styles – sie finden auch Änderungen, die im Bild verdeckt sind.",
          "Alles gleich: grün. Etwas weicht ab: rot – der Diff zeigt, wo.",
          "Ein Mensch entscheidet: Fehler → CSS korrigieren. Gewollt → den neuen Screenshot bewusst als Golden Master übernehmen.",
        ],
        legend: [
          ["red", "Befund in der aktuellen Ansicht"],
          ["yellow", "Befund nur in einer anderen Ansicht"],
          ["green", "Geprüft und in Ordnung"],
        ],
      },
      gate: {
        intro:
          "Das Deploy-Gate liefert nur aus, wenn alle Stufen grün sind. Neue Referenzbilder werden nie automatisch übernommen – nur bewusst, nach Prüfung.",
        start: "Gate starten",
        simulate: "Fehler simulieren (Button 2 px verschoben)",
        steps: [
          ["Voraussetzungen", "kein paralleler Lauf, Server bereit"],
          ["Interactions", "play-Funktionen aller Stories"],
          ["Visual Regression", "Pixel + Styles gegen Golden Master"],
          ["Kontrast-Audit", "Marken × Hell/Dunkel × Desktop/Mobil"],
          ["Deploy", "CSS-Build auf den Server"],
        ],
        done: "Alle Stufen grün – ausgeliefert.",
        blocked: "Gestoppt bei Visual Regression: 1 Modul sieht anders aus als sein Golden Master. Nichts wurde ausgeliefert – erst prüft ein Mensch den Diff: Fehler beheben oder neuen Stand freigeben.",
      },
    },
  },
  about: {
    eyebrow: "Ein bisschen über mich",
    title: ["Design im Kopf.", "Entwicklung im Fokus"],
    noteLabel: "10+ Jahre im Web",
    noteTab: "seit 2011",
    intro:
      "Ich komme aus der Grafik- und Mediengestaltung – und arbeite bis heute so: Design und Frontend zusammen, von der ersten Idee bis zur fertigen Seite. Seit 2014 gestalte und entwickle ich bei Computec Media responsive Websites, Landingpages und WordPress-Frontends für verschiedene Medienmarken. Mein Fokus: UI/UX, Webperformance und Barrierefreiheit.",
  },
  // Quote verbatim from the Zwischenzeugnis (Computec Media, 29 Sep 2026)
  testimonial: {
    eyebrow: "Was andere sagen",
    quote:
      "Er kommunizierte klar, freundlich und lösungsorientiert und genoss bei allen Beteiligten hohes Vertrauen und hohe Wertschätzung.",
    name: "Markus Wollny",
    role: "Leiter Web-Entwicklung, Computec Media",
  },
  expertise: {
    eyebrow: "Mein Werkzeugkasten",
    title: "Mit Bedacht gewählte Kompetenzen",
    aside:
      "Von der ersten Idee bis zum geprüften Frontend: vier Disziplinen, die sich in meiner Arbeit ergänzen.",
    noteLabel: "Überblick",
    areaUnit: "Bereiche",
    skillUnit: "Kompetenzen",
    groups: [
      {
        icon: "interface",
        title: "UI/UX-Design",
        description:
          "Nutzerorientierte Interfaces – von der ersten Idee bis zum getesteten Prototyp.",
        skills: ["UI-Konzepte", "Wireframes", "Prototyping", "Mobile First"],
      },
      {
        icon: "systems",
        title: "Visuelles Design & Designsysteme",
        description:
          "Klare Gestaltung und konsistente Komponenten für digitale Markenauftritte.",
        skills: [
          "Designsysteme",
          "Figma",
          "Photoshop",
          "Illustrator",
          "Logos & Corporate Design",
        ],
      },
      {
        icon: "development",
        title: "Frontend & WordPress",
        description:
          "Responsive Websites und sorgfältig umgesetzte Frontends für alle Bildschirmgrößen.",
        skills: [
          "HTML5",
          "CSS / SCSS",
          { name: "JavaScript", level: "Grundkenntnisse" },
          { name: "React", level: "erste Praxiserfahrung" },
          "WordPress",
          { name: "PHP-Templates", level: "praktische Erfahrung" },
          "HTML-E-Mail-Entwicklung",
          "Responsive E-Mail-Templates",
          "CSS Grid / Flexbox",
          "Git / Vite",
        ],
      },
      {
        icon: "quality",
        title: "Qualität & Barrierefreiheit",
        description:
          "Zugängliche, schnelle Erlebnisse – geprüft und kontinuierlich verbessert.",
        skills: [
          "WCAG 2.2",
          "Core Web Vitals",
          "Lighthouse",
          "SEO",
          "Testing",
          "Debugging",
        ],
      },
    ],
  },
  experience: {
    title: "Berufserfahrung",
    years: "Jahre",
    more: "Mehr lesen",
    less: "Weniger anzeigen",
    // Oldest first: the timeline reads left → right towards today.
    // Texts follow the CV (public/Lebenslauf_Daniel_Popa.pdf) — keep both in sync.
    entries: [
      {
        range: "2008–2011",
        duration: "3 Jahre",
        role: "Grafik- & Mediengestalter Digital & Print",
        company: "S.C. Noblesse S.R.L. · Hermannstadt, Rumänien",
        description:
          "Gestaltung digitaler und gedruckter Medien, Logos und Corporate Designs sowie Entwicklung visueller Konzepte.",
      },
      {
        range: "2011–2014",
        duration: "3 Jahre",
        role: "Mediengestalter · Freelancer",
        company: "World of Cruise S.R.L. · Hermannstadt, Rumänien",
        description:
          "Gestaltung und Entwicklung von Websites und Frontends mit HTML, CSS, JavaScript und jQuery. Erstellung von Print- und Digitalmedien, Logos und Corporate Designs sowie Kundenberatung.",
      },
      {
        range: "2014–2016",
        duration: "2 Jahre",
        role: "Trainee UI/UX Design & Frontend Development",
        company: "Computec Media GmbH · Fürth, Deutschland",
        description:
          "Mitarbeit bei Konzeption, Design und Entwicklung von Websites, Landingpages und UI-Prototypen. Entwicklung von WordPress-Themes und Frontend-Komponenten sowie Testing und Performance-Optimierung.",
      },
      {
        range: "2016 – heute",
        since: 2016,
        role: "UI/UX Designer & Frontend Developer",
        company: "Computec Media GmbH · Fürth, Deutschland",
        description:
          "Konzeption, Neugestaltung und kontinuierliche Optimierung responsiver Websites und digitaler Anwendungen für verschiedene Medienmarken. Entwicklung eines zentralen CSS-Farbsystems mit semantischen und wiederverwendbaren Variablen für konsistente UI-Gestaltung im Hell- und Dunkelmodus (siehe Fallstudie 01). Entwicklung und Pflege von Frontend-Komponenten, WordPress-Themes und PHP-Templates mit HTML, CSS/SCSS und JavaScript. Optimierung von Webperformance, Core Web Vitals, Barrierefreiheit und SEO. Erstellung von UI-Konzepten, Wireframes und Prototypen in Zusammenarbeit mit Backend, Marketing und weiteren Teams sowie gezielter Einsatz von KI-Tools.",
      },
    ],
  },
  contact: {
    title: "Lass uns sprechen",
    lead: "Ich bin offen für neue Aufgaben in UI/UX-Design und Frontend-Entwicklung – remote oder vor Ort in Nürnberg.",
    emailCta: "E-Mail schreiben",
    linkedin: "LinkedIn",
    email: "popadaniel.office@gmail.com",
    location: "Nürnberg, Deutschland",
  },
  game: {
    eyebrow: "Ein kleines Extra",
    title: "Token-Turnier",
    noteLabel: "Pause",
    noteTab: "8 Paare · 5 Maskottchen",
    aside:
      "Ein kleines Frontend-Experiment mit echten Farb-Tokens aus einem Publishing-System. Finde die Paare und sammle alle 5 Maskottchen – jedes gewonnene Spiel schaltet ein neues frei.",
    boardLabel: "Memory-Spielfeld",
    moves: "Züge",
    pairs: "Paare",
    restart: "Neu mischen",
    newCollection: "Neue Sammlung starten",
    hidden: (n) => `Karte ${n}, verdeckt`,
    found: (token) => `Paar gefunden: ${token}`,
    miss: "Kein Paar – die Karten werden wieder verdeckt.",
    won: (moves) => `Geschafft! Alle Paare in ${moves} Zügen gefunden.`,
    wonTitle: "Alle Paare gefunden!",
    mascotCount: "Maskottchen",
    collectionLabel: "Deine Maskottchen-Sammlung",
    collectionHint: "Gewinne eine Runde, um das nächste freizuschalten.",
    locked: "Noch nicht entdeckt",
    newMascot: (name) => `Neu freigeschaltet: ${name}`,
    collectionDone:
      "Alle 5 Maskottchen gesammelt – du bist offiziell Token-Legende!",
    mascotNames: {
      knight: "Sir Klickalot",
      dragon: "Drachi",
      frog: "König Quak",
      owl: "Eulrich der Weise",
      goblin: "Gobbo der Narr",
    },
    mascots: {
      knight: "Sir Klickalot schlägt dich zum Ritter der Tokens!",
      dragon: "Drachi ist beeindruckt – und nur ein kleines bisschen neidisch.",
      frog: "König Quak ernennt dich zum Hofdesigner.",
      owl: "Eulrich der Weise nickt anerkennend. Sehr anerkennend.",
      goblin: "Gobbo der Narr hatte die ganze Zeit auf dich gewettet!",
    },
  },
  footer: {
    description:
      "Selbst gestaltet und entwickelt in Nürnberg – mit React, Vite und SCSS.",
    home: "Daniel Popa, zurück nach oben",
    legalLabel: "Rechtliches",
    privacy: "Datenschutz",
  },
};

export default de;
