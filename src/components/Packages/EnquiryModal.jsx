// 'use client'
// import { useEffect } from "react";
// import { X } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import EnquiryCard from "./EnquiryCard";

// export default function EnquiryModal({ isOpen, onClose, packageId }) {
//   useEffect(() => {
//     document.body.style.overflow = isOpen ? "hidden" : "auto";
//     return () => (document.body.style.overflow = "auto");
//   }, [isOpen]);

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           className="fixed inset-0 z-[100000] flex items-start justify-center px-4 pt-20"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//         >
//           {/* BACKDROP */}
//           <div
//             className="absolute inset-0 bg-black/80 backdrop-blur-sm"
//             onClick={onClose}
//           />

//           {/* MODAL */}
//           <motion.div
//             initial={{ y: -60, opacity: 0, scale: 0.96 }}
//             animate={{ y: 0, opacity: 1, scale: 1 }}
//             exit={{ y: -40, opacity: 0, scale: 0.96 }}
//             transition={{ duration: 0.3, ease: "easeOut" }}
//             className="relative z-10 w-full max-w-md"
//           >
//             {/* CLOSE BUTTON */}
//             <motion.button
//               onClick={onClose}
//               whileHover={{ rotate: 90, scale: 1.1 }}
//               transition={{ type: "spring", stiffness: 300 }}
//               className="absolute -top-4 -right-4
//              bg-white p-2 rounded-full
//              shadow-lg text-slate-500 hover:text-orange-600"
//             >
//               <X size={18} />
//             </motion.button>

//             {/* CARD */}
//             <EnquiryCard packageId={packageId} onSuccess={onClose} />
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import EnquiryCard from "./EnquiryCard";

export default function EnquiryModal({ isOpen, onClose, packageId }) {
  const [mounted, setMounted] = useState(false);

  // Ensure portal works in Next.js
  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll
  // ✅ Perfect scroll lock (no shift, no jump)
  useEffect(() => {
    if (!isOpen) return;

    const scrollY = window.scrollY;

    // Lock body
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";

    return () => {
      // Restore scroll
      const y = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";

      window.scrollTo(0, parseInt(y || "0") * -1);
    };
  }, [isOpen]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[999999] flex items-start justify-center px-4 pt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* BACKDROP */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* MODAL CONTENT */}
          <motion.div
            initial={{ y: -60, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -40, opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative z-10 w-full max-w-md"
          >
            {/* CLOSE BUTTON */}
            <motion.button
              onClick={onClose}
              whileHover={{ rotate: 90, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="absolute -top-4 -right-4 bg-white p-2 rounded-full shadow-lg text-slate-500 hover:text-orange-600"
            >
              <X size={18} />
            </motion.button>

            {/* ENQUIRY CARD */}
            <EnquiryCard packageId={packageId} onSuccess={onClose} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
