"use client";

import type { ComponentType, CSSProperties } from "react";
import {
    CalendarCheck,
    Clapperboard,
    Compass,
    Crosshair,
    PenTool,
    Terminal,
    Workflow,
    type LucideIcon,
} from "lucide-react";
import type { ContextBackgroundProps } from "@/components/backgrounds/types";
import BlueprintLayer from "@/components/backgrounds/BlueprintLayer";
import ConstellationField from "@/components/backgrounds/ConstellationField";
import FlowField from "@/components/backgrounds/FlowField";
import MetricBurst from "@/components/backgrounds/MetricBurst";
import SignalGrid from "@/components/backgrounds/SignalGrid";
import { AuroraBackground } from "@/components/ui/AuroraBackground";
import type { CraftVariant } from "@/components/ui/CraftFrame";

// ============================================================
// Identidad visual por disciplina para los perfiles de /equipo.
// Cada departamento tiene su fondo contextual, acento, marco de
// oficio (CraftFrame), firma del rol y herramientas del día a día.
// Acentos desaturados que conviven con el dark #020617; el azul
// primario sigue siendo el color dominante del sitio.
// ============================================================

export interface DeptTheme {
    /** Fondo contextual del slide (contrato ContextBackgroundProps). */
    Background: ComponentType<ContextBackgroundProps>;
    /** Color de acento del departamento. */
    accent: string;
    /** Ícono-marca de agua del oficio (cards mobile). */
    motifIcon: LucideIcon;
    /** Variante del marco de oficio sobre el retrato. */
    frame: CraftVariant;
    /** Herramientas reales del día a día (badges, distintas de specialties). */
    tools: string[];
    /** Path SVG de la firma del rol (viewBox 0 0 120 12). */
    underline: string;
}

// Tiñe un fondo redefiniendo sus variables de color SOLO dentro de su capa
// (no contamina pills/botones del slide, que siguen usando --primary global).
function tinted(
    Base: ComponentType<ContextBackgroundProps>,
    vars: CSSProperties
): ComponentType<ContextBackgroundProps> {
    return function TintedBackground(props: ContextBackgroundProps) {
        return (
            <div className="absolute inset-0" style={vars}>
                <Base {...props} />
            </div>
        );
    };
}

function ComercialBurst(props: ContextBackgroundProps) {
    return <MetricBurst {...props} color="#34D399" />;
}

const DEPT_THEMES: Record<string, DeptTheme> = {
    // CEO — arquitectura por etapas: el plano del negocio.
    "Dirección": {
        Background: BlueprintLayer,
        accent: "#488EFF",
        motifIcon: Compass,
        frame: "seal",
        tools: ["Estrategia", "Oferta", "Roadmap 2027"],
        underline: "M 2 8 C 32 5, 78 4, 118 6",
    },
    // Pauta — malla de campañas optimizándose; pulso de señal en la firma.
    "Marketing": {
        Background: tinted(SignalGrid, {
            "--primary": "#F59E0B",
            "--border": "rgba(245, 158, 11, 0.22)",
        } as CSSProperties),
        accent: "#F59E0B",
        motifIcon: Crosshair,
        frame: "crosshair",
        tools: ["Meta Ads", "Google Ads", "Embudos"],
        underline: "M 2 9 H 30 L 38 3 L 46 11 L 54 9 H 118",
    },
    // Ventas — curva que sube; cita confirmada.
    "Comercial": {
        Background: ComercialBurst,
        accent: "#34D399",
        motifIcon: CalendarCheck,
        frame: "check",
        tools: ["Agenda", "WhatsApp", "Seguimiento"],
        underline: "M 2 10 C 50 10, 92 8, 118 2",
    },
    // CRM operativo — leads que convergen en el nexo.
    "CRM & Automatización": {
        Background: FlowField,
        accent: "#7DD3FC",
        motifIcon: Workflow,
        frame: "flow",
        tools: ["GoHighLevel", "A2P", "Workflows"],
        underline: "M 2 9 C 30 9, 36 4, 60 4 C 84 4, 92 9, 118 9",
    },
    // Ingeniería — constelación de nodos (arquitectura de datos) + terminal.
    "CRM & Sistemas": {
        Background: tinted(ConstellationField, {
            "--primary": "#A78BFA",
            "--chart-2": "#C4B5FD",
        } as CSSProperties),
        accent: "#A78BFA",
        motifIcon: Terminal,
        frame: "caret",
        tools: ["APIs", "Integraciones", "Monitoreo"],
        underline: "M 2 9 H 34 L 42 3 H 74 L 82 9 H 118",
    },
    // Edición — malla teñida REC; firma de cortes de timeline.
    "Producción": {
        Background: tinted(SignalGrid, {
            "--primary": "#FB7185",
            "--border": "rgba(251, 113, 133, 0.22)",
        } as CSSProperties),
        accent: "#FB7185",
        motifIcon: Clapperboard,
        frame: "viewfinder",
        tools: ["Premiere", "DaVinci", "CapCut"],
        underline: "M 2 9 H 24 M 32 9 H 60 M 68 9 H 92 M 100 9 H 118",
    },
    // Diseño — aurora teñida (creatividad) + marcas de corte.
    "Diseño & IA": {
        Background: tinted(AuroraBackground, {
            "--color-aurora-mid": "#E879F9",
            "--color-aurora-edge": "#7C3AED",
            "--aurora-opacity": "0.3",
        } as CSSProperties),
        accent: "#E879F9",
        motifIcon: PenTool,
        frame: "cropmarks",
        tools: ["Photoshop", "Illustrator", "IA Generativa"],
        underline: "M 2 9 C 24 1, 44 13, 66 5 C 84 -1, 102 9, 118 4",
    },
};

/** Tema del departamento, con fallback a Dirección para depts futuros. */
export function getDeptTheme(dept: string): DeptTheme {
    return DEPT_THEMES[dept] ?? DEPT_THEMES["Dirección"];
}
