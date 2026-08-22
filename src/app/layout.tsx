import type { Metadata } from "next";
import { Barlow, Source_Sans_3 } from "next/font/google";
import { getHomeContent } from "@/lib/wordpress";
import "./globals.css";

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

const barlow = Barlow({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "600", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  const content = await getHomeContent();

  return {
    title: content.name || "Home",
    description: content.tagline || undefined,
  };
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${sourceSans.variable} ${barlow.variable} ${sourceSans.className} h-full antialiased`}
    >
      <body className="min-h-full bg-white text-ink">{children}</body>
    </html>
  );
}
