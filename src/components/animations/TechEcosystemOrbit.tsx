"use client";

import { useRef, useState, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import {
    Target,
    Bot,
    BarChart3,
    Zap,
    RefreshCw,
    TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================================
// Datos de los nodos orbitales
// ============================================================
const TECH_NODES = [
    { icon: Target, label: "Targeting IA", color: "#00f3ff" },
    { icon: Bot, label: "Automatización", color: "#38bdf8" },
    { icon: BarChart3, label: "Analytics", color: "#00f3ff" },
    { icon: Zap, label: "Ads Engine", color: "#38bdf8" },
    { icon: RefreshCw, label: "Retención", color: "#00f3ff" },
    { icon: TrendingUp, label: "Escalado", color: "#38bdf8" },
];

// ============================================================
// Componente de Líneas de Conexión SVG
// ============================================================
function ConnectionLines({ radius, centerX, centerY }: { radius: number; centerX: number; centerY: number }) {
    const lines = useMemo(() => {
        const nodes = TECH_NODES.length;
        const lines: { x1: number; y1: number; x2: number; y2: number; delay: number }[] = [];

        // Crear líneas entre nodos opuestos y adyacentes
        for (let i = 0; i < nodes; i++) {
            const angle1 = (i * 360) / nodes - 90;
            const rad1 = (angle1 * Math.PI) / 180;
            const x1 = centerX + radius * Math.cos(rad1);
            const y1 = centerY + radius * Math.sin(rad1);

            // Conectar con el nodo opuesto
            const opposite = (i + nodes / 2) % nodes;
            const angle2 = (opposite * 360) / nodes - 90;
            const rad2 = (angle2 * Math.PI) / 180;
            const x2 = centerX + radius * Math.cos(rad2);
            const y2 = centerY + radius * Math.sin(rad2);

            if (i < nodes / 2) {
                lines.push({ x1, y1, x2, y2, delay: i * 0.3 });
            }
        }
        return lines;
    }, [radius, centerX, centerY]);

    return (
        <svg className="absolute inset-0 w-full h-full" viewBox={`0 0 ${centerX * 2} ${centerY * 2}`}>
            <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00f3ff" stopOpacity="0.4" />
                    <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#00f3ff" stopOpacity="0.4" />
                </linearGradient>
                <filter id="lineGlow">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {/* Anillo orbital */}
            <circle
                cx={centerX}
                cy={centerY}
                r={radius}
                fill="none"
                stroke="url(#lineGradient)"
                strokeWidth="1"
                strokeDasharray="8 6"
                opacity="0.2"
            >
                <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from={`0 ${centerX} ${centerY}`}
                    to={`360 ${centerX} ${centerY}`}
                    dur="30s"
                    repeatCount="indefinite"
                />
            </circle>

            {/* Segundo anillo fantasma */}
            <circle
                cx={centerX}
                cy={centerY}
                r={radius * 0.6}
                fill="none"
                stroke="#00f3ff"
                strokeWidth="0.5"
                strokeDasharray="4 8"
                opacity="0.1"
            >
                <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from={`360 ${centerX} ${centerY}`}
                    to={`0 ${centerX} ${centerY}`}
                    dur="20s"
                    repeatCount="indefinite"
                />
            </circle>

            {/* Líneas de conexión entre nodos */}
            {lines.map((line, i) => (
                <g key={i} filter="url(#lineGlow)">
                    <motion.line
                        x1={line.x1}
                        y1={line.y1}
                        x2={line.x2}
                        y2={line.y2}
                        stroke="url(#lineGradient)"
                        strokeWidth="1"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.3 }}
                        transition={{ duration: 1.5, delay: 0.5 + line.delay, ease: "easeOut" }}
                    />
                    {/* Pulso que recorre la línea */}
                    <line
                        x1={line.x1}
                        y1={line.y1}
                        x2={line.x2}
                        y2={line.y2}
                        stroke="#00f3ff"
                        strokeWidth="2"
                        strokeDasharray="8 100"
                        opacity="0.6"
                    >
                        <animate
                            attributeName="stroke-dashoffset"
                            from="108"
                            to="0"
                            dur={`${2 + i * 0.5}s`}
                            repeatCount="indefinite"
                        />
                    </line>
                </g>
            ))}
        </svg>
    );
}

// ============================================================
// Nodo Orbital Individual
// ============================================================
function OrbitalNode({
    node,
    index,
    total,
    radius,
    centerX,
    centerY,
    isInView,
}: {
    node: (typeof TECH_NODES)[0];
    index: number;
    total: number;
    radius: number;
    centerX: number;
    centerY: number;
    isInView: boolean;
}) {
    const [isHovered, setIsHovered] = useState(false);
    const Icon = node.icon;
    const angle = (index * 360) / total - 90;
    const rad = (angle * Math.PI) / 180;
    const x = centerX + radius * Math.cos(rad);
    const y = centerY + radius * Math.sin(rad);
    const nodeSize = 52;
    const halfNode = nodeSize / 2;

    return (
        <motion.div
            className="absolute z-20 group"
            style={{
                left: x - halfNode,
                top: y - halfNode,
                width: nodeSize,
                height: nodeSize,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{
                duration: 0.6,
                delay: 0.3 + index * 0.12,
                ease: [0.22, 1, 0.36, 1],
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Glow detrás del nodo */}
            <motion.div
                className="absolute inset-0 rounded-full"
                style={{ backgroundColor: node.color, filter: "blur(15px)" }}
                animate={{
                    opacity: isHovered ? 0.4 : 0.15,
                    scale: isHovered ? 1.5 : 1,
                }}
                transition={{ duration: 0.3 }}
            />

            {/* Nodo principal */}
            <motion.div
                className={cn(
                    "relative w-full h-full rounded-full flex items-center justify-center",
                    "bg-bg-deep/80 border backdrop-blur-sm",
                    "shadow-lg cursor-pointer transition-colors duration-300"
                )}
                style={{
                    borderColor: isHovered ? node.color : `${node.color}33`,
                    boxShadow: isHovered
                        ? `0 0 20px ${node.color}40, inset 0 0 10px ${node.color}10`
                        : `0 0 10px ${node.color}15`,
                }}
                animate={{
                    scale: isHovered ? 1.2 : 1,
                    y: [0, -4, 0],
                }}
                transition={{
                    scale: { duration: 0.2 },
                    y: { duration: 3 + index * 0.5, repeat: Infinity, ease: "easeInOut" },
                }}
            >
                <Icon
                    className="size-5 sm:size-6 transition-colors duration-300"
                    style={{ color: isHovered ? node.color : `${node.color}aa` }}
                />
            </motion.div>

            {/* Tooltip */}
            <motion.div
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : -5 }}
                transition={{ duration: 0.2 }}
            >
                <span className="text-[10px] font-mono uppercase tracking-wider text-accent-blue/80 bg-bg-deep/90 px-2 py-1 rounded-md border border-accent-blue/10">
                    {node.label}
                </span>
            </motion.div>
        </motion.div>
    );
}

// ============================================================
// Núcleo Central
// ============================================================
function CoreNode({
    centerX,
    centerY,
    isInView,
}: {
    centerX: number;
    centerY: number;
    isInView: boolean;
}) {
    const coreSize = 80;
    const halfCore = coreSize / 2;

    return (
        <motion.div
            className="absolute z-30"
            style={{
                left: centerX - halfCore,
                top: centerY - halfCore,
                width: coreSize,
                height: coreSize,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
            {/* Glow pulsante exterior */}
            <motion.div
                className="absolute inset-0 rounded-full bg-accent-blue/20"
                style={{ filter: "blur(20px)" }}
                animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Anillo intermedio */}
            <motion.div
                className="absolute inset-[-8px] rounded-full border border-accent-blue/15"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                style={{ borderStyle: "dashed" }}
            />

            {/* Core sólido */}
            <div className="relative w-full h-full rounded-full bg-bg-deep border border-accent-blue/30 flex flex-col items-center justify-center shadow-2xl backdrop-blur-md overflow-hidden">
                {/* Brillo interno */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-b from-accent-blue/10 to-transparent" />

                <motion.div
                    className="relative z-10"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    <span className="text-[10px] font-mono font-bold text-accent-blue uppercase tracking-[0.15em]">
                        AI
                    </span>
                    <span className="block text-[8px] font-mono text-accent-blue/60 uppercase tracking-widest">
                        Core
                    </span>
                </motion.div>
            </div>
        </motion.div>
    );
}

// ============================================================
// Componente Principal — TechEcosystemOrbit
// ============================================================
export default function TechEcosystemOrbit() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: "-80px" });

    // Dimensiones del sistema orbital
    const viewSize = 340;
    const center = viewSize / 2;
    const orbitRadius = 120;

    return (
        <div
            ref={containerRef}
            className="relative w-full max-w-[340px] mx-auto aspect-square"
        >
            {/* Contenedor del sistema orbital */}
            <div className="relative w-full h-full" style={{ width: viewSize, height: viewSize }}>
                {/* Líneas de conexión SVG */}
                <ConnectionLines
                    radius={orbitRadius}
                    centerX={center}
                    centerY={center}
                />

                {/* Núcleo central */}
                <CoreNode
                    centerX={center}
                    centerY={center}
                    isInView={isInView}
                />

                {/* Nodos orbitales */}
                {TECH_NODES.map((node, index) => (
                    <OrbitalNode
                        key={node.label}
                        node={node}
                        index={index}
                        total={TECH_NODES.length}
                        radius={orbitRadius}
                        centerX={center}
                        centerY={center}
                        isInView={isInView}
                    />
                ))}
            </div>
        </div>
    );
}
