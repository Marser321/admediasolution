import { expect, test, describe } from "bun:test";
import {
    getButtonClassName,
    BUTTON_VARIANTS,
    BUTTON_SIZES
} from "./button-styles";

describe("Button Class Generation", () => {
    test("returns correct default classes", () => {
        const className = getButtonClassName({});
        expect(className).toContain("inline-flex");
        expect(className).toContain("items-center");
        expect(className).toContain("justify-center");

        expect(className).toContain("bg-primary");
        expect(className).toContain("h-9");

        expect(className).toMatchSnapshot();
    });

    describe("Variants", () => {
        const variants = Object.keys(BUTTON_VARIANTS) as Array<keyof typeof BUTTON_VARIANTS>;

        for (const variant of variants) {
            test(`returns correct classes for ${variant} variant`, () => {
                const className = getButtonClassName({ variant });
                const expectedClassPart = BUTTON_VARIANTS[variant].split(' ')[0];
                expect(className).toContain(expectedClassPart);
                expect(className).toMatchSnapshot();
            });
        }
    });

    describe("Sizes", () => {
        const sizes = Object.keys(BUTTON_SIZES) as Array<keyof typeof BUTTON_SIZES>;

        for (const size of sizes) {
            test(`returns correct classes for ${size} size`, () => {
                const className = getButtonClassName({ size });
                const expectedClassPart = BUTTON_SIZES[size].split(' ')[0];
                expect(className).toContain(expectedClassPart);
                expect(className).toMatchSnapshot();
            });
        }
    });

    test("merges custom className correctly", () => {
        const customClass = "custom-class-test";
        const className = getButtonClassName({ className: customClass });
        expect(className).toContain(customClass);
        expect(className).toMatchSnapshot();
    });

    test("handles undefined inputs gracefully", () => {
         const className = getButtonClassName({ variant: undefined, size: undefined, className: undefined });
         expect(className).toContain(BUTTON_VARIANTS.primary.split(' ')[0]);
         expect(className).toContain(BUTTON_SIZES.md.split(' ')[0]);
         expect(className).toMatchSnapshot();
    });
});
