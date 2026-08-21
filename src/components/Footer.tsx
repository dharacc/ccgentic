import Link from "next/link";
import ArrowButton from "@/components/ArrowButton";
import { ArrowUpRightIcon } from "@/components/icons";
import Logo from "@/components/Logo";
import {
  AVAILABILITY,
  FOOTER,
  HERO,
  PROJECT_EMAIL,
  PROJECT_NAME,
  PROJECT_YEAR,
} from "@/lib/project";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto w-full max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <div className="flex flex-col gap-8 border-b border-white/10 pb-12 sm:pb-16 lg:flex-row lg:items-end lg:justify-between lg:pb-20">
          <div className="max-w-2xl">
            <div className="mb-5 flex items-center gap-3 sm:mb-8">
              <span className="flex h-6 w-6 items-center justify-center overflow-hidden rounded-full bg-white sm:h-7 sm:w-7">
                <Logo className="h-5 w-auto" />
              </span>
              <span className="rounded-full border border-white/15 px-3 py-1 text-[12px] font-medium text-white sm:px-4 sm:py-1.5 sm:text-[13px]">
                {FOOTER.ctaLabel}
              </span>
            </div>
            <h2 className="text-[clamp(1.75rem,7vw,4.2rem)] font-medium leading-[1.08] tracking-[-0.03em] sm:text-[clamp(2.5rem,5vw,4.2rem)]">
              Ready to dominate
              <br className="hidden sm:block" />
              your category?
            </h2>
          </div>
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center lg:flex-col lg:items-end">
            <ArrowButton href={HERO.primaryCta.href}>
              {HERO.primaryCta.label}
            </ArrowButton>
            <a
              href={`mailto:${PROJECT_EMAIL}`}
              className="text-[14px] text-gray-400 transition-colors duration-300 hover:text-white"
            >
              {PROJECT_EMAIL}
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 py-12 sm:py-16 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:py-20">
          <div className="col-span-2 flex flex-col gap-5 lg:col-span-1">
            <Link
              href="/"
              aria-label={`${PROJECT_NAME} home`}
              className="flex items-center gap-2"
            >
              <span className="flex h-9 items-center rounded-full bg-white px-1.5 sm:h-10">
                <Logo className="h-8 w-auto" />
              </span>
              <span className="text-[15px] font-semibold tracking-tight sm:text-[16px]">
                {PROJECT_NAME}
              </span>
            </Link>
            <p className="max-w-xs text-[14px] leading-[1.6] text-gray-400">
              {FOOTER.blurb}
            </p>
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 text-[13px] text-gray-300">
              <span className="flex h-2 w-2 rounded-full bg-accent" />
              {AVAILABILITY}
            </span>
          </div>
          {FOOTER.columns.map((column) => (
            <nav key={column.title} className="flex flex-col gap-3.5">
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-500">
                {column.title}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <li key={`${column.title}-${link.label}`}>
                    {link.href.startsWith("http") ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="group inline-flex items-center gap-1 text-[14px] text-gray-400 transition-colors duration-300 hover:text-white"
                      >
                        {link.label}
                        <ArrowUpRightIcon className="opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="group inline-flex items-center gap-1 text-[14px] text-gray-400 transition-colors duration-300 hover:text-white"
                      >
                        {link.label}
                        <ArrowUpRightIcon className="opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="relative overflow-hidden border-t border-white/10 pt-8">
          <p className="relative z-10 flex flex-wrap items-center justify-between gap-4 text-[13px] text-gray-500">
            <span>
              {PROJECT_NAME} {PROJECT_YEAR}. All rights reserved.
            </span>
            <span className="flex gap-5">
              {FOOTER.legal.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </span>
          </p>
          <p
            aria-hidden="true"
            className="pointer-events-none mt-6 select-none text-[18vw] font-medium leading-none tracking-[-0.06em] text-white/5"
          >
            {PROJECT_NAME}
          </p>
        </div>
      </div>
    </footer>
  );
}
