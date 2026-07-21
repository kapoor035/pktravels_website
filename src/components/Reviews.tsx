"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

interface Review {
  author_name: string;
  rating: number;
  relative_time_description: string;
  text: string;
}

const localReviews: Review[] = [
  {
    author_name: "Rahul Sharma",
    rating: 5,
    relative_time_description: "1 week ago",
    text: "Excellent service! We rented PK Travels' luxury coach for a high-profile wedding in Delhi NCR. The bus was in pristine condition, and the driver was extremely polite and cooperative. Highly recommended!",
  },
  {
    author_name: "Meenakshi Iyer",
    rating: 5,
    relative_time_description: "3 weeks ago",
    text: "Booked the coach for an executive offsite trip to Jaipur. The VIP reclining seats and ambient lighting made the journey exceptionally comfortable. Punctual pickup and flawless coordination.",
  },
  {
    author_name: "Mrs. Kapoor",
    rating: 5,
    relative_time_description: "1 month ago",
    text: "Safety was our primary concern for the school excursion. PK Travels provided a super clean coach with verified safety checks and a highly professional driver who navigated with utmost care.",
  },
  {
    author_name: "Amit Verma",
    rating: 5,
    relative_time_description: "2 months ago",
    text: "Extremely professional management desk. The billing was transparent, and the vehicle arrived pre-sanitized and pre-stationed before our corporate delegates checked out. Will hire again.",
  },
];

export default function Reviews() {
  const [reviews] = useState<Review[]>(localReviews);
  const overallRating = 4.9;
  const totalReviews = 120;
  
  // Carousel states
  const [activeIdx, setActiveIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const autoplayTimer = useRef<NodeJS.Timeout | null>(null);
  const [windowWidth, setWindowWidth] = useState(1200);

  // Resize Listener to calculate visible cards dynamically
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getVisibleCardsCount = () => {
    if (windowWidth >= 1024) return 3; // Desktop
    if (windowWidth >= 768) return 2;  // Tablet
    return 1;                          // Mobile
  };

  const visibleCards = getVisibleCardsCount();

  const handlePrev = useCallback(() => {
    setActiveIdx((prev) => (prev - 1 + reviews.length) % reviews.length);
  }, [reviews.length]);

  const handleNext = useCallback(() => {
    setActiveIdx((prev) => (prev + 1) % reviews.length);
  }, [reviews.length]);

  // Autoplay Logic
  useEffect(() => {
    if (reviews.length <= 3 || isHovered) {
      if (autoplayTimer.current) clearInterval(autoplayTimer.current);
      return;
    }

    const isMobile = windowWidth < 768;
    const intervalTime = isMobile ? 11000 : 5000;

    autoplayTimer.current = setInterval(() => {
      handleNext();
    }, intervalTime);

    return () => {
      if (autoplayTimer.current) clearInterval(autoplayTimer.current);
    };
  }, [reviews, isHovered, activeIdx, handleNext, windowWidth]);

  // Drag handlers for mobile swipe
  const handleDragEnd = (event: unknown, info: { offset: { x: number } }) => {
    const swipeThreshold = 50;
    if (info.offset.x > swipeThreshold) {
      handlePrev();
    } else if (info.offset.x < -swipeThreshold) {
      handleNext();
    }
  };

  // Get letter initials for avatar fallback
  const getInitials = (name: string) => {
    if (!name) return "G";
    return name.charAt(0).toUpperCase();
  };

  // Padded list for seamless endless layout wrapping
  const displayList = [...reviews, ...reviews];

  return (
    <section className="py-10 md:py-32 bg-[#0C0C0C] border-b border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-12 h-[1px] bg-gold" />
              <span className="text-xs font-bold text-gold tracking-[0.3em] uppercase">Testimonials</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
              Google Reviews
            </h2>
          </div>
          
          {/* Overall Rating Header */}
          <div className="flex items-center gap-3 bg-[#151515] border border-white/5 rounded-2xl px-5 py-3.5 mt-4 md:mt-0 shadow-lg">
            <span className="text-lg font-bold text-white leading-none">{overallRating.toFixed(1)}</span>
            <div className="flex text-gold">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-4 h-4 ${i < Math.round(overallRating) ? "fill-current" : "opacity-30"}`} 
                />
              ))}
            </div>
            <span className="text-xs text-secondary ml-1 font-sans">({totalReviews}+ Reviews)</span>
          </div>
        </div>

        {/* Carousel / Static Cards rendering */}
        {reviews.length > 0 && (
          <div 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative w-full"
          >
            {reviews.length <= 3 ? (
              /* Case 1: static grid layout if total reviews <= 3 */
              <div className="grid md:grid-cols-3 gap-8">
                {reviews.map((review) => (
                  <div
                    key={review.author_name}
                    className="p-8 rounded-3xl bg-[#151515] border border-white/5 flex flex-col justify-between h-full hover:border-gold/30 transition-all duration-500 shadow-md"
                  >
                    <div>
                      {/* Top Bar */}
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/25 flex items-center justify-center text-gold font-bold text-sm">
                            {getInitials(review.author_name)}
                          </div>
                          <div>
                            <h3 className="font-display text-sm font-bold text-white">{review.author_name}</h3>
                            <span className="text-[10px] text-secondary font-sans block mt-0.5">{review.relative_time_description}</span>
                          </div>
                        </div>

                        {/* Google logo badge */}
                        <div className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
                          <div className="w-3.5 h-3.5 rounded-full bg-white flex items-center justify-center font-bold text-[9px] text-blue-600">G</div>
                          <span className="text-[9px] text-white/50 uppercase tracking-widest font-semibold font-sans">Google</span>
                        </div>
                      </div>

                      {/* Stars */}
                      <div className="flex text-gold mb-4">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`w-3.5 h-3.5 fill-current`} />
                        ))}
                      </div>

                      {/* Text */}
                      <p className="font-sans text-sm text-secondary/90 leading-relaxed italic">
                        &ldquo;{review.text}&rdquo;
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Case 2: Auto-scrolling horizontal Carousel if > 3 reviews */
              <div className="relative">
                {/* Left Arrow Button */}
                <button
                  onClick={handlePrev}
                  className="absolute -left-3 sm:-left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#151515] border border-white/5 text-white hover:text-gold hover:border-gold/30 hover:shadow-[0_0_15px_rgba(200,168,78,0.15)] transition-all cursor-pointer z-20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                  aria-label="Previous Review"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {/* Right Arrow Button */}
                <button
                  onClick={handleNext}
                  className="absolute -right-3 sm:-right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#151515] border border-white/5 text-white hover:text-gold hover:border-gold/30 hover:shadow-[0_0_15px_rgba(200,168,78,0.15)] transition-all cursor-pointer z-20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                  aria-label="Next Review"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                {/* Slider viewport */}
                <div className="overflow-hidden w-full cursor-grab active:cursor-grabbing py-4 px-1">
                  <motion.div
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={handleDragEnd}
                    animate={{ x: `-${activeIdx * (100 / visibleCards)}%` }}
                    transition={{ type: "spring", stiffness: 220, damping: 28 }}
                    className="flex items-stretch w-full"
                  >
                    {displayList.map((review, idx) => (
                      <div
                        key={`${review.author_name}-${idx}`}
                        className="w-full md:w-1/2 lg:w-1/3 shrink-0 px-3 flex flex-col"
                      >
                        <div className="p-5 sm:p-10 rounded-3xl bg-[#151515] border border-white/5 hover:border-gold/30 transition-all duration-500 shadow-xl flex flex-col justify-between h-full select-none">
                          <div>
                            {/* Top Bar */}
                            <div className="flex justify-between items-start mb-4 sm:mb-6">
                              <div className="flex items-center gap-2.5 sm:gap-4">
                                <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-gold/10 border border-gold/25 flex items-center justify-center text-gold font-bold text-sm sm:text-base">
                                  {getInitials(review.author_name)}
                                </div>
                                <div>
                                  <h3 className="font-display text-xs sm:text-base font-bold text-white leading-tight">{review.author_name}</h3>
                                  <span className="text-[10px] sm:text-xs text-secondary font-sans mt-0.5 block">{review.relative_time_description}</span>
                                </div>
                              </div>

                              {/* Google Badge */}
                              <div className="flex items-center gap-1 sm:gap-1.5 bg-white/5 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full border border-white/5">
                                <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-white flex items-center justify-center font-bold text-[8px] sm:text-[10px] text-blue-600">G</div>
                                <span className="text-[8px] sm:text-[10px] text-white/50 uppercase tracking-widest font-semibold font-sans">Google</span>
                              </div>
                            </div>

                            {/* Rating Stars */}
                            <div className="flex text-gold mb-4 sm:mb-6">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
                              ))}
                            </div>

                            {/* Content */}
                            <p className="font-sans text-xs sm:text-base text-secondary/90 leading-relaxed italic">
                              &ldquo;{review.text}&rdquo;
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                </div>

                {/* Navigation Dots */}
                <div className="flex justify-center gap-2 mt-3 sm:mt-8">
                  {reviews.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveIdx(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                        activeIdx === idx ? "w-8 bg-gold" : "w-2 bg-white/10 hover:bg-white/20"
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
