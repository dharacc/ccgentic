import { CAPABILITIES } from "@/lib/project";

export default function Capabilities() {
  return (
    <section
      id="capabilities"
      className="border-t border-gray-200 bg-white pb-16 pt-16 sm:pb-20 sm:pt-20 lg:pb-28 lg:pt-28"
    >
      <div className="mx-auto w-full max-w-[1440px]">
        <div className="mb-6 flex items-center gap-3 px-5 sm:mb-8 sm:px-8 lg:px-12">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-[11px] font-semibold text-white sm:h-7 sm:w-7 sm:text-[12px]">
            {CAPABILITIES.number}
          </span>
          <span className="rounded-full border border-gray-200 px-3 py-1 text-[12px] font-medium text-gray-900 sm:px-4 sm:py-1.5 sm:text-[13px]">
            {CAPABILITIES.label}
          </span>
        </div>
        <h2 className="mb-10 px-5 text-[clamp(1.75rem,7vw,4.2rem)] font-medium leading-[1.08] tracking-[-0.03em] text-gray-900 sm:mb-14 sm:px-8 sm:text-[clamp(2.5rem,5vw,4.2rem)] lg:mb-16 lg:px-12">
          {CAPABILITIES.heading}
        </h2>
        <div className="grid grid-cols-1 gap-10 px-5 sm:gap-8 sm:px-8 md:grid-cols-3 lg:gap-12 lg:px-12">
          {CAPABILITIES.items.map((item) => (
            <article key={item.title} className="border-t border-gray-200 pt-6">
              <h3 className="text-[15px] font-semibold text-gray-900 sm:text-[16px]">
                {item.title}
              </h3>
              <p className="mt-3 text-[13px] leading-relaxed text-gray-600 sm:text-[14px]">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
