"use client";

import Image from "next/image";
import Carousel from "@/components/Carousel";
import PillButton from "@/components/PillButton";
import type { HeroContent } from "@/lib/content";

type HeroProps = {
  content: HeroContent;
};

const HERO_AUTOPLAY_SPEED = 5500;
const HERO_SPEED = 600;

export default function Hero({ content }: HeroProps) {
  const slides = content.slides;
  if (slides.length === 0) {
    return null;
  }

  const canCycle = slides.length > 1;

  return (
    <section className="px-3 pb-6 sm:px-4 lg:px-6">
      <Carousel
        className="hero-carousel overflow-hidden rounded-[25px]"
        ariaLabel="Hero banners"
        slidesToShow={1}
        slidesToScroll={1}
        arrows={false}
        dots={canCycle}
        infinite={canCycle}
        autoplay={canCycle}
        autoplaySpeed={HERO_AUTOPLAY_SPEED}
        speed={HERO_SPEED}
        pauseOnHover
        pauseOnFocus
        fade={false}
      >
        {slides.map((slide, index) => (
          <div key={`${slide.headingStrong}-${index}`}>
            <div className="relative overflow-hidden bg-black">
              <div className="relative min-h-[520px] sm:min-h-[560px] lg:min-h-[850px]">
                {slide.background?.src ? (
                  <Image
                    src={slide.background.src}
                    alt={slide.background.alt}
                    fill
                    preload
                    sizes="100vw"
                    className="object-cover object-[center_center] sm:object-center"
                  />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/10 sm:from-black/55 sm:via-black/25 sm:to-transparent" />
                <div className="site-shell relative z-10 flex min-h-[520px] flex-col justify-center py-14 sm:min-h-[560px] sm:py-16 lg:min-h-[850px] lg:py-24">
                  <h1 className="font-display max-w-[750px] text-[clamp(2rem,4.2vw,54.3px)] leading-[1.1] text-white">
                    <span className="font-bold">{slide.headingStrong}</span>
                    {slide.headingLight.map((line) => (
                      <span key={line} className="block font-light">
                        {line}
                      </span>
                    ))}
                  </h1>
                  {slide.body ? (
                    <p className="mt-6 max-w-[599px] text-[16px] leading-[24px] text-[#e5e7eb] sm:mt-8 sm:text-[18px] sm:leading-[25px]">
                      {slide.body}
                    </p>
                  ) : null}
                  {slide.cta.href && slide.cta.label ? (
                    <div className="mt-8">
                      <PillButton href={slide.cta.href} variant="ghost-white">
                        {slide.cta.label}
                      </PillButton>
                    </div>
                  ) : null}
                </div>
                {content.badgeRing?.src ? (
                  <div className="absolute top-[24px] right-[16px] hidden size-[160px] sm:top-[40px] sm:right-[28px] sm:block md:size-[200px] lg:top-[67px] lg:right-[48px] lg:size-[247px]">
                    <div className="hero-badge-spin absolute inset-0">
                      <Image
                        src={content.badgeRing.src}
                        alt=""
                        fill
                        className="object-contain"
                      />
                    </div>
                    {content.badgeCenter?.src ? (
                      <div className="absolute top-1/2 left-1/2 size-[56px] -translate-x-1/2 -translate-y-1/2 md:size-[70px] lg:size-[86px]">
                        <Image
                          src={content.badgeCenter.src}
                          alt={content.badgeCenter.alt}
                          fill
                          className="object-contain"
                        />
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </section>
  );
}
