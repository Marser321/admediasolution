"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { motion } from "framer-motion";
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
// Footer Contact Section — No-Oriented Close
// ============================================================
export default function FooterContact() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

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

    return (
        <footer className="relative bg-bg-deep pt-24 pb-12 px-5 sm:px-6 texture-travertine overflow-hidden">

            {/* Iconos flotantes — Social */}
            <FloatingIcons type="social" className="z-0 opacity-30" />

            {/* Divisor superior suave */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-blue/10 to-transparent" />

            <div className="max-w-4xl mx-auto relative z-10 text-center">

                {/* Logo Brand Minimal — Animated */}
                <motion.div
                    initial={{ opacity: 0, y: 10, filter: "grayscale(100%)" }}
                    whileInView={{ opacity: 0.9, y: 0, filter: "grayscale(0%)" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ filter: "grayscale(0%) drop-shadow(0 0 12px rgba(0,243,255,0.4))", opacity: 1 }}
                    className="mb-12 flex justify-center cursor-pointer"
                >
                    <Image
                        src="/brand/logo-full.png"
                        alt="AD Media Solution"
                        width={120}
                        height={35}
                        className="h-8 w-auto object-contain"
                    />
                </motion.div>

                {/* No-Oriented Close Headline */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-12"
                >
                    <h2 className="font-display-heavy text-4xl sm:text-5xl lg:text-6xl text-text-primary mb-6 tracking-tight">
                        ¿Te opones a <span className="text-accent-light italic">escalar</span>?
                    </h2>
                    <p className="text-lg text-text-muted font-light max-w-xl mx-auto">
                        Si tu respuesta es &quot;no&quot;, completá el formulario para ver si tu negocio califica para nuestra ingeniería de ingresos.
                    </p>
                </motion.div>

                {/* Formulario Minimalista */}
                {!isSuccess ? (
                    <motion.form
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        onSubmit={handleSubmit(onSubmit)}
                        className="max-w-md mx-auto space-y-4"
                    >
                        <div className="relative group">
                            <input
                                {...register("email")}
                                type="email"
                                placeholder="Tu correo corporativo"
                                className="w-full bg-bg-card/50 border border-white/10 rounded-xl px-5 py-4 text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-accent-blue/50 transition-colors"
                            />
                            {errors.email && (
                                <span className="absolute right-4 top-4 text-xs text-red-400">
                                    {errors.email.message}
                                </span>
                            )}
                        </div>

                        <div className="relative group">
                            <textarea
                                {...register("message")}
                                placeholder="Describí tu situación actual..."
                                rows={3}
                                className="w-full bg-bg-card/50 border border-white/10 rounded-xl px-5 py-4 text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-accent-blue/50 transition-colors resize-none"
                            />
                            {errors.message && (
                                <span className="absolute right-4 top-4 text-xs text-red-400">
                                    {errors.message.message}
                                </span>
                            )}
                        </div>

                        <motion.button
                            whileTap={{ scale: 0.98 }}
                            disabled={isSubmitting}
                            type="submit"
                            className="w-full py-4 rounded-xl bg-gradient-to-r from-accent-blue/90 to-accent-light/80 text-white font-semibold hover:from-accent-blue hover:to-accent-light transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md shadow-accent-blue/10"
                        >
                            {isSubmitting ? (
                                <Loader2 className="size-5 animate-spin" />
                            ) : (
                                <>
                                    Ver Ingeniería
                                    <Send className="size-4" />
                                </>
                            )}
                        </motion.button>
                    </motion.form>
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

                {/* Footer Links / Legal */}
                <div className="mt-24 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-text-muted/60">
                    <p>© 2026 AD Media Solution. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-text-muted transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-text-muted transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
