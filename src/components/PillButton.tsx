import Link from "next/link";
import Image from "next/image";

type PillButtonProps = {
  href: string;
  children: string;
  variant?: "navy" | "white" | "ghost-white";
};

const ARROW_NAVY = "/media/aeromatic/icon-arrow-navy.svg";
const ARROW_WHITE = "/media/aeromatic/icon-arrow-white.svg";

export default function PillButton({
  href,
  children,
  variant = "navy",
}: PillButtonProps) {
  const isNavy = variant === "navy";
  const restArrow = isNavy ? ARROW_NAVY : ARROW_WHITE;
  const hoverArrow = isNavy ? ARROW_WHITE : ARROW_NAVY;
  const className = `pill-button focus-ring ${
    isNavy ? "pill-button--navy" : "pill-button--ghost"
  }`;

  const content = (
    <>
      <span className="pill-button__fill" aria-hidden="true" />
      <span className="pill-button__label">{children}</span>
      <span className="pill-button__disc">
        <span className="pill-button__arrow pill-button__arrow--rest">
          <Image
            src={restArrow}
            alt=""
            width={19}
            height={19}
            unoptimized
            className="size-[19px]"
          />
        </span>
        <span className="pill-button__arrow pill-button__arrow--hover">
          <Image
            src={hoverArrow}
            alt=""
            width={19}
            height={19}
            unoptimized
            className="size-[19px]"
          />
        </span>
      </span>
    </>
  );

  if (href.startsWith("http") || href.startsWith("mailto:")) {
    return (
      <a href={href} className={className}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}
