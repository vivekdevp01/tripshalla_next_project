"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  {
    image: "/assets/63.jpg",
    heading: "Explore",
    highlight: "Rishikesh",
    subheading: "Adventure Capital of India",
    desc: "Experience rafting, camping, bungee jumping and breathtaking Himalayan views — all curated by local experts.",
  },
  {
    image: "/assets/rafting1.webp",
    heading: "Ride The",
    highlight: "Ganga Rapids",
    subheading: "White Water Rafting",
    desc: "Thrilling Grade III+ rafting from Marine Drive to Rishikesh with certified guides, premium safety gear and unforgettable adventure.",
  },
  {
    image: "/assets/adv5.webp",
    heading: "India's Highest",
    highlight: "Bungee Jump",
    subheading: "109 Metres Of Pure Adrenaline",
    desc: "Take the ultimate leap in Rishikesh with India's highest water-touch bungee jump — including free HD video.",
  },
  {
    image: "/assets/campingg2.webp",
    heading: "Luxury",
    highlight: "Riverside Camping",
    subheading: "Sleep Under The Stars",
    desc: "Bonfire nights, stargazing, music and riverside luxury camps — the perfect Himalayan escape.",
  },
];
export default function HeroSection() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goTo = (index) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  const handleScrollToExplore = () => {
    if (window.location.pathname === "/") {
      const element = document.getElementById("explore");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push("/#explore");
    }
  };

  const slide = slides[current];

  return (
    <section className="relative h-[90vh] w-full overflow-hidden">
      {/* Background Image */}
      <AnimatePresence mode="sync" custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          initial={{ x: direction > 0 ? "100%" : "-100%", opacity: 0.5 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: direction > 0 ? "-100%" : "100%", opacity: 0.5 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={slide.image}
            alt={slide.highlight}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto h-full px-6 flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            className="max-w-3xl text-white"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              {slide.heading}{" "}
              <span className="text-amber-400">{slide.highlight}</span>
              <br />
              {slide.subheading}
            </h1>

            <p className="mt-6 text-lg text-white/90">{slide.desc}</p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={handleScrollToExplore}
                className="bg-amber-400 text-teal-900 px-6 py-3 rounded-full font-semibold hover:bg-amber-300 transition"
              >
                Explore Experiences
              </button>

              <button
                onClick={() => router.push("/contact")}
                className="border border-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-teal-900 transition"
              >
                Plan My Trip
              </button>
            </div>

            {/* Dot indicators */}
            <div className="mt-8 flex gap-2 justify-center md:justify-start">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === current ? "w-8 bg-amber-400" : "w-3 bg-white/40"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
