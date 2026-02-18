export interface StageData {
    id: string;
    label: string;
    widthPercent: number;
    hasLeak: boolean;
    leakAmount?: string;
    leakLabel?: string;
}

export const STAGES: StageData[] = [
    { id: "s1", label: "Tráfico / Ads", widthPercent: 100, hasLeak: false },
    { id: "s2", label: "Interés", widthPercent: 80, hasLeak: false },
    { id: "s3", label: "Citas Agendadas", widthPercent: 60, hasLeak: true, leakAmount: "-30%", leakLabel: "Fuga de Ingresos" },
    { id: "s4", label: "Seguimiento", widthPercent: 40, hasLeak: true, leakAmount: "-30%", leakLabel: "Fuga de Ingresos" },
    { id: "s5", label: "Cierre", widthPercent: 20, hasLeak: false },
];
