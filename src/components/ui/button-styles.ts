import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// Base styles
export const BUTTON_BASE_STYLES = "relative inline-flex items-center justify-center rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 overflow-hidden";

// Variant styles
export const BUTTON_VARIANTS = {
    primary: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
};

// Size styles
export const BUTTON_SIZES = {
    sm: "h-8 px-3 text-xs",
    md: "h-9 px-4 py-2",
    lg: "h-10 px-8 text-lg",
    icon: "h-9 w-9",
};

export function getButtonClassName({
    variant = "primary",
    size = "md",
    className
}: {
    variant?: keyof typeof BUTTON_VARIANTS;
    size?: keyof typeof BUTTON_SIZES;
    className?: string;
}) {
    return cn(BUTTON_BASE_STYLES, BUTTON_VARIANTS[variant], BUTTON_SIZES[size], className);
}
