import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import MobileQuickActions from "@/components/MobileQuickActions";

const Gallery = dynamic(() => import("@/components/Gallery"));

export const metadata: Metadata = {
  title: "Luxury Coach Gallery | PK Travel Delhi",
  description: "Explore our premium luxury coach collection through authentic interior and exterior photographs and videos.",
  alternates: {
    canonical: "https://pktravelsdelhi.com/gallery",
  },
};

export default function GalleryPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://pktravelsdelhi.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Gallery",
        "item": "https://pktravelsdelhi.com/gallery"
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
      {/* Sticky blurred Navbar */}
      <Navbar />

      {/* Main Container */}
      <main className="flex-1 w-full pt-20">
        {/* Full Interactive Masonry Gallery */}
        <Gallery preview={false} />
      </main>

      {/* Standard bottom footer links */}
      <Footer />
    </div>
  );
}
