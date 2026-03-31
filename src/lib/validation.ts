import { z } from "zod";

const urlSchema = z.string().url();

export function validateUrl(url: string): { isValid: boolean; error?: string } {
    if (!url) return { isValid: false, error: "La URL es requerida" };

    const trimmedUrl = url.trim();

    // Check if it's a valid URL with protocol
    const urlResult = urlSchema.safeParse(trimmedUrl);
    if (urlResult.success) {
        return { isValid: true };
    }

    // Check if it's a domain-like string (e.g. "example.com")
    // If it doesn't start with http/https, try prepending https://
    if (!trimmedUrl.startsWith("http://") && !trimmedUrl.startsWith("https://")) {
        const urlWithProtocol = `https://${trimmedUrl}`;
        const urlResultWithProto = urlSchema.safeParse(urlWithProtocol);

        // Also check if it looks like a domain (has a dot) to avoid simple words passing
        if (urlResultWithProto.success && trimmedUrl.includes(".")) {
             return { isValid: true };
        }
    }

    return { isValid: false, error: "Ingresa una URL válida (ej. solution.agency)" };
}
