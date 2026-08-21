import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Projects from "@/components/Projects";
import { PROJECT_NAME, PROJECT_TAGLINE } from "@/lib/project";

export const metadata: Metadata = {
  title: PROJECT_NAME,
  description: `${PROJECT_NAME} — ${PROJECT_TAGLINE}`,
};

export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <Projects />
      <Footer />
    </>
  );
}
