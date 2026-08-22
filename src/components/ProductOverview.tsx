import Image from "next/image";
import Link from "next/link";
import PillButton from "@/components/PillButton";
import SectionHeader from "@/components/SectionHeader";
import type { ProductsContent } from "@/lib/content";

type ProductOverviewProps = {
  content: ProductsContent;
};

export default function ProductOverview({ content }: ProductOverviewProps) {
  return (
    <section id="products" className="relative overflow-hidden bg-surface py-16 lg:py-24">
      <div className="warehouse-deco">
        <Image
          src="/media/aeromatic/warehouse-bg.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
      <div className="site-shell relative z-[1]">
        <SectionHeader
          eyebrow={content.eyebrow}
          heading={content.heading}
          body={content.body}
        />
        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {content.cards.map((card) => (
            <article
              key={card.title}
              className="overflow-hidden rounded-[26px] bg-white"
            >
              <div className="relative h-[320px] bg-secondary sm:h-[420px] lg:h-[557px]">
                {card.image?.src ? (
                  <Image
                    src={card.image.src}
                    alt={card.image.alt}
                    fill
                    sizes="(min-width: 1024px) 719px, 100vw"
                    className="object-contain"
                  />
                ) : null}
              </div>
              <div className="px-8 py-8 sm:px-11 sm:py-10">
                <h3 className="text-[24px] font-bold leading-[1.2] text-primary sm:text-[30px]">
                  {card.title}
                </h3>
                {card.summary ? (
                  <p className="mt-2 text-[18px] leading-[34px] text-muted">
                    {card.summary}
                  </p>
                ) : null}
                {card.href && card.action ? (
                  <Link
                    href={card.href}
                    className="text-arrow-link focus-ring mt-4 inline-flex items-center gap-2 text-[16px] font-semibold text-ink transition-colors hover:text-primary"
                  >
                    {card.action}
                    <span className="text-arrow-link__icon relative size-[15px] overflow-clip">
                      <Image
                        src="/media/aeromatic/icon-arrow-small.svg"
                        alt=""
                        fill
                        unoptimized
                        className="object-contain"
                      />
                    </span>
                  </Link>
                ) : null}
              </div>
            </article>
          ))}
        </div>
        {content.cta.href && content.cta.label ? (
          <div className="mt-14 flex justify-center">
            <PillButton href={content.cta.href}>{content.cta.label}</PillButton>
          </div>
        ) : null}
      </div>
    </section>
  );
}
