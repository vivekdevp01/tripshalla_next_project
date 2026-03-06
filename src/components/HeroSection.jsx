"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  {
    image: "/assets/1.jpg",
    heading: "Discover",
    highlight: "Rishikesh",
    subheading: "Beyond The Ordinary",
    desc: "From adrenaline-filled adventures and riverside camping to scenic stays — experience travel crafted for thrill, comfort and unforgettable memories.",
  },
  {
    image: "/assets/21.webp",
    heading: "Conquer",
    highlight: "The Rapids",
    subheading: "Of The Holy Ganga",
    desc: "Grade III+ white water rafting from Marine Drive to Rishikesh. Certified guides, best safety gear, unforgettable rush.",
  },
  {
    image: "/assets/101.webp",
    heading: "Take The",
    highlight: "Leap",
    subheading: "At 109 Metres",
    desc: "India's highest water-touch bungee jump at Splash Bungy Rishikesh. Free DSLR video included. Are you ready?",
  },
  {
    image: "/assets/camp1.webp",
    heading: "Sleep Under",
    highlight: "The Stars",
    subheading: "By The Ganga",
    desc: "Luxury riverside camping with bonfires, stargazing and adventure activities. The perfect escape from the city.",
  },
];

export default function HeroSection() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

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
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
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
      <div className="relative z-10 max-w-7xl mx-auto h-full px-6 flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
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
            <div className="mt-8 flex gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? "w-8 bg-amber-400" : "w-3 bg-white/40"}`}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}