const envBase = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "");
const fallback = import.meta.env.DEV ? "http://localhost:8001" : window.location.origin;
export const baseUrl = envBase ?? fallback;

export function getHeaders(): Headers {
    const headers: Headers = new Headers()
    headers.set("Content-Type", "application/json")
    headers.set("Accept", "application/json")
    return headers
}

export function addApiKey (headers: Headers): Headers {
    headers.set("x-api-key", "temporary")
    return headers
}