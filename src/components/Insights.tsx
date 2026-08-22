import Image from "next/image";
import Link from "next/link";
import Carousel from "@/components/Carousel";
import SectionHeader from "@/components/SectionHeader";
import type { InsightsContent } from "@/lib/content";

type InsightsProps = {
  content: InsightsContent;
};

const INSIGHT_ARROWS = [
  "/media/aeromatic/icon-arrow-insight.svg",
  "/media/aeromatic/icon-arrow-insight-2.svg",
  "/media/aeromatic/icon-arrow-insight-3.svg",
  "/media/aeromatic/icon-arrow-insight-4.svg",
];

export default function Insights({ content }: InsightsProps) {
  return (
    <section id="insights" className="dots-bg dots-bg-insights overflow-hidden py-16 lg:py-24">
      <div className="site-shell relative z-[1]">
        <SectionHeader
          eyebrow={content.eyebrow}
          heading={content.heading}
          body={content.body}
        />
      </div>
      {content.cards.length > 0 ? (
        <div className="site-shell relative z-[1] mt-14">
          <Carousel
            className="carousel-gap-6 insights-carousel"
            ariaLabel="Engineering insights"
            slidesToShow={1}
            slidesToScroll={1}
            arrows={false}
            dots={false}
            infinite={false}
            autoplay={false}
            variableWidth
            speed={400}
          >
            {content.cards.map((card, index) => {
              const inner = (
                <article className="w-[min(86vw,453px)] overflow-hidden rounded-[23px] bg-white">
                  <div className="relative h-[220px] sm:h-[282px]">
                    {card.image?.src ? (
                      <Image
                        src={card.image.src}
                        alt={card.image.alt}
                        fill
                        sizes="453px"
                        className="object-cover"
                      />
                    ) : null}
                  </div>
                  <div className="relative border border-t-0 border-line px-6 py-6 sm:px-8 sm:py-8">
                    <p className="text-[22px] font-semibold capitalize leading-[28px] text-ink sm:text-[28px] sm:leading-[30px]">
                      {card.category}
                    </p>
                    {card.meta ? (
                      <p className="mt-2 text-[14px] font-medium uppercase tracking-[2.42px] text-muted">
                        {card.meta}
                      </p>
                    ) : null}
                    <div className="mt-6 flex items-end justify-between gap-4">
                      <p className="max-w-[270px] text-[16px] font-medium leading-[23px] text-[#1d3960] sm:text-[18px] sm:leading-[25px]">
                        {card.title}
                      </p>
                      <span className="focus-ring relative flex size-[55px] shrink-0 items-center justify-center overflow-clip rounded-full bg-primary transition-transform hover:scale-[1.06] active:scale-[0.97]">
                        <Image
                          src={INSIGHT_ARROWS[index] ?? INSIGHT_ARROWS[0]}
                          alt=""
                          width={22}
                          height={22}
                          unoptimized
                          className="size-[22px]"
                        />
                      </span>
                    </div>
                  </div>
                </article>
              );

              return (
                <div key={card.title}>
                  {card.href ? (
                    <Link href={card.href} aria-label={card.title}>
                      {inner}
                    </Link>
                  ) : (
                    inner
                  )}
                </div>
              );
            })}
          </Carousel>
        </div>
      ) : null}
    </section>
  );
}
