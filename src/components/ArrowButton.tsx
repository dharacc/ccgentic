import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";

type ArrowButtonProps = {
  href: string;
  children: string;
  variant?: "accent" | "dark";
  size?: "sm" | "md";
};

export default function ArrowButton({
  href,
  children,
  variant = "accent",
  size = "md",
}: ArrowButtonProps) {
  const isAccent = variant === "accent";
  const compact = size === "sm";
  const className = `group inline-flex items-center gap-2 rounded-full py-2 pe-2 font-medium text-white transition-colors ${
    compact ? "ps-5 text-[13px]" : "ps-5 text-[13px] sm:ps-6 sm:text-[14px]"
  } ${
    isAccent
      ? "bg-accent hover:bg-accent-hover"
      : "bg-gray-900 hover:bg-gray-800"
  }`;

  const content = (
    <>
      <span className="block h-5 overflow-hidden">
        <span className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-1/2">
          <span className="block h-5 leading-5">{children}</span>
          <span className="block h-5 leading-5" aria-hidden="true">
            {children}
          </span>
        </span>
      </span>
      <span
        className={`flex items-center justify-center rounded-full bg-white ${
          compact ? "h-6 w-6" : "h-7 w-7 sm:h-8 sm:w-8"
        }`}
      >
        <ArrowRightIcon
          className={`transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45 ${
            isAccent ? "text-accent" : "text-gray-900"
          } ${compact ? "h-3.5 w-3.5" : "h-4 w-4"}`}
        />
      </span>
    </>
  );

  if (href.startsWith("mailto:") || href.startsWith("http")) {
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
