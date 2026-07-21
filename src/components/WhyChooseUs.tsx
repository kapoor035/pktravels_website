"use client";

import { motion } from "framer-motion";
import { UserCheck, Sparkles, CheckCircle2, ShieldCheck, Sparkle, BadgePercent } from "lucide-react";

const points = [
  {
    icon: UserCheck,
    title: "Professional Drivers",
    desc: "Highly experienced, verified, and uniformed chauffeurs who prioritize passenger hospitality and safe navigation.",
  },
  {
    icon: Sparkles,
    title: "Luxury Interiors",
    desc: "Immaculate leather seats, premium wooden flooring, personalized AC vents, and ambient gold lighting.",
  },
  {
    icon: CheckCircle2,
    title: "Reliable Service",
    desc: "End-to-end trip execution managed by a professional command center with round-the-clock logistics support.",
  },
  {
    icon: ShieldCheck,
    title: "On-Time Pickup",
    desc: "We enforce strict arrival times. Our coach arrives pre-inspected and pre-stationed ahead of schedule.",
  },
  {
    icon: Sparkle,
    title: "Clean & Well Maintained",
    desc: "Sanitized prior to every dispatch and maintained in accordance with manufacturer-certified safety inspections.",
  },
  {
    icon: BadgePercent,
    title: "Affordable Pricing",
    desc: "Unmatched luxury values with completely transparent billing, zero hidden fees, and flexible rental packages.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-10 md:py-32 bg-[#0A0A0A] border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-20">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-6 h-[1px] bg-gold" />
            <span className="text-xs font-bold text-gold tracking-[0.3em] uppercase">Why Choose PK Travels</span>
            <span className="w-6 h-[1px] bg-gold" />
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-4xl md:text-5xl text-white tracking-tight mb-4 sm:mb-6">
            The Luxury Travel Standard
          </h2>
          <p className="font-sans text-secondary text-xs sm:text-lg leading-relaxed">
            Discover why wedding planners, corporate clients, schools, and families consistently trust PK Travels for Delhi NCR coach rentals.
          </p>
        </div>

        {/* Feature Grid - grid-cols-3 on mobile, md:grid-cols-2, lg:grid-cols-3 on desktop */}
        <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-8">
          {points.map((point, idx) => {
            const Icon = point.icon;
            return (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                className="p-3 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#151515] border border-white/5 hover:border-gold/30 transition-all duration-500 hover:shadow-[0_0_20px_rgba(200,168,78,0.05)] flex flex-col justify-between h-full"
              >
                <div>
                  <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gold/10 flex items-center justify-center text-gold mb-3 sm:mb-6 shrink-0">
                    <Icon className="w-4 h-4 sm:w-6 sm:h-6" />
                  </div>
                  <h3 className="font-display text-[10px] sm:text-xl font-bold text-white mb-1.5 sm:mb-3">
                    {point.title}
                  </h3>
                  <p className="font-sans text-[9px] sm:text-sm text-secondary leading-normal sm:leading-relaxed">
                    {point.desc}
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
