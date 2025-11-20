export const baseUrl: string = 'http://localhost:8000/api';

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