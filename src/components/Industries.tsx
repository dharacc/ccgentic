import Image from "next/image";
import Link from "next/link";
import PillButton from "@/components/PillButton";
import SectionHeader from "@/components/SectionHeader";
import type { IndustriesContent } from "@/lib/content";

type IndustriesProps = {
  content: IndustriesContent;
};

export default function Industries({ content }: IndustriesProps) {
  return (
    <section id="industries" className="dots-bg dots-bg-industries relative overflow-hidden py-16 lg:py-24">
      <div className="petal-deco petal-deco-industries hidden md:block" />
      <div className="site-shell relative z-[1]">
        <SectionHeader
          eyebrow={content.eyebrow}
          heading={content.heading}
          body={content.body}
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {content.cards.map((card) => {
            const inner = (
              <>
                {card.image?.src ? (
                  <Image
                    src={card.image.src}
                    alt={card.image.alt}
                    fill
                    sizes="(min-width: 1280px) 467px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
                  <h3 className="font-display text-[20px] font-semibold tracking-[-0.5px] text-white">
                    {card.title}
                  </h3>
                  <span className="relative flex size-11 items-center justify-center overflow-clip rounded-full bg-white">
                    <Image
                      src="/media/aeromatic/icon-arrow-card.svg"
                      alt=""
                      width={18}
                      height={18}
                      unoptimized
                      className="size-[18px]"
                    />
                  </span>
                </div>
              </>
            );

            const className =
              "focus-ring group relative block min-h-[240px] cursor-pointer overflow-hidden rounded-[15px] sm:min-h-[280px] lg:min-h-[404px]";

            if (card.href) {
              return (
                <Link key={card.title} href={card.href} className={className}>
                  {inner}
                </Link>
              );
            }

            return (
              <div key={card.title} className={className}>
                {inner}
              </div>
            );
          })}
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
