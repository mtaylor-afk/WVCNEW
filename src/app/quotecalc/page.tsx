import QCNavbar from "@/components/quotecalc/QCNavbar";
import QCHero from "@/components/quotecalc/QCHero";
import QCStatsBar from "@/components/quotecalc/QCStatsBar";
import QCPainPoints from "@/components/quotecalc/QCPainPoints";
import QCHowItWorks from "@/components/quotecalc/QCHowItWorks";
import QCFeatures from "@/components/quotecalc/QCFeatures";
import QCVisualProposal from "@/components/quotecalc/QCVisualProposal";
import QCTestimonials from "@/components/quotecalc/QCTestimonials";
import QCPricing from "@/components/quotecalc/QCPricing";
import QCFAQ from "@/components/quotecalc/QCFAQ";
import QCCTA from "@/components/quotecalc/QCCTA";
import QCFooter from "@/components/quotecalc/QCFooter";

export default function QuoteCalcPage() {
  return (
    <div className="quotecalc-page">
      <a href="#qc-main" className="skip-link">
        Skip to main content
      </a>
      <QCNavbar />
      <main id="qc-main">
        <QCHero />
        <QCStatsBar />
        <QCPainPoints />
        <QCHowItWorks />
        <QCFeatures />
        <QCVisualProposal />
        <QCTestimonials />
        <QCPricing />
        <QCFAQ />
        <QCCTA />
      </main>
      <QCFooter />
    </div>
  );
}
