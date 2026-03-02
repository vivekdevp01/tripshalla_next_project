"use client";
import { Plus, Trash2 } from "lucide-react";
import { useState, useMemo, useRef, useEffect } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import InvoicePreview from "../../../components/InvoicePreview";

/* ---------- MASTER DATA ---------- */

// const LOCATIONS = ["Rishikesh", "Shivpuri", "Kaudiyala", "Auli"];

const ACTIVITY_TYPES = [
  "River Rafting",
  "Camping",
  "Bungee & Adventure",
  "Hotel Stay",
  "Rental",
  "Combo Package",
  "Custom Activity", // 👈 NEW
];
/* ---------- COMPANY MASTER DATA ---------- */

const LOCATIONS = ["Rishikesh", "Shivpuri", "Kaudiyala", "Auli"];

const CAMPS = [
  "Shivpuri Riverside Budget Camp",
  "Malakunti Adventure Camp with Pool",
  "Riverside Camping (Luxury)",
  "Aureva Riverside Luxe Retreat",
];

const RAFTING_STRETCHES = [
  { name: "Brahmpuri – 12 KM", price: 449 },
  { name: "Club House – 14 KM", price: 530 },
  { name: "Marine Drive – 12 KM", price: 599 },
  { name: "Shivpuri – 16 KM", price: 649 },
  { name: "Marine Drive – 24 KM", price: 999 },
  { name: "Kaudiyala – 36 KM", price: 1999 },
];

const BUNGEE_ACTIVITIES = [
  { name: "Sky Walk", price: 999 },
  { name: "Zipline", price: 1199 },
  { name: "Rocket Bungee", price: 1999 },
  { name: "Splash Bungee", price: 3999 },
  { name: "Tower Top Swing", price: 1199 },
];

const PRICING_UNITS = ["Per Person", "Per Night", "Per Day", "Fixed Package"];
const PAYMENT_MODES = ["Cash", "UPI", "Card", "Bank Transfer"];

/* ---------- COMPONENT ---------- */

export default function CreateInvoice() {
  const previewRef = useRef(null);
  const [showPreview, setShowPreview] = useState(false);

  // const [services, setServices] = useState([
  //   {
  //     type: "",
  //     variant: "",
  //     pricingUnit: "Per Person",
  //     qty: 1,
  //     rate: 0,
  //     description: "",
  //   },
  // ]);
  const [services, setServices] = useState([
    {
      type: "",
      customType: "",
      variant: "",
      customVariant: "",
      pricingUnit: "Per Person",
      qty: 1,
      rate: 0,
      description: "",
      isCustom: false,
    },
  ]);

  const [trip, setTrip] = useState({
    location: "",
    startDate: "",
    endDate: "",
  });
  const [payment, setPayment] = useState({
    discountType: "amount", // "amount" | "percent"
    discountValue: 0,
    paid: 0,
    mode: "Cash",
    reference: "",
  });
  const [invoiceNo] = useState(() => {
    const year = new Date().getFullYear();
    const random = Math.floor(1000 + Math.random() * 9000);
    return `TS-${year}-${random}`;
  });
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    adults: 1,
    children: 0,
    notes: "",
  });

  //   const [payment, setPayment] = useState({
  //     discount: 0,
  //     paid: 0,
  //     mode: "Cash",
  //     reference: "",
  //   });

  /* ---------- CALCULATIONS ---------- */

  const requiresStay = useMemo(
    () =>
      services.some((s) =>
        ["Camping", "Hotel Stay", "Combo Package"].includes(s.type),
      ),
    [services],
  );

  const subtotal = useMemo(
    () => services.reduce((sum, s) => sum + s.qty * s.rate, 0),
    [services],
  );
  const discountAmount =
    payment.discountType === "percent"
      ? Math.round((subtotal * payment.discountValue) / 100)
      : payment.discountValue;

  const total = Math.max(subtotal - discountAmount, 0);
  const balance = Math.max(total - payment.paid, 0);
  //   const total = Math.max(subtotal - discountAmount, 0);
  //   const balance = Math.max(total - Number(payment.paid || 0), 0);

  /* ---------- HELPERS ---------- */

  const getVariants = (type) => {
    if (type === "River Rafting") {
      return RAFTING_STRETCHES.map((r) => r.name);
    }

    if (type === "Camping") {
      return CAMPS;
    }

    if (type === "Bungee & Adventure") {
      return BUNGEE_ACTIVITIES.map((b) => b.name);
    }

    if (type === "Hotel Stay") {
      return ["Standard Room", "Deluxe Room", "River View Room"];
    }

    if (type === "Rental") {
      return ["Scooty", "Royal Enfield", "Pulsar"];
    }

    if (type === "Combo Package") {
      return [
        "Splash Bungy + Tower Swing",
        "Mega Adventure Combo",
        "Extreme Combo Pack",
        "Camp + Rafting",
        "Custom Combo",
      ];
    }

    return [];
  };
  const updateService = (i, key, value) => {
    const copy = [...services];
    copy[i][key] = value;
    setServices(copy);
  };

  const addService = () =>
    setServices([
      ...services,
      {
        type: "",
        variant: "",
        pricingUnit: "Per Person",
        qty: 1,
        rate: 0,
        description: "",
      },
    ]);

  const removeService = (i) =>
    setServices(services.filter((_, idx) => idx !== i));

  const qtyLabel = (unit) => {
    if (unit === "Per Person") return "Persons";
    if (unit === "Per Night") return "Nights";
    if (unit === "Per Day") return "Days";
    return "Qty";
  };
  useEffect(() => {
    const preventScroll = (e) => {
      if (document.activeElement?.type === "number") {
        document.activeElement.blur();
      }
    };

    window.addEventListener("wheel", preventScroll, { passive: true });

    return () => {
      window.removeEventListener("wheel", preventScroll);
    };
  }, []);

  const handleDownloadPdf = async () => {
    console.log("➡️ Download clicked");

    const element = previewRef.current;
    if (!element) {
      alert("Preview not ready");
      return;
    }

    try {
      // 1️⃣ Render HTML → Canvas
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        scrollX: 0,
        scrollY: -window.scrollY,
      });

      const imgData = canvas.toDataURL("image/png");

      // 2️⃣ Create PDF
      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth(); // 210mm
      const pdfHeight = pdf.internal.pageSize.getHeight(); // 297mm

      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      // 3️⃣ First page
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      // 4️⃣ Extra pages if content is long
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      // 5️⃣ Dynamic filename (VERY IMPORTANT)
      const today = new Date().toISOString().split("T")[0];
      const fileName = `Tripshalla_Invoice_${invoiceNo}_${today}.pdf`;

      pdf.save(fileName);

      console.log("✅ PDF saved:", fileName);
    } catch (error) {
      console.error("❌ PDF generation failed:", error);
      alert("Failed to generate PDF. Please try again.");
    }
  };

  useEffect(() => {
    if (showPreview) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showPreview]);

  /* ---------- UI ---------- */

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 py-10 px-6">
      <div className="max-w-7xl mx-auto bg-white rounded-3xl p-12 shadow-2xl border border-slate-100 space-y-14">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-4xl font-extrabold tracking-tight text-slate-800">
              🧾 Tripshalla Invoice
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Create a booking invoice step by step
            </p>
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs font-semibold text-slate-600">
            <span className="px-3 py-1 rounded-full bg-slate-100">
              Customer
            </span>
            →
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700">
              Trip
            </span>
            →
            <span className="px-3 py-1 rounded-full bg-slate-100">
              Activities
            </span>
            →
            <span className="px-3 py-1 rounded-full bg-slate-100">Payment</span>
          </div>
        </div>

        {/* TRIP CONTEXT */}
        <section className="bg-white border border-slate-200 rounded-2xl p-10 shadow-md space-y-8">
          {/* HEADER */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-slate-800">
                📍 Trip Context
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                Location and schedule details for this booking
              </p>
            </div>

            <span className="text-xs font-semibold px-4 py-1 rounded-full bg-slate-100 text-slate-600">
              Trip Info
            </span>
          </div>

          {/* FORM GRID */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* LOCATION */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-500">
                Location
              </label>
              <select
                className="w-full border border-slate-300 rounded-xl px-4 py-2.5 bg-white
                   focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                value={trip.location}
                onChange={(e) => setTrip({ ...trip, location: e.target.value })}
              >
                <option value="">Select Location</option>
                {LOCATIONS.map((l) => (
                  <option key={l}>{l}</option>
                ))}
              </select>
            </div>

            {/* START DATE */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-500">
                Start Date
              </label>
              <input
                type="date"
                className="w-full border border-slate-300 rounded-xl px-4 py-2.5
                   focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                value={trip.startDate}
                onChange={(e) =>
                  setTrip({ ...trip, startDate: e.target.value })
                }
              />
            </div>

            {/* END DATE */}
            {requiresStay && (
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-500">
                  End Date
                </label>
                <input
                  type="date"
                  className="w-full border border-slate-300 rounded-xl px-4 py-2.5
                     focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                  value={trip.endDate}
                  onChange={(e) =>
                    setTrip({ ...trip, endDate: e.target.value })
                  }
                />
              </div>
            )}
          </div>

          {/* INFO PANEL */}
          {trip.startDate && (
            <div
              className={`rounded-xl px-6 py-4 text-sm font-medium flex items-center gap-3
        ${
          requiresStay
            ? "bg-emerald-50 border border-emerald-200 text-emerald-700"
            : "bg-blue-50 border border-blue-200 text-blue-700"
        }`}
            >
              {requiresStay ? (
                <>
                  🏕 Stay booking from <strong>{trip.startDate}</strong> to{" "}
                  <strong>{trip.endDate || "—"}</strong>
                </>
              ) : (
                <>
                  📅 Single-day activity scheduled on{" "}
                  <strong>{trip.startDate}</strong>
                </>
              )}
            </div>
          )}
        </section>
        {/* ================= CUSTOMER DETAILS ================= */}
        <section className="bg-white border border-slate-200 rounded-2xl p-10 shadow-md space-y-8">
          {/* HEADER */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-slate-800">
                👤 Customer Details
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                Information about the guest making this booking
              </p>
            </div>

            <span className="text-xs font-semibold px-4 py-1 rounded-full bg-slate-100 text-slate-600">
              Required Info
            </span>
          </div>

          {/* FORM GRID */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* NAME */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-500">
                Customer Name <span className="text-red-500">*</span>
              </label>
              <input
                className="w-full border border-slate-300 rounded-xl px-4 py-2.5 
                   focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                placeholder="Full name"
                value={customer.name}
                onChange={(e) =>
                  setCustomer({ ...customer, name: e.target.value })
                }
              />
            </div>

            {/* MOBILE */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-500">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <input
                className="w-full border border-slate-300 rounded-xl px-4 py-2.5 
                   focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                placeholder="10-digit mobile"
                value={customer.phone}
                onChange={(e) =>
                  setCustomer({ ...customer, phone: e.target.value })
                }
              />
            </div>

            {/* EMAIL */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-500">
                Email
              </label>
              <input
                className="w-full border border-slate-300 rounded-xl px-4 py-2.5 
                   focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                placeholder="Optional"
                value={customer.email}
                onChange={(e) =>
                  setCustomer({ ...customer, email: e.target.value })
                }
              />
            </div>

            {/* CITY */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-500">
                City
              </label>
              <input
                className="w-full border border-slate-300 rounded-xl px-4 py-2.5 
                   focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                placeholder="Customer city"
                value={customer.city}
                onChange={(e) =>
                  setCustomer({ ...customer, city: e.target.value })
                }
              />
            </div>

            {/* ADULTS */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-500">
                Adults
              </label>
              <input
                type="number"
                min="1"
                className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-center
                   focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                value={customer.adults}
                onChange={(e) =>
                  setCustomer({ ...customer, adults: +e.target.value })
                }
              />
            </div>

            {/* CHILDREN */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-500">
                Children
              </label>
              <input
                type="number"
                min="0"
                className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-center
                   focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                value={customer.children}
                onChange={(e) =>
                  setCustomer({ ...customer, children: +e.target.value })
                }
              />
            </div>

            {/* NOTES */}
            <div className="md:col-span-3 space-y-2">
              <label className="text-xs font-semibold text-slate-500">
                Special Notes
              </label>
              <textarea
                rows={3}
                className="w-full border border-slate-300 rounded-xl px-4 py-2.5 
                   focus:outline-none focus:ring-2 focus:ring-emerald-400 transition resize-none"
                placeholder="Pickup point, arrival time, food preference, special request, etc."
                value={customer.notes}
                onChange={(e) =>
                  setCustomer({ ...customer, notes: e.target.value })
                }
              />
            </div>
          </div>
        </section>

        {/* ACTIVITIES */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-black tracking-tight">
                🧗 Activities & Services
              </h3>
              <p className="text-sm text-slate-500">
                Add all activities included in this booking
              </p>
            </div>

            <button
              onClick={addService}
              className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-emerald-700 transition"
            >
              <Plus size={18} />
              Add Activity
            </button>
          </div>

          {services.map((s, i) => (
            <div
              key={i}
              // className="bg-white border border-slate-200 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
            >
              {/* ROW HEADER */}
              {/* <div className="flex justify-between items-center">
                <p className="font-bold text-slate-700">Activity #{i + 1}</p>
                <button
                  onClick={() => removeService(i)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 />
                </button>
              </div> */}

              {/* MAIN GRID */}
              <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 space-y-8">
                {/* HEADER */}
                <div className="flex justify-between items-center">
                  <p className="text-lg font-semibold text-slate-800">
                    Activity #{i + 1}
                  </p>
                  <button
                    onClick={() => removeService(i)}
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>

                {/* FORM SECTION */}
                <div className="space-y-8">
                  {/* ===== ROW 1 ===== */}
                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Activity Type */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">
                        Activity Type
                      </label>

                      <select
                        className="w-full border border-slate-300 rounded-xl px-4 py-2 bg-white 
               focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                        value={s.type}
                        onChange={(e) => {
                          const value = e.target.value;
                          updateService(i, "type", value);
                          updateService(
                            i,
                            "isCustom",
                            value === "Custom Activity",
                          );
                        }}
                      >
                        <option value="">Select Activity</option>
                        {ACTIVITY_TYPES.map((a) => (
                          <option key={a}>{a}</option>
                        ))}
                      </select>

                      {/* CUSTOM ACTIVITY INPUT */}
                      {s.type === "Custom Activity" && (
                        <input
                          type="text"
                          placeholder="Enter custom activity name"
                          className="mt-3 w-full border border-slate-300 rounded-xl px-4 py-2 
                 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                          value={s.customType}
                          onChange={(e) =>
                            updateService(i, "customType", e.target.value)
                          }
                        />
                      )}
                    </div>

                    {/* Variant */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">
                        Variant
                      </label>

                      {s.type !== "Custom Activity" ? (
                        <>
                          <select
                            className="w-full border border-slate-300 rounded-xl px-4 py-2 bg-white 
                   focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                            value={s.variant}
                            onChange={(e) =>
                              updateService(i, "variant", e.target.value)
                            }
                            disabled={!s.type}
                          >
                            <option value="">Select Variant</option>
                            {getVariants(s.type).map((v) => (
                              <option key={v}>{v}</option>
                            ))}
                            <option value="__custom__">Other (Custom)</option>
                          </select>

                          {s.variant === "__custom__" && (
                            <input
                              type="text"
                              placeholder="Enter custom variant"
                              className="mt-3 w-full border border-slate-300 rounded-xl px-4 py-2 
                     focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                              value={s.customVariant}
                              onChange={(e) =>
                                updateService(
                                  i,
                                  "customVariant",
                                  e.target.value,
                                )
                              }
                            />
                          )}
                        </>
                      ) : (
                        <input
                          type="text"
                          placeholder="Enter variant"
                          className="w-full border border-slate-300 rounded-xl px-4 py-2 
                 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                          value={s.customVariant}
                          onChange={(e) =>
                            updateService(i, "customVariant", e.target.value)
                          }
                        />
                      )}
                    </div>

                    {/* Pricing Unit */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">
                        Pricing Unit
                      </label>
                      <select
                        className="w-full border border-slate-300 rounded-xl px-4 py-2 bg-white 
                     focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                        value={s.pricingUnit}
                        onChange={(e) =>
                          updateService(i, "pricingUnit", e.target.value)
                        }
                      >
                        {PRICING_UNITS.map((u) => (
                          <option key={u}>{u}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* ===== ROW 2 ===== */}
                  <div className="grid md:grid-cols-4 gap-6 items-end">
                    {/* Quantity */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">
                        Quantity
                      </label>
                      <input
                        type="number"
                        min="1"
                        className="w-full border border-slate-300 rounded-xl px-4 py-2 
                     focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                        value={s.qty}
                        onChange={(e) =>
                          updateService(i, "qty", +e.target.value)
                        }
                      />
                    </div>

                    {/* Rate */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">
                        Rate (₹)
                      </label>
                      <input
                        type="number"
                        className="w-full border border-slate-300 rounded-xl px-4 py-2 
                     focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                        value={s.rate}
                        onChange={(e) =>
                          updateService(i, "rate", +e.target.value)
                        }
                      />
                    </div>

                    {/* TOTAL PANEL */}
                    <div className="md:col-span-2">
                      <div
                        className="bg-emerald-50 border border-emerald-200 rounded-xl px-6 py-4 
                        flex justify-between items-center shadow-sm"
                      >
                        <span className="text-sm font-semibold text-emerald-700">
                          Total Amount
                        </span>
                        <span className="text-3xl font-extrabold text-emerald-700">
                          ₹{s.qty * s.rate}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* ===== DESCRIPTION ===== */}
                  <div className="pt-4 border-t border-slate-200">
                    <label className="block text-xs font-semibold text-slate-500 mb-1">
                      Description (Optional)
                    </label>
                    <textarea
                      rows={2}
                      className="w-full border border-slate-300 rounded-xl px-4 py-2 
                   focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                      placeholder="Add activity notes..."
                      value={s.description}
                      onChange={(e) =>
                        updateService(i, "description", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>

              {/* DESCRIPTION */}
              {/* <div>
                <label className="field-label">Description</label>
                <textarea
                  rows={1}
                  className="input"
                  placeholder="Auto-filled for combo packages"
                  value={s.description}
                  onChange={(e) =>
                    updateService(i, "description", e.target.value)
                  }
                />
              </div> */}
            </div>
          ))}
        </section>

        {/* PAYMENT */}
        <section className="bg-white border border-slate-200 rounded-2xl p-10 shadow-lg space-y-10">
          {/* HEADER */}
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-slate-800">
              💳 Payment Summary
            </h3>
            <span className="text-xs font-semibold px-4 py-1 rounded-full bg-emerald-100 text-emerald-700">
              Final Step
            </span>
          </div>

          {/* ================= PAYMENT CONTROLS ================= */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 space-y-6">
            <p className="text-sm font-semibold text-slate-600">
              Payment Controls
            </p>

            <div className="grid md:grid-cols-5 gap-6">
              {/* Discount Type */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">
                  Discount Type
                </label>
                <select
                  className="w-full border border-slate-300 rounded-xl px-4 py-2 bg-white 
                     focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                  value={payment.discountType}
                  onChange={(e) =>
                    setPayment({ ...payment, discountType: e.target.value })
                  }
                >
                  <option value="amount">₹ Flat</option>
                  <option value="percent">% Percentage</option>
                </select>
              </div>

              {/* Discount Value */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">
                  {payment.discountType === "percent"
                    ? "Discount (%)"
                    : "Discount Amount (₹)"}
                </label>
                <input
                  type="number"
                  className="w-full border border-slate-300 rounded-xl px-4 py-2 
                     focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                  value={payment.discountValue}
                  onChange={(e) =>
                    setPayment({
                      ...payment,
                      discountValue: +e.target.value,
                    })
                  }
                />
              </div>

              {/* Paid */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">
                  Paid Amount (₹)
                </label>
                <input
                  type="number"
                  className="w-full border border-slate-300 rounded-xl px-4 py-2 
                     focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                  value={payment.paid}
                  onChange={(e) =>
                    setPayment({ ...payment, paid: +e.target.value })
                  }
                />
              </div>

              {/* Payment Mode */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">
                  Payment Mode
                </label>
                <select
                  className="w-full border border-slate-300 rounded-xl px-4 py-2 bg-white 
                     focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                  value={payment.mode}
                  onChange={(e) =>
                    setPayment({ ...payment, mode: e.target.value })
                  }
                >
                  {PAYMENT_MODES.map((p) => (
                    <option key={p}>{p}</option>
                  ))}
                </select>
              </div>

              {/* Reference */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">
                  UTR / Reference
                </label>
                <input
                  className="w-full border border-slate-300 rounded-xl px-4 py-2 
                     focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                  placeholder="Optional"
                  value={payment.reference}
                  onChange={(e) =>
                    setPayment({ ...payment, reference: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          {/* ================= BILL SUMMARY ================= */}
          <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm space-y-5">
            {/* Subtotal */}
            <div className="flex justify-between text-slate-600 text-sm font-medium">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            {/* Discount */}
            {discountAmount > 0 && (
              <div className="flex justify-between text-red-500 text-sm font-medium">
                <span>
                  Discount{" "}
                  {payment.discountType === "percent"
                    ? `(${payment.discountValue}%)`
                    : ""}
                </span>
                <span>- ₹{discountAmount}</span>
              </div>
            )}

            <div className="border-t border-slate-200 pt-4" />

            {/* Total */}
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-slate-700">
                Total Amount
              </span>
              <span className="text-3xl font-extrabold text-emerald-600">
                ₹{total}
              </span>
            </div>
          </div>

          {/* ================= BALANCE PANEL ================= */}
          <div
            className={`rounded-2xl p-6 flex justify-between items-center 
      ${
        balance > 0
          ? "bg-red-50 border border-red-200"
          : "bg-emerald-50 border border-emerald-200"
      }`}
          >
            <span
              className={`text-lg font-semibold 
      ${balance > 0 ? "text-red-600" : "text-emerald-600"}`}
            >
              {balance > 0 ? "Balance Due" : "Fully Paid"}
            </span>

            <span
              className={`text-3xl font-extrabold 
      ${balance > 0 ? "text-red-600" : "text-emerald-600"}`}
            >
              ₹{balance}
            </span>
          </div>
        </section>
        {showPreview && (
          // <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center overscroll-contain">
            <div className="bg-white rounded-2xl">
              <div className="max-h-[90vh] overflow-auto">
                <InvoicePreview
                  ref={previewRef}
                  invoiceNo={invoiceNo}
                  customer={customer}
                  trip={trip}
                  services={services}
                  subtotal={subtotal}
                  total={total}
                  balance={balance}
                  discountAmount={discountAmount}
                  discountType={payment.discountType}
                  discountValue={payment.discountValue}
                  paid={payment.paid}
                  paymentMode={payment.mode}
                />

                <div className="flex justify-end gap-4 p-6 border-t">
                  <button
                    className="btn-outline"
                    onClick={() => setShowPreview(false)}
                  >
                    Close
                  </button>

                  <button className="btn-primary" onClick={handleDownloadPdf}>
                    Download PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ACTIONS */}
        <div className="flex justify-end gap-4">
          <button className="btn-outline" onClick={() => setShowPreview(true)}>
            Preview Invoice
          </button>
          <button
            className="btn-primary"
            onClick={async () => {
              setShowPreview(true);

              // wait for DOM + layout
              await new Promise((r) => setTimeout(r, 800));

              handleDownloadPdf();
            }}
          >
            Generate PDF
          </button>
        </div>
      </div>
    </div>
  );
}
