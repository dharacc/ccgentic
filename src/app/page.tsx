import type { Metadata } from "next";
import Clientele from "@/components/Clientele";
import ConversationCta from "@/components/ConversationCta";
import EngineeringProcess from "@/components/EngineeringProcess";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Industries from "@/components/Industries";
import Insights from "@/components/Insights";
import ProductOverview from "@/components/ProductOverview";
import WhyAeromatic from "@/components/WhyAeromatic";
import { getHomeContent } from "@/lib/wordpress";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getHomeContent();

  return {
    title: content.name || "Home",
    description: content.tagline || undefined,
  };
}

export default async function Home() {
  const content = await getHomeContent();

  const showHero = content.hero.slides.length > 0;
  const showWhy = content.why.heading !== "" || content.why.items.length > 0;
  const showProducts = content.products.heading !== "" || content.products.cards.length > 0;
  const showIndustries = content.industries.heading !== "" || content.industries.cards.length > 0;
  const showProcess = content.process.heading !== "" || content.process.steps.length > 0;
  const showClientele = content.clientele.heading !== "" || content.clientele.testimonials.length > 0;
  const showInsights = content.insights.heading !== "" || content.insights.cards.length > 0;
  const showConversation = content.conversation.heading !== "";
  const hasPageContent =
    showHero ||
    showWhy ||
    showProducts ||
    showIndustries ||
    showProcess ||
    showClientele ||
    showInsights ||
    showConversation ||
    content.name !== "" ||
    content.nav.length > 0;

  return (
    <div id="top">
      <Header
        name={content.name}
        legalName={content.legalName}
        logo={content.header.logo}
        nav={content.nav}
        contactHref={content.header.contactCta.href}
        contactLabel={content.header.contactCta.label}
      />
      <main>
        {showHero ? <Hero content={content.hero} /> : null}
        {showWhy ? <WhyAeromatic content={content.why} /> : null}
        {showProducts ? <ProductOverview content={content.products} /> : null}
        {showIndustries ? <Industries content={content.industries} /> : null}
        {showProcess ? <EngineeringProcess content={content.process} /> : null}
        {showClientele ? <Clientele content={content.clientele} /> : null}
        {showInsights ? <Insights content={content.insights} /> : null}
        {showConversation ? <ConversationCta content={content.conversation} /> : null}
        {hasPageContent ? null : (
          <section className="site-shell py-24">
            <p className="text-[18px] leading-[29px] text-muted">Content unavailable.</p>
          </section>
        )}
      </main>
      <Footer content={content.footer} name={content.name} legalName={content.legalName} logo={content.header.logo} />
    </div>
  );
}
