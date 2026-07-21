"use client";

import { useState, useEffect, useRef } from "react";
import { Play, X, Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function InfluencerFloatingCard() {
  const [isVisible, setIsVisible] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const previewVideoRef = useRef<HTMLVideoElement>(null);
 
  const openModal = () => {
    setIsModalOpen(true);
    // Enable audio when opening the full modal
    setIsMuted(false);
  };
 
  const closeModal = () => {
    setIsModalOpen(false);
    if (modalVideoRef.current) {
      modalVideoRef.current.pause();
    }
  };
 
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
 
  useEffect(() => {
    setShouldLoadVideo(true);
  }, []);
 
  useEffect(() => {
    if (shouldLoadVideo && previewVideoRef.current) {
      previewVideoRef.current.muted = true;
      previewVideoRef.current.play().catch((err) => {
        console.log("Influencer preview video autoplay failed:", err);
      });
    }
  }, [shouldLoadVideo]);
 
  useEffect(() => {
    const handleScroll = () => {
      // Fade out the floating card when scrolled down past 80% of the viewport height
      if (window.scrollY > window.innerHeight * 0.8) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };
 
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("keydown", handleKeyDown);
 
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);
 
  return (
    <>
      {/* Floating Card */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-20 sm:bottom-8 right-4 sm:right-10 z-40 cursor-pointer group"
            onClick={openModal}
          >
            <div className="relative w-32 h-44 sm:w-48 sm:h-64 rounded-2xl overflow-hidden glass-effect border border-gold/30 hover:border-gold transition-colors duration-500 shadow-2xl">
              {/* Loop Preview Video */}
              {shouldLoadVideo && (
                <video
                  ref={previewVideoRef}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700 no-controls"
                >
                  <source src="/assets/videos/influencer.mp4" type="video/mp4" />
                </video>
              )}

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-300" />

              {/* Pulsing Play Button */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gold/90 text-black flex items-center justify-center shadow-lg group-hover:bg-white group-hover:scale-110 transition-all duration-300 animate-pulse">
                  <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current ml-0.5" />
                </div>
                <span className="font-sans text-[9px] sm:text-xs font-bold text-white tracking-wider bg-black/60 px-2.5 py-1 rounded-full backdrop-blur-sm border border-white/10 uppercase">
                  Watch Video
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen Video Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-12"
          >
            {/* Background Close Action */}
            <div className="absolute inset-0" onClick={closeModal} />

            {/* Modal Content container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-4xl aspect-video rounded-3xl overflow-hidden border border-white/10 bg-[#151515] shadow-2xl z-10"
            >
              {/* Main Player */}
              <video
                ref={modalVideoRef}
                autoPlay
                controls
                controlsList="nodownload"
                onContextMenu={(e) => e.preventDefault()}
                muted={isMuted}
                playsInline
                className="w-full h-full object-contain"
              >
                <source src="/assets/videos/influencer.mp4" type="video/mp4" />
              </video>

              {/* Top Controls Overlay */}
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-2 sm:gap-3">
                {/* Mute Toggle */}
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2.5 sm:p-3 rounded-full bg-black/60 border border-white/10 text-white hover:text-gold hover:border-gold/40 transition-colors"
                  title={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" /> : <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />}
                </button>

                {/* Close Button */}
                <button
                  onClick={closeModal}
                  className="p-2.5 sm:p-3 rounded-full bg-black/60 border border-white/10 text-white hover:text-gold hover:border-gold/40 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>

              {/* Bottom Custom Title Overlay */}
              <div className="absolute bottom-6 left-6 pointer-events-none bg-gradient-to-t from-black/80 to-transparent p-4 rounded-xl hidden sm:block">
                <p className="font-display text-lg font-bold text-white tracking-wide">
                  PK Travels Experience
                </p>
                <p className="font-sans text-xs text-gold tracking-widest mt-1">
                  PREMIUM COACHES & VIP SERVICE
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
