import Image from "next/image";
import PillButton from "@/components/PillButton";
import type { ConversationContent } from "@/lib/content";

type ConversationCtaProps = {
  content: ConversationContent;
};

export default function ConversationCta({ content }: ConversationCtaProps) {
  return (
    <section id="conversation" className="relative overflow-hidden bg-primary py-16 lg:py-[120px]">
      <div className="pointer-events-none absolute inset-x-0 -top-[0.526%] h-[100.526%] w-full">
        <Image
          src="/media/aeromatic/cta-bg.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-primary mix-blend-multiply" />
      <div className="pointer-events-none absolute top-[-20.395%] left-[39.896%] hidden h-[154.868%] w-[61.302%] lg:block">
        <Image
          src="/media/aeromatic/cta-ring-1.svg"
          alt=""
          fill
          unoptimized
          className="object-contain"
        />
      </div>
      <div className="pointer-events-none absolute top-[-3.158%] left-[46.719%] hidden h-[120.395%] w-[47.656%] lg:block">
        <Image
          src="/media/aeromatic/cta-ring-2.svg"
          alt=""
          fill
          unoptimized
          className="object-contain"
        />
      </div>
      <div className="pointer-events-none absolute top-[13.553%] left-[53.333%] hidden h-[86.974%] w-[34.427%] lg:block">
        <Image
          src="/media/aeromatic/cta-ring-3.svg"
          alt=""
          fill
          unoptimized
          className="object-contain"
        />
      </div>
      <div className="site-shell relative z-[1] grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div>
          <p className="text-[14px] font-medium uppercase tracking-[1px] text-white">
            {content.eyebrow}
          </p>
          <h2 className="font-display mt-4 max-w-[621px] text-[clamp(2rem,4vw,50px)] font-semibold leading-[1.21] text-white">
            {content.heading}
          </h2>
          {content.body ? (
            <p className="mt-8 max-w-[666px] text-[18px] leading-[28px] text-white">
              {content.body}
            </p>
          ) : null}
          {content.cta.href && content.cta.label ? (
            <div className="mt-10">
              <PillButton href={content.cta.href} variant="ghost-white">
                {content.cta.label}
              </PillButton>
            </div>
          ) : null}
        </div>
        <div className="relative min-h-[360px] lg:min-h-[586px]">
          {content.blower?.src ? (
            <div className="absolute top-[12.5%] left-[2%] h-[77.1%] w-[71.6%]">
              <Image
                src={content.blower.src}
                alt={content.blower.alt}
                fill
                className="object-contain"
              />
            </div>
          ) : null}
          {content.pump?.src ? (
            <div className="absolute top-[40.6%] right-0 h-[54.5%] w-[52.8%]">
              <Image
                src={content.pump.src}
                alt={content.pump.alt}
                fill
                className="object-contain"
              />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
