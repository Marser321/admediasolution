
import { performance } from "perf_hooks";

// ============================================================
// Simulation constants
// ============================================================
const PARTICLE_COUNT = 140;
const SPREAD = 12;
const CONNECTION_DISTANCE = 2.8;

// ============================================================
// Simulate particle positions and line buffers
// ============================================================
const maxLines = (PARTICLE_COUNT * (PARTICLE_COUNT - 1)) / 2;
const positions = new Float32Array(PARTICLE_COUNT * 3);
const linePositions = new Float32Array(maxLines * 6);
const lineOpacities = new Float32Array(maxLines * 2);

// Initialize random positions
for (let i = 0; i < PARTICLE_COUNT; i++) {
    positions[i * 3] = (Math.random() - 0.5) * SPREAD;
    positions[i * 3 + 1] = (Math.random() - 0.5) * SPREAD;
    positions[i * 3 + 2] = (Math.random() - 0.5) * SPREAD;
}

// ============================================================
// Benchmark Function
// ============================================================
function runBenchmark(iterations: number, withRedundantLoop: boolean) {
    let totalTime = 0;

    // Simulate multiple frames
    for (let frame = 0; frame < iterations; frame++) {
        const start = performance.now();

        let lineIndex = 0;

        // Main loop to find connections
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            for (let j = i + 1; j < PARTICLE_COUNT; j++) {
                const dx = positions[i * 3] - positions[j * 3];
                const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
                const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
                const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

                if (dist < CONNECTION_DISTANCE) {
                    const opacity = 1 - dist / CONNECTION_DISTANCE;

                    linePositions[lineIndex * 6] = positions[i * 3];
                    linePositions[lineIndex * 6 + 1] = positions[i * 3 + 1];
                    linePositions[lineIndex * 6 + 2] = positions[i * 3 + 2];
                    linePositions[lineIndex * 6 + 3] = positions[j * 3];
                    linePositions[lineIndex * 6 + 4] = positions[j * 3 + 1];
                    linePositions[lineIndex * 6 + 5] = positions[j * 3 + 2];

                    lineOpacities[lineIndex * 2] = opacity * 0.15;
                    lineOpacities[lineIndex * 2 + 1] = opacity * 0.15;

                    lineIndex++;
                }
            }
        }

        // The redundant loop being optimized
        if (withRedundantLoop) {
            for (let i = lineIndex; i < maxLines; i++) {
                lineOpacities[i * 2] = 0;
                lineOpacities[i * 2 + 1] = 0;
            }
        }

        // In the real code: geo.setDrawRange(0, lineIndex * 2);
        // This is a Three.js call, so we skip it here as it's just a property setter.

        const end = performance.now();
        totalTime += (end - start);
    }

    return totalTime;
}

// ============================================================
// Run Benchmark
// ============================================================
const ITERATIONS = 10000;

console.log(`Running benchmark with ${ITERATIONS} iterations...`);

// Warmup
runBenchmark(100, true);
runBenchmark(100, false);

// Measure with loop
const timeWithLoop = runBenchmark(ITERATIONS, true);
console.log(`Time WITH redundant loop: ${timeWithLoop.toFixed(2)}ms`);

// Measure without loop
const timeWithoutLoop = runBenchmark(ITERATIONS, false);
console.log(`Time WITHOUT redundant loop: ${timeWithoutLoop.toFixed(2)}ms`);

const improvement = timeWithLoop - timeWithoutLoop;
const percent = (improvement / timeWithLoop) * 100;

console.log(`Improvement: ${improvement.toFixed(2)}ms (${percent.toFixed(2)}%)`);
