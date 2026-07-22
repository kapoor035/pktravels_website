"use client";

import { useState, useEffect, useCallback, memo } from "react";
import { Eye, X, ChevronLeft, ChevronRight, Image as ImageIcon, ArrowRight, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

interface MemoizedGalleryVideoProps {
  src: string;
}

const MemoizedGalleryVideo = memo(({ src }: MemoizedGalleryVideoProps) => {
  return (
    <video
      src={src}
      className="w-full h-full object-cover no-controls pointer-events-none"
      autoPlay
      muted
      // @ts-ignore
      defaultmuted="true"
      loop
      playsInline
      controls={false}
      disablePictureInPicture={true}
      controlsList="nodownload nofullscreen noremoteplayback"
      preload="metadata"
      suppressHydrationWarning
    />
  );
});
MemoizedGalleryVideo.displayName = "MemoizedGalleryVideo";

interface GalleryItem {
  src: string;
  title: string;
  category: "All" | "44 Seater" | "50 Seater" | "61 Seater" | "66 Seater";
  type: "image" | "video";
}

interface GalleryProps {
  preview?: boolean;
}

export default function Gallery({ preview = false }: GalleryProps) {
  const [validImages, setValidImages] = useState<GalleryItem[]>([]);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"All" | "44 Seater" | "50 Seater" | "61 Seater" | "66 Seater">("All");
  const [loadedMedia, setLoadedMedia] = useState<Record<string, boolean>>({});
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Touch coordinates for swipe events
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  useEffect(() => {
    const checkImages = async () => {
      try {
        const response = await fetch("/api/gallery");
        const data = await response.json();

        if (data.images && data.images.length > 0) {
          const resolved = data.images.map((pathStr: string): GalleryItem => {
            const fileName = pathStr.split("/").pop() || "";
            const ext = pathStr.split(".").pop()?.toLowerCase() || "";

            let category: "All" | "44 Seater" | "50 Seater" | "61 Seater" | "66 Seater" = "All";
            let type: "image" | "video" = "image";

            if (["mp4", "mov", "webm"].includes(ext)) {
              type = "video";
            }

            if (pathStr.includes("/gallery/44-seater/") || pathStr.includes("/all/44 seater/")) {
              category = "44 Seater";
            } else if (pathStr.includes("/gallery/50-seater/") || pathStr.includes("/all/50 seater/")) {
              category = "50 Seater";
            } else if (pathStr.includes("/gallery/61-seater/") || pathStr.includes("/all/61 seater/")) {
              category = "61 Seater";
            } else if (pathStr.includes("/gallery/66-seater/") || pathStr.includes("/all/66 seater/")) {
              category = "66 Seater";
            } else {
              category = "All";
            }

            const title = fileName.replace(/\.[^/.]+$/, "").replace(/-/g, " ");
            const formattedTitle = title.charAt(0).toUpperCase() + title.slice(1);

            return {
              src: pathStr,
              title: formattedTitle,
              category,
              type,
            };
          });
          setValidImages(resolved);
        } else {
          setValidImages([]);
        }
      } catch (err) {
        console.error("Gallery check error:", err);
        setValidImages([]);
      } finally {
        setIsLoading(false);
      }
    };

    checkImages();
  }, []);

  // Filter gallery items by active tab (only for full gallery page)
  const filteredImages = preview
    ? validImages
    : validImages.filter((img) => activeTab === "All" || img.category === activeTab);

  // Sliced items for homepage preview
  const homepagePreview: GalleryItem[] = [
    {
      src: "/gallery/all/exterior-01.jpg",
      title: "Exterior 01",
      category: "All",
      type: "image",
    },
    {
      src: "/gallery/all/exterior-02.jpg",
      title: "Exterior 02",
      category: "All",
      type: "image",
    },
    {
      src: "/gallery/all/exterior-03.jpg",
      title: "Exterior 03",
      category: "All",
      type: "image",
    },
  ];

  const displayImages = preview ? homepagePreview : filteredImages;

  const [activeHighlightIdx, setActiveHighlightIdx] = useState(0);

  useEffect(() => {
    if (!preview || displayImages.length <= 1) return;
    const interval = setInterval(() => {
      setActiveHighlightIdx((prev) => (prev + 1) % displayImages.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [preview, displayImages.length]);

  const handleHighlightDragEnd = useCallback((event: unknown, info: { offset: { x: number } }) => {
    const swipeThreshold = 50;
    if (info.offset.x > swipeThreshold) {
      setActiveHighlightIdx((prev) => (prev - 1 + displayImages.length) % displayImages.length);
    } else if (info.offset.x < -swipeThreshold) {
      setActiveHighlightIdx((prev) => (prev + 1) % displayImages.length);
    }
  }, [displayImages.length]);

  const openLightbox = useCallback((idx: number) => {
    setActiveIdx(idx);
  }, []);

  const closeLightbox = useCallback(() => setActiveIdx(null), []);

  const showPrev = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (activeIdx !== null && displayImages.length > 0) {
      setActiveIdx((activeIdx - 1 + displayImages.length) % displayImages.length);
    }
  }, [activeIdx, displayImages.length]);

  const showNext = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (activeIdx !== null && displayImages.length > 0) {
      setActiveIdx((activeIdx + 1) % displayImages.length);
    }
  }, [activeIdx, displayImages.length]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeIdx === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIdx, closeLightbox, showPrev, showNext]);

  // Swipe detection handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      showNext();
    } else if (isRightSwipe) {
      showPrev();
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <section id="gallery" className="py-10 md:py-32 bg-[#0C0C0C] border-b border-white/5 relative min-h-[500px]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-6 h-[1px] bg-gold" />
            <span className="text-xs font-bold text-gold tracking-[0.3em] uppercase">Gallery Collection</span>
            <span className="w-6 h-[1px] bg-gold" />
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-4xl md:text-5xl text-white tracking-tight mb-4 sm:mb-6">
            Journey Highlights
          </h2>
          <p className="font-sans text-secondary text-xs sm:text-lg leading-relaxed">
            Explore our premium luxury coach collection through authentic interior and exterior photographs and videos.
          </p>
        </div>

        {!preview && !isLoading && (
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12">
            {(["All", "44 Seater", "50 Seater", "61 Seater", "66 Seater"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setActiveIdx(null);
                }}
                className={`font-sans text-[10px] sm:text-xs font-bold tracking-widest uppercase px-4 py-2 sm:px-6 sm:py-3 rounded-full border transition-all duration-300 cursor-pointer select-none ${activeTab === tab
                  ? "bg-gold text-black border-gold shadow-[0_0_15px_rgba(200,168,78,0.25)]"
                  : "bg-[#151515] text-secondary border-white/5 hover:text-white hover:border-gold/30"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        )}

        {/* Loading Skeletons */}
        {isLoading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {Array.from({ length: preview ? 3 : 6 }).map((_, idx) => (
              <div
                key={idx}
                className="aspect-square rounded-3xl overflow-hidden border border-white/5 bg-[#151515] skeleton-shimmer"
              />
            ))}
          </div>
        )}

        {/* Gallery Contents */}
        {!isLoading && (
          <>
            {displayImages.length > 0 ? (
              <div className="flex flex-col items-center gap-6 sm:gap-12 w-full">
                {preview ? (
                  <>
                    {/* Mobile Only (under 768px): 1 card autoplay slider */}
                    <div className="block md:hidden relative w-full aspect-[16/10] max-w-[340px] mx-auto overflow-hidden rounded-2xl border border-white/10 bg-[#151515] shadow-lg cursor-pointer">
                      <motion.div
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        onDragEnd={handleHighlightDragEnd}
                        className="w-full h-full relative"
                      >
                        <AnimatePresence mode="wait">
                          {displayImages.map((img, idx) => {
                            if (idx !== activeHighlightIdx) return null;
                            return (
                              <motion.div
                                key={img.src}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.4 }}
                                onClick={() => openLightbox(idx)}
                                className="absolute inset-0 w-full h-full flex flex-col justify-between"
                              >
                                {/* Thumbnail Container */}
                                <div className="relative w-full h-full bg-[#151515]">
                                  {img.type === "video" ? (
                                    <div className="relative w-full h-full bg-black flex items-center justify-center">
                                      <MemoizedGalleryVideo src={img.src} />
                                      <div className="absolute w-8 h-8 rounded-full bg-gold/90 text-black flex items-center justify-center shadow-lg z-20">
                                        <Play className="w-4 h-4 fill-current ml-0.5" />
                                      </div>
                                    </div>
                                  ) : (
                                    <Image
                                      src={img.src}
                                      alt={img.title}
                                      fill
                                      sizes="(max-width: 768px) 340px, 340px"
                                      className="object-cover"
                                    />
                                  )}
                                  {/* Premium subtle default black overlay (20% opacity) */}
                                  <div className="absolute inset-0 bg-black/20 pointer-events-none z-10" />
                                </div>
                              </motion.div>
                            );
                          })}
                        </AnimatePresence>
                      </motion.div>

                      {/* Pagination Dots */}
                      <div className="absolute bottom-4 right-4 flex gap-1.5 z-20">
                        {displayImages.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveHighlightIdx(idx);
                            }}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${activeHighlightIdx === idx ? "w-5 bg-gold" : "bg-white/20"
                              }`}
                            aria-label={`Go to slide ${idx + 1}`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Desktop Only (768px and above): 3 cards grid */}
                    <div className="hidden md:grid md:grid-cols-3 gap-8 w-full">
                      {displayImages.map((img, displayIdx) => (
                        <motion.div
                          key={img.src}
                          initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                          animate={isMobile ? { opacity: 1, y: 0 } : undefined}
                          whileInView={isMobile ? undefined : { opacity: 1, y: 0 }}
                          viewport={isMobile ? undefined : { once: true }}
                          transition={{ duration: 0.6 }}
                          onClick={() => openLightbox(displayIdx)}
                          className="group relative aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer border border-white/10 bg-[#151515] shadow-lg"
                        >
                          <div className="relative w-full h-full bg-[#151515]">
                            {!loadedMedia[img.src] && (
                              <div className="absolute inset-0 bg-[#151515] skeleton-shimmer z-25" />
                            )}
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/5 transition-colors duration-500 z-10 pointer-events-none" />
                            {img.type === "video" ? (
                              <div className="relative w-full h-full bg-black flex items-center justify-center">
                                <video
                                  src={img.src}
                                  className="w-full h-full object-cover transition-all duration-700 no-controls"
                                  muted
                                  // @ts-ignore
                                  defaultmuted="true"
                                  playsInline
                                  controls={false}
                                  disablePictureInPicture={true}
                                  preload="metadata"
                                />
                                <div className="absolute w-14 h-14 rounded-full bg-gold/90 text-black flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-white transition-all duration-300 z-20">
                                  <Play className="w-6 h-6 fill-current ml-0.5" />
                                </div>
                              </div>
                            ) : (
                              <Image
                                src={img.src}
                                alt={img.title}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                                className="object-cover transition-all duration-700 group-hover:scale-[1.025]"
                              />
                            )}
                          </div>

                          {/* Hover Glassmorphic Overlay */}
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6 z-10">
                            <div className="flex justify-end">
                              <div className="w-10 h-10 rounded-full bg-gold/90 text-black flex items-center justify-center shadow-md">
                                {img.type === "video" ? <Play className="w-4 h-4 fill-current ml-0.5" /> : <Eye className="w-5 h-5" />}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </>
                ) : (
                  /* Gallery Page Grid: 3 columns on mobile, 2 columns on tablet, 3 on desktop */
                  <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-1.5 sm:gap-8 w-full">
                    {displayImages.map((img, displayIdx) => (
                      <motion.div
                        key={img.src}
                        initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        animate={isMobile ? { opacity: 1, y: 0 } : undefined}
                        whileInView={isMobile ? undefined : { opacity: 1, y: 0 }}
                        viewport={isMobile ? undefined : { once: true }}
                        transition={{ duration: isMobile ? 0.45 : 0.6 }}
                        onClick={() => openLightbox(displayIdx)}
                        className="group relative aspect-square md:aspect-[4/3] rounded-lg sm:rounded-3xl overflow-hidden cursor-pointer border border-white/10 bg-[#151515] shadow-lg"
                      >
                        {/* Thumbnail Container */}
                        <div className="relative w-full h-full bg-[#151515]">
                          {!loadedMedia[img.src] && (
                            <div className="absolute inset-0 bg-[#151515] skeleton-shimmer z-25" />
                          )}

                          {/* Premium subtle default black overlay (20% to 5% on hover) */}
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/5 transition-colors duration-500 z-10 pointer-events-none" />

                          {img.type === "video" ? (
                            <div className="relative w-full h-full bg-black flex items-center justify-center">
                              <video
                                src={img.src}
                                className={`w-full h-full object-cover transition-all duration-700 no-controls ${loadedMedia[img.src] ? "opacity-75 scale-100 group-hover:scale-102" : "opacity-0 scale-95"
                                  }`}
                                muted
                                // @ts-ignore
                                defaultmuted="true"
                                playsInline
                                controls={false}
                                disablePictureInPicture={true}
                                preload="metadata"
                                onLoadedData={() => setLoadedMedia((prev) => ({ ...prev, [img.src]: true }))}
                              />
                              <div className="absolute w-8 h-8 sm:w-14 sm:h-14 rounded-full bg-gold/90 text-black flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-white transition-all duration-300 z-20">
                                <Play className="w-3.5 h-3.5 sm:w-6 sm:h-6 fill-current ml-0.5" />
                              </div>
                            </div>
                          ) : (
                            <Image
                              src={img.src}
                              alt={img.title}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              className={`object-cover transition-all duration-700 group-hover:scale-[1.025] ${loadedMedia[img.src] ? "opacity-100 scale-100" : "opacity-0 scale-95"
                                }`}
                              onLoad={() => setLoadedMedia((prev) => ({ ...prev, [img.src]: true }))}
                            />
                          )}
                        </div>

                        {/* Hover Glassmorphic Overlay (Desktop only) */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-col justify-between p-6 z-10 hidden sm:flex">
                          <div className="flex justify-end">
                            <div className="w-10 h-10 rounded-full bg-gold/90 text-black flex items-center justify-center shadow-md">
                              {img.type === "video" ? <Play className="w-4 h-4 fill-current ml-0.5" /> : <Eye className="w-5 h-5" />}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Homepage Preview View Button */}
                {preview && validImages.length > 3 && (
                  <motion.div
                    initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    animate={isMobile ? { opacity: 1, y: 0 } : undefined}
                    whileInView={isMobile ? undefined : { opacity: 1, y: 0 }}
                    viewport={isMobile ? undefined : { once: true }}
                    className="mt-2 sm:mt-6"
                  >
                    <Link
                      href="/gallery"
                      className="flex items-center gap-2 font-sans font-bold text-xs sm:text-sm tracking-wider text-black bg-gold hover:bg-gold-hover px-6 py-3 sm:px-8 sm:py-4 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(200,168,78,0.15)] cursor-pointer select-none"
                    >
                      <span>View Complete Gallery</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </motion.div>
                )}
              </div>
            ) : (
              /* Premium Minimalist Empty State (capacity-centric) */
              <div className="flex flex-col items-center gap-8 w-full max-w-xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-3xl border border-gold/20 p-8 sm:p-12 text-center bg-[#151515]/50 backdrop-blur-md relative overflow-hidden w-full"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(#FF8A00_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.03] pointer-events-none" />
                  <ImageIcon className="w-10 h-10 sm:w-12 sm:h-12 text-gold/30 mx-auto mb-4 sm:mb-6" />
                  <h3 className="font-display text-base sm:text-lg font-bold text-white mb-2">
                    Fleet Images Coming Soon
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-secondary leading-relaxed mb-6">
                    Fleet images will be added soon.
                  </p>

                  {!preview ? (
                    <div className="bg-black/50 border border-white/5 py-4 px-5 rounded-xl font-mono text-[10px] sm:text-xs text-gold/90 text-left select-all">
                      📁 public/gallery/<br />
                      &nbsp;&nbsp;├── 44-seater/ (for 44 Seater)<br />
                      &nbsp;&nbsp;├── 50-seater/ (for 50 Seater)<br />
                      &nbsp;&nbsp;├── 61-seater/ (for 61 Seater)<br />
                      &nbsp;&nbsp;└── 66-seater/ (for 66 Seater)
                    </div>
                  ) : (
                    <p className="text-xs text-gold font-medium">Ready for fleet capacity visuals</p>
                  )}
                </motion.div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {activeIdx !== null && displayImages.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/98 backdrop-blur-xl select-none"
            onClick={closeLightbox}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Top Bar controls */}
            <div className="absolute top-6 right-6 z-10 flex items-center gap-4">
              <span className="text-xs text-white/50 tracking-widest font-sans">
                {activeIdx + 1} / {displayImages.length}
              </span>
              <button
                onClick={closeLightbox}
                className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white hover:text-gold border border-white/10 hover:border-gold/30 transition-colors"
                aria-label="Close Lightbox"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Left Control */}
            <button
              onClick={showPrev}
              className="absolute left-6 p-4 rounded-full bg-white/5 hover:bg-white/10 text-white hover:text-gold border border-white/10 hover:border-gold/30 transition-all z-10 hidden sm:block"
              aria-label="Previous Media"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Media display container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-4xl max-h-[80vh] w-full p-4 flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {displayImages[activeIdx].type === "video" ? (
                <video
                  src={displayImages[activeIdx].src}
                  autoPlay
                  muted
                  // @ts-ignore
                  defaultmuted="true"
                  loop
                  playsInline
                  // @ts-ignore
                  webkit-playsinline="true"
                  controls={false}
                  disablePictureInPicture={true}
                  controlsList="nodownload nofullscreen noremoteplayback"
                  onContextMenu={(e) => e.preventDefault()}
                  className="max-w-full max-h-[70vh] rounded-2xl border border-white/10 shadow-2xl pointer-events-none"
                />
              ) : (
                <Image
                  src={displayImages[activeIdx].src}
                  alt={displayImages[activeIdx].title}
                  width={1200}
                  height={800}
                  className="max-w-full max-h-[70vh] w-auto h-auto object-contain rounded-2xl border border-white/10 shadow-2xl"
                  priority
                />
              )}


            </motion.div>

            {/* Right Control */}
            <button
              onClick={showNext}
              className="absolute right-6 p-4 rounded-full bg-white/5 hover:bg-white/10 text-white hover:text-gold border border-white/10 hover:border-gold/30 transition-all z-10 hidden sm:block"
              aria-label="Next Media"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
