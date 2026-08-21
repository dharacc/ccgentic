export const PROJECT_NAME = "CCgentic";
export const PROJECT_YEAR = 2026;
export const PROJECT_TAGLINE = "Agentic tools, built to move";
export const PROJECT_EMAIL = "hello@ccgentic.com";
export const AVAILABILITY = `Taking on projects for Q1 ${PROJECT_YEAR}`;

export const NAV_LINKS = [
  { href: "/#projects", label: "Projects" },
  { href: "/about", label: "Studio" },
  { href: "/journal", label: "Journal" },
  { href: "/contact", label: "Connect" },
];

export const HERO = {
  eyebrow: `${PROJECT_NAME} Studio`,
  headingLines: [
    "We build agentic tools",
    "for brands ready to dominate",
    "their category online.",
  ],
  primaryCta: { href: "/contact", label: "Start a project" },
  badge: { label: "Certified Partner", tag: "Featured" },
  headerCta: { href: "/contact", label: "Book a strategy call" },
};

export const INTRO = {
  number: "1",
  label: `Introducing ${PROJECT_NAME}`,
  heading: "Strategy-led creatives, delivering results in digital and beyond.",
  body: "Through research, creative thinking and iteration we help growing brands realize their digital full potential.",
  cta: { href: "/about", label: "About our studio" },
  images: [
    {
      src: "/media/studio-1.webp",
      alt: "Designer reviewing a product system on a laptop",
      width: 1280,
      height: 956,
    },
    {
      src: "/media/studio-2.webp",
      alt: "Studio team mapping a product roadmap on a whiteboard",
      width: 1280,
      height: 956,
    },
  ],
};

export const CAPABILITIES = {
  number: "2",
  label: "What we build",
  heading: "Capabilities",
  items: [
    {
      title: "Agentic tools",
      body: "Software that acts with the brand — research, drafts, and routing so teams decide instead of wait.",
    },
    {
      title: "Brand sites",
      body: "Category-defining launches built to convert, not just to look featured.",
    },
    {
      title: "Product systems",
      body: "Content, agents, and interfaces that keep working after the first ship.",
    },
  ],
};

export const PROJECTS = {
  number: "3",
  label: "Featured client work",
  heading: "Our projects",
  items: [
    {
      name: "Narrativ",
      summary:
        "Winner of Site of the Month 2025 - an interactive 3D showcase driving record engagement",
      href: "/about",
      action: "Learn more",
      media: "/media/project-narrativ.mp4",
      tone: "light",
    },
    {
      name: "Luminar",
      summary:
        "Transforming a dated platform into a conversion-focused brand experience",
      href: "/about",
      action: "View case study",
      media: "/media/project-luminar.mp4",
      tone: "dark",
    },
  ],
};

export const JOURNAL = {
  number: "4",
  label: "From the studio",
  heading: "Journal",
  intro: "Notes on agentic tools, brand systems, and the work we ship.",
  items: [
    {
      slug: "agentic-tools-for-growing-brands",
      title: "Agentic tools for brands ready to move",
      excerpt:
        "Why we build software that acts with the brand, not just another dashboard.",
      date: "2026-08-12",
      featuredImage: "/media/studio-1.webp",
      paragraphs: [
        "Most digital work still waits for someone to click. Agentic tools change that: they research, draft, and route work so teams spend time on decisions instead of busywork.",
        "At CCgentic we start with the category, then design the system around it. The product has to feel like the brand and still move fast enough to matter in market.",
        "That is the brief we take into every build: strategy first, then the agents and interfaces that help a growing brand dominate its category online.",
      ],
    },
    {
      slug: "strategy-before-the-stack",
      title: "Strategy before the stack",
      excerpt:
        "Creative systems land when research and iteration come before the tooling.",
      date: "2026-07-28",
      featuredImage: "/media/studio-2.webp",
      paragraphs: [
        "A new model or framework is not a strategy. We map the brand, the audience, and the outcome before we pick a stack.",
        "Research, creative thinking, and iteration are how we help growing brands realize their digital full potential. The tools follow that work, not the other way around.",
        "When the system is clear, shipping is quieter: fewer rewrites, tighter loops, and a product the team can actually run.",
      ],
    },
    {
      slug: "from-showcase-to-system",
      title: "From showcase to system",
      excerpt:
        "A launch site is a moment. A living system is what keeps the category.",
      date: "2026-07-09",
      featuredImage: "",
      paragraphs: [
        "Beautiful launches still matter. They do not, on their own, keep a brand in front of its category.",
        "We treat the first site as a system: content, agents, and conversion paths that can be updated without starting over.",
        "That is how featured work turns into a studio practice — ship the moment, then keep the machine running.",
      ],
    },
  ],
};

export function getJournalEntry(slug: string) {
  for (const item of JOURNAL.items) {
    if (item.slug === slug) {
      return item;
    }
  }
  return null;
}

export const FOOTER = {
  ctaLabel: "Work with us",
  heading: "Ready to dominate your category?",
  blurb: "A strategy-led studio crafting digital experiences for growing brands.",
  columns: [
    {
      title: "Studio",
      links: [
        { href: "/about", label: "About" },
        { href: "/about", label: "Team" },
        { href: "/about", label: "Careers" },
        { href: "/journal", label: "Journal" },
      ],
    },
    {
      title: "Work",
      links: [
        { href: "/#projects", label: "Projects" },
        { href: "/about", label: "Case studies" },
        { href: "/#capabilities", label: "Services" },
        { href: "/about", label: "Process" },
      ],
    },
    {
      title: "Connect",
      links: [
        { href: "/contact", label: "Start a project" },
        { href: "/contact", label: "Book a call" },
        { href: "https://www.instagram.com", label: "Instagram" },
        { href: "https://www.linkedin.com", label: "LinkedIn" },
      ],
    },
  ],
  legal: [
    { href: "/about", label: "Privacy" },
    { href: "/about", label: "Terms" },
  ],
};
