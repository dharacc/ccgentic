import Link from "next/link";
import Logo from "@/components/Logo";
import MobileNav from "@/components/MobileNav";
import NavLinks from "@/components/NavLinks";
import PillButton from "@/components/PillButton";
import type { ImageAsset, NavItem } from "@/lib/content";

type HeaderProps = {
  nav: NavItem[];
  name: string;
  legalName: string;
  logo: ImageAsset | null;
  contactLabel: string;
  contactHref: string;
};

export default function Header({
  nav,
  name,
  legalName,
  logo,
  contactLabel,
  contactHref,
}: HeaderProps) {
  return (
    <header className="relative sticky top-0 z-40 bg-white">
      <div className="site-shell flex h-[80px] items-center justify-between gap-4 xl:h-[102px] xl:gap-6">
        <Link href="/" aria-label={name ? `${name} home` : "Home"} className="focus-ring shrink-0 rounded-sm">
          <Logo
            src={logo?.src}
            alt={logo?.alt || name}
            legalName={legalName}
            width={logo?.width}
            height={logo?.height}
            preload
          />
        </Link>
        {nav.length > 0 ? (
          <nav className="hidden min-w-0 flex-1 items-center justify-center xl:flex" aria-label="Primary">
            <NavLinks nav={nav} variant="desktop" />
          </nav>
        ) : null}
        {contactLabel && contactHref ? (
          <div className="hidden shrink-0 xl:block">
            <PillButton href={contactHref}>{contactLabel}</PillButton>
          </div>
        ) : null}
        <MobileNav
          nav={nav}
          name={name}
          contactHref={contactHref}
          contactLabel={contactLabel}
        />
      </div>
    </header>
  );
}
