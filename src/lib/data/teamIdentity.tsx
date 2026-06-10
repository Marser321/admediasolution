"use client";

import type { ComponentType } from "react";
import {
    Activity,
    BarChart3,
    Cable,
    CalendarCheck,
    Clapperboard,
    Compass,
    Handshake,
    Headset,
    Megaphone,
    MessageSquare,
    Palette,
    PenTool,
    PhoneCall,
    Scissors,
    Sparkles,
    Terminal,
    TrendingUp,
    Workflow,
    Zap,
    type LucideIcon,
} from "lucide-react";
import type { ContextBackgroundProps } from "@/components/backgrounds/types";
import BlueprintLayer from "@/components/backgrounds/BlueprintLayer";
import ConstellationField from "@/components/backgrounds/ConstellationField";
import FlowField from "@/components/backgrounds/FlowField";
import MetricBurst from "@/components/backgrounds/MetricBurst";
import SignalGrid from "@/components/backgrounds/SignalGrid";
import { AuroraBackground } from "@/components/ui/AuroraBackground";

// ============================================================
// Identidad visual por disciplina para los perfiles de /equipo.
// TODO el color vive dentro de la familia azul/celeste de la marca;
// la diferenciación entre áreas viene de los chips de oficio (cristal),
// el fondo contextual y el matiz de azul — nunca de colores ajenos.
// ============================================================

export interface CraftChip {
    icon: LucideIcon;
    label: string;
}

export interface DeptTheme {
    /** Fondo contextual del slide (contrato ContextBackgroundProps, colores de marca). */
    Background: ComponentType<ContextBackgroundProps>;
    /** Matiz de azul del departamento (familia primary/celeste). */
    accent: string;
    /** Ícono-marca de agua del oficio (cards mobile). */
    motifIcon: LucideIcon;
    /** Chips de cristal con íconos concretos del oficio (borde del retrato). */
    chips: CraftChip[];
    /** Solo Producción: chip extra con timecode corriendo en vivo. */
    timecode?: boolean;
    /** Herramientas reales del día a día (badges bajo la bio). */
    tools: string[];
}

const DEPT_THEMES: Record<string, DeptTheme> = {
    // CEO — arquitectura por etapas: el plano del negocio.
    "Dirección": {
        Background: BlueprintLayer,
        accent: "#0066FF",
        motifIcon: Compass,
        chips: [
            { icon: Compass, label: "Estrategia" },
            { icon: Handshake, label: "Acuerdos" },
        ],
        tools: ["Estrategia", "Oferta", "Roadmap 2027"],
    },
    // Pauta — malla de campañas optimizándose.
    "Marketing": {
        Background: SignalGrid,
        accent: "#488EFF",
        motifIcon: Megaphone,
        chips: [
            { icon: Megaphone, label: "Campañas" },
            { icon: BarChart3, label: "Métricas" },
            { icon: TrendingUp, label: "Embudo" },
        ],
        tools: ["Meta Ads", "Google Ads", "Embudos"],
    },
    // Ventas — agenda, llamadas y atención.
    "Comercial": {
        Background: MetricBurst,
        accent: "#7DD3FC",
        motifIcon: CalendarCheck,
        chips: [
            { icon: CalendarCheck, label: "Agenda" },
            { icon: PhoneCall, label: "Llamadas" },
            { icon: Headset, label: "Atención" },
        ],
        tools: ["Agenda", "WhatsApp", "Seguimiento"],
    },
    // CRM operativo — leads que convergen en el nexo.
    "CRM & Automatización": {
        Background: FlowField,
        accent: "#38BDF8",
        motifIcon: Workflow,
        chips: [
            { icon: Workflow, label: "Flujos" },
            { icon: MessageSquare, label: "WhatsApp" },
            { icon: Zap, label: "Automatización" },
        ],
        tools: ["GoHighLevel", "A2P", "Workflows"],
    },
    // Ingeniería — constelación de nodos (arquitectura de datos).
    "CRM & Sistemas": {
        Background: ConstellationField,
        accent: "#8FB4FF",
        motifIcon: Terminal,
        chips: [
            { icon: Terminal, label: "Código" },
            { icon: Cable, label: "Integraciones" },
            { icon: Activity, label: "Monitoreo" },
        ],
        tools: ["APIs", "Integraciones", "Monitoreo"],
    },
    // Edición — celdas de clips + timecode vivo.
    "Producción": {
        Background: SignalGrid,
        accent: "#60A5FA",
        motifIcon: Clapperboard,
        chips: [
            { icon: Clapperboard, label: "Rodaje" },
            { icon: Scissors, label: "Corte" },
        ],
        timecode: true,
        tools: ["Premiere", "DaVinci", "CapCut"],
    },
    // Diseño — aurora de marca (creatividad).
    "Diseño & IA": {
        Background: AuroraBackground,
        accent: "#93C5FD",
        motifIcon: PenTool,
        chips: [
            { icon: Palette, label: "Marca" },
            { icon: PenTool, label: "Diseño" },
            { icon: Sparkles, label: "IA" },
        ],
        tools: ["Photoshop", "Illustrator", "IA Generativa"],
    },
};

/** Tema del departamento, con fallback a Dirección para depts futuros. */
export function getDeptTheme(dept: string): DeptTheme {
    return DEPT_THEMES[dept] ?? DEPT_THEMES["Dirección"];
}
