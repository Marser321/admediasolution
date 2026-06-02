"use client";

import { useRef, useState, type RefObject } from "react";
import Navbar from "@/components/layout/Navbar";
import FooterContact from "@/components/sections/FooterContact";
import IslandBar from "@/components/layout/IslandBar";
import Image from "next/image";
import { Camera, Code, UserCheck, Briefcase, ArrowRight, ExternalLink, Cpu, LucideIcon } from "lucide-react";
import { motion, useScroll, useTransform, useReducedMotion, MotionValue } from "framer-motion";
import { useIsDesktop } from "@/lib/useMediaQuery";

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
}

// PLACEHOLDER: fotos (photoUrl) y los perfiles de refuerzo son marcadores.
// Reemplazar con fotos y datos reales. Departamentos: Dirección, Marketing, Comercial, Desarrollo, Producción.
const team: Member[] = [
  {
    name: "Danger Fernández",
    role: "CEO & Founder",
    dept: "Dirección",
    bio: "Fundador y estratega jefe de AD Media. Especialista en consultoría estratégica comercial, automatización de sistemas de venta y optimización de pauta para negocios con facturación de alto ticket.",
    photoUrl: "/brand/logo-crm.png",
    icon: UserCheck,
    specialties: ["Dirección Estratégica", "Consultoría Comercial VIP", "Ingeniería de Ingresos"],
    projects: [
      { name: "Caso EcomScale ($80K)", url: "/danger" },
      { name: "Estructura HealthFit", url: "/danger" }
    ]
  },
  {
    name: "Ariel Oliva",
    role: "CRM Director & Specialist",
    dept: "CRM",
    bio: "Director y especialista del área de CRM. Experto en el diseño de arquitecturas conversacionales avanzadas, automatización de ventas mediante GoHighLevel e integración de inteligencia artificial y automatizaciones.",
    photoUrl: "/brand/logo-crm.png",
    icon: Cpu,
    specialties: ["Dirección de CRM", "Automatizaciones de Ventas", "Inteligencia Artificial"],
    projects: [
      { name: "Flujos de WhatsApp GHL", url: "/servicios" },
      { name: "Integración de IA Conversacional", url: "/servicios" }
    ]
  },
  {
    name: "Angely Gomez",
    role: "Jefa de Ventas y Atención al Cliente",
    dept: "Comercial",
    bio: "Responsable de liderar el departamento de ventas y atención al cliente. Brinda soporte integral y asistencia de operaciones a todo el equipo de AD Media Solution.",
    photoUrl: "/brand/logo-crm.png",
    icon: UserCheck,
    specialties: ["Liderazgo de Ventas", "Atención al Cliente", "Soporte Operativo"],
    projects: [
      { name: "Optimización de Embudo", url: "/servicios" },
      { name: "Soporte y Asistencia General", url: "/servicios" }
    ]
  },
  {
    name: "Paola Parra",
    role: "Jefa Administrativa y Especialista en Ads",
    dept: "Dirección",
    bio: "Responsable de la gestión administrativa y especialista en pauta publicitaria. Diseña y optimiza campañas de ads con un control riguroso de presupuestos operativos.",
    photoUrl: "/brand/logo-crm.png",
    icon: Briefcase,
    specialties: ["Dirección Administrativa", "Meta y Google Ads", "Gestión de Presupuestos"],
    projects: [
      { name: "Administración Operativa", url: "/servicios" },
      { name: "Estrategias de Pauta Digital", url: "/servicios" }
    ]
  },
  {
    name: "Jesús Reyes",
    role: "Ingeniero de Software y Especialista CRM",
    dept: "Desarrollo",
    bio: "Especialista en programación, ingeniería de software e integraciones técnicas de CRM. Encargado de extender la plataforma mediante webhooks y código personalizado.",
    photoUrl: "/brand/logo-crm.png",
    icon: Code,
    specialties: ["Ingeniería de Software", "Desarrollo a Medida", "Integración de CRM"],
    projects: [
      { name: "Desarrollo Cloud CRM", url: "/servicios" },
      { name: "Conectores Personalizados", url: "/servicios" }
    ]
  },
  {
    name: "Yerlandy Núñez Hernández",
    role: "Ingeniero de Sistemas y Especialista CRM",
    dept: "Desarrollo",
    bio: "Especialista en CRM, ingeniero de software e ingeniero de sistemas. Experto en la gestión de aprobaciones de cumplimiento de telefonía A2P y tareas especiales de CRM.",
    photoUrl: "/brand/logo-crm.png",
    icon: Code,
    specialties: ["Aprobaciones de Telefonía A2P", "Ingeniería de Sistemas", "Seguridad Conversacional"],
    projects: [
      { name: "Cumplimiento Normativo A2P", url: "/servicios" },
      { name: "Infraestructura Segura CRM", url: "/servicios" }
    ]
  },
  {
    name: "Carmen Lora",
    role: "Asistente de Ads y Marketing",
    dept: "Marketing",
    bio: "Asistente y miembro clave de los departamentos de publicidad y marketing. Apoya en el montaje y monitoreo diario de campañas de tráfico de pago omnicanal.",
    photoUrl: "/brand/logo-crm.png",
    icon: Briefcase,
    specialties: ["Soporte de Ads", "Monitoreo de Campañas", "Auxiliar de Marketing"],
    projects: [
      { name: "Montaje de Campañas", url: "/servicios" },
      { name: "Métricas de Conversión", url: "/servicios" }
    ]
  },
  {
    name: "Yelena Díaz",
    role: "Atención al Cliente, Ventas y Soporte",
    dept: "Comercial",
    bio: "Parte fundamental de las áreas de atención al cliente, ventas y soporte. Garantiza el correcto seguimiento de los leads calificados en los embudos de la agencia.",
    photoUrl: "/brand/logo-crm.png",
    icon: UserCheck,
    specialties: ["Atención al Cliente", "Ventas de Conversión", "Soporte Técnico CRM"],
    projects: [
      { name: "Operación de Soporte Activo", url: "/servicios" },
      { name: "Closer de Ventas Consultivas", url: "/servicios" }
    ]
  },
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
  const [hoveredRoadmapIndex, setHoveredRoadmapIndex] = useState<number | null>(null);

  // Detección de viewport (SSR-safe). Mobile-first por defecto: renderizamos la
  // lista vertical hasta confirmar tras la hidratación que estamos en md+.
  const showDesktop = useIsDesktop();

  // Hooks de scroll del carrusel — declarados siempre (Rules of Hooks). En móvil
  // el carrusel no se monta, así que no enlazamos el ref vacío (evita warnings) y
  // el MotionValue `x` resultante simplemente no se usa.
  const { scrollYProgress } = useScroll({ target: showDesktop ? targetRef : undefined });
  // Total horizontal offset: 9 slides (Intro + 8 members) = 800vw
  const x = useTransform(scrollYProgress, [0, 1], ["0vw", "-800vw"]);

  return (
    <main className="bg-background min-h-screen relative text-foreground">
      <Navbar />

      {showDesktop ? (
        <DesktopCarousel
          targetRef={targetRef}
          x={x}
          scrollYProgress={scrollYProgress}
          hoveredRoadmapIndex={hoveredRoadmapIndex}
          setHoveredRoadmapIndex={setHoveredRoadmapIndex}
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
  hoveredRoadmapIndex: number | null;
  setHoveredRoadmapIndex: (index: number | null) => void;
}

function DesktopCarousel({
  targetRef,
  x,
  scrollYProgress,
  hoveredRoadmapIndex,
  setHoveredRoadmapIndex,
}: DesktopCarouselProps) {
  return (
    /* Horizontal Carousel Section (Vertical Scroll Trigger) */
    <div ref={targetRef} className="relative h-[900vh] bg-background">
      <div className="sticky top-0 h-screen w-screen overflow-hidden flex items-center bg-background">

        {/* Main Horizontal Slide Track */}
        <motion.div style={{ x }} className="flex h-full w-full">

          {/* Slide 0: Massive Intro Slide (Merged with Header for seamless layout transition) */}
          <div className="w-screen h-screen flex-shrink-0 flex flex-col items-center justify-center px-6 text-center relative select-none">
            {/* Default background overlay */}
            <div className={`absolute inset-0 bg-gradient-to-b from-primary/5 to-accent-light/5 transition-opacity duration-700 pointer-events-none ${hoveredRoadmapIndex !== null ? "opacity-0" : "opacity-100"}`} />
            <div className={`absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[140px] transition-opacity duration-700 pointer-events-none ${hoveredRoadmapIndex !== null ? "opacity-0" : "opacity-100"}`} />

            {/* Dynamic cross-fading background overlays */}
            {[
              { src: "/roadmap/1.png", glow: "bg-amber-500/20" },
              { src: "/roadmap/2.png", glow: "bg-orange-500/20" },
              { src: "/roadmap/3.png", glow: "bg-purple-500/20" },
              { src: "/roadmap/5.png", glow: "bg-teal-500/20" },
              { src: "/roadmap/4.png", glow: "bg-emerald-500/20" },
            ].map((bg, index) => {
              const isActive = hoveredRoadmapIndex === index;
              return (
                <div key={index} className="absolute inset-0 pointer-events-none overflow-hidden">
                  {/* Background image with low opacity for transparentized context overlay */}
                  <div
                    className={`absolute inset-0 transition-opacity duration-700 ${isActive ? "opacity-[0.18]" : "opacity-0"}`}
                  >
                    <Image
                      src={bg.src}
                      alt="Roadmap background"
                      fill
                      className="object-cover"
                      sizes="100vw"
                      priority={index === 0}
                    />
                  </div>
                  {/* Ambient Glow */}
                  <div className={`absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] ${bg.glow} rounded-full blur-[140px] transition-all duration-700 ${isActive ? "opacity-100 scale-105" : "opacity-0 scale-95"}`} />
                </div>
              );
            })}

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-5xl relative z-10 flex flex-col items-center justify-center w-full"
            >
              <span className="text-primary text-xs md:text-sm font-bold tracking-wider uppercase px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md">
                Especialistas de la Media
              </span>
              <h1 className="text-4xl md:text-7xl font-black mt-6 tracking-tight leading-none text-foreground">
                Los Líderes Detrás <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent-light">
                  de la Operación
                </span>
              </h1>
              <p className="text-muted-foreground text-xs md:text-sm max-w-2xl mx-auto mt-4 leading-relaxed font-light">
                Desliza hacia abajo para conocer a cada profesional en nuestro carrusel interactivo, o explora nuestro mapa de sinergias punto a punto.
              </p>

              {/* Synergy Roadmap Component */}
              <SynergyRoadmap hoveredIndex={hoveredRoadmapIndex} setHoveredIndex={setHoveredRoadmapIndex} />

              <div className="mt-8 flex justify-center items-center gap-2 text-primary font-bold animate-pulse text-xs md:text-sm">
                <span>Comenzar recorrido</span>
                <ArrowRight className="w-4.5 h-4.5" />
              </div>
            </motion.div>
          </div>

          {/* Slides 1 to 11: Full Screen Team Members with Staggered Parallax Entrance */}
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
  // Parallax hook called properly inside a React functional component
  const y = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.25 }}
      className="w-screen h-screen flex-shrink-0 flex flex-col md:flex-row items-center justify-center p-8 md:p-24 relative overflow-hidden"
    >
      {/* Subtle Background Glow per slide */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Left Column: Visual Container (Vertical Aspect Ratio 3:4 for portrait photos) */}
      <motion.div
        variants={photoVariants}
        className="w-full md:w-[35vw] h-[35vh] md:h-[65vh] flex-shrink-0 rounded-3xl p-8 bg-card/30 border border-border backdrop-blur-md shadow-2xl flex items-center justify-center overflow-hidden relative group"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent-light/5" />

        {/* Parallax Icon/Profile Container */}
        <motion.div
          style={{ y }}
          className="w-32 h-32 md:w-44 md:h-44 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shadow-xl group-hover:scale-105 transition-transform duration-500"
        >
          <Icon className="w-16 h-16 md:w-20 md:h-20 text-primary" />
        </motion.div>

        <span className="absolute bottom-6 left-6 text-xs text-muted-foreground font-mono">
          Portrait Slot: ADM-P-{idx + 1}
        </span>
      </motion.div>

      {/* Right Column: Detailed Info Container (Staggered Texts) */}
      <div className="w-full md:w-[50vw] flex flex-col justify-center text-left md:pl-16 mt-8 md:mt-0">
        <motion.span
          variants={roleVariants}
          className="text-xs text-primary font-bold tracking-widest uppercase mb-2 block"
        >
          {member.dept} — Especialidad
        </motion.span>

        {/* Staggered Name */}
        <motion.h2
          variants={nameVariants}
          className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight"
        >
          {member.name}
        </motion.h2>

        {/* Role Title */}
        <motion.h3
          variants={roleVariants}
          className="text-base md:text-xl text-accent-light font-bold mt-2 tracking-wide"
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
        <motion.div variants={specialtiesVariants} className="mt-6">
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Áreas de Especialidad:</h4>
          <div className="flex flex-wrap gap-2">
            {member.specialties.map((spec, sIdx) => (
              <span key={sIdx} className="text-xs bg-muted/80 text-foreground border border-border px-3 py-1.5 rounded-full font-medium">
                {spec}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Key Projects & Case Studies */}
        <motion.div variants={projectsVariants} className="mt-6">
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
          className="mt-8 flex items-center gap-6 text-xs text-muted-foreground/60 border-t border-border/40 pt-6 max-w-sm"
        >
          <span className="font-mono text-sm font-semibold text-primary">
            0{idx + 1} / {totalCount}
          </span>
          <span>•</span>
          <span>AD Media Solution Staff</span>
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

  return (
    <div className="md:hidden px-5 pt-28 pb-24 bg-background">
      {/* Hero compacto */}
      <header className="text-center mb-12 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[320px] h-[320px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center">
          <span className="text-primary text-xs font-bold tracking-wider uppercase px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md">
            Especialistas de la Media
          </span>
          <h1 className="text-3xl xs:text-4xl font-black mt-6 tracking-tight leading-tight text-foreground">
            Los Líderes Detrás{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent-light">
              de la Operación
            </span>
          </h1>
          <p className="text-muted-foreground text-sm max-w-md mx-auto mt-3 leading-relaxed font-light">
            Conoce a cada profesional de AD Media Solution y cómo trabajamos juntos punto a punto.
          </p>

          {/* Mapa de sinergias — reusa el stack vertical móvil del componente */}
          <SynergyRoadmap hoveredIndex={null} setHoveredIndex={() => {}} />
        </div>
      </header>

      {/* Tarjetas de miembros */}
      <div className="space-y-8">
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

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="rounded-3xl border border-border bg-card/40 backdrop-blur-md p-6 shadow-xl"
    >
      {/* Visual / placeholder de retrato — caja de aspecto real, no h-fija */}
      <div className="w-full aspect-[4/5] rounded-2xl overflow-hidden relative bg-card/30 border border-border flex items-center justify-center mb-6">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent-light/5" />
        <div className="w-28 h-28 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shadow-xl">
          <Icon className="w-14 h-14 text-primary" />
        </div>
        <span className="absolute bottom-4 left-4 text-xs text-muted-foreground font-mono">
          Portrait Slot: ADM-P-{idx + 1}
        </span>
      </div>

      {/* Texto */}
      <span className="text-xs text-primary font-bold tracking-widest uppercase mb-2 block">
        {member.dept} — Especialidad
      </span>
      <h2 className="text-2xl font-black tracking-tight leading-tight text-foreground">
        {member.name}
      </h2>
      <h3 className="text-base text-accent-light font-bold mt-1 tracking-wide">
        {member.role}
      </h3>
      <p className="text-muted-foreground text-sm mt-3 leading-relaxed">
        {member.bio}
      </p>

      {/* Especialidades */}
      <div className="mt-5">
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Áreas de Especialidad:</h4>
        <div className="flex flex-wrap gap-2">
          {member.specialties.map((spec, sIdx) => (
            <span key={sIdx} className="text-xs bg-muted/80 text-foreground border border-border px-3 py-1.5 rounded-full font-medium">
              {spec}
            </span>
          ))}
        </div>
      </div>

      {/* Proyectos clave */}
      <div className="mt-5">
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Proyectos Clave:</h4>
        <div className="flex flex-wrap gap-3">
          {member.projects.map((proj, pIdx) => (
            <a
              key={pIdx}
              href={proj.url}
              className="inline-flex items-center gap-1.5 text-xs text-primary font-bold border border-primary/20 hover:border-primary/50 bg-primary/5 hover:bg-primary/10 px-3.5 py-2 rounded-xl transition-all duration-300"
            >
              {proj.name}
              <ExternalLink className="w-3 h-3" />
            </a>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 flex items-center gap-4 text-xs text-muted-foreground/60 border-t border-border/40 pt-4">
        <span className="font-mono text-sm font-semibold text-primary">
          0{idx + 1} / {total}
        </span>
        <span>•</span>
        <span>AD Media Solution Staff</span>
      </div>
    </motion.article>
  );
}

interface SynergyRoadmapProps {
  hoveredIndex: number | null;
  setHoveredIndex: (index: number | null) => void;
}

function SynergyRoadmap({ hoveredIndex, setHoveredIndex }: SynergyRoadmapProps) {

  const nodes = [
    {
      title: "1. Estrategia",
      role: "Dirección",
      desc: "Plano comercial y estructuración de la oferta high-ticket. Aquí definimos el rumbo.",
      icon: Briefcase,
      x: 10,
      y: 50,
    },
    {
      title: "2. Pauta Ads",
      role: "Tráfico de Pago",
      desc: "Campañas en Meta/Google de alta conversión para atraer prospectos calificados.",
      icon: Camera,
      x: 30,
      y: 25,
    },
    {
      title: "3. CRM & Automatización",
      role: "GoHighLevel & A2P",
      desc: "Sistemas conversacionales y aprobaciones A2P que automatizan el seguimiento sin fricciones.",
      icon: Cpu,
      x: 50,
      y: 75,
    },
    {
      title: "4. Ingeniería de Software",
      role: "Desarrollo",
      desc: "Plataformas web ultrarrápidas, embudos de venta y conexiones API a la medida.",
      icon: Code,
      x: 70,
      y: 25,
    },
    {
      title: "5. Ventas & Soporte",
      role: "Cierre y Conversión",
      desc: "Operación de agendas, cierre de llamadas y soporte técnico posventa del CRM.",
      icon: UserCheck,
      x: 90,
      y: 50,
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto mt-10 px-4">
      {/* Desktop Version: Interactive SVG winding roadmap */}
      <div className="hidden md:block relative w-full h-[220px]">
        {/* Connection Line Background */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1000 200"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="glow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#488EFF" />
              <stop offset="50%" stopColor="#81E7FF" />
              <stop offset="100%" stopColor="#488EFF" />
            </linearGradient>
          </defs>

          {/* Underlay static trace */}
          <path
            d="M 100 100 C 200 50, 200 50, 300 50 C 400 50, 400 150, 500 150 C 600 150, 600 50, 700 50 C 800 50, 800 100, 900 100"
            fill="none"
            stroke="rgba(72, 142, 255, 0.1)"
            strokeWidth="4"
          />

          {/* Glowing Animated Dash Path */}
          <motion.path
            d="M 100 100 C 200 50, 200 50, 300 50 C 400 50, 400 150, 500 150 C 600 150, 600 50, 700 50 C 800 50, 800 100, 900 100"
            fill="none"
            stroke="url(#glow-gradient)"
            strokeWidth="3"
            strokeDasharray="10, 15"
            animate={{
              strokeDashoffset: [0, -100]
            }}
            transition={{
              ease: "linear",
              duration: 8,
              repeat: Infinity
            }}
          />
        </svg>

        {/* Nodes Positioning */}
        {nodes.map((node, index) => {
          const NodeIcon = node.icon;
          const isHovered = hoveredIndex === index;

          return (
            <div
              key={index}
              style={{
                position: "absolute",
                left: `${node.x}%`,
                top: `${node.y}%`,
                transform: "translate(-50%, -50%)",
              }}
              className="z-20 cursor-pointer group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Outer Glow */}
              <motion.div
                animate={{
                  scale: isHovered ? 1.25 : 1,
                  boxShadow: isHovered
                    ? "0 0 20px rgba(72, 142, 255, 0.5)"
                    : "0 0 0px rgba(0,0,0,0)",
                }}
                className={`w-12 h-12 rounded-full flex items-center justify-center bg-card border-[2px] transition-colors duration-300 ${
                  isHovered ? "border-primary text-primary" : "border-border text-muted-foreground group-hover:border-primary/50 group-hover:text-foreground"
                }`}
              >
                <NodeIcon className="w-5 h-5" />
              </motion.div>

              {/* Node Title underneath */}
              <div className="absolute top-14 left-1/2 -translate-x-1/2 w-[150px] text-center select-none">
                <p className={`text-[11px] font-bold transition-colors duration-300 ${isHovered ? "text-primary" : "text-foreground"}`}>
                  {node.title}
                </p>
                <p className="text-[9px] text-muted-foreground mt-0.5 uppercase tracking-wider font-semibold">
                  {node.role}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dynamic Detail Card for Desktop */}
      <div className="hidden md:block mt-6 min-h-[80px] border border-primary/10 bg-card/25 backdrop-blur-md rounded-2xl p-4 text-center transition-all duration-300">
        {hoveredIndex !== null ? (
          <motion.div
            key={hoveredIndex}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            <h4 className="text-xs font-bold text-primary uppercase tracking-wider">
              {nodes[hoveredIndex].title} &mdash; {nodes[hoveredIndex].role}
            </h4>
            <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed font-light">
              {nodes[hoveredIndex].desc}
            </p>
          </motion.div>
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground text-xs font-light italic">
            Pasa el cursor por los nodos del mapa de sinergias para ver el flujo de trabajo de nuestro equipo.
          </div>
        )}
      </div>

      {/* Mobile Version: Vertical Roadmap Stack */}
      <div className="block md:hidden mt-6 space-y-4 relative pl-8 text-left">
        {/* Connecting Vertical Line */}
        <div className="absolute left-[17px] top-4 bottom-4 w-[2px] bg-primary/20" />

        {nodes.map((node, index) => {
          const NodeIcon = node.icon;
          return (
            <div key={index} className="relative flex flex-col gap-1 p-3 rounded-xl border border-primary/10 bg-card/30 backdrop-blur-sm">
              {/* Mobile Node Icon */}
              <div className="absolute -left-[31px] top-3.5 w-8 h-8 rounded-full bg-card border border-primary flex items-center justify-center text-primary shadow-md">
                <NodeIcon className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-primary uppercase tracking-wider">
                {node.title}
              </h4>
              <p className="text-[9px] text-accent-light uppercase tracking-wider font-semibold">
                {node.role}
              </p>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed font-light">
                {node.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
