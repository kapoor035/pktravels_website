"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Shield, Award, Sparkles, Clock } from "lucide-react";

const pillars = [
  {
    icon: Shield,
    title: "Safe Travel",
    desc: "Rigorous safety checks, GPS tracking, and top-tier security standards for absolute peace of mind.",
    num: "01",
  },
  {
    icon: Award,
    title: "Professional Service",
    desc: "Highly trained, certified drivers and a dedicated support team ensuring hospitality-grade service.",
    num: "02",
  },
  {
    icon: Sparkles,
    title: "Comfortable Journeys",
    desc: "Premium reclining leather seats, pristine interiors, air conditioning, and luxury amenities.",
    num: "03",
  },
  {
    icon: Clock,
    title: "Reliable Transportation",
    desc: "Punctuality is our trademark. Precise coordination and route optimization for seamless schedules.",
    num: "04",
  },
];

export default function About() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section id="about" className="py-16 md:py-32 bg-[#0A0A0A] border-b border-white/5 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-gold/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header Grid */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-20 items-start mb-12 sm:mb-20">
          {/* Section title */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: isMobile ? -10 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: isMobile ? 0.45 : 0.6 }}
              className="flex items-center gap-3 mb-4"
            >
              <span className="w-12 h-[1px] bg-gold" />
              <span className="text-xs font-bold text-gold tracking-[0.3em] uppercase">Who We Are</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: isMobile ? 10 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: isMobile ? 0.5 : 0.8, delay: isMobile ? 0.05 : 0.1 }}
              className="font-display font-bold text-2xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight"
            >
              Travel With Confidence
            </motion.h2>
          </div>

          {/* Description */}
          <div className="lg:col-span-7 mt-2 lg:mt-6">
            <motion.p
              initial={{ opacity: 0, y: isMobile ? 10 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: isMobile ? 0.5 : 0.8, delay: isMobile ? 0.08 : 0.2 }}
              className="font-sans text-secondary text-sm sm:text-base md:text-lg leading-relaxed md:leading-[1.8] text-left md:text-justify px-1 sm:px-0"
            >
              PK Travels provides premium luxury bus rental services across Delhi NCR. 
              Whether you are planning an elegant wedding, a high-profile corporate event, 
              an educational trip, or an outstation journey, our focus remains unchanged: 
              providing safe travel, professional service, comfortable journeys, and reliable transportation. 
              We bring first-class hospitality to the road.
            </motion.p>
          </div>
        </div>

        {/* Pillars Grid - 2 columns on mobile, sm:grid-cols-2, lg:grid-cols-4 on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: isMobile ? 12 : 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: isMobile ? 0.45 : 0.6, delay: isMobile ? idx * 0.05 : idx * 0.1 }}
                className="group relative p-3.5 sm:p-8 rounded-2xl glass-effect glass-effect-hover transition-all duration-500 flex flex-col justify-between h-48 sm:h-72"
              >
                {/* Background number */}
                <div className="absolute top-4 right-4 sm:top-6 sm:right-8 font-display text-2xl sm:text-4xl font-extrabold text-white/[0.03] group-hover:text-gold/[0.06] transition-colors duration-500 select-none">
                  {pillar.num}
                </div>

                <div>
                  <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:text-gold group-hover:border-gold/30 transition-all duration-500 mb-3 sm:mb-6">
                    <Icon className="w-4 h-4 sm:w-6 sm:h-6" />
                  </div>
                  <h3 className="font-display text-xs sm:text-xl font-bold text-white mb-1.5 sm:mb-3 group-hover:text-gold transition-colors duration-300">
                    {pillar.title}
                  </h3>
                  <p className="font-sans text-[10px] sm:text-sm text-secondary leading-normal sm:leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
