import Link from "next/link";
import { JOURNAL } from "@/lib/project";

export default function JournalPreview() {
  const posts = JOURNAL.items.slice(0, 3);

  if (posts.length === 0) {
    return null;
  }

  return (
    <section
      id="journal"
      className="bg-white pb-16 pt-16 sm:pb-20 sm:pt-20 lg:pb-28 lg:pt-28"
    >
      <div className="mx-auto w-full max-w-[1440px]">
        <div className="mb-6 flex items-center gap-3 px-5 sm:mb-8 sm:px-8 lg:px-12">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-[11px] font-semibold text-white sm:h-7 sm:w-7 sm:text-[12px]">
            {JOURNAL.number}
          </span>
          <span className="rounded-full border border-gray-200 px-3 py-1 text-[12px] font-medium text-gray-900 sm:px-4 sm:py-1.5 sm:text-[13px]">
            {JOURNAL.label}
          </span>
        </div>
        <div className="mb-10 flex items-end justify-between gap-6 px-5 sm:mb-14 sm:px-8 lg:mb-16 lg:px-12">
          <h2 className="text-[clamp(1.75rem,7vw,4.2rem)] font-medium leading-[1.08] tracking-[-0.03em] text-gray-900 sm:text-[clamp(2.5rem,5vw,4.2rem)]">
            {JOURNAL.heading}
          </h2>
          <Link
            href="/journal"
            className="hidden text-[14px] text-gray-600 transition-colors duration-300 hover:text-gray-900 sm:block"
          >
            View all notes
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-5 px-5 sm:gap-6 sm:px-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-7 lg:px-12">
          {posts.map((post) => (
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
                <h3 className="mt-1 text-[15px] font-semibold text-gray-900 transition-colors duration-300 group-hover:text-gray-500">
                  {post.title}
                </h3>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
