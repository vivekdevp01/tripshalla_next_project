// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import {
//   HiOutlineVideoCamera,
//   HiOutlineShieldCheck,
//   HiOutlinePhotograph,
// } from "react-icons/hi";
// import { MdOutlineHeight } from "react-icons/md";

// // Components
// import Header from "./Header";
// import ExplorationGrid from "./ExplorationGrid";
// import TourDetails from "./TourDetails";
// import TripItinerary from "./TripItinerary";
// import PackageSummary from "./PackageSummary";
// import PolicyAccordion from "./PolicyAccordion";
// import EnquiryCard from "./Packages/EnquiryCard";
// import WhyChooseUs from "./Packages/WhyChooseUs";
// import GotAQuestionCard from "./Packages/GotQuestionCard";
// import GroupOfferCard from "./Packages/GroupOfferCard";
// import FAQs from "./Packages/Faqs";
// import StickyWhatsApp from "./Packages/StickyWhatsappButton";
// import PriceCard from "./Packages/PriceCard";

// // Rafting JSON (OBJECT keyed by slug)
// import raftingDetails from "../json/raftingDetails.json";

// export default function Tour3() {
//   const { slug } = useParams();
//   const [loading, setLoading] = useState(true);

//   /* ---------------------------------------
//      PACKAGE RESOLUTION
//   --------------------------------------- */
//   const pkg = raftingDetails[slug] || raftingDetails["brahmpuri-rafting"];

//   useEffect(() => {
//     window.scrollTo(0, 0);
//     const t = setTimeout(() => setLoading(false), 600);
//     return () => clearTimeout(t);
//   }, [slug]);

//   if (loading) {
//     return (
//       <div className="h-screen flex items-center justify-center text-emerald-600 font-bold">
//         Loading Rapids...
//       </div>
//     );
//   }

//   if (!pkg) {
//     return (
//       <div className="h-screen flex items-center justify-center text-red-500 font-bold">
//         Rafting package not found
//       </div>
//     );
//   }

//   /* ---------------------------------------
//      RENDER
//   --------------------------------------- */
//   return (
//     <main className="bg-[#FAFAFA]">
//       {/* 1️⃣ HEADER */}
//       <Header
//         variant="tour"
//         title={pkg.name}
//         subtitle={`📍 ${pkg.location}`}
//         badges={[pkg.distance, pkg.grade, "Certified Guides"]}
//         bgImage={pkg.media[0].media_url}
//       />

//       {/* 2️⃣ MEDIA */}
//       <ExplorationGrid media={pkg.media} />

//       <section className="max-w-7xl mx-auto px-4 md:px-6 mt-10">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
//           {/* LEFT CONTENT */}
//           <div className="lg:col-span-2 space-y-14">
//             <TourDetails
//               title={pkg.name}
//               highlight={pkg.tagline}
//               summary={[pkg.distance, pkg.grade, "Age: 12–60"]}
//               amenities={[
//                 {
//                   icon: <MdOutlineHeight className="rotate-90" />,
//                   label: pkg.distance,
//                 },
//                 {
//                   icon: <HiOutlineShieldCheck />,
//                   label: "Certified River Guides",
//                 },
//                 {
//                   icon: <HiOutlineVideoCamera />,
//                   label: "GoPro on Request",
//                 },
//                 {
//                   icon: <HiOutlinePhotograph />,
//                   label: "Action Photos",
//                 },
//               ]}
//               durations={[
//                 {
//                   id: pkg.id,
//                   title: "Standard Rafting Slot",
//                   final_price: pkg.price,
//                   image: pkg.media[1]?.media_url,
//                 },
//               ]}
//             />

//             {/* ITINERARY */}
//             <section className="bg-white rounded-3xl p-6 md:p-8 shadow-sm">
//               <h3 className="text-2xl font-bold mb-6">
//                 Your Rafting Experience
//               </h3>
//               <TripItinerary
//                 days={[
//                   {
//                     day: 1,
//                     title: "Arrival & Briefing",
//                     description:
//                       "Report at starting point, gear distribution & safety briefing.",
//                   },
//                   {
//                     day: 2,
//                     title: "Rafting Run",
//                     description:
//                       "Navigate exciting rapids with professional river guides.",
//                   },
//                   {
//                     day: 3,
//                     title: "Finish & Departure",
//                     description: "Reach endpoint, change clothes & depart.",
//                   },
//                 ]}
//               />
//             </section>
//           </div>

//           {/* RIGHT SIDEBAR */}
//           <aside className="hidden lg:block">
//             <div className="space-y-8 sticky top-24">
//               <PriceCard
//                 pricing={{
//                   final_price: pkg.price,
//                   discount_price: pkg.oldPrice,
//                 }}
//               />
//               <GotAQuestionCard />
//               <GroupOfferCard />
//               <WhyChooseUs />
//               <EnquiryCard />
//             </div>
//           </aside>
//         </div>
//       </section>

//       {/* FOOTER SECTIONS */}
//       <section className="mt-14">
//         <section className="bg-[#FFF7ED] py-10">
//           <PackageSummary
//             inclusions={pkg.inclusions}
//             exclusions={pkg.exclusions}
//           />
//         </section>

//         <section className="bg-white py-10">
//           <PolicyAccordion policies={pkg.policies} />
//         </section>

//         <section className="bg-[#FAFAFA] py-10">
//           <FAQs title={pkg.name} type="Rafting" faqs={pkg.faqs} />
//         </section>
//       </section>

//       <StickyWhatsApp />
//     </main>
//   );
// }
"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  HiOutlineVideoCamera,
  HiOutlineShieldCheck,
  HiOutlinePhotograph,
} from "react-icons/hi";
import { MdOutlineHeight } from "react-icons/md";
import raftingPricing from "../json/raftingPricing.json";

// Components
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
import raftingDetails from "../json/raftingDetails.json";
import RapidsSection from "./RapidSection";
// import { supabase } from "../lib/supabase";
import CorporateCollaborationCard from "./CorporateCollaborationCard";

export default function Tour3() {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);

  const pkg = raftingDetails[slug] || raftingDetails["brahmpuri-rafting"];
  const pricingOptions = raftingPricing[slug] || [];

  const bestPricing = pricingOptions.length
    ? [...pricingOptions].sort((a, b) => a.final_price - b.final_price)[0]
    : null;
  useEffect(() => {
    window.scrollTo(0, 0);
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, [slug]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-emerald-600 font-bold">
        Loading Rapids...
      </div>
    );
  }

  if (!pkg) {
    return (
      <div className="h-screen flex items-center justify-center text-red-500 font-bold">
        Rafting package not found
      </div>
    );
  }

  /* ---------------------------------------
     RENDER
  --------------------------------------- */
  return (
    <main className="bg-[#FAFAFA]">
      {/* 1️⃣ HEADER */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TouristAttraction",
            name: pkg.name,
            description: pkg.tagline,
            url: `https://www.tripshalla.in/raftings/${slug}`,
            image: pkg.media[0]?.media_url,
            offers: {
              "@type": "Offer",
              price: bestPricing?.final_price || pkg.price,
              priceCurrency: "INR",
              availability: "https://schema.org/InStock",
            },
            provider: {
              "@type": "Organization",
              name: "Tripshalla",
              url: "https://www.tripshalla.in",
            },
          }),
        }}
      />
      <Header
        variant="tour"
        title={pkg.name}
        subtitle={`📍 ${pkg.location}`}
        badges={[pkg.distance, pkg.grade, "Certified Guides"]}
        bgImage={pkg.media[0].media_url}
      />

      {/* 2️⃣ MEDIA */}
      <ExplorationGrid media={pkg.media} />

      <section className="max-w-7xl mx-auto px-4 md:px-6 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* LEFT CONTENT */}
          <div className="lg:col-span-2 space-y-14">
            {/* TOUR DETAILS */}
            <TourDetails
              title={pkg.name}
              highlight={pkg.tagline}
              summary={[pkg.distance, pkg.grade, `Age: ${pkg.minimum_age}+`]}
              amenities={[
                {
                  icon: <MdOutlineHeight className="rotate-90" />,
                  label: pkg.distance,
                },
                {
                  icon: <HiOutlineShieldCheck />,
                  label: "Certified River Guides",
                },
                {
                  icon: <HiOutlineVideoCamera />,
                  label: "GoPro on Request",
                },
                {
                  icon: <HiOutlinePhotograph />,
                  label: "Action Photos",
                },
              ]}
              durations={pricingOptions.map((option) => ({
                id: option.id,
                title: option.title,
                final_price: option.final_price,
                image: pkg.media[1]?.media_url,
              }))}
              // durations={
              //   pricingOptions.length > 0
              //     ? pricingOptions.map((option) => ({
              //         id: option.id,
              //         title: option.title || "Standard Slot",
              //         final_price: Math.floor(option.final_price),
              //         image: pkg.media[1]?.media_url,
              //       }))
              //     : [
              //         {
              //           id: pkg.id,
              //           title: "Standard Rafting Slot",
              //           final_price: Math.floor(pkg.price),
              //           image: pkg.media[1]?.media_url,
              //         },
              //       ]
              // }
              // durations={[
              //   {
              //     id: pkg.id,
              //     title: "Standard Rafting Slot",
              //     final_price: Math.floor(pkg.price),
              //     image: pkg.media[1]?.media_url,
              //   },
              // ]}
            />

            {/* 🔥 RAPIDS SECTION */}
            <RapidsSection rapids={pkg.rapids} />
            <CorporateCollaborationCard />

            {/* ITINERARY */}
            <section className="bg-white rounded-3xl p-6 md:p-8 shadow-sm">
              <h3 className="text-2xl font-bold mb-6">Your Rafting Journey</h3>
              <TripItinerary
                days={pkg.itinerary.map((step, index) => ({
                  id: index, // ✅ Add this
                  day: step.step,
                  title: step.title,
                  description: step.description,
                }))}
              />
            </section>
          </div>

          {/* RIGHT SIDEBAR */}
          <aside className="hidden lg:block">
            <div className="space-y-8 sticky top-24">
              <PriceCard pricing={bestPricing} />

              <GotAQuestionCard />
              <GroupOfferCard />
              <WhyChooseUs />
              <EnquiryCard />
            </div>
          </aside>
        </div>
      </section>

      {/* FOOTER SECTIONS */}
      <section className="mt-14">
        <section className="bg-[#FFF7ED] py-10">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <PackageSummary
              inclusions={pkg.inclusions}
              exclusions={pkg.exclusions}
            />

            {/* 📱 MOBILE ONLY PRICE CARD - Appears right after Summary */}
            <div className="mt-8 lg:hidden">
              <PriceCard pricing={bestPricing} />
            </div>
            {/* <div className="mt-8 lg:hidden">
              <PriceCard
                pricing={{
                  final_price: Math.floor(pkg.price),
                  discount_price: pkg.oldPrice,
                }}
              />
            </div> */}
          </div>
        </section>

        <section className="bg-white py-10">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <PolicyAccordion policies={pkg.policies} />

            {/* 📱 MOBILE ONLY SUPPORT CARDS - Optional but recommended for conversion */}
          </div>
        </section>

        <section className="bg-[#FAFAFA] py-10">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <FAQs title={pkg.name} type="Rafting" faqs={pkg.faqs} />
          </div>
        </section>
      </section>

      <StickyWhatsApp />
    </main>
  );
}
