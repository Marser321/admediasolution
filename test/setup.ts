import { GlobalRegistrator } from "@happy-dom/global-registrator";

// Register happy-dom globally
GlobalRegistrator.register();

// Mock ResizeObserver
// It's used by Recharts and Framer Motion
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
global.ResizeObserver = ResizeObserver;

// Mock matchMedia
// Used by CustomCursor and potentially other components
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {}, // deprecated
    removeListener: () => {}, // deprecated
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});
