"use client";

import Navbar from "@/components/layout/Navbar";
import FooterContact from "@/components/sections/FooterContact";
import IslandBar from "@/components/layout/IslandBar";
import Image from "next/image";
import { Star, Calendar, ShieldCheck, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function DangerPage() {
  // PLACEHOLDER: testimonios de ejemplo. Reemplazar con testimonios reales (nombre, empresa, foto, texto verificado).
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

  // PLACEHOLDER: chat ilustrativo. Reemplazar con capturas reales de conversaciones (con permiso).
  const chatMessages = [
    { sender: "client", senderName: "Andrés (EcomScale)", text: "Danger, ya tenemos todo listo. El presupuesto de Meta Ads está configurado en $2,000 USD/día.", time: "10:14" },
    { sender: "danger", senderName: "Danger Fernández", text: "Excelente. ¿Validaron que la API de conversión de Meta esté deduplicando correctamente en GoHighLevel?", time: "10:16" },
    { sender: "client", senderName: "Andrés (EcomScale)", text: "Sí, el programador conectó los webhooks y configuró el pixel. Las pruebas de deduplicación están al 100%.", time: "10:17" },
    { sender: "danger", senderName: "Danger Fernández", text: "Perfecto. Activamos el flujo automatizado de WhatsApp para calificar leads y agendar la llamada en menos de 90 segundos.", time: "10:20" },
    { sender: "client", senderName: "Andrés (EcomScale)", text: "¡Brutal! El primer lead entró hace 5 minutos, ya calificó, se le envió el cupón ADCRM-FREE-SET y agendó llamada para mañana a las 11.", time: "10:25" },
    { sender: "danger", senderName: "Danger Fernández", text: "Ese es el sistema funcionando. Seguimos creciendo de forma predecible, sin depender de un equipo de ventas enorme.", time: "10:28" }
  ];

  return (
    <main className="bg-background min-h-screen relative flex flex-col justify-between overflow-x-hidden text-foreground">
      <Navbar />

      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Bio Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 text-left"
            >
              <span className="text-primary text-xs font-bold tracking-wider uppercase px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md">
                CEO & Fundador
              </span>
              <h1 className="text-4xl md:text-6xl font-black mt-6 tracking-tight leading-none">
                Danger Fernández
              </h1>
              <p className="text-accent-light font-bold text-lg md:text-xl mt-4">
                Consultor estratégico comercial · Fundador de AD Media
              </p>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed mt-6 font-light">
                Con más de 10 años de experiencia, Danger empezó solo y hoy ayuda a negocios del mercado hispano a vender más. No es un consultor más: le da a cada empresa dirección clara de marketing y ventas, con CRM personalizados, pauta en Meta y Google, y soporte real para crecer de forma sostenida.
              </p>
              
              {/* PLACEHOLDER: validar cifras reales con Danger */}
              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="p-5 rounded-2xl bg-card border border-primary/10">
                  <span className="text-2xl font-black text-primary">+10 Años</span>
                  <p className="text-xs text-muted-foreground mt-1">De experiencia</p>
                </div>
                <div className="p-5 rounded-2xl bg-card border border-primary/10">
                  <span className="text-2xl font-black text-primary">+150</span>
                  <p className="text-xs text-muted-foreground mt-1">Negocios ayudados</p>
                </div>
              </div>
            </motion.div>

            {/* Right Photo Avatar Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-5"
            >
              <div className="aspect-square w-full rounded-3xl bg-card border border-primary/20 shadow-2xl flex flex-col justify-center items-center p-8 relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-primary to-accent-light" />
                {/* PLACEHOLDER: foto profesional real de Danger Fernández */}
                <div className="w-24 h-24 rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 overflow-hidden">
                  <Image src="/team/ceo.png" alt="Danger Fernández" width={96} height={96} sizes="96px" className="w-full h-full object-cover object-top" />
                </div>
                <h3 className="text-xl font-bold">Danger Fernández</h3>
                <p className="text-xs text-accent-light font-bold mt-1.5 tracking-wide uppercase">Consultoría Comercial VIP</p>
                <p className="text-muted-foreground text-xs text-center mt-3 max-w-[24ch] font-light">
                  Acompañamiento uno a uno para dueños de negocios facturando sobre $30K/mes.
                </p>
                
                <a
                  href="/planificacion"
                  className="mt-8 flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold px-6 py-3.5 rounded-2xl hover:bg-primary/95 shadow-lg shadow-primary/10 transition-all text-sm w-full cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  Agendar Consultoría Directa
                </a>
              </div>
            </motion.div>
          </div>

          {/* Interactive Chat Simulation */}
          <div className="mt-24 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/5 border border-primary/20 text-xs font-semibold text-primary mb-4">
              <Sparkles className="w-3.5 h-3.5 text-accent-light" />
              Operaciones en Tiempo Real
            </div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-8">
              Así trabajamos con nuestros clientes
            </h2>
            
            <div className="max-w-2xl bg-card/60 rounded-3xl border border-primary/20 shadow-2xl overflow-hidden backdrop-blur-md">
              {/* Top bar */}
              <div className="bg-primary/10 border-b border-primary/20 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">
                    DF
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-foreground">Canal de Operación Comercial</h4>
                    <span className="text-[10px] text-accent-light font-semibold uppercase tracking-wider block">Activo en High-Ticket</span>
                  </div>
                </div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-ping" />
              </div>

              {/* Chat Messages */}
              <div className="p-6 space-y-4 max-h-[400px] overflow-y-auto bg-slate-950/20">
                {chatMessages.map((msg, idx) => {
                  const isDanger = msg.sender === "danger";
                  return (
                    <div key={idx} className={`flex ${isDanger ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-md ${
                          isDanger
                            ? "bg-primary text-primary-foreground rounded-tr-none"
                            : "bg-muted text-foreground rounded-tl-none border border-border"
                        }`}
                      >
                        <span className={`text-[10px] font-bold block mb-1 uppercase tracking-wider ${
                          isDanger ? "text-accent-light" : "text-primary"
                        }`}>
                          {msg.senderName}
                        </span>
                        <p className="leading-relaxed font-light">{msg.text}</p>
                        <span className="text-[9px] block text-right opacity-60 mt-1 font-mono">{msg.time}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Testimonies Section */}
          <div className="mt-24 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/5 border border-primary/20 text-xs font-semibold text-primary mb-4">
              <ShieldCheck className="w-3.5 h-3.5 text-accent-light" />
              Casos Certificados
            </div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-8">
              Testimonios Reales de Clientes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
      </section>

      <FooterContact />
      <IslandBar />
    </main>
  );
}
