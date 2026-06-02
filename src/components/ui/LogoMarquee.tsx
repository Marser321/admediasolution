"use client";

import { motion } from "framer-motion";
import { 
    Bot,
    CalendarCheck,
    CreditCard,
    MessageCircle,
    PlugZap,
    Target,
    Workflow,
} from "lucide-react";

const CONNECTED_TECH = [
    { name: "WhatsApp API", icon: MessageCircle, color: "#25D366" },
    { name: "GoHighLevel", icon: Workflow, color: "#81E7FF" },
    { name: "Meta Ads", icon: Target, color: "#0668E1" },
    { name: "OpenAI", icon: Bot, color: "#74AA9C" },
    { name: "Make", icon: PlugZap, color: "#8B5CF6" },
    { name: "Calendly", icon: CalendarCheck, color: "#00A2FF" },
    { name: "Stripe", icon: CreditCard, color: "#635BFF" },
];

const PARTNERS = [...CONNECTED_TECH, ...CONNECTED_TECH];

export default function LogoMarquee() {
    return (
        <div className="relative w-full py-10 overflow-hidden">
            <div className="flex flex-col items-center mb-8">
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-primary/70 mb-2">
                    Plataformas conectadas
                </span>
                <div className="h-px w-12 bg-primary/30" />
            </div>

            <motion.div 
                className="flex gap-6 items-center transform-gpu"
                animate={{ 
                    x: ["0%", "-50%"] 
                }}
                transition={{ 
                    duration: 30, 
                    repeat: Infinity, 
                    ease: "linear" 
                }}
            >
                {PARTNERS.map((partner, i) => (
                    <div 
                        key={i}
                        className="flex-shrink-0 flex items-center gap-2.5 mx-8 group cursor-default opacity-60 hover:opacity-100 transition-all duration-500"
                    >
                        <partner.icon 
                            className="size-7 transition-transform duration-500 group-hover:scale-110" 
                            style={{ color: partner.color }} 
                        />
                        <span className="text-xl sm:text-2xl font-bold tracking-tight text-foreground transition-colors">
                            {partner.name}
                        </span>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
