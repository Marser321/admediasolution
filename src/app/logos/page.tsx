import Image from "next/image";
import Link from "next/link";

const LOGOS = [
    { name: "Logo principal", src: "/brand/logo-full.png", surface: "bg-white" },
    { name: "Logo principal blanco", src: "/brand/logo-full-white.png", surface: "bg-slate-950" },
    { name: "Isotipo", src: "/brand/logo-icon.png", surface: "bg-slate-950" },
    { name: "Logo CRM", src: "/brand/logo-crm.png", surface: "bg-white" },
];

export default function LogosPage() {
    return (
        <div className="min-h-screen bg-background text-foreground p-5 sm:p-8 lg:p-10 space-y-7 sm:space-y-10 overflow-x-hidden">
            <Link href="/" className="inline-flex min-h-11 items-center rounded-lg pr-4 font-semibold text-primary hover:underline">← Volver al Inicio</Link>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Galería interna de logos oficiales</h1>
            <p className="text-muted-foreground leading-relaxed">Referencia interna de los archivos de marca disponibles actualmente.</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
                {LOGOS.map((logo) => (
                    <div key={logo.src} className="border border-border rounded-xl p-3 sm:p-4 bg-card/50">
                        <div className={`relative mb-3 flex aspect-square w-full items-center justify-center rounded-lg border border-border p-3 sm:mb-4 ${logo.surface}`}>
                            <Image
                                src={logo.src}
                                alt={logo.name}
                                width={200}
                                height={200}
                                className="h-auto max-h-full w-auto max-w-full object-contain"
                            />
                        </div>
                        <p className="text-center text-xs font-mono text-muted-foreground break-words">{logo.name}</p>
                    </div>
                ))}
            </div>

            <div className="mt-8 sm:mt-10 p-4 sm:p-6 border border-border rounded-xl bg-white">
                <h2 className="text-xl font-bold text-black mb-4">Comprobación sobre fondo claro</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
                    {LOGOS.map((logo) => (
                        <div key={logo.src} className="p-4">
                            <div className="relative aspect-square w-full mb-4 flex items-center justify-center">
                                <Image
                                    src={logo.src}
                                    alt={logo.name}
                                    width={200}
                                    height={200}
                                    className="h-auto max-h-full w-auto max-w-full object-contain"
                                />
                            </div>
                            <p className="text-center text-xs font-mono text-slate-600">{logo.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
