import Image from "next/image";
import Link from "next/link";

const LOGOS = [
    "logo 1.png",
    "logo 12.png",
    "logo 2.png",
    "logo 3 (1).png",
    "logo 4.png",
    "logo 5.png",
    "logo 6.png",
    "logo 7.png",
];

export default function LogosPage() {
    return (
        <div className="min-h-screen bg-black p-10 space-y-10">
            <Link href="/" className="text-accent-warm hover:underline">← Volver al Inicio</Link>
            <h1 className="text-3xl font-bold text-white">Galería de Candidatos de Logo</h1>
            <p className="text-slate-400">Verifica cuál es el correcto para usar en el sitio (Blanco/Transparente).</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {LOGOS.map((logo) => (
                    <div key={logo} className="border border-white/10 rounded-xl p-4 bg-white/5">
                        <div className="relative aspect-square w-full mb-4 bg-transparent border border-white/5 rounded-lg flex items-center justify-center">
                            <Image
                                src={`/brand/candidates/${logo}`}
                                alt={logo}
                                width={200}
                                height={200}
                                className="object-contain"
                            />
                        </div>
                        <p className="text-center text-xs font-mono text-slate-300">{logo}</p>
                    </div>
                ))}
            </div>

            <div className="mt-10 p-6 border border-white/10 rounded-xl bg-white">
                <h2 className="text-xl font-bold text-black mb-4">Versión sobre Fondo Claro (check if black)</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {LOGOS.map((logo) => (
                        <div key={logo} className="p-4">
                            <div className="relative aspect-square w-full mb-4 flex items-center justify-center">
                                <Image
                                    src={`/brand/candidates/${logo}`}
                                    alt={logo}
                                    width={200}
                                    height={200}
                                    className="object-contain"
                                />
                            </div>
                            <p className="text-center text-xs font-mono text-slate-600">{logo}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
