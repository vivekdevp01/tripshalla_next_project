import { motion } from "framer-motion";
import { Heart, Star, PhoneCall, BadgeCheck } from "lucide-react";

const items = [
  {
    title: "Trusted by Travelers",
    desc: "Hundreds of happy guests enjoying safe and memorable experiences.",
    icon: Heart,
  },
  {
    title: "Highly Rated Experiences",
    desc: "Consistently appreciated for quality, safety and smooth bookings.",
    icon: Star,
  },
  {
    title: "Carefully Curated",
    desc: "Only verified camps, stays and adventure partners.",
    icon: BadgeCheck,
  },
  {
    title: "On-Trip Support",
    desc: "We stay connected with you throughout your journey.",
    icon: PhoneCall,
  },
];

export default function WhyChooseHimalayan() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-14">
          Why Choose Tripshalla
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="group"
            >
              {/* Icon */}
              <div
                className="w-16 h-16 mb-6 flex items-center justify-center
                           rounded-2xl bg-orange-50 text-orange-500
                           group-hover:bg-orange-100 transition"
              >
                <item.icon size={28} />
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-slate-600 leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
