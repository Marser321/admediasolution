import { expect, test } from "bun:test";
import { AUTHORITY_TOOLS } from "./constants";

test("AUTHORITY_TOOLS should be an array", () => {
    expect(Array.isArray(AUTHORITY_TOOLS)).toBe(true);
});

test("AUTHORITY_TOOLS should contain 7 items", () => {
    expect(AUTHORITY_TOOLS.length).toBe(7);
});

test("AUTHORITY_TOOLS should have correct structure", () => {
    AUTHORITY_TOOLS.forEach((tool) => {
        expect(tool).toHaveProperty("icon");
        expect(tool).toHaveProperty("label");
        expect(typeof tool.label).toBe("string");
    });
});
