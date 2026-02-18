import { describe, it, expect, mock } from "bun:test";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ScannerDashboard from "./ScannerDashboard";

// Mock Recharts to avoid ResponsiveContainer size calculation issues in headless environment
mock.module("recharts", () => {
    const OriginalModule = require("recharts");
    return {
        ...OriginalModule,
        ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
            <div style={{ width: "100%", height: "100%" }}>{children}</div>
        ),
    };
});

describe("ScannerDashboard", () => {
    it("renders metrics correctly", () => {
        const onClaim = mock(() => {});
        render(<ScannerDashboard onClaim={onClaim} />);

        // Check for main title
        expect(screen.getByText("Potencial de Crecimiento")).toBeDefined();

        // Check for key metric
        expect(screen.getByText("450%")).toBeDefined();

        // Check for grid metrics
        expect(screen.getByText("ROI Proyectado")).toBeDefined();
        expect(screen.getByText("+347%")).toBeDefined();
        expect(screen.getByText("CPC Óptimo")).toBeDefined();
        expect(screen.getByText("$0.42")).toBeDefined();
    });

    it("calls onClaim when clicked", () => {
        const onClaim = mock(() => {});
        const { container } = render(<ScannerDashboard onClaim={onClaim} />);

        // Find the button (using querySelector as fallback for getByRole reliability issues in this env)
        const button = container.querySelector("button");

        expect(button).toBeTruthy();
        expect(button?.textContent).toContain("Reclamar este Crecimiento");

        if (button) {
            fireEvent.click(button);
        }

        expect(onClaim).toHaveBeenCalled();
    });
});
