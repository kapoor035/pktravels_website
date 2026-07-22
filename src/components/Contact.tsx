"use client";

import { useState } from "react";
import { Phone, MessageSquare, MapPin, Mail, Send, Check, Loader2, AlertCircle, Calendar, ChevronLeft, ChevronRight, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    service: "Weddings",
    message: "",
  });
  
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [activeMobileTab, setActiveMobileTab] = useState<"connect" | "quote">("connect");
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const formatDateFriendly = (dateStr: string) => {
    if (!dateStr) return "";
    const parts = dateStr.split("-");
    if (parts.length !== 3) return dateStr;
    const [yyyy, mm, dd] = parts;
    const date = new Date(Number(yyyy), Number(mm) - 1, Number(dd));
    if (isNaN(date.getTime())) return dateStr;
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading" || status === "success") return;

    setStatus("loading");
    setErrorMessage("");

    try {
      // 1. Validate Phone
      if (!/^\+?[\d\s-]{10,}$/.test(formData.phone.trim())) {
        throw new Error("Please enter a valid contact number (at least 10 digits).");
      }

      // 2. Validate Email
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
        throw new Error("Please enter a valid email address.");
      }

      // 3. Validate Date (not in the past)
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        throw new Error("The journey date cannot be in the past.");
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit quote request. Please try again.");
      }

      setStatus("success");
      // Reset form fields
      setFormData({
        name: "",
        email: "",
        phone: "",
        date: "",
        service: "Weddings",
        message: "",
      });

      // Reset to idle state after 5 seconds to allow another request if needed
      setTimeout(() => {
        setStatus("idle");
      }, 5000);
    } catch (err) {
      console.error("Form submit error:", err);
      const errorMsg = err instanceof Error ? err.message : "An unexpected error occurred. Please contact us via phone or WhatsApp.";
      setErrorMessage(errorMsg);
      setStatus("error");
      
      // Reset to idle after 6 seconds
      setTimeout(() => {
        setStatus("idle");
      }, 6000);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const directionsUrl = "https://www.google.com/maps/search/?api=1&query=PK+Travels+Plot+No.+484+Sector+19+Dwarka+New+Delhi+110075";

  return (
    <section id="contact" className="py-10 md:py-32 bg-[#0A0A0A] border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-20">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-6 h-[1px] bg-gold" />
            <span className="text-xs font-bold text-gold tracking-[0.3em] uppercase">Connect With Us</span>
            <span className="w-6 h-[1px] bg-gold" />
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-4xl md:text-5xl text-white tracking-tight mb-4 sm:mb-6">
            Begin Your Journey
          </h2>
          <p className="font-sans text-secondary text-xs sm:text-lg leading-relaxed">
            Call us today. Message us on WhatsApp or Email. We&apos;ll help you choose the perfect travel solution.
          </p>
        </div>

        {/* Segmented Tab Controller for Mobile */}
        <div className="flex lg:hidden w-full bg-[#151515] border border-white/5 p-1 rounded-2xl mb-5 max-w-xs mx-auto">
          <button
            onClick={() => setActiveMobileTab("connect")}
            className={`flex-1 py-2.5 rounded-xl font-sans font-bold text-xs uppercase tracking-wider transition-all duration-300 ${
              activeMobileTab === "connect"
                ? "bg-gold text-black shadow-md"
                : "text-secondary hover:text-white"
            }`}
          >
            Quick Connect
          </button>
          <button
            onClick={() => setActiveMobileTab("quote")}
            className={`flex-1 py-2.5 rounded-xl font-sans font-bold text-xs uppercase tracking-wider transition-all duration-300 ${
              activeMobileTab === "quote"
                ? "bg-gold text-black shadow-md"
                : "text-secondary hover:text-white"
            }`}
          >
            Get Quote
          </button>
        </div>

        {/* Contact Layout */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* Left Column: Direct Links & Map */}
          <div className={`lg:col-span-5 flex-col gap-4 sm:gap-8 w-full ${activeMobileTab === "connect" ? "flex" : "hidden lg:flex"}`}>
            <div className="p-3.5 sm:p-8 rounded-3xl bg-[#151515] border border-white/5 flex flex-col gap-3 sm:gap-6 w-full max-w-[340px] sm:max-w-none mx-auto">
              <h3 className="font-display text-sm sm:text-xl font-bold text-white tracking-wide border-b border-white/5 pb-2 sm:pb-4">
                PK Chauffeur Desk
              </h3>
              
              {/* Phone Detail (Dual Numbers Clickable) */}
              <div className="flex items-start gap-2.5 sm:gap-4">
                <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold shrink-0">
                  <Phone className="w-3 h-3 sm:w-4 h-4" />
                </div>
                <div className="flex flex-col gap-0.5 sm:gap-1.5">
                  <p className="font-sans text-[10px] sm:text-xs text-white/55 uppercase tracking-widest">Call Booking Support</p>
                  <div className="flex flex-col gap-0 sm:gap-1">
                    {siteConfig.phones.map((phone) => (
                      <a 
                        key={phone.raw}
                        href={`tel:${phone.raw}`} 
                        className="font-display text-[13px] sm:text-lg font-bold text-white hover:text-gold transition-colors w-fit"
                      >
                        {phone.display}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* WhatsApp Detail */}
              <div className="flex items-start gap-2.5 sm:gap-4">
                <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
                  <MessageSquare className="w-3 h-3 sm:w-4 h-4" />
                </div>
                <div className="flex flex-col gap-0.5 sm:gap-1.5">
                  <p className="font-sans text-[10px] sm:text-xs text-white/55 uppercase tracking-widest">WhatsApp Direct</p>
                  <a 
                    href={`https://wa.me/${siteConfig.whatsapp.number}?text=${encodeURIComponent(siteConfig.whatsapp.defaultText)}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-display text-[13px] sm:text-lg font-bold text-white hover:text-emerald-400 transition-colors block mt-0.5"
                  >
                    {siteConfig.whatsapp.display}
                  </a>
                </div>
              </div>

              {/* Email Detail */}
              <div className="flex items-start gap-2.5 sm:gap-4">
                <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0">
                  <Mail className="w-3 h-3 sm:w-4 h-4" />
                </div>
                <div className="flex flex-col gap-0.5 sm:gap-1.5">
                  <p className="font-sans text-[10px] sm:text-xs text-white/55 uppercase tracking-widest">Email Enquiries</p>
                  <a 
                    href={`mailto:${siteConfig.email}`} 
                    className="font-display text-[13px] sm:text-lg font-bold text-white hover:text-gold transition-colors block mt-0.5 break-all"
                  >
                    {siteConfig.email}
                  </a>
                </div>
              </div>

              {/* Instagram Detail */}
              <div className="flex items-start gap-2.5 sm:gap-4">
                <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-pink-500/10 flex items-center justify-center text-pink-400 shrink-0">
                  <Instagram className="w-3 h-3 sm:w-4 h-4" />
                </div>
                <div className="flex flex-col gap-0.5 sm:gap-1.5">
                  <p className="font-sans text-[10px] sm:text-xs text-white/55 uppercase tracking-widest">Instagram Profile</p>
                  <a 
                    href={siteConfig.instagramUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="Follow PK Travels on Instagram"
                    className="font-display text-[13px] sm:text-lg font-bold text-white hover:text-gold transition-colors block mt-0.5 w-fit"
                  >
                    @pktravels_kapoor
                  </a>
                </div>
              </div>

              {/* Location Detail - Clickable map pin & address linking to search */}
              <a 
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2.5 sm:gap-4 hover:text-gold transition-colors group/addr"
              >
                <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold shrink-0 group-hover/addr:bg-gold/20 transition-colors">
                  <MapPin className="w-3 h-3 sm:w-4 h-4" />
                </div>
                <div className="flex flex-col gap-0.5 sm:gap-1.5">
                  <p className="font-sans text-[10px] sm:text-xs text-white/55 uppercase tracking-widest">Office Address</p>
                  <p className="font-sans text-xs sm:text-sm text-secondary group-hover/addr:text-gold mt-0.5 leading-relaxed transition-colors">
                    {siteConfig.address.full}
                  </p>
                </div>
              </a>
            </div>

            <div className="relative w-full h-[260px] rounded-3xl overflow-hidden border border-white/5 hover:border-gold/30 transition-all duration-500 shadow-lg group hidden sm:block">
              <iframe
                src={siteConfig.googleMapsUrl}
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(1) invert(0.9) contrast(1.2)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="transition-transform duration-700 group-hover:scale-105"
                title={`${siteConfig.businessName} Office Location Map`}
              />
            </div>
          </div>

          {/* Right Column: Quote Form */}
          <div className={`lg:col-span-7 w-full ${activeMobileTab === "quote" ? "block" : "hidden lg:block"}`}>
            <div className="p-3.5 sm:p-10 rounded-3xl bg-[#151515] border border-white/5 relative overflow-hidden shadow-2xl max-w-[340px] sm:max-w-none mx-auto w-full">
              {/* Background gradient decorative element */}
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gold/2 rounded-full filter blur-[80px] pointer-events-none" />

              <h3 className="font-display text-base sm:text-2xl font-bold text-white mb-2.5 sm:mb-6">
                Request a Custom Quote
              </h3>

              <form onSubmit={handleSubmit} className="flex flex-col gap-2.5 sm:gap-6 relative">
                <AnimatePresence mode="wait">
                  {status !== "success" ? (
                    <motion.div
                      key="form-fields"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col gap-2.5 sm:gap-6"
                    >
                      <div className="grid sm:grid-cols-2 gap-2.5 sm:gap-6">
                        {/* Name input */}
                        <div className="flex flex-col gap-0.5 sm:gap-2">
                          <label htmlFor="name" className="font-sans text-[10px] sm:text-xs font-semibold text-white/60 tracking-wider uppercase">Full Name</label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            disabled={status === "loading"}
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="John Doe"
                            className="bg-black/40 border border-white/10 focus:border-gold rounded-xl px-3.5 py-1.5 sm:px-4 sm:py-3 text-xs sm:text-sm text-white placeholder-white/20 outline-none transition-all disabled:opacity-50"
                          />
                        </div>

                        {/* Phone input */}
                        <div className="flex flex-col gap-0.5 sm:gap-2">
                          <label htmlFor="phone" className="font-sans text-[10px] sm:text-xs font-semibold text-white/60 tracking-wider uppercase">Contact Number</label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            required
                            disabled={status === "loading"}
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="+91 99999 99999"
                            className="bg-black/40 border border-white/10 focus:border-gold rounded-xl px-3.5 py-1.5 sm:px-4 sm:py-3 text-xs sm:text-sm text-white placeholder-white/20 outline-none transition-all disabled:opacity-50"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-2.5 sm:gap-6">
                        {/* Email input */}
                        <div className="flex flex-col gap-0.5 sm:gap-2">
                          <label htmlFor="email" className="font-sans text-[10px] sm:text-xs font-semibold text-white/60 tracking-wider uppercase">Email Address</label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            disabled={status === "loading"}
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="john@example.com"
                            className="bg-black/40 border border-white/10 focus:border-gold rounded-xl px-3.5 py-1.5 sm:px-4 sm:py-3 text-xs sm:text-sm text-white placeholder-white/20 outline-none transition-all disabled:opacity-50"
                          />
                        </div>

                        {/* Date input */}
                        <div className="flex flex-col gap-0.5 sm:gap-2">
                          <label htmlFor="date" className="font-sans text-[10px] sm:text-xs font-semibold text-white/60 tracking-wider uppercase">Journey Date</label>
                          <div className="relative">
                            <input
                              type="text"
                              id="date"
                              name="date"
                              readOnly
                              required
                              onClick={() => {
                                if (status !== "loading") {
                                  setShowCalendar(true);
                                }
                              }}
                              disabled={status === "loading"}
                              value={formatDateFriendly(formData.date)}
                              placeholder="Select Date"
                              className="w-full bg-black/40 border border-white/10 focus:border-gold rounded-xl pl-3.5 pr-10 py-1.5 sm:pl-4 sm:pr-10 sm:py-3 text-xs sm:text-sm text-white cursor-pointer outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed select-none"
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gold pointer-events-none">
                              <Calendar className="w-4 h-4" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Service Select */}
                      <div className="flex flex-col gap-0.5 sm:gap-2">
                        <label htmlFor="service" className="font-sans text-[10px] sm:text-xs font-semibold text-white/60 tracking-wider uppercase">Service Type</label>
                        <div className="relative">
                          <select
                            id="service"
                            name="service"
                            disabled={status === "loading"}
                            value={formData.service}
                            onChange={handleInputChange}
                            className="w-full bg-black/40 border border-white/10 focus:border-gold rounded-xl pl-3.5 pr-10 py-1.5 sm:pl-4 sm:pr-10 sm:py-3 text-xs sm:text-sm text-white outline-none appearance-none transition-all disabled:opacity-50 cursor-pointer select-none"
                          >
                            <option value="Weddings" className="bg-[#151515]">Wedding Transportation</option>
                            <option value="Corporate" className="bg-[#151515]">Corporate Travel</option>
                            <option value="Schools" className="bg-[#151515]">School & College Trip</option>
                            <option value="Outstation" className="bg-[#151515]">Outstation Tours</option>
                            <option value="Airport" className="bg-[#151515]">Airport Transfer</option>
                            <option value="Others" className="bg-[#151515]">Family / Other Functions</option>
                          </select>
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gold pointer-events-none">
                            <ChevronDown className="w-4 h-4" />
                          </div>
                        </div>
                      </div>

                      {/* Message input */}
                      <div className="flex flex-col gap-0.5 sm:gap-2">
                        <label htmlFor="message" className="font-sans text-[10px] sm:text-xs font-semibold text-white/60 tracking-wider uppercase">Your Requirements</label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={2}
                          disabled={status === "loading"}
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Please describe details about pickup points, drop coordinates, and itinerary..."
                          className="bg-black/40 border border-white/10 focus:border-gold rounded-xl px-3.5 py-1.5 sm:px-4 sm:py-3 text-xs sm:text-sm text-white placeholder-white/20 outline-none transition-all resize-none disabled:opacity-50"
                        />
                      </div>

                      {/* Error state */}
                      {status === "error" && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-2.5 p-4 rounded-xl bg-red-500/10 border border-red-500/35 text-red-200 text-xs sm:text-sm"
                        >
                          <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                          <span>{errorMessage}</span>
                        </motion.div>
                      )}

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={status === "loading"}
                        className="flex items-center justify-center gap-2 font-sans font-bold text-xs sm:text-sm tracking-wider text-black bg-gold hover:bg-gold-hover py-2.5 sm:py-4 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(200,168,78,0.1)] mt-0.5 disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed"
                      >
                        {status === "loading" ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Processing Request...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Submit Request
                          </>
                        )}
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="success-message"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="flex flex-col items-center justify-center py-16 text-center"
                    >
                      <div className="w-16 h-16 rounded-full bg-gold/20 border border-gold flex items-center justify-center text-gold mb-6">
                        <Check className="w-8 h-8" />
                      </div>
                      <h4 className="font-display text-2xl font-bold text-white mb-3">Enquiry Received</h4>
                      <p className="font-sans text-sm text-secondary max-w-sm leading-relaxed mb-6">
                        Thank you for contacting PK Travels. Our reservation team is reviewing your requirements and will contact you within 2 hours with pricing.
                      </p>
                      <div className="w-full h-[2px] bg-white/5 max-w-xs mb-6" />
                      <p className="font-sans text-xs text-white/40 tracking-widest uppercase">
                        PK Travels • Premium Luxury Charter
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Theme Calendar Modal */}
      <AnimatePresence>
        {showCalendar && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCalendar(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            
            {/* Calendar Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[340px] bg-[#151515] border border-gold/30 rounded-3xl p-5 shadow-[0_15px_50px_rgba(0,0,0,0.8)] z-10 flex flex-col gap-4 select-none"
            >
              {/* Header Close button */}
              <button 
                type="button"
                onClick={() => setShowCalendar(false)}
                className="absolute top-4 right-4 text-white/40 hover:text-gold transition-colors p-1"
                aria-label="Close Calendar"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Month/Year selector row */}
              <div className="flex items-center justify-between mt-2 px-1">
                <h4 className="font-display font-bold text-lg text-white tracking-wide">
                  {currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                </h4>
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => {
                      const prevMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
                      // Don't go to past months before current month
                      const today = new Date();
                      if (prevMonth.getFullYear() > today.getFullYear() || 
                         (prevMonth.getFullYear() === today.getFullYear() && prevMonth.getMonth() >= today.getMonth())) {
                        setCurrentMonth(prevMonth);
                      }
                    }}
                    className="p-1.5 rounded-lg border border-white/5 bg-black/20 text-white/60 hover:text-gold hover:border-gold/20 transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const nextMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
                      setCurrentMonth(nextMonth);
                    }}
                    className="p-1.5 rounded-lg border border-white/5 bg-black/20 text-white/60 hover:text-gold hover:border-gold/20 transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Weekdays row */}
              <div className="grid grid-cols-7 text-center text-[10px] font-bold text-gold/60 uppercase tracking-widest py-1 border-b border-white/5">
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                  <div key={day} className="py-1">{day}</div>
                ))}
              </div>

              {/* Days grid */}
              <div className="grid grid-cols-7 gap-1 text-center text-xs">
                {(() => {
                  const year = currentMonth.getFullYear();
                  const month = currentMonth.getMonth();
                  const firstDayIndex = new Date(year, month, 1).getDay();
                  const totalDays = new Date(year, month + 1, 0).getDate();
                  const prevMonthTotalDays = new Date(year, month, 0).getDate();
                  
                  const cells = [];
                  
                  // 1. Previous month padded days
                  for (let i = firstDayIndex - 1; i >= 0; i--) {
                    const dayVal = prevMonthTotalDays - i;
                    const dateObj = new Date(year, month - 1, dayVal);
                    cells.push({
                      day: dayVal,
                      isCurrentMonth: false,
                      date: dateObj,
                      disabled: true // Pad days are disabled
                    });
                  }
                  
                  // 2. Current month days
                  const today = new Date();
                  today.setHours(0,0,0,0);
                  for (let i = 1; i <= totalDays; i++) {
                    const dateObj = new Date(year, month, i);
                    const isPast = dateObj < today;
                    cells.push({
                      day: i,
                      isCurrentMonth: true,
                      date: dateObj,
                      disabled: isPast
                    });
                  }
                  
                  // 3. Next month padded days
                  const remaining = 42 - cells.length;
                  for (let i = 1; i <= remaining; i++) {
                    const dateObj = new Date(year, month + 1, i);
                    cells.push({
                      day: i,
                      isCurrentMonth: false,
                      date: dateObj,
                      disabled: true // Next month padded days are also disabled in this picker
                    });
                  }
                  
                  // Render cells
                  return cells.map((cell, idx) => {
                    const isSelected = formData.date === (() => {
                      const yyyy = cell.date.getFullYear();
                      const mm = String(cell.date.getMonth() + 1).padStart(2, '0');
                      const dd = String(cell.date.getDate()).padStart(2, '0');
                      return `${yyyy}-${mm}-${dd}`;
                    })();
                    
                    const isToday = cell.date.toDateString() === new Date().toDateString();
                    
                    return (
                      <button
                        key={idx}
                        type="button"
                        disabled={cell.disabled}
                        onClick={() => {
                          const yyyy = cell.date.getFullYear();
                          const mm = String(cell.date.getMonth() + 1).padStart(2, '0');
                          const dd = String(cell.date.getDate()).padStart(2, '0');
                          setFormData((prev) => ({ ...prev, date: `${yyyy}-${mm}-${dd}` }));
                          setShowCalendar(false);
                        }}
                        className={`
                          h-8 w-8 mx-auto flex items-center justify-center rounded-full text-xs transition-all outline-none focus-visible:ring-1 focus-visible:ring-gold cursor-pointer
                          ${cell.disabled 
                            ? "opacity-15 cursor-not-allowed text-white/50" 
                            : !cell.isCurrentMonth 
                              ? "text-white/30 hover:bg-white/5" 
                              : isSelected
                                ? "bg-gold text-black font-bold shadow-lg shadow-gold/25"
                                : isToday
                                  ? "border border-gold/50 text-gold font-semibold"
                                  : "text-white/80 hover:bg-white/10"
                          }
                        `}
                      >
                        {cell.day}
                      </button>
                    );
                  });
                })()}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
