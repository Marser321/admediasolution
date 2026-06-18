"use client";

import { useRef, useState, type CSSProperties, type RefObject } from "react";
import Navbar from "@/components/layout/Navbar";
import FooterContact from "@/components/sections/FooterContact";
import IslandBar from "@/components/layout/IslandBar";
import Image from "next/image";
import { ArrowRight, Camera, ChevronDown, Code, Cpu, ExternalLink, Film, LucideIcon, Megaphone, Palette, UserCheck } from "lucide-react";
import { AnimatePresence, motion, useScroll, useTransform, useReducedMotion, MotionValue } from "framer-motion";
import { useIsDesktop } from "@/lib/useMediaQuery";
import PresenceField from "@/components/backgrounds/PresenceField";
import CraftChips from "@/components/ui/CraftFrame";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import ServiceJourneyMap from "@/components/sections/ServiceJourneyMap";
import { getDeptTheme } from "@/lib/data/teamIdentity";

interface ProjectLink {
  name: string;
  url: string;
}

interface Member {
  name: string;
  role: string;
  dept: string;
  bio: string;
  photoUrl: string;
  icon: LucideIcon;
  specialties: string[];
  projects: ProjectLink[];
  /** Métrica de oficio. PLACEHOLDER: cifras pendientes de confirmar con dirección. */
  stat?: { value: number; suffix: string; label: string };
}

const team: Member[] = [
  {
    name: "Danger Fernández",
    role: "CEO & Fundador",
    dept: "Dirección",
    bio: "Lidera la visión comercial de AD Media Solution y conecta estrategia, pauta, CRM y ventas para que cada proyecto tenga una dirección clara. Su foco está en ordenar la operación, priorizar decisiones y convertir el marketing en un sistema de crecimiento medible.",
    photoUrl: "/team/ceo.png",
    icon: UserCheck,
    specialties: ["Dirección Estratégica", "Estructura Comercial", "Arquitectura de Crecimiento"],
    stat: { value: 10, suffix: "", label: "años dirigiendo la operación" },
    projects: [
      { name: "Perfil de Dirección", url: "/danger" },
      { name: "Consulta Estratégica", url: "/planificacion" }
    ]
  },
  {
    name: "Paola",
    role: "Directora del Departamento ADS y Marketing",
    dept: "Marketing",
    bio: "Coordina la estrategia de pauta y marketing para transformar objetivos comerciales en campañas accionables. Su rol une criterio de segmentación, lectura de embudo y seguimiento del rendimiento para sostener decisiones publicitarias con foco operativo.",
    photoUrl: "/team/equipo-2026/paola-directora-ads-marketing.jpeg",
    icon: Megaphone,
    specialties: ["Dirección de Marketing", "Estrategia ADS", "Optimización de Embudo"],
    stat: { value: 120, suffix: "+", label: "campañas dirigidas" },
    projects: [
      { name: "Dirección de Marketing", url: "/servicios/contenido-generativo" },
      { name: "Catálogo de Servicios", url: "/servicios" }
    ]
  },
  {
    name: "Carmen Lora",
    role: "Especialista en ADS",
    dept: "Marketing",
    bio: "Apoya la ejecución y mejora continua de campañas publicitarias, cuidando la calidad del tráfico, la coherencia de los mensajes y la respuesta del mercado. Su fortaleza está en convertir análisis de campaña en ajustes concretos para captar prospectos mejor calificados.",
    photoUrl: "/team/equipo-2026/carmen-lora-especialista-ads.png",
    icon: Megaphone,
    specialties: ["Gestión de Campañas", "Lectura de Métricas", "Pruebas Creativas"],
    stat: { value: 340, suffix: "+", label: "anuncios optimizados" },
    projects: [
      { name: "Dirección de Marketing", url: "/servicios/contenido-generativo" },
      { name: "Planificación Comercial", url: "/planificacion" }
    ]
  },
  {
    name: "Anllelys",
    role: "Ventas",
    dept: "Comercial",
    bio: "Acompaña el frente comercial con atención, seguimiento y claridad en la comunicación con prospectos. Su aporte mantiene la conexión entre la estrategia de marketing y la experiencia humana que necesita cada oportunidad para avanzar.",
    photoUrl: "/team/equipo-2026/anllelys-ventas.jpg",
    icon: UserCheck,
    specialties: ["Seguimiento Comercial", "Atención a Prospectos", "Coordinación de Agenda"],
    stat: { value: 1500, suffix: "+", label: "conversaciones comerciales" },
    projects: [
      { name: "Consulta Estratégica", url: "/planificacion" },
      { name: "Soporte Comercial", url: "/servicios" }
    ]
  },
  {
    name: "Ariel",
    role: "Director de Área CRM",
    dept: "CRM & Automatización",
    bio: "Dirige el área CRM para que los procesos de captación, seguimiento y soporte tengan estructura. Su trabajo conecta automatizaciones, flujos conversacionales y necesidades comerciales en sistemas que el equipo puede operar con claridad.",
    photoUrl: "/team/equipo-2026/ariel-director-area-crm.jpeg",
    icon: Cpu,
    specialties: ["Dirección CRM", "Automatización Operativa", "Diseño de Flujos"],
    stat: { value: 85, suffix: "+", label: "automatizaciones activas" },
    projects: [
      { name: "CRM & Automatización", url: "/servicios/embudos-neurales" },
      { name: "Soporte y Mantenimiento", url: "/servicios/ads-autopilot" }
    ]
  },
  {
    name: "Juan Esteban",
    role: "Jefe del Departamento de Edición",
    dept: "Producción",
    bio: "Ordena el proceso de edición para que cada pieza audiovisual mantenga intención, ritmo y consistencia de marca. Su enfoque permite transformar material bruto en contenidos claros, comerciales y listos para alimentar campañas o canales orgánicos.",
    photoUrl: "/team/equipo-2026/juan-esteban-jefe-edicion.jpg",
    icon: Film,
    specialties: ["Dirección de Edición", "Ritmo Narrativo", "Control de Calidad Visual"],
    stat: { value: 800, suffix: "+", label: "piezas editadas" },
    projects: [
      { name: "Redes y Contenido", url: "/servicios/contenido-generativo" },
      { name: "Producción Audiovisual", url: "/servicios" }
    ]
  },
  {
    name: "Jesús",
    role: "Ingeniero en Sistemas Especialista en CRM",
    dept: "CRM & Sistemas",
    bio: "Construye y ajusta soluciones CRM desde una mirada técnica, cuidando que formularios, automatizaciones y conexiones trabajen de forma ordenada. Su rol ayuda a que la operación digital sea más estable y fácil de supervisar.",
    photoUrl: "/team/equipo-2026/jesus-ingeniero-sistemas-crm.jpeg",
    icon: Code,
    specialties: ["Ingeniería de Sistemas", "Configuración CRM", "Integraciones Técnicas"],
    stat: { value: 40, suffix: "+", label: "integraciones conectadas" },
    projects: [
      { name: "CRM & Automatización", url: "/servicios/embudos-neurales" },
      { name: "Desarrollo Web", url: "/servicios" }
    ]
  },
  {
    name: "Yerandy Hernández",
    role: "Ingeniero en Sistemas Especialista en CRM",
    dept: "CRM & Sistemas",
    bio: "Refuerza la arquitectura técnica de CRM con atención a la estabilidad, el orden de los datos y el funcionamiento de los flujos. Su trabajo sostiene la continuidad operativa para que marketing, ventas y soporte compartan una misma base de información.",
    photoUrl: "/team/equipo-2026/yerandy-hernandez-ingeniero-sistemas-crm.jpg",
    icon: Cpu,
    specialties: ["Arquitectura CRM", "Mantenimiento Técnico", "Automatización de Procesos"],
    stat: { value: 60, suffix: "+", label: "flujos en producción" },
    projects: [
      { name: "CRM & Automatización", url: "/servicios/embudos-neurales" },
      { name: "Soporte y Mantenimiento", url: "/servicios/ads-autopilot" }
    ]
  },
  {
    name: "Mario Morera",
    role: "Diseñador Gráfico Especialista en IA",
    dept: "Diseño & IA",
    bio: "Desarrolla recursos visuales y piezas gráficas con criterio de marca, apoyándose en herramientas de IA para acelerar exploración, variaciones y producción. Su aporte ayuda a que la comunicación visual sea más clara, moderna y consistente.",
    photoUrl: "/team/equipo-2026/mario-morera-disenador-grafico-ia.png",
    icon: Palette,
    specialties: ["Diseño Gráfico", "Producción con IA", "Identidad Visual"],
    stat: { value: 1200, suffix: "+", label: "piezas gráficas creadas" },
    projects: [
      { name: "Redes y Contenido", url: "/servicios/contenido-generativo" },
      { name: "Diseño para Campañas", url: "/servicios/contenido-generativo" }
    ]
  },
  {
    name: "Juan Pablo Lombana",
    role: "Especialista Editor de Video",
    dept: "Producción",
    bio: "Edita contenido de video con enfoque en claridad, ritmo y utilidad comercial. Su trabajo convierte grabaciones y materiales de campaña en piezas listas para publicar, presentar o probar dentro de una estrategia de contenido.",
    photoUrl: "/team/equipo-2026/juan-pablo-lombana-editor-video.png",
    icon: Camera,
    specialties: ["Edición de Video", "Contenido Comercial", "Postproducción"],
    stat: { value: 500, suffix: "+", label: "videos publicados" },
    projects: [
      { name: "Redes y Contenido", url: "/servicios/contenido-generativo" },
      { name: "Producción Audiovisual", url: "/servicios" }
    ]
  }
];

// Staggered Scrollytelling Animation Variants (desktop carousel)
const cardVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.08, // Fast, snappy delay between elements
    },
  },
} as const;

const photoVariants = {
  hidden: { opacity: 0, scale: 0.6 }, // Portrait zoom entry
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 80, damping: 12 },
  },
} as const;

const nameVariants = {
  hidden: { opacity: 0, x: 100 }, // Slide in from the RIGHT
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring" as const, stiffness: 70, damping: 14 },
  },
} as const;

const roleVariants = {
  hidden: { opacity: 0, y: -40 }, // Fall from the TOP
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 90, damping: 15 },
  },
} as const;

const bioVariants = {
  hidden: { opacity: 0, y: 40 }, // Rise from the BOTTOM
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
} as const;

const specialtiesVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4 },
  },
} as const;

const projectsVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
} as const;

const footerVariants = {
  hidden: { opacity: 0, x: -60 }, // Slide in from the LEFT
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
} as const;

export default function EquipoPage() {
  const targetRef = useRef<HTMLDivElement>(null);

  // Detección de viewport (SSR-safe). Mobile-first por defecto: renderizamos la
  // lista vertical hasta confirmar tras la hidratación que estamos en md+.
  const showDesktop = useIsDesktop();

  // Hooks de scroll del carrusel — declarados siempre (Rules of Hooks). En móvil
  // el carrusel no se monta, así que no enlazamos el ref vacío (evita warnings) y
  // el MotionValue `x` resultante simplemente no se usa.
  const { scrollYProgress } = useScroll({
    target: showDesktop ? targetRef : undefined,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0vw", `-${team.length * 100}vw`]);

  return (
    <main className="bg-background min-h-screen relative text-foreground">
      <Navbar />

      {showDesktop ? (
        <DesktopCarousel
          targetRef={targetRef}
          x={x}
          scrollYProgress={scrollYProgress}
        />
      ) : (
        <MobileTeamList />
      )}

      {/* Footer Contact render after the full track */}
      <FooterContact />
      <IslandBar />
    </main>
  );
}

// ============================================================
// Desktop / Tablet (md+): carrusel horizontal con scroll-jacking
// ============================================================
interface DesktopCarouselProps {
  targetRef: RefObject<HTMLDivElement | null>;
  x: MotionValue<string>;
  scrollYProgress: MotionValue<number>;
}

function DesktopCarousel({
  targetRef,
  x,
  scrollYProgress,
}: DesktopCarouselProps) {
  return (
    /* Horizontal Carousel Section (Vertical Scroll Trigger) */
    <div
      ref={targetRef}
      className="relative bg-background"
      style={{ height: `${(team.length + 1) * 100}vh` }}
    >
      <div className="sticky top-0 h-screen w-screen overflow-hidden flex items-center bg-background">

        {/* Main Horizontal Slide Track */}
        <motion.div style={{ x }} className="flex h-full w-full">

          {/* Slide 0: Massive Intro Slide (Merged with Header for seamless layout transition) */}
          <div className="w-screen h-screen flex-shrink-0 flex flex-col items-center justify-center px-6 pt-20 pb-24 text-center relative select-none overflow-hidden">
            {/* Fondo: presencia del equipo (avatares conectados) */}
            <div className="absolute inset-0">
              <PresenceField intensity="soft" density="mid" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-accent-light/5 pointer-events-none" />
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-5xl relative z-10 flex flex-col items-center justify-center w-full"
            >
              <span className="text-primary text-[10px] md:text-xs font-bold tracking-wider uppercase px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md">
                Especialistas de la Media
              </span>
              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black mt-3 tracking-tight leading-tight md:leading-none text-foreground">
                Los Líderes Detrás <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent-light">
                  de la Operación
                </span>
              </h1>
              <p className="text-muted-foreground text-xs md:text-sm max-w-2xl mx-auto mt-2.5 leading-relaxed font-light">
                Recorre el mapa del servicio paso a paso: qué hacemos, en qué orden y qué área lo ejecuta. Desliza para conocer a cada profesional.
              </p>

              {/* Mapa interactivo del recorrido del servicio */}
              <ServiceJourneyMap />

              <div className="mt-3 flex justify-center items-center gap-2 text-primary font-bold animate-pulse text-[11px] md:text-xs">
                <span>Comenzar recorrido</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </motion.div>
          </div>

          {/* Full Screen Team Members with Staggered Parallax Entrance */}
          {team.map((member, idx) => (
            <TeamMemberSlide
              key={member.name}
              member={member}
              idx={idx}
              scrollYProgress={scrollYProgress}
              totalCount={team.length}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

interface TeamMemberSlideProps {
  member: Member;
  idx: number;
  scrollYProgress: MotionValue<number>;
  totalCount: number;
}

function TeamMemberSlide({
  member,
  idx,
  scrollYProgress,
  totalCount,
}: TeamMemberSlideProps) {
  const Icon = member.icon;
  const theme = getDeptTheme(member.dept);
  const reduce = useReducedMotion();
  // Parallax hook called properly inside a React functional component
  const y = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.25 }}
      style={{ "--member-accent": theme.accent } as CSSProperties}
      className="w-screen h-screen flex-shrink-0 flex flex-col md:flex-row items-center justify-center p-5 sm:p-8 md:p-20 relative overflow-hidden"
    >
      {/* Fondo contextual del oficio (se auto-pausa fuera del viewport) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <theme.Background intensity="soft" density="mid" opacity={0.3} />
      </div>
      {/* Glow tintado con el acento del departamento */}
      <div
        className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none"
        style={{ background: "color-mix(in oklab, var(--member-accent) 7%, transparent)" }}
      />

      {/* Left Column: Visual Container (Vertical Aspect Ratio 3:4 for portrait photos) */}
      <motion.div
        variants={photoVariants}
        className="w-full md:w-[35vw] h-[30vh] sm:h-[34vh] md:h-[60vh] flex-shrink-0 rounded-3xl p-6 sm:p-8 bg-card/30 border border-border backdrop-blur-md shadow-2xl flex items-center justify-center overflow-hidden relative z-10 group"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent-light/5 z-10 pointer-events-none" />

        {/* Parallax Icon/Profile Container */}
        <motion.div
          style={{ y }}
          className="w-full h-full flex items-center justify-center"
        >
          {member.photoUrl ? (
            <div className="relative w-full h-full rounded-2xl overflow-hidden">
              <Image
                src={member.photoUrl}
                alt={member.name}
                fill
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 35vw"
                priority={idx === 0}
              />
            </div>
          ) : (
            <div className="w-32 h-32 md:w-44 md:h-44 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shadow-xl group-hover:scale-105 transition-transform duration-500 relative z-20">
              <Icon className="w-16 h-16 md:w-20 md:h-20 text-primary" />
            </div>
          )}
        </motion.div>

        {/* Chips de cristal con el oficio (nada tapa el retrato) */}
        <CraftChips chips={theme.chips} timecode={theme.timecode} className="bottom-4 z-20" />
      </motion.div>

      {/* Right Column: Detailed Info Container (Staggered Texts) */}
      <div className="w-full md:w-[50vw] flex flex-col justify-center text-left md:pl-12 lg:pl-16 mt-6 md:mt-0 relative z-10">
        <motion.span
          variants={roleVariants}
          className="text-xs font-bold tracking-widest uppercase mb-2 block"
          style={{ color: "var(--member-accent)" }}
        >
          {member.dept} — Especialidad
        </motion.span>

        {/* Staggered Name */}
        <motion.h2
          variants={nameVariants}
          className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight"
        >
          {member.name}
        </motion.h2>

        {/* Role Title */}
        <motion.h3
          variants={roleVariants}
          className="text-base md:text-xl font-bold mt-2 tracking-wide"
          style={{ color: "var(--member-accent)" }}
        >
          {member.role}
        </motion.h3>

        {/* Description Bio */}
        <motion.p
          variants={bioVariants}
          className="text-muted-foreground text-sm md:text-base mt-4 leading-relaxed max-w-xl"
        >
          {member.bio}
        </motion.p>

        {/* Specialties / Areas of Expertise */}
        <motion.div variants={specialtiesVariants} className="mt-5">
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Áreas de Especialidad:</h4>
          <div className="flex flex-wrap gap-2">
            {member.specialties.map((spec, sIdx) => (
              <span
                key={sIdx}
                className="text-xs bg-muted/80 text-foreground border px-3 py-1.5 rounded-full font-medium"
                style={{ borderColor: "color-mix(in oklab, var(--member-accent) 35%, transparent)" }}
              >
                {spec}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Herramientas del día a día */}
        <motion.div variants={specialtiesVariants} className="mt-4">
          <div className="flex flex-wrap gap-2">
            {theme.tools.map((tool) => (
              <span
                key={tool}
                className="inline-flex items-center gap-1.5 rounded-md border border-border/70 bg-card/40 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground"
              >
                <span className="size-1.5 rounded-full" style={{ background: "var(--member-accent)" }} />
                {tool}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Key Projects & Case Studies */}
        <motion.div variants={projectsVariants} className="mt-5">
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Proyectos Clave:</h4>
          <div className="flex flex-wrap gap-3">
            {member.projects.map((proj, pIdx) => (
              <a
                key={pIdx}
                href={proj.url}
                className="inline-flex items-center gap-1.5 text-xs text-primary font-bold border border-primary/20 hover:border-primary/50 bg-primary/5 hover:bg-primary/10 px-3.5 py-1.5 rounded-xl transition-all duration-300 cursor-pointer"
              >
                {proj.name}
                <ExternalLink className="w-3 h-3" />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Footer / Staggered Details */}
        <motion.div
          variants={footerVariants}
          className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground/60 border-t border-border/40 pt-5 max-w-xl"
        >
          <span className="font-mono text-sm font-semibold" style={{ color: "var(--member-accent)" }}>
            0{idx + 1} / {totalCount}
          </span>
          <span>•</span>
          <span>AD Media Solution Staff</span>
          {member.stat && (
            <>
              <span>•</span>
              <span className="flex items-baseline gap-1.5">
                <span style={{ color: "var(--member-accent)" }}>
                  <AnimatedCounter
                    value={member.stat.value}
                    suffix={member.stat.suffix}
                    stable={!!reduce}
                    className="font-mono text-base sm:text-lg lg:text-lg font-bold text-inherit tracking-tight"
                  />
                </span>
                <span>{member.stat.label}</span>
              </span>
            </>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

// ============================================================
// Mobile (< md): lista vertical apilada con scroll normal
// Sin scroll-jacking, sin h-screen, sin overflow-hidden → nada se recorta.
// ============================================================
function MobileTeamList() {
  const shouldReduceMotion = useReducedMotion();
  const [journeyOpen, setJourneyOpen] = useState(false);

  return (
    <div className="md:hidden px-5 pt-24 pb-16 bg-background">
      {/* Hero compacto */}
      <header className="text-center mb-8 relative overflow-hidden">
        {/* Fondo: presencia del equipo (avatares conectados) */}
        <PresenceField intensity="soft" density="low" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[320px] h-[320px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center">
          <span className="text-primary text-xs font-bold tracking-wider uppercase px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md">
            Especialistas de la Media
          </span>
          <h1 className="text-3xl xs:text-4xl font-black mt-5 tracking-tight leading-tight text-foreground">
            Los Líderes Detrás{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent-light">
              de la Operación
            </span>
          </h1>
          <p className="text-muted-foreground text-sm max-w-md mx-auto mt-3 leading-relaxed font-light">
            Conoce a cada profesional de AD Media Solution y cómo trabajamos juntos punto a punto.
          </p>
        </div>
      </header>

      <section className="mb-6 rounded-3xl border border-primary/20 bg-card/45 p-5 text-left shadow-xl backdrop-blur-md">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Cómo trabajamos</p>
        <h2 className="mt-2 text-xl font-black text-foreground">Un sistema claro, sin retrasar el acceso al equipo.</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Diagnosticamos, configuramos el sistema, producimos los activos y acompañamos la operación comercial.
        </p>
        <button
          type="button"
          onClick={() => setJourneyOpen((open) => !open)}
          aria-expanded={journeyOpen}
          className="mt-4 flex min-h-11 w-full items-center justify-between rounded-2xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm font-bold text-primary"
        >
          {journeyOpen ? "Ocultar recorrido completo" : "Ver recorrido completo"}
          <ChevronDown className={`size-5 transition-transform ${journeyOpen ? "rotate-180" : ""}`} />
        </button>

        <AnimatePresence initial={false}>
          {journeyOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <ServiceJourneyMap />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Tarjetas de miembros */}
      <div className="space-y-6">
        {team.map((member, idx) => (
          <MobileTeamCard
            key={member.name}
            member={member}
            idx={idx}
            total={team.length}
            reduceMotion={!!shouldReduceMotion}
          />
        ))}
      </div>
    </div>
  );
}

interface MobileTeamCardProps {
  member: Member;
  idx: number;
  total: number;
  reduceMotion: boolean;
}

function MobileTeamCard({ member, idx, total, reduceMotion }: MobileTeamCardProps) {
  const Icon = member.icon;
  const theme = getDeptTheme(member.dept);
  const Motif = theme.motifIcon;

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{
        "--member-accent": theme.accent,
        borderLeftColor: "color-mix(in oklab, var(--member-accent) 55%, transparent)",
      } as CSSProperties}
      className="relative overflow-hidden rounded-3xl border border-l-2 border-border bg-card/40 backdrop-blur-md p-5 sm:p-6 shadow-xl"
    >
      {/* Tinte radial del acento del departamento */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 88% 8%, color-mix(in oklab, var(--member-accent) 9%, transparent), transparent 55%)",
        }}
      />
      {/* Visual / placeholder de retrato — caja de aspecto real, no h-fija */}
      <div className="w-full aspect-[4/5] rounded-2xl overflow-hidden relative bg-card/30 border border-border flex items-center justify-center mb-5 group">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent-light/5 z-10 pointer-events-none" />
        {member.photoUrl ? (
          <Image
            src={member.photoUrl}
            alt={member.name}
            fill
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 400px"
            priority={idx === 0}
          />
        ) : (
          <div className="w-28 h-28 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shadow-xl relative z-20">
            <Icon className="w-14 h-14 text-primary" />
          </div>
        )}
        {/* Chips de oficio (estáticos en mobile) */}
        <CraftChips chips={theme.chips} timecode={theme.timecode} animated={false} className="bottom-2 z-20" />
      </div>

      {/* Texto */}
      <div className="relative">
        <Motif
          aria-hidden="true"
          className="absolute -right-1 -top-1 size-16 opacity-[0.07]"
          style={{ color: "var(--member-accent)" }}
        />
        <span
          className="text-xs font-bold tracking-widest uppercase mb-2 block"
          style={{ color: "var(--member-accent)" }}
        >
          {member.dept} — Especialidad
        </span>
        <h2 className="text-2xl font-black tracking-tight leading-tight text-foreground">
          {member.name}
        </h2>
        <h3 className="text-base font-bold mt-1 tracking-wide" style={{ color: "var(--member-accent)" }}>
          {member.role}
        </h3>
      </div>
      <p className="text-muted-foreground text-sm mt-3 leading-relaxed">
        {member.bio}
      </p>

      {/* Especialidades */}
      <div className="mt-5">
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Áreas de Especialidad:</h4>
        <div className="flex flex-wrap gap-2">
          {member.specialties.map((spec, sIdx) => (
            <span
              key={sIdx}
              className="text-xs bg-muted/80 text-foreground border px-3 py-1.5 rounded-full font-medium"
              style={{ borderColor: "color-mix(in oklab, var(--member-accent) 35%, transparent)" }}
            >
              {spec}
            </span>
          ))}
        </div>
      </div>

      {/* Herramientas del día a día */}
      <div className="mt-4 flex flex-wrap gap-2">
        {theme.tools.map((tool) => (
          <span
            key={tool}
            className="inline-flex items-center gap-1.5 rounded-md border border-border/70 bg-card/40 px-2.5 py-1.5 font-mono text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground"
          >
            <span className="size-1.5 rounded-full" style={{ background: "var(--member-accent)" }} />
            {tool}
          </span>
        ))}
      </div>

      {/* Proyectos clave */}
      <div className="mt-5">
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Proyectos Clave:</h4>
        <div className="flex flex-wrap gap-3">
          {member.projects.map((proj, pIdx) => (
            <a
              key={pIdx}
              href={proj.url}
              className="inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-primary/20 bg-primary/5 px-3.5 py-2 text-xs font-bold text-primary transition-all duration-300 hover:border-primary/50 hover:bg-primary/10"
            >
              {proj.name}
              <ExternalLink className="w-3 h-3" />
            </a>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground/60 border-t border-border/40 pt-4">
        <span className="font-mono text-sm font-semibold" style={{ color: "var(--member-accent)" }}>
          0{idx + 1} / {total}
        </span>
        <span>•</span>
        <span>AD Media Solution Staff</span>
        {member.stat && (
          <>
            <span>•</span>
            <span className="flex items-baseline gap-1.5">
              <span style={{ color: "var(--member-accent)" }}>
                <AnimatedCounter
                  value={member.stat.value}
                  suffix={member.stat.suffix}
                  stable={reduceMotion}
                  className="font-mono text-base sm:text-base lg:text-base font-bold text-inherit tracking-tight"
                />
              </span>
              <span>{member.stat.label}</span>
            </span>
          </>
        )}
      </div>
    </motion.article>
  );
}
