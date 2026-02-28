"use client";
import { useEffect, useState } from "react";
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
import { useParams } from "next/navigation";
import Header from "./Header";
import { HiOutlineCake, HiOutlineHome, HiOutlineMap } from "react-icons/hi";
import CorporateCollaborationCard from "./CorporateCollaborationCard";
import trekDetails from "../json/campDetails.json";
import trekPricing from "../json/campPricing.json";
import AdventureLoader from "./AdventureLoader";

export default function Tour() {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);

  const pkg = trekDetails[slug];
  const pricingOptions = trekPricing[slug] || [];

  useEffect(() => {
    // Simulate loading time for better UX
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [slug]);

  const bestPricing =
    pricingOptions.length > 0
      ? [...pricingOptions].sort((a, b) => a.final_price - b.final_price)[0]
      : pkg?.pricing_preview;

  const heroImage =
    pkg?.media?.find((m) => m.media_role === "hero_banner")?.media_url ||
    pkg?.media?.find((m) => m.media_role === "hero")?.media_url ||
    pkg?.media?.find((m) => m.media_role === "cover")?.media_url ||
    pkg?.media?.[0]?.media_url;

  if (!pkg) return <div className="p-10">Trek not found</div>;
  
  return (
    <AdventureLoader forceLoading={loading}>
      <main className="bg-[#FAFAFA]">
      {pkg && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TouristAttraction",
              name: pkg.name,
              description: pkg.tagline,
              url: `https://www.tripshalla.in/trek/${pkg.slug}`,
              image: heroImage,
              offers: {
                "@type": "Offer",
                price: bestPricing?.final_price,
                priceCurrency: "INR",
                availability: "https://schema.org/InStock",
              },
              aggregateRating: pkg.rating ? {
                "@type": "AggregateRating",
                ratingValue: pkg.rating,
                reviewCount: pkg.review_count || 10,
              } : undefined,
              provider: { "@type": "Organization", name: "Tripshalla", url: "https://www.tripshalla.in" },
            }),
          }}
        />
      )}

      {pkg && (
        <Header
          variant="tour"
          title={pkg.name}
          subtitle={`📍 ${pkg.location}`}
          badges={[
            `${pkg.duration_days} Days`,
            pkg.difficulty || "Easy",
            pkg.category?.toUpperCase(),
          ]}
          bgImage={heroImage}
        />
      )}

      <ExplorationGrid media={pkg?.media || []} />

      {/* ================= MAIN CONTENT + STICKY ================= */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* LEFT CONTENT */}
          <div className="lg:col-span-2 space-y-14">
     
            <TourDetails
              title={pkg?.name}
              highlight={pkg?.tagline}
              summary={[
                `${pkg?.duration_days} Days`,
                pkg?.difficulty || "Easy",
                pkg?.type?.toUpperCase(),
              ]}
              amenities={[
                { icon: <HiOutlineHome />, label: "Luxury Stay" },
                { icon: <HiOutlineCake />, label: "Meals Included" },
                { icon: <HiOutlineMap />, label: "Riverside Location" },
              ]}
              durations={pricingOptions.map((p) => ({
                id: p.id,
                title: p.title,
                final_price: Math.floor(p.final_price),
                image:
                  pkg?.media?.find((m) => m.media_role === "pricing")?.media_url ||
                  pkg?.media?.find((m) => m.media_role === "cover")?.media_url,
              }))}
              details={{
                best_time: pkg?.best_time,
                capacity: pkg?.capacity,
                check_in: pkg?.check_in,
                check_out: pkg?.check_out,
                amenities: pkg?.amenities,
                ideal_for: pkg?.ideal_for,
                booking_notes: pkg?.booking_notes,
              }}
            />
            <CorporateCollaborationCard />

            {/* 🔴 STICKY MUST STOP HERE */}
            <section
              id="itinerary-end"
              className="bg-white rounded-3xl p-6 md:p-8 shadow-sm"
            >
              <TripItinerary days={pkg?.itinerary || []} />
            </section>
          </div>

          {/* RIGHT SIDEBAR */}
          <aside className="hidden lg:block">
            {/* 🔑 MUST stretch full height */}
            <div className="h-full flex flex-col">
              {/* Normal cards */}
              <div className="space-y-8 mb-8">
                <PriceCard pricing={bestPricing} />
                <GotAQuestionCard />
                <GroupOfferCard />
                <WhyChooseUs />
              </div>

              {/* ✅ ONLY THIS IS STICKY */}
              <div className="sticky top-24 self-start w-full">
                <EnquiryCard />
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* ================= BELOW CONTENT ================= */}
      <section className="mt-14">
        <section className="bg-[#FFF7ED] py-10">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <PackageSummary inclusions={pkg?.inclusions || []} exclusions={pkg?.exclusions || []} />

            {/* 📱 MOBILE ONLY PRICE CARD - Appears right after Summary */}
            <div className="mt-8 lg:hidden">
              <PriceCard pricing={bestPricing} />
            </div>
          </div>
        </section>

        <section className="bg-white py-10">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <PolicyAccordion policies={pkg?.policies || []} />

            {/* 📱 MOBILE ONLY SUPPORT CARDS - Optional but recommended for conversion */}
          </div>
        </section>
        <section className="bg-[#FAFAFA] py-10">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <FAQs
              title={pkg?.name}
              type={pkg?.type}
              faqs={pkg?.faqs || []}
            />
          </div>
        </section>
      </section>

      <StickyWhatsApp />
      </main>
    </AdventureLoader>
  );
}