"use client";
import React, { useState, useRef } from "react";
import { Star, Zap, ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import EnquiryModal from "./Packages/EnquiryModal";
import comboPackages from "../json/comboPackages.json";
import HeroHeader from "./HeroHeader";

export default function ComboGrid() {
  const [visibleCount, setVisibleCount] = useState(6);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState(null);
  const gridTopRef = useRef(null);
  const router = useRouter();

  const comboSlides = [
  {
    url: "/assets/combo1.webp",
    tagline: "GET MORE FOR LESS WITH",
    title: "Combo Adventure Packages",
    discount: "SAVE UP TO 40%",
    price: "4,499",
  },
  {
    url: "/assets/combo2.webp",
    tagline: "CONQUER EVERYTHING WITH",
    title: "Ultimate Adventure Combo",
    discount: "3 ACTIVITIES",
    price: "5,499",
  },
  {
    url: "/assets/combo3.webp",
    tagline: "RISHIKESH BEST DEAL",
    title: "Rafting + Bungee Combo",
    discount: "FULL DAY ADVENTURE",
    price: "4,499",
  },
];

  return (
    <>
      <HeroHeader slides={comboSlides} />
      <section className="max-w-7xl mx-auto px-6 py-16 bg-white">
        <div ref={gridTopRef} />

        {/* HEADING */}
        <div className="mb-12 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter">
            COMBO <span className="text-emerald-600">PACKAGES</span>
          </h2>
          <p className="text-gray-500 text-sm mt-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            SHIVPURI, RISHIKESH — SAVE MORE WITH COMBOS
          </p>
        </div>

        {/* GRID */}
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {comboPackages.slice(0, visibleCount).map((pkg) => (
            <motion.div
              key={pkg.id}
              onClick={() => router.push(`/combos/${pkg.slug}`)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              whileTap={{ scale: 0.97 }}
              className="relative rounded-[2.5rem] overflow-hidden shadow-2xl cursor-pointer group h-[520px]"
            >
              <img
                src={pkg.image}
                alt={pkg.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:from-emerald-950 transition-colors duration-500" />

              <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-amber-400 text-black text-[10px] font-black px-3 py-1.5 rounded-full flex items-center gap-1 uppercase tracking-widest">
                    <Zap size={10} fill="currentColor" /> {pkg.display_metric}
                  </div>
                  <span className="flex items-center gap-1 text-xs bg-white/20 backdrop-blur-md px-2 py-1 rounded-full font-bold">
                    <Star size={14} className="text-yellow-400 fill-yellow-400" />
                    {pkg.rating}
                  </span>
                </div>

                <h3 className="text-3xl font-black mb-2 group-hover:text-amber-400 transition-colors uppercase leading-tight">
                  {pkg.name}
                </h3>
                <p className="text-sm opacity-80 mb-6 font-medium leading-snug">
                  {pkg.tagline}
                </p>

                {/* Includes pills */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {pkg.includes.map((item) => (
                    <span key={item.slug} className="text-[10px] bg-white/20 backdrop-blur-md px-2 py-1 rounded-full font-bold">
                      {item.name}
                    </span>
                  ))}
                </div>

                <div className="flex items-end justify-between mb-6">
                  <div className="flex flex-col gap-1">
                    {pkg.oldPrice && (
                      <span className="text-sm text-red-400 line-through opacity-80">
                        ₹{pkg.oldPrice}
                      </span>
                    )}
                    <div className="flex items-end gap-2">
                      <span className="text-4xl font-extrabold text-amber-400">
                        ₹{pkg.price}
                      </span>
                      <span className="text-xs text-white/70 mb-1">/ person</span>
                    </div>
                  </div>
                  {pkg.oldPrice && (
                    <div className="px-4 py-1.5 rounded-full bg-amber-400 text-black text-xs font-bold shadow-lg">
                      SAVE {Math.round(((pkg.oldPrice - pkg.price) / pkg.oldPrice) * 100)}%
                    </div>
                  )}
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPackageId(pkg.id);
                    setIsModalOpen(true);
                  }}
                  className="w-full bg-white text-emerald-950 font-black py-4 rounded-2xl hover:bg-amber-400 hover:text-black transition-all transform active:scale-95 text-center"
                >
                  BOOK NOW
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* SHOW MORE/LESS */}
        <div className="mt-16 flex flex-col items-center gap-4">
          {visibleCount < comboPackages.length ? (
            <button
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="group flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:bg-emerald-600 transition-all shadow-xl active:scale-95"
            >
              VIEW ALL COMBOS <ChevronDown className="group-hover:translate-y-1 transition-transform" />
            </button>
          ) : (
            visibleCount > 6 && (
              <button
                onClick={() => {
                  setVisibleCount(6);
                  gridTopRef.current?.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex items-center gap-2 text-slate-400 hover:text-emerald-600 font-bold transition-colors py-4"
              >
                <ChevronUp size={20} /> SHOW LESS
              </button>
            )
          )}
        </div>

        <EnquiryModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          packageId={selectedPackageId}
        />
      </section>
    </>
  );
}