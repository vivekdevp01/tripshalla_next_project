"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import {
  HiOutlinePhotograph,
  HiX,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi";

export default function ExplorationGrid({ media = [], loading = "lazy" }) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.25 });
  const controls = useAnimation();

  const [activeIndex, setActiveIndex] = useState(null);
  const [imageErrors, setImageErrors] = useState({});

  useEffect(() => {
    if (isInView) controls.start("show");
  }, [isInView, controls]);

  // ---------- MEDIA GROUPING ----------
  // Filter out null/undefined URLs
  const validMedia = media.filter((m) => m?.media_url);

  const hero =
    validMedia.find((m) => m.media_role === "hero_banner") ||
    validMedia.find((m) => m.media_role === "hero");
  const destination = validMedia.find((m) => m.media_role === "destination");
  const stay = validMedia.find((m) => m.media_role === "stay");
  const activity = validMedia.find((m) => m.media_role === "activity");
  const gallery = validMedia.filter((m) => m.media_role === "gallery");

  const previewItems = [
    hero?.media_url,
    destination?.media_url,
    stay?.media_url,
    activity?.media_url,
    gallery?.[0]?.media_url,
  ].filter(Boolean);

  const allImages = validMedia.map((m) => m.media_url).filter(Boolean);

  // If no images, return null
  if (allImages.length === 0) {
    return null;
  }

  // ---------- NAVIGATION ----------
  const nextImage = () =>
    setActiveIndex((prev) => (prev + 1) % allImages.length);

  const prevImage = () =>
    setActiveIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));

  // ---------- KEYBOARD ----------
  useEffect(() => {
    function handleKey(e) {
      if (activeIndex === null) return;
      if (e.key === "Escape") setActiveIndex(null);
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeIndex, allImages.length]);

  // ---------- SCROLL LOCK ----------
  useEffect(() => {
    if (activeIndex !== null) {
      document.documentElement.style.overflow = "hidden"; // html
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    }

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, [activeIndex]);
  // ---------- IMAGE ERROR HANDLER ----------
  const handleImageError = (index) => {
    console.error(
      `Image failed to load at index ${index}: ${allImages[index]}`,
    );
    setImageErrors((prev) => ({ ...prev, [index]: true }));
  };

  // ---------- FALLBACK IMAGE ----------
  const fallbackImage =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23f0f0f0' width='400' height='300'/%3E%3Ctext x='50%' y='50%' font-size='16' fill='%23999' text-anchor='middle' dominant-baseline='middle'%3EImage unavailable%3C/text%3E%3C/svg%3E";

  // ---------- ANIMATION ----------
  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 30 },
    show: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <>
      {/* ================= GRID ================= */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6" ref={containerRef}>
          <div className="mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800">
              About This Trip
            </h2>
            <p className="text-slate-500 mt-3 max-w-2xl">
              Destinations, stays, and experiences you'll enjoy on this journey.
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="
  grid gap-4
  grid-cols-1
  md:grid-cols-4 md:grid-rows-2
  auto-rows-[250px]
  md:h-[640px]
"
          >
            {/* HERO IMAGE */}
            {previewItems[0] && (
              <motion.div
                key="hero-image"
                variants={itemVariants}
                onClick={() => setActiveIndex(0)}
                className="md:col-span-2 md:row-span-2 rounded-3xl overflow-hidden cursor-pointer group shadow-xl relative bg-gray-200"
              >
                <img
                  src={imageErrors[0] ? fallbackImage : previewItems[0]}
                  alt="Trip highlights"
                  loading={loading === "eager" ? "eager" : "lazy"}
                  onError={() => handleImageError(0)}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <span className="absolute bottom-6 left-6 text-white text-xl font-bold">
                  Trip Highlights
                </span>
              </motion.div>
            )}

            {/* SMALL CARDS */}
            {previewItems.slice(1, 4).map((src, i) => (
              <motion.div
                key={`preview-${i}`}
                variants={itemVariants}
                onClick={() => setActiveIndex(i + 1)}
                className="rounded-3xl overflow-hidden cursor-pointer group shadow-lg relative bg-gray-200"
              >
                <img
                  src={imageErrors[i + 1] ? fallbackImage : src}
                  alt={`Trip preview ${i + 1}`}
                  loading={loading === "eager" ? "eager" : "lazy"}
                  onError={() => handleImageError(i + 1)}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />
                <div className="absolute inset-0 bg-black/40" />
              </motion.div>
            ))}

            {/* VIEW ALL */}
            {gallery.length > 0 && gallery[0]?.media_url && (
              <motion.div
                key="gallery-view-all"
                variants={itemVariants}
                onClick={() => setActiveIndex(0)}
                className="rounded-3xl overflow-hidden cursor-pointer shadow-lg relative bg-gray-200"
              >
                <img
                  src={imageErrors[4] ? fallbackImage : gallery[0].media_url}
                  alt="View all photos"
                  loading={loading === "eager" ? "eager" : "lazy"}
                  onError={() => handleImageError(4)}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white">
                  <HiOutlinePhotograph className="text-4xl mb-2" />
                  <span className="font-semibold text-lg">View All Photos</span>
                  <span className="text-sm opacity-80">
                    {allImages.length} Images
                  </span>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ================= FULLSCREEN MODAL ================= */}
      {activeIndex !== null && allImages[activeIndex] && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          onClick={() => setActiveIndex(null)}
        >
          {/* LEFT */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-6 text-white text-5xl hover:scale-110 transition z-10"
            aria-label="Previous image"
          >
            <HiChevronLeft />
          </button>

          {/* IMAGE */}
          <img
            src={
              imageErrors[activeIndex] ? fallbackImage : allImages[activeIndex]
            }
            alt={`Full screen image ${activeIndex + 1} of ${allImages.length}`}
            loading="eager"
            onError={() => handleImageError(activeIndex)}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] max-w-[90vw] rounded-2xl shadow-2xl bg-gray-800"
          />

          {/* RIGHT */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-6 text-white text-5xl hover:scale-110 transition z-10"
            aria-label="Next image"
          >
            <HiChevronRight />
          </button>

          {/* CLOSE */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveIndex(null);
            }}
            className="absolute top-6 right-6 text-white text-3xl z-10 hover:scale-110 transition"
            aria-label="Close image viewer"
          >
            <HiX />
          </button>

          {/* IMAGE COUNTER */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black/50 px-4 py-2 rounded-full">
            {activeIndex + 1} / {allImages.length}
          </div>
        </div>
      )}
    </>
  );
}
