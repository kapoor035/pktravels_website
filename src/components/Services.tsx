"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Briefcase,
  GraduationCap,
  Compass,
  Plane,
  Users,
  Calendar,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    icon: Heart,
    title: "Wedding Transportation",
    description: "Provide your guests with first-class travel. Elegant, comfortable coaches coordinate perfectly with your wedding schedule and venues.",
  },
  {
    icon: Briefcase,
    title: "Corporate Transport",
    description: "Impress business partners and executive teams. Ideal for conferences, company offsites, executive tours, and VIP employee commutes.",
  },
  {
    icon: GraduationCap,
    title: "School & College Trips",
    description: "Safe, secure, and reliable travel options for educational tours, field trips, and sports event movements with professional drivers.",
  },
  {
    icon: Compass,
    title: "Outstation Tours",
    description: "Seamless long-distance journeys across states. Experience the ultimate comfort over highways with reclining seats and ambient lighting.",
  },
  {
    icon: Plane,
    title: "Airport Transfers",
    description: "Stress-free airport pickups and drop-offs for large groups. Generous luggage space and on-time flight-matching coordinates.",
  },
  {
    icon: Users,
    title: "Family Functions",
    description: "Bring the family together in one luxury vehicle. Perfect for anniversaries, pilgrimage tours, weekend getaways, and reunions.",
  },
  {
    icon: Calendar,
    title: "Event Transportation",
    description: "Premium transit solutions for concerts, sports tournaments, premium exhibitions, and high-attendance public gatherings.",
  },
];

export default function Services() {
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
    <section id="services" className="py-16 md:py-32 bg-[#0C0C0C] border-b border-white/5 relative">
      {/* Subtle top shadow gradient */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: isMobile ? 8 : 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: isMobile ? 0.45 : 0.6 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <span className="w-6 h-[1px] bg-gold" />
            <span className="text-xs font-bold text-gold tracking-[0.3em] uppercase">Our Offerings</span>
            <span className="w-6 h-[1px] bg-gold" />
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: isMobile ? 10 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: isMobile ? 0.5 : 0.8, delay: isMobile ? 0.05 : 0.1 }}
            className="font-display font-bold text-2xl sm:text-4xl md:text-5xl text-white tracking-tight mb-4 sm:mb-6"
          >
            Exquisite Travel Solutions
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: isMobile ? 10 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: isMobile ? 0.5 : 0.8, delay: isMobile ? 0.08 : 0.2 }}
            className="font-sans text-secondary text-xs sm:text-lg leading-relaxed"
          >
            Delivering bespoke group travel arrangements with luxury, safety, and comfort at the forefront of every destination.
          </motion.p>
        </div>

        {/* Services Grid - 2 columns on mobile, md:grid-cols-2, lg:grid-cols-3 on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-8">
          {services.map((service, idx) => {
            const Icon = service.icon;
            // The 7th item takes full width on large screens and mobile screens to look balanced
            const isLast = idx === services.length - 1;

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: isMobile ? 12 : 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: isMobile ? 0.45 : 0.6, delay: isMobile ? idx * 0.04 : idx * 0.08 }}
                whileHover={isMobile ? undefined : { y: -6, scale: 1.015 }}
                className={`group relative p-4 sm:p-8 rounded-2xl sm:rounded-3xl glass-effect glass-effect-hover transition-all duration-500 flex flex-col justify-between min-h-[220px] sm:min-h-[300px] ${
                  isLast ? "col-span-2 lg:col-span-3 lg:max-w-xl lg:mx-auto lg:w-full" : ""
                }`}
              >
                <div>
                  {/* Top bar with Icon */}
                  <div className="mb-3 sm:mb-6">
                    <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:text-gold group-hover:border-gold/30 transition-all duration-500">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-display text-sm sm:text-2xl font-bold text-white mb-2 sm:mb-4 group-hover:text-gold transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="font-sans text-[10px] sm:text-sm text-secondary leading-normal sm:leading-relaxed mb-4 sm:mb-6">
                    {service.description}
                  </p>
                </div>

                {/* Inline Action Indicator pointing to contact section */}
                <a
                  href="#contact"
                  className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-bold text-white/50 group-hover:text-gold transition-colors duration-300 mt-auto w-fit"
                >
                  <span>Enquire Availability</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-300" />
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
