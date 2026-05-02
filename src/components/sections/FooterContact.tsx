"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Loader2, Send, Check } from "lucide-react";
import Image from "next/image";
import FloatingIcons from "../ui/FloatingIcons";

// ============================================================
// Schema de validación
// ============================================================
const contactSchema = z.object({
    email: z.string().email("Ingresa un email válido"),
    message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
});

type ContactFormData = z.infer<typeof contactSchema>;

// ============================================================
// Footer Contact Section — Gravity Close Parallax
// ============================================================
export default function FooterContact() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const footerRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const isContentInView = useInView(contentRef, { once: true, margin: "-40px" });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
    });

    const onSubmit = async () => {
        setIsSubmitting(true);
        // Simulación de envío
        await new Promise((resolve) => setTimeout(resolve, 2000));

        toast.success("Solicitud recibida. Analizaremos tu caso.");
        setIsSuccess(true);
        reset();
        setIsSubmitting(false);
    };

    // Parallax values
    const { scrollYProgress } = useScroll({
        target: footerRef,
        offset: ["start end", "end end"],
    });

    // Content reveals like landing — moves up while scrolling down

    // Logo sharpens
    const logoBlur = useTransform(scrollYProgress, [0.5, 0.8], [8, 0]);
    
    // Background parallax
    const bgY = useTransform(scrollYProgress, [0, 1], ["-20%", "0%"]);

    // Submit button glow
    const buttonGlowValue = useTransform(scrollYProgress, [0.8, 1], [0, 0.4]);

    // Derived transforms for style props
    const footerLogoBlur = useTransform(logoBlur, (v) => `blur(${v}px)`);
    const submitButtonShadow = useTransform(buttonGlowValue, (v) => `0 0 ${v * 40}px rgba(72,142,255,${v})`);

    return (
        <footer ref={footerRef} id="contacto" className="relative bg-bg-deep pt-20 sm:pt-24 pb-12 px-5 sm:px-6 overflow-hidden">

            {/* Iconos flotantes — Social */}
            <FloatingIcons type="social" className="z-0 opacity-30" />

            {/* Background Texture - Grid with Parallax */}
            <motion.div
                style={{ y: bgY }}
                className="absolute inset-0 pointer-events-none texture-travertine opacity-40 mix-blend-soft-light will-change-transform"
            />
            
            <motion.div
                style={{ y: bgY }}
                className="absolute inset-0 pointer-events-none opacity-[0.03] will-change-transform"
            >
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: "linear-gradient(#488EFF 1px, transparent 1px), linear-gradient(90deg, #488EFF 1px, transparent 1px)",
                        backgroundSize: "40px 40px"
                    }}
                />
            </motion.div>

            {/* Divisor superior suave */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#488EFF]/20 to-transparent" />

            {/* Main content container with gravity slide-up */}
            <motion.div 
                ref={contentRef}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-4xl mx-auto relative z-10 text-center will-change-transform"
            >

                {/* Logo Brand Minimal — Blur to Sharp transition */}
                <motion.div
                    style={{ filter: footerLogoBlur }}
                    whileHover={{ 
                        scale: 1.05,
                        filter: "drop-shadow(0 0 15px rgba(72,142,255,0.4)) blur(0px)" 
                    }}
                    className="mb-12 flex justify-center cursor-pointer will-change-transform"
                >
                    <Image
                        src="/brand/logo-full-white.png"
                        alt="AD Media Solution"
                        width={180}
                        height={50}
                        className="h-10 w-auto object-contain"
                    />
                </motion.div>

                {/* No-Oriented Close Headline */}
                <div className="mb-12">
                    <h2 className="font-display-heavy text-4xl sm:text-5xl lg:text-6xl text-text-primary mb-6 tracking-tight">
                        ¿Te opones a <span className="text-accent-light italic">escalar</span>?
                    </h2>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={isContentInView ? { opacity: 1 } : {}}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="text-lg text-text-muted font-light max-w-xl mx-auto"
                    >
                        Si tu respuesta es &quot;no&quot;, completá el formulario para ver si tu negocio califica para nuestra ingeniería de ingresos.
                    </motion.p>
                </div>

                {/* Formulario Minimalista — Staggered inputs */}
                {!isSuccess ? (
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="max-w-md mx-auto space-y-4"
                    >
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={isContentInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="relative group"
                        >
                            <input
                                {...register("email")}
                                type="email"
                                placeholder="Tu correo corporativo"
                                className="w-full bg-bg-card/50 border border-white/10 rounded-xl px-5 py-4 text-base text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-accent-blue/50 transition-colors"
                            />
                            {errors.email && (
                                <span className="absolute right-4 top-4 text-xs text-red-400">
                                    {errors.email.message}
                                </span>
                            )}
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={isContentInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="relative group"
                        >
                            <textarea
                                {...register("message")}
                                placeholder="Describí tu situación actual..."
                                rows={3}
                                className="w-full bg-bg-card/50 border border-white/10 rounded-xl px-5 py-4 text-base text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-accent-blue/50 transition-colors resize-none"
                            />
                            {errors.message && (
                                <span className="absolute right-4 top-4 text-xs text-red-400">
                                    {errors.message.message}
                                </span>
                            )}
                        </motion.div>

                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={isContentInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={isSubmitting}
                            type="submit"
                            style={{
                                boxShadow: submitButtonShadow
                            }}
                            className="w-full relative py-4 rounded-xl bg-[#488EFF] text-white font-semibold hover:bg-[#488EFF]/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 will-change-transform"
                        >
                            {isSubmitting ? (
                                <Loader2 className="size-5 animate-spin relative z-10" />
                            ) : (
                                <>
                                    <span className="relative z-10 flex items-center gap-2">
                                        Ver Ingeniería
                                        <Send className="size-4" />
                                    </span>
                                </>
                            )}
                        </motion.button>
                    </form>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-8 rounded-2xl bg-accent-blue/10 border border-accent-blue/20 inline-flex flex-col items-center"
                    >
                        <div className="size-12 rounded-full bg-accent-blue flex items-center justify-center text-white mb-4">
                            <Check className="size-6" />
                        </div>
                        <h3 className="text-xl font-bold text-accent-blue mb-2">Solicitud Enviada</h3>
                        <p className="text-sm text-text-muted">Nuestro equipo revisará tu aplicación.</p>
                    </motion.div>
                )}

                {/* Footer Links / Legal — Subtle fade at the very end */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={isContentInView ? { opacity: 1 } : {}}
                    transition={{ duration: 1.5, delay: 0.8 }}
                    className="mt-24 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-text-muted/60"
                >
                    <p>© 2026 AD Media Solution. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-text-muted transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-text-muted transition-colors">Terms of Service</a>
                    </div>
                </motion.div>
            </motion.div>
        </footer>
    );
}
