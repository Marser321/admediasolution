"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

// Definimos los tipos de animaciones cinéticas disponibles
export type KineticType = 
  | "title-right"      // Desliza desde la derecha (como nameVariants, x: 40 -> 0)
  | "subtitle-top"     // Desliza desde arriba (como roleVariants, y: -25 -> 0)
  | "body-bottom"      // Desliza desde abajo (como bioVariants, y: 25 -> 0)
  | "media-scale"      // Escala sutil (como photoVariants, scale: 0.96 -> 1)
  | "btn-left"         // Desliza desde la izquierda (como footerVariants, x: -30 -> 0)
  | "fade-in";         // Desvanecimiento simple

interface KineticContainerProps {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
}

export function KineticContainer({
  children,
  staggerDelay = 0.08,
  className = "",
}: KineticContainerProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-8%" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const itemVariants = {
  hidden: (type: KineticType) => {
    switch (type) {
      case "title-right": return { opacity: 0, x: 40 };
      case "subtitle-top": return { opacity: 0, y: -25 };
      case "body-bottom": return { opacity: 0, y: 25 };
      case "media-scale": return { opacity: 0, scale: 0.96 };
      case "btn-left": return { opacity: 0, x: -30 };
      default: return { opacity: 0 };
    }
  },
  visible: (type: KineticType) => {
    let transition = {};
    switch (type) {
      case "title-right":
        transition = { type: "spring", stiffness: 70, damping: 14 };
        break;
      case "subtitle-top":
        transition = { type: "spring", stiffness: 90, damping: 15 };
        break;
      case "body-bottom":
        transition = { type: "spring", stiffness: 70, damping: 15 };
        break;
      case "media-scale":
        transition = { type: "spring", stiffness: 80, damping: 12 };
        break;
      case "btn-left":
        transition = { type: "spring", stiffness: 80, damping: 14 };
        break;
      default:
        transition = { ease: "easeOut" };
        break;
    }
    return {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition,
    };
  }
};

export function KineticItem({
  children,
  type,
  className = "",
}: {
  children: React.ReactNode;
  type: KineticType;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-8%" }}
        transition={{ duration: 0.3 }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={itemVariants}
      custom={type}
      className={className}
    >
      {children}
    </motion.div>
  );
}
