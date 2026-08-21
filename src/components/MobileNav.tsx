"use client";

import { useState } from "react";
import Link from "next/link";
import { CloseIcon, MenuIcon } from "@/components/icons";
import { NAV_LINKS, PROJECT_NAME } from "@/lib/project";

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-white"
      >
        {open ? <CloseIcon /> : <MenuIcon />}
      </button>
      {open ? (
        <div className="absolute inset-x-2 top-[calc(100%+8px)] z-50 rounded-2xl bg-white p-4 shadow-[0_12px_40px_rgba(0,0,0,0.12)]">
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={`${link.href}-${link.label}`}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-2.5 text-[15px] text-gray-900 hover:bg-gray-50"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-3 px-3 text-[12px] text-gray-500">{PROJECT_NAME}</p>
        </div>
      ) : null}
    </div>
  );
}
