"use client";

import { useRef } from "react";
import Image from "next/image";
import type Slider from "react-slick";
import Carousel from "@/components/Carousel";
import type { ClienteleContent } from "@/lib/content";

type ClienteleProps = {
  content: ClienteleContent;
};

const TESTIMONIAL_AUTOPLAY_SPEED = 6000;
const TESTIMONIAL_SPEED = 500;
const LOGO_SPEED = 4000;
const LOGO_REPEAT = 8;

function ArrowButton({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={direction === "prev" ? "Previous testimonials" : "Next testimonials"}
      onClick={onClick}
      className="focus-ring flex size-12 cursor-pointer items-center justify-center rounded-full border border-line bg-white transition-colors hover:border-primary"
    >
      <span
        className={`relative size-[19px] overflow-clip ${
          direction === "prev" ? "rotate-180" : ""
        }`}
      >
        <Image
          src="/media/aeromatic/icon-arrow-clientele.svg"
          alt=""
          fill
          unoptimized
          className="object-contain"
        />
      </span>
    </button>
  );
}

export default function Clientele({ content }: ClienteleProps) {
  const sliderRef = useRef<Slider>(null);
  const logos = content.logos.flatMap((logo) =>
    Array.from({ length: LOGO_REPEAT }, () => logo)
  );

  return (
    <section id="clientele" className="bg-white py-16 lg:py-24">
      <div className="site-shell">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-start">
          <div>
            <p className="text-[14px] font-medium uppercase tracking-[1px] text-ink">
              {content.eyebrow}
            </p>
            <h2 className="font-display mt-4 max-w-[583px] text-[clamp(2rem,4vw,50px)] font-semibold leading-[1.21] text-primary">
              {content.heading}
            </h2>
          </div>
          <div className="lg:pt-1">
            <div className="flex items-center gap-4">
              {content.avatars.length > 0 ? (
                <div className="flex">
                  {content.avatars.map((avatar, index) => (
                    <span
                      key={`${avatar.src}-${index}`}
                      className="relative size-9 overflow-hidden rounded-full border-2 border-white"
                      style={{ marginLeft: index === 0 ? 0 : -12 }}
                    >
                      <Image src={avatar.src} alt={avatar.alt} fill className="object-cover" />
                    </span>
                  ))}
                </div>
              ) : null}
              <div>
                <div className="flex items-center gap-2">
                  {content.rating ? (
                    <span className="text-[20px] font-light text-secondary">
                      {content.rating}
                    </span>
                  ) : null}
                  <span className="relative h-[14px] w-[93px] overflow-clip">
                    <Image
                      src="/media/aeromatic/stars.svg"
                      alt=""
                      fill
                      unoptimized
                      className="object-contain"
                    />
                  </span>
                </div>
                {content.ratingLabel ? (
                  <p className="text-[13px] leading-[19px] text-secondary">
                    {content.ratingLabel}
                  </p>
                ) : null}
              </div>
            </div>
            {content.body ? (
              <p className="mt-5 max-w-[480px] text-[16px] leading-[22px] text-muted">
                {content.body}
              </p>
            ) : null}
            {content.testimonials.length > 0 ? (
              <div className="mt-6 flex gap-3">
                <ArrowButton
                  direction="prev"
                  onClick={() => sliderRef.current?.slickPrev()}
                />
                <ArrowButton
                  direction="next"
                  onClick={() => sliderRef.current?.slickNext()}
                />
              </div>
            ) : null}
          </div>
        </div>
        {content.testimonials.length > 0 ? (
          <Carousel
            ref={sliderRef}
            className="carousel-gap-5 mt-12"
            ariaLabel="Client testimonials"
            slidesToShow={4}
            slidesToScroll={1}
            arrows={false}
            dots={false}
            infinite
            autoplay
            autoplaySpeed={TESTIMONIAL_AUTOPLAY_SPEED}
            speed={TESTIMONIAL_SPEED}
            pauseOnHover
            pauseOnFocus
            responsive={[
              { breakpoint: 1280, settings: { slidesToShow: 3 } },
              { breakpoint: 768, settings: { slidesToShow: 2 } },
              { breakpoint: 640, settings: { slidesToShow: 1 } },
            ]}
          >
            {content.testimonials.map((item) => (
              <div key={`${item.name}-${item.location}`}>
                <article className="flex min-h-[309px] flex-col justify-between rounded-[15px] bg-secondary p-6">
                  <p className="text-[17px] leading-[25px] tracking-[-0.14px] text-white/55">
                    {item.lead}{" "}
                    <span className="text-[#fefefe]">{item.rest}</span>
                  </p>
                  <div className="mt-6 flex items-center gap-3">
                    {item.photo?.src ? (
                      <span className="relative size-12 overflow-hidden rounded-[12px]">
                        <Image src={item.photo.src} alt={item.name} fill className="object-cover" />
                      </span>
                    ) : null}
                    <div>
                      <p className="text-[19px] font-medium tracking-[-0.15px] text-[#fefefe]">
                        {item.name}
                      </p>
                      <p className="text-[15px] text-[#959595]">{item.location}</p>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </Carousel>
        ) : null}
      </div>
      {logos.length > 0 ? (
        <div className="mt-16 overflow-hidden bg-surface py-6">
          <Carousel
            className="carousel-logos"
            ariaLabel="Client logos"
            slidesToShow={6}
            slidesToScroll={1}
            arrows={false}
            dots={false}
            infinite
            autoplay
            autoplaySpeed={0}
            speed={LOGO_SPEED}
            cssEase="linear"
            pauseOnHover
            pauseOnFocus
            responsive={[
              { breakpoint: 1280, settings: { slidesToShow: 4 } },
              { breakpoint: 768, settings: { slidesToShow: 3 } },
              { breakpoint: 480, settings: { slidesToShow: 2 } },
            ]}
          >
            {logos.map((logo, index) => (
              <div key={`logo-${index}`}>
                <span className="relative mx-auto block h-[70px] w-[140px] opacity-50 sm:h-[106px] sm:w-[213px]">
                  <Image src={logo.src} alt={logo.alt} fill className="object-contain" />
                </span>
              </div>
            ))}
          </Carousel>
        </div>
      ) : null}
    </section>
  );
}
