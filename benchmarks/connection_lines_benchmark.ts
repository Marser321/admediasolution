
function calculateLines(radius: number, centerX: number, centerY: number) {
    const nodes = 6;
    const lines: { x1: number; y1: number; x2: number; y2: number; delay: number }[] = [];

    // Crear líneas entre nodos opuestos y adyacentes
    for (let i = 0; i < nodes; i++) {
        const angle1 = (i * 360) / nodes - 90;
        const rad1 = (angle1 * Math.PI) / 180;
        const x1 = centerX + radius * Math.cos(rad1);
        const y1 = centerY + radius * Math.sin(rad1);

        // Conectar con el nodo opuesto
        const opposite = (i + nodes / 2) % nodes;
        const angle2 = (opposite * 360) / nodes - 90;
        const rad2 = (angle2 * Math.PI) / 180;
        const x2 = centerX + radius * Math.cos(rad2);
        const y2 = centerY + radius * Math.sin(rad2);

        if (i < nodes / 2) {
            lines.push({ x1, y1, x2, y2, delay: i * 0.3 });
        }
    }
    return lines;
}

const start = performance.now();
for (let i = 0; i < 1_000_000; i++) {
    calculateLines(120, 170, 170);
}
const end = performance.now();
console.log(`Execution time for 1,000,000 iterations: ${(end - start).toFixed(4)} ms`);
console.log(`Average execution time per call: ${((end - start) / 1_000_000).toFixed(6)} ms`);
