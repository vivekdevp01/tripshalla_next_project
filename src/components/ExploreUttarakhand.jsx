"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mountain, Tent, Waves, Hotel, Bike, Kayak, ArrowRight } from "lucide-react";

const categories = [
  {
    title: "Trek",
    icon: Mountain,
    slug: "/treks",
    desc: "Himalayan treks & guided trails",
    color: "from-blue-500 to-blue-600",
    bgLight: "bg-blue-50",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    title: "Campings",
    icon: Tent,
    slug: "/packages/camp",
    desc: "Riverside & alpine camps",
    color: "from-orange-500 to-orange-600",
    bgLight: "bg-orange-50",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
  },
  {
    title: "Rafting",
    icon: Waves,
    slug: "/raftings",
    desc: "White water rafting in Rishikesh",
    color: "from-cyan-500 to-cyan-600",
    bgLight: "bg-cyan-50",
    iconBg: "bg-cyan-100",
    iconColor: "text-cyan-600",
  },
  {
    title: "Adventure",
    icon: Kayak,
    slug: "/bungee",
    desc: "Bungee, zipline & more",
    color: "from-purple-500 to-purple-600",
    bgLight: "bg-purple-50",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    title: "Hotels & Hostels",
    icon: Hotel,
    slug: "/stays",
    desc: "Budget to premium stays",
    color: "from-red-500 to-red-600",
    bgLight: "bg-red-50",
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
  },
  {
    title: "Bike & Scooty Rentals",
    icon: Bike,
    slug: "/guide",
    desc: "Easy local transport",
    color: "from-green-500 to-green-600",
    bgLight: "bg-green-50",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function ExploreUttarakhand() {
  const router = useRouter();

  return (
    <section id="explore" className="py-20 bg-gradient-to-b from-white via-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900">
            Explore <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Uttarakhand</span> With Us
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            From thrilling treks and cozy camps to exciting water sports — everything you need for your perfect Uttarakhand adventure.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <motion.button
                key={cat.title}
                variants={itemVariants}
                onClick={() => router.push(cat.slug)}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                whileTap={{ scale: 0.95 }}
                className="group relative h-full text-left"
              >
                {/* BACKGROUND GRADIENT EFFECT */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                {/* CARD */}
                <div className={`relative h-full rounded-3xl border-2 border-slate-200 ${cat.bgLight} p-8 transition-all duration-300 group-hover:border-orange-500 group-hover:shadow-2xl`}>
                  
                  {/* BADGE */}
                  <div className="mb-6">
                    <span className="inline-block px-3 py-1 text-xs font-bold text-orange-600 bg-orange-100 rounded-full">
                      Popular
                    </span>
                  </div>

                  {/* Icon Container */}
                  <motion.div
                    whileHover={{ rotate: 12, scale: 1.15 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className={`w-16 h-16 rounded-2xl ${cat.iconBg} ${cat.iconColor} flex items-center justify-center mb-6 transition-all duration-300 group-hover:shadow-lg`}
                  >
                    <Icon size={32} strokeWidth={1.5} />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-orange-600 transition-colors duration-300">
                    {cat.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6 min-h-[40px]">
                    {cat.desc}
                  </p>

                  {/* CTA BUTTON - Makes it CLEAR it's clickable */}
                  <div className="flex items-center gap-2 text-orange-600 font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                    <span>Explore Now</span>
                    <motion.div
                      whileHover={{ x: 4 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      <ArrowRight size={18} />
                    </motion.div>
                  </div>

                  {/* HOVER INDICATOR LINE */}
                  <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-b-3xl w-0 group-hover:w-full transition-all duration-500" />
                </div>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-slate-600 mb-4">
            Can't decide? Let us help you plan your perfect trip.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/contact")}
            className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-full hover:shadow-xl transition-shadow duration-300"
          >
            Get Expert Advice
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}