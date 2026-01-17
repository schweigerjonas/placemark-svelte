import { google } from "$lib/server/oauth";
import { service } from "$lib/services/service";
import { redirect, type RequestEvent } from "@sveltejs/kit";
import { decodeIdToken, OAuth2Tokens } from "arctic";

export async function GET({ url, cookies }: RequestEvent): Promise<Response> {
	const code = url.searchParams.get("code");
	const state = url.searchParams.get("state");
	const storedState = cookies.get("google_oauth_state");
	const codeVerifier = cookies.get("google_code_verifier");

	if (!code || !state || !storedState || !codeVerifier || state !== storedState) {
		return new Response("Invalid state or missing parameters", {
			status: 400
		});
	}

	let tokens: OAuth2Tokens;

	try {
		tokens = await google.validateAuthorizationCode(code, codeVerifier);
	} catch (err) {
		console.error(err);

		return new Response("Failed to validate authorization code", {
			status: 400
		});
	}

	const claims = decodeIdToken(tokens.idToken()) as { sub: string; name: string; email: string };
	const session = await service.loginWithGoogle(claims.sub, claims.name, claims.email);

	if (!session) {
		throw redirect(302, "/login?error=oauth_failed");
	}

	const userJson = JSON.stringify(session);

	cookies.set("placemark-user", userJson, {
		path: "/",
		httpOnly: true,
		sameSite: "lax",
		secure: import.meta.env.PROD,
		maxAge: 60 * 60 * 24 * 7
	});

	throw redirect(302, "/");
}
