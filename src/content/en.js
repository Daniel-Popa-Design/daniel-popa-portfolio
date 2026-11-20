// English copy for the whole page.

const en = {
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
    role: ["Senior Web Designer", "Frontend Development"],
    intro:
      "With over 10 years of experience, I turn complex ideas into clear, thoughtful digital experiences.",
    work: "Explore my work",
    downloadCv: "Download my CV (German)",
    about: "About me",
    art: "Portrait of Daniel Popa in a light blue shirt",
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
          moreLabel: "How I approached it",
          deeperLabel: "Technical details",
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
          moreLabel: "How I approached it",
          deeperLabel: "Technical details",
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
          moreLabel: "How I approached it",
          deeperLabel: "Technical details",
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
    legalLabel: "Legal",
    privacy: "Privacy policy",
  },
};

export default en;
