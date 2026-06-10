import { cn } from "@/lib/utils";

// ============================================================
// SectionDivider — Línea divisoria de secciones unificada.
// Extraída del gradiente duplicado en VSLSection; da ritmo visual
// consistente entre bloques de la home sin pesar nada.
// ============================================================

interface SectionDividerProps {
    className?: string;
}

export default function SectionDivider({ className }: SectionDividerProps) {
    return (
        <div
            aria-hidden="true"
            className={cn(
                "h-px w-full bg-gradient-to-r from-transparent via-primary/20 to-transparent",
                className
            )}
        />
    );
}
