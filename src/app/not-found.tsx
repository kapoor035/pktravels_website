"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0A0A0A] text-white px-6 relative overflow-hidden select-none">
      {/* Subtle gold glow behind */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="relative z-10 text-center flex flex-col items-center max-w-md">
        {/* Animated Compass Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -45 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-20 h-20 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center text-gold mb-8 shadow-[0_0_20px_rgba(200,168,78,0.15)]"
        >
          <Compass className="w-10 h-10 stroke-[1.5]" />
        </motion.div>

        {/* 404 Title */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display font-bold text-7xl md:text-8xl text-white tracking-tight leading-none mb-4"
        >
          404
        </motion.h1>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-display font-bold text-xl sm:text-2xl text-gold tracking-wide mb-4"
        >
          Route Not Discovered
        </motion.h2>

        {/* Description text */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-sans text-secondary text-sm sm:text-base leading-relaxed mb-10"
        >
          The luxury charter destination you are trying to reach does not exist. Let us guide you back to our premium fleet page.
        </motion.p>

        {/* Back to Home CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link
            href="/"
            className="flex items-center justify-center gap-2 font-sans font-bold text-sm tracking-wider text-black bg-gold hover:bg-gold-hover px-8 py-4 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(200,168,78,0.15)] hover:shadow-[0_0_30px_rgba(200,168,78,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            aria-label="Return to PK Travels homepage"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
            Back to Home
          </Link>
        </motion.div>
      </div>

      {/* Decorative border frames */}
      <div className="absolute top-8 left-8 w-8 h-8 border-t border-l border-white/5" />
      <div className="absolute top-8 right-8 w-8 h-8 border-t border-r border-white/5" />
      <div className="absolute bottom-8 left-8 w-8 h-8 border-b border-l border-white/5" />
      <div className="absolute bottom-8 right-8 w-8 h-8 border-b border-r border-white/5" />
    </div>
  );
}
