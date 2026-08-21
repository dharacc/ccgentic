export const PROJECT_NAME = "CCgentic";
export const PROJECT_YEAR = 2026;
export const PROJECT_TAGLINE = "Agentic tools, built to move";
export const PROJECT_EMAIL = "hello@ccgentic.com";
export const AVAILABILITY = `Taking on projects for Q1 ${PROJECT_YEAR}`;

export const NAV_LINKS = [
  { href: "/#projects", label: "Projects" },
  { href: "/about", label: "Studio" },
  { href: "/about", label: "Journal" },
  { href: "/contact", label: "Connect" },
];

export const HERO = {
  eyebrow: `${PROJECT_NAME} Studio`,
  headingLines: [
    "We craft digital experiences",
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

export const PROJECTS = {
  number: "2",
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
        { href: "/about", label: "Journal" },
      ],
    },
    {
      title: "Work",
      links: [
        { href: "/#projects", label: "Projects" },
        { href: "/about", label: "Case studies" },
        { href: "/about", label: "Services" },
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
