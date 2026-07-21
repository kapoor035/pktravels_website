"use client";

import { useState, useEffect } from "react";
import { Phone, MessageSquare, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/site";

export default function MobileQuickActions() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Fade/slide in when scrolled past 250px
      if (window.scrollY > 250) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const primaryPhone = siteConfig.phones[0];
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=PK+Travels%2C+Plot+No.+484%2C+Sector+19%2C+Dwarka%2C+New+Delhi%2C+Delhi+110075`;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-0 left-0 w-full z-40 lg:hidden px-4 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-3 bg-[#0A0A0A]/95 backdrop-blur-lg border-t border-gold/20 rounded-t-3xl shadow-[0_-10px_35px_rgba(0,0,0,0.7)] flex items-center justify-between gap-3"
        >
          {/* Call button */}
          <a
            href={`tel:${primaryPhone.raw}`}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-white/5 border border-white/10 text-white font-sans font-bold text-xs uppercase tracking-wider active:bg-white/15 active:scale-[0.98] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            aria-label={`Call PK Travels Support desk at ${primaryPhone.display}`}
          >
            <Phone className="w-4 h-4 text-gold shrink-0" />
            <span>Call Now</span>
          </a>

          {/* WhatsApp button */}
          <a
            href={`https://wa.me/${siteConfig.whatsapp.number}?text=${encodeURIComponent(siteConfig.whatsapp.defaultText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-gold text-black font-sans font-bold text-xs uppercase tracking-wider active:bg-gold-hover active:scale-[0.98] transition-all shadow-[0_0_15px_rgba(200,168,78,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Chat with PK Travels on WhatsApp"
          >
            <MessageSquare className="w-4 h-4 shrink-0 fill-current" />
            <span>WhatsApp</span>
          </a>

          {/* Directions button */}
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-white/5 border border-white/10 text-white font-sans font-bold text-xs uppercase tracking-wider active:bg-white/15 active:scale-[0.98] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            aria-label="Get directions to PK Travels office on Google Maps"
          >
            <MapPin className="w-4 h-4 text-gold shrink-0" />
            <span>Directions</span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
