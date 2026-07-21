"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/site";

const navLinks = [
  { name: "Home", href: "/#home" },
  { name: "About", href: "/#about" },
  { name: "Services", href: "/#services" },
  { name: "Fleet", href: "/#fleet" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const pathname = usePathname();

  const isLinkActive = (href: string) => {
    if (pathname === "/gallery") {
      return href === "/gallery";
    }
    if (href === "/gallery") {
      return false;
    }
    const sectionId = href.replace("/#", "").replace("#", "");
    return activeSection === sectionId;
  };

  useEffect(() => {
    const handleScroll = () => {
      // 1. Scroll check for header background blur
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // 2. Active Section Spy
      const sections = ["home", "about", "services", "fleet", "contact"];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const primaryPhone = siteConfig.phones[0];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-[#0A0A0A]/85 backdrop-blur-md border-b border-white/5 py-4 shadow-lg"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/#home" 
            className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold focus-visible:ring-offset-2 rounded-xl"
            aria-label="PK Travels Home"
          >
            <div className="relative w-12 h-12 overflow-hidden rounded-full border border-white/10 group-hover:border-gold transition-colors duration-300">
              <Image
                src="/assets/logo/logo.png"
                alt={`${siteConfig.businessName} Logo`}
                fill
                className="object-cover scale-110 group-hover:scale-125 transition-transform duration-500"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg tracking-wider text-white group-hover:text-gold transition-colors duration-300">
                {siteConfig.businessName.toUpperCase()}
              </span>
              <span className="text-[10px] text-gold tracking-[0.2em] font-sans">
                {siteConfig.tagline.toUpperCase()}
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = isLinkActive(link.href);
              
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`font-sans text-sm tracking-wide transition-colors duration-300 relative py-2 group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold rounded px-1.5 drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)] ${
                    isActive ? "text-gold font-semibold" : "text-white/85 hover:text-white font-medium"
                  }`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-0 h-[1.5px] bg-gold transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`} />
                </Link>
              );
            })}
          </div>

          {/* Call Now CTA Button */}
          <div className="hidden lg:flex items-center">
            <a
              href={`tel:${primaryPhone.raw}`}
              className="flex items-center gap-2 font-sans text-sm font-semibold tracking-wide text-white border border-gold/40 hover:border-gold px-6 py-2.5 rounded-full hover:bg-gold hover:text-black transition-all duration-300 ease-out shadow-[0_0_15px_rgba(200,168,78,0.1)] hover:shadow-[0_0_20px_rgba(200,168,78,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              aria-label={`Call PK Travels Chauffeur Support Desk at ${primaryPhone.display}`}
            >
              <Phone className="w-4 h-4" />
              Call Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-white hover:text-gold transition-colors duration-300 p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-lg"
            aria-label={isMobileMenuOpen ? "Close main navigation menu" : "Open main navigation menu"}
          >
            {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-[80px] z-40 bg-[#0A0A0A]/98 backdrop-blur-xl border-t border-white/5 flex flex-col justify-between p-8 lg:hidden"
          >
            <div className="flex flex-col gap-6 mt-8">
              {navLinks.map((link, idx) => (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={link.name}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`font-display text-2xl font-medium block w-full py-2 hover:text-gold transition-colors ${
                      isLinkActive(link.href) ? "text-gold" : "text-white"
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col gap-4 mb-16"
            >
              <a
                href={`tel:${primaryPhone.raw}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 font-sans font-bold text-black bg-gold hover:bg-gold-hover px-8 py-4 rounded-full transition-all duration-300"
                aria-label={`Call Support Chauffeur at ${primaryPhone.display}`}
              >
                <Phone className="w-5 h-5" />
                Call Now
              </a>
              <p className="text-center text-xs text-secondary tracking-widest mt-4">
                {siteConfig.businessName.toUpperCase()} • DELHI NCR
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
