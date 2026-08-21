import Image from "next/image";
import ArrowButton from "@/components/ArrowButton";
import { INTRO } from "@/lib/project";

export default function Intro() {
  const firstImage = INTRO.images[0];
  const secondImage = INTRO.images[1];

  if (!firstImage || !secondImage) {
    return null;
  }

  return (
    <section className="overflow-hidden bg-white pb-12 pt-16 sm:pb-16 sm:pt-20 lg:pb-24 lg:pt-32">
      <div className="mx-auto w-full max-w-[1440px]">
        <div className="mb-6 flex items-center gap-3 px-5 sm:mb-8 sm:px-8 lg:px-12">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-[11px] font-semibold text-white sm:h-7 sm:w-7 sm:text-[12px]">
            {INTRO.number}
          </span>
          <span className="rounded-full border border-gray-200 px-3 py-1 text-[12px] font-medium text-gray-900 sm:px-4 sm:py-1.5 sm:text-[13px]">
            {INTRO.label}
          </span>
        </div>
        <h2 className="mb-12 max-w-4xl px-5 text-[clamp(1.5rem,4vw,3.2rem)] font-medium leading-[1.12] tracking-[-0.02em] text-gray-900 sm:mb-16 sm:px-8 lg:mb-28 lg:px-12">
          {INTRO.heading}
        </h2>
        <div className="px-5 sm:px-8 lg:px-12">
          <div className="lg:hidden">
            <p className="text-[15px] font-medium leading-[1.6] text-gray-900 sm:text-[17px]">
              {INTRO.body}
            </p>
            <div className="mt-6">
              <ArrowButton href={INTRO.cta.href}>{INTRO.cta.label}</ArrowButton>
            </div>
            <div className="mt-8 flex flex-col gap-4 sm:mt-10 sm:flex-row sm:items-end sm:gap-5">
              <Image
                src={firstImage.src}
                alt={firstImage.alt}
                width={firstImage.width}
                height={firstImage.height}
                className="aspect-[438/346] w-full rounded-[0.75rem] object-cover sm:w-[45%] sm:rounded-2xl"
              />
              <Image
                src={secondImage.src}
                alt={secondImage.alt}
                width={secondImage.width}
                height={secondImage.height}
                className="aspect-[3/2] w-full rounded-[0.75rem] object-cover sm:w-[55%] sm:rounded-2xl"
              />
            </div>
          </div>
          <div className="hidden lg:grid lg:grid-cols-[24%_minmax(0,1fr)_44%] lg:items-end lg:gap-6 xl:gap-8">
            <Image
              src={firstImage.src}
              alt={firstImage.alt}
              width={firstImage.width}
              height={firstImage.height}
              className="aspect-[438/346] w-full rounded-2xl object-cover"
            />
            <div className="pb-1">
              <p className="text-[16px] font-medium leading-[1.65] text-gray-900 xl:text-[18px]">
                {INTRO.body}
              </p>
              <div className="mt-6">
                <ArrowButton href={INTRO.cta.href}>{INTRO.cta.label}</ArrowButton>
              </div>
            </div>
            <Image
              src={secondImage.src}
              alt={secondImage.alt}
              width={secondImage.width}
              height={secondImage.height}
              className="aspect-[3/2] w-full rounded-2xl object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
