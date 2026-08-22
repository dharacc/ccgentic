import Image from "next/image";
import PillButton from "@/components/PillButton";
import SectionHeader from "@/components/SectionHeader";
import type { ProcessContent } from "@/lib/content";

type EngineeringProcessProps = {
  content: ProcessContent;
};

export default function EngineeringProcess({ content }: EngineeringProcessProps) {
  return (
    <section id="process" className="relative isolate overflow-hidden bg-surface py-16 lg:py-24">
      <div className="petal-deco petal-deco-process hidden md:block" aria-hidden="true" />
      <div className="site-shell relative z-[1]">
        <SectionHeader
          eyebrow={content.eyebrow}
          heading={content.heading}
          body={content.body}
        />
        <div className="mt-14 overflow-hidden rounded-[20px] border border-[#dcdee1] bg-[#fdfdfd]">
          <div className="grid sm:grid-cols-2 xl:grid-cols-3">
            {content.steps.map((step) => (
              <article
                key={step.title}
                className="border-[#dcdee1] p-10 sm:border-r sm:[&:nth-child(2n)]:border-r-0 xl:border-b xl:[&:nth-child(3n)]:border-r-0 xl:[&:nth-child(n+4)]:border-b-0"
              >
                {step.icon?.src ? (
                  <span className="relative block size-[78px] overflow-clip">
                    <Image
                      src={step.icon.src}
                      alt=""
                      fill
                      unoptimized
                      className="object-contain"
                    />
                  </span>
                ) : null}
                <h3 className="mt-8 text-[23px] font-medium leading-[39px] text-ink">
                  {step.title}
                </h3>
                {step.body ? (
                  <p className="mt-3 text-[16px] leading-[20px] text-muted">
                    {step.body}
                  </p>
                ) : null}
              </article>
            ))}
          </div>
        </div>
        {content.banner || (content.cta.href && content.cta.label) ? (
          <div className="mt-10 flex flex-col items-start justify-between gap-5 rounded-full bg-primary px-8 py-5 text-white sm:flex-row sm:items-center sm:px-11">
            {content.banner ? (
              <p className="text-[22px] font-semibold tracking-[-0.45px] sm:text-[25px]">
                {content.banner}
              </p>
            ) : null}
            {content.cta.href && content.cta.label ? (
              <PillButton href={content.cta.href} variant="ghost-white">
                {content.cta.label}
              </PillButton>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}
