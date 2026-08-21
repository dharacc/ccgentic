import Link from "next/link";
import { ArrowRightIcon, LinkIcon } from "@/components/icons";
import { PROJECTS } from "@/lib/project";

type ProjectItem = (typeof PROJECTS.items)[number];

function ProjectCard({ item }: { item: ProjectItem }) {
  const isLight = item.tone === "light";

  return (
    <article>
      <Link
        href={item.href}
        className={`group relative block aspect-[4/3] overflow-hidden rounded-2xl ${
          isLight ? "bg-[#1a1d2e]" : "bg-[#6b6b6b]"
        }`}
      >
        <video
          src={item.media}
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
        />
        <span className="absolute bottom-4 start-4">
          <span
            className={`flex h-9 w-9 items-center overflow-hidden rounded-full transition-all duration-300 ease-in-out group-hover:w-[168px] ${
              isLight ? "bg-white group-hover:w-[148px]" : "bg-gray-900"
            }`}
          >
            <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center">
              {isLight ? (
                <LinkIcon className="h-[14px] w-[14px] -rotate-45 text-gray-900 transition-transform duration-300 group-hover:rotate-0" />
              ) : (
                <ArrowRightIcon className="-rotate-45 text-white transition-transform duration-300 group-hover:rotate-0" />
              )}
            </span>
            <span
              className={`whitespace-nowrap text-[13px] font-medium opacity-0 transition-opacity delay-100 duration-300 group-hover:opacity-100 ${
                isLight ? "text-gray-900" : "text-white"
              }`}
            >
              {item.action}
            </span>
          </span>
        </span>
      </Link>
      <p className="mt-4 text-[13px] leading-relaxed text-gray-600 sm:text-[14px]">
        {item.summary}
      </p>
      <h3 className="mt-1 text-[14px] font-semibold text-gray-900 sm:text-[15px]">
        {item.name}
      </h3>
    </article>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="bg-[#F5F5F5] pb-16 pt-16 sm:pb-20 sm:pt-20 lg:pb-28 lg:pt-28"
    >
      <div className="mx-auto w-full max-w-[1440px]">
        <div className="mb-6 flex items-center gap-3 px-5 sm:mb-8 sm:px-8 lg:px-12">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-[11px] font-semibold text-white sm:h-7 sm:w-7 sm:text-[12px]">
            {PROJECTS.number}
          </span>
          <span className="rounded-full border border-gray-300 px-3 py-1 text-[12px] font-medium text-gray-900 sm:px-4 sm:py-1.5 sm:text-[13px]">
            {PROJECTS.label}
          </span>
        </div>
        <h2 className="mb-10 px-5 text-[clamp(1.75rem,7vw,4.2rem)] font-medium leading-[1.08] tracking-[-0.03em] text-gray-900 sm:mb-14 sm:px-8 sm:text-[clamp(2.5rem,5vw,4.2rem)] lg:mb-16 lg:px-12">
          {PROJECTS.heading}
        </h2>
        <div className="grid grid-cols-1 gap-5 px-5 sm:gap-6 sm:px-8 md:grid-cols-2 lg:gap-7 lg:px-12">
          {PROJECTS.items.map((item) => (
            <ProjectCard key={item.name} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
