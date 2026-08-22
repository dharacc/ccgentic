"use client";

import { useState } from "react";
import NavLinks from "@/components/NavLinks";
import PillButton from "@/components/PillButton";
import type { NavItem } from "@/lib/content";

type MobileNavProps = {
  nav: NavItem[];
  name: string;
  contactHref: string;
  contactLabel: string;
};

export default function MobileNav({
  nav,
  name,
  contactHref,
  contactLabel,
}: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="xl:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="focus-ring flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-primary text-white transition-transform hover:scale-[1.04] active:scale-[0.97]"
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        <span className="flex flex-col gap-1.5">
          <span
            className={`block h-0.5 w-5 bg-white motion-safe:transition-transform ${
              open ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span className={`block h-0.5 w-5 bg-white ${open ? "opacity-0" : ""}`} />
          <span
            className={`block h-0.5 w-5 bg-white motion-safe:transition-transform ${
              open ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </span>
      </button>
      {open ? (
        <div className="absolute inset-x-4 top-[calc(100%+8px)] z-50 rounded-2xl bg-white p-5 shadow-[0_12px_40px_rgba(0,0,0,0.12)]">
          {nav.length > 0 ? (
            <nav aria-label="Mobile">
              <NavLinks nav={nav} variant="mobile" onNavigate={() => setOpen(false)} />
            </nav>
          ) : null}
          {contactLabel && contactHref ? (
            <div className="mt-4">
              <PillButton href={contactHref}>{contactLabel}</PillButton>
            </div>
          ) : null}
          {name ? <p className="mt-3 px-3 text-[12px] text-muted">{name}</p> : null}
        </div>
      ) : null}
    </div>
  );
}
