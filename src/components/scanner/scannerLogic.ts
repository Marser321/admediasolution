
export interface ScanStep {
    duration: number;
    // other properties are not needed for logic
}

export async function runScan(
    steps: ScanStep[],
    checkOpen: () => boolean,
    onStep: (step: number) => void,
    onStepComplete: (step: number) => void,
    onComplete: () => void,
    sleep: (ms: number) => Promise<void> = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
) {
    // Pausa inicial
    await sleep(500);

    for (let i = 0; i < steps.length; i++) {
        if (!checkOpen()) return;
        onStep(i);
        await sleep(steps[i].duration);
        if (!checkOpen()) return;
        onStepComplete(i);
    }

    // Pausa final
    await sleep(800);

    if (!checkOpen()) return;

    onComplete();
}
