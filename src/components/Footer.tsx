import Image from "next/image";
import Link from "next/link";
import Logo from "@/components/Logo";
import type { FooterContent, ImageAsset } from "@/lib/content";

type FooterProps = {
  content: FooterContent;
  name: string;
  legalName: string;
  logo: ImageAsset | null;
};

export default function Footer({ content, name, legalName, logo }: FooterProps) {
  return (
    <footer id="footer" className="relative isolate overflow-hidden bg-white">
      <div className="footer-watermark" aria-hidden="true">
        <span className="footer-watermark__a">
          <Image
            src="/media/aeromatic/footer-mark-a.svg"
            alt=""
            width={442}
            height={174}
            unoptimized
            className="h-auto w-full object-contain"
          />
        </span>
        <span className="footer-watermark__o">
          <Image
            src="/media/aeromatic/footer-mark-o.svg"
            alt=""
            width={199}
            height={202}
            unoptimized
            className="h-auto w-full object-contain"
          />
        </span>
        <span className="footer-watermark__b">
          <Image
            src="/media/aeromatic/footer-mark-b.svg"
            alt=""
            width={783}
            height={225}
            unoptimized
            className="h-auto w-full object-contain"
          />
        </span>
      </div>
      <div className="site-shell relative z-[1] pt-16 lg:pt-24">
        <Link
          href="#top"
          aria-label="Scroll to top"
          className="focus-ring absolute top-0 right-[3.0729%] flex size-[64px] items-center justify-center rounded-full bg-primary transition-transform hover:scale-[1.04] active:scale-[0.97] md:size-[82px]"
        >
          <span className="relative size-6 overflow-clip md:size-[24.643px]">
            <Image
              src="/media/aeromatic/icon-scroll-top.svg"
              alt=""
              fill
              unoptimized
              className="object-contain"
            />
          </span>
        </Link>
        <div className="grid gap-12 pr-0 md:pr-24 lg:grid-cols-[minmax(0,405px)_minmax(0,1fr)_190px] lg:pr-28">
          <div>
            <Logo
              src={logo?.src}
              alt={logo?.alt || name}
              legalName={legalName}
              width={logo?.width}
              height={logo?.height}
            />
            {content.blurb ? (
              <p className="mt-6 max-w-[382px] text-[16px] leading-[26px] text-muted md:text-[18px] md:leading-[29px]">
                {content.blurb}
              </p>
            ) : null}
            {content.social.length > 0 ? (
              <div className="mt-8 flex gap-2.5">
                {content.social.map((item) =>
                  item.href && item.icon ? (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={item.label}
                      className="focus-ring relative block size-10 overflow-clip rounded-full transition-opacity hover:opacity-80"
                    >
                      <Image
                        src={item.icon}
                        alt=""
                        fill
                        unoptimized
                        className="object-contain"
                      />
                    </a>
                  ) : null
                )}
              </div>
            ) : null}
          </div>
          <div className="grid gap-10 sm:grid-cols-2">
            {content.columns.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <h3 className="text-[18px] font-medium leading-[29px] text-ink">
                  {column.title}
                </h3>
                <ul className="mt-[12px] flex flex-col gap-3">
                  {column.links.map((link) =>
                    link.href && link.label ? (
                      <li key={`${column.title}-${link.label}`}>
                        <Link
                          href={link.href}
                          className="focus-ring text-[16px] leading-[20px] text-subtle transition-colors hover:text-primary md:text-[18px]"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ) : null
                  )}
                </ul>
              </nav>
            ))}
          </div>
          {content.badgeIso?.src || content.badgeCe?.src ? (
            <div className="flex flex-col items-start gap-6 lg:items-center">
              {content.badgeIso?.src ? (
                <span className="relative size-[72px] overflow-clip md:size-[91px]">
                  <Image
                    src={content.badgeIso.src}
                    alt={content.badgeIso.alt}
                    fill
                    unoptimized
                    className="object-contain"
                  />
                </span>
              ) : null}
              {content.badgeCe?.src ? (
                <span className="relative flex size-[72px] items-center justify-center overflow-clip rounded-full bg-[#36373d] md:size-[91px]">
                  <Image
                    src={content.badgeCe.src}
                    alt={content.badgeCe.alt}
                    width={70}
                    height={70}
                    className="size-[56px] object-contain md:size-[70px]"
                  />
                </span>
              ) : null}
            </div>
          ) : null}
        </div>
        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-[30px] gap-y-3 border-t border-line py-8 text-[14px] text-muted md:text-[18px]">
          {content.copyright ? <p>{content.copyright}</p> : null}
          {content.legal.map((link) =>
            link.href && link.label ? (
              <Link
                key={link.label}
                href={link.href}
                className="focus-ring underline transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ) : null
          )}
        </div>
      </div>
    </footer>
  );
}
