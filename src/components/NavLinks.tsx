"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type NavItem } from "@/lib/content";

type NavLinksProps = {
  nav: NavItem[];
  variant: "desktop" | "mobile";
  onNavigate?: () => void;
};

function isCurrentPage(href: string, pathname: string) {
  if (href === "/") {
    return pathname === "/";
  }
  const path = href.split("#")[0];
  if (path === "" || path === "/") {
    return false;
  }
  return pathname === path || pathname.startsWith(`${path}/`);
}

export default function NavLinks({ nav, variant, onNavigate }: NavLinksProps) {
  const pathname = usePathname();
  const isDesktop = variant === "desktop";

  return (
    <ul
      className={
        isDesktop
          ? "flex flex-wrap items-center justify-center gap-x-[22px] gap-y-2"
          : "flex flex-col gap-1"
      }
    >
      {nav.map((link) => {
        const current = isCurrentPage(link.href, pathname);
        return (
          <li key={`${link.href}-${link.label}`} className="relative">
            <Link
              href={link.href}
              onClick={onNavigate}
              aria-current={current ? "page" : undefined}
              className={
                isDesktop
                  ? `nav-link inline-flex items-center gap-1.5 text-[16px] leading-[30px] ${
                      current ? "is-current font-semibold" : "font-medium"
                    }`
                  : `nav-link block rounded-xl px-3 py-2.5 text-[15px] leading-[24px] ${
                      current ? "is-current font-semibold" : "font-medium"
                    }`
              }
            >
              <span>{link.label}</span>
              {link.hasMenu ? <span className="nav-chevron" aria-hidden="true" /> : null}
            </Link>
            {isDesktop && current ? (
              <span className="absolute inset-x-0 -bottom-0.5 h-px bg-primary" />
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
