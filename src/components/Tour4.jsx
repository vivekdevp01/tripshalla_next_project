'use client'
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { HiOutlineShieldCheck, HiOutlineVideoCamera } from "react-icons/hi";
import { MdOutlineTimer } from "react-icons/md";

import Header from "./Header";
import ExplorationGrid from "./ExplorationGrid";
import TourDetails from "./TourDetails";
import TripItinerary from "./TripItinerary";
import PackageSummary from "./PackageSummary";
import PolicyAccordion from "./PolicyAccordion";
import EnquiryCard from "./Packages/EnquiryCard";
import WhyChooseUs from "./Packages/WhyChooseUs";
import GotAQuestionCard from "./Packages/GotQuestionCard";
import GroupOfferCard from "./Packages/GroupOfferCard";
import FAQs from "./Packages/Faqs";
import StickyWhatsApp from "./Packages/StickyWhatsappButton";
import PriceCard from "./Packages/PriceCard";
import CorporateCollaborationCard from "./CorporateCollaborationCard";
import comboPackages from "../json/comboPackages.json";

export default function Tour4() {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);

  const pkg = comboPackages.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, [slug]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-emerald-600 font-bold">
        Loading Combo...
      </div>
    );
  }

  if (!pkg) {
    return (
      <div className="h-screen flex items-center justify-center text-red-500 font-bold">
        Combo package not found
      </div>
    );
  }

  const heroImage = pkg.media[0]?.media_url;

  return (
    <main className="bg-[#FAFAFA]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TouristAttraction",
          "name": pkg.name,
          "description": pkg.tagline,
          "url": `https://www.tripshalla.in/combo/${slug}`,
          "image": heroImage,
          "offers": {
            "@type": "Offer",
            "price": pkg.price,
            "priceCurrency": "INR",
            "availability": "https://schema.org/InStock"
          },
          "provider": {
            "@type": "Organization",
            "name": "Tripshalla",
            "url": "https://www.tripshalla.in"
          }
        })}}
      />

      <Header
        variant="tour"
        title={pkg.name}
        subtitle={`📍 ${pkg.location}`}
        badges={[pkg.display_metric, pkg.duration, `Age: ${pkg.minimum_age}+`]}
        bgImage={heroImage}
      />

      <ExplorationGrid media={pkg.media} />

      <section className="max-w-7xl mx-auto px-4 md:px-6 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-14">
            <TourDetails
              title={pkg.name}
              highlight={pkg.tagline}
              summary={[pkg.display_metric, pkg.duration, `Age: ${pkg.minimum_age}+`]}
              amenities={[
                { icon: <MdOutlineTimer />, label: pkg.duration },
                { icon: <HiOutlineShieldCheck />, label: "Certified Safety" },
                { icon: <HiOutlineVideoCamera />, label: "Video Included" },
              ]}
              durations={[{
                id: pkg.id,
                title: "Combo Package",
                final_price: pkg.price,
                image: pkg.media[1]?.media_url || heroImage,
              }]}
            />

            {/* WHAT'S INCLUDED */}
            <section className="bg-white rounded-3xl p-6 md:p-8 shadow-sm">
              <h3 className="text-2xl font-bold mb-6">This Combo Includes</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {pkg.includes.map((item) => (
                  <div key={item.slug} className="border border-slate-200 rounded-2xl p-5 hover:shadow-md transition">
                    <h4 className="font-extrabold text-lg text-orange-500">{item.name}</h4>
                    <p className="text-sm text-slate-600 mt-2">{item.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <CorporateCollaborationCard />

            <section id="itinerary-end" className="bg-white rounded-3xl p-6 md:p-8 shadow-sm">
              <h3 className="text-2xl font-bold mb-6">Your Combo Experience</h3>
              <TripItinerary
                days={pkg.experience_flow.map((step) => ({
                  day: step.step,
                  title: step.title,
                  description: step.description,
                }))}
              />
            </section>
          </div>

          <aside className="hidden lg:block">
            <div className="h-full flex flex-col">
              <div className="space-y-8 mb-8">
                <PriceCard pricing={{ final_price: pkg.price, discount_price: pkg.oldPrice }} />
                <GotAQuestionCard />
                <GroupOfferCard />
                <WhyChooseUs />
              </div>
              <div className="sticky top-24 self-start w-full">
                <EnquiryCard />
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="mt-14">
        <section className="bg-[#FFF7ED] py-10">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <PackageSummary inclusions={pkg.inclusions} exclusions={pkg.exclusions} />
            <div className="mt-8 lg:hidden">
              <PriceCard pricing={{ final_price: pkg.price, discount_price: pkg.oldPrice }} />
            </div>
          </div>
        </section>

        <section className="bg-white py-10">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <PolicyAccordion policies={pkg.policies} />
          </div>
        </section>

        <section className="bg-[#FAFAFA] py-10">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <FAQs title={pkg.name} type="Combo" faqs={pkg.faqs} />
          </div>
        </section>
      </section>

      <StickyWhatsApp />
    </main>
  );
}