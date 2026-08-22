export type NavItem = {
  href: string;
  label: string;
  hasMenu: boolean;
};

export type CtaLink = {
  href: string;
  label: string;
};

export type ImageAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type HeroSlide = {
  headingStrong: string;
  headingLight: string[];
  body: string;
  cta: CtaLink;
  background: ImageAsset | null;
};

export type HeroContent = {
  slides: HeroSlide[];
  badgeRing: ImageAsset | null;
  badgeCenter: ImageAsset | null;
};

export type WhyItem = {
  number: string;
  title: string;
  body: string;
};

export type WhyContent = {
  eyebrow: string;
  heading: string;
  body: string;
  images: ImageAsset[];
  items: WhyItem[];
};

export type ProductCard = {
  title: string;
  summary: string;
  href: string;
  action: string;
  image: ImageAsset | null;
};

export type ProductsContent = {
  eyebrow: string;
  heading: string;
  body: string;
  cta: CtaLink;
  cards: ProductCard[];
};

export type IndustryCard = {
  title: string;
  href: string;
  image: ImageAsset | null;
};

export type IndustriesContent = {
  eyebrow: string;
  heading: string;
  body: string;
  cta: CtaLink;
  cards: IndustryCard[];
};

export type ProcessStep = {
  title: string;
  body: string;
  icon: ImageAsset | null;
};

export type ProcessContent = {
  eyebrow: string;
  heading: string;
  body: string;
  banner: string;
  cta: CtaLink;
  steps: ProcessStep[];
};

export type Testimonial = {
  lead: string;
  rest: string;
  name: string;
  location: string;
  photo: ImageAsset | null;
};

export type ClienteleContent = {
  eyebrow: string;
  heading: string;
  body: string;
  rating: string;
  ratingLabel: string;
  avatars: ImageAsset[];
  logos: ImageAsset[];
  testimonials: Testimonial[];
};

export type InsightCard = {
  category: string;
  meta: string;
  title: string;
  href: string;
  image: ImageAsset | null;
};

export type InsightsContent = {
  eyebrow: string;
  heading: string;
  body: string;
  cards: InsightCard[];
};

export type ConversationContent = {
  eyebrow: string;
  heading: string;
  body: string;
  cta: CtaLink;
  blower: ImageAsset | null;
  pump: ImageAsset | null;
};

export type FooterLink = {
  href: string;
  label: string;
};

export type FooterColumn = {
  title: string;
  links: FooterLink[];
};

export type SocialLink = {
  href: string;
  label: string;
  icon: string;
};

export type FooterContent = {
  blurb: string;
  columns: FooterColumn[];
  social: SocialLink[];
  copyright: string;
  legal: FooterLink[];
  badgeIso: ImageAsset | null;
  badgeCe: ImageAsset | null;
};

export type HeaderContent = {
  contactCta: CtaLink;
  logo: ImageAsset | null;
};

export type HomeContent = {
  name: string;
  legalName: string;
  tagline: string;
  nav: NavItem[];
  header: HeaderContent;
  hero: HeroContent;
  why: WhyContent;
  products: ProductsContent;
  industries: IndustriesContent;
  process: ProcessContent;
  clientele: ClienteleContent;
  insights: InsightsContent;
  conversation: ConversationContent;
  footer: FooterContent;
};
