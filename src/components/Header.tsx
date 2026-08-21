import Link from "next/link";
import ArrowButton from "@/components/ArrowButton";
import Logo from "@/components/Logo";
import MobileNav from "@/components/MobileNav";
import { AVAILABILITY, HERO, NAV_LINKS, PROJECT_NAME } from "@/lib/project";

export default function Header() {
  return (
    <header className="relative z-20 mx-auto w-full max-w-[1440px] p-2 sm:p-3">
      <nav className="relative flex items-center justify-between rounded-full bg-white p-[5px]">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="flex items-center gap-2"
            aria-label={`${PROJECT_NAME} home`}
          >
            <span className="flex h-9 items-center rounded-full px-1 sm:h-10">
              <Logo priority className="h-8 w-auto sm:h-9" />
            </span>
            <span className="pr-1 text-[15px] font-semibold tracking-tight text-gray-900 sm:text-[16px]">
              {PROJECT_NAME}
            </span>
          </Link>
          <ul className="hidden items-center gap-6 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={`${link.href}-${link.label}`}>
                <Link
                  href={link.href}
                  className="text-[14px] text-gray-900 transition-colors duration-300 hover:text-gray-500"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden items-center gap-4 md:flex">
          <span className="hidden text-[13px] text-gray-600 lg:block">
            {AVAILABILITY}
          </span>
          <ArrowButton href={HERO.headerCta.href} variant="dark" size="sm">
            {HERO.headerCta.label}
          </ArrowButton>
        </div>
        <MobileNav />
      </nav>
    </header>
  );
}
