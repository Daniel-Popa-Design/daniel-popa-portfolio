import { Fragment, useEffect, useId, useRef, useState } from "react";
import portrait from "./assets/daniel-popa-cutout.png";

const countdownDomains = {
  northstar: {
    name: "NORTHSTAR",
    cc25: "#285b78",
    cc25Dark: "#020202",
  },
  afterglow: {
    name: "AFTERGLOW",
    cc25: "#70486d",
    cc25Dark: "#c9adc5",
  },
};

const copy = {
  de: {
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
      role: ["Senior Webdesigner |", "Frontend-Entwicklung"],
      intro:
        "Mit über 10 Jahren Erfahrung verwandle ich komplexe Ideen in klare, durchdachte digitale Erlebnisse.",
      work: "Meine Arbeiten ansehen",
      downloadCv: "Lebenslauf herunterladen",
      about: "Über mich",
      art: "Porträt von Daniel Popa. Ich lebe in Nürnberg, Deutschland, und arbeite remote oder hybrid im Raum Nürnberg/Fürth.",
      location: "Standort",
      country: "Nürnberg, Deutschland",
      available: "VERFÜGBAR",
      worldwide: "Remote · Hybrid",
    },
    heroBadge: {
      exp1: "Jahre Erfahrung",
      exp2: "im Webdesign",
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
            "Ein Komponenten-Stylesheet bedient alle acht Marken: Ein Rebranding ändert nur die lokale Farbdatei, der Dunkelmodus belegt lediglich Variablen unter [data-theme=\"dark\"] neu, und rund 4.800 Grau-Referenzen bleiben überall konsistent – ohne ausufernde Sammlung einzelner semantischer Namen.",
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
      commentLabel: "Jetzt kommentieren, 87 Kommentare",
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
          title: "Ein Farbsystem für acht Marken",
          description:
            "Gemeinsame Komponenten, die sich über Tokens an jede Marke und jeden Modus anpassen.",
          story: {
            situationLabel: "Situation",
            situation:
              "Ein Publishing-System betreibt acht Portale mit eigener Markenidentität – aber mit denselben Komponenten, etwa Umfrage oder Release-Countdown. Jede Marke braucht ihre Farben, jedes Modul einen Hell- und einen Dunkelmodus.",
            whyLabel: "Warum es zählt",
            why: [
              {
                term: "Wartung",
                text: "Ohne System entsteht pro Marke ein eigenes Stylesheet – jede Änderung müsste achtmal umgesetzt werden.",
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
              "Ein Komponenten-Stylesheet bedient alle acht Marken. Ein Rebranding ändert nur die lokale Farbdatei, der Dunkelmodus belegt lediglich Variablen neu.",
            deeperLabel: "Tiefer einsteigen: die technischen Details",
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
            deeperLabel: "Tiefer einsteigen: die technischen Details",
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
            deeperLabel: "Tiefer einsteigen: die technischen Details",
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
    },
  },
  en: {
    documentTitle: "Daniel Popa — Senior Web Designer | Frontend Development",
    metaDescription:
      "Daniel Popa is a Senior Web Designer and Frontend Developer based in Nuremberg with 10+ years of experience in UI/UX, CSS/SCSS, WordPress, web performance and accessibility.",
    socialDescription:
      "Thoughtful design, made to work. Explore the practice and experience of Daniel Popa.",
    language: "Choose language",
    skip: "Skip to content",
    home: "Daniel Popa, home",
    timer: {
      days: "Days",
      hours: "Hrs.",
      minutes: "Min.",
      seconds: "Sec.",
      expired: "Available now",
      loading: "Countdown is loading",
      until: (days, hours, minutes, seconds) =>
        `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds until release`,
    },
    nav: {
      label: "Main navigation",
      work: "Work",
      about: "About",
      expertise: "Expertise",
      contact: "Contact",
      talk: "Let’s talk",
      open: "Open navigation menu",
      close: "Close navigation menu",
    },
    hero: {
      role: ["Senior Web Designer |", "Frontend Development"],
      intro:
        "With over 10 years of experience, I turn complex ideas into clear, thoughtful digital experiences.",
      work: "Explore my work",
      downloadCv: "Download my CV (German)",
      about: "About me",
      art: "Portrait of Daniel Popa. I live in Nuremberg, Germany, and work remotely or hybrid in the Nuremberg/Fürth area.",
      location: "Location",
      country: "Nuremberg, Germany",
      available: "AVAILABLE",
      worldwide: "Remote · Hybrid",
    },
    heroBadge: {
      exp1: "Years of experience",
      exp2: "in web design",
    },
    work: {
      eyebrow: "Behind the interface",
      title: "Small details, better experiences",
      aside:
        "Three case studies from a multi-brand publishing system: a color system that carries every brand, a page that doesn't jump while it loads, and a portal that works without a mouse. Portal and content names are fictional – the structure, tokens and color logic come from the real system. The sketches are rebuilt concept examples, not measured project results.",
      noteLabel: "Context",
      noteTab: "3 case studies",
      // Four takeaways under the heading (icon, label, text clamped to 3 lines)
      takeaways: [
        {
          icon: "target",
          label: "The approach",
          text:
            "Keep palette values reusable for any context; use semantic aliases for established roles such as links and article titles.",
        },
        {
          icon: "bulb",
          label: "Why it matters",
          text:
            "One component stylesheet serves all eight brands: a rebrand only touches the local color file, dark mode just remaps variables under [data-theme=\"dark\"], and about 4,800 gray references stay consistent everywhere – without a sprawling catalog of one-off semantic names.",
        },
        {
          icon: "puzzle",
          label: "My contribution",
          text:
            "A four-layer color strategy: a global grayscale (--gr5 to --gr93, named by % black) shared by every brand, brand primitives per portal (--PrCl, --AcCl), a few semantic roles for text, titles, links, backgrounds and buttons, and numbered light/dark pairs like --Cc25 for everything else – rolled out brand by brand.",
        },
        {
          icon: "unsemantic",
          label: "Unsemantic colors",
          text:
            "--Cc25 names a color, not a role. It holds one value for light mode and one for dark mode, and components like the countdown use it directly wherever they need the brand color without a global meaning – no new semantic alias required.",
        },
      ],
      tokenDemo: {
        label: "Sketch: a color system in four layers",
        layersTitle: "Four layers",
        modulesTitle: "One module, four variants",
        gray: "Grayscale",
        brand: "Brand",
        role: "Role",
        palette: "Palette",
        notes: [
          "The same for every brand – named by % black",
          "One value per portal – the only place a rebrand touches",
          "Recurring jobs get a name",
          "A color, not a role – one value each for light and dark",
        ],
        layersCaption: "Each layer builds on the one before – from general to specific",
        modulesCaption: "Same structure – only the tokens change",
        previewButton: "View live modules",
        previewHint: "Poll and countdown with portal and mode switches",
      },
      preview: {
        title: "Live preview",
        lead: "Real components from the system: one stylesheet for every portal, switched by tokens alone.",
        close: "Close preview",
        tokens: "Active tokens",
        uses: {
          brand: "Brand color – the poll's button and comment link",
          title: "Semantic role – the countdown title",
          tile: "Palette value – the countdown's digit tiles",
        },
        tokensNote:
          "Same components, same CSS – switching only changes these values.",
      },
      pollQuestion: "Which articles from the July 2023 issue did you enjoy?",
      pollTitle: "Readers’ favorites",
      pollLabel: "Poll results",
      participants: "participants",
      pollStart: "Jun 1, 2023, 1:45 PM",
      pollEnd: "Aug 2, 2023, 1:45 PM",
      until: "to",
      multiple: "Multiple selections: Yes",
      vote: "Log in to vote",
      comment: "Add a comment",
      commentLabel: "Add a comment, 87 comments",
      portal: "Portal",
      appearance: "Appearance",
      light: "Light",
      dark: "Dark",
      pollOptions: [
        "Hands-on: Linux gaming with Nobara",
        "Hands-on: Tune Radeon 6000 with MPT and MCT – push driver limits",
        "Other (please add a note in the thread)",
        "Review: 5× Z790 motherboards",
        "Review: 6× RTX 4000 laptops",
      ],
      countdownLabel: "Shadowstone release countdown",
      countdownButton: "All Shadowstone updates",
      release: "Release",
      releaseDate: "Nov 19",
    },
    quality: {
      cards: [
        {
          title: "One color system for eight brands",
          description:
            "Shared components that adapt to every brand and mode through tokens.",
          story: {
            situationLabel: "Situation",
            situation:
              "A publishing system runs eight portals, each with its own brand – but they share the same components, such as polls and release countdowns. Every brand needs its own colors, every module a light and a dark mode.",
            whyLabel: "Why it matters",
            why: [
              {
                term: "Maintenance",
                text: "Without a system, every brand gets its own stylesheet – and every change has to be made eight times.",
              },
              {
                term: "Consistency",
                text: "Grays, links and titles should work the same way on every portal.",
              },
              {
                term: "Clarity",
                text: "A semantic token for every single color use leads to an endless list of variables holding the same values.",
              },
            ],
            solutionLabel: "What I did",
            solutionLead:
              "Not every color use needs its own semantic token. I ordered the colors into four layers – from general to specific – and rolled them out brand by brand:",
            steps: [
              "A global grayscale from --gr5 to --gr93, named by % black – the same for every brand.",
              "Brand primitives per portal (--PrCl1, --AcCl) – the only file a rebrand touches.",
              "A few semantic roles for recurring jobs: text, titles, links, backgrounds and buttons (e.g. --lk → --PrCl1).",
              "Numbered light/dark pairs like --Cc25 for everything else – a color, not a role, usable directly in components.",
            ],
            resultLabel: "Result",
            result:
              "One component stylesheet serves all eight brands. A rebrand only touches the local color file, and dark mode just remaps variables.",
            deeperLabel: "Go deeper: the technical details",
            deeper:
              "Dark mode remaps the variables under [data-theme=\"dark\"] – the components themselves don't change. About 4,800 gray references use the same scale and stay consistent everywhere. Countdown example: the title uses the semantic role --modTtl (light → --gr80 · #333333, dark → --gr5 · #f2f2f2), the digit tiles use the unsemantic value --Cc25 (Northstar: #285b78 light, #020202 dark). Happy to walk through the details in an interview.",
          },
        },
        {
          title: "A page that doesn't jump while you read",
          description: "Keeping the page still while ads and images load.",
          story: {
            situationLabel: "Situation",
            situation:
              "Article pages are paid for by ads. The ads come from outside ad systems and load after the text – at unpredictable times and in changing sizes. Every ad pushes the content below it out of place.",
            whyLabel: "Why it matters",
            why: [
              {
                term: "Readers",
                text: "lose their place or tap the wrong thing.",
              },
              {
                term: "Accessibility",
                text: "With a screen magnifier or limited hand control, a moving page is a barrier, not an annoyance.",
              },
              {
                term: "Business",
                text: "Since June 2025 the European Accessibility Act requires many commercial websites to be accessible. Google also counts page movement as a quality signal.",
              },
            ],
            solutionLabel: "What I did",
            solutionLead:
              "The key is the right amount of room: too little and the page still jumps, too much and it leaves empty gaps.",
            steps: [
              "Reserved space for each ad slot before the ad loads, based on the sizes that actually appear.",
              "Set image sizes in advance, so the browser knows the room they need.",
              "Checked on phones and desktops, because formats and load times differ.",
            ],
            resultLabel: "Result",
            result:
              "The content is in place before the ad arrives – the page stays still while you read.",
            deeperLabel: "Go deeper: the technical details",
            deeper:
              "The measure is called Cumulative Layout Shift (CLS), one of Google's Core Web Vitals; the target is 0.1 or lower for most visits. Ad slots and images get fixed dimensions (min-height, aspect-ratio, width/height), so the browser keeps the room free from the start. The European Accessibility Act points to the standard EN 301 549, which builds on WCAG 2.1 level AA. Happy to walk through the details in an interview.",
          },
          metric:
            "CLS target: ≤ 0.1 at the 75th percentile; not measured for this concept.",
        },
        {
          title: "A gaming portal that works without a mouse",
          description:
            "Designed for readers who navigate by keyboard, switch or voice control.",
          story: {
            situationLabel: "Situation",
            situation:
              "People who love games read gaming sites too – including people who play with limited hand movement or without hands. Pages built for mouse and touch leave them behind.",
            whyLabel: "Why it matters",
            why: [
              {
                term: "Limited hand movement",
                text: "Content is reached one step at a time. A long menu before every article makes that slow and tiring, and it's easy to lose your place.",
              },
              {
                term: "Business",
                text: "Since June 2025 the European Accessibility Act requires many commercial websites to be accessible.",
              },
            ],
            solutionLabel: "What I did",
            solutionLead:
              "Pages built for mouse and touch hide their problems: a long menu before every article, focus you can't see, small click targets and motion that never stops. Fixing them means changing design and code together.",
            steps: [
              "Added a skip link – one key press jumps past the menu to the article.",
              "Made focus clearly visible, so you always see where you are.",
              "Enlarged small click targets and removed unnecessary motion.",
            ],
            resultLabel: "Result",
            result:
              "The article is one step away, and readers can see where they are at all times.",
            deeperLabel: "Go deeper: the technical details",
            deeper:
              "Related WCAG 2.2 criteria: 2.4.1 Bypass Blocks (skip link), 2.4.7 Focus Visible and 2.5.8 Target Size (Minimum). Click targets are 44 px, well above the 24 px minimum. Animations switch off when the device asks for reduced motion (prefers-reduced-motion). Happy to walk through the details in an interview.",
          },
        },
      ],
    },
    demo: {
      layoutLabel: "Layout shift example",
      before: "Before",
      after: "After",
      replay: "Replay",
      loadingBefore: "Article content loaded. Advertisement is loading.",
      loadingAfter: "Ad space reserved. Advertisement is loading.",
      loadedBefore: "Advertisement loaded. The content below shifted down.",
      loadedAfter:
        "Advertisement loaded. Reserved space kept the content in place.",
      stepTextLoads: "Text loads",
      stepReserved: "Space reserved",
      stepAdArrives: "Ad arrives",
      captionBefore: "Text jumps when the ad loads",
      captionAfter: "Nothing moves when the ad loads",
      ad: "Ad",
      read: "Read",
      skipLabel: "Example: keyboard path to the article",
      skipLink: "Skip to article",
      skipCaptionBefore: "Example: 9 key presses to reach the article",
      skipCaptionAfter: "2 key presses: Tab, then Enter",
      keyboard: {
        button: "View live demo",
        hint: "Before and after side by side – play it or try it yourself",
        title: "Live demo: to the article without a mouse",
        lead: "The three changes side by side: skip link, visible focus, large click targets without endless motion.",
        close: "Close demo",
        play: "Play key path",
        playHint: "▶ plays both paths automatically – or just press Tab and step through yourself",
        try: "Try it",
        presses: "key presses",
        path: "Key path",
        live: "Live",
        navLabel: "Main navigation",
        nav: ["News", "Reviews", "Tips", "Hardware", "Videos", "Specials", "Forum", "Subscribe"],
        article: "Article",
        skip: "Skip to article",
        skipped: "8 menu items skipped",
        articleTitle: "Shadowstone review",
        checks: {
          before: [
            "No skip link – 9 key presses to the article",
            "Focus barely visible – where am I?",
            "Small click targets, endless animation",
          ],
          after: [
            "Skip link – Tab, then Enter",
            "Clear focus ring at every step",
            "Large click targets, no endless animation",
          ],
        },
        summaryValue: "9 → 2",
        summary:
          "7 fewer key presses per article. With switch control each one is a separate press – and the focus ring always shows where you are.",
      },
    },
    about: {
      eyebrow: "A little about me",
      title: ["Design-minded.", "Build-focused"],
      noteLabel: "10+ years on the web",
      noteTab: "since 2011",
      intro:
        "I started in graphic and media design, and that's still how I work: design and front end together, from the first idea to the finished page. Since 2014 at Computec Media I've designed and built responsive websites, landing pages and WordPress front ends for a range of media brands. My focus: UI/UX, web performance and accessibility.",
    },
    // Faithful translation of the German Zwischenzeugnis (29 Sep 2026)
    testimonial: {
      eyebrow: "What others say",
      quote:
        "He communicated clearly, kindly and with a focus on solutions, and enjoyed a high level of trust and appreciation from everyone involved.",
      name: "Markus Wollny",
      role: "Head of Web Development, Computec Media",
    },
    expertise: {
      eyebrow: "The toolkit",
      title: "A considered skill set",
      aside:
        "From the first idea to a tested frontend: four disciplines that come together in my work.",
      noteLabel: "Overview",
      areaUnit: "areas",
      skillUnit: "skills",
      groups: [
        {
          icon: "interface",
          title: "UI/UX Design",
          description:
            "User-focused interfaces, from the first idea through to a tested prototype.",
          skills: ["UI concepts", "Wireframes", "Prototyping", "Mobile first"],
        },
        {
          icon: "systems",
          title: "Visual Design & Systems",
          description:
            "Clear visual direction and consistent components for digital brands.",
          skills: [
            "Design systems",
            "Figma",
            "Photoshop",
            "Illustrator",
            "Logos & corporate design",
          ],
        },
        {
          icon: "development",
          title: "Frontend & WordPress",
          description:
            "Responsive websites and carefully built frontends for every screen.",
          skills: [
            "HTML5",
            "CSS / SCSS",
            { name: "JavaScript", level: "basic knowledge" },
            { name: "React", level: "first hands-on experience" },
            "WordPress",
            { name: "PHP templates", level: "hands-on experience" },
            "HTML email development",
            "Responsive email templates",
            "CSS Grid / Flexbox",
            "Git / Vite",
          ],
        },
        {
          icon: "quality",
          title: "Quality & Accessibility",
          description:
            "Accessible, fast experiences – tested and refined with care.",
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
      title: "Experience",
      years: "years",
      more: "Read more",
      less: "Show less",
      // Oldest first: the timeline reads left → right towards today.
      // Texts follow the CV (public/Lebenslauf_Daniel_Popa.pdf) — keep both in sync.
      entries: [
        {
          range: "2008–2011",
          duration: "3 years",
          role: "Graphic & Media Designer, Digital & Print",
          company: "S.C. Noblesse S.R.L. · Sibiu, Romania",
          description:
            "Design of digital and print media, logos and corporate designs, and development of visual concepts.",
        },
        {
          range: "2011–2014",
          duration: "3 years",
          role: "Media Designer · Freelancer",
          company: "World of Cruise S.R.L. · Sibiu, Romania",
          description:
            "Design and development of websites and frontends with HTML, CSS, JavaScript and jQuery. Print and digital media, logos and corporate designs, plus client consulting.",
        },
        {
          range: "2014–2016",
          duration: "2 years",
          role: "Trainee UI/UX Design & Frontend Development",
          company: "Computec Media GmbH · Fürth, Germany",
          description:
            "Contributed to the concept, design and development of websites, landing pages and UI prototypes. Developed WordPress themes and frontend components, plus testing and performance optimization.",
        },
        {
          range: "2016 – now",
          since: 2016,
          role: "UI/UX Designer & Frontend Developer",
          company: "Computec Media GmbH · Fürth, Germany",
          description:
            "Concept, redesign and continuous optimization of responsive websites and digital applications for a range of media brands. Built a central CSS color system with semantic and reusable variables for consistent UI in light and dark mode (see case study 01). Development and maintenance of frontend components, WordPress themes and PHP templates with HTML, CSS/SCSS and JavaScript. Optimization of web performance, Core Web Vitals, accessibility and SEO. UI concepts, wireframes and prototypes in collaboration with backend, marketing and other teams, with targeted use of AI tools.",
        },
      ],
    },
    contact: {
      title: "Let’s talk",
      lead: "I’m open to new roles in UI/UX design and frontend development – remote or on-site in Nuremberg.",
      emailCta: "Email me",
      linkedin: "LinkedIn",
      email: "popadaniel.office@gmail.com",
      location: "Nuremberg, Germany",
    },
    game: {
      eyebrow: "A little extra",
      title: "Token Tournament",
      noteLabel: "Break",
      noteTab: "8 pairs · 5 mascots",
      aside:
        "A small frontend experiment with real color tokens from a publishing system. Find the pairs and collect all 5 mascots – every win unlocks a new one.",
      boardLabel: "Memory board",
      moves: "Moves",
      pairs: "Pairs",
      restart: "Shuffle again",
      newCollection: "Start a new collection",
      hidden: (n) => `Card ${n}, face down`,
      found: (token) => `Pair found: ${token}`,
      miss: "No match – the cards turn back over.",
      won: (moves) => `Done! All pairs found in ${moves} moves.`,
      wonTitle: "All pairs found!",
      mascotCount: "Mascots",
      collectionLabel: "Your mascot collection",
      collectionHint: "Win a round to unlock the next one.",
      locked: "Not discovered yet",
      newMascot: (name) => `New unlock: ${name}`,
      collectionDone: "All 5 mascots collected – you are officially a token legend!",
      mascotNames: {
        knight: "Sir Clickalot",
        dragon: "Drago",
        frog: "King Croak",
        owl: "Owlbert the Wise",
        goblin: "Gobbo the Jester",
      },
      mascots: {
        knight: "Sir Clickalot dubs you Knight of the Tokens!",
        dragon: "Drago is impressed – and only slightly jealous.",
        frog: "King Croak names you royal designer.",
        owl: "Owlbert the Wise nods approvingly. Very approvingly.",
        goblin: "Gobbo the Jester had his money on you all along!",
      },
    },
    footer: {
      description:
        "Designed and built in Nuremberg, with React, Vite and SCSS.",
      home: "Daniel Popa, back to top",
    },
  },
};

const copyrightYear = new Date().getFullYear();

// Zoom icon for the preview buttons: round lens with a plus, short handle
// pointing down-left (mirrored, so it leans towards the button text);
// one stroke weight with rounded ends (colour from the button text)
function ZoomIcon() {
  return (
    <svg className="zoom-icon" aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <circle cx="13.5" cy="10.5" r="6.5" />
      <path d="m8.5 15.5-5 5M13.5 7.75v5.5M10.75 10.5h5.5" />
    </svg>
  );
}

// Paper plane for the e-mail button: outline + centre fold, two short motion
// lines trailing behind; same line weight and round ends as the zoom icon.
// On hover the plane lifts off up-right and the trail stretches (CSS).
function PaperPlaneIcon() {
  return (
    <svg className="plane-icon" aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <g className="plane-icon__plane">
        <path d="M21 3 3.5 10.2l6.9 3.4 3.4 6.9L21 3Z" />
        <path d="m10.4 13.6 4.9-4.9" />
      </g>
      <path className="plane-icon__trail" d="m3.5 20.5 3-3M2.75 15.25l1.5-1.5" />
    </svg>
  );
}

function ArrowIcon({ diagonal = false, down = false }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      {diagonal ? (
        <path d="M5 15 15 5M6 5h9v9" />
      ) : down ? (
        <path d="M10 3v13m-5-5 5 5 5-5" />
      ) : (
        <path d="M3 10h13m-5-5 5 5-5 5" />
      )}
    </svg>
  );
}

function CountdownTimer({ text }) {
  const [now, setNow] = useState(null);
  const releaseTimestamp = Date.parse("2026-11-19T00:00:00+01:00");
  const secondsRemaining =
    now === null
      ? null
      : Math.max(0, Math.floor((releaseTimestamp - now) / 1000));
  const countdown =
    secondsRemaining === null
      ? null
      : {
          days: Math.floor(secondsRemaining / 86400),
          hours: Math.floor((secondsRemaining % 86400) / 3600),
          minutes: Math.floor((secondsRemaining % 3600) / 60),
          seconds: secondsRemaining % 60,
        };

  useEffect(() => {
    let timerId;
    const startId = window.setTimeout(() => {
      setNow(Date.now());
      timerId = window.setInterval(() => setNow(Date.now()), 1000);
    }, 0);
    return () => {
      window.clearTimeout(startId);
      window.clearInterval(timerId);
    };
  }, []);

  return (
    <>
      <div
        aria-label={
          countdown
            ? text.until(
                countdown.days,
                countdown.hours,
                countdown.minutes,
                countdown.seconds,
              )
            : text.loading
        }
        className="countdownTimer"
        role="timer"
      >
        <div className="countdownUnit">
          <span className="countdownValue fw700">
            {countdown?.days ?? "--"}
          </span>
          <span className="countdownLabel txtUp txtMuted">{text.days}</span>
        </div>
        <div className="countdownUnit">
          <span className="countdownValue fw700">
            {countdown ? String(countdown.hours).padStart(2, "0") : "--"}
          </span>
          <span className="countdownLabel txtUp txtMuted">{text.hours}</span>
        </div>
        <div className="countdownUnit">
          <span className="countdownValue fw700">
            {countdown ? String(countdown.minutes).padStart(2, "0") : "--"}
          </span>
          <span className="countdownLabel txtUp txtMuted">{text.minutes}</span>
        </div>
        <div className="countdownUnit">
          <span className="countdownValue fw700">
            {countdown ? String(countdown.seconds).padStart(2, "0") : "--"}
          </span>
          <span className="countdownLabel txtUp txtMuted">{text.seconds}</span>
        </div>
      </div>

      {secondsRemaining === 0 && (
        <div className="countdownExpired">
          <span className="countdownStatus fw700 txtCc1">{text.expired}</span>
        </div>
      )}
    </>
  );
}

// Wireframe browser window used by the practice demos (decorative)
function DemoBrowser({ children }) {
  return (
    <div className="cls-demo__frame" aria-hidden="true">
      <div className="cls-demo__chrome">
        <i />
        <i />
        <i />
        <b />
      </div>
      {children}
    </div>
  );
}

// Practice case study: Situation, Why, What I did, demo, Result, details
function QualityStory({ story, metric, children }) {
  return (
    <div className="quality-card__detail quality-story">
      <div className="quality-story__row">
        <h5>{story.situationLabel}</h5>
        <p>{story.situation}</p>
      </div>

      <div className="quality-story__row">
        <h5>{story.whyLabel}</h5>
        <ul className="quality-story__why">
          {story.why.map((item) => (
            <li key={item.term}>
              <strong>{item.term}:</strong> {item.text}
            </li>
          ))}
        </ul>
      </div>

      <div className="quality-story__row">
        <h5>{story.solutionLabel}</h5>
        <div>
          <p>{story.solutionLead}</p>
          <ol className="quality-story__steps">
            {story.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>
      </div>

      <div className="quality-story__demo">{children}</div>

      <div className="quality-story__row">
        <h5>{story.resultLabel}</h5>
        <div>
          <p>{story.result}</p>
          {metric && <p className="quality-card__metric">{metric}</p>}
        </div>
      </div>

      <div className="quality-story__row quality-story__row--plain">
        <details className="quality-story__deeper">
          <summary>{story.deeperLabel}</summary>
          <p>{story.deeper}</p>
        </details>
      </div>
    </div>
  );
}

function LayoutShiftDemo({ text, language }) {
  const [replay, setReplay] = useState(0);
  const [promoLoaded, setPromoLoaded] = useState(false);

  useEffect(() => {
    const timerId = window.setTimeout(() => setPromoLoaded(true), 1400);

    return () => window.clearTimeout(timerId);
  }, [replay]);

  const status = promoLoaded
    ? `${text.before}: ${text.loadedBefore} ${text.after}: ${text.loadedAfter}`
    : `${text.before}: ${text.loadingBefore} ${text.after}: ${text.loadingAfter}`;

  // Wireframe browser page: chrome, optional ad slot, heading, text lines, button.
  // `slot` is "none" | "reserved" | "ad"; the tap marker sits where the
  // button was before the ad loaded — it hits or misses depending on the panel.
  const frame = (slot, showTap) => (
    <DemoBrowser>
      <div className="cls-demo__page">
        <div className="cls-demo__slot" data-slot={slot}>
          {slot === "ad" && <span>{text.ad}</span>}
        </div>
        <span className="cls-demo__heading" />
        <span className="cls-demo__line" />
        <span className="cls-demo__line" />
        <span className="cls-demo__line cls-demo__line--short" />
        <span className="cls-demo__button">{text.read}</span>
        {showTap && <span className="cls-demo__tap" />}
      </div>
    </DemoBrowser>
  );

  // One comparison panel: title, "first state → ad arrives", caption
  const panel = (mode) => {
    const isBefore = mode === "before";

    return (
      <figure className="cls-demo" data-mode={mode} data-loaded={promoLoaded}>
        <h5 className="cls-demo__title">{isBefore ? text.before : text.after}</h5>
        <div className="cls-demo__stage">
          <div className="cls-demo__step">
            <span className="cls-demo__label">
              {isBefore ? text.stepTextLoads : text.stepReserved}
            </span>
            {frame(isBefore ? "none" : "reserved", false)}
          </div>
          <span className="cls-demo__arrow" aria-hidden="true" />
          <div className="cls-demo__step">
            <span className="cls-demo__label">{text.stepAdArrives}</span>
            {frame(
              promoLoaded ? "ad" : isBefore ? "none" : "reserved",
              promoLoaded,
            )}
          </div>
        </div>
        <figcaption>{isBefore ? text.captionBefore : text.captionAfter}</figcaption>
      </figure>
    );
  };

  return (
    <div className="quality-layout-demo" lang={language}>
      <div className="cls-demo__panels" role="group" aria-label={text.layoutLabel}>
        {panel("before")}
        {panel("after")}
      </div>

      <button
        className="cls-demo__replay"
        onClick={() => {
          setPromoLoaded(false);
          setReplay((current) => current + 1);
        }}
        type="button"
      >
        {text.replay}
      </button>

      <p
        className="quality-layout-demo__status"
        aria-live="polite"
        role="status"
      >
        {status}
      </p>
    </div>
  );
}

// Keyboard path to the article. Each tick is one key press:
// Before: Tab walks through 8 menu items, the 9th press reaches the article.
// After: Tab focuses the skip link, Enter jumps straight to the article.
const SKIP_DEMO_STEPS = 9;

const prefersReducedMotion = () =>
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

// With reduced motion the demo shows its final state and never animates
const skipDemoStart = () => (prefersReducedMotion() ? SKIP_DEMO_STEPS : 0);

function SkipLinkDemo({ text, onPreview }) {
  const [replay, setReplay] = useState(0);
  const [step, setStep] = useState(skipDemoStart);

  useEffect(() => {
    if (prefersReducedMotion()) return undefined;

    let current = 0;
    const timerId = window.setInterval(() => {
      current += 1;
      setStep(current);
      if (current >= SKIP_DEMO_STEPS) window.clearInterval(timerId);
    }, 450);

    return () => window.clearInterval(timerId);
  }, [replay]);

  const articleBody = (
    <>
      <span className="skip-demo__heading" />
      <span className="cls-demo__line" />
      <span className="cls-demo__line" />
      <span className="cls-demo__line cls-demo__line--short" />
    </>
  );

  return (
    <div className="quality-layout-demo">
      <div className="cls-demo__panels" role="group" aria-label={text.skipLabel}>
        <figure className="cls-demo skip-demo">
          <h5 className="cls-demo__title">{text.before}</h5>
          <DemoBrowser>
            <div className="skip-demo__page">
              {/* Same labelled menu as the live demo; focus walks through it */}
              <ul className="skip-demo__menu">
                {text.keyboard.nav.map((item, index) => (
                  <li key={item} data-focused={step === index + 1}>
                    {item}
                  </li>
                ))}
              </ul>
              <div
                className="skip-demo__article"
                data-focused={step >= SKIP_DEMO_STEPS}
              >
                {step >= SKIP_DEMO_STEPS && (
                  <span className="skip-demo__count">{SKIP_DEMO_STEPS}</span>
                )}
                {articleBody}
              </div>
            </div>
          </DemoBrowser>
          <figcaption>{text.skipCaptionBefore}</figcaption>
        </figure>

        <figure className="cls-demo skip-demo">
          <h5 className="cls-demo__title">{text.after}</h5>
          <DemoBrowser>
            <div className="skip-demo__page">
              <span className="skip-demo__skip" data-focused={step === 1}>
                {text.skipLink}
              </span>
              {step >= 2 && <span className="skip-demo__jump" />}
              {/* The same menu, larger targets; fades once it has been skipped */}
              <ul
                className="skip-demo__menu skip-demo__menu--after"
                data-skipped={step >= 2}
              >
                {text.keyboard.nav.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="skip-demo__article" data-focused={step >= 2}>
                {articleBody}
              </div>
            </div>
          </DemoBrowser>
          <figcaption>{text.skipCaptionAfter}</figcaption>
        </figure>
      </div>

      <div className="ds-demo__cta">
        <button
          className="cls-demo__replay"
          onClick={() => {
            setStep(skipDemoStart());
            setReplay((current) => current + 1);
          }}
          type="button"
        >
          {text.replay}
        </button>
        <button className="ds-demo__preview" onClick={onPreview} type="button">
          {text.keyboard.button}
          <ZoomIcon />
        </button>
        <span>{text.keyboard.hint}</span>
      </div>
    </div>
  );
}

function PollModule({ text, domain, theme }) {
  const participants = 25;

  return (
    <div className="pollModuleShell" data-domain={domain} data-theme={theme}>
      <div className="pollModule">
        <header className="pollModule__header">
          <h4>{text.pollTitle}</h4>
        </header>

        <div className="pollModule__question">
          <PollMark type="question" className="pollModule__question-mark" />
          <h5>{text.pollQuestion}</h5>
        </div>

        <ul className="pollModule__options" aria-label={text.pollLabel}>
          {text.pollOptions.slice(0, 5).map((label, index) => {
            const votes = [9, 12, 2, 5, 3, 7, 6][index];
            const percentage = Math.round((votes / participants) * 100);

            return (
              <li className="pollModule__option" key={label}>
                <span className="pollModule__option-label">{label}</span>
                <span className="pollModule__percentage">{percentage}%</span>
                <span className="pollModule__track" aria-hidden="true">
                  <span
                    className="pollModule__bar"
                    style={{ width: `${percentage}%` }}
                  />
                </span>
              </li>
            );
          })}
        </ul>

        <footer className="pollModule__footer">
          <p className="pollModule__meta">
            <PollMark type="exclamation" className="pollModule__info-mark" />
            <span>
              <strong>
                {participants} {text.participants}
              </strong>
              <span className="pollModule__meta-divider" aria-hidden="true">
                /
              </span>
              <time dateTime="2023-06-01T13:45">{text.pollStart}</time>
              <span>{text.until}</span>
              <time dateTime="2023-08-02T13:45">{text.pollEnd}</time>
              <span className="pollModule__meta-divider" aria-hidden="true">
                /
              </span>
              <span>{text.multiple}</span>
            </span>
          </p>
          <div className="pollModule__actions">
            <button className="pollModule__login" type="button">
              {text.vote}
            </button>
            <a
              aria-label={text.commentLabel}
              className="pollModule__comment"
              href="mailto:popadaniel.office@gmail.com?subject=Kommentar%20zur%20Umfrage"
            >
              <span>{text.comment}</span>
              <span aria-hidden="true">·</span>
              <PollMark type="comment" className="pollModule__comment-mark" />
              <span>87</span>
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}

function CountdownModule({ text, timerText, language, domain, theme }) {
  return (
    <section
      aria-label={`${countdownDomains[domain].name}: ${text.countdownLabel}`}
      className="CountdownModule posRel"
      data-domain={domain}
      data-theme={theme}
    >
      <div className="countdownContent flx flxDirCol flxJustBtw p-5">
        <div className="countdownHead">
          <h4 className="countdownTitle txtCc1">
            <span className="countdownTitleGame">Shadowstone:</span>
            <span className="countdownReleaseTitle">
              {language === "de" ? "Der Release-Countdown" : "Release countdown"}
            </span>
          </h4>
        </div>
        <div className="countdownBottom">
          <CountdownTimer text={timerText} />
          <a className="countdownButton btn txtUp fw700" href="#experience">
            {text.countdownButton}
            <span className="countdownArrow" aria-hidden="true">
              →
            </span>
          </a>
        </div>
      </div>
      <div className="countdownStage posRel ovHidd">
        <img
          alt=""
          className="countdownImage posAbs top0 left0 w100 h100"
          height="562"
          loading="lazy"
          src={`${import.meta.env.BASE_URL}shadowstone-countdown.png`}
          width="999"
        />
      </div>
      <time className="countdownBadge flx flxDirCol fw700" dateTime="2026-11-19">
        <span className="countdownBadgeLabel txtUp">{text.release}</span>
        <span className="countdownBadgeDate">{text.releaseDate}</span>
        <span className="countdownBadgeYear">2026</span>
      </time>
    </section>
  );
}

// Global grayscale shown in the token sketch (name = % black)
const grayScale = [
  ["--gr5", "#f2f2f2"],
  ["--gr20", "#cccccc"],
  ["--gr50", "#808080"],
  ["--gr80", "#333333"],
  ["--gr93", "#121212"],
];

const sketchVariants = [
  ["northstar", "light"],
  ["afterglow", "light"],
  ["northstar", "dark"],
  ["afterglow", "dark"],
];

// Connector between neighbouring screens: which part it links
const sketchLinks = ["tiles", "title", "button"];

// Countdown wireframe as a phone screen (mobile layout of the real module):
// image + release badge, tag, title, four digit tiles, button.
// Monochrome line style; tiles and button take the variant's token colour.
// `link` draws a connector to the same part on the next screen.
function MiniCountdown({ link }) {
  return (
    <div className="ds-cd">
      <span className="ds-cd__image">
        <span className="ds-cd__badge" />
      </span>
      <span className="ds-cd__tag" />
      <span className="ds-cd__title">
        <b />
        <b />
      </span>
      <span className="ds-cd__tiles">
        {[0, 1, 2, 3].map((tile) => (
          <span key={tile}>
            <i />
            <b />
          </span>
        ))}
      </span>
      <span className="ds-cd__button" />
      {link && <span className="ds-link" data-link={link} />}
    </div>
  );
}

// Case 01 sketch: the four token layers next to one module in four variants
function TokenSystemDemo({ text, onPreview }) {
  const demo = text.tokenDemo;
  const north = countdownDomains.northstar;

  return (
    <div className="quality-layout-demo">
      <div className="cls-demo__panels" role="group" aria-label={demo.label}>
        <figure className="cls-demo ds-demo">
          <h5 className="cls-demo__title">{demo.layersTitle}</h5>
          <ol className="ds-layers">
            <li>
              <span className="ds-layers__name">{demo.gray}</span>
              <span className="ds-layers__chips">
                {grayScale.map(([token, value]) => (
                  <i key={token} style={{ background: value }} title={`${token} · ${value}`} />
                ))}
              </span>
              <code>--gr5 … --gr93</code>
              <p className="ds-layers__note">{demo.notes[0]}</p>
            </li>
            <li>
              <span className="ds-layers__name">{demo.brand}</span>
              <span className="ds-layers__chips">
                {Object.values(countdownDomains).map((portal) => (
                  <i
                    key={portal.name}
                    style={{ background: portal.cc25 }}
                    title={`${portal.name} · ${portal.cc25}`}
                  />
                ))}
              </span>
              <code>--PrCl1</code>
              <p className="ds-layers__note">{demo.notes[1]}</p>
            </li>
            <li>
              <span className="ds-layers__name">{demo.role}</span>
              <span className="ds-layers__pills">
                <span>
                  <i style={{ background: north.cc25 }} />
                  --lk → --PrCl1
                </span>
                <span>
                  <i style={{ background: "#333333" }} />
                  --modTtl → --gr80
                </span>
              </span>
              <p className="ds-layers__note">{demo.notes[2]}</p>
            </li>
            <li>
              <span className="ds-layers__name">{demo.palette}</span>
              <span className="ds-layers__chips">
                <i
                  className="ds-layers__split"
                  style={{ "--split-a": north.cc25, "--split-b": north.cc25Dark }}
                />
              </span>
              <code>
                --Cc25 · {text.light} / {text.dark}
              </code>
              <p className="ds-layers__note">{demo.notes[3]}</p>
            </li>
          </ol>
          <figcaption>{demo.layersCaption}</figcaption>
        </figure>

        <figure className="cls-demo ds-demo">
          <h5 className="cls-demo__title">{demo.modulesTitle}</h5>
          <div className="ds-variants" aria-hidden="true">
            {sketchVariants.map(([domain, theme], index) => (
              <div
                className="ds-mini"
                data-domain={domain}
                data-theme={theme}
                key={`${domain}-${theme}`}
              >
                <span className="ds-mini__label">
                  {countdownDomains[domain].name} · {theme === "light" ? text.light : text.dark}
                </span>
                <MiniCountdown link={sketchLinks[index]} />
              </div>
            ))}
          </div>
          <figcaption>{demo.modulesCaption}</figcaption>
        </figure>
      </div>

      <div className="ds-demo__cta">
        <button className="ds-demo__preview" onClick={onPreview} type="button">
          {demo.previewButton}
          <ZoomIcon />
        </button>
        <span>{demo.previewHint}</span>
      </div>
    </div>
  );
}

function PreviewSwitcher({ legend, options, value, onChange }) {
  return (
    <fieldset className="module-preview__switcher">
      <legend>{legend}</legend>
      <div>
        {options.map(([key, label]) => (
          <button
            aria-pressed={value === key}
            key={key}
            onClick={() => onChange(key)}
            type="button"
          >
            {label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

// Modal window with the real poll + countdown, switched by portal and mode
// Modal shell shared by the live previews: header, close, toolbar, body.
// The body only mounts while open (timers, focus, counters start fresh).
function PreviewDialog({ open, onClose, title, lead, closeLabel, toolbar, children }) {
  const dialogRef = useRef(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      aria-labelledby={titleId}
      className="module-preview"
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose();
      }}
      onClose={onClose}
      ref={dialogRef}
    >
      {open && (
        <div className="module-preview__inner">
          <header className="module-preview__header">
            <div>
              <h4 id={titleId}>{title}</h4>
              <p>{lead}</p>
            </div>
            <button
              aria-label={closeLabel}
              className="module-preview__close"
              onClick={onClose}
              type="button"
            >
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path d="M3.5 3.5l9 9m0-9l-9 9" />
              </svg>
            </button>
          </header>
          {toolbar && <div className="module-preview__toolbar">{toolbar}</div>}
          {children}
        </div>
      )}
    </dialog>
  );
}

// Portal + mode switchers used by both previews
function PortalThemeSwitchers({ text, domain, theme, onDomain, onTheme }) {
  return (
    <>
      <PreviewSwitcher
        legend={text.portal}
        onChange={onDomain}
        options={Object.entries(countdownDomains).map(([key, item]) => [key, item.name])}
        value={domain}
      />
      <PreviewSwitcher
        legend={text.appearance}
        onChange={onTheme}
        options={[
          ["light", text.light],
          ["dark", text.dark],
        ]}
        value={theme}
      />
    </>
  );
}

function ModulePreview({ open, onClose, text, timerText, language }) {
  const [domain, setDomain] = useState("northstar");
  const [theme, setTheme] = useState("light");
  const portal = countdownDomains[domain];
  const preview = text.preview;

  const isLight = theme === "light";
  // What drives the modules right now: [token, value, where it is used]
  const tokens = [
    ["--PrCl1", portal.cc25, preview.uses.brand],
    [
      isLight ? "--modTtl → --gr80" : "--modTtl → --gr5",
      isLight ? "#333333" : "#f2f2f2",
      preview.uses.title,
    ],
    ["--Cc25", isLight ? portal.cc25 : "#020202", preview.uses.tile],
  ];

  return (
    <PreviewDialog
      closeLabel={preview.close}
      lead={preview.lead}
      onClose={onClose}
      open={open}
      title={preview.title}
      toolbar={
        <PortalThemeSwitchers
          domain={domain}
          onDomain={setDomain}
          onTheme={setTheme}
          text={text}
          theme={theme}
        />
      }
    >
      <div className="module-preview__stage" data-theme={theme}>
        <div className="module-preview__countdown">
          <CountdownModule
            domain={domain}
            language={language}
            text={text}
            theme={theme}
            timerText={timerText}
          />
        </div>
        <div className="module-preview__poll">
          <PollModule text={text} domain={domain} theme={theme} />
        </div>
        <aside className="module-preview__tokens" aria-label={preview.tokens}>
          <h5>{preview.tokens}</h5>
          <dl>
            {tokens.map(([token, value, use]) => (
              <div key={use}>
                <i style={{ background: value }} aria-hidden="true" />
                <dt>
                  <code>{token}</code>
                  <span>{use}</span>
                </dt>
                <dd>
                  <code>{value}</code>
                </dd>
              </div>
            ))}
          </dl>
          <p>{preview.tokensNote}</p>
        </aside>
      </div>
    </PreviewDialog>
  );
}

// Case 03 live demo — the sketch made playable. Each step is one key press:
// before: Tab through 8 menu items, the 9th Tab reaches the article
// after:  Tab focuses the skip link, Enter jumps to the article
const KEY_PATHS = {
  before: [
    ...Array.from({ length: 8 }, (_, index) => ["Tab", `m${index}`]),
    ["Tab", "article"],
  ],
  after: [
    ["Tab", "skip"],
    ["Enter", "article"],
  ],
};
const KEY_PATH_STEPS = KEY_PATHS.before.length;
const idleKeyboardPanel = { pos: null, keys: [], active: false };

// One page of the comparison: mini site, key path, checklist, "try it"
function KeyboardPanel({ variant, text, label, caption, brand, view, onTry, onKey, onPos }) {
  const startRef = useRef(null);
  const articleRef = useRef(null);
  const articleId = useId();
  const isAfter = variant === "after";
  const path = KEY_PATHS[variant];
  const reached = view.pos === "article";
  const slots = Math.max(path.length, view.keys.length);
  // Where a key press lands: a menu item, the skip link or the article
  const targetLabel = (target) =>
    target === "skip"
      ? text.skip
      : target === "article"
        ? text.article
        : text.nav[Number(target.slice(1))];
  // The drawn focus always follows real focus — the native ring is replaced
  const focusTo = (target) => () => onPos(target);

  return (
    <section className="kbdRace__panel" data-variant={variant} aria-label={label}>
      <header className="kbdRace__head">
        <h5>{label}</h5>
        <p className="kbdRace__count" aria-live="polite">
          <strong>{view.keys.length}</strong>
          <span>{text.presses}</span>
        </p>
      </header>

      <div
        className="kbdRace__page"
        onKeyDown={(event) => {
          if (view.active && !reached && (event.key === "Tab" || event.key === "Enter")) {
            onKey(event.key);
          }
        }}
      >
        <span className="kbdRace__start" ref={startRef} tabIndex={-1} />
        <div className="kbdRace__bar">
          <b>{brand}</b>
          <span className="kbdRace__live">{text.live}</span>
        </div>

        {isAfter && (
          <a
            className="kbdRace__skip"
            data-current={view.pos === "skip"}
            href={`#${articleId}`}
            onClick={(event) => {
              event.preventDefault();
              articleRef.current?.focus();
            }}
            onFocus={focusTo("skip")}
          >
            {text.skip}
          </a>
        )}

        {/* The same main navigation in both versions */}
        <nav aria-label={text.navLabel} className="kbdRace__nav" data-skipped={isAfter && reached}>
          <ul className="kbdRace__menu">
            {text.nav.map((item, index) => (
              <li key={item}>
                <a
                  data-current={view.pos === `m${index}`}
                  href="#"
                  onClick={(event) => event.preventDefault()}
                  onFocus={focusTo(`m${index}`)}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        {isAfter && reached && (
          <span className="kbdRace__skipped">↓ {text.skipped}</span>
        )}

        <article
          className="kbdRace__article"
          data-current={reached}
          id={articleId}
          onFocus={focusTo("article")}
          ref={articleRef}
          // before: the 9th Tab stop (like the article's first link);
          // after: reached through the skip link only
          tabIndex={isAfter ? -1 : 0}
        >
          {reached && <span className="kbdRace__badge">{view.keys.length}</span>}
          <strong>{text.articleTitle}</strong>
          <i />
          <i />
          <i />
        </article>
      </div>

      <div className="kbdRace__path">
        <span>{text.path}</span>
        <ol>
          {Array.from({ length: slots }, (_, index) => (
            <li data-filled={index < view.keys.length} key={index}>
              <b>{view.keys[index] ?? path[index]?.[0]}</b>
              {path[index] && <span>{targetLabel(path[index][1])}</span>}
            </li>
          ))}
        </ol>
      </div>

      <ul className="kbdRace__checks">
        {text.checks[variant].map((item) => (
          <li data-ok={isAfter} key={item}>
            {/* SVG instead of ✕/✓ glyphs: centres exactly, independent of the font */}
            <span aria-hidden="true">
              <svg viewBox="0 0 16 16">
                <path d={isAfter ? "M3.5 8.4l3 3 6-6.6" : "M4.5 4.5l7 7m0-7l-7 7"} />
              </svg>
            </span>
            {item}
          </li>
        ))}
      </ul>

      <footer className="kbdRace__foot">
        <p>{caption}</p>
        <button
          onClick={() => {
            onTry();
            startRef.current?.focus();
          }}
          type="button"
        >
          {text.try}
        </button>
      </footer>
    </section>
  );
}

// Case 03 preview — no portal/mode switches: this case is about the key path,
// not about theming, so it always shows one portal in light mode
function KeyboardPreview({ open, onClose, text }) {
  const keyboard = text.keyboard;

  return (
    <PreviewDialog
      closeLabel={keyboard.close}
      lead={keyboard.lead}
      onClose={onClose}
      open={open}
      title={keyboard.title}
    >
      <KeyboardRace
        brand={countdownDomains.northstar.name}
        domain="northstar"
        text={text}
        theme="light"
      />
    </PreviewDialog>
  );
}

// Plays both key paths side by side, or follows the visitor's real focus
function KeyboardRace({ text, domain, theme, brand }) {
  const keyboard = text.keyboard;
  const [mode, setMode] = useState("play");
  const [tick, setTick] = useState(() => (prefersReducedMotion() ? KEY_PATH_STEPS : 0));
  const [playId, setPlayId] = useState(0);
  const [manual, setManual] = useState({
    before: idleKeyboardPanel,
    after: idleKeyboardPanel,
  });
  // Was the last input a Tab? Then focus entering a page came from a key
  // press outside it (e.g. the play button) and counts as press no. 1.
  const lastKeyWasTab = useRef(false);

  useEffect(() => {
    const onKeyDown = (event) => {
      lastKeyWasTab.current = event.key === "Tab";
    };
    const onPointerDown = () => {
      lastKeyWasTab.current = false;
    };
    window.addEventListener("keydown", onKeyDown, true);
    window.addEventListener("pointerdown", onPointerDown, true);
    return () => {
      window.removeEventListener("keydown", onKeyDown, true);
      window.removeEventListener("pointerdown", onPointerDown, true);
    };
  }, []);

  useEffect(() => {
    if (mode !== "play" || prefersReducedMotion()) return undefined;
    let current = 0;
    const timerId = window.setInterval(() => {
      current += 1;
      setTick(current);
      if (current >= KEY_PATH_STEPS) window.clearInterval(timerId);
    }, 550);
    return () => window.clearInterval(timerId);
  }, [mode, playId]);

  const viewOf = (variant) => {
    if (mode === "manual") return manual[variant];
    const steps = KEY_PATHS[variant].slice(0, tick);
    return {
      pos: steps.at(-1)?.[1] ?? null,
      keys: steps.map(([key]) => key),
      active: false,
    };
  };

  const updatePanel = (variant, change) =>
    setManual((current) => ({
      ...current,
      [variant]: { ...current[variant], ...change(current[variant]) },
    }));

  const panel = (variant) => (
    <KeyboardPanel
      brand={brand}
      caption={variant === "before" ? text.skipCaptionBefore : text.skipCaptionAfter}
      label={variant === "before" ? text.before : text.after}
      onKey={(key) => updatePanel(variant, (state) => ({ keys: [...state.keys, key] }))}
      onPos={(pos) => {
        // Focus moved inside a page: stop the animation and follow the visitor.
        // Entering a page that isn't mid-run starts a fresh run.
        setMode("manual");
        updatePanel(variant, (state) => ({
          pos,
          keys: state.active ? state.keys : lastKeyWasTab.current ? ["Tab"] : [],
          active: pos !== "article",
        }));
      }}
      onTry={() => {
        setMode("manual");
        setManual({
          before: idleKeyboardPanel,
          after: idleKeyboardPanel,
          [variant]: { pos: null, keys: [], active: true },
        });
      }}
      text={keyboard}
      variant={variant}
      view={viewOf(variant)}
    />
  );

  return (
    <div className="kbdRace" data-domain={domain} data-theme={theme}>
      <div className="kbdRace__controls">
        <button
          className="ds-demo__preview"
          onClick={() => {
            setMode("play");
            setTick(prefersReducedMotion() ? KEY_PATH_STEPS : 0);
            setPlayId((current) => current + 1);
          }}
          type="button"
        >
          {keyboard.play}
          <span aria-hidden="true">▶</span>
        </button>
        <span>{keyboard.playHint}</span>
      </div>

      <div className="kbdRace__panels">
        {panel("before")}
        {panel("after")}
      </div>

      <div className="kbdRace__summary">
        <strong>{keyboard.summaryValue}</strong>
        <p>{keyboard.summary}</p>
      </div>
    </div>
  );
}

// Language switch: "DE / EN" as plain text. The active language is ink with
// an accent underline; the other one is muted and darkens on hover.
function LanguageSwitcher({ language, onChange, label }) {
  const options = [
    ["de", "DE", "Deutsch"],
    ["en", "EN", "English"],
  ];

  return (
    <div className="language-switch" role="group" aria-label={label}>
      {options.map(([code, short, name], index) => (
        <Fragment key={code}>
          {index > 0 && (
            <span className="language-switch__divider" aria-hidden="true">
              /
            </span>
          )}
          <button
            aria-label={name}
            aria-pressed={language === code}
            className="language-switch__option"
            onClick={() => onChange(code)}
            type="button"
          >
            {short}
          </button>
        </Fragment>
      ))}
    </div>
  );
}

// Win mascots — medieval characters in the icon style (white faces, ink
// outline, teal/gold accents, no shadow). One is picked at random
// for every won game; the caption comes from text.game.mascots[key].
const WIN_MASCOTS = {
  // Knight helmet: googly eyes peek through the visor slit, gold plume
  knight: (
    <>
      <path className="is-gold" d="M32 12c1.5-6.5 8-10 15-8.6-3.2 1.8-4.3 4.9-4 8.3-3.6-2.3-7.6-2.2-11 .3Z" />
      <path d="M15 56V30c0-11 7.6-18.5 17-18.5S49 19 49 30v26Z" />
      <path className="is-line" d="M32 12v14" />
      <rect className="is-ink" x="18" y="28" width="28" height="10" rx="5" />
      <circle cx="26" cy="33" r="4" />
      <circle cx="38" cy="33" r="4" />
      <circle className="is-ink" cx="27.4" cy="34" r="1.8" />
      <circle className="is-ink" cx="36.7" cy="31.9" r="1.8" />
      <circle className="is-ink" cx="26" cy="44" r="1.2" />
      <circle className="is-ink" cx="32" cy="44" r="1.2" />
      <circle className="is-ink" cx="38" cy="44" r="1.2" />
      <path className="is-teal" d="M15 50h34v6H15Z" />
    </>
  ),
  // Little dragon: curved gold horns, back spikes, nostrils, two fangs, smoke
  dragon: (
    <>
      <path className="is-gold" d="M18 27c-3.5-5-3.8-11.5.4-16 0 4.4 2.2 7.6 5.6 9.6Z" />
      <path className="is-gold" d="M46 27c3.5-5 3.8-11.5-.4-16 0 4.4-2.2 7.6-5.6 9.6Z" />
      <path className="is-gold" d="m25.5 22 3-7.5 3 7.5Zm7 0 3-7.5 3 7.5Z" />
      <path className="is-teal" d="M9 38c0-10.5 10.3-18.5 23-18.5S55 27.5 55 38c0 9.5-7.5 16-23 16S9 47.5 9 38Z" />
      <path className="is-line" d="M18 26.5 27 29M46 26.5 37 29" />
      <circle cx="23" cy="33" r="5.2" />
      <circle cx="41" cy="33" r="5.2" />
      <circle className="is-ink" cx="24.3" cy="32.2" r="2.2" />
      <circle className="is-ink" cx="42.3" cy="32.2" r="2.2" />
      <circle className="is-ink" cx="28.5" cy="41.5" r="1.3" />
      <circle className="is-ink" cx="35.5" cy="41.5" r="1.3" />
      <path className="is-line" d="M20 46.5c7.5 4.5 16.5 4.5 24 0" />
      <path d="m24 47.6 1.8 4.2 1.8-3.4Z" />
      <path d="m36.4 48.4 1.8 3.4 1.8-4.2Z" />
      <circle cx="53" cy="23" r="3" />
      <circle cx="57.5" cy="16.5" r="2.2" />
      <circle cx="60.5" cy="11" r="1.5" />
    </>
  ),
  // Frog king: crown between the eye bumps, rosy cheeks, huge grin
  frog: (
    <>
      <circle className="is-teal" cx="20" cy="28" r="9" />
      <circle className="is-teal" cx="44" cy="28" r="9" />
      <ellipse className="is-teal" cx="32" cy="42" rx="24" ry="15" />
      <circle cx="20" cy="27" r="5.5" />
      <circle cx="44" cy="27" r="5.5" />
      <circle className="is-ink" cx="21" cy="28" r="2.4" />
      <circle className="is-ink" cx="43" cy="28" r="2.4" />
      <path className="is-gold" d="M24.5 22V10l4.2 4.6L32 7.5l3.3 7.1 4.2-4.6v12Z" />
      <circle className="is-gold" cx="15" cy="45" r="3" />
      <circle className="is-gold" cx="49" cy="45" r="3" />
      <path className="is-line" d="M17 40c7.5 9 22.5 9 30 0" />
    </>
  ),
  // Wise owl in a starry wizard hat
  owl: (
    <>
      <circle cx="32" cy="41" r="19" />
      <path className="is-teal" d="M17 27 32 2l15 25Z" />
      <circle className="is-gold" cx="29" cy="15" r="1.6" />
      <circle className="is-gold" cx="35" cy="21" r="1.3" />
      <ellipse className="is-teal" cx="32" cy="27.5" rx="21" ry="3.6" />
      <path className="is-line" d="M17.5 32.5 25 35M46.5 32.5 39 35" />
      <circle cx="24.5" cy="40" r="6.5" />
      <circle cx="39.5" cy="40" r="6.5" />
      <circle className="is-gold" cx="24.5" cy="40" r="3.6" />
      <circle className="is-gold" cx="39.5" cy="40" r="3.6" />
      <circle className="is-ink" cx="24.5" cy="40" r="1.7" />
      <circle className="is-ink" cx="39.5" cy="40" r="1.7" />
      <path className="is-gold" d="m29 47 3 5.5 3-5.5Z" />
    </>
  ),
  // Goblin jester: pointy ears, two-tip hat with bells, odd eyes, one tooth
  goblin: (
    <>
      <path className="is-teal" d="M19 37 3 28l14 15Z" />
      <path className="is-teal" d="m45 37 16-9-14 15Z" />
      <ellipse className="is-teal" cx="32" cy="40" rx="15" ry="16" />
      <path d="M16.5 30c2-9.5 8.5-15 15.5-15s13.5 5.5 15.5 15Z" />
      <path className="is-gold" d="M19 27 9 11l12 7Z" />
      <path className="is-gold" d="m45 27 10-16-12 7Z" />
      <circle className="is-gold" cx="9" cy="11" r="2.4" />
      <circle className="is-gold" cx="55" cy="11" r="2.4" />
      <circle cx="26" cy="37" r="5" />
      <circle cx="39" cy="38" r="3.4" />
      <circle className="is-ink" cx="26.8" cy="37.8" r="2.1" />
      <circle className="is-ink" cx="38.6" cy="38.4" r="1.4" />
      <ellipse className="is-teal" cx="32.5" cy="43" rx="3" ry="2.4" />
      <path className="is-line" d="M24 48c5 4 11 4 16 0" />
      <path d="M30.5 49.6h3v3.2h-3Z" />
    </>
  ),
};

const WIN_MASCOT_KEYS = Object.keys(WIN_MASCOTS);

// Card-back emblem in the ring style of the number marks: a kite shield with
// a light red rim, a fine light edge and a white face, carrying a king's head
// as red line art (redrawn after the reference icon: crenellated crown with
// a heart, closed eyes, curled moustache, pointed beard).
const SHIELD_PATH =
  "M32 4 53 10.2q3.6 1.3 3.6 5.2L55.8 40Q53.8 53 32 67.4 10.2 53 8.2 40L7.4 15.4q0-3.9 3.6-5.2Z";

function ShieldEmblem() {
  return (
    <svg className="win-mascot token-memory__mascot" viewBox="0 0 64 72" aria-hidden="true">
      <path className="shield__rim" d={SHIELD_PATH} />
      <path className="shield__edge" d={SHIELD_PATH} />
      <path className="shield__face" d={SHIELD_PATH} />
      {/* King — drawn on a 40 × 48 grid, centred on the face */}
      <g className="shield__king" transform="translate(14.8 15.6) scale(.86)">
        {/* Crown: three crenellated towers, band, heart */}
        <path d="M7 15V5h5v3h4V3h8v5h4V5h5v10Z" />
        <path d="M7 11h26" />
        <path d="M20 9.4l-1.9-1.9a1.15 1.15 0 0 1 1.9-1.3 1.15 1.15 0 0 1 1.9 1.3Z" />
        {/* Head: sides and jaw, hair tufts */}
        <path d="M8.5 15v12c0 4 1.6 7 4 9M31.5 15v12c0 4-1.6 7-4 9" />
        <path d="M8.5 18 6.3 21M31.5 18l2.2 3" />
        {/* Brows, closed eyes, nose */}
        <path d="M11.5 19.2q2.8-1.8 5.6 0M22.9 19.2q2.8-1.8 5.6 0" />
        <path d="M12 22.4q2.5 1.5 5 0M23 22.4q2.5 1.5 5 0" />
        <path d="M20 19.5V28q-1.2 1-2.6.4" />
        {/* Curled moustache, mouth */}
        <path d="M20 30.4c-2.2-1.9-5.6-1.6-7.4.8-.5.8.4 1.6 1.1.9M20 30.4c2.2-1.9 5.6-1.6 7.4.8.5.8-.4 1.6-1.1.9" />
        <path d="M17.8 33.4h4.4" />
        {/* Pointed beard with two curls */}
        <path d="M12.5 33c0 6.4 3.4 11 7.5 14 4.1-3 7.5-7.6 7.5-14" />
        <path d="M17 37.5q2 1.8 0 4M23 37.5q-2 1.8 0 4" />
      </g>
    </svg>
  );
}

function WinMascot({ name }) {
  return (
    <svg className="win-mascot" viewBox="0 0 64 64" aria-hidden="true">
      {WIN_MASCOTS[name]}
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Token memory — small extra game (styles: _game.scss). Real colour tokens
// from a publishing system; the ad-module tokens (--obEnd…) are abstracted
// to a generic --adSrc. No saving: state lives only in this component.
// ---------------------------------------------------------------------------

const MEMORY_TOKENS = [
  { token: "--PrCl1", hex: "#134b7d", role: { de: "Primär · Dunkelblau", en: "Primary · dark blue" } },
  { token: "--PrCl2", hex: "#1f79c9", role: { de: "Primär · Blau", en: "Primary · blue" } },
  { token: "--PrCl4", hex: "#071a2a", role: { de: "Primär · Navy", en: "Primary · navy" } },
  { token: "--AcCl1", hex: "#ffdd00", role: { de: "Akzent · Gelb", en: "Accent · yellow" } },
  { token: "--AcCl2", hex: "#e90000", role: { de: "Akzent · Rot", en: "Accent · red" } },
  { token: "--AcCl5", hex: "#ff8d11", role: { de: "Akzent · Orange", en: "Accent · orange" } },
  { token: "--badgePltBg", hex: "#2b8701", role: { de: "Badge · 4,5:1", en: "Badge · 4.5:1" } },
  { token: "--adSrc", hex: "#575757", role: { de: "Werbemodul · Quelle", en: "Ad module · source" } },
];

function shuffleDeck() {
  const deck = MEMORY_TOKENS.flatMap((card, pair) => [
    { ...card, pair, id: `${pair}a` },
    { ...card, pair, id: `${pair}b` },
  ]);
  for (let i = deck.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

function TokenMemory({ text, language }) {
  const [deck, setDeck] = useState(shuffleDeck);
  const [open, setOpen] = useState([]); // ids of the face-up, unmatched cards (max. 2)
  const [matched, setMatched] = useState([]); // matched pair indexes
  const [moves, setMoves] = useState(0);
  const [status, setStatus] = useState("");
  // Mascot for the current round + collection of unlocked mascots (no saving)
  const [mascot, setMascot] = useState(
    () => WIN_MASCOT_KEYS[Math.floor(Math.random() * WIN_MASCOT_KEYS.length)],
  );
  const [discovered, setDiscovered] = useState([]);
  const busy = open.length === 2;
  const won = matched.length === MEMORY_TOKENS.length;
  // All mascots collected: the next shuffle starts a fresh collection
  const complete = discovered.length === WIN_MASCOT_KEYS.length;

  // Second card turned: keep the pair, otherwise turn both back after a moment
  useEffect(() => {
    if (open.length !== 2) return undefined;
    const [a, b] = open.map((id) => deck.find((card) => card.id === id));
    if (a.pair === b.pair) {
      const next = [...matched, a.pair];
      setMatched(next);
      setOpen([]);
      if (next.length === MEMORY_TOKENS.length) {
        setDiscovered((current) =>
          current.includes(mascot) ? current : [...current, mascot],
        );
        setStatus(text.won(moves));
      } else {
        setStatus(text.found(a.token));
      }
      return undefined;
    }
    setStatus(text.miss);
    const timerId = window.setTimeout(() => setOpen([]), 900);
    return () => window.clearTimeout(timerId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const turn = (card) => {
    if (busy || open.includes(card.id) || matched.includes(card.pair)) return;
    if (open.length === 1) setMoves((current) => current + 1);
    setOpen((current) => [...current, card.id]);
  };

  const restart = () => {
    setDeck(shuffleDeck());
    setOpen([]);
    setMatched([]);
    setMoves(0);
    setStatus("");
    if (complete) setDiscovered([]);
    setMascot((current) => {
      const locked = complete
        ? WIN_MASCOT_KEYS.filter((key) => key !== current)
        : WIN_MASCOT_KEYS.filter((key) => !discovered.includes(key));
      return locked[Math.floor(Math.random() * locked.length)];
    });
  };

  return (
    <div className="token-memory badge-card">
      <div className="token-memory__bar">
        <div className="token-memory__stats">
          <span className="token-memory__stat">
            <NumberMark shape="ring" className="token-memory__count" hidden>
              {String(moves).padStart(2, "0")}
            </NumberMark>
            {text.moves}
          </span>
          <span className="token-memory__stat">
            <NumberMark shape="ring" className="token-memory__count" hidden>
              {matched.length}/{MEMORY_TOKENS.length}
            </NumberMark>
            {text.pairs}
          </span>
          <span className="token-memory__stat">
            <NumberMark shape="ring" className="token-memory__count" hidden>
              {discovered.length}/{WIN_MASCOT_KEYS.length}
            </NumberMark>
            {text.mascotCount}
          </span>
        </div>
        <button className="token-memory__restart" onClick={restart} type="button">
          {complete ? text.newCollection : text.restart}
        </button>
      </div>

      <div className="token-memory__board" role="group" aria-label={text.boardLabel}>
        {deck.map((card, index) => {
          const isMatched = matched.includes(card.pair);
          const isUp = isMatched || open.includes(card.id);
          return (
            <button
              aria-label={isUp ? `${card.token}, ${card.hex}` : text.hidden(index + 1)}
              aria-pressed={isUp}
              className={`token-memory__card${isUp ? " is-up" : ""}${isMatched ? " is-matched" : ""}`}
              disabled={isMatched}
              key={card.id}
              onClick={() => turn(card)}
              type="button"
            >
              <span className="token-memory__inner" aria-hidden="true">
                <span className="token-memory__face token-memory__face--back">
                  <ShieldEmblem />
                </span>
                <span className="token-memory__face token-memory__face--front">
                  <span className="token-memory__swatch" style={{ "--swatch": card.hex }} />
                  <code>{card.token}</code>
                  <small>{card.role[language]}</small>
                  <small className="token-memory__hex">{card.hex}</small>
                </span>
              </span>
            </button>
          );
        })}

        {won && (
          <div className="token-memory__win">
            <div className="token-memory__win-card">
              <WinMascot name={mascot} />
              <p className="token-memory__win-title">{text.wonTitle}</p>
              <p className="token-memory__win-text">{text.mascots[mascot]}</p>
              {discovered[discovered.length - 1] === mascot && (
                <p className="token-memory__win-unlock">
                  {complete
                    ? text.collectionDone
                    : text.newMascot(text.mascotNames[mascot])}
                </p>
              )}
              <button className="token-memory__restart" onClick={restart} type="button">
                {complete ? text.newCollection : text.restart}
              </button>
            </div>
          </div>
        )}
      </div>

      <p className="token-memory__status" aria-live="polite" role="status">
        {status}
      </p>

      <section className="token-memory__collection" aria-label={text.collectionLabel}>
        <div className="token-memory__collection-head">
          <p className="token-memory__collection-label">{text.collectionLabel}</p>
          <p className="token-memory__collection-hint">
            <svg className="token-memory__hint-icon" viewBox="0 0 20 20" aria-hidden="true">
              <circle cx="10" cy="10" r="8.75" />
              <path d="M10 9v5" />
              <circle className="token-memory__hint-dot" cx="10" cy="6.1" r=".95" />
            </svg>
            {complete
              ? text.collectionDone
              : text.collectionHint}
          </p>
        </div>
        <ul className="token-memory__collection-list">
          {WIN_MASCOT_KEYS.map((key) => {
            const found = discovered.includes(key);
            return (
              <li
                className={`token-memory__slot${found ? " is-found" : ""}`}
                key={key}
              >
                <span className="token-memory__slot-art">
                  {found ? (
                    <WinMascot name={key} />
                  ) : (
                    // Locked: a padlock in the ring style — light rim, fine
                    // edge, lemon body, ink keyhole; no hint at the mascot
                    <svg className="win-mascot token-memory__lock" viewBox="0 0 64 64" aria-hidden="true">
                      {/* Shackle: a light rim line with a lemon core */}
                      <path className="lock__shackle-rim" d="M22 31V22a10 10 0 0 1 20 0v9" />
                      <path className="lock__shackle" d="M22 31V22a10 10 0 0 1 20 0v9" />
                      {/* Body: rim, fine edge, lemon face — the ring style */}
                      <rect className="lock__rim" x="13" y="30" width="38" height="28" rx="6" />
                      <rect className="lock__edge" x="13" y="30" width="38" height="28" rx="6" />
                      <rect className="lock__face" x="13" y="30" width="38" height="28" rx="6" />
                      <path className="lock__key" d="M32 37.4a3.4 3.4 0 0 1 1.9 6.2l1.2 6h-6.2l1.2-6a3.4 3.4 0 0 1 1.9-6.2Z" />
                    </svg>
                  )}
                </span>
                <span className="token-memory__slot-name">
                  {found ? text.mascotNames[key] : text.locked}
                </span>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

// Number in a mark: filled face with a thin ink outline, no shadow. "bubble" points left (towards the text it belongs to,
// tail vertically centred); "circle" is a plain disc.
const NUMBER_MARK_SHAPES = {
  bubble: {
    // Body x 6–30, y 3–18 (24 × 15) + a triangular pointer on the left.
    // Flat: one dark face, white number (see _expertise.scss)
    viewBox: "0 0 32 21",
    d: "M8.5 3h19A2.5 2.5 0 0 1 30 5.5v10a2.5 2.5 0 0 1-2.5 2.5h-19A2.5 2.5 0 0 1 6 15.5v-2L.8 10.5 6 7.5v-2A2.5 2.5 0 0 1 8.5 3Z",
  },
  circle: {
    viewBox: "0 0 24 24",
    d: "M12 2.6a9.4 9.4 0 1 1 0 18.8 9.4 9.4 0 0 1 0-18.8Z",
  },
  // Hero-badge style in yellow, round: a wide light rim, a fine light edge
  // and the lemon face (100 × 100 space, rendered at 40px: rim ≈ 4.6px)
  ring: {
    viewBox: "0 0 100 100",
    layers: [
      ["rim", "M50 2a48 48 0 1 1 0 96 48 48 0 0 1 0-96Z"],
      ["edge", "M50 13.5a36.5 36.5 0 1 1 0 73 36.5 36.5 0 0 1 0-73Z"],
      ["face", "M50 13.5a36.5 36.5 0 1 1 0 73 36.5 36.5 0 0 1 0-73Z"],
    ],
  },
};

function NumberMark({ shape, className = "", hidden = false, children }) {
  const { viewBox, d, layers } = NUMBER_MARK_SHAPES[shape];
  return (
    <span
      className={`number-mark number-mark--${shape} ${className}`}
      aria-hidden={hidden || undefined}
    >
      <svg viewBox={viewBox} fill="none" aria-hidden="true">
        {layers ? (
          layers.map(([part, path]) => (
            <path className={`number-mark__${part}`} d={path} key={part} />
          ))
        ) : (
          <path className="number-mark__face" d={d} />
        )}
      </svg>
      <span className="number-mark__text">{children}</span>
    </span>
  );
}

// Poll marks (? and !) — thin outlines; the tinted offset fills are hidden
// (no shadows on the page, see _poll.scss). The glyph
// sits inside a circle drawn the same way. The ? is a stroked curve, so its
// outline is cut out with a mask (wide stroke minus narrow stroke).
function PollMark({ type, className }) {
  const maskId = useId();
  const curve = "M8.4 8.3a3.7 3.7 0 1 1 6 2.9c-1.3 1-2.4 1.8-2.4 3.5v.5";
  const bar =
    "M9.4 2.4h5.2c.8 0 1.3.6 1.2 1.4l-1.7 10.4c-.1.6-.5.9-1.1.9h-2c-.6 0-1-.3-1.1-.9L8.2 3.8c-.1-.8.4-1.4 1.2-1.4Z";

  if (type === "comment") {
    const bubble =
      "M5 3.8h14a2.5 2.5 0 0 1 2.5 2.5v9.2a2.5 2.5 0 0 1-2.5 2.5h-8.3l-5.2 3.6v-3.6H5a2.5 2.5 0 0 1-2.5-2.5V6.3A2.5 2.5 0 0 1 5 3.8Z";
    return (
      <span className={className} aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none">
          <path className="poll-mark__fill" d={bubble} transform="translate(1.1 1)" />
          <path className="poll-mark__outline poll-mark__disc" d={bubble} />
          <g className="poll-mark__dots">
            <circle cx="8" cy="10.9" r="1.15" />
            <circle cx="12" cy="10.9" r="1.15" />
            <circle cx="16" cy="10.9" r="1.15" />
          </g>
        </svg>
      </span>
    );
  }

  return (
    <span className={className} aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none">
        {/* Circle */}
        <circle className="poll-mark__fill" cx="12.9" cy="12.8" r="10.4" />
        <circle className="poll-mark__outline poll-mark__disc" cx="12" cy="12" r="10.4" />

        {/* Glyph, scaled into the circle */}
        <g
          className="poll-mark__glyph"
          transform="translate(12 12.2) scale(.56) translate(-12 -12.6)"
        >
          {type === "question" ? (
            <>
              <defs>
                <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                  <path d={curve} stroke="#fff" strokeWidth="4.6" strokeLinecap="round" />
                  <path d={curve} stroke="#000" strokeWidth="2.2" strokeLinecap="round" />
                </mask>
              </defs>
              <g className="poll-mark__fill" transform="translate(1.4 1.2)">
                <path d={curve} strokeWidth="4.6" strokeLinecap="round" />
                <circle cx="12" cy="19.6" r="2.2" />
              </g>
              <rect className="poll-mark__outline-fill" width="24" height="24" mask={`url(#${maskId})`} />
              <circle className="poll-mark__outline" cx="12" cy="19.6" r="2.2" />
            </>
          ) : (
            <>
              <g className="poll-mark__fill" transform="translate(1.4 1.2)">
                <path d={bar} />
                <circle cx="12" cy="19.6" r="2.2" />
              </g>
              <path className="poll-mark__outline" d={bar} />
              <circle className="poll-mark__outline" cx="12" cy="19.6" r="2.2" />
            </>
          )}
        </g>
      </svg>
    </span>
  );
}

function NoteCard({ label, tab, children }) {
  return (
    <div className="note-card badge-card">
      <span className="badge-tags">
        <span className="badge-tag">{label}</span>
        <span className="badge-tag badge-tag--fact">{tab}</span>
      </span>
      <p className="note-card__text">{children}</p>
    </div>
  );
}

// Text clamped to `lines` lines; a Read more / Show less toggle appears only
// when the full text is longer. Re-measured on resize (ResizeObserver).
// Text clamped to N lines with a "read more" toggle (only when it overflows)
function ClampedText({ text, lines = 4, className = "", moreLabel, lessLabel }) {
  const textRef = useRef(null);
  const [overflows, setOverflows] = useState(false);
  const [open, setOpen] = useState(false);
  const id = useId();

  useEffect(() => {
    const el = textRef.current;
    if (!el) return undefined;
    const measure = () => {
      // While open the text is unclamped; keep the toggle so it can collapse
      if (el.classList.contains("is-clamped")) {
        setOverflows(el.scrollHeight > el.clientHeight + 1);
      }
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [text]);

  return (
    <>
      <p
        ref={textRef}
        id={id}
        className={`${className} clamped-text${open ? "" : " is-clamped"}`}
        style={{ "--clamp-lines": lines }}
      >
        {text}
      </p>
      {overflows && (
        <button
          type="button"
          className="clamped-text__toggle"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? lessLabel : moreLabel}
          {/* Chevron: down = closed, rotates up when open (via aria-expanded) */}
          <svg viewBox="0 0 12 12" aria-hidden="true">
            <path d="M3 4.5 6 7.5l3-3" />
          </svg>
        </button>
      )}
    </>
  );
}

// Takeaways: one wide box, four columns divided by fine dotted lines
// (label, text clamped to 3 lines with "Mehr lesen")
function Takeaways({ items, moreLabel, lessLabel }) {
  return (
    <div className="takeaways">
      {items.map((item) => (
        <div className="takeaway" key={item.icon}>
          <span className="badge-tag badge-tag--ghost">{item.label}</span>
          <ClampedText
            className="takeaway__text"
            lessLabel={lessLabel}
            lines={3}
            moreLabel={moreLabel}
            text={item.text}
          />
        </div>
      ))}
    </div>
  );
}

// Avatar for the testimonial: a business-portrait illustration in flat greys:
// bald head with ears, dark rectangular glasses and a long full beard,
// shaded neck, white shirt with collar points, dark tie, grey jacket with
// lighter lapels, in a round frame like the hero portrait. The previous
// version (swept hair, no glasses) is kept in assets/TestimonialAvatar.backup.svg.
function SilhouetteAvatar() {
  const clipId = useId();
  const neckId = useId();
  return (
    <svg className="testimonial__avatar" viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <clipPath id={clipId}>
          <circle cx="32" cy="32" r="31" />
        </clipPath>
        {/* Shadow under the chin */}
        <linearGradient id={neckId} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#d2d1cb" />
          <stop offset="0.55" stopColor="#ebeae5" />
        </linearGradient>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        <rect width="64" height="64" className="testimonial__avatar-bg" />
        {/* Jacket and lapels */}
        <path className="testimonial__avatar-jacket" d="M2 64c1-10 8-15.5 20-18l10 4 10-4c12 2.5 19 8 20 18Z" />
        <path className="testimonial__avatar-lapel" d="M21 46.5l9 5.5-3 12h-5l-6-13Z" />
        <path className="testimonial__avatar-lapel" d="M43 46.5l-9 5.5 3 12h5l6-13Z" />
        {/* Shirt, collar points, tie */}
        <path className="testimonial__avatar-shirt" d="M24.5 45 32 49l7.5-4 .5 19H24Z" />
        <path className="testimonial__avatar-collar" d="M24.5 45 32 49l-4 6.5Z" />
        <path className="testimonial__avatar-collar" d="M39.5 45 32 49l4 6.5Z" />
        <path className="testimonial__avatar-tie" d="M30 49h4l-.6 3h-2.8ZM30.6 52h2.8l1.6 12h-6Z" />
        {/* Neck, ears, face */}
        <path fill={`url(#${neckId})`} d="M27 35h10v10.5c0 2-2.2 3.5-5 3.5s-5-1.5-5-3.5Z" />
        <ellipse className="testimonial__avatar-ear" cx="20.8" cy="27.5" rx="2.6" ry="3.8" />
        <ellipse className="testimonial__avatar-ear" cx="43.2" cy="27.5" rx="2.6" ry="3.8" />
        {/* Bald head: a round dome, no hair, with a soft shine on top */}
        <path className="testimonial__avatar-face" d="M21 25c0-10.2 4.9-15.5 11-15.5S43 14.8 43 25c0 9.5-4.9 15-11 15s-11-5.5-11-15Z" />
        <path className="testimonial__avatar-shine" d="M26 14.5c1.6-1.9 3.6-2.8 6-2.8" />
        {/* Brows and eyes */}
        <path className="testimonial__avatar-brow" d="M24.4 21.2c1.6-.8 3.6-.9 5.2-.3M39.6 21.2c-1.6-.8-3.6-.9-5.2-.3" />
        <circle className="testimonial__avatar-eye" cx="27" cy="24.9" r=".8" />
        <circle className="testimonial__avatar-eye" cx="37" cy="24.9" r=".8" />
        {/* Nose */}
        <path className="testimonial__avatar-nose" d="M32.2 25.5v4.2l-1.4.4" />
        {/* Full beard with moustache, running long to a point below the chin */}
        <path
          className="testimonial__avatar-beard"
          d="M21.2 27.5c.2 7 2.8 12.6 6.6 16.2L32 48.5l4.2-4.8c3.8-3.6 6.4-9.2 6.6-16.2-1 2.4-2.4 3.9-4.2 4.6-2-1.6-4.2-2.1-6.6-1.6-2.4-.5-4.6 0-6.6 1.6-1.8-.7-3.2-2.2-4.2-4.6Z"
        />
        {/* Mouth: a gap in the beard showing the lower lip, with the
            moustache drawn over its top edge */}
        <path
          className="testimonial__avatar-lip"
          d="M28.7 33.9c1.1-.4 2.2-.5 3.3-.2 1.1-.3 2.2-.2 3.3.2-.5 1.7-1.8 2.6-3.3 2.6s-2.8-.9-3.3-2.6Z"
        />
        <path className="testimonial__avatar-mouth" d="M29 34c1 .4 2 .5 3 .3 1 .2 2 .1 3-.3" />
        <path
          className="testimonial__avatar-moustache"
          d="M26.8 33.9c1.4-1.6 3.2-2.2 5.2-1.5 2-.7 3.8-.1 5.2 1.5-1.5.3-2.8.1-3.9-.4-.5.2-.9.3-1.3.3s-.8-.1-1.3-.3c-1.1.5-2.4.7-3.9.4Z"
        />
        {/* Glasses: dark rectangular frames with temples to the ears */}
        <g className="testimonial__avatar-glasses">
          <rect x="23.2" y="22.4" width="7.4" height="5" rx="1.3" />
          <rect x="33.4" y="22.4" width="7.4" height="5" rx="1.3" />
          <path d="M30.6 24.2c.9-.5 1.9-.5 2.8 0M23.2 24H21.4M40.8 24h1.8" />
        </g>
      </g>
      <circle cx="32" cy="32" r="31" className="testimonial__avatar-ring" />
    </svg>
  );
}

// "Back to top" hint next to the wordmark: an up arrow in a fine round coin,
// same line weight as the other icons. Header: appears once the page is
// scrolled past the first screen; footer: always shown.
function ToTopIcon() {
  return (
    <span className="wordmark__top" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M12 18.5v-13M6.5 11 12 5.5l5.5 5.5" />
      </svg>
    </span>
  );
}

// Testimonial quote marks: two slanted, heavy strokes
function QuoteMark() {
  return (
    <svg className="testimonial__mark" viewBox="0 0 64 56" aria-hidden="true">
      <path d="M16 0h14l-9 56H5Z" />
      <path d="M45 0h14l-9 56H34Z" />
    </svg>
  );
}

// Hero experience badge — a flat rounded hexagon: lighter red rim, a fine
// light edge, the face in the main red, and a white "10+". The slanted glyphs
// are the previous badge's own (src/assets/Hero-Badge.backup.svg), now drawn
// as solid fills instead of outlines.
function HeroBadge() {
  return (
    <svg className="hero-badge" viewBox="0 0 100 112" role="img" aria-label="10+">
      <path className="hero-badge__rim" d="M45.28 16.08 Q50.00 13.35 54.72 16.08 L82.22 31.95 Q86.94 34.68 86.94 40.13 L86.94 71.87 Q86.94 77.32 82.22 80.05 L54.72 95.92 Q50.00 98.65 45.28 95.92 L17.78 80.05 Q13.06 77.32 13.06 71.87 L13.06 40.13 Q13.06 34.67 17.78 31.95Z" />
      <path className="hero-badge__edge" d="M50.00 25.00 L76.85 40.50 L76.85 71.50 L50.00 87.00 L23.15 71.50 L23.15 40.50Z" />
      <path className="hero-badge__face" d="M50.00 25.00 L76.85 40.50 L76.85 71.50 L50.00 87.00 L23.15 71.50 L23.15 40.50Z" />
      {/* Glyphs scaled from the old 176 × 210 badge space, "10" centred */}
      <g transform="translate(17.3 21.2) scale(.36)">
        <path className="hero-badge__number" d="M52.29,61.77h15.23c.36,0,.64.12.86.38.21.25.29.55.21.91l-8.9,72.48c-.07.36-.23.66-.48.91-.25.25-.55.38-.91.38h-14.8c-.36,0-.64-.12-.86-.38-.21-.25-.29-.55-.21-.91l6.97-56.72c0-.14-.07-.29-.21-.43-.14-.14-.29-.18-.43-.11l-10.4,2.47-.43.11c-.72,0-1-.39-.86-1.18l1.18-11.26c.14-.71.54-1.21,1.18-1.5l11.26-4.83c.5-.21,1.04-.32,1.61-.32Z" />
        <path className="hero-badge__number" d="M76.47,132.38c-4.04-3.82-6.06-9.06-6.06-15.71,0-1.36.11-2.79.32-4.29l3.22-26.16c.93-7.79,3.98-13.96,9.17-18.5,5.18-4.54,11.74-6.81,19.68-6.81,7.22,0,12.87,1.89,16.94,5.68,4.08,3.79,6.11,9.01,6.11,15.66,0,.79-.07,2.11-.21,3.97l-3.22,26.16c-1,7.94-4.11,14.21-9.33,18.82-5.22,4.61-11.8,6.92-19.73,6.92-7.22,0-12.85-1.91-16.89-5.74ZM101.88,120.26c1.75-1.68,2.77-3.98,3.06-6.92l3.43-27.77c.07-.43.11-1,.11-1.72,0-2.43-.66-4.32-1.98-5.68-1.32-1.36-3.16-2.04-5.52-2.04-2.65,0-4.83.84-6.54,2.52s-2.75,3.98-3.11,6.92l-3.43,27.77c-.07.36-.11.89-.11,1.61,0,2.43.66,4.34,1.98,5.74,1.32,1.39,3.13,2.09,5.42,2.09,2.72,0,4.95-.84,6.7-2.52Z" />
        <path className="hero-badge__plus" d="M151.68,51.48c.13.16.18.35.13.57l-.81,6.51c-.04.22-.15.41-.3.57s-.35.23-.57.23h-8.93c-.18,0-.31.11-.4.34l-1.07,9.06c-.05.22-.15.41-.3.57s-.35.23-.57.23h-6.25c-.49,0-.74-.27-.74-.81l1.14-9.06c0-.22-.09-.34-.27-.34h-8.93c-.22,0-.4-.08-.54-.23-.13-.16-.18-.35-.13-.57l.81-6.51c0-.22.09-.41.27-.57.18-.16.38-.23.6-.23h8.93c.09,0,.17-.03.23-.1.07-.07.1-.14.1-.23l1.14-9.27c.04-.22.14-.41.3-.57.16-.16.35-.24.57-.24h6.24c.22,0,.4.08.54.24.13.16.18.35.13.57l-1.14,9.27c0,.22.11.34.34.34h8.93c.22,0,.4.08.54.23Z" />
      </g>
    </svg>
  );
}

// Page sections → menu entry they belong to (null = no entry)
const NAV_SECTIONS = [
  ["#work", "work"],
  ["#about", "about"],
  [".testimonial", "about"],
  ["#expertise", "expertise"],
  ["#game", null],
  ["#contact", null],
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [language, setLanguage] = useState("de");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  const [scrolled, setScrolled] = useState(false);
  // Past the first screen: the header wordmark shows its "back to top" arrow
  const [awayFromTop, setAwayFromTop] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const headerRef = useRef(null);
  const wordmarkRef = useRef(null);

  const closeMenu = () => setMenuOpen(false);
  const text = copy[language];

  // Wordmark in header and footer: back to the top of the page. Smooth via
  // the CSS scroll-behavior (instant when reduced motion is requested, see
  // _base.scss). No "#page-top" left in the URL; keyboard focus moves to the
  // header wordmark so the next Tab continues from the top. The href stays
  // as a fallback.
  const scrollToTop = (event) => {
    event.preventDefault();
    closeMenu();
    window.scrollTo({ top: 0 });
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }
    wordmarkRef.current?.focus({ preventScroll: true });
  };

  // Sticky header: compact once the page is scrolled; the progress line under
  // it shows how much of the page has been read (--scroll-progress, 0–1).
  // One update per frame; the line is set directly, without a re-render.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      headerRef.current?.style.setProperty("--scroll-progress", progress.toFixed(4));
      setScrolled(window.scrollY > 8);
      setAwayFromTop(window.scrollY > window.innerHeight * 0.6);
      // Current section for the menu: the last section whose top has passed
      // a line a third down the viewport. The hero has no menu entry, so at
      // the top nothing is highlighted; sections without an entry (the game,
      // the contact block with its own red button) highlight nothing either.
      const line = window.innerHeight / 3;
      let current = null;
      for (const [selector, key] of NAV_SECTIONS) {
        const element = document.querySelector(selector);
        if (element && element.getBoundingClientRect().top <= line) current = key;
      }
      setActiveSection(current);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const locale = copy[language];
    document.documentElement.lang = language;
    document.title = locale.documentTitle;
    document
      .getElementById("meta-description")
      .setAttribute("content", locale.metaDescription);
    document
      .getElementById("og-title")
      .setAttribute("content", locale.documentTitle);
    document
      .getElementById("og-description")
      .setAttribute("content", locale.socialDescription);
  }, [language]);

  return (
    <>
      <a className="skip-link" href="#main">
        {text.skip}
      </a>

      <header
        className={`site-header${scrolled ? " is-scrolled" : ""}${awayFromTop ? " is-away" : ""}`}
        id="page-top"
        ref={headerRef}
      >
        <div className="site-header__inner">
          <a
            className="wordmark"
            href="#page-top"
            aria-label={awayFromTop ? text.footer.home : text.home}
            onClick={scrollToTop}
            ref={wordmarkRef}
          >
            <span className="wordmark__name">Daniel Popa</span>
            <ToTopIcon />
          </a>

          <nav
            className={`primary-navigation${menuOpen ? " is-open" : ""}`}
            id="primary-navigation"
            aria-label={text.nav.label}
          >
            <a
              href="#work"
              className={activeSection === "work" ? "is-active" : undefined}
              aria-current={activeSection === "work" ? "location" : undefined}
              onClick={closeMenu}
            >
              {text.nav.work}
            </a>
            <a
              href="#about"
              className={activeSection === "about" ? "is-active" : undefined}
              aria-current={activeSection === "about" ? "location" : undefined}
              onClick={closeMenu}
            >
              {text.nav.about}
            </a>
            <a
              href="#expertise"
              className={activeSection === "expertise" ? "is-active" : undefined}
              aria-current={activeSection === "expertise" ? "location" : undefined}
              onClick={closeMenu}
            >
              {text.nav.expertise}
            </a>
            <a className="nav-contact" href="#contact" onClick={closeMenu}>
              {text.nav.talk} <ArrowIcon diagonal />
            </a>
          </nav>

          <div className="site-header__tools">
            <LanguageSwitcher
              language={language}
              onChange={setLanguage}
              label={text.language}
            />
            <button
              className={`menu-toggle${menuOpen ? " is-open" : ""}`}
              type="button"
              aria-controls="primary-navigation"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? text.nav.close : text.nav.open}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
        {/* Reading progress: a fine red line along the header's bottom edge */}
        <div className="scroll-progress" aria-hidden="true" />
      </header>

      <div className="portfolio-shell">
        <main id="main">
          <section
            className="hero section-wrap"
            id="top"
            aria-labelledby="hero-title"
          >
            <div className="hero__copy">
              <h1 id="hero-title">Daniel Popa</h1>
              <p className="hero__role">
                <span>{text.hero.role[0]}</span>{" "}
                <span>{text.hero.role[1]}</span>
              </p>
              <div className="hero__bottom">
                <p className="hero__intro">{text.hero.intro}</p>
                <div className="hero__actions">
                  <a className="button button--blue" href="#work">
                    {text.hero.work} <ArrowIcon down />
                  </a>
                  <a
                    className="hero-cv"
                    href={`${import.meta.env.BASE_URL}Lebenslauf_Daniel_Popa.pdf`}
                    download="Lebenslauf_Daniel_Popa.pdf"
                  >
                    <span>{text.hero.downloadCv}</span>
                    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
                      <path d="M10 3v10m-4-4 4 4 4-4M4 16v2h12v-2"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="hero-art">
              <div className="hero-art__profile">
                <div className="hero-art__badge__wrapper">
                  <HeroBadge />

                  <div className="hero-art__badge__text">
                    <span>
                      {text.heroBadge.exp1}
                    </span>
                    <span>
                      {text.heroBadge.exp2}
                    </span>
                  </div>
                </div>
                <div className="hero-art__portrait__background" />

                <img
                  className="hero-art__portrait hero-art__portrait--inside"
                  src={portrait}
                  alt={text.hero.art}
                />
                <img
                  className="hero-art__portrait hero-art__portrait--outside"
                  src={portrait}
                  alt={text.hero.art}
                />
              </div>
            </div>
          </section>

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
                  <h4 id="quality-system-title">{text.quality.cards[0].title}</h4>
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
                  <h4 id="quality-cls-title">{text.quality.cards[1].title}</h4>
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
                  <h4 id="quality-keyboard-title">{text.quality.cards[2].title}</h4>
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

          <section
            className="about section-wrap section-space"
            id="about"
            aria-labelledby="about-title"
          >
            {/* Same heading pattern as the work section: eyebrow, title, note */}
            <div className="section-heading">
              <div>
                <p className="eyebrow">{text.about.eyebrow}</p>
                <h2 id="about-title">
                  {text.about.title[0]}
                  <br />
                  {text.about.title[1]}
                  <span>.</span>
                </h2>
              </div>
              <NoteCard
                label={text.about.noteLabel}
                tab={text.about.noteTab}
              >
                {text.about.intro}
              </NoteCard>
            </div>

            {/* Career timeline: oldest → today, one column per role */}
            <div className="career" id="experience" aria-labelledby="experience-title">
              <h3 id="experience-title">{text.experience.title}</h3>
              <ol className="career__list">
                {text.experience.entries.map((entry) => (
                  <li className="career__item" key={entry.range}>
                    <p className="career__range">{entry.range}</p>
                    <span className="career__dot" aria-hidden="true" />
                    <div className="career__body">
                      <p className="career__duration">
                        {entry.since
                          ? `${copyrightYear - entry.since} ${text.experience.years}`
                          : entry.duration}
                      </p>
                      <h4>{entry.role}</h4>
                      {entry.company && (
                        <p className="career__company">{entry.company}</p>
                      )}
                      <ClampedText
                        className="career__summary"
                        lessLabel={text.experience.less}
                        lines={4}
                        moreLabel={text.experience.more}
                        text={entry.description}
                      />
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <section
            className="testimonial section-wrap section-space"
            aria-labelledby="testimonial-title"
          >
            <h2 className="eyebrow" id="testimonial-title">
              {text.testimonial.eyebrow}
            </h2>
            <figure className="testimonial__figure">
              <QuoteMark />
              <blockquote className="testimonial__quote">
                <p>{text.testimonial.quote}</p>
              </blockquote>
              <figcaption className="testimonial__author">
                <SilhouetteAvatar />
                <span className="testimonial__who">
                  {/* Name set in a handwriting face — a typographic sign-off,
                      not a reproduction of the real signature. It is the only
                      place the name appears, so screen readers read it too. */}
                  <span className="testimonial__signature">
                    {text.testimonial.name}
                  </span>
                  <span>{text.testimonial.role}</span>
                </span>
              </figcaption>
            </figure>
          </section>

          <section
            className="expertise section-wrap section-space"
            id="expertise"
            aria-labelledby="expertise-title"
          >
            <div className="section-heading">
              <div>
                <p className="eyebrow">{text.expertise.eyebrow}</p>
                <h2 id="expertise-title">
                  {text.expertise.title}
                  <span>.</span>
                </h2>
              </div>
              <NoteCard
                label={text.expertise.noteLabel}
                tab={`${text.expertise.groups.length} ${text.expertise.areaUnit} · ${text.expertise.groups.reduce((total, group) => total + group.skills.length, 0)} ${text.expertise.skillUnit}`}
              >
                {text.expertise.aside}
              </NoteCard>
            </div>
            <div className="expertise-board">
              <div className="expertise-grid">
                {text.expertise.groups.map((group) => (
                  <article className="expertise-card" key={group.title}>
                    <div className="expertise-card__content">
                      {/* The last word and the count never break apart, so a long
                          title wraps onto two rows with the count after it */}
                      <h3 className="expertise-card__heading">
                        {group.title.split(" ").slice(0, -1).join(" ")}{" "}
                        <span className="expertise-card__title-end">
                          {group.title.split(" ").at(-1)}
                          <NumberMark shape="bubble" className="expertise-card__count" hidden>
                            {String(group.skills.length).padStart(2, "0")}
                          </NumberMark>
                        </span>
                      </h3>
                      <p>{group.description}</p>
                    </div>
                    <ul aria-label={group.title}>
                      {group.skills.map((skill) => {
                        // Plain string, or { name, level } with the level from the CV
                        const { name, level } =
                          typeof skill === "string" ? { name: skill } : skill;
                        return (
                          <li key={name}>
                            {name}
                            {level && (
                              <span className="expertise-card__level">
                                ({level})
                              </span>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
          </section>

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
        </main>
      </div>

      <footer className="site-footer">
        <div className="site-footer__inner">
          <a className="wordmark" href="#page-top" aria-label={text.footer.home} onClick={scrollToTop}>
            <span className="wordmark__name">Daniel Popa</span>
            <ToTopIcon />
          </a>
          <p>{text.footer.description}</p>
          <span className="site-footer__copyright">
            © {copyrightYear} Daniel Popa
          </span>
        </div>
      </footer>
    </>
  );
}

export default App;
