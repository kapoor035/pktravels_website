import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import InfluencerFloatingCard from "@/components/InfluencerFloatingCard";
import About from "@/components/About";
import Services from "@/components/Services";
import Fleet from "@/components/Fleet";
import Gallery from "@/components/Gallery";
import WhyChooseUs from "@/components/WhyChooseUs";
import Reviews from "@/components/Reviews";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import MobileQuickActions from "@/components/MobileQuickActions";

export default function Home() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://pktraveldelhi.com"
      }
    ]
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0A0A0A] font-sans antialiased text-white select-none">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <BackToTop />
      <MobileQuickActions />
      {/* Navbar */}
      <Navbar />

      {/* Main Single Page Layout */}
      <main className="flex-1 w-full">
        {/* Cinematic Hero video section */}
        <Hero />

        {/* Floating picture-in-picture Influencer Card */}
        <InfluencerFloatingCard />

        {/* Minimalist about confidence statement */}
        <About />

        {/* Custom 3-column offerings section */}
        <Services />

        {/* Single premium vehicle details */}
        <Fleet />

        {/* Grid visual journey highlights (Preview Mode) */}
        <Gallery preview={true} />

        {/* Core values list */}
        <WhyChooseUs />

        {/* Dynamic customer feedback slider */}
        <Reviews />

        {/* Embedded map & Quote application */}
        <Contact />
      </main>

      {/* Corporate signature links */}
      <Footer />
    </div>
  );
}
