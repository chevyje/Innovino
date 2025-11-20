import type {LoginRequest} from "../models/user_model.ts";
import {getHeaders, baseUrl} from "../utils/requests.ts";

export async function authenticate(data: LoginRequest) {
    const headers: Headers = getHeaders()

    const request: RequestInfo = new Request(`${baseUrl}/users/auth`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    })

    // Return something that the frontend can use
    const res = await fetch(request);
    const response_data = await res.json();
    return alert(JSON.stringify(response_data));
}