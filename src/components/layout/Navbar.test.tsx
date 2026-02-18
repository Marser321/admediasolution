import { expect, test, describe, beforeEach, afterEach, mock } from "bun:test";
import { render, screen, cleanup, act } from "@testing-library/react";
import React from "react";

// Mock framer-motion
let changeCallback: ((latest: number) => void) | null = null;

mock.module("framer-motion", () => {
  return {
    useScroll: () => ({ scrollY: {} }),
    useMotionValueEvent: (val: any, event: string, callback: any) => {
        if (event === "change") {
            changeCallback = callback;
        }
    },
    motion: {
        nav: ({ children, className }: any) => <nav className={className} data-testid="navbar">{children}</nav>,
        div: ({ children, className, animate }: any) => <div className={className} data-animate={JSON.stringify(animate)}>{children}</div>,
        button: ({ children, className, whileTap, whileHover }: any) => <button className={className}>{children}</button>,
    },
    AnimatePresence: ({ children }: any) => <>{children}</>,
  };
});

// Mock next/image
mock.module("next/image", () => ({
    default: ({ priority, ...props }: any) => <img {...props} />
}));

// Mock next/link
mock.module("next/link", () => ({
    default: ({ children, href, className }: any) => <a href={href} className={className}>{children}</a>
}));

// Import component after mocks
import Navbar from "./Navbar";

describe("Navbar Scroll Behavior", () => {
    beforeEach(() => {
        changeCallback = null;
    });

    afterEach(() => {
        cleanup();
    });

    test("renders initially transparent", () => {
        render(<Navbar />);
        const navbar = screen.getByTestId("navbar");

        // Check for transparent classes
        expect(navbar.className).toContain("bg-transparent");
        expect(navbar.className).toContain("border-transparent");

        // Check absence of glass classes
        expect(navbar.className).not.toContain("glass-premium");
        expect(navbar.className).not.toContain("bg-background/60");
    });

    test("applies glass effect on scroll > 50", () => {
        render(<Navbar />);
        const navbar = screen.getByTestId("navbar");

        // Simulate scroll
        if (changeCallback) {
            act(() => {
                changeCallback!(51);
            });
        } else {
            throw new Error("changeCallback not captured");
        }

        // Check for glass classes
        expect(navbar.className).toContain("glass-premium");
        expect(navbar.className).toContain("bg-background/60");
        expect(navbar.className).toContain("shadow-2xl");

        // Check absence of transparent classes
        expect(navbar.className).not.toContain("bg-transparent");
    });

    test("reverts to transparent on scroll <= 50", () => {
        render(<Navbar />);
        const navbar = screen.getByTestId("navbar");

        // Simulate scroll down
        if (changeCallback) {
            act(() => {
                changeCallback!(100);
            });
        }
        expect(navbar.className).toContain("glass-premium");

        // Simulate scroll up
        if (changeCallback) {
            act(() => {
                changeCallback!(0);
            });
        }

        expect(navbar.className).toContain("bg-transparent");
        expect(navbar.className).not.toContain("glass-premium");
    });
});
