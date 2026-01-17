import { google } from "$lib/server/oauth";
import { generateCodeVerifier, generateState } from "arctic";

import type { RequestEvent } from "@sveltejs/kit";

export async function GET({ cookies }: RequestEvent): Promise<Response> {
	const state = generateState();
	const codeVerifier = generateCodeVerifier();
	const url = google.createAuthorizationURL(state, codeVerifier, ["openid", "profile", "email"]);

	cookies.set("google_oauth_state", state, {
		path: "/",
		httpOnly: true,
		sameSite: "lax",
		maxAge: 60 * 10
	});

	cookies.set("google_code_verifier", codeVerifier, {
		path: "/",
		httpOnly: true,
		sameSite: "lax",
		maxAge: 60 * 10
	});

	return new Response(null, {
		status: 302,
		headers: {
			Location: url.toString()
		}
	});
}
