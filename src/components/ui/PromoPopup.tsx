"use client";

import { useEffect, useState } from "react";
import { X, Calendar, Ticket, Sparkles, ArrowRight } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export default function PromoPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Check if user has already closed the popup in this session
    const isClosed = window.sessionStorage?.getItem("promo-popup-closed");
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
    window.sessionStorage?.setItem("promo-popup-closed", "true");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-background/75 backdrop-blur-xl z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative max-w-[34rem] w-full rounded-[2rem] p-[1.5px] shadow-[0_0_34px_rgba(56,189,248,0.22),0_28px_100px_rgba(0,102,255,0.32)] overflow-hidden"
          >
            <motion.div
              aria-hidden="true"
              className="absolute -inset-28 bg-[conic-gradient(from_90deg,transparent_0deg,transparent_55deg,rgba(56,189,248,0.95)_92deg,rgba(0,102,255,1)_116deg,rgba(125,211,252,0.98)_138deg,transparent_178deg,transparent_360deg)]"
              animate={prefersReducedMotion ? undefined : { rotate: 360 }}
              transition={prefersReducedMotion ? undefined : { duration: 5.5, repeat: Infinity, ease: "linear" }}
            />

            <div className="relative rounded-[calc(2rem-1px)] border border-sky-300/35 bg-slate-950/95 px-5 py-6 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.2),inset_0_0_34px_rgba(56,189,248,0.08)] ring-1 ring-sky-300/20 backdrop-blur-2xl sm:px-8 sm:py-8 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(56,189,248,0.22),transparent_34%),radial-gradient(circle_at_85%_100%,rgba(0,102,255,0.2),transparent_36%),linear-gradient(135deg,rgba(255,255,255,0.14),rgba(255,255,255,0.02)_35%,rgba(255,255,255,0.08))] pointer-events-none" />
              <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-sky-200/80 to-transparent pointer-events-none" />
              <div className="absolute -left-24 top-10 h-40 w-40 rounded-full bg-sky-400/15 blur-3xl pointer-events-none" />
              <div className="absolute -right-20 -bottom-16 h-44 w-44 rounded-full bg-primary/20 blur-3xl pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={closePopup}
                aria-label="Cerrar popup"
                className="absolute top-4 right-4 z-20 flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sky-100/60 backdrop-blur-md transition-colors hover:border-sky-300/40 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="relative z-10 flex flex-col items-center">
                {/* Promo Icon */}
                <div className="relative mb-5 flex size-16 items-center justify-center rounded-2xl border border-sky-300/30 bg-sky-300/10 text-sky-200 shadow-[0_0_34px_rgba(56,189,248,0.28)]">
                  <div className="absolute inset-2 rounded-xl bg-primary/20 blur-lg" />
                  <Ticket className="relative w-7 h-7" />
                </div>

                {/* Content */}
                <span className="inline-flex items-center gap-2 rounded-full border border-sky-300/25 bg-sky-300/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-sky-200 shadow-[0_0_22px_rgba(56,189,248,0.16)]">
                  <Sparkles className="size-3" />
                  Cupón disponible
                </span>
                <h3 className="mt-4 text-2xl sm:text-3xl font-black tracking-tight leading-tight text-white">
                  Agenda tu cita ahora
                </h3>
                <p className="mt-3 max-w-md text-sm sm:text-[15px] leading-relaxed text-sky-50/68">
                  Hay un cupón disponible. Agenda una cita sin costo y te demostramos cómo ayudarte a vender más.
                </p>

                {/* Coupon Code Representation */}
                <div className="mt-6 w-full rounded-2xl border border-dashed border-sky-300/25 bg-white/[0.06] p-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                  <div className="flex items-center justify-center gap-2 text-sky-100">
                    <Ticket className="w-4 h-4 text-sky-300" />
                    <span className="font-mono text-sm font-bold tracking-[0.18em]">
                      ADCRM-FREE-SET
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-7 w-full flex flex-col gap-2">
                  <a
                    href="/planificacion"
                    onClick={closePopup}
                    className="group flex items-center justify-center gap-2 w-full rounded-2xl border border-sky-200/20 bg-gradient-to-br from-sky-400 via-primary to-blue-700 py-4 text-sm font-bold text-white shadow-[0_16px_45px_rgba(0,102,255,0.36)] transition-all hover:-translate-y-0.5 hover:shadow-[0_22px_60px_rgba(56,189,248,0.36)] cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    Agendar Cita Gratis
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                  <button
                    onClick={closePopup}
                    className="py-3 text-xs font-medium text-sky-50/45 transition-colors hover:text-sky-50/80 cursor-pointer"
                  >
                    No, gracias. Quizás más tarde
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
