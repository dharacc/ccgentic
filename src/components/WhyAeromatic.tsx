"use client";

import { useState } from "react";
import Image from "next/image";
import SectionHeader from "@/components/SectionHeader";
import type { WhyContent } from "@/lib/content";

type WhyAeromaticProps = {
  content: WhyContent;
};

export default function WhyAeromatic({ content }: WhyAeromaticProps) {
  const [openIndex, setOpenIndex] = useState(0);
  const images = content.images.filter((item) => item.src);
  const first = images[0];
  const second = images[1];
  const third = images[2];

  return (
    <section id="why-aeromatic" className="dots-bg relative overflow-hidden py-16 lg:py-24">
      <div className="petal-deco petal-deco-why hidden md:block" aria-hidden="true" />
      <div className="site-shell relative z-[1]">
        <SectionHeader
          eyebrow={content.eyebrow}
          heading={content.heading}
          body={content.body}
        />
        <div className="mt-14 grid gap-10 lg:grid-cols-[682px_minmax(0,1fr)] lg:items-start lg:gap-16">
          {first ? (
            <div className="grid grid-cols-2 gap-[22px]">
              <div className="relative row-span-2 min-h-[420px] overflow-hidden rounded-[11px] lg:min-h-[523px]">
                <Image
                  src={first.src}
                  alt={first.alt}
                  fill
                  sizes="(min-width: 1024px) 330px, 50vw"
                  className="object-cover"
                />
                <div className="absolute bottom-6 left-1/2 flex size-[175px] -translate-x-1/2 items-center justify-center rounded-full border-[11px] border-white bg-primary">
                  <span className="relative size-[55px] overflow-clip">
                    <Image
                      src="/media/aeromatic/why-badge.svg"
                      alt=""
                      fill
                      unoptimized
                      className="object-contain"
                    />
                  </span>
                </div>
              </div>
              {second ? (
                <div className="relative min-h-[200px] overflow-hidden rounded-[11px] lg:min-h-[321px]">
                  <Image
                    src={second.src}
                    alt={second.alt}
                    fill
                    sizes="(min-width: 1024px) 330px, 50vw"
                    className="object-cover"
                  />
                </div>
              ) : null}
              {third ? (
                <div className="relative min-h-[200px] overflow-hidden rounded-[11px] lg:min-h-[320px]">
                  <Image
                    src={third.src}
                    alt={third.alt}
                    fill
                    sizes="(min-width: 1024px) 330px, 50vw"
                    className="object-cover"
                  />
                </div>
              ) : null}
            </div>
          ) : (
            <div />
          )}
          <div>
            {content.items.map((item, index) => {
              const isOpen = openIndex === index && item.body !== "";
              return (
                <button
                  key={`${item.number}-${item.title}`}
                  type="button"
                  onClick={() => setOpenIndex(index)}
                  className="focus-ring flex w-full cursor-pointer items-start gap-5 border-t border-line py-7 text-left last:border-b"
                >
                  <span className="w-8 shrink-0 text-[14px] font-medium uppercase tracking-[2.35px] text-ink">
                    {item.number}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[22px] font-semibold leading-[27px] text-ink">
                      {item.title}
                    </span>
                    {isOpen ? (
                      <span className="mt-3 block text-[18px] leading-[22px] text-muted">
                        {item.body}
                      </span>
                    ) : null}
                  </span>
                  {!isOpen ? (
                    <span className="relative mt-1 size-[19px] shrink-0 overflow-clip">
                      <Image
                        src="/media/aeromatic/icon-arrow-gray.svg"
                        alt=""
                        fill
                        unoptimized
                        className="object-contain"
                      />
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
