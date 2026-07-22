"use client";

import { useState, useEffect, useRef } from "react";
import { Check, Star } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  "Push Back VIP Seats",
  "Ambient Gold LED Lighting System",
  "Advanced Climate Control & AC",
  "Spacious Under-Bus Luggage Hold",
  "Professional Uniformed Driver & Helper",
  "On-Board First Aid & Safety Kits",
];

const BusIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M8 6v6"/>
    <path d="M16 6v6"/>
    <rect x="2" y="12" width="20" height="8" rx="2"/>
    <path d="M4 12V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v6"/>
    <circle cx="6" cy="20" r="1.5"/>
    <circle cx="18" cy="20" r="1.5"/>
  </svg>
);

export default function Fleet() {
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch((err) => {
        console.log("Fleet video autoplay failed:", err);
      });
    }
  }, []);

  return (
    <section id="fleet" className="py-16 md:py-32 bg-[#0A0A0A] border-b border-white/5 relative overflow-hidden">
      {/* Soft ambient background glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-gold/[0.015] rounded-full filter blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-12 h-[1px] bg-gold" />
              <span className="text-xs font-bold text-gold tracking-[0.3em] uppercase">The Fleet</span>
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-4xl md:text-5xl text-white tracking-wider">
              Our Luxury Coach
            </h2>
          </div>
          <p className="font-sans text-secondary max-w-md text-xs sm:text-base mt-4 md:mt-0 leading-relaxed">
            A single, meticulously maintained premium coach dedicated to delivering safe and high-class group transportation.
          </p>
        </div>

        {/* Fleet Details Layout */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-stretch">
          {/* Left Column: Image Container / Placeholder */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <motion.div
              initial={isMobile ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              animate={isMobile ? { opacity: 1, scale: 1 } : undefined}
              whileInView={isMobile ? undefined : { opacity: 1, scale: 1 }}
              viewport={isMobile ? undefined : { once: true }}
              transition={{ duration: isMobile ? 0.5 : 0.8 }}
              className="relative aspect-video w-full max-w-[340px] sm:max-w-none mx-auto rounded-3xl overflow-hidden border border-gold/30 hover:border-gold/50 shadow-[0_0_30px_rgba(200,168,78,0.15)] hover:shadow-[0_0_40px_rgba(200,168,78,0.3)] group bg-black transition-all duration-500"
            >
              {/* Premium Glassmorphic Badge */}
              <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#151515]/80 backdrop-blur-md border border-gold/35 text-gold font-sans font-bold text-[10px] tracking-widest uppercase shadow-lg">
                <BusIcon className="text-gold" />
                <span>Premium Fleet</span>
              </div>

              {/* Light Sweep Reflection Overlay */}
              <div className="light-sweep" />

              {/* Featured Drone Video */}
              <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                controls={false}
                disablePictureInPicture={true}
                controlsList="nodownload nofullscreen noremoteplayback"
                preload="auto"
                className="w-full h-full object-cover scale-100 group-hover:scale-[1.02] transition-transform duration-700 no-controls pointer-events-none"
                suppressHydrationWarning
              >
                <source src="/gallery/all/video-01.mp4" type="video/mp4" />
              </video>
              
              {/* Subtle Black Overlay (25–30% opacity) */}
              <div className="absolute inset-0 bg-black/28 pointer-events-none group-hover:bg-black/18 transition-colors duration-500" />
            </motion.div>
          </div>

          {/* Right Column: Fleet Specs & Features */}
          <div className="lg:col-span-5 flex flex-col justify-between p-2">
            <motion.div
              initial={isMobile ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              animate={isMobile ? { opacity: 1, x: 0 } : undefined}
              whileInView={isMobile ? undefined : { opacity: 1, x: 0 }}
              viewport={isMobile ? undefined : { once: true }}
              transition={{ duration: isMobile ? 0.5 : 0.8, delay: isMobile ? 0.05 : 0.1 }}
            >
              <div className="flex items-center gap-2 mb-4 text-gold">
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="text-[9px] sm:text-xs font-bold tracking-widest text-white/60 ml-2">FIRST CLASS SPECIFICATIONS</span>
              </div>
              
              <h3 className="font-display text-lg sm:text-3xl font-bold text-white mb-3 sm:mb-4 tracking-wide">
                The Ultimate Travel Standard
              </h3>
              
              <p className="font-sans text-[11px] sm:text-base text-secondary leading-relaxed md:leading-[1.85] mb-5 sm:mb-8">
                Our premium coach is maintained to deliver a safe, clean and comfortable travel experience. Perfect for weddings, corporate events, educational trips and long-distance journeys. We enforce rigorous safety standards and vehicle maintenance checks before every departure.
              </p>

              {/* Specs bullet grid - Perfect vertical alignments */}
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2.5 sm:gap-y-5 mb-5 sm:mb-8">
                {features.map((feat) => (
                  <div key={feat} className="flex items-center gap-3.5">
                    <div className="w-4 h-4 sm:w-5 h-5 rounded-full bg-gold/10 border border-gold/25 flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5 sm:w-3 h-3 text-gold" />
                    </div>
                    <span className="font-sans text-[10px] sm:text-sm text-secondary/90 leading-tight">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Check Availability CTA */}
            <motion.div
              initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              animate={isMobile ? { opacity: 1, y: 0 } : undefined}
              whileInView={isMobile ? undefined : { opacity: 1, y: 0 }}
              viewport={isMobile ? undefined : { once: true }}
              transition={{ duration: isMobile ? 0.45 : 0.6, delay: isMobile ? 0.08 : 0.2 }}
              className="mt-4 sm:mt-6"
            >
              <motion.a
                href="#contact"
                whileHover={isMobile ? undefined : { scale: 1.025, y: -2 }}
                whileTap={isMobile ? undefined : { scale: 0.97 }}
                className="inline-block text-center w-full sm:w-auto font-sans font-bold text-xs sm:text-sm tracking-wider text-black bg-gold hover:bg-gold-hover px-6 py-3 sm:px-10 sm:py-4 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(200,168,78,0.2)] hover:shadow-[0_0_35px_rgba(200,168,78,0.45)] cursor-pointer"
              >
                Check Availability & Rates
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Subtle gold bottom divider */}
      <div className="absolute bottom-0 left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-gold/15 to-transparent" />
    </section>
  );
}
