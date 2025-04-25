import { Hero } from "./components/hero";
import { Cases } from "./components/cases";
import { Features } from "./components/features";
import { Stats } from "./components/stats";
import { Testimonials } from "./components/testimonials";
import { FAQ } from "./components/faq";
import { CTA } from "./components/cta";

export default function Home() {
  return (
    <main className="container px-2 lg:px-0 min-h-screen mx-auto">
      <Hero />
      <Cases />
      <Features />
      <Stats />
      <Testimonials />
      <FAQ />
      <CTA />
    </main>
  );
}
