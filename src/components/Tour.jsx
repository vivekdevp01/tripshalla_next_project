"use client";

import { useParams } from "next/navigation";
import campDetails from "../json/campDetails.json";
import campPricing from "../json/campPricing.json";

import Header from "./Header";
import ExplorationGrid from "./ExplorationGrid";
import TripItinerary from "./TripItinerary";
import PackageSummary from "./PackageSummary";
import PolicyAccordion from "./PolicyAccordion";
import FAQs from "./Packages/Faqs";
import PriceCard from "./Packages/PriceCard";
import EnquiryCard from "./Packages/EnquiryCard";
import GotAQuestionCard from "./Packages/GotQuestionCard";
import GroupOfferCard from "./Packages/GroupOfferCard";
import WhyChooseUs from "./Packages/WhyChooseUs";
import StickyWhatsApp from "./Packages/StickyWhatsappButton";
import CorporateCollaborationCard from "./CorporateCollaborationCard";

export default function CampPage() {
  const { slug } = useParams();

  const pkg = campDetails[slug];
  const pricingOptions = campPricing[slug] || [];

  if (!pkg) return <div className="p-10">Camp not found</div>;

  const bestPricing =
    pricingOptions.length > 0
      ? [...pricingOptions].sort((a, b) => a.final_price - b.final_price)[0]
      : pkg.pricing_preview;

  const heroImage =
    pkg.media?.find((m) => m.media_role === "hero_banner")?.media_url ||
    pkg.media?.[0]?.media_url;

  return (
    <main className="bg-[#F8FAFC]">
      {/* HEADER */}
      <Header
        variant="tour"
        title={pkg.name}
        subtitle={`📍 ${pkg.location}`}
        badges={[
          `${pkg.duration.days} Days`,
          `${pkg.duration.nights} Night`,
          "CAMP",
        ]}
        bgImage={heroImage}
      />

      <ExplorationGrid media={pkg.media} />

      <section className="max-w-7xl mx-auto px-4 md:px-6 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-14">
          {/* LEFT SIDE */}
          <div className="lg:col-span-2 space-y-14">
            {/* TITLE BLOCK */}
            <div className="bg-white rounded-3xl p-10 border border-gray-100 shadow-sm">
              <h2 className="text-3xl font-bold text-gray-900 leading-snug">
                {pkg.name}
              </h2>

              <p className="text-orange-500 mt-3 text-base">{pkg.tagline}</p>

              <div className="flex gap-3 mt-8 flex-wrap">
                <Badge>{pkg.duration.days} Days</Badge>
                <Badge>{pkg.duration.nights} Night</Badge>
                <Badge>All Seasons</Badge>
              </div>
            </div>

            {/* QUICK INFO */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <InfoBox label="Best Time" value={pkg.best_time} />
              <InfoBox label="Capacity" value={`${pkg.capacity}+ Guests`} />
              <InfoBox label="Check-in" value={pkg.check_in} />
              <InfoBox label="Check-out" value={pkg.check_out} />
            </div>

            {/* HIGHLIGHTS */}
            <SectionCard title="Camp Highlights">
              <div className="grid md:grid-cols-2 gap-4">
                {pkg.amenities.map((item, i) => (
                  <HighlightItem key={i} text={item} />
                ))}
              </div>
            </SectionCard>

            {/* IDEAL FOR */}
            <SectionCard title="Ideal For">
              <div className="flex flex-wrap gap-3">
                {pkg.ideal_for.map((item, i) => (
                  <span
                    key={i}
                    className="px-5 py-2 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 rounded-full text-sm font-medium shadow-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </SectionCard>

            {/* IMPORTANT NOTES */}
            <SectionCard title="Important Notes">
              <div className="space-y-4">
                {pkg.booking_notes.map((note, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100"
                  >
                    <span className="text-orange-500 mt-1">•</span>
                    <p className="text-sm text-gray-700">{note}</p>
                  </div>
                ))}
              </div>
            </SectionCard>

            <CorporateCollaborationCard />

            {/* ITINERARY */}
            <SectionCard title="Day-wise Itinerary">
              <TripItinerary days={pkg.itinerary} />
            </SectionCard>
          </div>

          {/* RIGHT SIDEBAR */}
          <aside className="hidden lg:block">
            <div className="space-y-10 sticky top-32">
              <PriceCard pricing={bestPricing} />
              <GotAQuestionCard />
              <GroupOfferCard />
              <WhyChooseUs />
              <EnquiryCard />
            </div>
          </aside>
        </div>
      </section>

      {/* SEPARATOR */}
      <div className="flex items-center justify-center mt-24 mb-12">
        <div className="h-px w-32 bg-orange-300" />
        <span className="mx-6 text-orange-500 font-semibold text-lg">
          End of Trip
        </span>
        <div className="h-px w-32 bg-orange-300" />
      </div>

      {/* INCLUSIONS */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <PackageSummary
            inclusions={pkg.inclusions}
            exclusions={pkg.exclusions}
          />
        </div>
      </section>

      {/* POLICIES */}
      <section className="bg-[#F8FAFC] py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <PolicyAccordion policies={pkg.policies || []} />
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <FAQs title={pkg.name} type="camp" faqs={pkg.faqs} />
        </div>
      </section>

      <StickyWhatsApp />
    </main>
  );
}

/* UI COMPONENTS */

function SectionCard({ title, children }) {
  return (
    <div className="bg-white rounded-3xl p-10 border border-gray-100 shadow-sm">
      <h3 className="text-2xl font-semibold mb-8 text-gray-900">{title}</h3>
      {children}
    </div>
  );
}

function InfoBox({ label, value }) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition">
      <p className="text-xs uppercase tracking-wider text-gray-400">{label}</p>
      <p className="mt-2 font-semibold text-gray-900 text-lg">{value}</p>
    </div>
  );
}

function HighlightItem({ text }) {
  return (
    <div className="bg-green-50 border border-green-100 text-green-700 px-4 py-3 rounded-xl text-sm font-medium shadow-sm">
      ✓ {text}
    </div>
  );
}

function Badge({ children }) {
  return (
    <span className="px-5 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
      {children}
    </span>
  );
}
