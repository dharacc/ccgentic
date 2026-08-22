type SectionHeaderProps = {
  eyebrow: string;
  heading: string;
  body: string;
  invert?: boolean;
};

export default function SectionHeader({
  eyebrow,
  heading,
  body,
  invert = false,
}: SectionHeaderProps) {
  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.9fr)] lg:items-start lg:gap-16">
      <div>
        <p
          className={`text-[14px] font-medium uppercase tracking-[1px] leading-[18.7px] ${
            invert ? "text-white" : "text-ink"
          }`}
        >
          {eyebrow}
        </p>
        <h2
          className={`font-display mt-4 max-w-[850px] text-[clamp(2rem,4vw,50px)] font-semibold leading-[1.21] ${
            invert ? "text-white" : "text-primary"
          }`}
        >
          {heading}
        </h2>
      </div>
      <p
        className={`max-w-[560px] text-[16px] leading-[22px] lg:justify-self-end lg:pt-12 lg:text-[18px] lg:leading-[22px] ${
          invert ? "text-white" : "text-muted"
        }`}
      >
        {body}
      </p>
    </div>
  );
}
