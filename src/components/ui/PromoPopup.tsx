"use client";

import { useEffect, useState } from "react";
import { X, Calendar, Ticket } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function PromoPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user has already closed the popup in this session
    const isClosed = sessionStorage.getItem("promo-popup-closed");
    if (isClosed) return;

    let pendingOpen = false;
    const isNearEntryPoint = () => window.scrollY < Math.min(320, window.innerHeight * 0.35);
    const openPopup = () => setIsOpen(true);

    const handleScroll = () => {
      if (!pendingOpen || !isNearEntryPoint()) return;
      pendingOpen = false;
      openPopup();
    };

    const timer = window.setTimeout(() => {
      if (isNearEntryPoint()) {
        openPopup();
      } else {
        pendingOpen = true;
      }
    }, 5000); // 5 seconds delay

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const closePopup = () => {
    setIsOpen(false);
    sessionStorage.setItem("promo-popup-closed", "true");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative bg-card border border-primary/30 max-w-md w-full rounded-3xl p-8 shadow-2xl flex flex-col items-center text-center overflow-hidden"
          >
            {/* Background Accent Gradient */}
            <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-primary to-accent-light" />
            <div className="absolute -top-12 -left-12 w-24 h-24 bg-primary/10 rounded-full blur-xl pointer-events-none" />
            <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-primary/10 rounded-full blur-xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={closePopup}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Promo Icon */}
            <div className="w-16 h-16 rounded-2xl bg-primary/15 border border-primary/20 flex items-center justify-center mb-6 shadow-md text-primary">
              <Ticket className="w-8 h-8" />
            </div>

            {/* Content */}
            <span className="text-primary text-xs font-bold uppercase tracking-wider bg-primary/10 px-3 py-1 rounded-full border border-primary/20 mb-3">
              Cupón disponible
            </span>
            <h3 className="text-2xl font-black tracking-tight leading-snug">
              Agenda tu cita ahora
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed mt-3">
              Hay un cupón disponible. Agenda una cita sin costo y te demostramos cómo ayudarte a vender más.
            </p>

            {/* Coupon Code Representation */}
            <div className="mt-5 w-full bg-muted/60 border border-border border-dashed p-3 rounded-xl flex items-center justify-center gap-2">
              <Ticket className="w-4 h-4 text-primary" />
              <span className="font-mono text-sm font-bold tracking-wider text-foreground">
                ADCRM-FREE-SET
              </span>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 w-full flex flex-col gap-2">
              <a
                href="/planificacion"
                onClick={closePopup}
                className="flex items-center justify-center gap-2 w-full py-3.5 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/95 shadow-lg shadow-primary/15 transition-all text-sm cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                Agendar Cita Gratis
              </a>
              <button
                onClick={closePopup}
                className="py-3 text-muted-foreground hover:text-foreground transition-colors text-xs font-medium cursor-pointer"
              >
                No, gracias. Quizás más tarde
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
