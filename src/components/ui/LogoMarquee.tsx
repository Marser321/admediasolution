"use client";

import { motion } from "framer-motion";
import { 
    Target, 
    Search, 
    MessageCircle, 
    Zap, 
    Bot, 
    Share2, 
    Workflow 
} from "lucide-react";

const PARTNERS = [
    { name: "Meta Ads", icon: Target, color: "#0668E1" },
    { name: "Google Ads", icon: Search, color: "#4285F4" },
    { name: "GoHighLevel", icon: Workflow, color: "#2A333D" },
    { name: "TikTok Ads", icon: Share2, color: "#000000" },
    { name: "WhatsApp Biz", icon: MessageCircle, color: "#25D366" },
    { name: "OpenAI", icon: Bot, color: "#74AA9C" },
    { name: "Meta Ads", icon: Target, color: "#0668E1" },
    { name: "Google Ads", icon: Search, color: "#4285F4" },
    { name: "GoHighLevel", icon: Workflow, color: "#2A333D" },
    { name: "TikTok Ads", icon: Share2, color: "#000000" },
    { name: "WhatsApp Biz", icon: MessageCircle, color: "#25D366" },
    { name: "OpenAI", icon: Bot, color: "#74AA9C" },
];

export default function LogoMarquee() {
    return (
        <div className="relative w-full py-12 overflow-hidden">
            {/* Fade gradients sides */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-bg-deep to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-bg-deep to-transparent z-10" />

            <div className="flex flex-col items-center mb-8">
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-accent-blue/60 mb-2">
                    Mastering the Ecosystem
                </span>
                <div className="h-px w-12 bg-accent-blue/20" />
            </div>

            <motion.div 
                className="flex gap-6 items-center"
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
                        <span className="text-xl sm:text-2xl font-bold tracking-tight text-white transition-colors">
                            {partner.name}
                        </span>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
