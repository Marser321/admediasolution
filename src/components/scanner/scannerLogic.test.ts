
import { expect, test, describe, mock } from "bun:test";
import { runScan, type ScanStep } from "./scannerLogic";

describe("runScan", () => {
    const steps: ScanStep[] = [
        { duration: 100 },
        { duration: 100 },
    ];

    test("should complete all steps when checkOpen returns true", async () => {
        const onStep = mock(() => {});
        const onStepComplete = mock(() => {});
        const onComplete = mock(() => {});
        const checkOpen = mock(() => true);
        const sleep = mock((ms) => Promise.resolve());

        await runScan(steps, checkOpen, onStep, onStepComplete, onComplete, sleep);

        expect(onStep).toHaveBeenCalledTimes(2);
        expect(onStepComplete).toHaveBeenCalledTimes(2);
        expect(onComplete).toHaveBeenCalledTimes(1);
    });

    test("should abort if checkOpen returns false initially", async () => {
        const onStep = mock(() => {});
        const onStepComplete = mock(() => {});
        const onComplete = mock(() => {});
        const checkOpen = mock(() => false);
        const sleep = mock((ms) => Promise.resolve());

        await runScan(steps, checkOpen, onStep, onStepComplete, onComplete, sleep);

        expect(onStep).toHaveBeenCalledTimes(0);
        expect(onStepComplete).toHaveBeenCalledTimes(0);
        expect(onComplete).toHaveBeenCalledTimes(0);
    });

    test("should abort if checkOpen returns false during loop", async () => {
        const onStep = mock(() => {});
        const onStepComplete = mock(() => {});
        const onComplete = mock(() => {});

        let callCount = 0;
        const checkOpen = mock(() => {
            callCount++;
            // 1. Initial check (before loop i=0? No wait, sleep 500 happens first)
            // Logic:
            // await sleep(500)
            // i=0. checkOpen() #1 -> true
            // onStep(0)
            // await sleep
            // checkOpen() #2 -> true
            // onStepComplete(0)
            // i=1. checkOpen() #3 -> false (abort)

            if (callCount >= 3) return false;
            return true;
        });

        const sleep = mock((ms) => Promise.resolve());

        await runScan(steps, checkOpen, onStep, onStepComplete, onComplete, sleep);

        expect(onStep).toHaveBeenCalledTimes(1);
        expect(onStep).toHaveBeenCalledWith(0);
        expect(onStepComplete).toHaveBeenCalledTimes(1);
        expect(onStepComplete).toHaveBeenCalledWith(0);
        expect(onComplete).toHaveBeenCalledTimes(0);
    });
});
