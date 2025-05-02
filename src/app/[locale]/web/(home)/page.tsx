import { Hero } from "./components/hero";
import { Works } from "./components/works";
import { FAQ } from "./components/faq";
import { Services } from "./components/services";
import Send from "./components/send";

export default function Home() {
  return (
    <main className="w-full lg:px-0 min-h-screen mx-auto">
      <Hero />
      <Works />
      <Services />
      <Send />
      <FAQ />
    </main>
  );
}
