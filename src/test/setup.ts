import { afterEach } from "bun:test";
import { cleanup } from "@testing-library/react";
import { Window } from "happy-dom";

// Setup happy-dom manually
const window = new Window({
    url: "http://localhost:3000",
});

// Polyfill globals
const globalRef = globalThis as any;
globalRef.window = window;
globalRef.document = window.document;
globalRef.navigator = window.navigator;

// Polyfill globals needed for React and Testing Library
globalRef.Element = window.Element;
globalRef.HTMLElement = window.HTMLElement;
globalRef.Node = window.Node;
globalRef.Text = window.Text;
globalRef.SVGElement = window.SVGElement;
globalRef.HTMLDivElement = window.HTMLDivElement;
globalRef.HTMLButtonElement = window.HTMLButtonElement;
globalRef.HTMLInputElement = window.HTMLInputElement;
globalRef.HTMLTextAreaElement = window.HTMLTextAreaElement;
globalRef.HTMLSelectElement = window.HTMLSelectElement;
globalRef.HTMLOptionElement = window.HTMLOptionElement;
globalRef.HTMLFormElement = window.HTMLFormElement;
globalRef.HTMLAnchorElement = window.HTMLAnchorElement;
globalRef.HTMLImageElement = window.HTMLImageElement;
globalRef.HTMLLabelElement = window.HTMLLabelElement;

// Mock APIs
globalRef.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
};

Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
    }),
});

window.scrollTo = () => {};

globalRef.IntersectionObserver = class IntersectionObserver {
    constructor() {}
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() { return []; }
};

// Cleanup
afterEach(() => {
    cleanup();
});
