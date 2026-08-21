import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { getJournalEntry, JOURNAL, PROJECT_NAME } from "@/lib/project";

type JournalPostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return JOURNAL.items.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: JournalPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getJournalEntry(slug);

  if (!post) {
    return { title: `Journal — ${PROJECT_NAME}` };
  }

  return {
    title: `${post.title} — ${PROJECT_NAME}`,
    description: post.excerpt || post.title,
  };
}

export default async function JournalPostPage({ params }: JournalPostPageProps) {
  const { slug } = await params;
  const post = getJournalEntry(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="flex min-h-dvh flex-col bg-white">
      <Header />
      <main className="mx-auto w-full max-w-[800px] flex-1 px-5 py-16 sm:px-8 sm:py-20">
        <Link
          href="/journal"
          className="text-[14px] text-gray-600 transition-colors duration-300 hover:text-gray-900"
        >
          Back to journal
        </Link>
        <h1 className="mt-8 text-[clamp(1.75rem,5vw,3.25rem)] font-medium leading-[1.1] tracking-[-0.03em] text-gray-900">
          {post.title}
        </h1>
        {post.excerpt ? (
          <p className="mt-4 text-[18px] leading-[1.6] text-gray-600">
            {post.excerpt}
          </p>
        ) : null}
        {post.featuredImage ? (
          <img
            src={post.featuredImage}
            alt=""
            className="mt-10 w-full rounded-2xl object-cover"
          />
        ) : null}
        <div className="mt-10 text-[17px] leading-[1.75] text-gray-800">
          {post.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mb-5">
              {paragraph}
            </p>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
