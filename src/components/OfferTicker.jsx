"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const INITIAL_TIME = 5 * 60 * 60;

export default function OfferTicker() {
  const [secondsLeft, setSecondsLeft] = useState(INITIAL_TIME);
  const [booked, setBooked] = useState(14);

  /* TIMER */

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) return INITIAL_TIME;
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  /* FAKE SOCIAL PROOF INCREASE */

  useEffect(() => {
    const bookingTimer = setInterval(() => {
      setBooked((prev) => prev + Math.floor(Math.random() * 2));
    }, 25000);

    return () => clearInterval(bookingTimer);
  }, []);

  const hours = Math.floor(secondsLeft / 3600);
  const minutes = Math.floor((secondsLeft % 3600) / 60);
  const seconds = secondsLeft % 60;

  /* WHATSAPP CTA */

  const handleClaim = () => {
    const message =
      "Hi Tripshalla 👋\n\nI saw the *10% OFF Adventure Offer* on your website.\n\nI'd like to book using coupon code *TRIP10*.\n\nCan you share available activities?";

    const phone = "917454875874";

    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  return (
    // <div className="w-full bg-gradient-to-r from-[#064E3B] via-[#065F46] to-[#064E3B] border-y border-amber-400/40 overflow-hidden">
    <div className="w-full bg-[#064E3B] border-y border-amber-400/40 shadow-[0_4px_20px_rgba(251,191,36,0.15)] overflow-hidden">
      {/* URGENCY SCROLL */}

      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: "-100%" }}
        transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
        className="text-[10px] md:text-xs text-amber-300 whitespace-nowrap py-1 tracking-wide"
      >
        ⚡ Limited Time Deal • Only Few Slots Left • Book Your Adventure Today •
        Special Discount Ending Soon • Limited Slots Available •
      </motion.div>

      {/* MAIN BAR */}

      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-col md:flex-row items-center justify-between gap-2 text-white">
        {/* OFFER */}

        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex items-center gap-2 text-xs sm:text-sm md:text-base font-semibold text-center md:text-left"
        >
          <span className="text-lg">🔥</span>

          <span className="text-amber-300">
            FLAT <span className="text-white font-bold">10% OFF</span>
          </span>

          <span className="text-gray-200">ON ALL ADVENTURES</span>

          <span className="bg-amber-400 text-teal-900 font-bold px-2 py-1 rounded text-[10px] sm:text-xs">
            TRIP10
          </span>
        </motion.div>

        {/* RIGHT SIDE */}

        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
          {/* BOOKINGS */}

          <motion.div
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-[10px] sm:text-xs text-amber-300"
          >
            🔥 {booked}+ people booked today
          </motion.div>

          {/* TIMER */}

          <div className="flex gap-1 sm:gap-2 text-[10px] sm:text-xs md:text-sm font-semibold">
            <span className="bg-black/40 px-2 py-1 rounded text-amber-300">
              {hours}h
            </span>

            <span className="bg-black/40 px-2 py-1 rounded text-amber-300">
              {minutes}m
            </span>

            <span className="bg-black/40 px-2 py-1 rounded text-amber-300">
              {seconds}s
            </span>
          </div>

          {/* CTA */}

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleClaim}
            className="relative overflow-hidden bg-amber-400 text-teal-900 font-semibold px-3 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-sm"
          >
            Claim Offer
            <motion.span
              initial={{ x: "-120%" }}
              animate={{ x: "120%" }}
              transition={{
                repeat: Infinity,
                duration: 2.5,
                ease: "linear",
              }}
              className="absolute inset-0 bg-white/30 blur-md"
            />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
