import { useEffect, useId, useRef, useState } from "react";
import portrait from "./assets/daniel-popa-cutout.png";
import siteLogo from "./assets/code-brackets-logo.svg";
import heroBadge from "./assets/Hero-Badge.svg";

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
    documentTitle: "Daniel Popa — Senior Webdesigner & Frontend-Entwickler",
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
      greeting: "Hallo, ich bin",
      role: ["Senior Webdesigner &", "Frontend-Entwickler"],
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
      eyebrow: "Ausgewählte Verbesserungen",
      title: "Was hinter der Oberfläche steckt",
      aside:
        "Wie eine flexible Farbpalette und klare semantische Rollen gemeinsame Komponenten in einem Multi-Brand-Publishing-System unterstützen. Portal- und Inhaltsnamen sind fiktiv – Struktur, Tokens und Farblogik stammen aus dem echten System.",
      noteLabel: "Kontext",
      noteTab: "3 Fallstudien",
      tokenIndex: "01 / DESIGN-SYSTEM",
      tokenTitle: ["Flexible Farben.", "Klare Rollen."],
      tokenLead:
        "Nicht jede Farbanwendung braucht ein eigenes semantisches Token. Ziel war es, wiederverwendbare Farbwerte flexibel zu halten und wiederkehrenden globalen Rollen – etwa Links oder Artikeltiteln – klare Namen zu geben.",
      brandColor: "MARKENFARBE",
      brandDescription: "Ein Markenwert definiert die Primärfarbe.",
      reusableRole: "WIEDERVERWENDBARE ROLLE",
      roleDescription: "Das Link-Token ordnet dem Zweck die Markenfarbe zu.",
      layers: "VIER EBENEN, EINE STRATEGIE",
      neutral: "Globaler neutraler Basiswert",
      primary: "Primärer Marken-Basiswert",
      semantic: "Semantische Rollen verweisen auf den passenden Basiswert",
      unsemantic: "Unsemantischer Palettenwert für Hell- und Dunkelmodus",
      approachLabel: "DER ANSATZ",
      approach:
        "Palettenwerte kontextunabhängig wiederverwenden; etablierte Rollen wie Links und Artikeltitel über semantische Aliase abbilden.",
      mattersLabel: "WARUM DAS WICHTIG IST",
      matters:
        "Ein Komponenten-Stylesheet bedient alle acht Marken: Ein Rebranding ändert nur die lokale Farbdatei, der Dark Mode belegt lediglich Variablen unter [data-theme=\"dark\"] neu, und rund 4.800 Grau-Referenzen bleiben überall konsistent – ohne ausufernde Sammlung einzelner semantischer Namen.",
      contributionLabel: "MEIN BEITRAG",
      contribution:
        "Eine Farbstrategie in vier Ebenen: eine globale Graustufen-Skala (--gr5 bis --gr93, benannt nach % Schwarz) für alle Marken, Marken-Basiswerte je Portal (--PrCl, --AcCl), wenige semantische Rollen für Text, Titel, Links, Hintergründe und Buttons sowie nummerierte Hell/Dunkel-Paare wie --Cc25 für alles Übrige – Marke für Marke ausgerollt.",
      unsemanticLabel: "UNSEMANTISCHE FARBEN",
      takeawayMore: "Mehr lesen",
      takeawayLess: "Weniger anzeigen",
      unsemanticText:
        "--Cc25 benennt eine Farbe, keine Rolle. Er hält je einen Wert für Hell- und Dunkelmodus und wird direkt in Komponenten wie dem Countdown eingesetzt – überall dort, wo die Markenfarbe ohne globale Bedeutung gebraucht wird, ganz ohne neues semantisches Alias.",
      pollQuestion: "Welche Artikel der Ausgabe 07/2023 haben dir zugesagt?",
      pollTitle: "Leserlieblinge",
      pollLabel: "Umfrageergebnisse",
      participants: "Teilnehmer",
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
        "Test: 5× Z790-Mainboard",
        "Test: 6× Notebooks mit RTX 4000",
        "Test: 8× Midi-Gehäuse",
        "Test: AMD Radeon RX 7600",
      ],
      countdownIndex: "02 / WIEDERVERWENDBARE KOMPONENTE",
      countdownTitle: ["Ein Countdown,", "passend zur Marke."],
      countdownDescription:
        "Eine gemeinsame Modulstruktur passt sich mit wenigen Farb-Tokens, Inhalten und Layoutvarianten an unterschiedliche Portalidentitäten an.",
      countdownNoteLabel: "Prinzip",
      countdownNoteTab: "2 Portale · 2 Modi",
      countdownLabel: "Shadowstone Release-Countdown",
      countdownButton: "Alle Shadowstone-Infos",
      release: "Release",
      titleColorLabel: "SEMANTISCHE TITELFARBE",
      titleColorComparison:
        "Farbe des Countdown-Titels in hellem und dunklem Modus",
      lightMode: "HELLMODUS",
      darkMode: "DUNKELMODUS",
      titleColorLightToken: "--modTtl → --gr80 · #333333 (80 % Schwarz)",
      titleColorDarkToken: "--modTtl → --gr5 · #f2f2f2 (5 % Schwarz)",
      brandAccentLabel: "UNSEMANTISCHER FARB-TOKEN",
      brandAccentLightToken: "--Cc25 ·",
      brandAccentDarkToken: "--Cc25 ·",
      brandAccentComparison: "Markenakzent für hellen und dunklen Modus",
      brandAccentNote:
        "--Cc25 ist ein unsemantischer Farb-Token mit Werten für Hell- und Dunkelmodus. Er lässt sich für verschiedene UI-Elemente wiederverwenden und vermeidet eine unübersichtliche Liste elementbezogener Variablen, die oft dieselben Farbwerte enthalten.",
      paletteNote:
        "--modTtl ist die semantische Farbe des Countdown-Titels. Im Hellmodus verweist sie auf --gr80 (#333333, 80 % Schwarz), im Dunkelmodus auf --gr5 (#f2f2f2, 5 % Schwarz).",
    },
    quality: {
      index: "03 / UX & FRONTEND IN DER PRAXIS",
      title: "Kleine Details, bessere Erlebnisse.",
      description:
        "Vier Muster aus meiner täglichen Arbeit an Core Web Vitals und Barrierefreiheit nach WCAG 2.2: Layout-Verschiebungen reduzieren, Tastaturbedienung verbessern, Touch-Ziele vergrößern und unnötige Bewegung vermeiden. Die Demos sind nachgebaute Konzeptbeispiele, keine gemessenen Projektergebnisse.",
      noteLabel: "Praxis",
      noteTab: "4 Beispiele",
      beforeState: "Vorher · Werbefläche nicht reserviert",
      afterState: "Nachher · Werbefläche reserviert",
      cards: [
        {
          title: "Unerwartetes Springen verhindern",
          description:
            "Der Vergleich zeigt: Wird Werbung nachträglich eingefügt, rutscht der Artikel weiter. Reservierter Platz hält ihn stabil.",
          metric:
            "CLS-Ziel: ≤ 0,1 am 75. Perzentil; für dieses Konzept nicht gemessen.",
        },
        {
          title: "Tastaturfokus sichtbar machen",
          description:
            "Der Vergleich zeigt einen schwer erkennbaren Fokus neben einem klaren Fokuszustand und einem Direktlink zum Artikel.",
          criterion: "WCAG 2.4.7 · Fokus sichtbar · AA",
        },
        {
          title: "Touch-Ziele leichter treffen",
          description:
            "Der Vergleich zeigt ein kleines, unbeschriftetes Ziel neben einem deutlich beschrifteten, größeren Bedienelement.",
          criterion: "WCAG 2.5.8 · Mindestgröße von Zielen · AA",
        },
        {
          title: "Status ohne Bewegung klar anzeigen",
          description:
            "Beide Beispiele zeigen denselben Status. Nur die Animation ändert sich: Sie entfällt, wenn reduzierte Bewegung eingestellt ist.",
        },
      ],
      beforeAfter: "Vorher und nachher: Gestaltung der Bedienelemente",
      motionExamples: "Beispiele für Bewegung und reduzierte Bewegung",
      before: "VORHER · KLEINES ZIEL",
      after: "NACHHER · GRÖSSERES ZIEL",
      unlabeled: "16 × 16 px · ohne Beschriftung",
      articles: "Artikel",
      target44: "44 × 44 px · beschriftet",
      standard: "MIT ANIMATION",
      reduced: "REDUZIERTE BEWEGUNG",
      statusUpdates: "Ergebnisse werden geladen",
      statusClear: "Ergebnisse werden geladen",
      motionNote: "Gleiche Statusmeldung – nur die Animation ändert sich.",
      reducedMotionCode:
        "Diese Medienabfrage deaktiviert Animationen für Personen, die reduzierte Bewegung bevorzugen:",
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
      adImage: "Beispielwerbung für ein digitales Magazin",
      discover: "Mehr entdecken",
      topbar: "DIGITAL · 6 MIN. LESEZEIT",
      articleTitle: "Die Zukunft des Spielens beginnt jetzt",
      intro:
        "Neue Ideen verändern, wie wir spielen, entdecken und miteinander verbunden bleiben.",
      reserved: "Reservierter Werbeplatz",
      reservedText: "Werbeplatz reserviert",
      readMore: "WEITERLESEN",
      below:
        "Was die neuen Technologien für Spielerinnen und Spieler bedeuten.",
      focusInstruction:
        "Drücke die Tabulatortaste, bis „Zum Artikel springen“ erscheint, und bestätige mit Enter, um zum Beispielartikel zu springen.",
      beforeFocus: "VORHER · SCHWER ERKENNBAR",
      afterFocus: "NACHHER · FOKUS + DIREKTLINK",
      withoutFocus: "Beispielnavigation ohne klaren Fokusindikator",
      withFocus: "Beispielnavigation mit sichtbarem Tastaturfokus",
      latest: "Aktuelles",
      reviews: "Tests",
      skipArticle: "Zum Artikel springen",
      focusBlends: "Der Tastaturfokus hebt sich kaum von der Seite ab.",
      demoArticle: "Beispielartikel: Neue Geschichten",
      skipNavigation:
        "Navigation überspringen und direkt zum Artikel springen.",
    },
    about: {
      eyebrow: "Ein bisschen über mich",
      meterTitle: "Web-Erfahrung",
      meterUnit: "Jahre im Web",
      meterStart: "2011",
      meterCurrent: "heute",
      meterAria: "Mehr als zehn Jahre Erfahrung im Web, seit 2011.",
      title: ["Design im Kopf.", "Entwicklung im Fokus."],
      lead: "Aus meiner Basis in Grafik- und Mediengestaltung seit 2008 ist ein Arbeitsstil gewachsen, der Gestaltung und Frontend verbindet – von der ersten Idee bis zum fertigen Web-Erlebnis.",
      first:
        "Seit 2014 bin ich bei Computec Media – zunächst als Trainee, seit 2016 als UI/UX Designer & Frontend Developer. Ich gestalte und entwickle responsive Websites, Landingpages und WordPress-Frontends für verschiedene Medienmarken und begleite Projekte gemeinsam mit Backend, Marketing und weiteren Teams von UI-Konzepten, Wireframes und Prototypen bis zu Umsetzung, Testing und Optimierung.",
      second:
        "Mein Fokus: UI/UX, Webperformance, Core Web Vitals und Barrierefreiheit nach WCAG 2.2. ChatGPT und Claude nutze ich für Ideen, UI-Konzepte und als Unterstützung bei PHP-Templates, React-Komponenten und bestehenden Projekten. Konzept, Entscheidungen und Qualität verantworte ich selbst.",
    },
    expertise: {
      eyebrow: "Mein Werkzeugkasten",
      title: "Mit Bedacht gewählte Kompetenzen",
      aside:
        "Von der ersten Idee bis zum geprüften Frontend: vier Disziplinen, die sich in meiner Arbeit ergänzen.",
      noteLabel: "Überblick",
      boardLabel: "Kompetenzbereiche",
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
      eyebrow: "Mein bisheriger Weg",
      title: "Berufserfahrung",
      careerStrip: {
        labels: [
          "Computec Media · UI/UX · Frontend · WordPress",
          "Trainee",
          "World of Cruise",
          "Grafik & Print",
        ],
        values: ["2016 — heute", "2014 — 2016", "2011 — 2014", "2008 — 2011"],
      },
      // Descriptions follow the CV (public/Lebenslauf_Daniel_Popa.pdf) — keep both in sync
      entries: [
        {
          date: "Juli 2016 — heute",
          // career-strip segment this entry belongs to (shared pill colour)
          segment: 1,
          role: "UI/UX Designer & Frontend Developer",
          company: "Computec Media GmbH · Fürth, Deutschland",
          description:
            "Konzeption, Neugestaltung und kontinuierliche Optimierung responsiver Websites und digitaler Anwendungen für verschiedene Medienmarken. Entwicklung eines zentralen CSS-Farbsystems mit semantischen und wiederverwendbaren Variablen für konsistente UI-Gestaltung im Light- und Dark-Mode (siehe Fallstudie 01). Entwicklung und Pflege von Frontend-Komponenten, WordPress-Themes und PHP-Templates mit HTML, CSS/SCSS und JavaScript. Optimierung von Webperformance, Core Web Vitals, Accessibility und SEO. Erstellung von UI-Konzepten, Wireframes und Prototypen in Zusammenarbeit mit Backend, Marketing und weiteren Teams sowie gezielter Einsatz von KI-Tools.",
        },
        {
          date: "Juni 2014 — Juli 2016",
          // career-strip segment this entry belongs to (shared pill colour)
          segment: 2,
          role: "Trainee UI/UX Design & Frontend Development",
          company: "Computec Media GmbH · Fürth, Deutschland",
          description:
            "Mitarbeit bei Konzeption, Design und Entwicklung von Websites, Landingpages und UI-Prototypen. Entwicklung von WordPress-Themes und Frontend-Komponenten sowie Testing und Performance-Optimierung.",
        },
        {
          date: "Oktober 2011 — Juli 2014",
          // career-strip segment this entry belongs to (shared pill colour)
          segment: 3,
          role: "Mediengestalter · Freelancer",
          company: "World of Cruise SRL · Hermannstadt, Rumänien",
          description:
            "Gestaltung und Entwicklung von Websites und Frontends mit HTML, CSS, JavaScript und jQuery. Erstellung von Print- und Digitalmedien, Logos und Corporate Designs sowie Kundenberatung.",
        },
        {
          date: "März 2008 — August 2011",
          // career-strip segment this entry belongs to (shared pill colour)
          segment: 4,
          role: "Grafik- & Mediengestalter Digital & Print",
          description:
            "Gestaltung digitaler und gedruckter Medien, Logos und Corporate Designs sowie Entwicklung visueller Konzepte.",
        },
      ],
      // Education and languages — one compact row below the timeline
      facts: [
        {
          label: "Studium",
          value:
            "Fachhochschule für Informatik „Consoft-Computers“ · Hermannstadt · 2005 — 2008",
        },
        {
          label: "Sprachen",
          value:
            "Deutsch & Englisch verhandlungssicher · Rumänisch Muttersprache",
        },
      ],
    },
    contact: {
      eyebrow: "Eine gute Idee im Kopf?",
      title: ["Lass uns", "etwas bewegen."],
      description:
        "Gute digitale Erlebnisse beginnen mit einem guten Gespräch.",
      channelsLabel: "Kontaktmöglichkeiten",
      emailLabel: "E-Mail",
      emailValue: "popadaniel.office@gmail.com",
      linkedinLabel: "LinkedIn",
      linkedinValue: "Profil ansehen",
      phoneLabel: "Telefon",
      phoneValue: "+49 152 556 546 20",
      locationLabel: "Standort",
      locationValue: "Nürnberg · Remote oder hybrid",
      statusLabel: "Kontakt",
    },
    footer: {
      description:
        "Selbst gestaltet und entwickelt in Nürnberg – mit React, Vite und SCSS.",
      top: "Nach oben",
      home: "Daniel Popa, zurück nach oben",
    },
  },
  en: {
    documentTitle: "Daniel Popa — Senior Web Designer & Frontend Developer",
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
      greeting: "Hello, I’m",
      role: ["Senior web designer &", "Frontend developer"],
      intro:
        "With over 10 years of experience, I turn complex ideas into clear, thoughtful digital experiences.",
      work: "Explore my work",
      downloadCv: "Download my CV",
      about: "About me",
      art: "Portrait of Daniel Popa. I live in Nuremberg, Germany, and work remotely or hybrid in the Nuremberg/Fürth area.",
      location: "Location",
      country: "Nuremberg, Germany",
      available: "AVAILABLE",
      worldwide: "Remote · Hybrid",
    },
    heroBadge: {
      exp1: "Years of Experience",
      exp2: "in Web Design ",
    },
    work: {
      eyebrow: "Selected engineering improvements",
      title: "Behind the interface",
      aside:
        "How a flexible color palette and a few clear semantic roles support shared components across a multi-brand publishing system. Portal and content names are fictional—the structure, tokens and color logic come from the real system.",
      noteLabel: "Context",
      noteTab: "3 case studies",
      tokenIndex: "01 / DESIGN SYSTEM",
      tokenTitle: ["Flexible colors.", "Clear roles."],
      tokenLead:
        "The goal wasn’t to give every color use its own semantic token. It was to keep reusable color values flexible, then add clear names where a recurring global role—like a link or article title—benefits from one.",
      brandColor: "BRAND COLOR",
      brandDescription: "A brand primitive that defines the primary color.",
      reusableRole: "REUSABLE ROLE",
      roleDescription: "The link token maps the purpose to the brand color.",
      layers: "FOUR LAYERS, ONE STRATEGY",
      neutral: "Global neutral primitive",
      primary: "Brand primary primitive",
      semantic: "Semantic roles point to the right primitive",
      unsemantic: "Unsemantic palette value with light and dark modes",
      approachLabel: "THE APPROACH",
      approach:
        "Keep palette values reusable for any context; use semantic aliases for established roles such as links and article titles.",
      mattersLabel: "WHY IT MATTERS",
      matters:
        "One component stylesheet serves all eight brands: a rebrand only touches the local color file, dark mode just remaps variables under [data-theme=\"dark\"], and about 4,800 gray references stay consistent everywhere—without a sprawling catalog of one-off semantic names.",
      contributionLabel: "MY CONTRIBUTION",
      contribution:
        "A four-layer color strategy: a global grayscale (--gr5 to --gr93, named by % black) shared by every brand, brand primitives per portal (--PrCl, --AcCl), a few semantic roles for text, titles, links, backgrounds and buttons, and numbered light/dark pairs like --Cc25 for everything else—rolled out brand by brand.",
      unsemanticLabel: "UNSEMANTIC COLORS",
      takeawayMore: "Read more",
      takeawayLess: "Show less",
      unsemanticText:
        "--Cc25 names a color, not a role. It holds one value for light mode and one for dark mode, and components like the countdown use it directly wherever they need the brand color without a global meaning—no new semantic alias required.",
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
        "Hands-on: Tune Radeon 6000 with MPT and MCT — push driver limits",
        "Other (please add a note in the thread)",
        "Review: 5× Z790 motherboards",
        "Review: 6× RTX 4000 laptops",
        "Review: 8× mid-tower cases",
        "Review: AMD Radeon RX 7600",
      ],
      countdownIndex: "02 / REUSABLE COMPONENT",
      countdownTitle: ["A countdown,", "shaped for the brand."],
      countdownDescription:
        "A single module structure adapts to different portal identities through a small set of color tokens, content and layout variants.",
      countdownNoteLabel: "Principle",
      countdownNoteTab: "2 portals · 2 modes",
      countdownLabel: "Shadowstone release countdown",
      countdownButton: "All Shadowstone updates",
      release: "Release",
      titleColorLabel: "SEMANTIC TITLE COLOR",
      titleColorComparison: "Countdown title color in light and dark mode",
      lightMode: "LIGHT MODE",
      darkMode: "DARK MODE",
      titleColorLightToken: "--modTtl → --gr80 · #333333 (80% black)",
      titleColorDarkToken: "--modTtl → --gr5 · #f2f2f2 (5% black)",
      brandAccentLabel: "UNSEMANTIC COLOR TOKEN",
      brandAccentLightToken: "--Cc25 ·",
      brandAccentDarkToken: "--Cc25 ·",
      brandAccentComparison: "Brand accent for light and dark mode",
      brandAccentNote:
        "--Cc25 is an unsemantic color token with light- and dark-mode values. Reusing it across UI elements avoids an unwieldy list of element-specific variables, many of which would hold the same colors.",
      paletteNote:
        "--modTtl is the semantic color for the countdown title. In light mode it references --gr80 (#333333, 80% black); in dark mode it references --gr5 (#f2f2f2, 5% black).",
    },
    quality: {
      index: "03 / UX & FRONTEND IN PRACTICE",
      title: "Small details, better experiences.",
      description:
        "Four patterns from my day-to-day work on Core Web Vitals and WCAG 2.2 accessibility: reducing layout shifts, improving keyboard access, making touch targets easier to hit and avoiding unnecessary motion. The demos are rebuilt concept examples, not measured project results.",
      noteLabel: "In practice",
      noteTab: "4 examples",
      beforeState: "Before · ad space not reserved",
      afterState: "After · ad space reserved",
      cards: [
        {
          title: "Prevent unexpected jumps",
          description:
            "The comparison shows an article shifting when an ad appears late, then staying put when space is reserved.",
          metric:
            "CLS target: ≤ 0.1 at the 75th percentile; not measured for this concept.",
        },
        {
          title: "Make keyboard focus clear",
          description:
            "The comparison shows hard-to-see focus next to a clear focus state and a skip link to the article.",
          criterion: "WCAG 2.4.7 · Focus Visible · AA",
        },
        {
          title: "Make touch targets easier to hit",
          description:
            "The comparison shows a tiny, unlabeled target next to a larger control with a clear label.",
          criterion: "WCAG 2.5.8 · Target Size (Minimum) · AA",
        },
        {
          title: "Keep status clear without motion",
          description:
            "Both examples show the same status. Only the animation changes: it stops when reduced motion is enabled.",
        },
      ],
      beforeAfter: "Before and after control design",
      motionExamples: "Motion and reduced-motion examples",
      before: "BEFORE · SMALL TARGET",
      after: "AFTER · LARGER TARGET",
      unlabeled: "16 × 16 px · no label",
      articles: "Articles",
      target44: "44 × 44 px · labeled",
      standard: "ANIMATED",
      reduced: "REDUCED MOTION",
      statusUpdates: "Loading results",
      statusClear: "Loading results",
      motionNote: "Same status message—the animation is the only difference.",
      reducedMotionCode:
        "This media query disables animation for visitors who prefer reduced motion:",
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
      adImage: "Sample ad for a digital magazine",
      discover: "Discover more",
      topbar: "DIGITAL · 6 MIN. READ",
      articleTitle: "The future of gaming starts now",
      intro: "New ideas are changing how we play, explore and stay connected.",
      reserved: "Reserved ad space",
      reservedText: "Ad space reserved",
      readMore: "KEEP READING",
      below: "What new technology means for players.",
      focusInstruction:
        "Press Tab until “Skip to article” appears, then press Enter to jump to the demo article.",
      beforeFocus: "BEFORE · HARD TO SEE",
      afterFocus: "AFTER · FOCUS + SKIP LINK",
      withoutFocus: "Example navigation without a clear focus indicator",
      withFocus: "Example navigation with visible keyboard focus",
      latest: "Latest",
      reviews: "Reviews",
      skipArticle: "Skip to article",
      focusBlends: "Keyboard focus blends into the page.",
      demoArticle: "Demo article: New stories",
      skipNavigation: "Skip the navigation and go straight to the article.",
    },
    about: {
      eyebrow: "A little about me",
      meterTitle: "Web experience",
      meterUnit: "years on the web",
      meterStart: "2011",
      meterCurrent: "today",
      meterAria: "More than ten years of web experience, since 2011.",
      title: ["Design-minded.", "Build-focused."],
      lead: "My foundation in graphic and media design, going back to 2008, shaped an approach that brings visual craft and frontend together, from the first idea to the finished web experience.",
      first:
        "I’ve been at Computec Media since 2014—first as a trainee, and since 2016 as a UI/UX Designer & Frontend Developer. I design and build responsive websites, landing pages and WordPress frontends for a range of media brands, and work with backend, marketing and other teams to take projects from UI concepts, wireframes and prototypes through implementation, testing and refinement.",
      second:
        "My focus: UI/UX, web performance, Core Web Vitals and accessibility (WCAG 2.2). I use ChatGPT and Claude for ideation, UI concepts and support with PHP templates, React components and existing projects. I own the concepts, decisions and quality checks.",
    },
    expertise: {
      eyebrow: "The toolkit",
      title: "A considered skill set",
      aside:
        "From the first idea to a tested frontend: four disciplines that come together in my work.",
      noteLabel: "Overview",
      boardLabel: "Areas of practice",
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
            "Accessible, fast experiences—tested and refined with care.",
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
      eyebrow: "The journey so far",
      title: "Experience",
      careerStrip: {
        labels: [
          "Computec Media · UI/UX · Frontend · WordPress",
          "Trainee",
          "World of Cruise",
          "Graphic & print",
        ],
        values: ["2016 — Now", "2014 — 2016", "2011 — 2014", "2008 — 2011"],
      },
      // Descriptions follow the CV (public/Lebenslauf_Daniel_Popa.pdf) — keep both in sync
      entries: [
        {
          date: "July 2016 — Now",
          // career-strip segment this entry belongs to (shared pill colour)
          segment: 1,
          role: "UI/UX Designer & Frontend Developer",
          company: "Computec Media GmbH · Fürth, Germany",
          description:
            "Concept, redesign and continuous optimization of responsive websites and digital applications for a range of media brands. Built a central CSS color system with semantic and reusable variables for consistent UI in light and dark mode (see case study 01). Development and maintenance of frontend components, WordPress themes and PHP templates with HTML, CSS/SCSS and JavaScript. Optimization of web performance, Core Web Vitals, accessibility and SEO. UI concepts, wireframes and prototypes in collaboration with backend, marketing and other teams, with targeted use of AI tools.",
        },
        {
          date: "June 2014 — July 2016",
          // career-strip segment this entry belongs to (shared pill colour)
          segment: 2,
          role: "Trainee UI/UX Design & Frontend Development",
          company: "Computec Media GmbH · Fürth, Germany",
          description:
            "Contributed to the concept, design and development of websites, landing pages and UI prototypes. Developed WordPress themes and frontend components, plus testing and performance optimization.",
        },
        {
          date: "October 2011 — July 2014",
          // career-strip segment this entry belongs to (shared pill colour)
          segment: 3,
          role: "Media Designer · Freelancer",
          company: "World of Cruise SRL · Sibiu, Romania",
          description:
            "Design and development of websites and frontends with HTML, CSS, JavaScript and jQuery. Print and digital media, logos and corporate designs, plus client consulting.",
        },
        {
          date: "March 2008 — August 2011",
          // career-strip segment this entry belongs to (shared pill colour)
          segment: 4,
          role: "Graphic & Media Designer, Digital & Print",
          description:
            "Design of digital and print media, logos and corporate designs, and development of visual concepts.",
        },
      ],
      // Education and languages — one compact row below the timeline
      facts: [
        {
          label: "Education",
          value:
            "College of Computer Science “Consoft-Computers” · Sibiu · 2005 — 2008",
        },
        {
          label: "Languages",
          value: "German & English (business fluent) · Romanian (native)",
        },
      ],
    },
    contact: {
      eyebrow: "Have a good one in mind?",
      title: ["Let’s make", "it matter."],
      description: "Great digital experiences start with a good conversation.",
      channelsLabel: "Ways to connect",
      emailLabel: "Email",
      emailValue: "popadaniel.office@gmail.com",
      linkedinLabel: "LinkedIn",
      linkedinValue: "View profile",
      phoneLabel: "Mobile",
      phoneValue: "+49 152 556 546 20",
      locationLabel: "Location",
      locationValue: "Nuremberg · Remote or hybrid",
      statusLabel: "Contact",
    },
    footer: {
      description:
        "Designed and built in Nuremberg, with React, Vite and SCSS.",
      top: "Back to top",
      home: "Daniel Popa, back to top",
    },
  },
};

const copyrightYear = new Date().getFullYear();

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

function LayoutShiftDemo({ text, language }) {
  const [mode, setMode] = useState("before");
  const [replay, setReplay] = useState(0);
  const [promoLoaded, setPromoLoaded] = useState(false);

  useEffect(() => {
    const timerId = window.setTimeout(() => setPromoLoaded(true), 1400);

    return () => window.clearTimeout(timerId);
  }, [mode, replay]);

  const selectMode = (nextMode) => {
    setPromoLoaded(false);
    setMode(nextMode);
    setReplay((current) => current + 1);
  };

  const status = !promoLoaded
    ? mode === "before"
      ? text.loadingBefore
      : text.loadingAfter
    : mode === "before"
      ? text.loadedBefore
      : text.loadedAfter;

  // Dummy ad — magazine promo in the badge palette (ink, gold, teal)
  const promo = (
    <svg
      aria-label={text.adImage}
      className="quality-mobile-demo__promo-art"
      role="img"
      viewBox="0 0 320 92"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="quality-promo-bg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#232321" />
          <stop offset="1" stopColor="#3a3a36" />
        </linearGradient>
      </defs>
      <rect width="320" height="92" fill="url(#quality-promo-bg)" />
      {/* soft glow + fine dot grid */}
      <circle cx="262" cy="46" r="62" fill="#f3d95d" opacity=".12" />
      <g fill="#fff" opacity=".08">
        {Array.from({ length: 40 }, (_, i) => (
          <circle key={i} cx={176 + (i % 10) * 14} cy={10 + Math.floor(i / 10) * 24} r="1" />
        ))}
      </g>
      {/* stacked magazine covers */}
      <g transform="rotate(-8 252 50)">
        <rect x="222" y="16" width="52" height="68" rx="3" fill="#2c9c84" />
        <rect x="228" y="23" width="28" height="4" rx="2" fill="#fff" opacity=".85" />
        <circle cx="250" cy="56" r="13" fill="#f3d95d" />
      </g>
      <g transform="rotate(6 280 50)">
        <rect x="250" y="12" width="56" height="72" rx="3" fill="#f6f4ec" />
        <rect x="256" y="19" width="30" height="4" rx="2" fill="#232321" />
        <rect x="256" y="27" width="20" height="3" rx="1.5" fill="#99978d" />
        <path d="M256 78 275 50l12 16 7-9 8 21Z" fill="#2c9c84" />
        <circle cx="292" cy="40" r="6" fill="#d9b43c" />
      </g>
      {/* copy */}
      <rect x="16" y="13" width="44" height="13" rx="6.5" fill="none" stroke="#f3d95d" strokeWidth="1" />
      <text x="38" y="22.5" fill="#f3d95d" fontFamily="Arial, sans-serif" fontSize="7" fontWeight="700" letterSpacing=".08em" textAnchor="middle">
        {language === "de" ? "ANZEIGE" : "AD"}
      </text>
      <text x="16" y="42" fill="#c9c7bd" fontFamily="Arial, sans-serif" fontSize="8" fontWeight="700" letterSpacing=".1em">
        {language === "de" ? "NORTHSTAR · MAGAZIN" : "NORTHSTAR · MAGAZINE"}
      </text>
      <text x="16" y="61" fill="#fff" fontFamily="Arial, sans-serif" fontSize="17" fontWeight="700">
        {text.discover}
      </text>
      <rect x="16" y="69" width="18" height="12" rx="6" fill="#f3d95d" />
      <path d="M21.5 75h7m-2.5-2.5 2.5 2.5-2.5 2.5" stroke="#232321" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  // Dummy article hero — "the future of gaming": dusk sky, sun, hills, perspective grid
  const articleArt = (
    <svg
      className="quality-mobile-demo__image"
      aria-hidden="true"
      viewBox="0 0 320 100"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="quality-article-sky" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#1f3440" />
          <stop offset=".7" stopColor="#3f6f72" />
          <stop offset="1" stopColor="#e6d7a0" />
        </linearGradient>
        <linearGradient id="quality-article-sun" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#f6e08a" />
          <stop offset="1" stopColor="#d9b43c" />
        </linearGradient>
      </defs>
      <rect width="320" height="100" fill="url(#quality-article-sky)" />
      <g fill="#fff">
        <circle cx="34" cy="14" r=".9" opacity=".7" />
        <circle cx="78" cy="26" r=".7" opacity=".5" />
        <circle cx="122" cy="10" r="1" opacity=".6" />
        <circle cx="168" cy="22" r=".7" opacity=".5" />
        <circle cx="292" cy="12" r=".9" opacity=".6" />
      </g>
      {/* rising sun behind the hills */}
      <circle cx="214" cy="62" r="30" fill="url(#quality-article-sun)" />
      {/* hills */}
      <path d="M0 74 46 50l34 18 40-30 52 36H0Z" fill="#2a4a50" />
      <path d="M150 76 214 46l58 22 48-14v22Z" fill="#244147" />
      {/* ground with perspective grid */}
      <rect y="74" width="320" height="26" fill="#1b2b30" />
      <g stroke="#2c9c84" strokeWidth=".8" opacity=".75">
        <path d="M0 80h320M0 87h320M0 96h320" />
        <path d="M160 74 40 100M160 74 100 100M160 74v26M160 74l60 26M160 74l120 26M160 74 -40 100M160 74l200 26" />
      </g>
      {/* controller silhouette */}
      <g transform="translate(60 78)">
        <path d="M6 0h20c5 0 8 4 9 9l1 5c.5 3-2.5 4.5-4.5 2.5L28 13H4l-3.5 3.5C-1.5 18.5-4.5 17-4 14l1-5C-2 4 1 0 6 0Z" fill="#f6f4ec" />
        <path d="M5 5v5M2.5 7.5h5" stroke="#232321" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="25" cy="6" r="1.4" fill="#d9b43c" />
        <circle cx="28.5" cy="9" r="1.4" fill="#2c9c84" />
      </g>
    </svg>
  );

  return (
    <div className="quality-layout-demo">
      <div
        className="quality-layout-demo__controls"
        role="group"
        aria-label={text.layoutLabel}
      >
        <button
          aria-pressed={mode === "before"}
          onClick={() => selectMode("before")}
          type="button"
        >
          {text.before}
        </button>
        <button
          aria-pressed={mode === "after"}
          onClick={() => selectMode("after")}
          type="button"
        >
          {text.after}
        </button>
        <button
          className="quality-layout-demo__replay"
          onClick={() => {
            setPromoLoaded(false);
            setReplay((current) => current + 1);
          }}
          type="button"
        >
          {text.replay}
        </button>
      </div>

      <div className="quality-mobile-demo" data-mode={mode} lang={language}>
        <div className="quality-mobile-demo__topbar">
          <span>NORTHSTAR</span>
          <span aria-hidden="true">☰</span>
        </div>
        {articleArt}
        <p className="quality-mobile-demo__eyebrow">{text.topbar}</p>
        <h5>{text.articleTitle}</h5>
        <p className="quality-mobile-demo__intro">{text.intro}</p>

        {mode === "after" && (
          <div
            className="quality-mobile-demo__reserved"
            aria-label={text.reserved}
          >
            {promoLoaded ? (
              promo
            ) : (
              <span className="quality-mobile-demo__reserved-label">
                {text.reservedText}
                <small>320 × 92</small>
              </span>
            )}
          </div>
        )}
        {mode === "before" && promoLoaded && (
          <div className="quality-mobile-demo__loaded-promo">{promo}</div>
        )}
        <div className="quality-mobile-demo__below">
          <span>{text.readMore}</span>
          <p>{text.below}</p>
        </div>
      </div>

      <div className="quality-layout-demo__footer">
        <p
          className="quality-layout-demo__status"
          aria-live="polite"
          role="status"
        >
          {status}
        </p>
      </div>
    </div>
  );
}

function KeyboardFocusDemo({ text }) {
  return (
    <div className="quality-focus-demo">
      <p className="quality-focus-demo__instruction">{text.focusInstruction}</p>
      <div className="quality-focus-demo__comparison">
        <div className="quality-focus-demo__example quality-focus-demo__example--before">
          <span className="quality-focus-demo__label">{text.beforeFocus}</span>
          <nav aria-label={text.withoutFocus}>
            <a href="#quality-focus-demo-article">{text.latest}</a>
            <a
              className="quality-focus-demo__sample-focus"
              href="#quality-focus-demo-article"
            >
              {text.reviews}
            </a>
          </nav>
          <small>{text.focusBlends}</small>
        </div>
        <div className="quality-focus-demo__example quality-focus-demo__example--after">
          <span className="quality-focus-demo__label">{text.afterFocus}</span>
          <a
            className="quality-focus-demo__skip"
            href="#quality-focus-demo-article"
          >
            {text.skipArticle}
          </a>
          <nav aria-label={text.withFocus}>
            <a href="#quality-focus-demo-article">{text.latest}</a>
            <a href="#quality-focus-demo-article">{text.reviews}</a>
          </nav>
          <article
            aria-label={text.demoArticle}
            id="quality-focus-demo-article"
            tabIndex="-1"
          >
            <h5>{text.demoArticle}</h5>
            <p>{text.skipNavigation}</p>
          </article>
        </div>
      </div>
    </div>
  );
}

function PollModule({ text }) {
  const [theme, setTheme] = useState("light");
  const [domain, setDomain] = useState("northstar");
  const participants = 25;

  return (
    <div className="pollModuleShell" data-domain={domain} data-theme={theme}>
      <div className="pollModule__controls">
        <fieldset className="pollModule__switcher">
          <legend>{text.portal}</legend>
          <div>
            {Object.entries(countdownDomains).map(([domainKey, portal]) => (
              <button
                aria-pressed={domain === domainKey}
                key={domainKey}
                onClick={() => setDomain(domainKey)}
                type="button"
              >
                {portal.name}
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset className="pollModule__switcher">
          <legend>{text.appearance}</legend>
          <div>
            {["light", "dark"].map((mode) => (
              <button
                aria-pressed={theme === mode}
                key={mode}
                onClick={() => setTheme(mode)}
                type="button"
              >
                {mode === "light" ? text.light : text.dark}
              </button>
            ))}
          </div>
        </fieldset>
      </div>
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

function LanguageSwitcher({ language, onChange, label }) {
  return (
    <div className="language-switch" role="group" aria-label={label}>
      <button
        aria-label="Deutsch"
        aria-pressed={language === "de"}
        className="language-switch__option"
        onClick={() => onChange("de")}
        type="button"
      >
        <svg
          aria-hidden="true"
          className="language-switch__flag"
          viewBox="0 0 24 24"
        >
          <defs>
            <clipPath id="language-flag-de">
              <circle cx="12" cy="12" r="11" />
            </clipPath>
          </defs>
          <g clipPath="url(#language-flag-de)">
            <path fill="#000" d="M0 0h24v8H0z" />
            <path fill="#dd0000" d="M0 8h24v8H0z" />
            <path fill="#ffce00" d="M0 16h24v8H0z" />
          </g>
          <circle
            cx="12"
            cy="12"
            r="11"
            fill="none"
            stroke="currentColor"
            strokeOpacity=".14"
          />
        </svg>
        <span>DE</span>
      </button>
      <button
        aria-label="English"
        aria-pressed={language === "en"}
        className="language-switch__option"
        onClick={() => onChange("en")}
        type="button"
      >
        <svg
          aria-hidden="true"
          className="language-switch__flag"
          viewBox="0 0 24 24"
        >
          <defs>
            <clipPath id="language-flag-en">
              <circle cx="12" cy="12" r="11" />
            </clipPath>
          </defs>
          <g clipPath="url(#language-flag-en)">
            <path fill="#012169" d="M0 0h24v24H0z" />
            <path d="m0 0 24 24m0-24L0 24" stroke="#fff" strokeWidth="5" />
            <path d="m0 0 24 24m0-24L0 24" stroke="#c8102e" strokeWidth="2" />
            <path d="M12 0v24M0 12h24" stroke="#fff" strokeWidth="8" />
            <path d="M12 0v24M0 12h24" stroke="#c8102e" strokeWidth="4" />
          </g>
          <circle
            cx="12"
            cy="12"
            r="11"
            fill="none"
            stroke="currentColor"
            strokeOpacity=".14"
          />
        </svg>
        <span>EN</span>
      </button>
    </div>
  );
}

// Note-card icons — drawn on a 48-unit grid in the hero-badge style:
// white shapes with an ink outline, accents in badge gold / teal.
// Fill roles come from classes (see _note-card.scss): default white,
// .is-gold, .is-teal, .is-ink, .is-line (stroke only).
const noteIcons = {
  // Fanned colour swatches — design tokens
  swatches: (
    <>
      <rect x="17.5" y="7" width="13" height="31" rx="3" transform="rotate(-24 24 38)" />
      <rect className="is-teal" x="17.5" y="7" width="13" height="31" rx="3" />
      <rect className="is-gold" x="17.5" y="7" width="13" height="31" rx="3" transform="rotate(24 24 38)" />
      <path className="is-line" d="M21 12.5h6M21 16.5h6" transform="rotate(24 24 38)" />
      <circle cx="24" cy="38" r="2.6" />
    </>
  ),
  // Stopwatch with a gold progress wedge — release countdown
  stopwatch: (
    <>
      <rect x="19.5" y="3.5" width="9" height="5" rx="1.6" />
      <path className="is-line" d="M24 8.5v3.5M35.4 13.6l2.4-2.4" />
      <circle cx="24" cy="28" r="15" />
      <path className="is-gold" d="M24 28V17a11 11 0 0 1 9.5 16.5Z" />
      <path className="is-line" d="M24 15.5v1.6M36.5 28h-1.6M24 40.5v-1.6M11.5 28h1.6" />
      <circle className="is-ink" cx="24" cy="28" r="2.1" />
    </>
  ),
  // Cursor clicking a button, with a sparkle — UX details
  cursor: (
    // Scaled 1.15× and re-centred: the drawing (x 5–45, y 5–36) sat small and high
    <g transform="translate(24 24) scale(1.15) translate(-25 -20.6)">
      <rect className="is-teal" x="5" y="11" width="27" height="17" rx="5" />
      <path className="is-line" d="M10.5 19.5h9" />
      <path d="M24.5 21.5 39 27.4l-6.4 2.3-2.5 6.6Z" />
      <path className="is-gold" d="m40.5 5 1.3 3.5 3.5 1.3-3.5 1.3-1.3 3.5-1.3-3.5-3.5-1.3 3.5-1.3Z" />
    </g>
  ),
  // Toolbox with a gold latch — skill set
  toolbox: (
    <>
      <path className="is-line" d="M18 15v-4.5a2.5 2.5 0 0 1 2.5-2.5h7a2.5 2.5 0 0 1 2.5 2.5V15" />
      <rect x="5" y="15" width="38" height="24" rx="4" />
      <path className="is-line" d="M5 25h38M12 15v24M36 15v24" />
      <rect className="is-gold" x="19.5" y="21.5" width="9" height="8" rx="2" />
    </>
  ),
  // Browser window with a cursor — UI/UX design
  interface: (
    <>
      <rect x="4" y="8" width="40" height="30" rx="4" />
      <path className="is-teal" d="M4 12a4 4 0 0 1 4-4h32a4 4 0 0 1 4 4v4H4Z" />
      <path className="is-line" d="M11 24h14M11 30h9" />
      <rect className="is-gold" x="30" y="22" width="8" height="10" rx="2" />
      <path d="m31 31 9 3.6-3.9 1.4-1.5 4Z" />
    </>
  ),
  // Stacked layers — visual design & systems
  systems: (
    <>
      <path d="M24 26 6 18l18-8 18 8Z" transform="translate(0 12)" />
      <path className="is-teal" d="M24 26 6 18l18-8 18 8Z" transform="translate(0 6)" />
      <path className="is-gold" d="M24 26 6 18l18-8 18 8Z" />
    </>
  ),
  // Code window — frontend & WordPress
  development: (
    <>
      <rect x="4" y="8" width="40" height="32" rx="4" />
      <path className="is-line" d="M4 15h40" />
      <circle className="is-gold" cx="9.5" cy="11.5" r="1.4" />
      <circle className="is-teal" cx="14" cy="11.5" r="1.4" />
      <path className="is-line" d="m17 22-5 5.5 5 5.5M31 22l5 5.5-5 5.5M26.5 20.5l-5 14" />
    </>
  ),
  // Shield with a check — quality & accessibility
  quality: (
    <>
      <path d="M24 4 40 10v11c0 10-6.8 17.3-16 21-9.2-3.7-16-11-16-21V10Z" />
      <path className="is-teal" d="M24 9.5 35 13.7v7.5c0 7.3-4.7 12.6-11 15.4-6.3-2.8-11-8.1-11-15.4v-7.5Z" />
      <path className="is-line" d="m18.5 23 4 4 7.5-8" />
      <circle className="is-gold" cx="38" cy="38" r="4" />
    </>
  ),
  // Two speech bubbles — contact
  chat: (
    <>
      <path d="M5 10a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v11a4 4 0 0 1-4 4H16l-7 5v-5.4A4 4 0 0 1 5 21Z" />
      <path className="is-line" d="M11 13h16M11 18h10" />
      <path className="is-teal" d="M43 23a4 4 0 0 0-4-4H25a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h8l6 4.5V35a4 4 0 0 0 4-4Z" />
      <circle className="is-gold" cx="27.5" cy="27" r="1.6" />
      <circle className="is-gold" cx="32" cy="27" r="1.6" />
      <circle className="is-gold" cx="36.5" cy="27" r="1.6" />
    </>
  ),
  // Target with an arrow — the approach
  target: (
    <>
      <circle cx="22" cy="26" r="16" />
      <circle className="is-teal" cx="22" cy="26" r="10" />
      <circle className="is-gold" cx="22" cy="26" r="4" />
      <path className="is-line" d="M22 26 39 9M33 8.5h6.5V15" />
    </>
  ),
  // Light bulb — why it matters
  bulb: (
    <>
      <path d="M24 7a12 12 0 0 0-7 21.7c1.3 1 2 2.5 2 4.1V35h10v-2.2c0-1.6.7-3.1 2-4.1A12 12 0 0 0 24 7Z" />
      <path className="is-line" d="m20 22 4 4 4-4M24 26v8" />
      <rect className="is-gold" x="18.5" y="37" width="11" height="5" rx="2" />
      <path className="is-line" d="M5 19h3.5M39.5 19H43M9.5 6.5l2.5 2.5M38.5 6.5 36 9" />
    </>
  ),
  // Puzzle piece — my contribution
  puzzle: (
    <>
      <path
        className="is-teal"
        d="M8 14h9a4.5 4.5 0 1 1 9 0h9v9a4.5 4.5 0 1 1 0 9v9h-9a4.5 4.5 0 1 0-9 0H8v-9a4.5 4.5 0 1 0 0-9Z"
      />
      <circle className="is-gold" cx="40" cy="9" r="4" />
    </>
  ),
  // Unlabelled colour drop with a blank, dashed name tag — unsemantic token
  unsemantic: (
    <>
      <path className="is-teal" d="M17 5c-6.5 9-11 15.3-11 21.5a11 11 0 0 0 22 0C28 20.3 23.5 14 17 5Z" />
      <path className="is-line" d="M11.5 27.5a5.5 5.5 0 0 0 5.5 5.5" />
      <path d="M30 23h9.5l5 6-5 6H30a2.5 2.5 0 0 1-2.5-2.5v-7A2.5 2.5 0 0 1 30 23Z" />
      <path className="is-line" d="M31.5 29h5" strokeDasharray="1.6 1.8" />
      <circle className="is-gold" cx="40" cy="29" r="1.6" />
    </>
  ),
  // Signpost — career path
  signpost: (
    <>
      <path className="is-line" d="M24 5v34" />
      <path d="M24 9h14.5l4 4.5-4 4.5H24Z" />
      <path className="is-teal" d="M24 21H9.5l-4 4.5 4 4.5H24Z" />
      <rect className="is-gold" x="15" y="39" width="18" height="5" rx="2.5" />
    </>
  ),
};

// Rounded hexagon shape from Hero-Badge.svg.
const HEX_PATH =
  "M84.89,1c6.01,0,11.08,1.58,16.46,4.75l55.72,31.97c7.6,4.43,11.71,11.4,11.71,20.58v70.91c0,9.5-4.12,16.14-11.71,20.58l-55.72,32.61c-10.45,6.01-22.48,6.01-32.92,0l-55.72-32.61c-7.6-4.43-11.71-11.08-11.71-20.58V58.3c0-9.18,4.12-16.14,11.71-20.58L68.43,5.75c5.38-3.17,10.45-4.75,16.46-4.75Z";

// Star from Hero-Badge.svg, used on the "achievement" coin.
const STAR_PATH =
  "M85.44,165.11l5.82,9.92c.09.16.24.27.42.3l11.3,2.43c.48.1.67.69.34,1.06l-7.7,8.55c-.12.13-.18.31-.16.49l1.16,11.42c.05.49-.45.85-.9.65l-10.58-4.63c-.16-.07-.35-.07-.52,0l-10.58,4.63c-.45.2-.95-.16-.9-.65l1.16-11.42c.02-.18-.04-.36-.16-.49l-7.7-8.55c-.33-.37-.14-.95.34-1.06l11.3-2.43c.18-.04.33-.15.42-.3l5.82-9.92c.25-.42.86-.42,1.11,0Z";

// ---------------------------------------------------------------------------
// Badge primitives (styles: _badge.scss) — shared by note cards and About.
// ---------------------------------------------------------------------------

// Rounded hexagon in the offset-print style (as <NumberMark>): gold copy
// shifted down-right, white face, ink outline. Children are drawn in its
// 170×188 coordinate space. Shift size: --hex-shift (_badge.scss).
function HexEmblem({ children }) {
  return (
    <svg className="hex-emblem" viewBox="-2 -2 173.78 192" aria-hidden="true">
      <path className="hex-emblem__tint" d={HEX_PATH} />
      <path className="hex-emblem__shape" d={HEX_PATH} />
      {children}
    </svg>
  );
}

// One of the 48-unit icons, centred in the hexagon.
function HexIcon({ name }) {
  return (
    <g className="hex-emblem__icon" transform="translate(33.3 42.4) scale(2.15)">
      {noteIcons[name]}
    </g>
  );
}

// White coin: "typing" dots, the gold star, or a waving hand.
function BadgeCoin({ variant = "dots" }) {
  return (
    <span className={`badge-coin badge-coin--${variant}`} aria-hidden="true">
      {variant === "star" ? (
        <svg viewBox="65 163 40 40">
          <path d={STAR_PATH} />
        </svg>
      ) : variant === "wave" ? (
        <svg viewBox="0 0 24 24">
          <g className="badge-coin__hand">
            <path d="M9 21.5C6.6 20.6 4.9 18.4 4.4 15.9l-.9-4.3A1.3 1.3 0 0 1 6 11l1.3 3.2V5.2a1.4 1.4 0 0 1 2.8 0V3.6a1.4 1.4 0 0 1 2.8 0v1a1.4 1.4 0 0 1 2.8 0v2.6a1.4 1.4 0 0 1 2.8 0v7.4c0 3.8-2.9 7-6.7 7.2-1 .1-1.9 0-2.8-.3Z" />
            <path className="is-line" d="M10.1 5.2v6.3M12.9 4.6v6.9M15.7 7.2v4.8" />
          </g>
          <path className="is-line" d="M19.6 2.6c1.2.6 2 1.6 2.3 2.9M2.3 5.2c.3-1.3 1.1-2.3 2.3-2.9" />
        </svg>
      ) : (
        <>
          <i />
          <i />
          <i />
        </>
      )}
    </span>
  );
}

// Number in a mark, poll-mark style: gold copy offset down-right, white face,
// thin ink outline. "bubble" points left (towards the text it belongs to,
// tail vertically centred); "circle" is a plain disc.
const NUMBER_MARK_SHAPES = {
  bubble: {
    viewBox: "0 0 28 24",
    d: "M8.5 3h15A2.5 2.5 0 0 1 26 5.5v13a2.5 2.5 0 0 1-2.5 2.5h-15A2.5 2.5 0 0 1 6 18.5v-4L1.6 12 6 9.5v-4A2.5 2.5 0 0 1 8.5 3Z",
  },
  circle: {
    viewBox: "0 0 24 24",
    d: "M12 2.6a9.4 9.4 0 1 1 0 18.8 9.4 9.4 0 0 1 0-18.8Z",
  },
};

function NumberMark({ shape, className = "", hidden = false, children }) {
  const { viewBox, d } = NUMBER_MARK_SHAPES[shape];
  return (
    <span
      className={`number-mark number-mark--${shape} ${className}`}
      aria-hidden={hidden || undefined}
    >
      <svg viewBox={viewBox} fill="none" aria-hidden="true">
        <path className="number-mark__tint" d={d} transform="translate(1.6 1.4)" />
        <path className="number-mark__face" d={d} />
      </svg>
      <span className="number-mark__text">{children}</span>
    </span>
  );
}

// Contact speech bubble — the BubbleTalk.svg outline traced in the poll-mark
// style: tinted copy offset down-right, paper face with a thin outline.
// The SVG stretches to the text box; non-scaling strokes keep the line thin.
const BUBBLE_PATH =
  "M83.96 156.59c49.25.34 64.02-.85 82.87-5.43 18.85-4.58 32.6-22.58 33.62-53.83 1.02-31.25-1.53-46.36-3.57-59.09C194.85 25.49 188.56-.83 101.45.02 19.28 0 0 16.14 0 67.45c.3 61.71 10.68 81 44.5 85.45 0 15.72.06 22.88.23 26.61s.25 4.67 1.53 5.43c1.13.58 2.72-.08 6.62-3.06 3.91-2.97 31.08-25.3 31.08-25.3Z";

function ContactBubble() {
  return (
    <svg
      className="contact__bubble-art"
      viewBox="-2 -2 211 194"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path className="contact__bubble-tint" d={BUBBLE_PATH} transform="translate(3.6 3.4)" />
      <path className="contact__bubble-face" d={BUBBLE_PATH} vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

// Poll marks (? and !) — offset-print look: a tinted fill shifted down-right,
// a thin outline on top (same idea as the contact speech bubble). The glyph
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

function NoteCard({ icon, label, tab, children }) {
  return (
    <div className="note-card badge-card">
      <div className="note-card__head">
        <span className="badge-emblem note-card__emblem">
          <HexEmblem>
            <HexIcon name={icon} />
          </HexEmblem>
          <BadgeCoin />
        </span>
        <span className="badge-tags">
          <span className="badge-tag">{label}</span>
          <span className="badge-tag badge-tag--fact">{tab}</span>
        </span>
      </div>
      <p className="note-card__text">{children}</p>
    </div>
  );
}

// Text clamped to `lines` lines; a Read more / Show less toggle appears only
// when the full text is longer. Re-measured on resize (ResizeObserver).
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
        </button>
      )}
    </>
  );
}

// Takeaway cards: on desktop (4 columns) every text is clamped to the line
// count of the shortest text, so all cards share its height. Cards whose text
// is cut get a "Read more" toggle; below 1081px the full text always shows.
const TAKEAWAY_DESKTOP = "(min-width: 1081px)";

function Takeaways({ items, moreLabel, lessLabel }) {
  const listRef = useRef(null);
  const [lines, setLines] = useState(0);
  const [cut, setCut] = useState([]);
  const [open, setOpen] = useState([]);
  const baseId = useId();
  // Re-measure when the texts change (language switch), not on every render
  const textKey = items.map((item) => item.text).join("|");

  useEffect(() => {
    const list = listRef.current;
    if (!list) return undefined;
    const desktop = window.matchMedia(TAKEAWAY_DESKTOP);

    const measure = () => {
      if (!desktop.matches) {
        setLines(0);
        setCut([]);
        return;
      }
      const texts = [...list.querySelectorAll(".token-case-study__takeaway-text")];
      if (!texts.length) return;
      const lineHeight = parseFloat(getComputedStyle(texts[0]).lineHeight);
      // scrollHeight is the full text height, also while the text is clamped
      const counts = texts.map((p) => Math.round(p.scrollHeight / lineHeight));
      const min = Math.min(...counts);
      setLines(min);
      const next = counts.map((count) => count > min);
      setCut((prev) => (prev.join() === next.join() ? prev : next));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    desktop.addEventListener("change", measure);
    return () => {
      observer.disconnect();
      desktop.removeEventListener("change", measure);
    };
  }, [textKey]);

  const toggle = (index) =>
    setOpen((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });

  return (
    <div
      ref={listRef}
      className="token-case-study__takeaways"
      style={lines ? { "--takeaway-lines": lines } : undefined}
    >
      {items.map((item, index) => {
        const textId = `${baseId}-takeaway-${index}`;
        const clamped = lines > 0 && cut[index] && !open[index];
        return (
          <div className="token-case-study__takeaway badge-card" key={item.icon}>
            <span className="badge-emblem token-case-study__takeaway-icon">
              <HexEmblem>
                <HexIcon name={item.icon} />
              </HexEmblem>
            </span>
            <div>
              <span className="badge-tag badge-tag--ghost">{item.label}</span>
              <p
                id={textId}
                className={`token-case-study__takeaway-text${clamped ? " is-clamped" : ""}`}
              >
                {item.text}
              </p>
              {lines > 0 && cut[index] && (
                <button
                  type="button"
                  className="token-case-study__takeaway-more"
                  aria-expanded={Boolean(open[index])}
                  aria-controls={textId}
                  onClick={() => toggle(index)}
                >
                  {open[index] ? lessLabel : moreLabel}
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [language, setLanguage] = useState("de");
  const [selectedCountdownDomain, setSelectedCountdownDomain] =
    useState("northstar");
  const [selectedCountdownTheme, setSelectedCountdownTheme] = useState("light");

  const closeMenu = () => setMenuOpen(false);
  const countdownDomain = countdownDomains[selectedCountdownDomain];
  const text = copy[language];

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

      <header className="site-header" id="page-top">
        <div className="site-header__inner">
          <a
            className="wordmark"
            href="#page-top"
            aria-label={text.home}
            onClick={closeMenu}
          >
            <span className="wordmark__symbol">
              <img src={siteLogo} alt="" />
            </span>
            <span className="wordmark__name">Daniel Popa</span>
          </a>

          <nav
            className={`primary-navigation${menuOpen ? " is-open" : ""}`}
            id="primary-navigation"
            aria-label={text.nav.label}
          >
            <a href="#work" onClick={closeMenu}>
              {text.nav.work}
            </a>
            <a href="#about" onClick={closeMenu}>
              {text.nav.about}
            </a>
            <a href="#expertise" onClick={closeMenu}>
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
      </header>

      <div className="portfolio-shell">
        <main id="main">
          <section
            className="hero section-wrap"
            id="top"
            aria-labelledby="hero-title"
          >
            <div className="hero__copy">
              <p className="hero__greeting">
                <span className="hero__greeting-tint" aria-hidden="true" />
                <span className="hero__greeting-text">
                  {text.hero.greeting}
                </span>
                <BadgeCoin variant="wave" />
              </p>
              <h1 id="hero-title">
                Daniel <span>Popa</span>
              </h1>
              <p className="hero__role">
                <span>{text.hero.role[0]}</span>
                <span>{text.hero.role[1]}</span>
              </p>
              <div className="hero__rule" aria-hidden="true" />
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
                  <img className="hero-art__badge" src={heroBadge} alt="" />

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
                icon="swatches"
                label={text.work.noteLabel}
                tab={text.work.noteTab}
              >
                {text.work.aside}
              </NoteCard>
            </div>

            <div className="work__feature-grid">
              <div className="work__story-column badge-card">
                <article
                  className="token-case-study"
                  aria-labelledby="token-case-title"
                >
                  <div className="token-case-study__story">
                    <p className="token-case-study__index">
                      {text.work.tokenIndex}
                    </p>
                    <h3 id="token-case-title">
                      {text.work.tokenTitle[0]}
                      <br />
                      {text.work.tokenTitle[1]}
                    </h3>
                    <p className="token-case-study__lead">
                      {text.work.tokenLead}
                    </p>

                    {/* Token list — three groups, one shared column grid:
                        swatch | token | description */}
                    <div className="token-case-study__tokens">
                      <div className="token-case-study__group">
                        <span className="token-case-study__label">
                          {text.work.brandColor}
                        </span>
                        <p>{text.work.brandDescription}</p>
                        <div className="token-case-study__layers">
                          {Object.entries(countdownDomains).map(
                            ([domainKey, domain]) => (
                              <div key={domainKey}>
                                <span
                                  className="token-case-study__swatch"
                                  style={{ backgroundColor: domain.cc25 }}
                                  aria-hidden="true"
                                />
                                <div>
                                  <code>--PrCl1 · {domain.cc25}</code>
                                  <span>{domain.name}</span>
                                </div>
                              </div>
                            ),
                          )}
                        </div>
                      </div>

                      <div className="token-case-study__group">
                        <span className="token-case-study__label">
                          {text.work.reusableRole}
                        </span>
                        <div className="token-case-study__layers">
                        <div>
                          <span
                            className="token-case-study__swatch token-case-study__swatch--role"
                            aria-hidden="true"
                          />
                          <div>
                            <code>--lk → --PrCl1</code>
                            <span>{text.work.roleDescription}</span>
                          </div>
                        </div>
                        </div>
                      </div>

                      <div className="token-case-study__group">
                        <span className="token-case-study__label">
                          {text.work.layers}
                        </span>
                        <div className="token-case-study__layers">
                        <div>
                          <span
                            className="token-case-study__swatch token-case-study__swatch--neutral"
                            aria-hidden="true"
                          />
                          <div>
                            <code>--gr5 · #f2f2f2</code>
                            <span>{text.work.neutral}</span>
                          </div>
                        </div>
                        <div>
                          <span
                            className="token-case-study__swatch token-case-study__swatch--brand"
                            aria-hidden="true"
                          />
                          <div>
                            <code>--PrCl1 · {countdownDomains.northstar.cc25}</code>
                            <span>{text.work.primary}</span>
                          </div>
                        </div>
                        <div>
                          <span
                            className="token-case-study__swatch token-case-study__swatch--semantic"
                            aria-hidden="true"
                          />
                          <div>
                            <code>--lk · --artTtl · --bgMd</code>
                            <span>{text.work.semantic}</span>
                          </div>
                        </div>
                        <div>
                          <span
                            className="token-case-study__swatch token-case-study__swatch--unsemantic"
                            aria-hidden="true"
                          />
                          <div>
                            <code>--Cc25 · {countdownDomains.northstar.cc25}</code>
                            <span>{text.work.unsemantic}</span>
                          </div>
                        </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </div>

              <div className="work__poll-column">
                <PollModule text={text.work} />
              </div>

              <Takeaways
                moreLabel={text.work.takeawayMore}
                lessLabel={text.work.takeawayLess}
                items={[
                  { icon: "target", label: text.work.approachLabel, text: text.work.approach },
                  { icon: "bulb", label: text.work.mattersLabel, text: text.work.matters },
                  { icon: "puzzle", label: text.work.contributionLabel, text: text.work.contribution },
                  { icon: "unsemantic", label: text.work.unsemanticLabel, text: text.work.unsemanticText },
                ]}
              />
            </div>

            <article
              className="countdown-case-study"
              aria-labelledby="countdown-case-title"
            >
              <div className="countdown-case-study__heading">
                <div>
                  <p className="token-case-study__index">
                    {text.work.countdownIndex}
                  </p>
                  <h3 id="countdown-case-title">
                    {text.work.countdownTitle[0]}
                    <br />
                    {text.work.countdownTitle[1]}
                  </h3>
                </div>
                <NoteCard
                  icon="stopwatch"
                  label={text.work.countdownNoteLabel}
                  tab={text.work.countdownNoteTab}
                >
                  {text.work.countdownDescription}
                </NoteCard>
              </div>

              <div className="countdown-case-study__controls">
                <fieldset>
                  <legend>{text.work.portal}</legend>
                  <div className="countdown-case-study__options">
                    {Object.entries(countdownDomains).map(
                      ([domainKey, domain]) => (
                        <button
                          aria-pressed={selectedCountdownDomain === domainKey}
                          className="countdown-case-study__option"
                          key={domainKey}
                          onClick={() => setSelectedCountdownDomain(domainKey)}
                          type="button"
                        >
                          {domain.name}
                        </button>
                      ),
                    )}
                  </div>
                </fieldset>
                <fieldset>
                  <legend>{text.work.appearance}</legend>
                  <div className="countdown-case-study__options">
                    {["light", "dark"].map((theme) => (
                      <button
                        aria-pressed={selectedCountdownTheme === theme}
                        className="countdown-case-study__option"
                        key={theme}
                        onClick={() => setSelectedCountdownTheme(theme)}
                        type="button"
                      >
                        {theme === "light" ? text.work.light : text.work.dark}
                      </button>
                    ))}
                  </div>
                </fieldset>
              </div>

              <section
                aria-label={`${countdownDomain.name}: ${text.work.countdownLabel}`}
                className="CountdownModule posRel"
                data-domain={selectedCountdownDomain}
                data-theme={selectedCountdownTheme}
              >
                <div className="countdownContent flx flxDirCol flxJustBtw p-5">
                  <div className="countdownHead">
                    <h4 className="countdownTitle txtCc1">
                      <span className="countdownTitleGame">Shadowstone:</span>
                      <span className="countdownReleaseTitle">
                        {language === "de"
                          ? "Der Release-Countdown"
                          : "Release countdown"}
                      </span>
                    </h4>
                  </div>
                  <div className="countdownBottom">
                    <CountdownTimer text={text.timer} />
                    <a
                      className="countdownButton btn txtUp fw700"
                      href="#experience"
                    >
                      {text.work.countdownButton}
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
                <time
                  className="countdownBadge flx flxDirCol fw700"
                  dateTime="2026-11-19"
                >
                  <span className="countdownBadgeLabel txtUp">
                    {text.work.release}
                  </span>
                  <span className="countdownBadgeDate">19.11.</span>
                  <span className="countdownBadgeYear">2026</span>
                </time>
              </section>

              <div
                className="countdown-case-study__token-note badge-card"
                data-domain={selectedCountdownDomain}
                data-theme={selectedCountdownTheme}
                style={{
                  "--Cc25": countdownDomain.cc25,
                  "--Cc25-dark": countdownDomain.cc25Dark,
                  "--module-accent":
                    selectedCountdownTheme === "dark"
                      ? countdownDomain.cc25Dark
                      : countdownDomain.cc25,
                }}
              >
                {/* Same token list as case study 01: group label, note,
                    rows of swatch | token | mode */}
                <div className="token-case-study__tokens">
                  <div className="token-case-study__group">
                    <span className="token-case-study__label">
                      {text.work.titleColorLabel}
                    </span>
                    <p>{text.work.paletteNote}</p>
                    <div
                      className="token-case-study__layers"
                      role="group"
                      aria-label={text.work.titleColorComparison}
                    >
                    <div>
                      <span
                        className="token-case-study__swatch countdown-case-study__swatch countdown-case-study__swatch--title-light"
                        aria-hidden="true"
                      />
                      <div>
                        <code>{text.work.titleColorLightToken}</code>
                        <span>{text.work.lightMode}</span>
                      </div>
                    </div>
                    <div>
                      <span
                        className="token-case-study__swatch countdown-case-study__swatch countdown-case-study__swatch--title-dark"
                        aria-hidden="true"
                      />
                      <div>
                        <code>{text.work.titleColorDarkToken}</code>
                        <span>{text.work.darkMode}</span>
                      </div>
                    </div>
                    </div>
                  </div>

                  <div className="token-case-study__group">
                    <span className="token-case-study__label">
                      {text.work.brandAccentLabel}
                    </span>
                    <p>{text.work.brandAccentNote}</p>
                    <div
                      className="token-case-study__layers"
                      role="group"
                      aria-label={text.work.brandAccentComparison}
                    >
                    <div>
                      <span
                        className="token-case-study__swatch countdown-case-study__swatch countdown-case-study__swatch--accent-light"
                        aria-hidden="true"
                      />
                      <div>
                        <code>
                          {text.work.brandAccentLightToken} {countdownDomain.cc25}
                        </code>
                        <span>{text.work.lightMode}</span>
                      </div>
                    </div>
                    <div>
                      <span
                        className="token-case-study__swatch countdown-case-study__swatch countdown-case-study__swatch--accent-dark"
                        aria-hidden="true"
                      />
                      <div>
                        <code>
                          {text.work.brandAccentDarkToken}{" "}
                          {selectedCountdownTheme === "dark"
                            ? "#020202"
                            : countdownDomain.cc25Dark}
                        </code>
                        <span>{text.work.darkMode}</span>
                      </div>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>

            <section
              className="quality-case-study"
              aria-labelledby="quality-case-title"
            >
              <div className="quality-case-study__heading">
                <div>
                  <p className="token-case-study__index">
                    {text.quality.index}
                  </p>
                  <h3 id="quality-case-title">{text.quality.title}</h3>
                </div>
                <NoteCard
                  icon="cursor"
                  label={text.quality.noteLabel}
                  tab={text.quality.noteTab}
                >
                  {text.quality.description}
                </NoteCard>
              </div>

              <div className="quality-case-study__grid">
                <article
                  className="quality-card badge-card"
                  aria-labelledby="quality-cls-title"
                >
                  <NumberMark shape="circle" className="quality-card__number" hidden>
                    01
                  </NumberMark>
                  <div className="quality-card__copy">
                    <h4 id="quality-cls-title">
                      {text.quality.cards[0].title}
                    </h4>
                    <p>{text.quality.cards[0].description}</p>
                  </div>
                  <div className="quality-card__detail">
                    <LayoutShiftDemo text={text.demo} language={language} />
                    <p className="quality-card__metric">
                      {text.quality.cards[0].metric}
                    </p>
                  </div>
                </article>

                <article
                  className="quality-card badge-card"
                  aria-labelledby="quality-keyboard-title"
                >
                  <NumberMark shape="circle" className="quality-card__number" hidden>
                    02
                  </NumberMark>
                  <div className="quality-card__copy">
                    <h4 id="quality-keyboard-title">
                      {text.quality.cards[1].title}
                    </h4>
                    <p>{text.quality.cards[1].description}</p>
                  </div>
                  <div className="quality-card__detail">
                    <KeyboardFocusDemo text={text.demo} />
                    <span className="badge-tag badge-tag--ghost quality-card__criterion">
                      {text.quality.cards[1].criterion}
                    </span>
                  </div>
                </article>

                <article
                  className="quality-card badge-card"
                  aria-labelledby="quality-controls-title"
                >
                  <NumberMark shape="circle" className="quality-card__number" hidden>
                    03
                  </NumberMark>
                  <div className="quality-card__copy">
                    <h4 id="quality-controls-title">
                      {text.quality.cards[2].title}
                    </h4>
                    <p>{text.quality.cards[2].description}</p>
                  </div>
                  <div className="quality-card__detail">
                    <div
                      className="quality-compare"
                      aria-label={text.quality.beforeAfter}
                    >
                      <div className="quality-compare__panel">
                        <span>{text.quality.before}</span>
                        <div className="quality-demo quality-demo--control-before">
                          <span
                            className="quality-demo__target quality-demo__target--small"
                            aria-hidden="true"
                          />
                          <small>{text.quality.unlabeled}</small>
                        </div>
                      </div>
                      <div className="quality-compare__panel">
                        <span>{text.quality.after}</span>
                        <div className="quality-demo quality-demo--control-after">
                          <div className="quality-demo__control-example">
                            <span
                              className="quality-demo__target quality-demo__target--large"
                              aria-hidden="true"
                            >
                              <svg viewBox="0 0 20 20" fill="none">
                                <path d="M4 10h12m-5-5 5 5-5 5" />
                              </svg>
                            </span>
                            <span className="quality-demo__control-label">
                              {text.quality.articles}
                            </span>
                          </div>
                          <small>{text.quality.target44}</small>
                        </div>
                      </div>
                    </div>
                    <span className="badge-tag badge-tag--ghost quality-card__criterion">
                      {text.quality.cards[2].criterion}
                    </span>
                  </div>
                </article>

                <article
                  className="quality-card badge-card"
                  aria-labelledby="quality-motion-title"
                >
                  <NumberMark shape="circle" className="quality-card__number" hidden>
                    04
                  </NumberMark>
                  <div className="quality-card__copy">
                    <h4 id="quality-motion-title">
                      {text.quality.cards[3].title}
                    </h4>
                    <p>{text.quality.cards[3].description}</p>
                  </div>
                  <div className="quality-card__detail">
                    <div
                      className="quality-compare"
                      aria-label={text.quality.motionExamples}
                    >
                      <div className="quality-compare__panel">
                        <span>{text.quality.standard}</span>
                        <div className="quality-demo quality-demo--motion">
                          <i aria-hidden="true" />
                          <small>{text.quality.statusUpdates}</small>
                        </div>
                      </div>
                      <div className="quality-compare__panel">
                        <span>{text.quality.reduced}</span>
                        <div className="quality-demo quality-demo--no-motion">
                          <i aria-hidden="true" />
                          <small>{text.quality.statusClear}</small>
                        </div>
                      </div>
                    </div>
                    <p className="quality-card__motion-note">
                      {text.quality.motionNote}
                    </p>
                    <code className="quality-card__code">
                      {text.quality.reducedMotionCode}
                      <br />
                      @media (prefers-reduced-motion: reduce) {"{"}
                      <br />
                      &nbsp;&nbsp;.spinner {"{"} animation: none; {"}"}
                      <br />
                      {"}"}
                    </code>
                  </div>
                </article>
              </div>
            </section>
          </section>

          <section
            className="about section-space"
            id="about"
            aria-labelledby="about-title"
          >
            <div className="section-wrap about__inner badge-card">
              <div
                className="about-meter"
                role="img"
                aria-label={text.about.meterAria}
              >
                <span className="badge-emblem about-meter__emblem">
                  <HexEmblem>
                    <g transform="rotate(-90 84.89 94)">
                      <circle
                        className="about-meter__track"
                        cx="84.89"
                        cy="94"
                        r="58"
                        pathLength="100"
                      />
                      <circle
                        className="about-meter__arc"
                        cx="84.89"
                        cy="94"
                        r="58"
                        pathLength="100"
                      />
                    </g>
                  </HexEmblem>
                  <span className="about-meter__value" aria-hidden="true">
                    <strong>
                      10<sup>+</sup>
                    </strong>
                    <small>{text.about.meterUnit}</small>
                  </span>
                  <BadgeCoin variant="star" />
                </span>
                <span className="badge-tags about-meter__tags" aria-hidden="true">
                  <span className="badge-tag">{text.about.meterTitle}</span>
                  <span className="badge-tag badge-tag--fact">
                    {text.about.meterStart} — {text.about.meterCurrent}
                  </span>
                </span>
              </div>
              <div className="about__copy">
                <p className="eyebrow">{text.about.eyebrow}</p>
                <h2 id="about-title">
                  {text.about.title[0]}
                  <br />
                  <span>{text.about.title[1]}</span>
                </h2>
                <p className="about__lead">{text.about.lead}</p>
                <p>{text.about.first}</p>
                <p>{text.about.second}</p>
              </div>
              <div
                className="about__experience"
                id="experience"
                aria-labelledby="experience-title"
              >
                <div className="about__experience-heading">
                  <span className="badge-emblem about__experience-emblem">
                    <HexEmblem>
                      <HexIcon name="signpost" />
                    </HexEmblem>
                  </span>
                  <div>
                    <p className="eyebrow">{text.experience.eyebrow}</p>
                    <h3 id="experience-title">
                      {text.experience.title}
                      <span>.</span>
                    </h3>
                  </div>
                </div>
                <div
                  className="career-strip"
                  role="group"
                  aria-label={text.experience.title}
                >
                  {text.experience.careerStrip.labels.map((label, index) => (
                    <div
                      className={`career-strip__segment career-strip__segment--${index + 1}`}
                      key={label}
                    >
                      <span className="career-strip__label">{label}</span>
                      <span className="career-strip__value">
                        {text.experience.careerStrip.values[index]}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="timeline">
                  {text.experience.entries.map((entry, index) => (
                    <article className="timeline-entry" key={entry.date}>
                      <div className="timeline-entry__body">
                        {/* Swatch in the entry's strip colour, left of the role */}
                        <div className="timeline-entry__title">
                          <span
                            className={`career-strip__value timeline-entry__date timeline-entry__date--${entry.segment}`}
                          >
                            <span className="timeline-entry__date-text">
                              {entry.date}
                            </span>
                          </span>
                          <h4>{entry.role}</h4>
                        </div>
                        {entry.company && (
                          <p className="timeline-entry__company">
                            {entry.company}
                          </p>
                        )}
                        <ClampedText
                          className="timeline-entry__description"
                          text={entry.description}
                          lines={4}
                          moreLabel={text.work.takeawayMore}
                          lessLabel={text.work.takeawayLess}
                        />
                      </div>
                    </article>
                  ))}
                </div>
                <dl className="about__facts">
                  {text.experience.facts.map((fact) => (
                    <div key={fact.label}>
                      <dt>{fact.label}</dt>
                      <dd>{fact.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
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
                icon="toolbox"
                label={text.expertise.noteLabel}
                tab={`${text.expertise.groups.length} ${text.expertise.areaUnit} · ${text.expertise.groups.reduce((total, group) => total + group.skills.length, 0)} ${text.expertise.skillUnit}`}
              >
                {text.expertise.aside}
              </NoteCard>
            </div>
            <div className="expertise-board badge-card">
              <header className="expertise-board__header">
                <p>{text.expertise.boardLabel}</p>
                <div
                  className="expertise-board__totals"
                  aria-label={`${text.expertise.groups.length} ${text.expertise.areaUnit}, ${text.expertise.groups.reduce((total, group) => total + group.skills.length, 0)} ${text.expertise.skillUnit}`}
                >
                  <span className="badge-tag" aria-hidden="true">
                    {String(text.expertise.groups.length).padStart(2, "0")}{" "}
                    {text.expertise.areaUnit}
                  </span>
                  <span className="badge-tag badge-tag--fact" aria-hidden="true">
                    {String(
                      text.expertise.groups.reduce(
                        (total, group) => total + group.skills.length,
                        0,
                      ),
                    ).padStart(2, "0")}{" "}
                    {text.expertise.skillUnit}
                  </span>
                </div>
              </header>
              <div className="expertise-grid">
                {text.expertise.groups.map((group, index) => (
                  <article className="expertise-card" key={group.title}>
                    <span className="badge-emblem expertise-card__icon">
                      <HexEmblem>
                        <HexIcon name={group.icon} />
                      </HexEmblem>
                    </span>
                    <div className="expertise-card__content">
                      <div className="expertise-card__heading">
                        <h3>{group.title}</h3>
                        <NumberMark shape="bubble" className="expertise-card__count">
                          {String(group.skills.length).padStart(2, "0")}
                        </NumberMark>
                      </div>
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
                    <NumberMark shape="circle" className="expertise-card__index" hidden>
                      {String(index + 1).padStart(2, "0")}
                    </NumberMark>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section
            className="contact section-space"
            id="contact"
            aria-labelledby="contact-title"
          >
            <div className="section-wrap contact__inner badge-card">
              <div className="contact__intro">
                <span className="badge-emblem contact__emblem">
                  <HexEmblem>
                    <HexIcon name="chat" />
                  </HexEmblem>
                  <BadgeCoin />
                </span>
                <div className="contact__heading">
                  <p className="eyebrow">{text.contact.eyebrow}</p>
                  <h2 id="contact-title">
                    {text.contact.title[0]}
                    <br />
                    <span>{text.contact.title[1]}</span>
                  </h2>
                </div>
                <p className="contact__description">
                  <ContactBubble />
                  <span className="contact__description-text">
                    {text.contact.description}
                  </span>
                </p>
              </div>
              <div
                className="contact__channels"
                role="group"
                aria-label={text.contact.channelsLabel}
              >
                <a
                  className="contact-channel contact-channel--email"
                  href="mailto:popadaniel.office@gmail.com"
                >
                  <span className="contact-channel__label">
                    {text.contact.emailLabel}
                  </span>
                  <span className="contact-channel__value">
                    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
                      <rect x="2.5" y="4" width="15" height="12" rx="2" />
                      <path d="m3.5 6 6.5 5 6.5-5" />
                    </svg>
                    <span>{text.contact.emailValue}</span>
                  </span>
                </a>
                <a
                  className="contact-channel contact-channel--linkedin"
                  href="https://www.linkedin.com/in/daniel-popa-office/"
                  rel="noreferrer"
                  target="_blank"
                >
                  <span className="contact-channel__label">
                    {text.contact.linkedinLabel}
                  </span>
                  <span className="contact-channel__value">
                    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
                      <rect
                        x="1"
                        y="1"
                        width="18"
                        height="18"
                        rx="3.5"
                        stroke="currentColor"
                        strokeWidth="1.25"
                      />
                      <circle
                        cx="5.1"
                        cy="5.1"
                        r="1.1"
                        stroke="currentColor"
                        strokeWidth="1.1"
                      />
                      <path
                        d="M4 8.2h2.2v7.6H4zM8.2 8.2h2.2v1.1c.55-.8 1.35-1.3 2.5-1.3 2.1 0 3.2 1.35 3.2 3.8v4h-2.2v-3.8c0-1.4-.55-2.2-1.65-2.2-1.2 0-1.85.85-1.85 2.3v3.7H8.2z"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>{text.contact.linkedinValue}</span>
                    <ArrowIcon diagonal />
                  </span>
                </a>
                <a
                  className="contact-channel contact-channel--phone"
                  href="tel:+4915255654620"
                >
                  <span className="contact-channel__label">
                    {text.contact.phoneLabel}
                  </span>
                  <span className="contact-channel__value">
                    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
                      <rect
                        x="5.25"
                        y="2.25"
                        width="9.5"
                        height="15.5"
                        rx="2"
                      />
                      <path d="M8 4.5h4M9.25 15.25h1.5" />
                    </svg>
                    <span>{text.contact.phoneValue}</span>
                  </span>
                </a>
                <div className="contact-channel contact-channel--location">
                  <span className="contact-channel__label">
                    {text.contact.locationLabel}
                  </span>
                  <span className="contact-channel__value">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 64 80"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M32 3C16 3 5 15 5 31c0 18 15 34 23 42 2.4 2.4 5.6 2.4 8 0 8-8 23-24 23-42C59 15 48 3 32 3Z"
                        stroke="currentColor"
                        strokeWidth="6.2"
                        strokeLinejoin="round"
                      />
                      <circle
                        cx="32"
                        cy="30"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="6.2"
                      />
                    </svg>

                    <span>{text.contact.locationValue}</span>
                  </span>
                </div>
                <div className="contact-channel contact-channel--status">
                  <span className="contact-channel__label">
                    {text.contact.statusLabel}
                  </span>
                  <a
                    className="button button--light contact-channel__value contact-channel__action"
                    href="mailto:popadaniel.office@gmail.com"
                  >
                    {text.nav.talk} <ArrowIcon diagonal />
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      <footer className="site-footer">
        <div className="site-footer__inner">
          <a className="wordmark" href="#page-top" aria-label={text.footer.home}>
            <span className="wordmark__symbol">
              <img src={siteLogo} alt="" />
            </span>
            <span className="wordmark__name">Daniel Popa</span>
          </a>
          <p>{text.footer.description}</p>
          <a className="back-to-top" href="#page-top" aria-label={text.footer.top}>
            <svg aria-hidden="true" viewBox="0 1 32 32">
              {/* Flame (behind the nozzle) — hidden until hover/focus */}
              <g className="back-to-top__flame">
                <path
                  className="back-to-top__flame-outer"
                  d="M13.4 23.2c0 3.4 1.2 5.4 2.6 7.6 1.4-2.2 2.6-4.2 2.6-7.6Z"
                />
                <path
                  className="back-to-top__flame-inner"
                  d="M14.9 23.2c0 1.9.5 3 1.1 4.2.6-1.2 1.1-2.3 1.1-4.2Z"
                />
                <path className="back-to-top__spark" d="M11.6 25.4l-.9 1.8M20.4 25.4l.9 1.8" />
              </g>
              {/* Ship */}
              <g className="back-to-top__ship">
                <path className="back-to-top__fin" d="M10.2 15.6 6.4 19.4v4.4l3.8-2.2Z" />
                <path className="back-to-top__fin" d="M21.8 15.6l3.8 3.8v4.4l-3.8-2.2Z" />
                <path
                  className="back-to-top__body"
                  d="M16 2.6c-4 3-5.8 7.4-5.8 12.6v6.4h11.6v-6.4c0-5.2-1.8-9.6-5.8-12.6Z"
                />
                <path
                  className="back-to-top__nose"
                  d="M16 2.6c-2.1 1.6-3.5 3.6-4.4 5.9h8.8c-.9-2.3-2.3-4.3-4.4-5.9Z"
                />
                <path className="back-to-top__nozzle" d="M13.2 21.6h5.6l-.8 1.9h-4Z" />
                <circle className="back-to-top__window" cx="16" cy="13.6" r="2.7" />
                <path className="back-to-top__glint" d="M14.7 12.9a1.5 1.5 0 0 1 1.2-1" />
              </g>
            </svg>
          </a>
          <span className="site-footer__copyright">
            © {copyrightYear} Daniel Popa
          </span>
        </div>
      </footer>
    </>
  );
}

export default App;
