"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, ArrowUp, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";

const Instagram = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Linkedin = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };



  return (
    <footer className="bg-[#050505] border-t border-white/5 py-6 md:py-16 text-secondary relative overflow-hidden">
      {/* Subtle top decoration */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 items-start mb-6 md:mb-12">
          {/* Brand Info */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <Link 
              href="/#home" 
              className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold rounded-xl w-fit"
              aria-label="PK Travels Home"
            >
              <div className="relative w-10 h-10 overflow-hidden rounded-full border border-white/10 group-hover:border-gold transition-colors duration-300">
                <Image
                  src="/assets/logo/logo.png"
                  alt={`${siteConfig.businessName} Logo`}
                  fill
                  sizes="40px"
                  className="object-cover scale-110"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-base tracking-wider text-white group-hover:text-gold transition-colors">
                  {siteConfig.businessName.toUpperCase()}
                </span>
                <span className="text-[9px] text-gold tracking-[0.2em] font-sans">
                  {siteConfig.tagline.toUpperCase()}
                </span>
              </div>
            </Link>
            
            <p className="font-sans text-xs sm:text-sm text-secondary/80 leading-relaxed max-w-sm hidden sm:block">
              Providing premium group travel arrangements across New Delhi, Gurugram, Noida, and NCR. Specializing in luxury transportation for weddings, corporate charters, outstations, and events.
            </p>

            {/* Social Icons row - Hidden on Mobile */}
            <div className="hidden md:flex items-center gap-4 mt-2">
              <motion.a
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-full border border-white/10 hover:border-gold/40 flex items-center justify-center bg-white/5 text-white hover:text-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                aria-label="Follow PK Travels on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </motion.a>
              <motion.a
                href={`https://wa.me/${siteConfig.whatsapp.number}?text=${encodeURIComponent(siteConfig.whatsapp.defaultText)}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-full border border-white/10 hover:border-gold/40 flex items-center justify-center bg-white/5 text-white hover:text-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                aria-label="Chat with PK Travels on WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/company/pk-travels-delhi/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-full border border-white/10 hover:border-gold/40 flex items-center justify-center bg-white/5 text-white hover:text-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                aria-label="Follow PK Travels on LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </motion.a>
            </div>
          </div>

          {/* Quick Links - HIdden on Mobile */}
          <div className="hidden md:flex lg:col-span-3 flex-col gap-4">
            <h4 className="font-display text-sm font-bold text-white tracking-widest uppercase">
              Quick Navigation
            </h4>
            <div className="flex flex-col gap-2.5 text-xs sm:text-sm">
              <Link href="/#home" className="hover:text-gold transition-colors w-fit focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold px-1 rounded">Home</Link>
              <Link href="/#about" className="hover:text-gold transition-colors w-fit focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold px-1 rounded">About Confidence</Link>
              <Link href="/#services" className="hover:text-gold transition-colors w-fit focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold px-1 rounded">Bespoke Services</Link>
              <Link href="/#fleet" className="hover:text-gold transition-colors w-fit focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold px-1 rounded">Luxury Fleet</Link>
              <Link href="/gallery" className="hover:text-gold transition-colors w-fit focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold px-1 rounded">Visual Highlights</Link>
              <Link href="/#contact" className="hover:text-gold transition-colors w-fit focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold px-1 rounded">Enquire Booking</Link>
            </div>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <h4 className="font-display text-sm font-bold text-white tracking-widest uppercase">
              Contact Desk
            </h4>
            <div className="flex flex-col gap-3.5 text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span className="text-secondary/80 leading-snug">
                  {siteConfig.address.line1}, {siteConfig.address.line2}, {siteConfig.address.line3}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <div className="flex flex-wrap gap-1.5 items-center">
                  <a href={`tel:${siteConfig.phones[0].raw}`} className="hover:text-gold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold px-1 rounded">
                    {siteConfig.phones[0].display}
                  </a>
                  <span className="text-secondary/50">,</span>
                  <a href={`tel:${siteConfig.phones[1].raw}`} className="hover:text-gold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold px-1 rounded">
                    {siteConfig.phones[1].display}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-gold transition-colors break-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold px-1 rounded">{siteConfig.email}</a>
              </div>
              <div className="flex items-center gap-3">
                <Instagram className="w-4 h-4 text-gold shrink-0" />
                <a href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Follow PK Travels on Instagram" className="hover:text-gold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold px-1 rounded">
                  Instagram Profile
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Linkedin className="w-4 h-4 text-gold shrink-0" />
                <a href="https://www.linkedin.com/company/pk-travels-delhi/" target="_blank" rel="noopener noreferrer" aria-label="Follow PK Travels on LinkedIn" className="hover:text-gold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold px-1 rounded">
                  LinkedIn Profile
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Divider */}
        <div className="w-full h-[1px] bg-white/5 my-4 md:my-8" />

        {/* Copyright and Top Trigger */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-secondary/60">
          <p>© {new Date().getFullYear()} {siteConfig.businessName}. All rights reserved. Designed for Premium Comfort.</p>
          
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:text-gold transition-colors border border-white/5 hover:border-gold/30 rounded-full px-4 py-2 bg-[#151515] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            aria-label="Scroll to top of the page"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
