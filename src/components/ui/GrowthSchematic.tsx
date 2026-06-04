"use client";

import React from "react";
import { motion, MotionValue, useTransform } from "framer-motion";
import { Award, Target, Landmark, ShieldCheck, Sparkles, LucideIcon } from "lucide-react";
import { useHydratedReducedMotion } from "@/lib/useHydratedReducedMotion";

interface NodePoint {
  id: number;
  year: string;
  label: string;
  icon: LucideIcon;
  x: number;
  y: number;
  desc: string;
}

const NODES: NodePoint[] = [
  { id: 1, year: "2016", label: "Semilla & Inicio", icon: Award, x: 200, y: 350, desc: "Danger inicia solo" },
  { id: 2, year: "2019", label: "Estructura & Base", icon: Landmark, x: 500, y: 200, desc: "Primera oficina física" },
  { id: 3, year: "2022", label: "Sistemas & Producción", icon: Target, x: 800, y: 450, desc: "Estudio de producción" },
  { id: 4, year: "2026", label: "Optimización & CRM", icon: ShieldCheck, x: 1100, y: 250, desc: "Soporte y automatización" },
  { id: 5, year: "2027+", label: "Futuro & Expansión IA", icon: Sparkles, x: 1400, y: 380, desc: "Crecimiento exponencial" },
];

const pathD = "M 200 350 C 350 275, 350 200, 500 200 C 650 200, 650 450, 800 450 C 950 450, 950 250, 1100 250 C 1250 250, 1250 380, 1400 380";

interface GrowthSchematicProps {
  scrollYProgress: MotionValue<number>;
  activeIndex: number;
}

export default function GrowthSchematic({ scrollYProgress, activeIndex }: GrowthSchematicProps) {
  const shouldReduceMotion = useHydratedReducedMotion();

  // Animación de autotrazado de la línea según el scroll
  const pathLength = useTransform(scrollYProgress, [0.12, 0.88], [0, 1]);

  // Desplazamiento horizontal transversal para centrar los hitos en pantalla
  const svgX = useTransform(
    scrollYProgress,
    [0, 0.15, 0.32, 0.49, 0.66, 0.83, 1.0],
    ["18%", "10%", "-5%", "-20%", "-35%", "-50%", "-55%"]
  );

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-[2]">
      {/* Contenedor con efecto de profundidad Parallax horizontal */}
      <motion.div
        style={{ x: shouldReduceMotion ? "0%" : svgX }}
        className="w-[1700px] h-full flex items-center justify-start relative transition-all duration-300 ease-out transform-gpu"
      >
        <svg
          viewBox="0 0 1600 600"
          className="w-[1600px] h-[600px]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="schematic-glow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#007AFF" />
              <stop offset="50%" stopColor="#00D4FF" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
            <filter id="glow-filter" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Línea guía de fondo transparente */}
          <path
            d={pathD}
            fill="none"
            stroke="rgba(255, 255, 255, 0.05)"
            strokeWidth="5"
            strokeLinecap="round"
            opacity={0.6}
          />

          {/* Línea animada que se autotraza */}
          <motion.path
            d={pathD}
            fill="none"
            stroke="url(#schematic-glow)"
            strokeWidth="3.5"
            strokeLinecap="round"
            opacity={0.35}
            style={{ pathLength }}
          />

          {/* Nodos de los Hitos */}
          {NODES.map((node) => {
            const isActive = activeIndex === node.id;
            const NodeIcon = node.icon;

            return (
              <g 
                key={node.id} 
                className="transition-all duration-500 transform-gpu"
                opacity={isActive ? 1.0 : 0.35}
              >
                {/* Halo de brillo animado en nodos activos */}
                {isActive && (
                  <motion.circle
                    cx={node.x}
                    cy={node.y}
                    r={35}
                    fill="none"
                    stroke="#00D4FF"
                    strokeWidth="1.5"
                    initial={{ scale: 0.8, opacity: 0.2 }}
                    animate={{ scale: 1.3, opacity: [0.6, 0.2, 0.6] }}
                    transition={{
                      scale: { duration: 0.5 },
                      opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                    }}
                    filter="url(#glow-filter)"
                  />
                )}

                {/* Círculo base del nodo */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={22}
                  className={`transition-colors duration-500 fill-card border stroke-[2] ${
                    isActive ? "stroke-primary" : "stroke-white/10"
                  }`}
                  style={{
                    filter: isActive ? "drop-shadow(0 0 12px rgba(0, 122, 255, 0.45))" : "none",
                  }}
                />

                {/* SVG Icon perfectamente centrado en el nodo */}
                <NodeIcon
                  x={node.x - 10}
                  y={node.y - 10}
                  width={20}
                  height={20}
                  className={`transition-colors duration-500 ${
                    isActive ? "text-primary" : "text-white/40"
                  }`}
                />

                {/* Etiquetas de texto de los nodos con visibilidad diferenciada (Escalón) */}
                <text
                  x={node.x}
                  y={node.y + 44}
                  textAnchor="middle"
                  className={`transition-all duration-500 font-mono font-bold ${
                    isActive ? "fill-primary font-black text-[13px]" : "fill-foreground/40 text-[11px]"
                  }`}
                >
                  {node.year}
                </text>
                <text
                  x={node.x}
                  y={node.y + 60}
                  textAnchor="middle"
                  className={`transition-all duration-500 uppercase tracking-wider font-semibold ${
                    isActive ? "fill-foreground font-extrabold text-[11px]" : "fill-muted-foreground/50 text-[9px]"
                  }`}
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>
      </motion.div>
    </div>
  );
}
