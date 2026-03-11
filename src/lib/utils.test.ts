import { describe, expect, test } from "bun:test";
import { cn } from "./utils";

describe("cn utility function", () => {
  test("merges class names", () => {
    expect(cn("px-2", "py-2")).toBe("px-2 py-2");
  });

  test("handles conditional classes via objects", () => {
    expect(cn("px-2", { "py-2": true, "bg-red-500": false })).toBe("px-2 py-2");
  });

  test("merges arrays of classes", () => {
    expect(cn(["px-2", "py-2"])).toBe("px-2 py-2");
  });

  test("handles mixed inputs (strings, objects, arrays)", () => {
    expect(cn("px-2", ["py-2", { "bg-red-500": true }])).toBe("px-2 py-2 bg-red-500");
  });

  test("handles falsy values correctly", () => {
    expect(cn("px-2", undefined, null, false)).toBe("px-2");
  });

  test("resolves conflicting Tailwind classes (last one wins)", () => {
    expect(cn("p-2", "p-4")).toBe("p-4");
    expect(cn("px-2", "px-4")).toBe("px-4");
    expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
  });

  test("handles empty inputs", () => {
    expect(cn()).toBe("");
    expect(cn(null)).toBe("");
    expect(cn(undefined)).toBe("");
  });
});
