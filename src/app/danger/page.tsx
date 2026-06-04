"use client";

import Navbar from "@/components/layout/Navbar";
import FooterContact from "@/components/sections/FooterContact";
import IslandBar from "@/components/layout/IslandBar";
import { Star, ShieldCheck, MessageCircle, CheckCheck, TrendingUp, Coins } from "lucide-react";
import { motion } from "framer-motion";
import AuthoritySection from "@/components/sections/AuthoritySection";

export default function DangerPage() {
  // testimonios reales (nombre, empresa, foto, texto verificado).
  const testimonials = [
    {
      name: "Andrés Rodríguez",
      role: "CEO de EcomScale",
      feedback: "Trabajar con Danger transformó nuestra estructura comercial. Su visión práctica sobre automatizaciones de CRM y embudos nos ayudó a delegar y escalar nuestra facturación mensual de $25K a más de $80K USD en solo 5 meses.",
      rating: 5,
    },
    {
      name: "Mariana Costa",
      role: "Fundadora de HealthFit",
      feedback: "La consultoría directa de Danger es al grano. Te desarma los cuellos de botella de marketing en una llamada y te da un plan paso a paso. La integración de pauta con Meta Ads y su CRM fue la clave de nuestro crecimiento.",
      rating: 5,
    },
    {
      name: "Javier Méndez",
      role: "Director de Operaciones en LogiTec",
      feedback: "Teníamos desorganización total en el seguimiento de prospectos. Danger diseñó un CRM a medida con asistentes de ventas de AD Media que duplicó nuestra tasa de conversión de leads a clientes firmados.",
      rating: 5,
    },
  ];

  return (
    <main className="bg-background min-h-screen relative flex flex-col justify-between overflow-x-hidden text-foreground">
      <Navbar />

      <div className="pt-20">
        <AuthoritySection />
      </div>

      {/* Sección Interactiva: Chats y Métricas de Éxito */}
      <div className="container mx-auto max-w-5xl relative z-10 px-5 sm:px-6 py-6 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Columna Chat de WhatsApp Simulado (7 cols) */}
          <div className="md:col-span-7 flex flex-col items-center">
            <div className="w-full rounded-[2rem] border border-green-500/35 bg-slate-950/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_20px_50px_rgba(37,211,102,0.1)] overflow-hidden backdrop-blur-md">
              {/* WhatsApp Header */}
              <div className="bg-emerald-950/70 border-b border-green-500/20 px-6 py-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary flex items-center justify-center text-white font-bold font-display text-sm">
                  DF
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Danger Fernández</h4>
                  <span className="text-[10px] text-green-400 font-medium tracking-wider flex items-center gap-1.5 uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping" />
                    En línea
                  </span>
                </div>
              </div>

              {/* Chat Body */}
              <div className="p-6 space-y-4 max-h-[360px] overflow-y-auto font-sans">
                {[
                  { sender: "client", name: "Andrés Rodríguez", text: "¡Danger! No te imaginas... acabamos de cerrar el contrato más grande del año. El flujo automático de WhatsApp que armamos en GHL detectó el lead a las 11 pm y agendó solo." },
                  { sender: "danger", name: "Danger Fernández", text: "¡Qué excelente noticia! Esa es la magia de la automatización: vender mientras duermes. ¿Cómo va el volumen de captación general?" },
                  { sender: "client", name: "Andrés Rodríguez", text: "Duplicamos la tasa de leads contactados en menos de 5 min. Y en facturación ya cruzamos los $85,000 USD este mes." },
                  { sender: "danger", name: "Danger Fernández", text: "¡A por los $100K! Mantengamos el foco en optimizar la pauta de Meta Ads y depurar las llamadas." }
                ].map((msg, mIdx) => {
                  const isDanger = msg.sender === "danger";
                  return (
                    <motion.div
                      key={mIdx}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: mIdx * 0.15, duration: 0.4 }}
                      className={`flex flex-col max-w-[85%] ${isDanger ? "ml-auto items-end" : "mr-auto items-start"}`}
                    >
                      <span className="text-[9px] text-muted-foreground/60 font-semibold mb-1 uppercase tracking-wider px-1">
                        {msg.name}
                      </span>
                      <div className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                        isDanger 
                          ? "bg-emerald-600 text-white rounded-tr-none shadow-[0_4px_12px_rgba(16,185,129,0.15)]"
                          : "bg-slate-900 border border-border/80 text-foreground rounded-tl-none"
                      }`}>
                        {msg.text}
                        <div className="flex justify-end gap-1 items-center mt-1.5 text-[9px] text-white/50">
                          <span>14:08</span>
                          {isDanger && <CheckCheck className="w-3.5 h-3.5 text-sky-300" />}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Columna Métricas de Éxito (5 cols) */}
          <div className="md:col-span-5 text-left space-y-6">
            <div>
              <span className="text-primary text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                Métricas de Impacto
              </span>
              <h3 className="text-2xl sm:text-3xl font-black mt-4 tracking-tight">
                Resultados que Hablan por Sí Solos
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mt-3 font-light">
                La consultoría estratégica no es teoría; es ingeniería de procesos comerciales diseñada para facturar más.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { title: "+$80K USD/mes", subtitle: "Escala máxima alcanzada en clientes", desc: "Casos reales de transformación comercial integral.", icon: Coins, color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
                { title: "+45% Conversión", subtitle: "Optimización del embudo CRM", desc: "Reducción drástica del tiempo de respuesta comercial.", icon: TrendingUp, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
                { title: "4.2x ROI", subtitle: "Retorno promedio de pauta digital", desc: "Meta y Google Ads escalados sin desperdiciar presupuesto.", icon: ShieldCheck, color: "text-blue-400 bg-blue-500/10 border-blue-500/20" }
              ].map((metric, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.4 }}
                  className="flex gap-4 p-4 rounded-2xl border border-primary/10 bg-card/30 backdrop-blur-sm"
                >
                  <div className={`w-12 h-12 rounded-xl border flex items-center justify-center shrink-0 ${metric.color}`}>
                    <metric.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-black text-lg text-foreground">{metric.title}</h4>
                    <p className="text-xs font-bold text-primary">{metric.subtitle}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5 font-light">{metric.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>

      <div className="container mx-auto max-w-5xl relative z-10 px-5 sm:px-6 pb-12 sm:pb-16">
        {/* Testimonies Section */}
        <div className="mt-12 sm:mt-16 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/5 border border-primary/20 text-xs font-semibold text-primary mb-4">
            <ShieldCheck className="w-3.5 h-3.5 text-accent-light" />
            Casos Certificados
          </div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5 sm:mb-7">
            Testimonios Reales de Clientes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            {testimonials.map((test, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-card/40 border border-primary/20 hover:border-primary/40 rounded-3xl p-6 shadow-lg backdrop-blur-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex gap-1 mb-4">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed italic font-light">
                    &ldquo;{test.feedback}&rdquo;
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-border/40">
                  <h4 className="font-bold text-sm text-foreground">{test.name}</h4>
                  <span className="text-xs text-accent-light font-semibold block mt-0.5">{test.role}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <FooterContact />
      <IslandBar />
    </main>
  );
}
