"use client";

import Navbar from "@/components/layout/Navbar";
import FooterContact from "@/components/sections/FooterContact";
import IslandBar from "@/components/layout/IslandBar";
import { useState } from "react";
import { MessageSquare, Play, Video, ExternalLink, Calendar, Users, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import VideoBackground from "@/components/ui/VideoBackground";

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

      <section className="relative pt-24 sm:pt-28 pb-12 sm:pb-16 px-5 sm:px-6 overflow-hidden">
        <VideoBackground
          src="/videos/comunidad-header.mp4"
          poster="/videos/comunidad-header-poster.jpg"
          className="z-0 h-[680px] sm:h-[760px] bottom-auto"
          posterClassName="opacity-[0.45] sm:opacity-[0.55]"
          videoClassName="opacity-[0.45] sm:opacity-[0.55] md:opacity-[0.6]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_26%,rgba(2,6,23,0.05),rgba(2,6,23,0.4)_55%,rgba(2,6,23,0.82)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background via-background/70 to-transparent" />
        </VideoBackground>

        {/* Ambient glow */}
        <div className="absolute top-1/4 left-1/2 z-[2] -translate-x-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto max-w-5xl relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary text-xs font-bold tracking-wider uppercase px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md">
              AD Media Community
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black mt-5 tracking-tight leading-tight">
              Conecta, Comparte y <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent-light">
                Aprende en Comunidad
              </span>
            </h1>
            <p className="text-muted-foreground text-sm md:text-lg max-w-2xl mx-auto mt-4 sm:mt-5 font-light leading-relaxed">
              Grupo privado de WhatsApp, eventos de networking y grabaciones de nuestros workshops.
            </p>
          </motion.div>

          {/* Join Call to Action Banner */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 sm:mt-10 p-6 sm:p-8 md:p-10 rounded-3xl bg-gradient-to-br from-card to-primary/5 border border-primary/25 flex flex-col lg:flex-row items-center justify-between text-left shadow-2xl backdrop-blur-md"
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

              {/* Pulso de presencia — comunidad activa (sin métricas inventadas) */}
              <div className="flex items-center gap-3 mt-4">
                <div className="flex -space-x-2">
                  {["from-primary to-accent-light", "from-sky-500 to-blue-600", "from-blue-400 to-primary"].map((g, i) => (
                    <span
                      key={i}
                      className={`w-7 h-7 rounded-full bg-gradient-to-br ${g} border-2 border-card`}
                    />
                  ))}
                </div>
                <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75 animate-ping" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  Comunidad activa ahora
                </span>
              </div>
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
          <div className="mt-12 sm:mt-16 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/5 border border-primary/20 text-xs font-semibold text-primary mb-4">
              <Video className="w-3.5 h-3.5 text-accent-light" />
              Biblioteca de Workshops
            </div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5 sm:mb-7">
              Eventos y Masterclasses Pasadas
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
              {videos.map((vid, idx) => (
                <motion.div
                  key={vid.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="group bg-card/70 border border-primary/20 hover:border-primary/45 rounded-3xl overflow-hidden shadow-lg backdrop-blur-md flex flex-col justify-between transition-colors duration-300"
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
                      {/* Descripción: oculta por defecto, se revela al hover de la tarjeta */}
                      <p className="text-muted-foreground text-xs leading-relaxed font-light overflow-hidden max-h-0 opacity-0 group-hover:max-h-32 group-hover:opacity-100 group-hover:mt-3 transition-all duration-300">
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
              <div className="aspect-video w-full bg-slate-950 flex items-center justify-center relative overflow-hidden group">
                {activeVideo.videoUrl ? (
                  <iframe
                    src={activeVideo.videoUrl}
                    title={activeVideo.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col justify-between p-6">
                    {/* Top Streaming Header */}
                    <div className="flex justify-between items-center text-[10px] font-mono text-white/60">
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                        AD MEDIA LIVE
                      </span>
                      <span>1080p HD</span>
                    </div>

                    {/* Center Equalizer & Title */}
                    <div className="flex flex-col items-center justify-center gap-4 py-8">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-16 h-16 rounded-full bg-primary/20 border border-primary flex items-center justify-center text-primary shadow-2xl backdrop-blur-md cursor-pointer"
                      >
                        <Play className="w-7 h-7 fill-current ml-0.5" />
                      </motion.div>
                      <div className="text-center">
                        <p className="text-sm font-bold text-white tracking-wide">{activeVideo.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">Conectando con el servidor de streaming...</p>
                      </div>
                    </div>

                    {/* Bottom Custom Video Controls */}
                    <div className="space-y-3">
                      <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden relative">
                        <motion.div 
                          animate={{ width: ["0%", "85%"] }}
                          transition={{ duration: 15, ease: "linear", repeat: Infinity }}
                          className="h-full bg-primary rounded-full" 
                        />
                      </div>
                      <div className="flex justify-between items-center text-[10px] font-mono text-white/50">
                        <div className="flex gap-4">
                          <span>04:12 / {activeVideo.duration}</span>
                          <span>Volumen: 80%</span>
                        </div>
                        <span>Subtítulos: ES</span>
                      </div>
                    </div>
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
