import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { JOURNAL, PROJECT_NAME } from "@/lib/project";

export const metadata: Metadata = {
  title: `Journal — ${PROJECT_NAME}`,
  description: `Notes and updates from ${PROJECT_NAME}.`,
};

export default function JournalPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-white">
      <Header />
      <main className="mx-auto w-full max-w-[1440px] flex-1 px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        <span className="mb-6 inline-flex w-fit items-center gap-3">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-[11px] font-semibold text-white">
            {JOURNAL.number}
          </span>
          <span className="rounded-full border border-gray-200 px-3 py-1 text-[12px] font-medium text-gray-900">
            {PROJECT_NAME} Journal
          </span>
        </span>
        <h1 className="max-w-4xl text-[clamp(1.75rem,5vw,3.5rem)] font-medium leading-[1.1] tracking-[-0.03em] text-gray-900">
          Studio notes
        </h1>
        <p className="mt-6 max-w-xl text-[17px] leading-[1.7] text-gray-700">
          {JOURNAL.intro}
        </p>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {JOURNAL.items.map((post) => (
            <article key={post.slug}>
              <Link href={`/journal/${post.slug}`} className="group block">
                {post.featuredImage ? (
                  <img
                    src={post.featuredImage}
                    alt=""
                    className="mb-4 aspect-[4/3] w-full rounded-2xl object-cover"
                  />
                ) : (
                  <div className="mb-4 aspect-[4/3] w-full rounded-2xl bg-[#EFEFEF]" />
                )}
                <p className="text-[13px] leading-relaxed text-gray-600">
                  {post.excerpt}
                </p>
                <h2 className="mt-1 text-[18px] font-semibold text-gray-900 transition-colors duration-300 group-hover:text-gray-500">
                  {post.title}
                </h2>
              </Link>
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
