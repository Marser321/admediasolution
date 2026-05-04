"use client";

import { useState, useEffect, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, ChevronLeft, Loader2, Sparkles, ShieldCheck, Terminal, Cpu } from "lucide-react";
import { Button } from "./Button";

// ============================================================
// Quiz Data with Expert Insights
// ============================================================
const STEPS = [
    {
        id: "revenue",
        question: "¿Cuál es el nivel de facturación actual de tu negocio?",
        options: [
            { label: "Menos de $10k / mes", value: "low", insight: "Detección: Fase de validación de mercado. Riesgo de estancamiento alto." },
            { label: "$10k - $50k / mes", value: "mid", insight: "Detección: Cuello de botella en escalabilidad operativa identificado." },
            { label: "+$50k / mes (Escalando)", value: "high", insight: "Detección: Ineficiencia en ROAS detectada por falta de arquitectura IA." },
        ]
    },
    {
        id: "bottleneck",
        question: "¿Cuál es el mayor cuello de botella en tus ingresos?",
        options: [
            { label: "Generación de Leads (Poco flujo)", value: "leads", insight: "Diagnóstico: Fuga de capital en el TOFU (Top of Funnel)." },
            { label: "Tasa de Cierre (Ghosting)", value: "closing", insight: "Diagnóstico: Deficiencia crítica en el protocolo de seguimiento automatizado." },
            { label: "Caos Operativo (Sin sistemas)", value: "ops", insight: "Diagnóstico: Deuda técnica acumulada. Riesgo de colapso en escalado." },
        ]
    },
    {
        id: "crm",
        question: "¿Utilizas actualmente algún ecosistema de CRM?",
        options: [
            { label: "No, todo es manual / excel", value: "none", insight: "Alerta: Infraestructura obsoleta detectada. El 40% de los datos se están perdiendo." },
            { label: "Sí, pero no está optimizado", value: "bad_crm", insight: "Alerta: Fricción en el Pipeline. El sistema está trabajando en contra del equipo." },
            { label: "Buscando migrar a una solución White-Label", value: "migration", insight: "Insight: Oportunidad de arquitectura Revenue OS detectada." },
        ]
    }
];

const DIAGNOSTIC_LOGS = [
    "Iniciando escaneo de infraestructura...",
    "Analizando ineficiencias en el Pipeline...",
    "Detectando fugas de facturación en el seguimiento...",
    "Evaluando compatibilidad con Revenue OS...",
    "Generando informe de arquitectura de ingresos..."
];

// ============================================================
// Audit Quiz Component — High Friction / High Intent
// ============================================================
// ============================================================
// Sub-components (Memoized for Performance)
// ============================================================

const DiagnosticScan = memo(({ logIndex }: { logIndex: number }) => (
    <motion.div 
        key="calculating"
        initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, scale: 1.02, filter: "blur(10px)" }}
        transition={{ duration: 0.8 }}
        className="w-full glass-premium p-12 rounded-3xl border-primary/30 text-center shadow-2xl shadow-primary/5"
    >
        <div className="relative size-28 mx-auto mb-10">
            <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-b-2 border-primary/40 rounded-full"
            />
            <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                className="absolute inset-3 border-t-2 border-accent-light/30 rounded-full"
            />
            <div className="absolute inset-0 flex items-center justify-center">
                <Cpu className="size-10 text-primary animate-pulse" />
            </div>
        </div>
        
        <h3 className="text-xl font-display-heavy text-foreground mb-8 tracking-[0.2em] uppercase">EJECUTANDO DIAGNÓSTICO DE INGRESOS</h3>
        
        <div className="space-y-4 max-w-sm mx-auto text-left font-mono text-[12px] text-primary/70">
            {DIAGNOSTIC_LOGS.slice(0, logIndex).map((log, i) => (
                <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3"
                >
                    <Terminal className="size-3.5 opacity-50" />
                    <span className="tracking-tight">{log}</span>
                    {i === logIndex - 1 && <motion.span animate={{ opacity: [0, 1] }} transition={{ repeat: Infinity, duration: 0.5 }} className="bg-primary/50 w-2 h-4" />}
                </motion.div>
            ))}
        </div>
    </motion.div>
));

DiagnosticScan.displayName = "DiagnosticScan";

const SuccessState = memo(({ onSubmit }: { onSubmit: () => void }) => (
    <motion.div 
        key="finished"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full glass-premium p-10 sm:p-14 rounded-3xl border-primary/20 relative overflow-hidden shadow-2xl"
    >
        <div className="absolute -top-24 -right-24 size-64 bg-primary/10 blur-[100px] rounded-full" />
        
        <div className="text-center mb-12 relative z-10">
            <div className="size-20 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mx-auto mb-8 shadow-2xl shadow-primary/20">
                <ShieldCheck className="size-10" />
            </div>
            <h3 className="text-3xl sm:text-4xl font-display-heavy text-foreground mb-5 tracking-tight">DIAGNÓSTICO COMPLETADO</h3>
            <p className="text-base text-muted-foreground leading-relaxed max-w-md mx-auto">
                Tu infraestructura califica para una <span className="text-foreground font-bold underline decoration-primary/50">Auditoría de Ingeniería de Ingresos</span>. <br className="hidden sm:block" /> 
                Completa los datos para recibir el informe técnico.
            </p>
        </div>
        
        <form className="space-y-6 relative z-10" onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
            <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground/60 ml-1">Nombre Completo</label>
                    <input placeholder="Ej: Mario Morera" className="w-full bg-background/50 border border-white/5 rounded-xl px-5 py-4 text-sm focus:border-primary/50 focus:ring-1 focus:ring-primary/20 outline-none transition-all placeholder:text-muted-foreground/30" required />
                </div>
                <div className="space-y-2">
                    <label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground/60 ml-1">Empresa / Sitio Web</label>
                    <input placeholder="Ej: admediasolution.com" className="w-full bg-background/50 border border-white/5 rounded-xl px-5 py-4 text-sm focus:border-primary/50 focus:ring-1 focus:ring-primary/20 outline-none transition-all placeholder:text-muted-foreground/30" required />
                </div>
            </div>
            <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground/60 ml-1">Email Corporativo</label>
                <input type="email" placeholder="mario@empresa.com" className="w-full bg-background/50 border border-white/5 rounded-xl px-5 py-4 text-sm focus:border-primary/50 focus:ring-1 focus:ring-primary/20 outline-none transition-all placeholder:text-muted-foreground/30" required />
            </div>
            
            <Button className="w-full py-10 rounded-2xl text-xl font-display-heavy tracking-[0.05em] shadow-2xl shadow-primary/20 hover:shadow-primary/40 transition-all border border-primary/40">
                SOLICITAR REVISIÓN DE INGENIERÍA
            </Button>
            
            <p className="text-center text-[11px] text-muted-foreground/40 font-medium">
                <span className="flex items-center justify-center gap-2">
                    <Loader2 className="size-3.5 animate-spin text-primary" />
                    Procesando bajo estándares de seguridad Revenue OS
                </span>
            </p>
        </form>
    </motion.div>
));

SuccessState.displayName = "SuccessState";

// ============================================================
// Main Audit Quiz Component
// ============================================================
export default function AuditQuiz() {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [lastInsight, setLastInsight] = useState<string | null>(null);
    const [isCalculating, setIsCalculating] = useState(false);
    const [logIndex, setLogIndex] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleOptionSelect = useCallback((stepId: string, value: string, insight: string) => {
        setAnswers(prev => ({ ...prev, [stepId]: value }));
        setLastInsight(insight);
        
        setTimeout(() => {
            if (currentStep < STEPS.length - 1) {
                setCurrentStep(prev => prev + 1);
                setLastInsight(null);
            } else {
                setIsCalculating(true);
                setLogIndex(0);
            }
        }, 1500);
    }, [currentStep]);

    const prevStep = useCallback(() => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
            setLastInsight(null);
        }
    }, [currentStep]);

    const handleFormSubmit = useCallback(() => {
        setIsSubmitted(true);
    }, []);

    useEffect(() => {
        if (isCalculating && logIndex < DIAGNOSTIC_LOGS.length) {
            const timer = setTimeout(() => {
                setLogIndex(prev => prev + 1);
            }, 900);
            return () => clearTimeout(timer);
        } else if (isCalculating && logIndex === DIAGNOSTIC_LOGS.length) {
            const timer = setTimeout(() => {
                setIsCalculating(false);
                setIsFinished(true);
            }, 1200);
            return () => clearTimeout(timer);
        }
    }, [isCalculating, logIndex]);

    return (
        <div className="w-full max-w-2xl mx-auto min-h-[500px] flex flex-col items-center justify-center relative">
            <AnimatePresence mode="wait">
                
                {isCalculating && <DiagnosticScan logIndex={logIndex} />}

                {isFinished && !isSubmitted && <SuccessState onSubmit={handleFormSubmit} />}

                {isSubmitted && (
                    <motion.div 
                        key="submitted"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center p-16 glass-premium rounded-3xl border-primary/20 shadow-2xl"
                    >
                        <div className="size-24 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mx-auto mb-10 shadow-2xl shadow-primary/20">
                            <Check className="size-12" />
                        </div>
                        <h3 className="text-4xl font-display-heavy text-foreground mb-6 tracking-tight">INFORME EN COLA</h3>
                        <p className="text-muted-foreground mb-12 max-w-sm mx-auto text-xl leading-relaxed font-light">
                            Nuestro <span className="text-foreground font-bold">Chief Revenue Architect</span> revisará tu infraestructura en las próximas 24 horas. 
                        </p>
                        <div className="h-1 w-32 bg-gradient-to-r from-transparent via-primary/50 to-transparent mx-auto rounded-full" />
                    </motion.div>
                )}

                {!isCalculating && !isFinished && !isSubmitted && (
                    <motion.div 
                        key={currentStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="w-full"
                    >
                        <div className="flex justify-between items-center mb-12">
                            <button 
                                onClick={prevStep}
                                className={`flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] transition-all ${currentStep === 0 ? "opacity-0 pointer-events-none" : "opacity-40 hover:opacity-100 hover:text-primary"}`}
                            >
                                <ChevronLeft className="size-4" /> Atrás
                            </button>
                            <div className="flex flex-col items-end">
                                <span className="text-[11px] font-bold font-mono text-primary/40 uppercase tracking-[0.2em] mb-1">Métrica de Auditoría</span>
                                <span className="text-sm font-bold font-mono text-primary tracking-tight">Step_0{currentStep + 1}.Diagnostic</span>
                            </div>
                        </div>

                        <div className="text-center mb-14">
                            <h3 className="text-3xl sm:text-4xl md:text-5xl font-display-heavy text-foreground mb-6 leading-tight tracking-tight">
                                {STEPS[currentStep].question}
                            </h3>
                            <div className="h-1.5 w-16 bg-primary/20 mx-auto rounded-full" />
                        </div>

                        <div className="grid gap-6">
                            {STEPS[currentStep].options.map((option) => (
                                <button
                                    key={option.value}
                                    disabled={lastInsight !== null}
                                    onClick={() => handleOptionSelect(STEPS[currentStep].id, option.value, option.insight)}
                                    className={`group relative w-full text-left p-8 rounded-3xl glass-premium transition-all duration-700 overflow-hidden ${
                                        answers[STEPS[currentStep].id] === option.value 
                                        ? "border-primary bg-primary/10 shadow-2xl shadow-primary/5" 
                                        : "border-white/5 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/5"
                                    }`}
                                >
                                    <div className="flex justify-between items-center relative z-10">
                                        <div className="flex flex-col gap-2">
                                            <span className={`text-xl sm:text-2xl font-display transition-colors duration-500 ${
                                                answers[STEPS[currentStep].id] === option.value ? "text-foreground font-bold" : "text-muted-foreground group-hover:text-foreground"
                                            }`}>
                                                {option.label}
                                            </span>
                                            
                                            <AnimatePresence>
                                                {lastInsight === option.insight && (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0, y: 10 }}
                                                        animate={{ opacity: 1, height: "auto", y: 0 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <p className="text-[13px] text-primary font-bold font-mono mt-3 flex items-center gap-3 tracking-tight">
                                                            <Sparkles className="size-4 animate-pulse" />
                                                            {option.insight}
                                                        </p>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                        <div className={`p-2 rounded-full border border-primary/20 transition-all duration-700 ${
                                            lastInsight === option.insight ? "bg-primary text-primary-foreground rotate-0 scale-110" : "bg-transparent text-primary opacity-0 -translate-x-6 group-hover:opacity-100 group-hover:translate-x-0"
                                        }`}>
                                            {lastInsight === option.insight ? <Check className="size-5" /> : <ArrowRight className="size-5" />}
                                        </div>
                                    </div>
                                    
                                    <motion.div 
                                        initial={false}
                                        animate={lastInsight === option.insight ? { width: "100%" } : { width: "0%" }}
                                        className="absolute inset-0 bg-primary/5 pointer-events-none z-0"
                                        transition={{ duration: 1.2, ease: "easeInOut" }}
                                    />
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {!isCalculating && !isFinished && !isSubmitted && (
                <div className="absolute -bottom-16 left-0 right-0 h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentStep) / STEPS.length) * 100}%` }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full bg-gradient-to-r from-primary/20 via-primary to-primary/20 shadow-[0_0_10px_rgba(72,142,255,0.3)]"
                    />
                </div>
            )}
        </div>
    );
}
