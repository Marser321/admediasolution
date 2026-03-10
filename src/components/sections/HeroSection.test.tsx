import { expect, test, describe, mock } from "bun:test";
import { render, act } from "@testing-library/react";
import HeroSection from "./HeroSection";
import React from "react";

// Mock OrbitalCore
mock.module("@/components/three/OrbitalCore", () => ({
    default: () => <div data-testid="orbital-core">Orbital Core Mock</div>
}));

// Mock FloatingIcons
mock.module("../ui/FloatingIcons", () => ({
    default: () => <div data-testid="floating-icons">Floating Icons Mock</div>
}));

// Mock lucide-react icons to avoid rendering issues
mock.module("lucide-react", () => ({
    Zap: () => <div data-testid="icon-zap" />,
    PlayCircle: () => <div data-testid="icon-play" />,
    ArrowDown: () => <div data-testid="icon-arrow" />,
    // Add others if needed
}));

// Helper to simulate window resize
const resizeWindow = (width: number) => {
    Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: width,
    });
    window.dispatchEvent(new Event("resize"));
};

describe("HeroSection", () => {
    test("renders mobile fallback on small screens", () => {
        resizeWindow(500);
        const { queryByTestId, getByText } = render(<HeroSection />);

        // OrbitalCore should NOT be present
        const core = queryByTestId("orbital-core");
        expect(core).toBeNull();

        // Content should be present
        expect(getByText(/No es marketing/i)).toBeTruthy();
        expect(getByText(/Ingeniería de Ingresos/i)).toBeTruthy();
    });

    test("renders OrbitalCore on desktop screens", async () => {
        resizeWindow(1024);
        const { findByTestId } = render(<HeroSection />);

        // OrbitalCore SHOULD be present
        const core = await findByTestId("orbital-core");
        expect(core).toBeTruthy();
    });

    test("updates rendering when resizing from mobile to desktop", async () => {
        resizeWindow(500);
        const { queryByTestId, findByTestId } = render(<HeroSection />);

        expect(queryByTestId("orbital-core")).toBeNull();

        // Resize to desktop
        await act(async () => {
            resizeWindow(1024);
        });

        const core = await findByTestId("orbital-core");
        expect(core).toBeTruthy();
    });

    test("updates rendering when resizing from desktop to mobile", async () => {
        resizeWindow(1024);
        const { queryByTestId, findByTestId } = render(<HeroSection />);

        expect(await findByTestId("orbital-core")).toBeTruthy();

        // Resize to mobile
        await act(async () => {
            resizeWindow(500);
        });

        expect(queryByTestId("orbital-core")).toBeNull();
    });
});
