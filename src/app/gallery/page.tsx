import Navbar from "@/components/Navbar";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import MobileQuickActions from "@/components/MobileQuickActions";

export default function GalleryPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0A0A0A] font-sans antialiased text-white select-none">
      <BackToTop />
      <MobileQuickActions />
      {/* Sticky blurred Navbar */}
      <Navbar />

      {/* Main Container */}
      <main className="flex-1 w-full pt-20">
        {/* Full Interactive Masonry Gallery */}
        <Gallery preview={false} />

        {/* Dynamic Contact / Quote booking form */}
        <Contact />
      </main>

      {/* Standard bottom footer links */}
      <Footer />
    </div>
  );
}
