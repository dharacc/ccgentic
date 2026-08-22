import { cache } from "react";
import type {
  ClienteleContent,
  ConversationContent,
  CtaLink,
  FooterContent,
  HeaderContent,
  HeroContent,
  HomeContent,
  ImageAsset,
  IndustriesContent,
  InsightsContent,
  NavItem,
  ProcessContent,
  ProductsContent,
  WhyContent,
} from "@/lib/content";

const DEFAULT_WORDPRESS_URL = "https://project-in-progress.com/wp-ccgentic";
const REVALIDATE_SECONDS = 60;
const FETCH_TIMEOUT_MS = 8000;
const HOME_PAGE_ID = 16;

function wordpressUrl(): string {
  const fromEnv = process.env.WORDPRESS_URL;
  if (typeof fromEnv === "string" && fromEnv.trim() !== "") {
    return fromEnv.trim().replace(/\/+$/, "");
  }

  return DEFAULT_WORDPRESS_URL;
}

function corePageUrls(): string[] {
  const base = wordpressUrl();
  const homeQuery = "slug=home&acf_format=standard";
  return [
    `${base}/wp-json/wp/v2/pages?${homeQuery}`,
    `${base}/index.php/wp-json/wp/v2/pages?${homeQuery}`,
    `${base}/index.php?rest_route=/wp/v2/pages&${homeQuery}`,
    `${base}/wp-json/wp/v2/pages/${HOME_PAGE_ID}?acf_format=standard`,
    `${base}/index.php/wp-json/wp/v2/pages/${HOME_PAGE_ID}?acf_format=standard`,
    `${base}/wp-json/wp/v2/pages?slug=front-page&acf_format=standard`,
    `${base}/wp-json/wp/v2/pages?slug=homepage&acf_format=standard`,
    `${base}/wp-json/wp/v2/pages?slug=aeromatic&acf_format=standard`,
    `${base}/wp-json/wp/v2/pages?per_page=20&acf_format=standard`,
  ];
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function text(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function htmlToPlain(value: unknown): string {
  const raw = text(value);
  if (raw === "") {
    return "";
  }

  return raw
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<\/div>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0*39;/g, "'")
    .replace(/&#x27;/gi, "'")
    .replace(/\u00a0/g, " ")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}

function numberValue(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function rows(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

function cta(value: unknown): CtaLink {
  if (!isRecord(value)) {
    return { href: "", label: "" };
  }

  return {
    href: text(value.href),
    label: text(value.label),
  };
}

function image(value: unknown): ImageAsset | null {
  return acfImage(value);
}

function images(value: unknown): ImageAsset[] {
  return acfImages(value);
}

function navItems(value: unknown): NavItem[] {
  return rows(value).flatMap((item) => {
    if (!isRecord(item)) {
      return [];
    }

    return [
      {
        href: text(item.href),
        label: text(item.label),
        hasMenu: item.hasMenu === true,
      },
    ];
  });
}

function header(value: unknown): HeaderContent {
  if (!isRecord(value)) {
    return { contactCta: { href: "", label: "" }, logo: null };
  }

  return {
    contactCta: cta(value.contactCta),
    logo: image(value.logo),
  };
}

function hero(value: unknown): HeroContent {
  if (!isRecord(value)) {
    return { slides: [], badgeRing: null, badgeCenter: null };
  }

  return {
    badgeRing: image(value.badgeRing),
    badgeCenter: image(value.badgeCenter),
    slides: rows(value.slides).flatMap((item) => {
      if (!isRecord(item)) {
        return [];
      }

      return [
        {
          headingStrong: text(item.headingStrong),
          headingLight: rows(item.headingLight).map((line) => text(line)).filter((line) => line !== ""),
          body: htmlToPlain(item.body),
          cta: cta(item.cta),
          background: image(item.background),
        },
      ];
    }),
  };
}

function why(value: unknown): WhyContent {
  if (!isRecord(value)) {
    return { eyebrow: "", heading: "", body: "", images: [], items: [] };
  }

  return {
    eyebrow: text(value.eyebrow),
    heading: text(value.heading),
    body: htmlToPlain(value.body),
    images: images(value.images),
    items: rows(value.items).flatMap((item) => {
      if (!isRecord(item)) {
        return [];
      }

      return [
        {
          number: text(item.number),
          title: text(item.title),
          body: htmlToPlain(item.body),
        },
      ];
    }),
  };
}

function products(value: unknown): ProductsContent {
  if (!isRecord(value)) {
    return { eyebrow: "", heading: "", body: "", cta: { href: "", label: "" }, cards: [] };
  }

  return {
    eyebrow: text(value.eyebrow),
    heading: text(value.heading),
    body: htmlToPlain(value.body),
    cta: cta(value.cta),
    cards: rows(value.cards).flatMap((item) => {
      if (!isRecord(item)) {
        return [];
      }

      return [
        {
          title: text(item.title),
          summary: htmlToPlain(item.summary),
          href: text(item.href),
          action: text(item.action),
          image: image(item.image),
        },
      ];
    }),
  };
}

function industries(value: unknown): IndustriesContent {
  if (!isRecord(value)) {
    return { eyebrow: "", heading: "", body: "", cta: { href: "", label: "" }, cards: [] };
  }

  return {
    eyebrow: text(value.eyebrow),
    heading: text(value.heading),
    body: htmlToPlain(value.body),
    cta: cta(value.cta),
    cards: rows(value.cards).flatMap((item) => {
      if (!isRecord(item)) {
        return [];
      }

      return [
        {
          title: text(item.title),
          href: text(item.href),
          image: image(item.image),
        },
      ];
    }),
  };
}

function processSection(value: unknown): ProcessContent {
  if (!isRecord(value)) {
    return {
      eyebrow: "",
      heading: "",
      body: "",
      banner: "",
      cta: { href: "", label: "" },
      steps: [],
    };
  }

  return {
    eyebrow: text(value.eyebrow),
    heading: text(value.heading),
    body: htmlToPlain(value.body),
    banner: text(value.banner),
    cta: cta(value.cta),
    steps: rows(value.steps).flatMap((item) => {
      if (!isRecord(item)) {
        return [];
      }

      return [
        {
          title: text(item.title),
          body: htmlToPlain(item.body),
          icon: image(item.icon),
        },
      ];
    }),
  };
}

function clientele(value: unknown): ClienteleContent {
  if (!isRecord(value)) {
    return {
      eyebrow: "",
      heading: "",
      body: "",
      rating: "",
      ratingLabel: "",
      avatars: [],
      logos: [],
      testimonials: [],
    };
  }

  return {
    eyebrow: text(value.eyebrow),
    heading: text(value.heading),
    body: htmlToPlain(value.body),
    rating: text(value.rating),
    ratingLabel: text(value.ratingLabel),
    avatars: images(value.avatars),
    logos: images(value.logos),
    testimonials: rows(value.testimonials).flatMap((item) => {
      if (!isRecord(item)) {
        return [];
      }

      return [
        {
          lead: htmlToPlain(item.lead),
          rest: htmlToPlain(item.rest),
          name: text(item.name),
          location: text(item.location),
          photo: image(item.photo),
        },
      ];
    }),
  };
}

function insights(value: unknown): InsightsContent {
  if (!isRecord(value)) {
    return { eyebrow: "", heading: "", body: "", cards: [] };
  }

  return {
    eyebrow: text(value.eyebrow),
    heading: text(value.heading),
    body: htmlToPlain(value.body),
    cards: rows(value.cards).flatMap((item) => {
      if (!isRecord(item)) {
        return [];
      }

      return [
        {
          category: text(item.category),
          meta: text(item.meta),
          title: text(item.title),
          href: text(item.href),
          image: image(item.image),
        },
      ];
    }),
  };
}

function conversation(value: unknown): ConversationContent {
  if (!isRecord(value)) {
    return {
      eyebrow: "",
      heading: "",
      body: "",
      cta: { href: "", label: "" },
      blower: null,
      pump: null,
    };
  }

  return {
    eyebrow: text(value.eyebrow),
    heading: text(value.heading),
    body: htmlToPlain(value.body),
    cta: cta(value.cta),
    blower: image(value.blower),
    pump: image(value.pump),
  };
}

function footer(value: unknown): FooterContent {
  if (!isRecord(value)) {
    return {
      blurb: "",
      columns: [],
      social: [],
      copyright: "",
      legal: [],
      badgeIso: null,
      badgeCe: null,
    };
  }

  return {
    blurb: htmlToPlain(value.blurb),
    copyright: text(value.copyright),
    badgeIso: image(value.badgeIso),
    badgeCe: image(value.badgeCe),
    columns: rows(value.columns).flatMap((item) => {
      if (!isRecord(item)) {
        return [];
      }

      return [
        {
          title: text(item.title),
          links: rows(item.links).flatMap((link) => {
            if (!isRecord(link)) {
              return [];
            }

            return [cta(link)];
          }),
        },
      ];
    }),
    social: rows(value.social).flatMap((item) => {
      if (!isRecord(item)) {
        return [];
      }

      return [
        {
          href: text(item.href),
          label: text(item.label),
          icon: text(item.icon),
        },
      ];
    }),
    legal: rows(value.legal).flatMap((item) => {
      if (!isRecord(item)) {
        return [];
      }

      return [cta(item)];
    }),
  };
}

const MEDIA_PLACEHOLDER = "__wp_media:";
const DESIGN_MEDIA = "/media/aeromatic";

function attachmentId(value: unknown): number {
  if (typeof value === "number" && Number.isInteger(value) && value > 0) {
    return value;
  }

  if (typeof value === "string" && /^\d+$/.test(value.trim())) {
    return Number(value.trim());
  }

  return 0;
}

function sizeUrl(sizes: unknown, key: string): string {
  if (!isRecord(sizes)) {
    return "";
  }

  const size = sizes[key];
  if (typeof size === "string") {
    return size;
  }

  if (!isRecord(size)) {
    return "";
  }

  return text(size.url) || text(size.source_url);
}

function resolvePublicSrc(src: string): string {
  const trimmed = src.trim();
  if (trimmed === "" || trimmed.startsWith(MEDIA_PLACEHOLDER) || trimmed.startsWith("/media/")) {
    return trimmed;
  }

  if (trimmed.startsWith("//")) {
    return `https:${trimmed}`;
  }

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  const base = wordpressUrl();
  if (trimmed.startsWith("/")) {
    return `${base}${trimmed}`;
  }

  return `${base}/${trimmed}`;
}

function placeholderImage(id: number, alt: string, width: number, height: number): ImageAsset {
  return {
    src: `${MEDIA_PLACEHOLDER}${id}`,
    alt,
    width,
    height,
  };
}

function acfImage(value: unknown): ImageAsset | null {
  const numericId = attachmentId(value);
  if (numericId > 0) {
    return placeholderImage(numericId, "", 0, 0);
  }

  if (typeof value === "string") {
    const src = resolvePublicSrc(value);
    if (src === "") {
      return null;
    }

    return { src, alt: "", width: 0, height: 0 };
  }

  if (!isRecord(value)) {
    return null;
  }

  const src =
    text(value.url) ||
    text(value.src) ||
    text(value.source_url) ||
    sizeUrl(value.sizes, "large") ||
    sizeUrl(value.sizes, "medium_large") ||
    sizeUrl(value.sizes, "full") ||
    sizeUrl(value.sizes, "medium");
  const alt = text(value.alt) || text(value.alt_text);
  const width = numberValue(value.width);
  const height = numberValue(value.height);
  const id = attachmentId(value.ID) || attachmentId(value.id);

  if (src !== "") {
    return {
      src: resolvePublicSrc(src),
      alt,
      width,
      height,
    };
  }

  if (id > 0) {
    return placeholderImage(id, alt, width, height);
  }

  return null;
}

function acfImages(value: unknown): ImageAsset[] {
  return rows(value)
    .map((item) => acfImage(item))
    .filter((item): item is ImageAsset => item !== null);
}

function acfLink(value: unknown): CtaLink {
  if (!isRecord(value)) {
    return { href: "", label: "" };
  }

  return {
    href: text(value.url) || text(value.href),
    label: text(value.title) || text(value.label),
  };
}

function acfLines(value: unknown): string[] {
  return text(value)
    .split(/\r\n|\r|\n/)
    .map((line) => line.trim())
    .filter((line) => line !== "");
}

function field(record: Record<string, unknown>, key: string): unknown {
  return record[key];
}

function mapRawAcf(record: Record<string, unknown>): HomeContent {
  return {
    name: text(field(record, "site_name")) || text(record.name),
    legalName: text(field(record, "legal_name")) || text(record.legalName),
    tagline: text(record.tagline),
    nav: rows(field(record, "nav_items")).flatMap((item) => {
      if (!isRecord(item)) {
        return [];
      }

      return [
        {
          href: text(item.url) || text(item.href),
          label: text(item.label),
          hasMenu: item.has_menu === "1" || item.has_menu === 1 || item.hasMenu === true,
        },
      ];
    }),
    header: {
      contactCta: acfLink(field(record, "header_cta")),
      logo: acfImage(record.logo),
    },
    hero: {
      badgeRing: acfImage(field(record, "hero_badge_ring")),
      badgeCenter: acfImage(field(record, "hero_badge_center")),
      slides: rows(field(record, "hero_slides")).flatMap((item) => {
        if (!isRecord(item)) {
          return [];
        }

        return [
          {
            headingStrong: text(item.heading_strong) || text(item.headingStrong),
            headingLight: acfLines(item.heading_light ?? item.headingLight),
            body: htmlToPlain(item.body),
            cta: acfLink(item.cta),
            background: acfImage(item.background),
          },
        ];
      }),
    },
    why: {
      eyebrow: text(field(record, "why_eyebrow")),
      heading: text(field(record, "why_heading")),
      body: htmlToPlain(field(record, "why_body")),
      images: acfImages(field(record, "why_images")),
      items: rows(field(record, "why_items")).flatMap((item) => {
        if (!isRecord(item)) {
          return [];
        }

        return [
          {
            number: text(item.number),
            title: text(item.title),
            body: htmlToPlain(item.body),
          },
        ];
      }),
    },
    products: {
      eyebrow: text(field(record, "products_eyebrow")),
      heading: text(field(record, "products_heading")),
      body: htmlToPlain(field(record, "products_body")),
      cta: acfLink(field(record, "products_cta")),
      cards: rows(field(record, "product_cards")).flatMap((item) => {
        if (!isRecord(item)) {
          return [];
        }

        const link = acfLink(item.link);
        return [
          {
            title: text(item.title),
            summary: htmlToPlain(item.summary),
            href: link.href || text(item.href),
            action: link.label || text(item.action),
            image: acfImage(item.image),
          },
        ];
      }),
    },
    industries: {
      eyebrow: text(field(record, "industries_eyebrow")),
      heading: text(field(record, "industries_heading")),
      body: htmlToPlain(field(record, "industries_body")),
      cta: acfLink(field(record, "industries_cta")),
      cards: rows(field(record, "industry_cards")).flatMap((item) => {
        if (!isRecord(item)) {
          return [];
        }

        const link = acfLink(item.link);
        return [
          {
            title: text(item.title),
            href: link.href || text(item.href),
            image: acfImage(item.image),
          },
        ];
      }),
    },
    process: {
      eyebrow: text(field(record, "process_eyebrow")),
      heading: text(field(record, "process_heading")),
      body: htmlToPlain(field(record, "process_body")),
      banner: text(field(record, "process_banner")),
      cta: acfLink(field(record, "process_cta")),
      steps: rows(field(record, "process_steps")).flatMap((item) => {
        if (!isRecord(item)) {
          return [];
        }

        return [
          {
            title: text(item.title),
            body: htmlToPlain(item.body),
            icon: acfImage(item.icon),
          },
        ];
      }),
    },
    clientele: {
      eyebrow: text(field(record, "clientele_eyebrow")),
      heading: text(field(record, "clientele_heading")),
      body: htmlToPlain(field(record, "clientele_body")),
      rating: text(field(record, "clientele_rating")),
      ratingLabel: text(field(record, "clientele_rating_label")),
      avatars: acfImages(field(record, "clientele_avatars")),
      logos: acfImages(field(record, "clientele_logos")),
      testimonials: rows(record.testimonials).flatMap((item) => {
        if (!isRecord(item)) {
          return [];
        }

        return [
          {
            lead: htmlToPlain(item.lead),
            rest: htmlToPlain(item.rest),
            name: text(item.name),
            location: text(item.location),
            photo: acfImage(item.photo),
          },
        ];
      }),
    },
    insights: {
      eyebrow: text(field(record, "insights_eyebrow")),
      heading: text(field(record, "insights_heading")),
      body: htmlToPlain(field(record, "insights_body")),
      cards: rows(field(record, "insight_cards")).flatMap((item) => {
        if (!isRecord(item)) {
          return [];
        }

        const link = acfLink(item.link);
        return [
          {
            category: text(item.category),
            meta: text(item.meta),
            title: text(item.title),
            href: link.href || text(item.href),
            image: acfImage(item.image),
          },
        ];
      }),
    },
    conversation: {
      eyebrow: text(field(record, "conversation_eyebrow")),
      heading: text(field(record, "conversation_heading")),
      body: htmlToPlain(field(record, "conversation_body")),
      cta: acfLink(field(record, "conversation_cta")),
      blower: acfImage(field(record, "conversation_blower")),
      pump: acfImage(field(record, "conversation_pump")),
    },
    footer: {
      blurb: htmlToPlain(field(record, "footer_blurb")),
      copyright: text(field(record, "footer_copyright")),
      badgeIso: acfImage(field(record, "footer_badge_iso")),
      badgeCe: acfImage(field(record, "footer_badge_ce")),
      columns: rows(field(record, "footer_columns")).flatMap((item) => {
        if (!isRecord(item)) {
          return [];
        }

        return [
          {
            title: text(item.title),
            links: rows(item.links).flatMap((linkItem) => {
              if (!isRecord(linkItem)) {
                return [];
              }

              return [acfLink(linkItem.link ?? linkItem)];
            }),
          },
        ];
      }),
      social: rows(field(record, "footer_social")).flatMap((item) => {
        if (!isRecord(item)) {
          return [];
        }

        const icon = acfImage(item.icon);
        return [
          {
            href: text(item.url) || text(item.href),
            label: text(item.label),
            icon: icon ? icon.src : text(item.icon),
          },
        ];
      }),
      legal: rows(field(record, "footer_legal")).flatMap((item) => {
        if (!isRecord(item)) {
          return [];
        }

        return [acfLink(item.link ?? item)];
      }),
    },
  };
}

function hasFlatHomepageFields(record: Record<string, unknown>): boolean {
  return (
    "hero_slides" in record ||
    "why_heading" in record ||
    "product_cards" in record ||
    "site_name" in record ||
    "nav_items" in record
  );
}

function mapNestedHome(record: Record<string, unknown>): HomeContent {
  return {
    name: text(record.name),
    legalName: text(record.legalName),
    tagline: text(record.tagline),
    nav: navItems(record.nav),
    header: header(record.header),
    hero: hero(record.hero),
    why: why(record.why),
    products: products(record.products),
    industries: industries(record.industries),
    process: processSection(record.process),
    clientele: clientele(record.clientele),
    insights: insights(record.insights),
    conversation: conversation(record.conversation),
    footer: footer(record.footer),
  };
}

function homeHasVisibleContent(content: HomeContent): boolean {
  return (
    content.name !== "" ||
    content.nav.length > 0 ||
    content.hero.slides.length > 0 ||
    content.why.heading !== "" ||
    content.why.items.length > 0 ||
    content.products.heading !== "" ||
    content.products.cards.length > 0
  );
}

function mapHome(acf: unknown): HomeContent {
  const record = isRecord(acf) ? acf : {};

  if (hasFlatHomepageFields(record)) {
    const fromFlat = mapRawAcf(record);
    if (homeHasVisibleContent(fromFlat)) {
      return fromFlat;
    }
  }

  if (isRecord(record.hero) || isRecord(record.header) || Array.isArray(record.nav)) {
    return mapNestedHome(record);
  }

  return mapRawAcf(record);
}

function acfHasValues(acf: unknown): acf is Record<string, unknown> {
  if (!isRecord(acf)) {
    return false;
  }

  return Object.keys(acf).some((key) => {
    const value = acf[key];
    if (value === null || value === undefined || value === false || value === "") {
      return false;
    }
    if (Array.isArray(value)) {
      return value.length > 0;
    }
    return true;
  });
}

function localAsset(file: string, alt = ""): ImageAsset {
  return { src: `${DESIGN_MEDIA}/${file}`, alt, width: 0, height: 0 };
}

function withImage(current: ImageAsset | null, fallback: ImageAsset): ImageAsset {
  if (current && current.src !== "" && !current.src.startsWith(MEDIA_PLACEHOLDER)) {
    return current;
  }

  return fallback;
}

function industryFallback(title: string, index: number): ImageAsset {
  const key = title.toLowerCase();
  if (key.includes("paper")) {
    return localAsset("industry-paper.png", title);
  }
  if (key.includes("chemical")) {
    return localAsset("industry-chemical.png", title);
  }
  if (key.includes("petroleum") || key.includes("refiner") || key.includes("oil")) {
    return localAsset("industry-oil.png", title);
  }
  if (key.includes("power")) {
    return localAsset("industry-power.png", title);
  }
  if (key.includes("pharma")) {
    return localAsset("industry-pharma.png", title);
  }
  if (key.includes("food") || key.includes("dairy") || key.includes("beverage")) {
    return localAsset("industry-food.png", title);
  }

  const byIndex = [
    "industry-paper.png",
    "industry-chemical.png",
    "industry-oil.png",
    "industry-power.png",
    "industry-pharma.png",
    "industry-food.png",
  ];

  return localAsset(byIndex[index] ?? byIndex[0], title);
}

function productFallback(title: string, index: number): ImageAsset {
  const key = title.toLowerCase();
  if (key.includes("vacuum") || key.includes("air handling") || key.includes("blower")) {
    return localAsset("product-vacuum.png", title);
  }
  if (key.includes("heat") || key.includes("dry") || key.includes("thermal")) {
    return localAsset("product-heating.png", title);
  }

  return localAsset(index === 1 ? "product-heating.png" : "product-vacuum.png", title);
}

function testimonialFallback(name: string, index: number): ImageAsset {
  const key = name.toLowerCase();
  if (key.includes("mahmoud")) {
    return localAsset("review-mahmoud.png", name);
  }
  if (key.includes("rick")) {
    return localAsset("review-rick.png", name);
  }
  if (key.includes("enyo")) {
    return localAsset("review-enyo.png", name);
  }
  if (key.includes("catherine")) {
    return localAsset("review-catherine.png", name);
  }
  if (key.includes("nert")) {
    return localAsset("review-nert.png", name);
  }
  if (key.includes("clay")) {
    return localAsset("review-clay.png", name);
  }

  const byIndex = [
    "review-mahmoud.png",
    "review-rick.png",
    "review-enyo.png",
    "review-catherine.png",
    "review-nert.png",
    "review-clay.png",
  ];

  return localAsset(byIndex[index] ?? byIndex[0], name);
}

function socialFallback(label: string): string {
  const key = label.toLowerCase();
  if (key.includes("instagram")) {
    return `${DESIGN_MEDIA}/social-instagram.svg`;
  }
  if (key.includes("facebook")) {
    return `${DESIGN_MEDIA}/social-facebook.svg`;
  }
  if (key.includes("linkedin")) {
    return `${DESIGN_MEDIA}/social-linkedin.svg`;
  }
  if (key === "x" || key.includes("twitter")) {
    return `${DESIGN_MEDIA}/social-x.svg`;
  }

  return "";
}

function mapHomeImages(
  content: HomeContent,
  transform: (image: ImageAsset) => ImageAsset | null,
): HomeContent {
  const one = (image: ImageAsset | null): ImageAsset | null => {
    if (image === null) {
      return null;
    }

    return transform(image);
  };

  const many = (items: ImageAsset[]): ImageAsset[] =>
    items.map((item) => transform(item)).filter((item): item is ImageAsset => item !== null);

  return {
    ...content,
    header: { ...content.header, logo: one(content.header.logo) },
    hero: {
      ...content.hero,
      badgeRing: one(content.hero.badgeRing),
      badgeCenter: one(content.hero.badgeCenter),
      slides: content.hero.slides.map((slide) => ({
        ...slide,
        background: one(slide.background),
      })),
    },
    why: { ...content.why, images: many(content.why.images) },
    products: {
      ...content.products,
      cards: content.products.cards.map((card) => ({
        ...card,
        image: one(card.image),
      })),
    },
    industries: {
      ...content.industries,
      cards: content.industries.cards.map((card) => ({
        ...card,
        image: one(card.image),
      })),
    },
    process: {
      ...content.process,
      steps: content.process.steps.map((step) => ({
        ...step,
        icon: one(step.icon),
      })),
    },
    clientele: {
      ...content.clientele,
      avatars: many(content.clientele.avatars),
      logos: many(content.clientele.logos),
      testimonials: content.clientele.testimonials.map((item) => ({
        ...item,
        photo: one(item.photo),
      })),
    },
    insights: {
      ...content.insights,
      cards: content.insights.cards.map((card) => ({
        ...card,
        image: one(card.image),
      })),
    },
    conversation: {
      ...content.conversation,
      blower: one(content.conversation.blower),
      pump: one(content.conversation.pump),
    },
    footer: {
      ...content.footer,
      badgeIso: one(content.footer.badgeIso),
      badgeCe: one(content.footer.badgeCe),
    },
  };
}

function collectPlaceholderIds(content: HomeContent): number[] {
  const ids = new Set<number>();

  mapHomeImages(content, (image) => {
    if (image.src.startsWith(MEDIA_PLACEHOLDER)) {
      const id = Number(image.src.slice(MEDIA_PLACEHOLDER.length));
      if (Number.isInteger(id) && id > 0) {
        ids.add(id);
      }
    }

    return image;
  });

  for (const item of content.footer.social) {
    if (item.icon.startsWith(MEDIA_PLACEHOLDER)) {
      const id = Number(item.icon.slice(MEDIA_PLACEHOLDER.length));
      if (Number.isInteger(id) && id > 0) {
        ids.add(id);
      }
    }
  }

  return [...ids];
}

function mediaSourceUrl(payload: Record<string, unknown>): string {
  const direct = text(payload.source_url);
  if (direct !== "") {
    return resolvePublicSrc(direct);
  }

  if (isRecord(payload.guid)) {
    const guid = text(payload.guid.rendered);
    if (guid !== "") {
      return resolvePublicSrc(guid);
    }
  }

  if (isRecord(payload.media_details) && isRecord(payload.media_details.sizes)) {
    const sizes = payload.media_details.sizes;
    const large = isRecord(sizes.large) ? text(sizes.large.source_url) : "";
    const full = isRecord(sizes.full) ? text(sizes.full.source_url) : "";
    if (large !== "") {
      return resolvePublicSrc(large);
    }
    if (full !== "") {
      return resolvePublicSrc(full);
    }
  }

  return "";
}

async function fetchMediaUrl(id: number): Promise<string> {
  const base = wordpressUrl();
  const urls = [`${base}/wp-json/wp/v2/media/${id}`, `${base}/index.php/wp-json/wp/v2/media/${id}`];

  for (const url of urls) {
    const payload = await fetchJson(url);
    if (isRecord(payload)) {
      const src = mediaSourceUrl(payload);
      if (src !== "") {
        return src;
      }
    }
  }

  return "";
}

async function resolveAttachmentImages(content: HomeContent): Promise<HomeContent> {
  const ids = collectPlaceholderIds(content);
  if (ids.length === 0) {
    return content;
  }

  const resolved = new Map<number, string>();
  await Promise.all(
    ids.map(async (id) => {
      const url = await fetchMediaUrl(id);
      if (url !== "") {
        resolved.set(id, url);
      }
    }),
  );

  const withImages = mapHomeImages(content, (image) => {
    if (!image.src.startsWith(MEDIA_PLACEHOLDER)) {
      return image;
    }

    const id = Number(image.src.slice(MEDIA_PLACEHOLDER.length));
    const url = resolved.get(id);
    if (!url) {
      return null;
    }

    return { ...image, src: url };
  });

  return {
    ...withImages,
    footer: {
      ...withImages.footer,
      social: content.footer.social.map((item) => {
        if (!item.icon.startsWith(MEDIA_PLACEHOLDER)) {
          return item;
        }

        const id = Number(item.icon.slice(MEDIA_PLACEHOLDER.length));
        const url = resolved.get(id);
        return { ...item, icon: url ?? "" };
      }),
    },
  };
}

function applyDesignedImageFallbacks(content: HomeContent): HomeContent {
  const whyDefaults = [
    localAsset("why-photo-1.png", content.why.heading),
    localAsset("why-photo-2.png", content.why.heading),
    localAsset("why-photo-3.png", content.why.heading),
  ];
  const whyImages = whyDefaults.map((fallback, index) => withImage(content.why.images[index] ?? null, fallback));

  const avatarDefaults = [
    localAsset("avatar-1.png"),
    localAsset("avatar-2.png"),
    localAsset("avatar-3.png"),
    localAsset("avatar-4.png"),
  ];
  const avatars =
    content.clientele.avatars.length > 0
      ? content.clientele.avatars
      : avatarDefaults;
  const logos = content.clientele.logos.length > 0 ? content.clientele.logos : [localAsset("logoipsum.png")];

  return {
    ...content,
    header: {
      ...content.header,
      logo: withImage(content.header.logo, localAsset("logo.svg", content.name)),
    },
    hero: {
      badgeRing: withImage(content.hero.badgeRing, localAsset("hero-badge-ring.png")),
      badgeCenter: withImage(content.hero.badgeCenter, localAsset("hero-badge-center.png", content.name)),
      slides: content.hero.slides.map((slide) => ({
        ...slide,
        background: withImage(slide.background, localAsset("hero-factory.png", slide.headingStrong)),
      })),
    },
    why: {
      ...content.why,
      images: whyImages,
    },
    products: {
      ...content.products,
      cards: content.products.cards.map((card, index) => ({
        ...card,
        image: withImage(card.image, productFallback(card.title, index)),
      })),
    },
    industries: {
      ...content.industries,
      cards: content.industries.cards.map((card, index) => ({
        ...card,
        image: withImage(card.image, industryFallback(card.title, index)),
      })),
    },
    process: {
      ...content.process,
      steps: content.process.steps.map((step, index) => ({
        ...step,
        icon: withImage(step.icon, localAsset(`process-icon-${(index % 6) + 1}.svg`, step.title)),
      })),
    },
    clientele: {
      ...content.clientele,
      avatars,
      logos,
      testimonials: content.clientele.testimonials.map((item, index) => ({
        ...item,
        photo: withImage(item.photo, testimonialFallback(item.name, index)),
      })),
    },
    insights: {
      ...content.insights,
      cards: content.insights.cards.map((card, index) => ({
        ...card,
        image: withImage(card.image, localAsset(`insight-${(index % 4) + 1}.png`, card.title)),
      })),
    },
    conversation: {
      ...content.conversation,
      blower: withImage(content.conversation.blower, localAsset("cta-blower.png")),
      pump: withImage(content.conversation.pump, localAsset("cta-pump.png")),
    },
    footer: {
      ...content.footer,
      badgeIso: withImage(content.footer.badgeIso, localAsset("footer-iso.svg", "ISO")),
      badgeCe: withImage(content.footer.badgeCe, localAsset("footer-ce.png", "CE")),
      social: content.footer.social.map((item) => ({
        ...item,
        icon: item.icon !== "" && !item.icon.startsWith(MEDIA_PLACEHOLDER) ? item.icon : socialFallback(item.label),
      })),
    },
  };
}

function emptyHome(): HomeContent {
  return {
    name: "",
    legalName: "",
    tagline: "",
    nav: [],
    header: { contactCta: { href: "", label: "" }, logo: null },
    hero: { slides: [], badgeRing: null, badgeCenter: null },
    why: { eyebrow: "", heading: "", body: "", images: [], items: [] },
    products: { eyebrow: "", heading: "", body: "", cta: { href: "", label: "" }, cards: [] },
    industries: { eyebrow: "", heading: "", body: "", cta: { href: "", label: "" }, cards: [] },
    process: { eyebrow: "", heading: "", body: "", banner: "", cta: { href: "", label: "" }, steps: [] },
    clientele: {
      eyebrow: "",
      heading: "",
      body: "",
      rating: "",
      ratingLabel: "",
      avatars: [],
      logos: [],
      testimonials: [],
    },
    insights: { eyebrow: "", heading: "", body: "", cards: [] },
    conversation: { eyebrow: "", heading: "", body: "", cta: { href: "", label: "" }, blower: null, pump: null },
    footer: {
      blurb: "",
      columns: [],
      social: [],
      copyright: "",
      legal: [],
      badgeIso: null,
      badgeCe: null,
    },
  };
}

async function fetchJson(url: string): Promise<unknown | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => {
    controller.abort();
  }, FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      method: "GET",
      redirect: "follow",
      headers: {
        Accept: "application/json",
        "User-Agent": "AeromaticNext/1.0",
      },
      signal: controller.signal,
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!response.ok) {
      console.error(`[wordpress] ${response.status} ${url}`);
      return null;
    }

    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("json")) {
      console.error(`[wordpress] non-json response ${url} ${contentType}`);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error(`[wordpress] fetch failed ${url}`, error);
    return null;
  } finally {
    clearTimeout(timer);
  }
}

function asPages(payload: unknown): unknown[] {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (isRecord(payload) && (payload.id !== undefined || acfHasValues(payload.acf))) {
    return [payload];
  }

  return [];
}

function pageAcf(page: unknown): unknown {
  if (!isRecord(page)) {
    return null;
  }

  return page.acf;
}

function pickHomePage(pages: unknown[]): unknown | null {
  if (pages.length === 0) {
    return null;
  }

  const preferredSlugs = ["home", "front-page", "homepage", "aeromatic"];
  for (const slug of preferredSlugs) {
    const match = pages.find((page) => isRecord(page) && page.slug === slug);
    if (match) {
      return match;
    }
  }

  const withAcf = pages.find((page) => acfHasValues(pageAcf(page)));
  return withAcf ?? pages[0];
}

async function fetchHomePage(): Promise<unknown | null> {
  let fallbackPage: unknown | null = null;

  for (const url of corePageUrls()) {
    const payload = await fetchJson(url);
    const pages = asPages(payload);
    if (pages.length === 0) {
      continue;
    }

    const page = pickHomePage(pages);
    if (page !== null && acfHasValues(pageAcf(page))) {
      return page;
    }

    if (fallbackPage === null && page !== null) {
      fallbackPage = page;
    }
  }

  if (fallbackPage !== null) {
    return fallbackPage;
  }

  console.error("[wordpress] no homepage payload from WordPress REST");
  return null;
}

export const getHomeContent = cache(async (): Promise<HomeContent> => {
  const page = await fetchHomePage();
  const acf = pageAcf(page);
  if (!acfHasValues(acf)) {
    return emptyHome();
  }

  const mapped = mapHome(acf);
  const withMedia = await resolveAttachmentImages(mapped);
  return applyDesignedImageFallbacks(withMedia);
});
