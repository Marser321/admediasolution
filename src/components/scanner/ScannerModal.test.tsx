import { describe, expect, test, beforeEach, afterEach, jest } from "bun:test";
import { render, screen, cleanup, fireEvent, act } from "@testing-library/react";
import ScannerModal from "./ScannerModal";
import React from "react";

// Mock resize observer
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock scrollIntoView
HTMLElement.prototype.scrollIntoView = jest.fn();

// Mock localStorage
const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
        getItem: jest.fn((key: string) => store[key] || null),
        setItem: jest.fn((key: string, value: string) => {
            store[key] = value.toString();
        }),
        removeItem: jest.fn((key: string) => {
            delete store[key];
        }),
        clear: jest.fn(() => {
            store = {};
        }),
    };
})();
Object.defineProperty(window, "localStorage", {
    value: localStorageMock,
});

// Manual Timer Mock
let timerCallbacks: Function[] = [];
const originalSetTimeout = global.setTimeout;

// We need to advance timers manually because the component uses await new Promise
const advanceTimers = async () => {
    // Run all pending callbacks
    const callbacks = [...timerCallbacks];
    timerCallbacks = [];
    act(() => {
        callbacks.forEach(cb => cb());
    });

    // Wait for promises to resolve
    await new Promise(resolve => originalSetTimeout(resolve, 0));
};

describe("ScannerModal", () => {
    beforeEach(() => {
        timerCallbacks = [];
        global.setTimeout = ((cb: Function, delay: number) => {
             timerCallbacks.push(cb);
             return 1 as any;
        }) as any;
        localStorageMock.clear();
        jest.clearAllMocks();
    });

    afterEach(() => {
        global.setTimeout = originalSetTimeout;
        cleanup();
    });

    test("renders nothing when closed", () => {
        render(<ScannerModal isOpen={false} onClose={() => {}} initialUrl="example.com" />);
        expect(screen.queryByText("Analizando example.com")).toBeNull();
    });

    test("renders and starts scanning when open", async () => {
        render(<ScannerModal isOpen={true} onClose={() => {}} initialUrl="example.com" />);

        // Initial state
        expect(screen.getByText("Analizando example.com")).toBeTruthy();
        expect(screen.getByText("Analizando Huella Digital")).toBeTruthy();

        // Advance timer to start scanning (initial 500ms delay)
        await advanceTimers();

        // Now it should be on the first step
        expect(screen.getByText("Analizando Huella Digital")).toBeTruthy();
        expect(screen.getByText("Rastreando infraestructura y autoridad...")).toBeTruthy();

        // Advance step 1 (2000ms)
        await advanceTimers();

        // Should be on step 2
        expect(screen.getByText("Auditando Estructura de Datos")).toBeTruthy();
        expect(screen.getByText("Verificando integridad de esquemas...")).toBeTruthy();

        // Advance step 2 (2500ms)
        await advanceTimers();

        // Should be on step 3
        expect(screen.getByText("Midiendo Latencia Global")).toBeTruthy();
        expect(screen.getByText("Ping a servidores edge (TTFB)...")).toBeTruthy();

        // Advance step 3 (1800ms)
        await advanceTimers();

        // Should be on step 4
        expect(screen.getByText("Calculando Potencial de Ingresos")).toBeTruthy();
        expect(screen.getByText("Simulando escenarios de optimización...")).toBeTruthy();

        // Advance step 4 (3000ms)
        await advanceTimers();

        // Advance final delay (800ms)
        await advanceTimers();

        // Should show dashboard
        expect(screen.getByText("Potencial de Crecimiento")).toBeTruthy();
        expect(localStorageMock.setItem).toHaveBeenCalledWith("scannerComplete", "true");
    });

    test("skips animation when skipAnimation is true", () => {
        render(<ScannerModal isOpen={true} onClose={() => {}} initialUrl="example.com" skipAnimation={true} />);

        // Should show dashboard immediately
        expect(screen.getByText("Potencial de Crecimiento")).toBeTruthy();
    });

    test("calls onClose when close button is clicked", () => {
        const onClose = jest.fn();
        const { container } = render(<ScannerModal isOpen={true} onClose={onClose} initialUrl="example.com" />);

        // Find the close button (it's the first button in the DOM)
        const closeButton = container.querySelector("button");
        expect(closeButton).toBeTruthy();
        if (closeButton) {
            fireEvent.click(closeButton);
        }

        expect(onClose).toHaveBeenCalled();
    });

    test("dashboard 'Reclamar' button calls onClose and scrolls", async () => {
         const onClose = jest.fn();
         render(<ScannerModal isOpen={true} onClose={onClose} initialUrl="example.com" skipAnimation={true} />);

         const claimButton = screen.getByText("Reclamar este Crecimiento");

         // Mock document.getElementById
         const mockElement = document.createElement("div");
         mockElement.scrollIntoView = jest.fn();
         const getElementByIdSpy = jest.spyOn(document, "getElementById").mockReturnValue(mockElement);

         fireEvent.click(claimButton);

         expect(onClose).toHaveBeenCalled();
         expect(getElementByIdSpy).toHaveBeenCalledWith("contacto");
         expect(mockElement.scrollIntoView).toHaveBeenCalled();

         getElementByIdSpy.mockRestore();
    });
});
