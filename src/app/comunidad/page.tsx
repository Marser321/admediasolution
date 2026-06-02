"use client";

import Navbar from "@/components/layout/Navbar";
import FooterContact from "@/components/sections/FooterContact";
import IslandBar from "@/components/layout/IslandBar";
import { useState } from "react";
import { MessageSquare, Play, Video, ExternalLink, Calendar, Users, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ComunidadPage() {
  // PLACEHOLDER: eventos de ejemplo. Reemplazar título/fecha y el enlace real del video (videoUrl).
  const videos = [
    {
      id: "v1",
      title: "Masterclass: Cómo escalar tu captación de leads con CRM",
      duration: "45 mins",
      date: "Mayo 2026",
      desc: "Análisis técnico grupal en vivo donde explicamos cómo estructurar las automatizaciones básicas de WhatsApp en el embudo comercial y calificar prospectos.",
      videoUrl: "",
    },
    {
      id: "v2",
      title: "Workshop de Estrategias Meta Ads para 2026",
      duration: "1h 15m",
      date: "Abril 2026",
      desc: "Revisión paso a paso de la configuración de píxeles, APIs de conversión, audiencias personalizadas y diseño de creativos VSL de alto impacto.",
      videoUrl: "",
    },
    {
      id: "v3",
      title: "Grabación: Primer Encuentro Anual de Emprendedores",
      duration: "2h 30m",
      date: "Marzo 2026",
      desc: "Resumen audiovisual de los paneles de discusión y networking presencial celebrado en nuestro cuartel general actual.",
      videoUrl: "",
    },
  ];
  const [activeVideo, setActiveVideo] = useState<(typeof videos)[number] | null>(null);

  return (
    <main className="bg-background min-h-screen relative flex flex-col justify-between overflow-x-hidden text-foreground">
      <Navbar />

      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto max-w-5xl relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary text-xs font-bold tracking-wider uppercase px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md">
              AD Media Community
            </span>
            <h1 className="text-4xl md:text-6xl font-black mt-6 tracking-tight">
              Conecta, Comparte y <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent-light">
                Aprende en Comunidad
              </span>
            </h1>
            <p className="text-muted-foreground text-sm md:text-lg max-w-2xl mx-auto mt-6 font-light leading-relaxed">
              Únete a nuestro grupo exclusivo de WhatsApp, accede a eventos de networking y revisa nuestras grabaciones de workshops y masterclasses de escala de facturación.
            </p>
          </motion.div>

          {/* Join Call to Action Banner */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-12 p-8 md:p-12 rounded-3xl bg-gradient-to-br from-card to-primary/5 border border-primary/25 flex flex-col lg:flex-row items-center justify-between text-left shadow-2xl backdrop-blur-md"
          >
            <div className="max-w-xl">
              <span className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider mb-2">
                <Users className="w-4 h-4 text-accent-light" />
                Acceso Privado Exclusivo
              </span>
              <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground">
                Únete a la Comunidad de WhatsApp
              </h2>
              <p className="text-muted-foreground text-xs md:text-sm mt-3 leading-relaxed font-light">
                Comparte diariamente con otros dueños de negocios facturando sobre $30K-$100K. Conversa sobre APIs de conversión, configuraciones de CRM y estrategias de pauta publicitaria Meta/Google.
              </p>
            </div>
            <div className="mt-8 lg:mt-0 shrink-0 w-full lg:w-auto">
              {/* PLACEHOLDER: reemplazar por el enlace real de invitación a la comunidad de WhatsApp */}
              <a
                href="https://chat.whatsapp.com/invite"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold px-6 py-4 rounded-2xl hover:bg-primary/95 shadow-lg shadow-primary/10 transition-all duration-300 transform hover:scale-[1.02] cursor-pointer text-sm w-full lg:w-auto"
              >
                <MessageSquare className="w-4 h-4" />
                Unirse a la Comunidad
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Video Section */}
          <div className="mt-24 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/5 border border-primary/20 text-xs font-semibold text-primary mb-4">
              <Video className="w-3.5 h-3.5 text-accent-light" />
              Biblioteca de Workshops
            </div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-8">
              Eventos y Masterclasses Pasadas
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {videos.map((vid, idx) => (
                <motion.div
                  key={vid.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-card/40 border border-primary/20 hover:border-primary/45 rounded-3xl overflow-hidden shadow-lg backdrop-blur-sm flex flex-col justify-between transition-colors duration-300"
                >
                  <div>
                    {/* Placeholder thumbnail */}
                    <div onClick={() => setActiveVideo(vid)} className="aspect-video w-full bg-slate-950 flex items-center justify-center relative group cursor-pointer border-b border-primary/10">
                      <div className="absolute inset-0 bg-primary/5 opacity-60 group-hover:opacity-20 transition-opacity duration-300" />
                      <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 z-10">
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>
                      <span className="absolute bottom-2.5 right-2.5 bg-background/80 text-[10px] font-mono text-foreground px-2 py-0.5 rounded-md border border-primary/25">
                        {vid.duration}
                      </span>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-1.5 text-xs text-primary font-bold uppercase tracking-wider mb-2">
                        <Calendar className="w-3.5 h-3.5 text-accent-light" />
                        {vid.date}
                      </div>
                      <h3 className="font-bold text-base line-clamp-2 leading-snug text-foreground">
                        {vid.title}
                      </h3>
                      <p className="text-muted-foreground text-xs leading-relaxed mt-3 font-light">
                        {vid.desc}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <button onClick={() => setActiveVideo(vid)} className="flex items-center gap-1.5 text-xs font-bold text-primary hover:underline cursor-pointer">
                      Ver transmisión
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modal de reproducción de video */}
      <AnimatePresence>
        {activeVideo && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl bg-card border border-primary/30 rounded-3xl overflow-hidden shadow-2xl text-left"
            >
              <button
                onClick={() => setActiveVideo(null)}
                aria-label="Cerrar"
                className="absolute top-4 right-4 z-10 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="aspect-video w-full bg-slate-950 flex items-center justify-center">
                {activeVideo.videoUrl ? (
                  <iframe
                    src={activeVideo.videoUrl}
                    title={activeVideo.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="text-center px-6">
                    {/* PLACEHOLDER: insertar el embed real (YouTube/Vimeo) del evento en videoUrl */}
                    <Play className="w-12 h-12 text-primary mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground">Video próximamente disponible</p>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg text-foreground">{activeVideo.title}</h3>
                <p className="text-muted-foreground text-sm mt-2 font-light">{activeVideo.desc}</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <FooterContact />
      <IslandBar />
    </main>
  );
}
