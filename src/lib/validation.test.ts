import { describe, expect, test } from "bun:test";
import { validateUrl } from "./validation";

describe("validateUrl", () => {
    test("validates full URLs", () => {
        expect(validateUrl("https://example.com").isValid).toBe(true);
        expect(validateUrl("http://example.com").isValid).toBe(true);
        expect(validateUrl("https://sub.domain.co.uk").isValid).toBe(true);
    });

    test("validates domain-only URLs", () => {
        expect(validateUrl("example.com").isValid).toBe(true);
        expect(validateUrl("sub.domain.co.uk").isValid).toBe(true);
        expect(validateUrl("solution.agency").isValid).toBe(true);
    });

    test("invalidates non-URLs", () => {
        expect(validateUrl("not-a-url").isValid).toBe(false);
        expect(validateUrl("").isValid).toBe(false);
        expect(validateUrl("   ").isValid).toBe(false);
        expect(validateUrl("http://").isValid).toBe(false);
    });

    test("returns correct error message for empty string", () => {
        expect(validateUrl("").error).toBe("La URL es requerida");
    });

    test("returns correct error message for invalid string", () => {
        expect(validateUrl("invalid").error).toBe("Ingresa una URL válida (ej. solution.agency)");
    });
});
