import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { QuickExplainer } from "../components/QuickExplainer";
import { WhyUs } from "../components/WhyUs";
import { Features } from "../components/Features";
import { ModelsAndMethods } from "../components/ModelsAndMethods";
import { Pricing } from "../components/Pricing";
import { Contact } from "../components/Contact";
import { Trust } from "../components/Trust";
import { Footer } from "../components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <QuickExplainer />
      {/* <WhyUs /> */}
      {/* <Features /> */}
      <ModelsAndMethods />
      <Pricing />
      <Contact />
      {/* <Trust /> */}
      <Footer />
    </main>
  );
}
