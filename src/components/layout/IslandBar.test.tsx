/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { describe, it, expect, mock, beforeEach, afterEach } from "bun:test";
import { render, cleanup, act } from "@testing-library/react";
import React from "react";
import { GlobalRegistrator } from "@happy-dom/global-registrator";

GlobalRegistrator.register();

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
} as any;

// Mock listeners for useMotionValueEvent
let scrollListeners: ((latest: number) => void)[] = [];

// Mock framer-motion
mock.module("framer-motion", () => ({
  motion: {
    nav: ({ children, ...props }: any) => <nav {...props}>{children}</nav>,
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
  },
  useScroll: () => ({ scrollY: { get: () => 0 } }),
  useMotionValueEvent: (value: any, event: string, callback: any) => {
      if (event === "change") {
          scrollListeners.push(callback);
      }
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock lucide-react to count renders
const IconSpy = mock(() => null);
mock.module("lucide-react", () => ({
  Home: IconSpy,
  Briefcase: IconSpy,
  Sparkles: IconSpy,
  MessageCircle: IconSpy,
}));

mock.module("next/image", () => ({
  default: (props: any) => <img {...props} />,
}));

// Import component AFTER mocking
const { default: IslandBar } = await import("./IslandBar");

describe("IslandBar Performance", () => {
  beforeEach(() => {
    scrollListeners = [];
    IconSpy.mockClear();
    document.body.innerHTML = "";
  });

  afterEach(() => {
    cleanup();
  });

  it("measures re-renders on scroll", () => {
    render(<IslandBar />);

    // Initial render: 4 icons
    expect(IconSpy).toHaveBeenCalledTimes(4);
    IconSpy.mockClear();

    // Simulate scroll updates that DO NOT change 'expanded' state
    // 'expanded' is initially true.
    // If we scroll down 10, 20, 30... up to 90.
    // direction is 'down'.
    // `if (direction === "down" && latest > 100)` -> false (until 100)

    const updates = [10, 20, 30, 40, 50];

    for (const val of updates) {
        act(() => {
            scrollListeners.forEach(cb => cb(val));
        });
    }

    // With useState: 5 updates -> 5 re-renders -> 5 * 4 = 20 calls.
    // With useRef: 5 updates -> 0 re-renders -> 0 calls.

    const extraRenders = IconSpy.mock.calls.length / 4;
    console.log(`Render calls for ${updates.length} updates: ${extraRenders}`);

    // Expect NO extra renders
    expect(IconSpy).toHaveBeenCalledTimes(0);
  });

  it("updates expanded state when scrolling past threshold", () => {
    render(<IslandBar />);
    IconSpy.mockClear();

    // Scroll down past 100
    // We need to set direction to down.
    // Initial lastScrollY is 0.
    // Update to 150. 150 > 0 -> down. 150 > 100 -> true.
    // setExpanded(false).
    act(() => {
        scrollListeners.forEach(cb => cb(150));
    });

    // Should trigger setExpanded(false) -> re-render
    // So we expect calls.
    expect(IconSpy).toHaveBeenCalled();
  });
});
