"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Loader2, Server, Globe, Database, Cpu } from "lucide-react";
import ScannerDashboard from "./ScannerDashboard";

const STEPS = [
    {
        icon: Globe,
        label: "Analizando Huella Digital",
        sublabel: "Rastreando infraestructura y autoridad...",
        duration: 2000,
    },
    {
        icon: Database,
        label: "Auditando Estructura de Datos",
        sublabel: "Verificando integridad de esquemas...",
        duration: 2500,
    },
    {
        icon: Server,
        label: "Midiendo Latencia Global",
        sublabel: "Ping a servidores edge (TTFB)...",
        duration: 1800,
    },
    {
        icon: Cpu,
        label: "Calculando Potencial de Ingresos",
        sublabel: "Simulando escenarios de optimización...",
        duration: 3000,
    },
];

interface ScannerModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialUrl: string;
    skipAnimation?: boolean;
}

export default function ScannerModal({
    isOpen,
    onClose,
    initialUrl,
    skipAnimation = false
}: ScannerModalProps) {
    const [step, setStep] = useState(0);
    const [showDashboard, setShowDashboard] = useState(false);
    const [completedSteps, setCompletedSteps] = useState<number[]>([]);
    const isOpenRef = useRef(isOpen);

    useEffect(() => {
        isOpenRef.current = isOpen;
    }, [isOpen]);

    const startScanning = useCallback(async () => {
        // Resetear flag local al iniciar nuevo scan
        localStorage.removeItem("scannerComplete");

        // Pausa inicial
        await new Promise((resolve) => setTimeout(resolve, 500));

        for (let i = 0; i < STEPS.length; i++) {
            if (!isOpenRef.current) return; // Abortar si se cierra
            setStep(i);
            await new Promise((resolve) => setTimeout(resolve, STEPS[i].duration));
            setCompletedSteps((prev) => [...prev, i]);
        }

        // Pausa final
        await new Promise((resolve) => setTimeout(resolve, 800));

        setShowDashboard(true);
        localStorage.setItem("scannerComplete", "true");
    }, []);

    useEffect(() => {
        if (isOpen) {
            if (skipAnimation) {
                setStep(STEPS.length);
                setCompletedSteps(STEPS.map((_, i) => i));
                setShowDashboard(true);
            } else {
                setStep(0);
                setShowDashboard(false);
                setCompletedSteps([]);
                startScanning();
            }
        } else {
            // Reset al cerrar
            setTimeout(() => setShowDashboard(false), 500);
        }
    }, [isOpen, skipAnimation, startScanning]);


    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-bg-deep/95 backdrop-blur-xl"
                >
                    {/* Botón Cerrar */}
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-text-muted hover:text-white transition-colors z-50"
                    >
                        <X className="size-6" />
                    </button>

                    <div className="w-full h-full overflow-y-auto">
                        {!showDashboard ? (
                            // VISTA DE CARGA (TEATRO)
                            <div className="min-h-full flex flex-col items-center justify-center p-6">
                                <div className="w-full max-w-md space-y-8">
                                    {/* Header escaneo */}
                                    <div className="text-center mb-12">
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                            className="inline-flex mb-6 p-4 rounded-full bg-accent-blue/10 border border-accent-blue/20"
                                        >
                                            <Loader2 className="size-12 text-accent-blue" />
                                        </motion.div>
                                        <h3 className="text-2xl font-display font-bold text-text-primary mb-2">
                                            Analizando {initialUrl || "Infraestructura"}
                                        </h3>
                                        <p className="text-accent-light font-mono text-sm">
                                            AID NODE: CONNECTED • LATENCY: 12ms
                                        </p>
                                    </div>

                                    {/* Pasos */}
                                    <div className="space-y-4">
                                        {STEPS.map((s, i) => {
                                            const isActive = step === i;
                                            const isCompleted = completedSteps.includes(i);

                                            return (
                                                <motion.div
                                                    key={s.label}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: i * 0.1 }}
                                                    className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 ${isActive
                                                        ? "bg-accent-blue/10 border-accent-blue/30 scale-102"
                                                        : isCompleted
                                                            ? "bg-emerald-500/5 border-emerald-500/20"
                                                            : "bg-white/[0.02] border-white/5 opacity-50"
                                                        }`}
                                                >
                                                    <div className={`p-2 rounded-lg ${isActive ? "bg-accent-blue text-white" : isCompleted ? "bg-emerald-500 text-white" : "bg-white/10 text-slate-500"
                                                        }`}>
                                                        {isCompleted ? <CheckCircle2 className="size-5" /> : <s.icon className="size-5" />}
                                                    </div>

                                                    <div className="flex-1">
                                                        <p className={`font-medium ${isActive || isCompleted ? "text-text-primary" : "text-text-muted"}`}>
                                                            {s.label}
                                                        </p>
                                                        {isActive && (
                                                            <motion.p
                                                                initial={{ opacity: 0 }}
                                                                animate={{ opacity: 1 }}
                                                                className="text-xs text-accent-blue mt-1 font-mono"
                                                            >
                                                                {s.sublabel}
                                                            </motion.p>
                                                        )}
                                                    </div>

                                                    {isActive && <Loader2 className="size-4 text-accent-blue animate-spin" />}
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            // DASHBOARD DE RESULTADOS
                            <ScannerDashboard onClaim={() => {
                                onClose();
                                document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
                            }} />
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
