"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import FooterContact from "@/components/sections/FooterContact";
import IslandBar from "@/components/layout/IslandBar";
import { Check, X, ArrowRight, Bot, Share2, Megaphone, Globe, LifeBuoy, Camera, BadgeCheck, Play } from "lucide-react";
import servicesData from "@/lib/data/servicesData.json";
import { motion, AnimatePresence } from "framer-motion";

export default function ServiciosPage() {
  const [activeTab, setActiveTab] = useState("crm");

  const searchString = typeof window !== "undefined" ? window.location.search : "";

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get("tab");
      const validTabs = servicesData.services.map((s) => s.id);
      if (tabParam && validTabs.includes(tabParam)) {
        const timer = setTimeout(() => {
          setActiveTab(tabParam);
        }, 0);
        return () => clearTimeout(timer);
      }
    }
  }, [searchString]);

  const tabIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    crm: Bot,
    "social-media": Share2,
    "marketing-ads": Megaphone,
    "web-development": Globe,
    maintenance: LifeBuoy,
    production: Camera,
  };

  return (
    <main className="bg-background min-h-screen relative flex flex-col justify-between overflow-x-hidden text-foreground">
      <Navbar />

      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto max-w-6xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary text-sm font-semibold tracking-wider uppercase px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md">
              Nuestras Soluciones
            </span>
            <h1 className="text-4xl md:text-6xl font-black mt-6 tracking-tight">
              Planes que Impulsan tu <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent-light">
                Escala Comercial
              </span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto mt-6">
              Dirección de marketing y ventas a través de CRM personalizados, gestión avanzada de tráfico de pago, redes sociales y plataformas web premium.
            </p>
          </motion.div>

          {/* Interactive Navigation Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mt-12 max-w-4xl mx-auto p-2 rounded-2xl bg-card/50 border border-border backdrop-blur-md">
            {servicesData.services.map((service) => {
              const Icon = tabIcons[service.id] || Globe;
              const isActive = activeTab === service.id;
              return (
                <button
                  key={service.id}
                  onClick={() => setActiveTab(service.id)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-[1.02]"
                      : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {service.title}
                </button>
              );
            })}
          </div>

          {/* Plan Display Area */}
          <div className="mt-16 relative">
            {/* Insignia Business Partner de Meta — visible en el tab de Ads */}
            {activeTab === "marketing-ads" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-10 flex justify-center"
              >
                {/* PLACEHOLDER: reemplazar por la insignia oficial de Meta Business Partner */}
                <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-primary/10 border border-primary/30 backdrop-blur-md">
                  <BadgeCheck className="w-6 h-6 text-primary shrink-0" />
                  <div className="text-left">
                    <p className="text-sm font-bold text-foreground leading-tight">Business Partner oficial de Meta</p>
                    <p className="text-xs text-muted-foreground">Gestionamos tu pauta en Facebook e Instagram con respaldo de Meta.</p>
                  </div>
                </div>
              </motion.div>
            )}
            <AnimatePresence mode="wait">
              {servicesData.services.map((service) => {
                if (service.id !== activeTab) return null;
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.4 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left"
                  >
                    {service.plans.map((plan) => {
                      const isPopular = plan.isPopular;
                      return (
                        <div
                          key={plan.id}
                          className={`relative flex flex-col justify-between p-8 rounded-3xl transition-all duration-300 border ${
                            isPopular
                              ? "bg-gradient-to-b from-card to-primary/5 border-primary shadow-2xl scale-[1.03] z-10"
                              : "bg-card/40 border-border hover:border-muted-foreground/40 hover:bg-card/60 shadow-lg"
                          }`}
                        >
                          {isPopular && (
                            <span className="absolute -top-3.5 left-6 text-[11px] font-bold tracking-wider uppercase bg-primary text-primary-foreground px-3 py-1 rounded-full shadow-md">
                              {plan.highlightText || "Más Vendido"}
                            </span>
                          )}

                          <div>
                            <h3 className="text-xl font-bold">{plan.name}</h3>
                            <p className="text-xs text-muted-foreground mt-2 min-h-[32px]">
                              {plan.description}
                            </p>
                            <div className="mt-6 flex items-baseline">
                              <span className="text-3xl font-extrabold tracking-tight">
                                {plan.price}
                              </span>
                            </div>

                            <div className="mt-8 border-t border-border/60 pt-6">
                              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                                ¿Qué incluye este plan?
                              </p>
                              <ul className="space-y-3.5">
                                {plan.features.map((feature, idx) => (
                                  <li key={idx} className="flex items-start gap-2.5 text-sm">
                                    {feature.included ? (
                                      <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                    ) : (
                                      <X className="w-4 h-4 text-muted shrink-0 mt-0.5" />
                                    )}
                                    <span className={feature.included ? "text-foreground" : "text-muted-foreground line-through"}>
                                      {feature.text}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          <div className="mt-8">
                            <a
                              href="/planificacion"
                              className={`flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-xl font-semibold text-sm transition-all duration-300 ${
                                isPopular
                                  ? "bg-primary text-primary-foreground hover:bg-primary/95 shadow-md shadow-primary/10"
                                  : "bg-muted text-foreground hover:bg-muted/80"
                              }`}
                            >
                              Seleccionar Plan
                              <ArrowRight className="w-4 h-4" />
                            </a>
                          </div>
                        </div>
                      );
                    })}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Nichos — Un YouTube para cada persona */}
      <section className="relative py-20 px-6 overflow-hidden border-t border-border/40">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[400px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="container mx-auto max-w-5xl text-center relative z-10">
          <span className="text-primary text-sm font-semibold tracking-wider uppercase px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md">
            Producción por nicho
          </span>
          <h2 className="text-3xl md:text-5xl font-black mt-6 tracking-tight">
            Un <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent-light">YouTube para cada persona</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto mt-6">
            No hacemos contenido genérico. Para cada nicho creamos una biblioteca de contenido a la medida
            —como tener un canal propio— que educa, posiciona y vende. Grabamos con nuestro equipo
            (Cadete y camarógrafos), editamos y diseñamos cada pieza.
          </p>
          {/* PLACEHOLDER: agregar miniaturas/reels reales por nicho */}
          <div className="flex flex-wrap justify-center gap-3 mt-10">
            {["Salud y bienestar", "Inmobiliaria", "E-commerce", "Restaurantes", "Servicios profesionales", "Educación", "Belleza y estética", "Fitness"].map((n) => (
              <span key={n} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 border border-border text-sm text-foreground">
                <Play className="w-3.5 h-3.5 text-primary" />
                {n}
              </span>
            ))}
          </div>
        </div>
      </section>

      <FooterContact />
      <IslandBar />
    </main>
  );
}
