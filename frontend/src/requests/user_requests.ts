import type {LoginRequest} from "../models/user_model.ts";
import {getHeaders, baseUrl} from "../utils/requests.ts";
import {setCookie} from "../utils/cookies.ts";

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

    setCookie('session_id', response_data.session.session_id, new Date(response_data.session.expires_at));
    console.log(response_data.session);
    console.log(new Date(response_data.session.expires_at));
    return response_data;
}