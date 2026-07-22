"use client";
 
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, CheckCircle, Phone, Calendar } from "lucide-react";
import { siteConfig } from "@/config/site";
 
export default function Hero() {
  const [videoLoaded, setVideoLoaded] = useState(false);
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
        console.log("Hero video autoplay fallback failed:", err);
      });
    }
  }, []);
 
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0.08 : 0.15,
        delayChildren: 0.2,
      },
    },
  };
 
  const itemVariants = {
    hidden: { opacity: 0, y: isMobile ? 12 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: isMobile ? 0.45 : 0.8, 
        ease: [0.16, 1, 0.3, 1] as const 
      },
    },
  };
 
  const primaryPhone = siteConfig.phones[0];
 
  return (
    <section id="home" className="relative w-full h-[100dvh] sm:h-screen overflow-hidden flex items-center justify-center bg-[#0A0A0A]">
      {/* Background Drone Video with smooth loaded fade-in */}
      <motion.video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        webkit-playsinline="true"
        controls={false}
        disablePictureInPicture
        controlsList="nodownload nofullscreen noremoteplayback"
        preload="auto"
        onLoadedData={() => setVideoLoaded(true)}
        initial={{ opacity: 0 }}
        animate={{ opacity: videoLoaded ? 1 : 0 }}
        transition={{ duration: 1 }}
        className="absolute top-0 left-0 w-full h-full object-cover z-0 no-controls"
      >
        <source src="/assets/hero/drone.mp4" type="video/mp4" />
      </motion.video>

      {/* Loader visual behind video to prevent layouts popping */}
      <AnimatePresence>
        {!videoLoaded && (
          <div className="absolute inset-0 bg-[#0A0A0A] flex items-center justify-center z-[1] skeleton-shimmer" />
        )}
      </AnimatePresence>

      {/* Luxury Subtle Overlay (Navbar protection + Section transition only, center remains clear) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/15 to-[#0A0A0A] z-10" />

      {/* Hero Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 text-center flex flex-col items-center justify-center h-full pt-12 sm:pt-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          viewport={{ once: true }}
          className="flex flex-col items-center"
        >
          {/* Luxury Badge */}
          <motion.div
            variants={itemVariants}
            className="mb-4 sm:mb-6 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full glass-effect border border-gold/30 text-gold text-[10px] sm:text-xs font-semibold tracking-[0.2em] sm:tracking-[0.25em] uppercase"
          >
            Trusted Bus Rental Service in Delhi NCR
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="font-display font-bold text-3xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-tight leading-[1.1] sm:leading-[1.05] mb-4 sm:mb-6"
          >
            Luxury Bus Rental <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F3E3B6] to-gold">
              For Every Journey
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="font-sans text-white/90 max-w-2xl text-xs sm:text-lg md:text-xl leading-relaxed mb-6 sm:mb-10 text-pretty px-2 sm:px-0 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] font-medium"
          >
            Premium luxury coaches for weddings, corporate travel, school trips and outstation journeys. Professional drivers. Comfortable seating. Reliable service. Available across Delhi NCR.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-6 sm:mb-12 w-full sm:w-auto px-4 sm:px-0"
          >
            {/* Get a Free Quote */}
            <motion.a
              href="#contact"
              whileHover={isMobile ? undefined : { scale: 1.03, y: -2 }}
              whileTap={isMobile ? undefined : { scale: 0.98 }}
              className="flex items-center justify-center gap-2 w-full sm:w-auto font-sans font-bold text-sm tracking-wider text-black bg-gold hover:bg-gold-hover px-8 py-3.5 sm:py-4 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(200,168,78,0.25)] hover:shadow-[0_0_30px_rgba(200,168,78,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              <Calendar className="w-4 h-4" />
              Get a Free Quote
            </motion.a>
            {/* Call Now */}
            <motion.a
              href={`tel:${primaryPhone.raw}`}
              whileHover={isMobile ? undefined : { scale: 1.03, y: -2 }}
              whileTap={isMobile ? undefined : { scale: 0.98 }}
              className="flex items-center justify-center gap-2 w-full sm:w-auto font-sans font-semibold text-sm tracking-wider text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-gold/40 px-8 py-3.5 sm:py-4 rounded-full transition-all duration-300 backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              <Phone className="w-4 h-4 text-gold" />
              Call Now
            </motion.a>
          </motion.div>

          {/* Key Value Propositions */}
          <motion.div
            variants={itemVariants}
            className="hidden sm:flex items-center justify-center gap-8 text-sm text-secondary/90 border-t border-white/5 pt-8 w-full max-w-2xl"
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-gold shrink-0" />
              <span>Premium Luxury Coach</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-gold shrink-0" />
              <span>Professional Drivers</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-gold shrink-0" />
              <span>Delhi NCR Service</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scrolling Indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center cursor-pointer bg-transparent border-0 outline-none focus-visible:outline-none"
        onClick={() => {
          const nextSec = document.getElementById("about");
          nextSec?.scrollIntoView({ behavior: "smooth" });
        }}
        aria-label="Scroll down to who we are section"
      >
        <span className="text-[10px] text-secondary tracking-[0.3em] uppercase mb-2">Scroll</span>
        <motion.div
          animate={isMobile ? { y: 0 } : { y: [0, 8, 0] }}
          transition={isMobile ? { duration: 0.2 } : { duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-6 h-6 text-gold" />
        </motion.div>
      </motion.button>
    </section>
  );
}
