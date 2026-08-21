import ArrowButton from "@/components/ArrowButton";
import Header from "@/components/Header";
import { PartnerMarkIcon } from "@/components/icons";
import { HERO } from "@/lib/project";

export default function Hero() {
  return (
    <section className="relative flex h-dvh flex-col overflow-hidden bg-[#EFEFEF]">
      <div className="hero-mesh pointer-events-none absolute inset-0 z-10" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-[-10%] z-10 h-[70%] w-[70%] rounded-full bg-white/50 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-20%] left-[-15%] z-10 h-[55%] w-[55%] rotate-12 rounded-[40%] bg-[#f3e6d8]/70 blur-3xl"
      />
      <Header />
      <div className="relative z-20 flex flex-1 flex-col justify-end">
        <div className="mx-auto w-full max-w-[1440px] px-5 pb-14 sm:px-8 sm:pb-16 lg:px-12 lg:pb-20">
          <p className="mb-5 block text-[13px] tracking-wide text-gray-900 sm:mb-8 sm:text-[14px]">
            {HERO.eyebrow}
          </p>
          <h1 className="text-[clamp(1.75rem,7vw,4.2rem)] font-medium leading-[1.08] tracking-[-0.03em] text-gray-900 sm:text-[clamp(2.5rem,5vw,4.2rem)]">
            {HERO.headingLines[0]}
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            {HERO.headingLines[1]}
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            {HERO.headingLines[2]}
          </h1>
          <div className="mt-8 flex flex-col items-start gap-4 sm:mt-12 sm:flex-row sm:items-center sm:gap-5">
            <ArrowButton href={HERO.primaryCta.href}>
              {HERO.primaryCta.label}
            </ArrowButton>
            <div className="flex items-center gap-2 rounded-[4px] bg-white px-2.5 py-2 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
              <PartnerMarkIcon className="h-5 w-5 text-[#E8704E] sm:h-6 sm:w-6" />
              <span className="text-[13px] font-medium text-gray-900 sm:text-[14px]">
                {HERO.badge.label}
              </span>
              <span className="rounded bg-gray-900 px-1.5 py-0.5 text-[10px] text-white sm:px-2 sm:text-[11px]">
                {HERO.badge.tag}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
