import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import {
  INTRO,
  PROJECT_NAME,
  PROJECT_TAGLINE,
  PROJECT_YEAR,
} from "@/lib/project";

export const metadata: Metadata = {
  title: `About — ${PROJECT_NAME}`,
  description: INTRO.body,
};

export default function AboutPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-white">
      <Header />
      <main className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-center px-5 py-20 sm:px-8 lg:px-12">
        <span className="mb-6 inline-flex w-fit items-center gap-3">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-[11px] font-semibold text-white">
            1
          </span>
          <span className="rounded-full border border-gray-200 px-3 py-1 text-[12px] font-medium text-gray-900">
            Introducing {PROJECT_NAME}
          </span>
        </span>
        <h1 className="max-w-4xl text-[clamp(1.75rem,5vw,3.5rem)] font-medium leading-[1.1] tracking-[-0.03em] text-gray-900">
          {INTRO.heading}
        </h1>
        <p className="mt-8 max-w-xl text-[17px] leading-[1.7] text-gray-700">
          {INTRO.body} Built for hackathon {PROJECT_YEAR} — {PROJECT_TAGLINE}.
        </p>
      </main>
      <Footer />
    </div>
  );
}
