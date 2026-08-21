import type { Metadata } from "next";
import ArrowButton from "@/components/ArrowButton";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { PROJECT_EMAIL, PROJECT_NAME, PROJECT_YEAR } from "@/lib/project";

export const metadata: Metadata = {
  title: `Connect — ${PROJECT_NAME}`,
  description: `Start a project with ${PROJECT_NAME}.`,
};

export default function ContactPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-white">
      <Header />
      <main className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-center px-5 py-20 sm:px-8 lg:px-12">
        <span className="mb-6 inline-flex w-fit rounded-full border border-gray-200 px-3 py-1 text-[12px] font-medium text-gray-900">
          Connect
        </span>
        <h1 className="max-w-3xl text-[clamp(1.75rem,5vw,3.5rem)] font-medium leading-[1.1] tracking-[-0.03em] text-gray-900">
          Ready to dominate your category?
        </h1>
        <p className="mt-8 max-w-xl text-[17px] leading-[1.7] text-gray-700">
          Reach the {PROJECT_NAME} team while hackathon {PROJECT_YEAR} is live.
          Tell us what you want to ship.
        </p>
        <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <ArrowButton href={`mailto:${PROJECT_EMAIL}`}>
            Book a strategy call
          </ArrowButton>
          <a
            href={`mailto:${PROJECT_EMAIL}`}
            className="text-[14px] text-gray-500 transition-colors hover:text-gray-900"
          >
            {PROJECT_EMAIL}
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
