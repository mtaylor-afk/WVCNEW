import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import Testimonials from "@/components/Testimonials";
import Process from "@/components/Process";
import QuoteForm from "@/components/QuoteForm";
import Footer from "@/components/Footer";

export default function MarketingPage() {
  return (
    <div className="marketing-page bg-white overflow-x-hidden">
      <Navbar />
      <main id="main-content">
      <Hero />
      <Services />
      <WhyUs />
      <Testimonials />
      <Process />
      <QuoteForm />
      </main>
      <Footer />
    </div>
  );
}
